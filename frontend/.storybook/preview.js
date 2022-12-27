import { ListsProvider } from '../src/hooks/useLists';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../src/theme';

export const decorators = [
  (Story, context) => (
    <ThemeProvider theme={defaultTheme}>
      <ListsProvider>
        <Story />
      </ListsProvider>
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
