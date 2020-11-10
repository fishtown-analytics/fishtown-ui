import React, { FC } from 'react';
import cx from 'classnames';
import { v4 as uuidv4 } from 'uuid';

export interface FieldInputProps {
  id: string;
  error?: React.ReactNode;
}

export interface FieldProps {
  /** Field Label */
  label: string;
  /** Classname string */
  className?: string;
  /** Displayed when `isEdit` is `false` */
  displayValue?: React.ReactNode;
  /** Displayed under field, descriptive text, only when `isEdit` is `true` */
  helpText?: React.ReactNode;
  /** flag to enable edit mode */
  isEdit?: boolean;
  /** Unique id for the field, used to tie label to form field, passed as an inner prop to the input */
  fieldId?: string;
  /** Render prop for the edit view input, passed `FieldInputProps` */
  input?(props: FieldInputProps): React.ReactNode;
  /** Children (as a render prop) can also be used for the edit input */
  children?(props: FieldInputProps): React.ReactNode;
  /** Error text, only displayed when `isEdit` is `true` */
  error?: React.ReactNode;
}

export const Field: FC<FieldProps> = ({
  label,
  className,
  children,
  displayValue,
  input,
  fieldId = `field_${uuidv4()}`,
  isEdit,
  helpText,
  error,
}): React.ReactElement => {
  const classNames = cx(
    'fui-field-row',
    'tw-flex',
    'tw-flex-row',
    'tw-pt-2',
    'tw-pb-2',
    className,
    {
      'fui-field-row--is-view': !isEdit,
      'fui-field-row--is-edit': isEdit,
      'fui-field-row--is-invalid': error,
    }
  );
  const hasHelpText = isEdit && helpText;
  const hasInput = isEdit && !!input;
  const hasChildren = isEdit && !input && !!children;
  const inputProps: FieldInputProps = {
    id: fieldId,
    error,
  };

  return (
    <div className={classNames} data-testid={fieldId}>
      <div className="fui-field-row__label">
        <label htmlFor={fieldId}>{label}</label>
      </div>
      <div className="fui-field-row__value">
        {hasInput && input && input(inputProps)}
        {!hasInput && hasChildren && children && children(inputProps)}
        {hasHelpText && (
          <p className="tw-text-xs tw-text-gray-600 tw-italic tw-mt-1 tw-mb-1">
            {helpText}
          </p>
        )}
        {isEdit && error && (
          <ul className="tw-text-orange tw-list-disc tw-list-inside tw-text-xs tw-italic tw-mt-1 tw-mb-1">
            <li>{error}</li>
          </ul>
        )}
        {!isEdit && displayValue}
      </div>
    </div>
  );
};

Field.defaultProps = {
  isEdit: false,
  displayValue: '',
};
