import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import R from '@assets/R';

import styles from './styles';
import { LoadingType } from './type';

const LoadingComponent = (props: LoadingType) => {
  const { size, customStyle, loading = true, color } = props;

  if (loading) {
    return (
      <View
        style={[styles.loadingContainer, customStyle && customStyle]}
        testID="loading">
        <ActivityIndicator
          color={color || R.colors.grey1000}
          animating
          size={size || 'large'}
        />
      </View>
    );
  } else {
    return <View />;
  }
};

export default LoadingComponent;
