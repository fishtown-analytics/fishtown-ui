import { SelectOption } from '../Select';

export interface SchemaValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: 'email' | 'hostname' | 'fqdn';
}

export interface SchemaField {
  metadata: {
    id?: string;
    field_type: 'text' | 'number' | 'select' | 'hidden';
    label: string;
    description: string;
    encrypt?: boolean;
    options?: SelectOption[];
    validation?: SchemaValidation;
    depends_on?: Record<string, string | number | boolean>;
  };
  value: string | number | SelectOption;
}

export interface FormSchema {
  fields: Record<string, SchemaField>;
  field_order: string[];
}
