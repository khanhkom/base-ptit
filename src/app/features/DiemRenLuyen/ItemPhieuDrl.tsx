import React from 'react';

import R from '@assets/R';
import {
  HEIGHT,
  MapKeyColorTrangThaiChamDiem,
  MapKeyNameTrangThaiChamDiem,
  WIDTH,
} from '@common';
import { translate } from '@utils/i18n/translate';
import { Badge, Box, HStack, Pressable, Text, useTheme } from 'native-base';
import { ColorSchemeType } from 'native-base/lib/typescript/components/types';

import { PhieuDrlProps } from './type';
import { HocKyProps } from '@components/SelectHocKy/type';

interface Props {
  data: PhieuDrlProps;
  listHocKy: HocKyProps[];
}
const ItemPhieuDrl = (props: Props) => {
  const { data, listHocKy } = props;

  const tenHocKy =
    listHocKy?.find(hocKy => hocKy?.ma === data?.dotDrl?.maHocKy)?.ten || '--';

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
        {`${tenHocKy}`}
      </Text>
      <ViewNgayGio data={data} />
      <SubInfo data={data} />
    </Pressable>
  );
};

export default ItemPhieuDrl;
const ViewNgayGio = ({ data }: { data: PhieuDrlProps }) => {
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
        {`${translate('slink:Diem')}: ${data?.diemSo || '--'}`}
      </Text>
    </Box>
  );
};

const SubInfo = ({ data }: { data: PhieuDrlProps }) => {
  return (
    <Box
      alignItems="flex-end"
      flexDirection="row"
      justifyContent="space-between"
      marginTop={HEIGHT(8)}>
      <ItemLabelBadge
        label={translate('slink:Status')}
        value={MapKeyNameTrangThaiChamDiem?.[data?.trangThai] || '--'}
        colorScheme={MapKeyColorTrangThaiChamDiem?.[data?.trangThai]}
      />
    </Box>
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
