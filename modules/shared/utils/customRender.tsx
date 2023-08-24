/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  RenderOptions,
  render as testingRender,
} from '@testing-library/react-native';

import QueryClientProvider from '@shared/provider/QueryClientProvider';
import ThemeProvider from '@shared/provider/ThemeProvider';
import { IProvider } from '@shared/provider/type';
import ReduxProvider from '@app/redux/Provider';

function Provider({ children }: IProvider) {
  return (
    <QueryClientProvider>
      <ReduxProvider>
        <ThemeProvider>{children}</ThemeProvider>;
      </ReduxProvider>
    </QueryClientProvider>
  );
}

/**
 * 테스트 코드 래퍼 객체 (deprecated)
 */
export const wrapper = { wrapper: Provider };

/**
 * 커스텀 테스트 랜더 메서드
 */
export const render = (
  ui: React.ReactElement<unknown, string | React.JSXElementConstructor<any>>,
  options?: RenderOptions | undefined,
) => testingRender(ui, { wrapper: Provider, ...options });
