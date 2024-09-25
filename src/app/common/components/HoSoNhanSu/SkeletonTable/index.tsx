import React from 'react';

import { Skeleton, VStack } from 'native-base';

const SkeletonTable = () => {
  return (
    <VStack w="full" space={2} overflow="hidden" rounded="md">
      <Skeleton h="10" backgroundColor={'primary.100'} />
      <Skeleton.Text />
    </VStack>
  );
};

export default SkeletonTable;
