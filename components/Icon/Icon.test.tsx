import React from 'react';
import { render } from '@testing-library/react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Icon } from './Icon';

library.add(faCoffee);

describe('Component Icon', () => {
  test('should render with an imported icon', () => {
    const { container } = render(<Icon icon={faCoffee} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render with a library icon string and prefix', () => {
    const { container } = render(<Icon icon="coffee" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
