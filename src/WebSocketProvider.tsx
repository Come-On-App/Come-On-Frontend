import { useAppSelector } from '@app/hooks';
import { REACT_APP_SOCKET_SERVER } from '@env';
import useAuth from '@hooks/useAuth';
import { Client } from '@stomp/stompjs';
import React, { useRef, useState, useEffect } from 'react';

const WebSocketContext = React.createContext<any>(null);

export { WebSocketContext };

export default function ({ children }: { children: React.ReactNode }) {
  const { getAccessToken } = useAuth();
  const token = useAppSelector(state => state.auth.accessToken?.token);
  const client = useRef<Client>();

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
        console.log(`connected to ${stompConfig.brokerURL}`);
      };
      client.current.onDisconnect = error => {
        console.log(`disconnected to  ${stompConfig.brokerURL}`);
        console.log(error);
      };
      client.current.onDisconnect = error => {
        console.log(`error to  ${stompConfig.brokerURL}`);
        console.log(error);
      };
    }
  }, [token]);

  return (
    <WebSocketContext.Provider value={client}>
      {children}
    </WebSocketContext.Provider>
  );
}
