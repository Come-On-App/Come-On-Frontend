module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@api': './src/api',
            '@app': './src/app',
            '@assets': './src/assets',
            '@components': './src/components',
            '@features': './src/features',
            '@hooks': './src/hooks',
            '@navigation': './src/navigation',
            '@screens': './src/screens',
            '@type': './src/types',
            '@utils': './src/utils',
            '@utils': './src/utils',
            '@serverAxios': './src/api',
          },
        },
      ],
    ],
  };
};
