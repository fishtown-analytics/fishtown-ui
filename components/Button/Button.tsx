import * as React from 'react';

export interface ButtonProps {
  variant?: string;
  size?: 'small' | 'medium' | 'large';
  isDisabled?: boolean;
  title?: string;
  classNames?: string;
  onClick?(): any;
}

const rootClassName = 'fui-button';

export const Button: React.FC<ButtonProps> = ({
  variant = 'basic',
  size = 'medium',
  isDisabled,
  title,
  classNames,
  children,
  ...props
}) => {
  return (
    <button
      title={title}
      disabled={isDisabled}
      type="button"
      className={`${rootClassName}-${size} ${rootClassName}-${variant} ${
        classNames ? ` ${classNames}` : ''
      }`}
      {...props}
    >
      {children}
    </button>
  );
};
