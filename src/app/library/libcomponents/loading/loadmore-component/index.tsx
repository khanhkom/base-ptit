import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import R from '@assets/R';

import styles from './styles';
import { Props } from './type';

const LoadMore: React.FC<Props> = (props: Props) => {
  return (
    <View style={[styles.container, { padding: props?.padding }]}>
      <ActivityIndicator size={'small'} color={R.colors.grey1000} />
    </View>
  );
};

export default LoadMore;
