//@ts-nocheck
import { ExpoConfig, ConfigContext } from 'expo/config';

const text = {
  permissions: {
    photos:
      '앱에서 이미지를 업로드하려면 사용자의 사진 라이브러리에 접근해야 합니다. 이를 위해 사진 권한이 필요합니다.\n 권한을 허용하면 사용자의 프로필 이미지를 표시하거나 모임 등록 이미지에 사용할 수 있습니다.',
    location:
      '앱에서 사용자의 위치에 접근하려면 위치 권한에 접근해야 합니다.\n 위치 권한이 허용되면 앱은 사용자 주변의 지역 정보를 제공하고 지도상에서 사용자의 위치를 표시하는 데 사용됩니다.',
  },
};

const app = {
  name: 'Come On!',
  slug: 'come-on',
  version: '1.0.0',
  identifier: {
    ios: 'com.comeon.ios.app',
    android: 'com.comeon.app',
  },
  backgroundColor: '#FFFFFF',
  icon: './src/assets/images/icon.png',
  favicon: './src/assets/images/favicon.png',
  image: './src/assets/images/splash.png',
  foregroundImage: './src/assets/images/adaptive-icon.png',
  versionCode: 1,
};

const EAS = {
  dev: {
    owner: 'jeongbaebang_dev',
    projectId: 'f7044c0a-2efb-4e36-8189-d3f827a0e89e',
  },
  production: {
    owner: 'come-on-app',
    projectId: '390f7f40-6936-467d-901c-b3c6724e76f2',
  },
};

const { owner, projectId } = EAS[process.env.TYPE || 'dev'];

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  icon: app.icon,
  name: app.name,
  slug: app.slug,
  scheme: app.slug,
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
    bundleIdentifier: app.identifier.ios,
    buildNumber: app.version,
    supportsTablet: false,
    infoPlist: {
      NSLocationWhenInUseUsageDescription: text.permissions.location,
    },
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY_IOS,
    },
    googleServicesFile:
      process.env.GOOGLE_SERVICES_FILE_IOS || './GoogleService-Info.plist',
  },
  android: {
    package: app.identifier.android,
    versionCode: app.versionCode,
    adaptiveIcon: {
      foregroundImage: app.foregroundImage,
      backgroundColor: app.backgroundColor,
    },
    config: {
      googleMaps: { apiKey: process.env.GOOGLE_MAP_API_KEY_ANDROID },
    },
    googleServicesFile:
      process.env.GOOGLE_SERVICES_FILE_ANDROID || './google-services.json',
  },
  plugins: [
    '@react-native-firebase/app',
    '@react-native-firebase/perf',
    '@react-native-firebase/crashlytics',
    './react-native-maps-plugin',
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static',
        },
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission: text.permissions.photos,
      },
    ],
    'expo-apple-authentication',
  ],
  updates: {
    url: `https://u.expo.dev/${projectId}`,
  },
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  originalFullName: `@${owner}/${app.slug}`,
  owner,
  extra: {
    eas: {
      projectId,
    },
  },
});
