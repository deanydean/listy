import { ThemeProvider } from 'styled-components';
import defaultTheme from '../src/theme';

export const decorators = [
  (Story, context) => (
    <ThemeProvider theme={defaultTheme}>
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
