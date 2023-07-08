/**
 * @see docs https://github.com/testing-library/jest-native
 */
import '@testing-library/jest-native/extend-expect';

import { beforeAll, afterEach, afterAll } from '@jest/globals';
import { server } from '@app/mocks/server';
import { QueryCache } from '@tanstack/react-query';
const queryCache = new QueryCache();

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  queryCache.clear();
  server.resetHandlers();
});

// Clean up after the tests are finished.
afterAll(() => server.close());
