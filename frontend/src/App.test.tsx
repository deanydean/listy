import { render, screen } from '@testing-library/react';

import { ApiResponse } from './models/api-service';
import App from './App';
import { ListsProvider } from './hooks/use-lists';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import apiService from './services/api.service';
import theme from '../src/theme';
import userEvent from '@testing-library/user-event';

const mockResponse: ApiResponse = {
  data: [
    {
      _id: '63aa3f4f88a03df7ccb80737',
      title: 'Test List',
      items: [],
    },
  ],
  status: 200,
  error: null,
};

test('renders the header', () => {
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
  const element = screen.getByText('Listy');
  expect(element).toBeInTheDocument();
});

test('renders the slug', () => {
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
  const element = screen.getByText(
    'A simple MERN stack app for creating and managing lists.'
  );
  expect(element).toBeInTheDocument();
});

test('renders a control to create new lists', () => {
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
  const element = screen.getByPlaceholderText('Add a new list...');
  expect(element).toBeInTheDocument();
  expect(element.getAttribute('maxLength')).toBe('60');
});

test('renders lists', async () => {
  const spy = jest.spyOn(apiService, 'apiGet').mockImplementation(async () => {
    return mockResponse;
  });

  render(
    <ListsProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ListsProvider>
  );

  expect(spy).toBeCalledTimes(1);
  expect(await screen.findByText('Test List')).toBeInTheDocument();
});

test('re-renders lists when a new one is available', async () => {
  const spyGet = jest
    .spyOn(apiService, 'apiGet')
    .mockImplementation(async () => {
      return mockResponse;
    });

  const spyPost = jest
    .spyOn(apiService, 'apiPost')
    .mockImplementation(async () => {
      return mockResponse;
    });

  render(
    <ListsProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ListsProvider>
  );

  const element = screen.getByPlaceholderText('Add a new list...');
  userEvent.type(element, 'Test List{enter}');

  expect(await screen.findByText('Test List')).toBeInTheDocument();
  expect(spyPost).toHaveBeenCalledTimes(1);
  expect(spyGet).toHaveBeenCalledTimes(2);
});
