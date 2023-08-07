import { withMsw } from './mswDecorator';
import { queryClient } from '../modules/app/api/queryClient';
import QueryClientProvider from '@shared/provider/QueryClientProvider';
import FontThemeProvider from '@shared/provider/FontProvider';
import handlers from '../modules/app/mocks/handlers';
import ReduxProvider from '../modules/app/redux/Provider';
import { NavigationContainer } from '@react-navigation/native';

export const decorators = [
  withMsw,
  (storyFn) => {
    queryClient.clear();

    return storyFn();
  },
  (Story) => (
    <QueryClientProvider>
      <ReduxProvider>
        <NavigationContainer>
          <FontThemeProvider>
            <Story />
          </FontThemeProvider>
        </NavigationContainer>
      </ReduxProvider>
    </QueryClientProvider>
  ),
];

export const parameters = {
  msw: {
    handlers: [...handlers],
  },
};
