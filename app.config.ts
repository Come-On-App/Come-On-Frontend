import { ExpoConfig, ConfigContext } from 'expo/config';

const VERSION = '2.0.1';
const VERSION_ANDROID = 4;

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Come On!',
  slug: 'come-on',
  version: VERSION,
  orientation: 'portrait',
  icon: './modules/shared/assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './modules/shared/assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  owner: 'come-on-app',
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
    eas: {
      projectId: '390f7f40-6936-467d-901c-b3c6724e76f2',
    },
  },
  ios: {
    bundleIdentifier: 'com.comeon.ios.app',
    buildNumber: VERSION,
    usesAppleSignIn: true,
    config: {
      usesNonExemptEncryption: false,
    },
    googleServicesFile: process.env.GOOGLE_SERVICES_FILE_IOS,
  },
  android: {
    package: 'com.comeon.app',
    versionCode: VERSION_ANDROID,
    adaptiveIcon: {
      foregroundImage: './modules/shared/assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    googleServicesFile: process.env.GOOGLE_SERVICES_FILE_ANDROID,
  },
  updates: {
    url: 'https://u.expo.dev/390f7f40-6936-467d-901c-b3c6724e76f2',
  },
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  plugins: [
    [
      'expo-updates',
      {
        username: 'jeongbaebang_dev',
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission:
          '사용자가 앱에서 이미지를 업로드하기 위해선, 사용자의 사진 라이브러리에 접근할 수 있어야 합니다. 이를 위해 사진 접근 권한이 필요합니다. 권한을 허용하면 사용자의 프로필 이미지를 표시하거나 모임 등록 이미지에 사용할 수 있습니다.',
      },
    ],
    '@react-native-google-signin/google-signin',
    'expo-apple-authentication',
    '@react-native-firebase/app',
    '@react-native-firebase/perf',
    '@react-native-firebase/crashlytics',
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static',
        },
      },
    ],
  ],
});
