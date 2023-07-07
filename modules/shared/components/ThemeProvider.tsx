/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react';
import { ThemeProvider as Tp } from '@rneui/themed';
import {
  RenderOptions,
  render as testingRender,
} from '@testing-library/react-native';

import { theme } from '@shared/constants/themed';
import useCachedResources from '@app/hooks/useCachedResources';

/**
 * [React Native Elements] 커스텀 정의된 스타일 테마를 제공.
 * @see docs https://reactnativeelements.com/docs/customization/themeprovider
 */
export default function ThemeProvider({ children }: { children: ReactNode }) {
  return <Tp theme={theme}>{children}</Tp>;
}

/**
 * 커스텀 폰트와 스타일 테마를 제공.
 */
export function FontThemeProvider({ children }: { children: ReactNode }) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return <ThemeProvider>{children}</ThemeProvider>;
}

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
