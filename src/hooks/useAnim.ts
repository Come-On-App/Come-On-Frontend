import React, { ReactNode, useRef, useMemo, useCallback } from 'react';
import { Animated } from 'react-native';
import AnimationViewBounce, { start } from '@components/AnimationViewBounce';

type Type<T> = { children: ReactNode; id: T };

function createAnimatedInstance<T extends string>(ids: T[]) {
  type RefType = {
    [x in T]: Animated.Value;
  };

  const animatedRef: RefType = {} as RefType;

  ids.forEach(id => {
    animatedRef[id] = new Animated.Value(0.5);
  });

  return animatedRef;
}

/**
 * @param ids
 * @example const ids ["name","image","date"]
 * const { trigger, AnimationBounceView } = useAnimationBounce(ids);
 *
 */
export default function useAnimationBounce<T extends string>(ids: T[]) {
  const animatedInstance = useRef(createAnimatedInstance<T>(ids)).current;
  const trigger = useCallback(
    (key: T) => start(animatedInstance[key]),
    [animatedInstance],
  );
  const AnimationBounceView = useMemo(() => {
    return ({ children, id }: Type<T>) => {
      const animValue = animatedInstance[id];

      return AnimationViewBounce({ animValue, children });
    };
  }, [animatedInstance]);

  return {
    trigger,
    AnimationBounceView,
  };
}
