import * as React from 'react';
import cx from 'classnames';

export interface ButtonProps {
  variant?: string;
  size?: 'small' | 'medium' | 'large';
  isDisabled?: boolean;
  title?: string;
  className?: string;
  onClick?(): any;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'basic',
  size = 'medium',
  isDisabled,
  title,
  className,
  children,
  ...props
}) => {
  const isSmall = size === 'small';
  const isMedium = size === 'medium';
  const isLarge = size === 'large';
  const classNames = cx(
    {
      'tw-py-1 tw-px-2': isSmall,
      'tw-py-2 tw-px-4': isMedium,
      'tw-py-4 tw-px-8': isLarge,
    },
    'tw-bg-teal-500',
    'tw-text-white',
    'tw-transition-colors',
    'tw-duration-200',
    'tw-font-bold',
    'tw-rounded',
    'tw-select-none',
    // Stateful styles
    'hover:tw-bg-teal-700',
    'disabled:tw-bg-gray-500',
    'disabled:tw-cursor-not-allowed',
    className,
  );

  return (
    <button
      title={title}
      disabled={isDisabled}
      type="button"
      className={classNames}
      {...props}
    >
      {children}
    </button>
  );
};
