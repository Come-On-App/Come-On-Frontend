import { isEqual, cloneDeep } from 'lodash';

/**
 * created At: 2023-05-25
 *
 * @param initialPayload 객체형태의 값을 전달한다.
 * @returns 객체는 다음 함수를 반환한다.
 *
 * get: 현재 상태를 가져온다.
 *
 * update: 상태를 업데이트한다.
 *
 * observe: 상태가 업데이트 될때 변화를 호출할 메소드를 등록한다.
 */
export default function generatePayload<T extends object>(initialPayload: T) {
  return (function innerFn(init: T) {
    let currentPayload: T = init;
    const watchers = new Set<(previous: T) => void>();
    const observerId = new Set<string>();

    function get() {
      return currentPayload;
    }

    function update(fn: (previous: T) => Partial<T>): void {
      const oldPayload = currentPayload;
      const newPayload = {
        ...oldPayload,
        ...fn(cloneDeep(currentPayload)),
      };

      if (!isEqual(oldPayload, newPayload)) {
        currentPayload = newPayload;
        watchers.forEach((watcher) => watcher(cloneDeep(newPayload)));
      }
    }

    function observe(fn: (previous: T) => void, id: string) {
      if (!observerId.has(id)) {
        watchers.add(fn);
        observerId.add(id);
      }
    }

    return { update, get, observe };
  })(initialPayload);
}
