import { PlaceSelect } from '@type/index';
import _ from 'lodash/fp';
import { requestPostMeetingPlacesUnLock } from '@api/meeting/places';
import { promiseFlow } from './promise';

export default _;

export const copy = _.cloneDeep;

export const getSize = _.size;

export const emptyString = '' as string;

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

export function createTimeFormat(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  const hoursFormatted = hours.toString().padStart(2, '0');
  const minutesFormatted = minutes.toString().padStart(2, '0');
  const formatted = `${hoursFormatted}:${minutesFormatted} ${meridiem}`;
  const payload = `${hoursFormatted}:${minutesFormatted}:00`;

  return { formatted, payload };
}

export function isExpiry(date: string) {
  const targetDate = new Date(date);
  const currentDate = new Date();

  return targetDate < currentDate;
}

export function unLockMeeting(
  placeState: PlaceSelect,
  placeResetDispatch: () => void,
) {
  if (placeState.state === 'Modify' && placeState.isLock) {
    const payload = {
      meetingId: placeState.meetingId,
      placeId: placeState.meetingPlaceId,
    };

    promiseFlow(payload, [requestPostMeetingPlacesUnLock], {
      onSuccess: placeResetDispatch,
    });
  }
}
