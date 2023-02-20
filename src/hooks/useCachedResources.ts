import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          pretendard: require('../assets/fonts/PretendardVariable.ttf'),
          blackHanSans: require('../assets/fonts/BlackHanSans-Regular.ttf'),
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          'pretendard-regular': require('../assets/fonts/Pretendard-Regular.ttf'),
          'pretendard-bold': require('../assets/fonts/Pretendard-Bold.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.log('asds');
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
