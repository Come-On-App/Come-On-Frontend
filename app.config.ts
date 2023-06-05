import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Come-On-Frontend',
  slug: 'Come-On-Frontend',
  version: '2.0.0',
  orientation: 'portrait',
  icon: './modules/shared/assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './modules/shared/assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './modules/shared/assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
});
