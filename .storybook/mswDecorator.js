import 'react-native-url-polyfill/auto';
import { setupServer } from 'msw/native';

const server = setupServer();

export const initialize = () => {
  // Do not warn or error out if a non-mocked request happens.
  // If we don't use this, Storybook will be spammy about requests made to
  // fetch the JS bundle etc.
  server.listen({ onUnhandledRequest: 'bypass' });
};

export const withMsw = (storyFn, { parameters: { msw } }) => {
  server.resetHandlers();

  if (msw) {
    if (Array.isArray(msw) && msw.length > 0) {
      // Support an Array of request handlers (backwards compatibility).
      server.use(...msw);
    } else if ('handlers' in msw && msw.handlers) {
      // Support an Array named request handlers handlers
      // or an Object of named request handlers with named arrays of handlers
      const handlers = Object.values(msw.handlers)
        .filter(Boolean)
        .reduce((handlers, handlersList) => handlers.concat(handlersList), []);

      if (handlers.length > 0) {
        server.use(...handlers);
      }
    }
  }

  return storyFn();
};
