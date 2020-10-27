import React, { FC } from 'react';

export interface CardProps {
  /** React Component(s) */
  children: React.ReactNode;
  /** Classname(s) for the wrapping element */
  classNames?: string;
}

const rootClassName = 'fui-card';

export const Card: FC<CardProps> = ({ children, classNames }): React.ReactElement => (
  <div className={`${rootClassName}--container ${classNames ? ` ${classNames}` : ''}`}>
    <div className={`${rootClassName}--body`}>{children}</div>
  </div>
);

Card.defaultProps = {
  classNames: '',
};
