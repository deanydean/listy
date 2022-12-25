import { getByText, render, screen } from '@testing-library/react';

import AddList from '.';
import App from '../../App';
import React from 'react';
import userEvent from '@testing-library/user-event';

test('renders a button control', () => {
  render(<AddList />);
  const element = screen.getByRole('button');
  expect(element).toBeInTheDocument();
});

test('renders a textbox control', () => {
  render(<AddList />);
  const element = screen.getByRole('textbox');
  expect(element).toBeInTheDocument();
});

test('creates a new List component with the correct title on click', () => {
  expect(true).toBe(false);
});

test('input is cleared when the button is pressed', () => {
  render(<AddList />);
  const textboxElement = screen.getByRole('textbox');
  userEvent.type(textboxElement, 'Test List Title');
  const buttonElement = screen.getByRole('button');
  userEvent.click(buttonElement);
  expect(textboxElement.textContent).toBe('');
});

test('button is enabled when a title is provided in the input', () => {
  render(<AddList />);
  const textboxElement = screen.getByRole('textbox');
  userEvent.type(textboxElement, '1');
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeEnabled();
});

test('button is disabled whilst title input is empty', () => {
  render(<AddList />);
  const element = screen.getByRole('button');
  expect(element).toBeDisabled();
});

test('button is disabled if input is has more than 60 characters in it', () => {
  render(<AddList />);
  const textboxElement = screen.getByRole('textbox');
  userEvent.type(
    textboxElement,
    'IrymAYf0AnJ8mjz5IWbjrOBjmqliwLdgK8HuSviRXT9UMmVJJ3eeYopP3cK41' // 61 chars
  );
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeDisabled();
});
