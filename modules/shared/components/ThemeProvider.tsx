import React, { ReactNode } from 'react';
import { ThemeProvider as Tp } from '@rneui/themed';

import { theme } from '@shared/constants/themed';

/**
 * [React Native Elements] 정의된 스타일 테마를 제공.
 * @see docs https://reactnativeelements.com/docs/customization/themeprovider
 */
function ThemeProvider({ children }: { children: ReactNode }) {
  return <Tp theme={theme}>{children}</Tp>;
}

export default ThemeProvider;
