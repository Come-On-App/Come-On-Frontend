import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import { IreduxProvider } from './type';

/**
 * 리덕스 상태에 제어 가능하게 한다.
 */
export default function ReduxProvider({ children }: IreduxProvider) {
  return <Provider store={store}>{children}</Provider>;
}
