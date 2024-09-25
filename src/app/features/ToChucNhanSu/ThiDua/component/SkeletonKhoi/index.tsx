import React from 'react';

import { WIDTH } from '@common';
import { HStack, Skeleton, VStack } from 'native-base';

const SekeletonKhoi = () => {
  return (
    <VStack flex="3" space="2">
      <Skeleton.Text />
      <HStack alignItems="center" justifyContent={'space-between'}>
        <Skeleton h="8" w={WIDTH(200)} startColor="gray.200" />
        <Skeleton h="8" w={WIDTH(80)} />
      </HStack>
      <HStack alignItems="center" justifyContent={'space-between'}>
        <Skeleton h="8" w={WIDTH(200)} startColor="gray.200" />
        <Skeleton h="8" w={WIDTH(80)} />
      </HStack>
    </VStack>
  );
};

export default SekeletonKhoi;
