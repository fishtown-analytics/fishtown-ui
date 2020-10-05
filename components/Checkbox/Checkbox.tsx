import React, { FC, useState, useEffect, useCallback } from 'react';
import cx from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { Icon } from '../Icon';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export interface CheckboxProps {
  /** Name of the input */
  name?: string;
  /** Unique ID for the input element */
  id?: string;
  /** Classname(s) for the wrapping element */
  className?: string;
  /** The checkbox state at initial render */
  isCheckedDefault?: boolean;
  /** Used to lock the checkbox state for programatic control */
  isChecked?: boolean;
  /** A true/false toggle for the checkbox state, if disabled interactions are disabled */
  isDisabled?: boolean;
  /** Callback triggered when the checkbox state changes */
  onChange?(isChecked: boolean, event?: React.ChangeEvent): void;
}

const rootClassName = 'fui-checkbox';

/** A Checkbox! */
export const Checkbox: FC<CheckboxProps> = ({
  children,
  className,
  isCheckedDefault,
  isChecked,
  isDisabled,
  id,
  name,
  onChange,
}): React.ReactElement => {
  const isCheckedNotSet = isChecked === undefined;
  const [checked, setChecked] = useState<boolean>(
    isCheckedNotSet ? !!isCheckedDefault : !!isChecked
  );
  const classNames = cx([rootClassName, className], {
    [`${rootClassName}--is-checked`]: checked,
    [`${rootClassName}--is-disabled`]: isDisabled,
  });
  const handleChange = useCallback(
    (event: React.ChangeEvent): void => {
      if (!isDisabled) {
        if (isCheckedNotSet) {
          setChecked(!checked);
        }
        if (onChange) {
          onChange(!checked, event);
        }
      }
    },
    [checked, isCheckedNotSet, isDisabled, onChange]
  );

  useEffect(() => {
    if (isChecked !== undefined) {
      setChecked(isChecked);
    }
  }, [isChecked]);

  return (
    <div className={classNames}>
      <label htmlFor={id}>
        <div className={`${rootClassName}_checkbox`}>
          <Icon icon={faCheck} size="xs" />
        </div>
        <div className={`${rootClassName}_label`}>{children}</div>
        <input
          className="tw-hidden"
          name={name || id}
          id={id}
          type="checkbox"
          onChange={handleChange}
          checked={checked}
          disabled={isDisabled}
        />
      </label>
    </div>
  );
};

Checkbox.defaultProps = {
  id: `checkbox_${uuidv4()}`,
  isCheckedDefault: false,
  isDisabled: false,
};
