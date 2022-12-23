import { render, screen } from '@testing-library/react';

import List from '.';
import React from 'react';

test('renders learn react link', () => {
  const title = 'test list title';
  render(<List title={title} items={[]} />);
  const messageProp = screen.getByText(/test list title/i);
  expect(messageProp).toBeInTheDocument();
});
