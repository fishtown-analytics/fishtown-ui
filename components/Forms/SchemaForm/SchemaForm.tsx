import React, { FC, useMemo } from 'react';
import {
  Controller,
  Control,
  UseFormMethods,
  ValidationRules,
  useWatch,
} from 'react-hook-form';

import { Field } from '../Field';
import { Input } from '../Input';
import { Select, SelectOption } from '../Select';

import { FormSchema } from './types';
import { validationRules } from './helpers';

export interface SchemaFormProps {
  schema: FormSchema;
  control: Control;
  isEdit?: boolean;
  errors?: Record<string, string | { submitCount: number; errorCount: number }>;
  register: UseFormMethods['register'];
  getValues?: UseFormMethods['getValues'];
}

export const SchemaForm: FC<SchemaFormProps> = ({
  schema,
  isEdit = false,
  register,
  control,
  errors = {},
  getValues = () => ({}),
}): React.ReactElement => {
  const fieldOrder = useMemo(() => schema.field_order || Object.keys(schema.fields), [
    schema.field_order,
    schema.fields,
  ]);
  // The hook values (from react-hook-form) only populate after the first submit
  // We'll mix them together with the default values (prefer the react-hook-form values)
  const hookValues = getValues();
  const knownValues = useMemo(() => {
    if (Object.keys(hookValues).length === 0) {
      return fieldOrder.reduce((fieldValues, fieldKey) => {
        const field = schema.fields[fieldKey];
        if (field) {
          fieldValues[fieldKey] =
            field.metadata.field_type === 'select'
              ? String((field.value as Record<string, any>).value)
              : String(field.value);
        }
        return fieldValues;
      }, {});
    } else {
      return hookValues;
    }
  }, [fieldOrder, hookValues, schema.fields]);

  // Calculate which fields have fields that depend on them
  const dependedOn = Object.keys(
    fieldOrder.reduce((allDepends: Record<string, string>, fieldKey: string) => {
      const field = schema.fields[fieldKey];
      if (field) {
        const innerDepends = Object.keys(field.metadata?.depends_on ?? {}).reduce(
          (depends, depend) => {
            depends[depend] = 1;
            return depends;
          },
          {}
        );
        return { ...allDepends, ...innerDepends };
      }
      return allDepends;
    }, {})
  );

  // Create react-hook-form watchers to re-render when values change
  const watchedValues = useWatch({
    control,
    name: dependedOn,
    defaultValue: dependedOn.reduce((defaultValues, fieldKey) => {
      const field = schema.fields[fieldKey];
      if (field) {
        defaultValues[fieldKey] = String(field.value);
      }
      return defaultValues;
    }, {}),
  });

  // Mix together any watched values with provided getValues values and extra info we might care about
  const currentValues = {
    ...knownValues,
    ...watchedValues,
  };

  // Create our array of fields to render
  const fields = fieldOrder.map((fieldKey) => {
    const field = schema.fields[fieldKey];
    if (field) {
      const validation: ValidationRules = field.metadata.validation
        ? validationRules(field.metadata.validation, field)
        : {};

      const dependencyMap = field.metadata?.depends_on ?? {};
      const dependencies = Object.keys(dependencyMap);

      let shouldShowField = true;

      if (dependencies) {
        shouldShowField = dependencies.every((dependency) => {
          const isDependencySelect = currentValues[dependency].value !== undefined;
          const value = isDependencySelect
            ? currentValues[dependency].value
            : currentValues[dependency];
          return (
            value === dependencyMap[dependency] ||
            value === String(dependencyMap[dependency])
          );
        });
      }
      // Avoid passing non-standard html props into a field
      const { encrypt, ...fieldMeta } = field.metadata;
      if (field.metadata.field_type === 'hidden') {
        return (
          <Input
            key={fieldKey}
            id={fieldMeta.id}
            type={field.metadata.field_type}
            defaultValue={String(field.value || '')}
            name={fieldKey}
            ref={register(validation)}
            {...fieldMeta}
          />
        );
      } else if (field.metadata.field_type === 'select') {
        const selectedOption: SelectOption | undefined = field.metadata.options?.find(
          (option) => option.value === field.value
        );
        return (
          <Field
            className={!shouldShowField ? 'tw-hidden' : ''}
            key={fieldKey}
            label={field.metadata.label}
            isEdit={isEdit}
            displayValue={selectedOption?.label ?? (field.value || '')}
            error={errors[fieldKey]}
            helpText={field.metadata.description}
            fieldId={field.metadata.id}
          >
            {(fieldProps) => (
              <Controller
                control={control}
                name={fieldKey}
                defaultValue={field.value}
                render={({ onChange }) => (
                  <Select
                    {...fieldProps}
                    onChange={onChange}
                    options={field.metadata.options}
                    value={selectedOption}
                    error={errors[fieldKey] ? String(errors[fieldKey]) : undefined}
                  />
                )}
              />
            )}
          </Field>
        );
      } else {
        // If all else fails, use an Input
        return (
          <Field
            className={!shouldShowField ? 'tw-hidden' : ''}
            key={fieldKey}
            fieldId={field.metadata.id}
            label={field.metadata.label}
            isEdit={isEdit}
            displayValue={field.value || ''}
            error={errors[fieldKey]}
            helpText={field.metadata.description}
          >
            {(innerProps) => (
              <Input
                {...innerProps}
                type={
                  field.metadata.field_type !== 'select'
                    ? field.metadata.field_type
                    : 'hidden'
                }
                defaultValue={String(field.value || '')}
                name={fieldKey}
                ref={register(validation)}
                {...fieldMeta}
              />
            )}
          </Field>
        );
      }
    }
  });

  return <>{fields}</>;
};
