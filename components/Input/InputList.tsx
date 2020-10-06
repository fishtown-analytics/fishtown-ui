import React, { useEffect, FC } from 'react';

import { InputListItem } from './InputListItem';
import { Icon } from '../Icon/Icon';

export interface InputListValue {
  value: string;
}

export interface InputListProps {
    /** List of the input values */
    values: [];
    /** Callback triggered when the input list state changes */
    onAdd?: () => void;
    /** Callback triggered when the input list state changes */
    onDelete?: (index: number) => void;
    /** Classname(s) for the wrapping element */
    classNames?: string;
    /** Callback triggered when the input list state changes */
    onChange?: (value: string[]) => void;
    /** Callback triggered when the input list state changes */
    onEdit?: (value: string, index: number) => void;
    /** List of React Nodes */
    children?: React.ReactNode | React.ReactNode[] | string;
    /** A true/false toggle for the input list state, if disabled interactions are disabled */
    isDisabled?: boolean;
}

const rootClassName = 'fui-input-list';

export const InputList: FC<InputListProps> = ({
  classNames,
  children,
  onAdd,
  onChange,
  onDelete,
  onEdit,
  values,
  isDisabled,
}): React.ReactElement => {
  useEffect(() => {
    if (onChange) {
      onChange(values);
    }
  }, [values, onChange]);

  return (
    <div className={`${rootClassName}${classNames ? ` ${classNames}` : ''}`}>
      <div className={`${rootClassName}__body`}>
        {values.map((value, index) => {
          return (
            <div key={index}>
              <InputListItem
                value={value}
                index={index}
                onDelete={onDelete}
                onEdit={onEdit}
                isDisabled={isDisabled}
              />
            </div>
          );
        })}
      </div>
      <span className={`${rootClassName}__footer`}>
        {!isDisabled && (
          <a onClick={onAdd} className={`${rootClassName}__footer__add`}>
            <Icon icon="plus" size="sm" />
            Add
          </a>
        )}

        {children}
      </span>
    </div>
  );
};
