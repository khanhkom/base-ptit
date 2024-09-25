import React, { useMemo } from 'react';
import { ViewStyle } from 'react-native';

import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { styles } from './styles';
import { ProgressLinearProps } from './type';

import { COLOR_BG, COLOR_FG, STROKE_WIDTH } from '../constant';

export const ProgressLinear = ({
  bg = COLOR_BG,
  fg = COLOR_FG,
  radius = 4,
  strokeWidth = STROKE_WIDTH,
  width = '100%',
}: ProgressLinearProps) => {
  // state

  // style
  const bgStyle = useMemo<ViewStyle[]>(
    () => [
      styles.bg,
      {
        backgroundColor: bg,
        height: strokeWidth,
        borderRadius: radius,
        maxWidth: width,
      },
    ],
    [bg, radius, strokeWidth],
  );

  const fgStyle = useMemo<ViewStyle[]>(
    () => [
      styles.fg,
      {
        backgroundColor: fg,
        borderRadius: radius,
      },
    ],
    [fg, radius],
  );

  // function

  // reanimated style
  const foregroundStyle = useAnimatedStyle(() => ({
    transform: [],
  }));

  // render
  return (
    <Animated.View style={bgStyle}>
      <Animated.View style={[fgStyle, foregroundStyle]} />
    </Animated.View>
  );
};
