import * as React from 'react';

export interface ButtonProps {
  variant?: 'basic';
  size?: 'small' | 'medium' | 'large';
  isDisabled?: false;
  title?: '';
  classNames?: '';
  onClick?: () => void;
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
    <button title={title} disabled={isDisabled} type="button" className={`${rootClassName}-${size} ${rootClassName}-${variant} ${classNames ? ` ${classNames}` : ''}`} {...props}>
      {children}
    </button>
  );
};
