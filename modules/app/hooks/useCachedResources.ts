import { loadAsync } from 'expo-font';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { asyncWave } from 'async-wave';

import { getUserTokenFromStore } from '@shared/utils/secureStore';
import { setDefaultsHeaderAuth } from '@app/api/axiosInstance';
import store from '@app/redux/store';
import { updateUserLoginStatus } from '@account/features/auth/authSlice';
import { verifyRefreshToken } from '@app/api/utils';

async function loadFonts() {
  await loadAsync({
    ...FontAwesome.font,
    'Pretendard-Medium': require('../../shared/assets/fonts/Pretendard-Medium.ttf'),
    'Pretendard-SemiBold': require('../../shared/assets/fonts/Pretendard-SemiBold.ttf'),
    'Pretendard-Regular': require('../../shared/assets/fonts/Pretendard-Regular.ttf'),
  });
}

async function authenticateUserAndDispatch() {
  const userToken = await getUserTokenFromStore();

  if (userToken) {
    asyncWave([userToken, verifyRefreshToken, setDefaultsHeaderAuth], {
      onSuccess: () => {
        store.dispatch(updateUserLoginStatus(true));
      },
      onError: () => {
        store.dispatch(updateUserLoginStatus(false));
      },
    });
  }
}

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  function loadResourcesAndDataAsync() {
    asyncWave([preventAutoHideAsync, loadFonts, authenticateUserAndDispatch], {
      onSettled: () => {
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
