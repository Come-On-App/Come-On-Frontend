import { Keyboard, type ScrollView } from 'react-native';
import { type RefObject, useEffect } from 'react';

/**
 * 키보드가 활성화될 때 화면의 하단 영역까지 자동으로 스크롤을 한다.
 */
export default function useScrollViewAutoScrollOnKeyboard(
  ref: RefObject<ScrollView>,
) {
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        if (ref.current) ref.current.scrollToEnd({ animated: true });
      },
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, [ref]);

  return ref;
}
