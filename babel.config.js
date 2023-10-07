module.exports = function babelConfig(api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@account': './modules/account',
            '@app': './modules/app',
            '@shared': './modules/shared',
            '@connection': './modules/connection',
            '@post': './modules/post',
          },
        },
      ],
    ],
  };
};
