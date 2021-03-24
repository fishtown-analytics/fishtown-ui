import React, { FC, useCallback, useEffect, useState } from 'react';
import ReactSelect, { Props as ReactSelectProps, components } from 'react-select';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid } from 'uuid';
import cx from 'classnames';

import { Icon } from '../../Icon';

export interface SelectOption {
  label: string;
  sectionHeader?: string;
  value?: any;
  meta?: string;
  options?: SelectOption[];
}

export interface SelectProps extends ReactSelectProps<SelectOption> {
  id?: string;
  autoFocus?: boolean;
  className?: string;
  error?: string;
  groupingMetaLabel?: string;
  isDisabled?: boolean;
  options?: SelectOption[];
  value?: SelectOption | null;
  portal?: boolean;
  onChange?(value: SelectOption): void;
}

const Option: FC = (props: any) => (
  <components.Option {...props}>
    <div className="fui-select__option_value">
      <Icon icon={faCheck} className="tw-inline" />
      {props.data.label}
    </div>
    {props.data.meta && (
      <div className="fui-select__option_meta">{props.data.meta}</div>
    )}
  </components.Option>
);

export const Select: FC<SelectProps> = (props: SelectProps): React.ReactElement => {
  const { groupingMetaLabel, value } = props;
  const [localValue, setValue] = useState(value);
  const classNames = cx('fui-select-container', props.className, {
    'fui-select--is-errored': !!props.error,
  });
  const innerSelectProps = { 'aria-labelledby': props.id, ...props };
  useEffect(() => {
    setValue(value);
  }, [value]);
  const handleChange = useCallback(
    (selected: SelectOption): void => {
      const { onChange } = props;
      if (onChange) {
        onChange(selected);
      }
      setValue(selected);
    },
    [props]
  );
  // Used if options are an array of groupings
  const formatGroupLabel = useCallback(
    (data): React.ReactNode => (
      <>
      {data.sectionHeader && <div className="fui-select__section-header">{data.sectionHeader}</div>}
      <div className={"fui-select__grouplabel"}>
        <div className="fui-select__grouplabel_title">{data.label}</div>
        <div className="fui-select__grouplabel_meta">
          {groupingMetaLabel || (data.options && data.options.length)}
        </div>
      </div>
      </>
    ),
    [groupingMetaLabel]
  );

  return (
    <ReactSelect
      {...innerSelectProps}
      onChange={handleChange}
      value={localValue}
      className={classNames}
      classNamePrefix="fui-select"
      components={{ Option }}
      formatGroupLabel={formatGroupLabel}
      menuPortalTarget={props.portal ? document.body : undefined}
    />
  );
};

Select.defaultProps = {
  id: `select_${uuid()}`,
  autoFocus: false,
  className: '',
  options: [],
  value: null,
  portal: false,
};
