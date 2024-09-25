import React, { memo, useMemo } from 'react';
import { Dimensions, useWindowDimensions, View, ViewStyle } from 'react-native';

import equals from 'react-fast-compare';

import R from '@assets/R';

import { styles } from './styles';
import { WallpaperProps } from './type';

import { LocalImage } from '../local-image';

const deviceH = Dimensions.get('screen').height;

const WallpaperComponent = ({
  backgroundImage = R.images.logoApp,
}: WallpaperProps) => {
  // state
  const { width } = useWindowDimensions();

  const containerStyle = useMemo<ViewStyle>(
    () => ({ width, height: deviceH }),
    [width],
  );

  // render
  return (
    <View pointerEvents={'none'} style={[styles.container, containerStyle]}>
      <LocalImage source={backgroundImage} />
    </View>
  );
};

export const Wallpaper = memo(WallpaperComponent, equals);
