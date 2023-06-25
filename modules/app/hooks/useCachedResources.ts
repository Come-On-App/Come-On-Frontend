import { loadAsync } from 'expo-font';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { vigilAsync } from 'promise-vigilant';

async function loadFonts() {
  await loadAsync({
    ...FontAwesome.font,
    'Pretendard-Medium': require('../../shared/assets/fonts/Pretendard-Medium.ttf'),
    'Pretendard-SemiBold': require('../../shared/assets/fonts/Pretendard-SemiBold.ttf'),
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
