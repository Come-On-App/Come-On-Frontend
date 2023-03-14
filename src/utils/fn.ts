import _ from 'lodash/fp';
import _isPromise from 'is-promise';

export default _;

export const copy = _.cloneDeep;

export const getSize = _.size;

export const isPromise = _isPromise;

export const emptyString = '' as string;

export function nextIndex(currentIndex: number) {
  const ONE = 1;

  return _.add(currentIndex, ONE);
}

export function generateCache<K, V>() {
  const map = new Map<K, V>();
  const hasCache = (key: K) => map.has(key);
  const getCache = (Key: K) => map.get(Key);
  const setCache = (Key: K, value: V) => {
    if (!hasCache(Key)) map.set(Key, value);
  };

  return {
    has: hasCache,
    set: setCache,
    get: getCache,
  };
}

export function pickSafelyBy<T extends object, F>(
  object: T,
  key: keyof T,
  fallback: F,
): F {
  const target = object[key];

  if (!target) {
    return fallback;
  }

  return target as F;
}
