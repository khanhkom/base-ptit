import {
  EColorLopDangKy,
  ETrangThaiDangKyTinChi,
  HEIGHT,
  WIDTH,
} from '@common';
import { Checkbox, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import {
  // DanhSachLopDangKyProps,
  HocPhanProps,
  LopHocPhanDKTCProps,
  ThoiKhoaBieuListProps,
} from '../type';
import R from '@assets/R';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
// import { LopHPSvList } from '@features/DangKyTinChi/KetQuaDangKyTinChi/type';

interface Props {
  data: LopHocPhanDKTCProps;
  onPress: () => void;
  isCheck: boolean;
  dataHocPhan: HocPhanProps;
  listLHPRegistered: LopHocPhanDKTCProps[];
  // danhSachLopDangKy: DanhSachLopDangKyProps[];
}
const noData = 'Không có thông tin lịch học';
const ItemChiTietHocPhan = (props: Props) => {
  const {
    data,
    onPress,
    isCheck,
    dataHocPhan,
    listLHPRegistered,
    // danhSachLopDangKy,
  } = props;
  const siSoToiDa = data?.siSoToiDa || 0;
  const siSo = (data?.siSoToiDa || 0) - (data?.siSo || 0);

  const tinhDataLichHoc = (): Record<string, boolean[]> => {
    const data: Record<string, boolean[]> = {};
    const allThoiKhoaBieu = listLHPRegistered
      .map(item => item.thoiKhoaBieuList ?? [])
      .flat();
    allThoiKhoaBieu.forEach(item => {
      const date = moment(item.ngay).format('DDMMYY');
      if (!(date in data)) data[date] = [];

      for (let tiet = item.tietBatDau; tiet <= item.tietKetThuc; tiet++)
        data[date][tiet - 1] = true;
    });
    return data;
  };
  //Đăng ký rồi
  const dangKyRoi = listLHPRegistered.find(
    item =>
      item.maHocPhan === dataHocPhan?.ma &&
      item.trangThai !== ETrangThaiDangKyTinChi.CHUA_DANG_KY,
  );
  const checkTrungLich = (
    thoiKhoaBieuList: ThoiKhoaBieuListProps[],
  ): boolean => {
    const dataLichHoc = tinhDataLichHoc();
    const isTrung = thoiKhoaBieuList.some(item => {
      const date = moment(item.ngay).format('DDMMYY');
      if (!(date in dataLichHoc)) return false;

      for (let tiet = item.tietBatDau; tiet <= item.tietKetThuc; tiet++)
        if (dataLichHoc[date][tiet - 1]) return true;

      return false;
    });
    return isTrung;
  };
  const disabled =
    !!dangKyRoi || checkTrungLich(data?.thoiKhoaBieuList) || siSo === 0;

  const renderLich = () => {
    if (!data?.maHoaLichHoc || data?.maHoaLichHoc?.length === 0) {
      return noData;
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
  const background = !!listLHPRegistered?.find(item => item._id === data._id)
    ? undefined
    : data.siSoToiDa - (data.siSo ?? 0) <= 0
    ? EColorLopDangKy.FULL_LOP
    : checkTrungLich(data.thoiKhoaBieuList ?? [])
    ? EColorLopDangKy.TRUNG_LICH
    : 'white';

  return (
    <Pressable
      isDisabled={disabled}
      onPress={onPress}
      backgroundColor={background}
      py="2"
      style={R.themes.shadowOffset}
      borderRadius={WIDTH(8)}
      mb={HEIGHT(16)}
      px={WIDTH(16)}
      flexDir={'row'}
      alignItems="center"
      _pressed={R.themes.pressed}>
      <Checkbox
        isDisabled={disabled}
        onChange={onPress}
        isChecked={isCheck}
        mr={WIDTH(20)}
        value=""
      />
      <VStack flex={1} justifyContent={'center'}>
        <Text
          flex={1}
          color={'gray.500'}
          mt={HEIGHT(2)}
          fontSize="xs"
          fontFamily={R.fonts.BeVietnamProRegular}>
          {`${translate('slink:Thu_tu_lop')}: ${data?.soThuTuLop || '--'}`}
        </Text>
        <Text
          flex={1}
          color={'gray.500'}
          mt={HEIGHT(2)}
          fontSize="xs"
          fontFamily={R.fonts.BeVietnamProRegular}>
          {`${translate('slink:Number_of_students')}: ${siSo}/${siSoToiDa}`}
        </Text>
        <Text
          flex={1}
          fontSize="sm"
          fontStyle={renderLich() === noData ? 'italic' : 'normal'}
          color={renderLich() === noData ? 'gray.500' : 'black'}
          fontFamily={
            renderLich() === noData
              ? R.fonts.BeVietnamProRegular
              : R.fonts.BeVietnamProMedium
          }>
          {renderLich()}
        </Text>
      </VStack>
    </Pressable>
  );
};

export default ItemChiTietHocPhan;
