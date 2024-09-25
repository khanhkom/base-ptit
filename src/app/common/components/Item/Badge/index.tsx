import { StyleSheet } from 'react-native';
import React from 'react';
import { Box, Text } from 'native-base';
import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@config/function';
const BadgeCustome = ({ value }: { value: string }) => {
  return (
    <Box
      py={'0.5'}
      px={'2'}
      alignSelf="flex-start"
      backgroundColor={R.colors.blue100}
      borderRadius={WIDTH(8)}
      marginBottom={HEIGHT(8)}>
      <Text
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize={getFontSize(11)}
        color="primary.500">
        {value}
      </Text>
    </Box>
  );
};

export default BadgeCustome;
