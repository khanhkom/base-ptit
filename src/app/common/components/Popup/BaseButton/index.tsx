/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { View } from 'react-native-animatable';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';
import LoadingComponent from '@libcomponents/loading/loading-component';
interface Props {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  text?: TextStyle;
  icon?: ReactNode;
  testID?: string;
  disabled?: boolean;
  loading?: boolean;
  hidden?: boolean;
}
const ViewLoading = ({ loading, title, text }: any) => {
  if (loading) {
    return (
      <View style={styles.viewLoading}>
        <LoadingComponent size="small" color={R.colors.white} />
      </View>
    );
  }

  return <Text style={[styles.title, text && text]}>{title && title}</Text>;
};

const BaseButton = (props: Props) => {
  const {
    title,
    onPress,
    style,
    text,
    icon,
    testID,
    disabled,
    loading,
    hidden,
  } = props;

  if (hidden) {
    return <></>;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style && style]}
      activeOpacity={0.7}
      testID={testID || `${title}_`}
      disabled={disabled}>
      {icon && icon}
      <ViewLoading loading={loading} text={text} title={title} />
    </TouchableOpacity>
  );
};

export default BaseButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: HEIGHT(8),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: R.colors.colorPink,
    borderRadius: WIDTH(8),
  },
  title: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    color: R.colors.white,
  },
  viewLoading: {
    height: HEIGHT(30),
  },
});
