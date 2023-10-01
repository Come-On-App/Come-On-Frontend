import { useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
  const firstTimeRef = useRef(true);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;

        return;
      }

      refetch();
    }, [refetch]),
  );
}
