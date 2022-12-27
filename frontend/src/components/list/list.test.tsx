import {
  ListItem as ListItemModel,
  List as ListModel,
} from '../../models/list';
import { render, screen } from '@testing-library/react';

import { ApiResponse } from '../../models/api-service';
import App from '../../App';
import List from '.';
import { ListsProvider } from '../../hooks/use-lists';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { act } from 'react-dom/test-utils';
import apiService from '../../services/api.service';
import theme from '../../theme';
import userEvent from '@testing-library/user-event';

const listItem: ListItemModel = {
  text: 'test list item',
  completed: true,
};

const mockResponse: ApiResponse = {
  data: [
    {
      _id: '63aa3f4f88a03df7ccb80737',
      title: 'Test List',
      items: [listItem],
    },
  ],
  status: 200,
  error: null,
};

test('renders title', () => {
  const list: ListModel = { title: 'Test List', items: [] };
  render(
    <ThemeProvider theme={theme}>
      <List list={list} />
    </ThemeProvider>
  );
  const element = screen.getByText('Test List');
  expect(element).toBeInTheDocument();
});

test('renders a delete control', () => {
  const list: ListModel = { title: 'Test List', items: [] };
  render(
    <ThemeProvider theme={theme}>
      <List list={list} />
    </ThemeProvider>
  );
  const element = screen.getByText('Delete this list?');
  expect(element).toBeInTheDocument();
});

it('renders a control to create new list items', () => {
  const list: ListModel = { title: 'Test List', items: [] };
  render(
    <ThemeProvider theme={theme}>
      <List list={list} />
    </ThemeProvider>
  );
  const element = screen.getByPlaceholderText('Add list item...');
  expect(element).toBeInTheDocument();
  expect(element.getAttribute('maxLength')).toBe('150');
});

test('renders list items', () => {
  const list: ListModel = { title: 'Test List', items: [listItem] };
  render(
    <ThemeProvider theme={theme}>
      <List list={list} />
    </ThemeProvider>
  );
  const element = screen.getByText('test list item');
  expect(element).toBeInTheDocument();
});

test('re-renders list-items when a new one is created', async () => {
  const list: ListModel = { title: 'Test List', items: [listItem] };
  const spyGet = jest
    .spyOn(apiService, 'apiGet')
    .mockImplementation(async () => {
      return mockResponse;
    });

  const spyPut = jest
    .spyOn(apiService, 'apiPut')
    .mockImplementation(async () => {
      return mockResponse;
    });

  render(
    <ListsProvider>
      <ThemeProvider theme={theme}>
        {/* @ts-expect-error */}
        <App>
          <List list={list} />
        </App>
      </ThemeProvider>
    </ListsProvider>
  );

  const element = await screen.findByPlaceholderText('Add list item...');
  await act(() => {
    userEvent.type(element, 'Test List{enter}');
  });

  expect(await screen.findByText('test list item')).toBeInTheDocument();
  expect(spyPut).toHaveBeenCalledTimes(1);
  expect(spyGet).toHaveBeenCalledTimes(2);
});

test('re-renders list-items when one is deleted', async () => {
  const list: ListModel = { title: 'Test List', items: [listItem] };
  const spyGet = jest
    .spyOn(apiService, 'apiGet')
    .mockImplementation(async () => {
      return mockResponse;
    });

  const spyPut = jest
    .spyOn(apiService, 'apiPut')
    .mockImplementation(async () => {
      return mockResponse;
    });

  render(
    <ListsProvider>
      <ThemeProvider theme={theme}>
        {/* @ts-expect-error */}
        <App>
          <List list={list} />
        </App>
      </ThemeProvider>
    </ListsProvider>
  );

  const listItemDeleteButton = await screen.findByRole('button');

  await act(() => {
    userEvent.click(listItemDeleteButton);
  });

  expect(spyPut).toHaveBeenCalledTimes(1);
  expect(spyGet).toHaveBeenCalledTimes(2);
});
