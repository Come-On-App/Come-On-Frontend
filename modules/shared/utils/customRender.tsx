/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  RenderOptions,
  render as testingRender,
} from '@testing-library/react-native';

import ThemeProvider from '@shared/provider/ThemeProvider';

/**
 * 테스트 코드 래퍼 객체
 */
export const wrapper = { wrapper: ThemeProvider };

/**
 * 커스텀 테스트 랜더 메서드
 */
export const render = (
  ui: React.ReactElement<unknown, string | React.JSXElementConstructor<any>>,
  options?: RenderOptions | undefined,
) => testingRender(ui, { wrapper: ThemeProvider, ...options });
