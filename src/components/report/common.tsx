/* eslint-disable import/prefer-default-export */
import React, { ReactNode } from 'react';
import { View } from 'react-native';

export function Content({ children }: { children: ReactNode }) {
  return <View style={{ marginVertical: 10 }}>{children}</View>;
}
