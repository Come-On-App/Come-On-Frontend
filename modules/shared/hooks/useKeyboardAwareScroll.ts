import { RefObject, useEffect, useState } from 'react';
import { Keyboard, LayoutChangeEvent, ScrollView } from 'react-native';

interface ItemYCoordinates {
  [key: string]: number;
}

/**
 * 컴포넌트가 포커스 될 때 해당 위치의 컴포넌트로 스크롤 시키는 커스텀 훅
 */
export default function useKeyboardAwareScroll(
  scrollViewRef: RefObject<ScrollView>,
): [typeof setYCoordinate, typeof setFocusedItemKey] {
  const [yCoordinates, setYCoordinates] = useState<ItemYCoordinates>({});
  const [focusedItemKey, setFocusedItemKey] = useState<string | null>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        if (
          scrollViewRef.current &&
          focusedItemKey &&
          yCoordinates[focusedItemKey]
        ) {
          scrollViewRef.current.scrollTo({
            y: yCoordinates[focusedItemKey],
            animated: true,
          });
        }
      },
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, [yCoordinates, focusedItemKey, scrollViewRef]);

  const setYCoordinate = (event: LayoutChangeEvent, itemKey: string) => {
    const { layout } = event.nativeEvent;

    setYCoordinates((prevCoords) => ({ ...prevCoords, [itemKey]: layout.y }));
  };

  return [setYCoordinate, setFocusedItemKey];
}
