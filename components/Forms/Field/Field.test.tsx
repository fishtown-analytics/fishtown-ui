import React from 'react';
import { render } from '@testing-library/react';

import { Field, FieldProps } from './Field';

const commonProps: FieldProps = {
  fieldId: 'test',
  label: 'Test Label',
  input: ({ id }) => `Test Value ${id}`,
  displayValue: 'Test Display Value',
};

describe('Component Field', () => {
  test('should render in view mode', () => {
    const { getByText, queryByText } = render(
      <Field {...commonProps} isEdit={false} />
    );
    expect(getByText('Test Label')).toBeInTheDocument();
    expect(getByText('Test Display Value')).toBeInTheDocument();
    expect(queryByText('Test Value test')).not.toBeInTheDocument();
  });

  test('should render in edit mode', () => {
    const { getByText, queryByText } = render(<Field {...commonProps} isEdit={true} />);
    expect(getByText('Test Label')).toBeInTheDocument();
    expect(getByText('Test Value test')).toBeInTheDocument();
    expect(queryByText('Test Display Value')).not.toBeInTheDocument();
  });

  test('should render in edit mode with children', () => {
    const { getByText } = render(
      <Field {...commonProps} isEdit={true} input={undefined}>
        {({ id }) => `Test Children ${id}`}
      </Field>
    );
    expect(getByText('Test Label')).toBeInTheDocument();
    expect(getByText('Test Children test')).toBeInTheDocument();
  });

  test('should not render help text if in view mode', () => {
    const { queryByText } = render(
      <Field {...commonProps} isEdit={false} helpText="help text" />
    );
    expect(queryByText('help text')).not.toBeInTheDocument();
  });

  test('should render help text if in edit mode', () => {
    const { getByText } = render(
      <Field {...commonProps} isEdit={true} helpText="help text" />
    );
    expect(getByText('help text')).toBeInTheDocument();
  });

  test('should not render error text if in view mode', () => {
    const { queryByText } = render(
      <Field {...commonProps} isEdit={false} error="error text" />
    );
    expect(queryByText('error text')).not.toBeInTheDocument();
  });

  test('should render error text if in edit mode', () => {
    const { getByText } = render(
      <Field {...commonProps} isEdit={true} error="error text" />
    );
    expect(getByText('error text')).toBeInTheDocument();
  });
});
