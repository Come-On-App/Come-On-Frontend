import {
  setStatusBarHidden,
  setStatusBarBackgroundColor,
} from 'expo-status-bar';
import { Platform } from 'react-native';

const handleIOSStatusBar = (hide: boolean) => {
  setStatusBarHidden(hide, 'fade');
};
const handleAndroidStatusBar = (hide: boolean) => {
  setStatusBarBackgroundColor(hide ? 'white' : 'transparent', true);
};
const setStatusBarVisible = (isHide: boolean) => {
  return Platform.OS === 'ios'
    ? handleIOSStatusBar(isHide)
    : handleAndroidStatusBar(isHide);
};

export default setStatusBarVisible;
