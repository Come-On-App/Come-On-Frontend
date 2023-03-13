import { useAppSelector } from '@app/hooks';
import { REACT_APP_SOCKET_SERVER } from '@env';
import { Client } from '@stomp/stompjs';
import GenerateLog from '@utils/GenerateLog';
import React, { useRef, useState, useEffect } from 'react';

const WebSocketContext = React.createContext<any>(null);

export { WebSocketContext };

export default function ({ children }: { children: React.ReactNode }) {
  const token = useAppSelector(state => state.auth.accessToken?.token);
  const client = useRef<Client>();
  const log = GenerateLog('log');

  useEffect(() => {
    const stompConfig = {
      brokerURL: `ws${REACT_APP_SOCKET_SERVER}/ws-meetings?token=${token}`,
      debug: (frame: any) => console.log(frame),

      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      forceBinaryWSFrames: true,
      appendMissingNULLonIncoming: true,
    };

    if (!client.current && token) {
      client.current = new Client(stompConfig);
      client.current.onConnect = () => {
        log('log', `connected to ${stompConfig.brokerURL}`);
      };
      client.current.onDisconnect = error => {
        log('log', `disconnected to  ${stompConfig.brokerURL}`);
        log('log', error);
      };
      client.current.onStompError = error => {
        log('log', `error to  ${stompConfig.brokerURL}`);
        log('log', error);
      };
    }
  }, [log, token]);

  return (
    <WebSocketContext.Provider value={client}>
      {children}
    </WebSocketContext.Provider>
  );
}
