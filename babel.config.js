module.exports = function (api) {
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
            '@shared': './modules/shared',
            '@userConnection': './modules/userConnection',
            '@post': './modules/post',
          },
        },
      ],
    ],
  };
};
