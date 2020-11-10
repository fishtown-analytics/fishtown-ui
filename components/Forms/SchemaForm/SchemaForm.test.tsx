import React from 'react';
import { render } from '@testing-library/react';
import { useForm } from 'react-hook-form';

import { SchemaForm } from './SchemaForm';
import { FormSchema } from './types';
import { useErrorMessages } from './hooks';

const Harness: React.FC<{
  Form: typeof SchemaForm;
  schema: FormSchema;
  isEdit?: boolean;
  triggerSubmit?: boolean;
  valueOverride?: Record<string, any>;
  errorOverride?: Record<string, string | { submitCount: number; errorCount: number }>;
  onSubmit?(): void;
}> = ({
  Form,
  schema,
  errorOverride,
  valueOverride,
  isEdit = false,
  triggerSubmit = false,
  onSubmit = jest.fn(),
}) => {
  const { control, formState, errors, register, handleSubmit, getValues } = useForm();
  if (triggerSubmit) {
    handleSubmit(onSubmit);
  }
  const errorMessages = useErrorMessages(errors, formState);
  const provideValues = valueOverride
    ? () => ({ ...getValues(), ...valueOverride })
    : getValues;
  return (
    <form>
      <Form
        isEdit={isEdit}
        getValues={provideValues}
        control={control}
        errors={errorOverride || errorMessages}
        schema={schema}
        register={register}
      />
    </form>
  );
};
let testSchema: FormSchema = { fields: {}, field_order: [] };

describe('Component SchemaForm', () => {
  beforeEach(() => {
    testSchema = {
      fields: {
        test1: {
          metadata: {
            id: 'test1',
            label: 'Test 1',
            field_type: 'text',
            description: 'Test Description 1',
            validation: {},
            depends_on: {},
          },
          value: 'test one',
        },
        test2: {
          metadata: {
            id: 'test2',
            label: 'Test 2',
            field_type: 'text',
            description: 'Test Description 2',
            validation: {
              required: false,
            },
            depends_on: {
              test1: 'test one',
            },
          },
          value: 'test two',
        },
        testnotrendered: {
          metadata: {
            id: 'testnotrendered',
            label: 'Test 2',
            field_type: 'text',
            description: 'Test Description 2',
            validation: {
              required: false,
            },
            depends_on: {
              test1: 'test one',
            },
          },
          value: 'test not rendered',
        },
        testhidden: {
          metadata: {
            id: 'testhidden',
            label: 'Test hidden',
            field_type: 'hidden',
            description: 'Test Description Hidden',
            validation: {
              required: false,
            },
          },
          value: 'test hidden',
        },
        testselect: {
          metadata: {
            id: 'testselect',
            label: 'Test Select',
            field_type: 'select',
            options: [
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ],
            description: 'Test Description Select',
            validation: {
              required: false,
            },
          },
          value: '1',
        },
      },
      field_order: ['test1', 'test2', 'testhidden', 'testselect'],
    };
  });
  test('should render form fields based on a schema in view mode', () => {
    const { container } = render(<Harness schema={testSchema} Form={SchemaForm} />);

    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render form fields based on a schema in edit mode', () => {
    const { testselect, ...fields } = testSchema.fields;
    const baseSchema = {
      fields: fields,
      field_order: testSchema.field_order.slice(0, 3),
    };
    const { container } = render(
      <Harness schema={baseSchema} Form={SchemaForm} isEdit />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should show error messages if fields are invalid', () => {
    const errorSchema: FormSchema = { ...testSchema };
    // @ts-ignore - we know this is there
    errorSchema.fields.test1.metadata.validation.required = true;
    errorSchema.fields.test1.value = '';
    const { getByText } = render(
      <Harness
        schema={errorSchema}
        Form={SchemaForm}
        isEdit
        errorOverride={{ test1: 'ERROR' }}
      />
    );

    expect(getByText('ERROR')).toBeInTheDocument();
  });

  test('should show a conditional field when a condition is met', () => {
    const { getByTestId } = render(
      <Harness schema={testSchema} Form={SchemaForm} isEdit />
    );
    expect(getByTestId('test2').getAttribute('class')?.includes('tw-hidden')).toBe(
      false
    );
  });

  test('should hide a conditional field when a condition is not met', () => {
    const noShowSchema = { ...testSchema };
    noShowSchema.fields.test1.value = '';
    const { getByTestId } = render(
      <Harness schema={noShowSchema} Form={SchemaForm} isEdit />
    );
    expect(getByTestId('test2').getAttribute('class')?.includes('tw-hidden')).toBe(
      true
    );
  });

  test('should show conditional fields based on external factors', () => {
    const externalSchema = { ...testSchema };
    externalSchema.fields.test2.metadata.depends_on = {
      someValue: true,
    };

    const { getByTestId } = render(
      <Harness
        schema={externalSchema}
        Form={SchemaForm}
        isEdit
        valueOverride={{ someValue: true }}
      />
    );
    expect(getByTestId('test2').getAttribute('class')?.includes('tw-hidden')).toBe(
      false
    );
  });
});
