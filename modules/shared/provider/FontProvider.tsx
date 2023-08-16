import React from 'react';

import useCachedResources from '@app/hooks/useCachedResources';
import ThemeProvider from './ThemeProvider';
import { IProvider } from './type';

/**
 * 커스텀 폰트와 스타일 테마를 제공.
 *
 * 폰트와 내부의 데이터를 검증한뒤 디스플레이를 렌더링한다.
 */
export default function FontThemeProvider({ children }: IProvider) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return <ThemeProvider>{children}</ThemeProvider>;
}
