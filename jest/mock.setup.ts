import { jest } from '@jest/globals';

jest.mock('react-native-maps', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    PROVIDER_GOOGLE: 'google',
  };
});

jest.mock('expo-font');
jest.mock('expo-asset');
