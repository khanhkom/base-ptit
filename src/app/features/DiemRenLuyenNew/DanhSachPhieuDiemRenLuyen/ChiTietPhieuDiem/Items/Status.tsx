import React from 'react';

import R from '@assets/R';
import { ETrangThaiPhieuDiemRL } from '@common';
import { Badge, HStack, Text } from 'native-base';

const Status = ({ status }: { status: string }) => {
  const getBgColor = () => {
    switch (status) {
      case 'Lưu':
        return 'yellow';
      case ETrangThaiPhieuDiemRL.DA_GUI:
        return 'green';
      case ETrangThaiPhieuDiemRL.CHUA_GUI:
        return 'blue';

      default:
        return 'gray';
    }
  };

  const getName = () => {
    switch (status) {
      case 'Lưu':
        return ETrangThaiPhieuDiemRL.LUU;

      default:
        return status;
    }
  };

  return (
    <HStack alignItems={'center'} marginLeft={'4'} mt="4" mb={'2'}>
      <Text fontFamily={R.fonts.BeVietnamProMedium}>Trạng thái: </Text>
      <Badge
        alignSelf={'flex-start'}
        // marginBottom={HEIGHT(12)}
        colorScheme={getBgColor()}>
        {getName()}
      </Badge>
    </HStack>
  );
};

export default Status;
