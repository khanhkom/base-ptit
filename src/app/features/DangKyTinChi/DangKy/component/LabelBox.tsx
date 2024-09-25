import { HEIGHT, WIDTH } from '@common';
import { Divider, HStack, Text } from 'native-base';
import React from 'react';
import R from '@assets/R';
const LabelBox = ({ label }: { label?: string }) => {
  if (label) {
    return (
      <HStack
        my={HEIGHT(16)}
        w={'full'}
        alignItems="center"
        justifyContent="space-between">
        <Divider flex={1} />
        <Text
          maxW={WIDTH(200)}
          textAlign="center"
          fontSize={'sm'}
          fontFamily={R.fonts.BeVietnamProSemiBold}
          mx={WIDTH(16)}>
          {label}
        </Text>
        <Divider flex={1} />
      </HStack>
    );
  }
  return null;
};

export default LabelBox;
