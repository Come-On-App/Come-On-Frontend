module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@rneui/*)',
  ],
  setupFilesAfterEnv: ['./jest/jest.setup.ts'],
  setupFiles: [
    './jest/mock.setup.ts',
    'jest-date-mock',
    './node_modules/@react-native-google-signin/google-signin/jest/build/setup.js',
  ],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    './modules/**/*.@(js|jsx|ts|tsx)',
    '!./modules/**/*.stories.@(js|jsx|ts|tsx)',
    '!**/jest/*',
    '!**/mocks/*',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js',
  ],
};
