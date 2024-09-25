import {
  ColorTrangThaiDangKyTinChi,
  ETrangThaiDangKyTinChi,
  HEIGHT,
  WIDTH,
} from '@common';
import { Badge, Box, HStack, Pressable, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { LopHocPhanDKTCProps, MucThuMeProps } from '../type';
import R from '@assets/R';
import { translate } from '@utils/i18n/translate';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalDetailLHP from './ModalDetailLHP';

interface Props {
  data: LopHocPhanDKTCProps;
  onPressDel: () => void;
  index: number;
  hocPhi: string;
  mucThuMe: MucThuMeProps | undefined;
  isVisibleDelete: boolean;
}
const ItemLHPSelect = (props: Props) => {
  const { data, index, hocPhi } = props;
  const renderLich = () => {
    if (!data?.maHoaLichHoc || data?.maHoaLichHoc?.length === 0) {
      return 'Không có thông tin lịch học';
    }
    const maHoaLichs = data?.maHoaLichHoc?.sort((a, b) => a.thu - b.thu);

    return maHoaLichs?.map(item => {
      const dsTuan = item?.danhSachTuan.map(j => j.tuan).sort((a, b) => a - b);
      const thu = item?.thu < 7 ? `Thứ ${item?.thu + 1}` : 'Chủ nhật';
      const tiet = `tiết ${item?.tietBatDau}-${
        item?.tietBatDau + item?.soTiet - 1
      }`;
      const tuan = `${dsTuan.length} tuần (${dsTuan.join(',')})`;
      const tenNhanSu = item?.nhanSu?.hoDem
        ? [item?.nhanSu.hoDem, item?.nhanSu.ten].join(' ')
        : item?.tenNhanSu ?? '';
      // <i style={{ color: '#999' }}>Không có thông tin g/v</i>;
      const phongHoc = item?.phongHoc ? `phòng ${item?.phongHoc}` : '';
      return (
        // eslint-disable-next-line react/no-array-index-key
        [thu, tiet, tuan, tenNhanSu, phongHoc]?.filter(j => !!j)?.join(', ')
      );
    });
  };
  const [visible, setvisible] = useState(false);
  const trangThai = data?.trangThai || ETrangThaiDangKyTinChi.CHUA_DANG_KY;
  return (
    <>
      <Pressable
        onPress={() => setvisible(true)}
        backgroundColor={R.colors.backgroundColorNew}
        py="2"
        _pressed={R.themes.pressed}
        px={WIDTH(16)}
        flexDir={'row'}>
        <HStack alignItems={'center'} flex={1}>
          <Box
            width={WIDTH(32)}
            height={WIDTH(32)}
            rounded="full"
            mr="4"
            justifyContent="center"
            alignItems="center"
            overflow="hidden"
            backgroundColor={'primary.500'}>
            <Text
              color={'white'}
              fontSize="sm"
              fontFamily={R.fonts.BeVietnamProMedium}>
              {(index || 0) + 1}
            </Text>
          </Box>
          <VStack flex={1} justifyContent={'center'}>
            <Text
              flex={1}
              fontSize="sm"
              fontFamily={R.fonts.BeVietnamProMedium}>
              {data?.hocPhan?.ten || '--'}
              <Text color={'gray.500'} fontFamily={R.fonts.BeVietnamProRegular}>
                {` (${data?.hocPhan?.ma || '--'})`}
              </Text>
            </Text>
            <Text
              flex={1}
              color={'gray.500'}
              mt={HEIGHT(2)}
              fontSize="xs"
              fontFamily={R.fonts.BeVietnamProRegular}>
              {`${translate('slink:Number_of_credits')}: ${
                data?.hocPhan?.soTinChi || '--'
              }`}
            </Text>
            <Text
              flex={1}
              color={'gray.500'}
              mt={HEIGHT(2)}
              fontSize="xs"
              fontFamily={R.fonts.BeVietnamProRegular}>
              {translate('slink:Hoc_phi_du_kien')}:{' '}
              <Text color={'primary.500'}>{hocPhi || '--'}</Text>
            </Text>
          </VStack>
        </HStack>
        <VStack ml="2" alignItems={'flex-end'} justifyContent="space-between">
          <Badge
            alignSelf="flex-start"
            colorScheme={ColorTrangThaiDangKyTinChi?.[trangThai]}>
            {trangThai}
          </Badge>
          {/* {isVisibleDelete && (
            <Pressable
              hitSlop={R.themes.hitSlop}
              _pressed={R.themes.pressed}
              onPress={onPressDel}>
              <AntDesign size={WIDTH(18)} name={'delete'} color={'red'} />
            </Pressable>
          )} */}
        </VStack>
      </Pressable>
      <ModalDetailLHP
        hocPhi={hocPhi}
        infoDetail={renderLich()}
        data={data}
        isVisible={visible}
        closeButton={() => setvisible(false)}
      />
    </>
  );
};

export default ItemLHPSelect;
