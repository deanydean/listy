import {
  ListItem as ListItemModel,
  List as ListModel,
} from '../../models/list';
import { render, screen } from '@testing-library/react';

import List from '.';
import React from 'react';

// MOCK API SERVICE RESPONSE for inital render, delete, and create?

test('renders title', () => {
  const list: ListModel = { title: 'Test List', items: [] };
  render(<List list={list} />);
  const element = screen.getByText('Test List');
  expect(element).toBeInTheDocument();
});

test('renders a delete control', () => {
  const list: ListModel = { title: 'Test List', items: [] };
  render(<List list={list} />);
  const element = screen.getByText('Delete this list?');
  expect(element).toBeInTheDocument();
});

it('renders a control to create new list items', () => {
  const list: ListModel = { title: 'Test List', items: [] };
  render(<List list={list} />);
  const element = screen.getByPlaceholderText('Add list item...');
  expect(element).toBeInTheDocument();
  expect(element.getAttribute('maxLength')).toBe('150');
});

test('renders list items', () => {
  const listItem: ListItemModel = {
    text: 'test list item',
    completed: false,
  };
  const list: ListModel = { title: 'Test List', items: [listItem] };
  render(<List list={list} />);
  const element = screen.getByText('test list item');
  expect(element).toBeInTheDocument();
});

// test('renders new list items when they are created', () => {
//   const list: ListModel = { title: 'Test List', items: [] };
//   render(<List list={list} />);
//   const listElement = screen.getByPlaceholderText('Add list item...');
//   userEvent.type(listElement, '123{enter}');
//   const listItemElement = screen.getByText('123');
//   expect(listItemElement).toBeInTheDocument();
// });

// test('renders list items again after deleting a list item, with the deleted item removed', () => {
//   const listItem: ListItemModel = {
//     text: 'test list item',
//     completed: true,
//   };
//   const list: ListModel = { title: 'Test List', items: [listItem] };
//   render(<List list={list} />);
//   const listItemElement = screen.getByText('test list item');
//   const deleteButtonElement = screen.getByRole('button');
//   expect(listItemElement).toBeInTheDocument();
//   userEvent.click(deleteButtonElement);
//   expect(listItemElement).not.toBeInTheDocument();
// });
