import React from 'react';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@config/function';
import { Box, Pressable, Text, useTheme } from 'native-base';
interface Props {
  label: string;
  expand?: boolean | undefined;
  onPress?: () => void;
}
import Entypo from 'react-native-vector-icons/Entypo';

const TextTitleTCNS = (props: Props) => {
  const { label, expand, onPress } = props;

  const theme = useTheme();

  return (
    <Pressable
      _pressed={R.themes.pressed}
      disabled={!onPress}
      onPress={onPress}
      backgroundColor={'gray.200'}
      paddingX={WIDTH(16)}
      flexDirection={'row'}
      justifyContent="space-between"
      w="full"
      paddingY={HEIGHT(12)}
      my="2">
      <Text
        fontFamily={R.fonts.BeVietnamProMedium}
        fontSize={'sm'}
        lineHeight="lg"
        color={'black'}
        w={WIDTH(300)}>
        {label}
      </Text>
      {typeof expand === 'boolean' && (
        <Box alignSelf="center">
          <Entypo
            style={{ marginLeft: WIDTH(16) }}
            color={theme.colors.gray[400]}
            size={WIDTH(20)}
            name={expand ? 'chevron-up' : 'chevron-down'}
          />
        </Box>
      )}
    </Pressable>
  );
};

export default TextTitleTCNS;
