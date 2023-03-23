import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

import { promiseFlow } from '@utils/promise';

async function loadFonts() {
  await Font.loadAsync({
    ...FontAwesome.font,
    'pretendard-regular': require('../assets/fonts/Pretendard-Regular.ttf'),
    'pretendard-bold': require('../assets/fonts/Pretendard-Bold.ttf'),
  });
}

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    function loadResourcesAndDataAsync() {
      promiseFlow(SplashScreen.preventAutoHideAsync, [loadFonts], {
        onSuccess: () => {
          setLoadingComplete(true);
          SplashScreen.hideAsync();
        },
      });
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
