import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import {
  IconName,
  IconPrefix,
  IconProp,
  IconDefinition,
  SizeProp,
} from '@fortawesome/fontawesome-svg-core';

export interface IconProps {
  /** A FontAwesomeIcon name or imported icon, must be added to your font-awesome library */
  icon: string | IconDefinition;
  /** A FontAwesomeIcon family, must be added to your font-awesome library */
  iconPrefix?: string;
  /** Classname(s) for the icon */
  className?: string;
  /** size of the icon, corresponds to FontAwesome sizes */
  size?: SizeProp;
}
export const Icon: FC<IconProps> = ({
  className,
  icon,
  iconPrefix,
  size,
}): React.ReactElement => {
  const classNames = cx('fui-icon', className);
  let faIcon: IconProp;
  if (iconPrefix) {
    faIcon = [iconPrefix, icon] as [IconPrefix, IconName];
  } else {
    faIcon = icon as IconName;
  }
  return <FontAwesomeIcon className={classNames} icon={faIcon} size={size} />;
};

Icon.defaultProps = {
  size: '1x',
};
