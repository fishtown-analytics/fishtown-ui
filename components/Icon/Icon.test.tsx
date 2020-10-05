import React from 'react';
import { render } from '@testing-library/react';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Icon } from './Icon';

describe('Component Icon', () => {
  test('should render with an imported icon', () => {
    const { container } = render(<Icon icon={faCoffee} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
