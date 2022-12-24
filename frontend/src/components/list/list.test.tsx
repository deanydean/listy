import { render, screen } from '@testing-library/react';

import List from '.';
import { ListItem } from '../../models/list';
import React from 'react';

test('renders lists with the correct title', () => {
  render(<List title="Test List" items={[]} />);
  const element = screen.getByText('Test List');
  expect(element).toBeInTheDocument();
});

test('renders lists with the correct list items', () => {
  const listItem: ListItem = {
    text: 'test list item',
    index: 0,
    completed: false,
  };
  render(<List title="Test List" items={[listItem]} />);
  const element = screen.getByText('test list item');
  expect(element).toBeInTheDocument();
});
