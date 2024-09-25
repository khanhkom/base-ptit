import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import { getWidth } from '@config/function';

const SlideAnimatedItem = props => {
  const { children, index = 1, onLayout } = props;

  const animatedValue = useRef(new Animated.Value(0));

  const translateX = animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [getWidth(), 0],
  });

  const itemStyles = [{ transform: [{ translateX }] }];

  useEffect(() => {
    Animated.spring(animatedValue.current, {
      toValue: 1,
      delay: index * 50,
      useNativeDriver: true,
    }).start();
  });

  return (
    <Animated.View onLayout={onLayout} style={itemStyles}>
      {children}
    </Animated.View>
  );
};

export default SlideAnimatedItem;
