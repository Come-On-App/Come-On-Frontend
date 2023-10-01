import { useLayoutEffect } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { bottomTabStyle } from '@app/navigation/config';
import { BottomTabProps } from '@app/navigation/type';

/**
 * 특정 라우터 경로에는 하단바를 비활성화 시켜주는 커스텀 훅
 */
export default function useTabBarVisibility<T>(
  { navigation, route }: Partial<BottomTabProps>,
  hideRouteName: T,
) {
  useLayoutEffect(() => {
    if (navigation && route) {
      const routeName = getFocusedRouteNameFromRoute(route);

      if (routeName === hideRouteName) {
        navigation.setOptions({
          tabBarStyle: {
            ...bottomTabStyle,
            display: 'none',
          },
        });
      } else {
        navigation.setOptions({
          tabBarStyle: { ...bottomTabStyle, display: 'flex' },
        });
      }
    }
  }, [hideRouteName, navigation, route]);
}
