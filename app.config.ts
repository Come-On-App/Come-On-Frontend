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
  plugins: [
    [
      'expo-image-picker',
      {
        photosPermission:
          '사용자가 앱에서 이미지를 업로드하기 위해선, 사용자의 사진 라이브러리에 접근할 수 있어야 합니다. 이를 위해 사진 접근 권한이 필요합니다. 권한을 허용하면 사용자의 프로필 이미지를 표시하거나 모임 등록 이미지에 사용할 수 있습니다.',
      },
    ],
  ],
});
