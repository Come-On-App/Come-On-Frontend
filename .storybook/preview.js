import { withMsw } from './mswDecorator';
import { queryClient } from '../modules/app/api/queryClient';
import QueryClientProvider from '@shared/provider/QueryClientProvider';
import FontThemeProvider from '@shared/provider/FontProvider';

export const decorators = [
  withMsw,
  (storyFn) => {
    queryClient.clear();

    return storyFn();
  },
  (Story) => (
    <QueryClientProvider>
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    </QueryClientProvider>
  ),
];
