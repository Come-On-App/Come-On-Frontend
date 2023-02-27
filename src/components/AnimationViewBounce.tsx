import React, { ReactNode } from 'react';

import { Animated } from 'react-native';

export type BounceViewProps = {
  animValue: Animated.Value | undefined;
  children: ReactNode;
  key?: number;
};

/**
 *
 * @param animValue = useRef(new Animated.Value(0.5)).current;
 *
 * 초기값 (0 : -2deg , 0.5 : 0deg 1 : +2deg)
 *
 * useRef객체에 애니메이션 Value를 담아서 전달해줘야 합니다.
 *
 * AnimationViewBounce에 넣는값과 동일한 값을 넣어주세요
 * 
 * start()함수 실행시 애니메이션이 동작합니다.
 * @example   
 * const onPressHnadler = () => {
    start(animValue);
   }
 */

export const start = (animValue: Animated.Value) => {
  return Animated.sequence([
    Animated.timing(animValue, {
      toValue: 0,
      useNativeDriver: true,
      duration: 0.3,
    }),
    Animated.timing(animValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 0.3,
    }),
    Animated.timing(animValue, {
      toValue: 0.5,
      useNativeDriver: true,
      duration: 0.3,
    }),
    Animated.timing(animValue, {
      toValue: 0,
      useNativeDriver: true,
      duration: 0.3,
    }),
    Animated.timing(animValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 0.3,
    }),
    Animated.timing(animValue, {
      toValue: 0.5,
      useNativeDriver: true,
      duration: 0.3,
    }),
  ]).start();
};

/**
 *
 * @param animValue = useRef(new Animated.Value(0.5)).current;
 *
 * 초기값 (0 : -2deg , 0.5 : 0deg 1 : +2deg)
 *
 * useRef에 위처럼 애니메이션 Value를 담아서 전달해줘야 합니다.
 *
 * start 넣는값과 동일한 값을 넣어주세요
 * 
 * @example 
 * <AnimationViewBounce animValue={animValue}>
        <View>
            ...anything
        </View>
    </AnimationViewBounce>
 *
 */

function AnimationViewBounce({
  children,
  animValue,
  key,
}: BounceViewProps): JSX.Element {
  const animationStyle = animValue && {
    transform: [
      {
        rotate: animValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: ['-2deg', '0deg', '+2deg'],
        }),
      },
    ],
  };

  return (
    <Animated.View key={key} style={animationStyle}>
      {children}
    </Animated.View>
  );
}

export default AnimationViewBounce;
