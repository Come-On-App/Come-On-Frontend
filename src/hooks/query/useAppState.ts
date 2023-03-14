import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

type OnChange = (status: AppStateStatus) => void;
export default function useAppState(onChange: OnChange) {
  useEffect(() => {
    const listener = AppState.addEventListener('change', onChange);

    return () => {
      listener.remove();
    };
  }, [onChange]);
}
