import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@config/function';
import { Button, Text, useTheme } from 'native-base';
import { IButtonProps } from 'native-base/lib/typescript/components/primitives/Button/types';
interface Props extends IButtonProps {
  hidden?: boolean;
  title: string;
  text?: StyleProp<TextStyle>;
}
const BaseButtonNB = (props: Props) => {
  const { hidden = false, title, text, ...otherProps } = props;

  const theme = useTheme();

  if (hidden) {
    return <></>;
  }

  return (
    <Button
      backgroundColor={R.colors.colorMain}
      alignSelf={'center'}
      borderRadius={WIDTH(8)}
      _pressed={R.themes.pressed}
      marginTop={HEIGHT(24)}
      hitSlop={R.themes.hitSlop}
      {...otherProps}>
      <Text
        color={theme.colors.white}
        fontFamily={R.fonts.BeVietnamProMedium}
        fontSize={'md'}
        style={text}>
        {title}
      </Text>
    </Button>
  );
};

export default BaseButtonNB;
