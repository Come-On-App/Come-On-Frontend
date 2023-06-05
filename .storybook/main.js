module.exports = {
  stories: [
    '../modules/**/*.stories.mdx',
    '../modules/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
  ],
};
