import React from 'react';
import { ThemeProvider } from '@rneui/themed';

import { theme } from '@shared/constants/themed';
import { IProvider } from './type';

/**
 * [React Native Elements] 커스텀 정의된 스타일 테마를 제공.
 * @see docs https://reactnativeelements.com/docs/customization/themeprovider
 */
export default function Provider({ children }: IProvider) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
