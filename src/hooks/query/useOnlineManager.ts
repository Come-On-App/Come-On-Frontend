import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from 'react-query';

export default function useOnlineManager() {
  useEffect(() => {
    onlineManager.setEventListener(setOnline => {
      return NetInfo.addEventListener(state => {
        setOnline(!!state.isConnected);
      });
    });
  }, []);
}
