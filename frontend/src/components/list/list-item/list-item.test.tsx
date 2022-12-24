import { render, screen } from '@testing-library/react';

import ListItem from '.';
import React from 'react';

test('renders ListItem text', () => {
  const text = 'Nimble Soup';
  render(<ListItem text={text} completed={false} index={0} />);
  const element = screen.getByText('Nimble Soup');
  expect(element).toBeInTheDocument();
});
