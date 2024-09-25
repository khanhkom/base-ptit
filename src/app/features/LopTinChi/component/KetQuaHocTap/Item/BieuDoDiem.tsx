import React from 'react';
import { HEIGHT, WIDTH, getFontSize, getWidth } from '@common';
import { Box, HStack, Image, Text, VStack } from 'native-base';
import R from '@assets/R';

const BieuDoDiem = () => {
  return (
    <VStack mb={HEIGHT(16)} px={WIDTH(16)}>
      <Image
        source={R.images.thangDiem}
        alignSelf={'center'}
        resizeMode="contain"
        height={HEIGHT(88)}
      />
      <HStack justifyContent={'space-between'}>
        {[4, 6, 7, 8, 9]?.map((item, index) => {
          return (
            <Box key={index} w={WIDTH(26)}>
              <Text
                fontFamily={R.fonts.BeVietnamProMedium}
                fontWeight={'500'}
                fontSize={getFontSize(14)}
                alignSelf={'center'}>
                {item}
              </Text>
            </Box>
          );
        })}
      </HStack>
    </VStack>
  );
};

export default BieuDoDiem;
