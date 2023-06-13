module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@rneui/*)',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  clearMock: true,
  collectCoverage: true,
  collectCoverageFrom: [
    './modules/**/*.@(js|jsx|ts|tsx)',
    '!./modules/**/*.stories.@(js|jsx|ts|tsx)',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js',
  ],
};
