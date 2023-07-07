import React from 'react';

import useCachedResources from '@app/hooks/useCachedResources';
import ThemeProvider from './ThemeProvider';
import { IProvider } from './type';

/**
 * 커스텀 폰트와 스타일 테마를 제공.
 */
export default function FontThemeProvider({ children }: IProvider) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return <ThemeProvider>{children}</ThemeProvider>;
}
