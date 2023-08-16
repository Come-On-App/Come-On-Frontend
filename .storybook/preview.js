import { NavigationContainer } from '@react-navigation/native';

import FontThemeProvider from '../modules/shared/provider/FontProvider';
import QueryClientProvider from '../modules/shared/provider/QueryClientProvider';
import { withMsw } from './mswDecorator';
import { queryClient } from '../modules/app/api/queryClient';
import handlers from '../modules/app/mocks/handlers';
import ReduxProvider from '../modules/app/redux/Provider';

const clearQueryClient = (storyFn) => {
  queryClient.clear();

  return storyFn();
};

const DefaultProvider = (Story) => (
  <QueryClientProvider>
    <ReduxProvider>
      <FontThemeProvider>
        <NavigationContainer>
          <Story />
        </NavigationContainer>
      </FontThemeProvider>
    </ReduxProvider>
  </QueryClientProvider>
);

export const decorators = [withMsw, clearQueryClient, DefaultProvider];

export const parameters = {
  msw: {
    handlers: [...handlers],
  },
};
