import React from 'react';
import { render } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';

import { Input } from './Input';

describe('Component Input', () => {
  test('should render an input defaulted to text', () => {
    const { container } = render(<Input id="test" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should pass through any supported html input props', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { container } = render(
      <Input
        name="test"
        id="test"
        type="text"
        disabled={true}
        aria-label="test"
        data-test="test"
        ref={ref}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(ref.current?.getAttribute('id')).toBe('test');
  });

  test('should call onChange callbacks', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <Input id="test" data-testid="test" onChange={handleChange} />
    );
    fireEvent.type(getByTestId('test'), 'test');
    expect(handleChange).toHaveBeenCalled();
  });
});
