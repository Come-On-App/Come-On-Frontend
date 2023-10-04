import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function useRestrictNavigation(condition: boolean) {
  const navigation = useNavigation();

  useEffect(() => {
    if (condition) {
      // iOS 스와이프 이동 제한
      navigation.setOptions({ gestureEnabled: false });

      // 안드로이드 물리 버튼 사용 제한
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => true,
      );

      return () => {
        backHandler.remove();
      };
    }

    // iOS 스와이프 이동 허용
    navigation.setOptions({ gestureEnabled: true });

    // 안드로이드 물리 버튼 사용 허용
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => false,
    );

    return () => {
      backHandler.remove();
    };
  }, [condition, navigation]);
}
