import { ValidationRules } from 'react-hook-form';

import { SchemaField, SchemaValidation } from '../types';

export type ValidationValue = string | number | boolean | RegExp;
export type Validator = (
  value: ValidationValue,
  field: SchemaField
) => Record<string, ValidationValue>;

const patternValidators: Record<string, Record<string, string | RegExp>> = {
  email: {
    value: /^\S+@\S+$/i,
    message: 'must be a valid email address',
  },
  hostname: {
    value: /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/i,
    message: 'must be a valid host name',
  },
  fqdn: {
    value: /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/i,
    message: 'must be a valid url',
  },
};

const validators: Record<string, Validator> = {
  required: (value, field) => ({
    required: value ? `${field.metadata.label} is required.` : false,
  }),
  min: (value, field) => ({
    value,
    message: `${field.metadata.label} must be greater than ${value}.`,
  }),
  max: (value, field) => ({
    value,
    message: `${field.metadata.label} must be less than ${value}.`,
  }),
  minLength: (value, field) => ({
    value,
    message: `${field.metadata.label} must be shorter than ${value} characters.`,
  }),
  maxLength: (value, field) => ({
    value,
    message: `${field.metadata.label} must be longer than ${value} characters.`,
  }),

  pattern: (value, field) => {
    const { value: regexValue, message } = patternValidators[String(value)];
    return {
      value: regexValue,
      message: `${field.metadata.label} ${message}`,
    };
  },
};

export const validationRules = (
  validation: SchemaValidation,
  field: SchemaField
): ValidationRules => {
  const validationTypes = Object.keys(validation);

  const rules = validationTypes.reduce(
    (validationRules: ValidationRules, validationKey: string) => {
      if (validators[validationKey]) {
        const rule = validators[validationKey](validation[validationKey], field);
        const normalizedKey = patternValidators[validationKey]
          ? 'pattern'
          : validationKey;

        validationRules = {
          ...validationRules,
          [normalizedKey]: rule.required ? rule.required : rule,
        };
      }
      return validationRules;
    },
    {}
  );

  return rules;
};
