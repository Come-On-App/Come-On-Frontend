import React, { useState, useEffect } from 'react';

import { getValueFor } from './secureStore';

export interface authProps {
  ChildComponent: JSX.Element;
  option?: string;
  adminRoute?: string;
}

export const isAuth = () => {
  const accessToken = getValueFor('accessToken').then(value => {
    if (value === null) {
      return false;
    }

    return true;
  });

  console.log(`access${accessToken}`);

  return accessToken;
};

export function Auth() {
  let result = null;

  isAuth().then(value => {
    if (value === null) {
      result = false;
    }

    result = true;
  });
  console.log('asd', result);

  return result;
}
