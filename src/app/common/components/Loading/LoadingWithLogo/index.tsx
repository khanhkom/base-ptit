import React from 'react';
import { View } from 'react-native';

import R from '@assets/R';

import styles from './styles';
import { LoadingType } from './type';
import FastImage from 'react-native-fast-image';
import { WIDTH } from '@config/function';

const LoadingWithLogo = (props: LoadingType) => {
  const { customStyle, loading = true } = props;

  if (loading) {
    return (
      <View
        style={[styles.loadingContainer, customStyle && customStyle]}
        testID="loading">
        <FastImage
          source={R.images.loadingv2}
          resizeMode="contain"
          style={{
            height: WIDTH(50),
            width: WIDTH(50),
            position: 'absolute',
          }}
        />
        <FastImage
          source={R.images.logoApp}
          resizeMode="contain"
          style={{
            height: WIDTH(35),
            width: WIDTH(35),
            borderRadius: WIDTH(40),
            borderColor: R.colors.primaryColor,
          }}
        />
      </View>
    );
  }
  return null;
};

export default LoadingWithLogo;
