import * as React from 'react';

export interface ButtonProps {
  variant?: string;
  size?: 'small' | 'medium' | 'large';
  isDisabled?: boolean;
  title?: string;
  className?: string;
  onClick?(): any;
}

const rootClassName = 'fui-button';

export const Button: React.FC<ButtonProps> = ({
  variant = 'basic',
  size = 'medium',
  isDisabled,
  title,
  className,
  children,
  ...props
}) => {
  return (
    <button
      title={title}
      disabled={isDisabled}
      type="button"
      className={`${rootClassName}-${size} ${rootClassName}-${variant} ${
        className ? ` ${className}` : ''
      }`}
      {...props}
    >
      {children}
    </button>
  );
};
