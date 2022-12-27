import './globals.css';

import styled, { ThemeProvider } from 'styled-components';

import App from './App';
import { ListsProvider } from './hooks/useLists';
import React from 'react';
import ReactDOM from 'react-dom/client';
import defaultTheme from '../src/theme';
import reportWebVitals from './reportWebVitals';

const StyledMain = styled.main`
  max-width: ${(props) => props.theme.sizes.contentMaxWidth};
  padding: 0 ${(props) => props.theme.sizes.spacing.l};
  margin: 0 auto;
  margin-top: ${(props) => props.theme.fonts.sizes.l};
  margin-bottom: 120px;
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fonts.sizes.s};
  color: ${(props) => props.theme.colours.textPrimary};
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <StyledMain>
        <ListsProvider>
          <App />
        </ListsProvider>
      </StyledMain>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
