import React, { ReactNode } from 'react';
import { ThemeProvider as Tp } from '@rneui/themed';

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
export function FontLoader({ children }: { children: ReactNode }) {
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
