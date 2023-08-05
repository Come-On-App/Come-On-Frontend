import { loadAsync } from 'expo-font';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { goAsync } from 'promise-vigilant';

async function loadFonts() {
  await loadAsync({
    ...FontAwesome.font,
    'Pretendard-Medium': require('../../shared/assets/fonts/Pretendard-Medium.ttf'),
    'Pretendard-SemiBold': require('../../shared/assets/fonts/Pretendard-SemiBold.ttf'),
  });
}

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  function loadResourcesAndDataAsync() {
    goAsync([preventAutoHideAsync, loadFonts], {
      onSuccess: () => {
        setLoadingComplete(true);
        hideAsync();
      },
    });
  }

  useEffect(() => {
    // 앱을 렌더링하기 전에 필요한 리소스나 데이터를 로드한다.
    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
