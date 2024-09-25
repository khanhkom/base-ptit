import React from 'react';

import R from '@assets/R';
import { getFontSize } from '@config/function';
import { Text } from 'native-base';

const TotalSV = ({ total, name }: { total: string | number; name: string }) => {
  return (
    <Text
      textAlign="right"
      fontFamily={R.fonts.BeVietnamProMedium}
      mb="2"
      fontSize={getFontSize(14)}>{`${total ?? 0} ${name}`}</Text>
  );
};

export default TotalSV;
