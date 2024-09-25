import React, { useState } from 'react';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import { Box, useTheme } from 'native-base';

import ModalGuiYKienBGD from './ModalGuiYKienBGD';
interface Props {
  hide?: boolean;
}
const DuyetLichTuanBGD = (props: Props) => {
  const { hide = true } = props;

  const theme = useTheme();

  const [visible, setvisible] = useState(false);

  if (hide) {
    return null;
  }

  return (
    <Box
      paddingY={HEIGHT(16)}
      w="full"
      flexDirection={'row'}
      justifyContent="space-between"
      paddingX={WIDTH(24)}
      backgroundColor={'white'}
      style={R.themes.shadowOffset}>
      <BaseButtonNB
        backgroundColor={'green.600'}
        width={WIDTH(150)}
        marginTop={0}
        text={{ fontSize: theme.fontSizes.sm }}
        title="Duyệt"
      />
      <BaseButtonNB
        backgroundColor={'red.600'}
        width={WIDTH(150)}
        onPress={() => setvisible(true)}
        marginTop={0}
        text={{ fontSize: theme.fontSizes.sm }}
        title="Yêu cầu chỉnh sửa"
      />
      <ModalGuiYKienBGD
        modalVisible={visible}
        turnOffModel={() => setvisible(false)}
      />
    </Box>
  );
};

export default DuyetLichTuanBGD;
