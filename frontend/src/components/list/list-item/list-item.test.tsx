import { render, screen } from '@testing-library/react';

import ListItem from '.';
import { ListItem as ListItemModel } from '../../../models/list';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../../theme';
import userEvent from '@testing-library/user-event';

const mockDeleteFn = jest.fn();
const mockCompletedFn = jest.fn();

const incompleteListItem: ListItemModel = {
  text: 'Nimble Soup',
  completed: false,
};
const completeListItem: ListItemModel = {
  text: 'Nimble Soup',
  completed: true,
};

test('renders ListItem text without strikethrough if the item is not completed', () => {
  render(
    <ThemeProvider theme={theme}>
      <ListItem
        listItem={incompleteListItem}
        deleteHandler={mockDeleteFn}
        completedHandler={mockCompletedFn}
      />
    </ThemeProvider>
  );
  const element = screen.getByText('Nimble Soup');
  const style = window.getComputedStyle(element);
  expect(style.textDecoration).toBe('none');
});

test('renders ListItem text with strikethrough if the item is completed', () => {
  render(
    <ThemeProvider theme={theme}>
      <ListItem
        listItem={completeListItem}
        deleteHandler={mockDeleteFn}
        completedHandler={mockCompletedFn}
      />
    </ThemeProvider>
  );
  const element = screen.getByText('Nimble Soup');
  const style = window.getComputedStyle(element);
  expect(style.textDecoration).toBe('line-through');
});

test('renders ListItem text without delete button if the item is incomplete', () => {
  render(
    <ThemeProvider theme={theme}>
      <ListItem
        listItem={incompleteListItem}
        deleteHandler={mockDeleteFn}
        completedHandler={mockCompletedFn}
      />
    </ThemeProvider>
  );
  expect(screen.queryByRole('button')).toBeFalsy();
});

test('renders ListItem text with delete button if the item is completed', () => {
  render(
    <ThemeProvider theme={theme}>
      <ListItem
        listItem={completeListItem}
        deleteHandler={mockDeleteFn}
        completedHandler={mockCompletedFn}
      />
    </ThemeProvider>
  );
  const element = screen.getByRole('button');
  expect(element).toBeInTheDocument();
});

test('calls deleteHandler when the delete button is clicked', () => {
  render(
    <ThemeProvider theme={theme}>
      <ListItem
        listItem={completeListItem}
        deleteHandler={mockDeleteFn}
        completedHandler={mockCompletedFn}
      />
    </ThemeProvider>
  );
  const element = screen.getByRole('button');
  userEvent.click(element);
  expect(mockDeleteFn).toBeCalledTimes(1);
});

test('calls completedHandler when the list item is clicked', () => {
  render(
    <ThemeProvider theme={theme}>
      <ListItem
        listItem={incompleteListItem}
        deleteHandler={mockDeleteFn}
        completedHandler={mockCompletedFn}
      />
    </ThemeProvider>
  );
  const element = screen.getByText('Nimble Soup');
  userEvent.click(element);
  expect(mockCompletedFn).toBeCalledTimes(1);
});
