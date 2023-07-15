import { describe, expect, test, jest, beforeEach } from '@jest/globals';
import generatePayload from './generatePayload';

interface Payload {
  age: number;
  arr: number[];
}

const initialPayload: Payload = { age: 30, arr: [1, 2, 3] };
let payload: {
  update: (fn: (previous: Payload) => Partial<Payload>) => void;
  get: () => Payload;
  observe: (fn: (previous: Payload) => void, id: string) => void;
};

beforeEach(() => {
  payload = generatePayload<Payload>(initialPayload);
});

describe('generatePayload()', () => {
  test('함수를 호출하면 객체를 반환한다.', () => {
    expect(typeof payload).toBe('object');
  });

  test('반환 객체는 3개의 메소드를 가지고 있다.', () => {
    expect(Object.keys(payload).length).toBe(3);
    expect(Object.keys(payload)).toEqual(['update', 'get', 'observe']);
  });

  test('get 메소드는 상태값을 가져온다.', () => {
    expect(payload.get().age).toBe(30);
    expect(payload.get().arr).toStrictEqual([1, 2, 3]);
  });

  describe('update 메소드는 상태를 업데이트한다.', () => {
    test('기존 상태를 직접 수정할 수 없다.', () => {
      const newPayalod = { age: 40, arr: [1, 2, 3, 4] };

      payload.update((state) => {
        state.arr.push(4);

        return {
          age: 40,
        };
      });

      expect(payload.get()).not.toEqual(newPayalod);
    });

    test('상태를 올바르게 업데이트하고 이를 감지한다', () => {
      const newPayalod = { age: 40, arr: [1, 2, 3, 4] };

      payload.update(() => {
        return {
          age: 40,
          arr: [1, 2, 3, 4],
        };
      });

      expect(payload.get()).toEqual(newPayalod);
    });

    test('동일한 상태값인 경우 업데이트를 수행하지 않는다.', () => {
      const prevPayalod = payload.get();

      payload.update(() => {
        return {};
      });

      expect(prevPayalod).toEqual(initialPayload);
    });

    test('일부 속성을 수정하면 기존 속성은 유지되고 새로운 객체를 반환한다.', () => {
      const prevPayalod = payload.get();
      const mockObj = { age: 40, arr: [1, 2, 3] };

      payload.update(() => {
        return {
          age: 40,
        };
      });

      expect(prevPayalod.arr).toStrictEqual([1, 2, 3]);

      payload.update(() => {
        return mockObj;
      });

      expect(mockObj !== payload.get()).toBeTruthy();
    });
  });

  describe('observe 메소드는 변화를 감지한다.', () => {
    test('observe 함수를 등록하면 변화를 감지하여 호출한다.', () => {
      const mockFn = jest.fn();

      payload.observe(mockFn, 'mock_observe');
      payload.update(() => {
        return {
          age: 50,
        };
      });

      expect(mockFn).toHaveBeenCalled();
    });

    test('중복 observe는 등록되지 말아야 한다.', () => {
      const mockFn = jest.fn();

      payload.observe(jest.fn(), 'mock_observe');
      payload.observe(mockFn, 'mock_observe');
      payload.observe(mockFn, 'mock_observe');
      payload.observe(mockFn, 'mock_observe');
      payload.update(() => {
        return {
          age: 50,
        };
      });

      expect(mockFn).not.toHaveBeenCalled();
    });
  });
});
