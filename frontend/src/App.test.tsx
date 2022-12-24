import { render, screen } from '@testing-library/react';

import App from './App';
import React from 'react';

describe('App', () => {
  it('renders a control to create new lists', () => {
    render(<App />);
    const element = screen.getByText('Create List');
    expect(element).toBeInTheDocument();
  });
});
