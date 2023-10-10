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
jest.mock('@react-native-firebase/analytics', () => {
  return () => ({
    logScreenView: jest.fn(),
  });
});
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');