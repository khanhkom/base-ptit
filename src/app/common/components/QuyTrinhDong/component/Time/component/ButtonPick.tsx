import React from 'react';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@config/function';
import { Pressable, Text } from 'native-base';

const ButtonPick = ({
  label,
  onPress,
  isDisabled,
}: {
  label: string;
  isDisabled?: boolean;
  onPress: () => void;
}) => {
  return (
    <Pressable
      paddingTop={HEIGHT(2)}
      paddingBottom={HEIGHT(2)}
      paddingLeft={WIDTH(8)}
      paddingRight={WIDTH(8)}
      backgroundColor={isDisabled ? 'gray.200' : '#ABABAB66'}
      alignSelf={'center'}
      minWidth={WIDTH(60)}
      alignItems="center"
      borderRadius={WIDTH(2)}
      onPress={onPress}
      _pressed={R.themes.pressed}>
      <Text
        color={R.colors.black0}
        fontSize={getFontSize(12)}
        lineHeight={getLineHeight(24)}
        fontFamily={R.fonts.BeVietnamProRegular}>
        {label}
      </Text>
    </Pressable>
  );
};

export default ButtonPick;
