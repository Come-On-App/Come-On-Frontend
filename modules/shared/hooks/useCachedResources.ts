import { loadAsync } from 'expo-font';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { vigilAsync } from 'promise-vigilant';

async function loadFonts() {
  await loadAsync({
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
      vigilAsync(preventAutoHideAsync, [loadFonts], {
        onSuccess: () => {
          setLoadingComplete(true);
          hideAsync();
        },
      });
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
