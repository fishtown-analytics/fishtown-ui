import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Checkbox } from './Checkbox';

describe('Component Checkbox', () => {
  test('should render without label text', () => {
    const { container } = render(<Checkbox id="test" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render as checked by default if isDefaultChecked is true', () => {
    const { getByTestId } = render(<Checkbox id="test" isCheckedDefault />);
    expect(getByTestId('test').getAttribute('checked')).not.toBe(null);
  });

  test('should render as disabled if isDisabled is true', () => {
    const { getByTestId } = render(<Checkbox id="test" isDisabled />);
    expect(getByTestId('test').getAttribute('disabled')).not.toBe(null);
  });

  test('should render a label if children are provided', () => {
    const { getByText } = render(<Checkbox id="test">Test Label</Checkbox>);
    expect(getByText('Test Label')).toBeInTheDocument();
  });

  test('should handle onChange actions', () => {
    const onChange = jest.fn();
    const { getByTestId, getByText } = render(
      <Checkbox id="test" onChange={onChange}>
        Test Label
      </Checkbox>
    );
    fireEvent.click(getByTestId('test_checkbox'), { target: { checked: true } });

    expect(onChange.mock.calls[0][0]).toBe(true);

    fireEvent.click(getByText('Test Label'), { target: { checked: false } });
    expect(onChange.mock.calls[1][0]).toBe(false);
  });
});
