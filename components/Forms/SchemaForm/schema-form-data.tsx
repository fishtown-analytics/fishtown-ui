import React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '../../Button';

import { FormSchema } from './types';

export const ExampleWrapper = ({ isEdit, children }) => {
  const { handleSubmit, getValues, errors, register, formState, control } = useForm();
  return (
    <form>
      {children({ errors, register, getValues, control, isEdit, formState })}
      {isEdit && (
        <Button onClick={handleSubmit((values) => console.log(values))}>
          Validate
        </Button>
      )}
    </form>
  );
};
export const decorators = [
  (Story, { args }) => (
    <ExampleWrapper isEdit={args.isEdit}>
      {(innerProps) => Story({ args: { ...innerProps, extraArgs: args } })}
    </ExampleWrapper>
  ),
];

export const basicSchema: FormSchema = {
  fields: {
    one: {
      metadata: {
        label: 'First Field',
        field_type: 'text',
        description: 'This is the first field',
        validation: {},
        depends_on: {},
      },
      value: 1,
    },
    two: {
      metadata: {
        label: 'Third Field',
        field_type: 'text',
        description: 'This is the third field',
        validation: {},
        depends_on: {},
      },
      value: 2,
    },
    three: {
      metadata: {
        label: 'Second Field',
        field_type: 'text',
        description: 'This is the second field',
        validation: {},
        depends_on: {},
      },
      value: 3,
    },
    four: {
      metadata: {
        label: 'Select Field',
        field_type: 'select',
        options: [
          { label: 'Value 1', value: '1' },
          { label: 'Value 2', value: '2' },
        ],
        description: 'This is a select field',
        validation: {},
        depends_on: {},
      },
      value: '2',
    },
  },
  field_order: ['one', 'three', 'two', 'four'],
};

export const validationSchema: FormSchema = {
  fields: {
    required: {
      metadata: {
        label: 'Required',
        field_type: 'text',
        description: 'This field is required!',
        validation: {
          required: true,
        },
        depends_on: {},
      },
      value: '',
    },
    min: {
      metadata: {
        label: 'Minimum',
        field_type: 'number',
        description: 'This field has a minimum required value of 3',
        validation: {
          min: 3,
        },
        depends_on: {},
      },
      value: 1,
    },
    max: {
      metadata: {
        label: 'Maximum',
        field_type: 'number',
        description: 'This field has a maximum required value of 5',
        validation: {
          max: 5,
        },
        depends_on: {},
      },
      value: 7,
    },
    minLength: {
      metadata: {
        label: 'Min Length',
        field_type: 'text',
        description: 'This field has a minimum required length of 10',
        validation: {
          minLength: 10,
        },
        depends_on: {},
      },
      value: 'too short',
    },
    maxLength: {
      metadata: {
        label: 'Max Length',
        field_type: 'text',
        description: 'This field has a maximum required length of 5',
        validation: {
          maxLength: 5,
        },
        depends_on: {},
      },
      value: 'too long',
    },
    email: {
      metadata: {
        label: 'Email',
        field_type: 'text',
        description: 'This field must be a valid email address',
        validation: {
          pattern: 'email',
        },
        depends_on: {},
      },
      value: 'not an email',
    },
    hostname: {
      metadata: {
        label: 'Host Name',
        field_type: 'text',
        description: 'This field must be a valid hostname',
        validation: {
          pattern: 'hostname',
        },
        depends_on: {},
      },
      value: 'not a hostname',
    },
    url: {
      metadata: {
        label: 'URL',
        field_type: 'text',
        description: 'This field must be a valid url',
        validation: {
          required: true,
          pattern: 'fqdn',
        },
        depends_on: {},
      },
      value: 'not a url',
    },
  },
  field_order: [
    'required',
    'min',
    'max',
    'minLength',
    'maxLength',
    'email',
    'hostname',
    'url',
  ],
};

export const dependsSchema: FormSchema = {
  fields: {
    unconditional: {
      metadata: {
        label: 'Unconditional Field',
        field_type: 'text',
        description: 'This is the first field',
        validation: {},
        depends_on: {},
      },
      value: `I don't depend on anything!`,
    },
    conditional_trigger: {
      metadata: {
        label: 'Select Field',
        field_type: 'select',
        options: [
          { label: 'Condition 1', value: '1' },
          { label: 'Condition 2', value: '2' },
        ],
        description: 'This field determines the rest of the form',
        validation: {
          required: true,
        },
        depends_on: {},
      },
      value: '1',
    },
    conditional_sub: {
      metadata: {
        label: 'Sub-Conditional Field',
        field_type: 'text',
        description: 'This is conditional on both selects',
        validation: {},
        depends_on: {
          conditional_trigger: 1,
          conditional_1: 'show',
        },
      },
      value: 'Extra Conditional!',
    },
    conditional_1: {
      metadata: {
        label: 'Conditional Field 1',
        field_type: 'select',
        description:
          'This is conditional on the select, it also determines the display of a sub-conditional',
        options: [
          { label: "Don't Show more", value: 'noshow' },
          { label: 'Show More', value: 'show' },
        ],
        validation: {},
        depends_on: {
          conditional_trigger: 1,
        },
      },
      value: 'noshow',
    },
    conditional_2: {
      metadata: {
        label: 'Conditional Field 2',
        field_type: 'text',
        description: 'This is conditional on the top-level select',
        validation: {},
        depends_on: {
          conditional_trigger: 2,
        },
      },
      value: 'Conditional based on 2',
    },
  },
  field_order: [
    'unconditional',
    'conditional_trigger',
    'conditional_1',
    'conditional_2',
    'conditional_sub',
  ],
};

export const realWorldSchema: FormSchema = {
  fields: {
    type: {
      metadata: {
        label: 'Connection type',
        description: 'Type of connection.',
        field_type: 'hidden',
        encrypt: false,
        validation: {
          required: false,
        },
      },
      value: 'spark',
    },
    method: {
      metadata: {
        label: 'Method',
        description: 'Method of spark connection.',
        field_type: 'select',
        options: [
          { label: 'HTTP', value: 'http' },
          { label: 'Thrift', value: 'thirft' },
        ],
        encrypt: false,
        validation: {
          required: false,
        },
      },
      value: 'http',
    },
    host_type: {
      metadata: {
        label: 'Databricks Host Type',
        description: 'Who hosts your databricks cluster?',
        field_type: 'select',
        options: [
          { label: 'Amazon', value: 'amazon' },
          { label: 'Azure', value: 'azure' },
        ],
        depends_on: {
          method: 'http',
        },
        encrypt: false,
      },
      value: 'amazon',
    },
    host: {
      metadata: {
        label: 'Hostname',
        description: 'Host name of connection.',
        field_type: 'text',
        encrypt: false,
        validation: {
          required: false,
        },
      },
      value: '',
    },
    port: {
      metadata: {
        label: 'Port',
        description: 'Port number of host.',
        field_type: 'number',
        encrypt: false,
        validation: {},
      },
      value: 443,
    },
    cluster: {
      metadata: {
        label: 'Cluster',
        description: 'Cluster name',
        field_type: 'text',
        encrypt: false,
        validation: {
          required: false,
        },
      },
      value: '',
    },
    connect_timeout: {
      metadata: {
        label: 'Connection Timeout',
        description: 'Connection timeout in seconds',
        field_type: 'number',
        encrypt: false,
        validation: {},
      },
      value: 10,
    },
    connect_retries: {
      metadata: {
        label: 'Connection Retries',
        description: 'Connection retries in integer',
        field_type: 'number',
        encrypt: false,
        validation: {},
      },
      value: 0,
    },
    organization: {
      metadata: {
        label: 'Organization',
        description: 'Organization id',
        field_type: 'text',
        encrypt: false,
        validation: {
          required: false,
        },
        depends_on: {
          method: 'http',
          host_type: 'azure',
        },
      },
      value: '',
    },
  },
  field_order: [
    'type',
    'method',
    'host_type',
    'host',
    'port',
    'organization',
    'cluster',
    'user',
    'connect_timeout',
    'connect_retries',
  ],
};

export const externalConditionalSchema: FormSchema = {
  fields: {
    unconditional: {
      metadata: {
        label: 'Unconditional Field',
        field_type: 'text',
        description: 'Never gonna let you go',
        validation: {},
        depends_on: {},
      },
      value: `I'm here to stay.`,
    },
    conditional: {
      metadata: {
        label: 'External Conditional',
        field_type: 'text',
        description: 'I only show based on external state',
        validation: {},
        depends_on: { showMore: true },
      },
      value: `I'm conditionally here!`,
    },
  },
  field_order: ['unconditional', 'conditional'],
};
