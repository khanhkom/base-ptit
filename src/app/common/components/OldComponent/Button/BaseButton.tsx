/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';

const ViewLoading = ({
  title,
  text,
}: {
  title: string;
  text: StyleProp<TextStyle>;
}) => {
  return <Text style={[styles.title, text && text]}>{title && title}</Text>;
};

const BaseButton = (props: any) => {
  const { title, onPress, style, text, icon, testID, disabled } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style && style]}
      activeOpacity={0.7}
      testID={testID || `${title}_`}
      disabled={disabled}>
      {icon && icon}
      <ViewLoading text={text} title={title} />
    </TouchableOpacity>
  );
};

export default BaseButton;

const styles = StyleSheet.create({
  button: {
    width: WIDTH(343),
    // height: HEIGHT(48),
    paddingVertical: HEIGHT(8),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: R.colors.colorPink,
    borderRadius: WIDTH(8),
  },
  title: {
    // fontFamily: R.fonts.Roboto,
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(24),
    color: R.colors.white,
    fontWeight: '500',
  },
});
