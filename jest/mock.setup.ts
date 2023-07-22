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

jest.mock('@react-navigation/native', () => {
  const actualNav: unknown[] = jest.requireActual('@react-navigation/native');

  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});
