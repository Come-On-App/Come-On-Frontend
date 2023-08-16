import Constants from 'expo-constants';

export default function isStorybookEnabled() {
  return Constants.expoConfig?.extra?.storybookEnabled === 'true' ?? false;
}
