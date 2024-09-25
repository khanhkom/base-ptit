/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import R from '@assets/R';
import {
  MapColorTrangThaiTiepNhanDon,
  TrangThaiTiepNhanDon,
} from '@config/constant';
import { getFontSize, HEIGHT, popupCancel, WIDTH } from '@config/function';
import { LichSuKhaiBaoProps } from '@features/KhaiBaoQuyTrinh/type';
import ItemIconSVG from '@libcomponents/icon-svg';
import { delDonQuyTrinh } from '@networking/user/QuanLyKhoaHoc';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Badge, Box, Pressable, Text } from 'native-base';

import styles from './styles';

interface Props {
  title: string;
  index: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onRefresh?: () => void;
  data: any;
  khaiBao?: boolean;
}
const ItemKhaiBaoQuyTrinh = (props: Props) => {
  const { title, data, index, onPress, khaiBao, onRefresh } = props;

  const isTraPhi = data?.cauTrucThanhToan?.yeuCauTraPhi;

  const visible =
    !data?.danhSachBuocXuLy.find(
      item => item?.trangThaiTiepNhan === TrangThaiTiepNhanDon.DUYET,
    ) && !khaiBao;

  return (
    <Pressable
      testID={`ItemKhaiBaoQuyTrinh ${index}`}
      width={WIDTH(343)}
      _pressed={R.themes.pressed}
      marginBottom={HEIGHT(12)}
      backgroundColor={R.colors.white}
      paddingTop={HEIGHT(12)}
      paddingBottom={HEIGHT(12)}
      borderRadius={WIDTH(8)}
      paddingLeft={WIDTH(16)}
      paddingRight={WIDTH(16)}
      style={[styles.container]}
      onPress={onPress && onPress}>
      <Box flexDirection={'row'} alignItems="flex-start">
        <Text
          flex={1}
          fontFamily={R.fonts.BeVietnamProMedium}
          fontSize={getFontSize(14)}
          color={R.colors.black0}
          numberOfLines={3}>
          {title?.trim() ?? translate('slink:Chua_cap_nhat')}
        </Text>
        {isTraPhi && (
          <Badge ml="1" alignSelf={'flex-start'} colorScheme="red">
            {translate('slink:Tra_phi')}
          </Badge>
        )}
      </Box>
      <BoPhan visible={khaiBao} name={data?.boPhanChiuTrachNhiem?.ten} />
      <InfoLichSu invisible={khaiBao} data={data} />
      <DeletedComponent
        visible={visible}
        id={data?._id}
        onRefresh={onRefresh}
      />
    </Pressable>
  );
};

export default ItemKhaiBaoQuyTrinh;

const DeletedComponent = (props: {
  visible: boolean;
  id: string;
  onRefresh?: () => void;
}) => {
  const { visible, id, onRefresh } = props;

  const confirmHandle = () => {
    popupCancel(
      translate('slink:Notice_t'),
      translate('slink:Confirm_delete'),
      deleteDon,
    );
  };

  const deleteDon = async () => {
    try {
      const response = await delDonQuyTrinh(id);

      if (response?.status) {
        onRefresh && onRefresh();
      }
    } catch (error) {}
  };

  if (visible) {
    return (
      <Pressable
        onPress={confirmHandle}
        _pressed={R.themes.pressed}
        mt={HEIGHT(12)}
        alignItems="center">
        <Text
          fontFamily={R.fonts.BeVietnamProRegular}
          flex={1}
          fontSize={getFontSize(12)}
          color={'red.600'}>
          {translate('slink:Delete')}
        </Text>
      </Pressable>
    );
  }

  return null;
};

const BoPhan = ({ name, visible }: { name: string; visible?: boolean }) => {
  if (visible) {
    return (
      <Box
        mt="2"
        flexDirection={'row'}
        alignItems="flex-end"
        justifyContent={'space-between'}>
        <Text
          fontFamily={R.fonts.BeVietnamProRegular}
          marginRight={'2'}
          flex={1}
          fontSize={getFontSize(12)}
          color={'gray.500'}>
          {name ?? ''}
        </Text>
        <ItemIconSVG title="Arrow-Right" />
      </Box>
    );
  }

  return null;
};

const InfoLichSu = ({
  data,
  invisible,
}: {
  invisible?: boolean;
  data: LichSuKhaiBaoProps;
}) => {
  const obj = data?.danhSachBuocXuLy.find(function (phanTu) {
    return phanTu.laBuocHienTai;
  });

  const trangThai =
    obj?.trangThaiTiepNhan || TrangThaiTiepNhanDon.CHUA_CAP_NHAT;

  const buoc = `${translate('slink:Buoc')} ${
    data?.danhSachBuocXuLy?.length || 0
  }/${data?.quyTrinh?.danhSachBuocXuLy?.length || 0}: ${obj?.ten}`;

  if (invisible) {
    return null;
  }

  return (
    <Box mt="2">
      <Text
        flex={1}
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize={getFontSize(12)}
        numberOfLines={2}
        color={'gray.500'}>
        {buoc}
      </Text>
      <Box
        mt="1"
        flexDirection={'row'}
        justifyContent="space-between"
        alignItems="flex-end">
        <Badge
          alignSelf="flex-start"
          colorScheme={MapColorTrangThaiTiepNhanDon?.[trangThai]}>
          {trangThai}
        </Badge>
        <Text
          fontFamily={R.fonts.BeVietnamProRegular}
          fontSize={getFontSize(12)}
          color={'gray.500'}>
          {`${translate('slink:Ngay_khai', {
            time: moment(data?.createdAt).format('DD/MM/YYYY'),
          })}`}
        </Text>
      </Box>
    </Box>
  );
};
