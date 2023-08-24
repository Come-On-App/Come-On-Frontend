import { Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';

import Font from '@shared/components/font/Font';
import useStyles from './style';
import { IsubmitStatus } from './type';

export default function SubmitStatus({
  isLoading,
  title,
  backgroundColor = '',
}: IsubmitStatus) {
  const { container, font } = useStyles(backgroundColor);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoading) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading, opacity]);

  return (
    <Animated.View style={[container, { opacity }]}>
      <Font bold style={font}>
        {title}
      </Font>
    </Animated.View>
  );
}
