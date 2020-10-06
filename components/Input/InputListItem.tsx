import React, { FC } from 'react';
import { Icon } from '../Icon/Icon';

export interface InputListItemProps {
    /** Value of the Input */
    value: string;
    /** Input index in list */
    index: number;
    /** Classname(s) for the wrapping element */
    classNames?: string;
    /** A true/false toggle for the input state, if disabled interactions are disabled */
    isDisabled?: boolean;
    /** Callback triggered when the input list item state changes */
    onDelete?: (index: number) => void;
    /** Callback triggered when the input list item state changes */
    onEdit?: (value: string, index: number) => void;
}

const rootClassName = 'fui-input-list-item';

export const InputListItem: FC<InputListItemProps> = ({
  index,
  onDelete,
  onEdit,
  classNames,
  value,
  isDisabled,
}): React.ReactElement => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(index);
    }
  };

  const handleChange = (e) => {
    if (onEdit) {
      onEdit(e.target.value, index);
    }
  };

  return (
    <div className={`${rootClassName} ${classNames ? ` ${classNames}` : ''}`}>
      <input
        data-testid="input-list-item-field"
        className={`${rootClassName}__field`}
        name=""
        value={value}
        onChange={handleChange}
        disabled={isDisabled}
      />
      {!isDisabled && (
        <a
          onClick={handleDelete}
          data-testid="input-list-item-delete"
          className={`${rootClassName}__delete`}
        >
          <Icon icon="trash" size="sm" />
        </a>
      )}
    </div>
  );
};
