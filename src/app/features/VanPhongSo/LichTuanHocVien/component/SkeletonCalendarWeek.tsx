import React from 'react';

import { Box, HStack, Skeleton, VStack } from 'native-base';

const SkeletonCalendarWeek = () => {
  return (
    <Box flex={1} mt="4" w="100%">
      <VStack
        w="full"
        space={4}
        rounded="md"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}
        p="4">
        <Skeleton startColor={'primary.100'} h="6" w={'30%'} />
        <HStack mt="2" w={'full'} justifyContent="space-between">
          <Skeleton.Text h="3" w={'20%'} lines={2} />
          <Skeleton.Text w={'75%'} lines={4} />
        </HStack>
        <HStack mt="4" w={'full'} justifyContent="space-between">
          <Skeleton.Text h="3" w={'20%'} lines={2} />
          <Skeleton.Text w={'75%'} lines={4} />
        </HStack>
      </VStack>
    </Box>
  );
};

export default SkeletonCalendarWeek;
