import { GOOGLE_MAP_API_KEY_ANDROID, GOOGLE_MAP_API_KEY_IOS } from '@env';
import { ExpoConfig, ConfigContext } from 'expo/config';

const text = {
  photosPermission: '이 앱을 사용하기 위해선 사진첩에 대한 권한이 필요합니다.',
};

const app = {
  name: 'Come On!',
  slug: 'come-on',
  version: '1.0.0',
  identifier: 'com.comeon.app',
  backgroundColor: '#ffffff',
  icon: './src/assets/images/icon.png',
  favicon: './src/assets/images/favicon.png',
  image: './src/assets/images/splash.png',
  foregroundImage: './src/assets/images/adaptive-icon.png',
  versionCode: 1,
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  icon: app.icon,
  name: app.name,
  slug: app.slug,
  scheme: app.identifier,
  version: app.version,
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  splash: {
    image: app.image,
    resizeMode: 'contain',
    backgroundColor: app.backgroundColor,
  },
  ios: {
    bundleIdentifier: app.identifier,
    buildNumber: app.version,
    supportsTablet: true,
    config: {
      googleMapsApiKey: GOOGLE_MAP_API_KEY_IOS,
    },
  },
  android: {
    package: app.identifier,
    versionCode: app.versionCode,
    adaptiveIcon: {
      foregroundImage: app.foregroundImage,
      backgroundColor: app.backgroundColor,
    },
    config: {
      googleMaps: { apiKey: GOOGLE_MAP_API_KEY_ANDROID },
    },
  },
  plugins: [
    [
      'expo-image-picker',
      {
        photosPermission: text.photosPermission,
      },
    ],
    'expo-apple-authentication',
  ],
  extra: {
    eas: {
      projectId: 'f7044c0a-2efb-4e36-8189-d3f827a0e89e',
    },
  },
});
