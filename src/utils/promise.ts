import { useState, useCallback } from 'react';
import { promisify as _promisify } from 'es6-promisify';

import type {
  CallbackFns,
  OnError,
  OnSuccess,
  Options,
  StartValue,
} from '@type/util.promise';
import fn, { copy, getSize, nextIndex } from './fn';

export const createOn = {
  error(onError: OnError | undefined) {
    return (error: Error) => {
      if (onError) {
        return onError(error);
      }

      throw error;
    };
  },
  sucess<T>(onSuccess: OnSuccess<T> | undefined) {
    return (received: T) => {
      if (onSuccess) {
        onSuccess(copy(received));
      }

      return copy(received);
    };
  },
};

export function promisify<T>(
  target: T | (() => Promise<T>) | (() => T),
  convertFn = false,
): () => Promise<T> {
  if (!fn.isFunction(target)) {
    return async () => target;
  }

  if (convertFn) {
    return _promisify(target);
  }

  return target as () => Promise<T>;
}

export function nextPromise<T, R>(
  promise: Promise<T>,
  nextFn: (value: T) => R,
) {
  return promise.then(nextFn);
}

export function createPromiseRecursiveFn<R>(callbackFns: CallbackFns) {
  const fns = copy(callbackFns);
  const fnsLength = getSize(fns);

  return function recursive(
    promise: Promise<unknown>,
    currentIndex = 0,
  ): Promise<R> {
    if (fn.isEqual(currentIndex, fnsLength)) {
      return promise as Promise<R>;
    }

    return recursive(
      nextPromise(promise, fns[currentIndex]),
      nextIndex(currentIndex),
    );
  };
}

/**
 * 비동기 로직을 차례대로 처리하면서 흐름을 이어나가는 유틸함수
 * @version 2.0
 * @param startValue 프로미스가 시작될 첫번째 값을 전달한다. 함수가 아닌 값이라면 암묵적으로 프로미스화된 함수로 변환된다.
 * 
 * **함수를 전달할때는 프로미스가 아니면 에러를 발생시킨다.**
 * 
 * @param callbackFns then 메서드에서 실행될 콜백 함수를 배열에 담아서 전달한다.
 * @param option
 * **onError** - rejected 상태가 될 때 해당 함수가 트리거 된다.
 *
 * **onSuccess** - resolved 상태가 될 때 해당 함수가 트리거 된다. **매개변수는 마지막 프로미스의 결과값이 전달된다.**
 * @returns Promise 객체
 * @example
 * ```ts
 * promiseFlow(placeId, [getPlaceDetailResult, createAddress], {
    onError: () => {
      return mapErrorHandler(location, ErrorType.network);
    },
    onSuccess: data => {
      cache.set(data.place_id, data);
    },
  });
 * ```
 */
export async function promiseFlow<SV, R>(
  _startValue: StartValue<SV>,
  _callbackFns: CallbackFns,
  _option?: Options<R>,
): Promise<R> {
  const firstPromiseFn = promisify(_startValue);
  const promiseRecursiveFn = createPromiseRecursiveFn<R>(_callbackFns);
  const option = copy(_option);
  const [onErrorFn, onSuccessFn] = [
    createOn.error(option?.onError),
    createOn.sucess(option?.onSuccess),
  ];

  return promiseRecursiveFn(firstPromiseFn())
    .then(onSuccessFn)
    .catch(onErrorFn) as Promise<R>;
}

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
