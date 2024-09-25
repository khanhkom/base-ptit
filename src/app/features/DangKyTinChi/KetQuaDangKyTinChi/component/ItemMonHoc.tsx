import React from 'react';

import R from '@assets/R';
import { HEIGHT, LoaiHocPhanDangKyTinChi, WIDTH } from '@common';
import { Box, Pressable, Text, useTheme } from 'native-base';

import { LopHPSvList } from '../type';
import { translate } from '@utils/i18n/translate';

interface Props {
  data: LopHPSvList;
}
const ItemMonHoc = (props: Props) => {
  const { data } = props;

  const tenHP = data?.lopHocPhan?.hocPhan?.ten || '--';

  const maHP = data?.lopHocPhan?.hocPhan?.ma || '--';

  return (
    <Pressable
      width={WIDTH(343)}
      marginBottom={HEIGHT(12)}
      alignSelf="center"
      backgroundColor={R.colors.white}
      paddingTop={HEIGHT(12)}
      paddingBottom={HEIGHT(12)}
      borderRadius={WIDTH(8)}
      paddingLeft={WIDTH(16)}
      paddingRight={WIDTH(16)}
      style={R.themes.shadowOffset}>
      <Text
        flex={1}
        fontFamily={R.fonts.BeVietnamProMedium}
        fontSize={'sm'}
        color={'black'}
        numberOfLines={3}>
        {`${tenHP} (${maHP})`}
      </Text>
      <ViewThuTu data={data} />
      <SubInfo data={data} />
    </Pressable>
  );
};

export default ItemMonHoc;
const ViewThuTu = ({ data }: { data: LopHPSvList }) => {
  const theme = useTheme();

  return (
    <Box
      alignItems="flex-end"
      flexDirection="row"
      justifyContent="space-between"
      marginTop={HEIGHT(8)}>
      <Text
        color={theme.colors.gray[500]}
        fontSize="xs"
        fontFamily={R.fonts.BeVietnamProRegular}>
        {`TT lớp: ${data?.lopHocPhan?.soThuTuLop || '--'}`}
      </Text>
      <Text
        color={theme.colors.gray[500]}
        fontSize="xs"
        fontFamily={R.fonts.BeVietnamProRegular}>
        {`TT nhóm: ${data?.lopHocPhan?.soThuTuNhom || '--'}`}
      </Text>
    </Box>
  );
};

const SubInfo = ({ data }: { data: LopHPSvList }) => {
  const theme = useTheme();

  const loaiDK = LoaiHocPhanDangKyTinChi?.[data?.loai] || '--';

  const stc = data?.lopHocPhan?.hocPhan?.soTinChi;

  return (
    <Box
      alignItems="flex-end"
      flexDirection="row"
      justifyContent="space-between"
      marginTop={HEIGHT(4)}>
      <Text
        color={theme.colors.primary[500]}
        fontSize="xs"
        fontFamily={R.fonts.BeVietnamProRegular}>
        {`${stc || 0} ${translate('slink:Credits')}`}
      </Text>
      <Text
        marginTop={HEIGHT(4)}
        color={theme.colors.gray[500]}
        fontSize="xs"
        fontFamily={R.fonts.BeVietnamProRegular}>
        {`${loaiDK}`}
      </Text>
    </Box>
  );
};
