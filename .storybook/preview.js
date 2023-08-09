import { NavigationContainer } from '@react-navigation/native';

import FontThemeProvider from '@shared/provider/FontProvider';
import QueryClientProvider from '@shared/provider/QueryClientProvider';
import { withMsw } from './mswDecorator';
import { queryClient } from '../modules/app/api/queryClient';
import handlers from '../modules/app/mocks/handlers';
import ReduxProvider from '../modules/app/redux/Provider';

export const decorators = [
  withMsw,
  (storyFn) => {
    queryClient.clear();

    return storyFn();
  },
  (Story) => (
    <QueryClientProvider>
      <ReduxProvider>
        <FontThemeProvider>
          <NavigationContainer>
            <Story />
          </NavigationContainer>
        </FontThemeProvider>
      </ReduxProvider>
    </QueryClientProvider>
  ),
];

export const parameters = {
  msw: {
    handlers: [...handlers],
  },
};
