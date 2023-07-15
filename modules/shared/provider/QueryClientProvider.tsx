import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@app/api/queryClient';
import { IProvider } from './type';

/**
 * React-Query client
 */
export default function Provider({ children }: IProvider) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
