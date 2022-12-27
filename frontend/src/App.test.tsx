import { render, screen } from '@testing-library/react';

import { ApiResponse } from './models/api-service';
import App from './App';
import { ListsProvider } from './hooks/useLists';
import React from 'react';
import apiService from './services/api.service';

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

test('renders a control to create new lists', () => {
  render(<App />);
  const element = screen.getByPlaceholderText('Add new list...');
  expect(element).toBeInTheDocument();
  expect(element.getAttribute('maxLength')).toBe('60');
});

test('renders lists', async () => {
  jest.spyOn(apiService, 'apiGet').mockImplementation(async () => {
    return mockResponse;
  });

  render(
    <ListsProvider>
      <App />
    </ListsProvider>
  );
  expect(await screen.findByText('Test List')).toBeInTheDocument();
});
