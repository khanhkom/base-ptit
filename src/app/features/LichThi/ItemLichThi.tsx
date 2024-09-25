import React from 'react';

import R from '@assets/R';
import {
  colorSchemeCongNoKey,
  colorSchemeKQHTKey,
  colorTrangThaiThi,
  HEIGHT,
  WIDTH,
} from '@common';
import {
  Badge,
  Box,
  HStack,
  Pressable,
  Text,
  useTheme,
  VStack,
} from 'native-base';

import { translate } from '@utils/i18n/translate';
import { LichThiProps } from './type';
import { ColorSchemeType } from 'native-base/lib/typescript/components/types';

interface Props {
  data: LichThiProps;
}
const ItemLichThi = (props: Props) => {
  const { data } = props;

  const tenHP = data?.tenHocPhan || '--';

  const maHocPhan = data?.maHocPhan || '--';

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
        {`${tenHP} (${maHocPhan})`}
      </Text>
      <ViewNgayGio data={data} />
      <ViewDiaDiem data={data} />
      <SubInfo data={data} />
    </Pressable>
  );
};

export default ItemLichThi;
const ViewNgayGio = ({ data }: { data: LichThiProps }) => {
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
        {`${translate('slink:Ngay')}: ${data?.ngayThi || '--'}`}
      </Text>
      <Text
        color={theme.colors.gray[500]}
        fontSize="xs"
        fontFamily={R.fonts.BeVietnamProRegular}>
        {`${translate('slink:Gio')}: ${data?.gioThi || '--'}`}
      </Text>
    </Box>
  );
};
const ViewDiaDiem = ({ data }: { data: LichThiProps }) => {
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
        {`${translate('slink:Phong_thi')}: ${data?.phong || '--'}`}
      </Text>
      <Text
        color={theme.colors.gray[500]}
        fontSize="xs"
        fontFamily={R.fonts.BeVietnamProRegular}>
        {`${translate('slink:So_SV')}: ${data?.soLuong || '--'}`}
      </Text>
    </Box>
  );
};
const SubInfo = ({ data }: { data: LichThiProps }) => {
  return (
    <VStack>
      <Box
        alignItems="flex-end"
        flexDirection="row"
        justifyContent="space-between"
        marginTop={HEIGHT(8)}>
        <ItemLabelBadge
          label={translate('slink:KQHT')}
          value={data?.dieuKienKetQuaHocTap || '--'}
          colorScheme={colorSchemeKQHTKey?.[data?.dieuKienKetQuaHocTap]}
        />
        <ItemLabelBadge
          label={translate('slink:Debt')}
          value={data?.dieuKienCongNo || '--'}
          colorScheme={colorSchemeCongNoKey?.[data?.dieuKienCongNo]}
        />
      </Box>
      <ItemLabelBadge
        label={translate('slink:Trang_thai_thi')}
        value={data?.trangThai || '--'}
        colorScheme={colorTrangThaiThi?.[data?.trangThai]}
      />
    </VStack>
  );
};
const ItemLabelBadge = (props: {
  label: string;
  value: string;
  colorScheme: ColorSchemeType;
}) => {
  const { label, value, colorScheme } = props;
  const theme = useTheme();

  return (
    <HStack alignItems={'center'}>
      <Text
        color={theme.colors.gray[500]}
        fontSize="xs"
        fontFamily={R.fonts.BeVietnamProRegular}>
        {`${label}: `}
      </Text>
      <Badge colorScheme={colorScheme}>{`${value}`}</Badge>
    </HStack>
  );
};
