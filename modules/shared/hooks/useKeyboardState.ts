import { useState, useEffect, useCallback, SetStateAction } from 'react';
import { Keyboard } from 'react-native';

export default function useKeyboardState(): [boolean, number] {
  const [isOpen, setIsOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const handleKeyboardDidShow = useCallback(
    (e: { endCoordinates: { height: SetStateAction<number> } }) => {
      setIsOpen(true);
      setKeyboardHeight(e.endCoordinates.height);
    },
    [],
  );
  const handleKeyboardDidHide = useCallback(() => {
    setIsOpen(false);
    setKeyboardHeight(0);
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [handleKeyboardDidShow, handleKeyboardDidHide]);

  return [isOpen, keyboardHeight];
}
