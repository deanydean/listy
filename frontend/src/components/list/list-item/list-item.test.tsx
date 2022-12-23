import { render, screen } from '@testing-library/react';

import ListItem from '.';
import React from 'react';

test('renders learn react link', () => {
  const text = 'Nimble Soup';
  render(<ListItem text={text} complete={false} />);
  const messageProp = screen.getByText(/Nimble Soup/i);
  expect(messageProp).toBeInTheDocument();
});
