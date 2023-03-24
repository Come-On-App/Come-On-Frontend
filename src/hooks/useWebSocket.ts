import { useCallback, useLayoutEffect } from 'react';
import SockJS from 'sockjs-client';

import fn from '@utils/fn';
import { Client } from '@stomp/stompjs';
import type {
  IStompSocket,
  messageCallbackType,
  StompConfig,
} from '@stomp/stompjs';
import { WEBSOCKET_URL } from '@env';
import { log } from '@utils/log';

const stompConfig: StompConfig = {
  debug: msg => {
    log('[STOMP]', msg);
  },
  onConnect: frame => {
    log('[onConnect]', frame);
  },
  onWebSocketError: e => {
    log('[onWebSocketError]', e);
  },
  onStompError: frame => {
    log('[onStompError]', frame);
  },
};
const client = new Client(stompConfig);
const checkToken = (token: string) => {
  if (fn.isEmpty(token)) {
    throw new Error('Token information is required.');
  }

  return token;
};
const createSocketURL = (token: string) => {
  return `${WEBSOCKET_URL}/ws-meetings?token=${token}`;
};
const createMeetingURN = (id: number) => {
  return `/sub/meetings/${id}`;
};
const createIndividualURN = (id: number) => {
  return `/user/queue/meetings/${id}`;
};
const checkTokenAndCreateSocketURL = fn.flow(checkToken, createSocketURL);
const subscribe = (URN: string, callback: messageCallbackType) => {
  if (!client.connected) {
    log('[socket]', 'client is not connected');

    return undefined;
  }

  return client.subscribe(URN, callback);
};

function useWebSocket() {
  const setSocket = useCallback((token: string) => {
    client.webSocketFactory = () => {
      return new SockJS(checkTokenAndCreateSocketURL(token)) as IStompSocket;
    };
  }, []);
  const activate = useCallback(() => {
    log('[socket]', 'activate');

    client.activate();
  }, []);
  const deactivate = useCallback(() => {
    log('[socket]', 'deactivate');

    if (!client.active) {
      client.deactivate();
    }
  }, []);
  const subscribePlace = useCallback(
    (meetingId: number, callback: messageCallbackType) => {
      return subscribe(createMeetingURN(meetingId), callback);
    },
    [],
  );
  const subscribeIndividual = useCallback(
    (meetingId: number, callback: messageCallbackType) => {
      return subscribe(createIndividualURN(meetingId), callback);
    },
    [],
  );
  const unsubscribe = useCallback((id: string) => {
    client.unsubscribe(id);
  }, []);

  return {
    client,
    activate,
    subscribePlace,
    subscribeIndividual,
    unsubscribe,
    deactivate,
    setSocket,
  };
}

export function useWebSocketConnect(token: string | undefined) {
  const { setSocket, activate, deactivate } = useWebSocket();

  useLayoutEffect(() => {
    if (!token) return undefined;

    setSocket(token);
    activate();

    return () => {
      deactivate();
    };
  }, [activate, deactivate, setSocket, token]);
}

export default useWebSocket;
