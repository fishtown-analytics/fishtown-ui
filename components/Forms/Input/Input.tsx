import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import cx from 'classnames';
import { v4 as uuidv4 } from 'uuid';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'password' | 'number' | 'email' | 'hidden' | 'search' | 'tel';
}

const ForwardInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { type = 'text', id = `field_${uuidv4()}`, className, ...restProps }: InputProps,
  ref: React.MutableRefObject<HTMLInputElement>
): React.ReactElement => {
  const classNames = cx('fui-field-row__input', className);
  return (
    <>
      <input ref={ref} className={classNames} id={id} type={type} {...restProps} />
    </>
  );
};

export const Input = forwardRef(ForwardInput);
