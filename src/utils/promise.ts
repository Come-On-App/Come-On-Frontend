import { useState, useCallback } from 'react';
import promiseflow from '@jeongbaebang/promise-flow';

import type { CallbackFns, Options, StartValue } from '@type/util.promise';

export const promiseFlow = promiseflow;

export function usePromiseFlow<SV, R>() {
  const [data, setData] = useState<R>();
  const [error, setErrorObject] = useState<Error>();
  const [isError, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const fn0 = useCallback((arg0: R) => {
    setData(arg0);
    setSuccess(true);
  }, []);
  const fn1 = useCallback((e: Error) => {
    setError(true);
    setErrorObject(e);
  }, []);
  const fn2 = useCallback(() => setLoading(false), []);
  const promiseFlowFn = useCallback(
    (
      _startValue: StartValue<SV>,
      _callbackFns: CallbackFns,
      _option?: Options<R>,
    ) => {
      setLoading(true);
      promiseFlow(_startValue, _callbackFns, _option)
        .then(fn0)
        .catch(fn1)
        .finally(fn2);
    },
    [fn0, fn1, fn2],
  );

  return {
    data,
    error,
    isError,
    isSuccess,
    isLoading,
    promiseFlow: promiseFlowFn,
  };
}
