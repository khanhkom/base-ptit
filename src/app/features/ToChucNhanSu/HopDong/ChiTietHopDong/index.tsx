/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import ItemLabel from '@components/Item/ItemLabel';
import ItemTrong from '@components/Item/ItemTrong';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';
import { Box, FlatList, Text } from 'native-base';

const ChiTietHopDong = props => {
  const data = props?.route?.params?.data;

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Contract')} />
      <Box width={WIDTH(343)} alignSelf={'center'} flex={1}>
        <FlatList
          data={formDataHopDong(data)}
          ListEmptyComponent={<ItemTrong />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            if (item?.header) {
              return (
                <Text
                  mt={'2'}
                  color="#161616"
                  fontFamily={R.fonts.BeVietnamProBold}
                  fontSize={'md'}>
                  {item?.header}
                </Text>
              );
            } else {
              return (
                <ItemLabel
                  label={item?.label}
                  value={item?.value}
                  isLast={item?.isLast}
                  typeHTML={item?.isHtml && !!item?.value}
                  link={item?.link}
                />
              );
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default ChiTietHopDong;

const styles = StyleSheet.create({
  listContainer: { paddingBottom: HEIGHT(30), paddingTop: HEIGHT(24) },
});

const formDataHopDong = (data: any) => {
  const listFile = data?.fileDinhKem ?? [];

  const fileArr = listFile.slice(1);

  return [
    {
      label: 'Loại hợp đồng',
      value: data?.loaiHopDong?.ten,
    },
    {
      label: 'Số hợp đồng',
      value: data?.soHopDong,
    },
    {
      label: 'Số quyết định',
      value: data?.soQuyetDinh,
      isLast: true,
    },
    {
      header: 'Bên A: Người sử dụng lao động',
    },
    {
      label: 'Cán bộ',
      value: `${data?.thongTinNhanSuBenA?.hoTen ?? '--'} (${
        data?.thongTinNhanSuBenA?.maCanBo ?? '--'
      })`,
    },
    {
      label: 'Vị trí việc làm',
      value: data?.thongTinNhanSuBenA?.donViViTri?.tenChucVu,
    },
    {
      label: 'Số điện thoại',
      value: data?.thongTinNhanSuBenA.sdtCaNhan,
    },
    {
      label: 'Đại diện cho đơn vị',
      value: data?.daiDienChoDonVi,
    },
    {
      label: 'Địa chỉ',
      value: data?.diaChi,
      isLast: true,
    },
    {
      header: 'Bên B: Người lao động',
    },
    {
      label: 'Cán bộ',
      value: data?.hoTen,
    },
    {
      label: 'Ngày sinh',
      value: data?.ngaySinhFormat,
    },
    {
      label: 'Số điện thoại',
      value: data?.sdtCaNhan,
    },
    {
      label: 'Giới tính',
      value: data?.gioiTinh,
    },
    {
      label: 'Tỉnh/Thành phố nơi sinh',
      value: data?.noiSinhThanhPhoTen,
    },
    {
      label: 'Quận/Huyện nơi sinh',
      value: data?.noiSinhQuanTen,
    },
    {
      label: 'Phường/Xã nơi sinh',
      value: data?.noiSinhXaTen,
    },
    {
      label: 'Tỉnh/Thành phố hộ khẩu',
      value: data?.hoKhauThanhPhoTen,
    },
    {
      label: 'Quận/Huyện hộ khẩu',
      value: data?.hoKhauQuanTen,
    },
    {
      label: 'Phường/Xã hộ khẩu',
      value: data?.hoKhauXaTen,
    },
    {
      label: 'Địa chỉ cụ thể',
      value: data?.hoKhauDiaChiCuThe,
    },
    {
      label: 'Tỉnh/Thành phố ở hiện nay',
      value: data?.noiOThanhPhoTen,
    },
    {
      label: 'Quận/Huyện ở hiện nay',
      value: data?.noiOQuanTen,
    },
    {
      label: 'Phường/Xã ở hiện nay',
      value: data?.noiOXaTen,
    },
    {
      label: 'Địa chỉ cụ thể',
      value: data?.noiODiaChiCuThe,
    },
    {
      label: 'Trình độ đào tạo',
      value: data?.trinhDoDaoTao,
    },
    {
      label: 'Ngành',
      value: `${data?.nganh ?? '--'} (${data?.nganhId ?? '--'})`,
    },
    {
      label: 'Số tài khoản',
      value: data?.soTaiKhoan,
    },
    {
      label: 'Ngân hàng',
      value: data?.nganHang,
    },
    {
      label: 'CMND/CCCD',
      value: data?.cccdCMND,
    },
    {
      label: 'Ngày cấp',
      value: data?.ngayCapFormat,
    },
    {
      label: 'Nơi cấp',
      value: data?.noiCap,
    },
    {
      label: 'Mã số thuế thu nhập cá nhân',
      value: data?.maSoThueThuNhapCaNhan,
      isLast: true,
    },
    {
      header: 'Thông tin hợp đồng',
    },
    {
      label: 'Đơn vị làm việc',
      value: data?.donViLamViec,
    },
    {
      label: 'Vị trí việc làm',
      value: data?.viTriChucDanh,
    },
    {
      label: 'Từ ngày',
      value: data?.tuNgayFormat,
    },
    {
      label: 'Đến ngày',
      value: data?.denNgayFormat,
    },
    {
      label: 'Địa điểm làm việc',
      value: data?.diaDiemLamViec,
    },
    {
      label: 'Chế độ làm việc',
      value: data?.cheDoLamViec,
      isHtml: true,
    },
    {
      label: 'Công việc',
      value: data?.congViec,
      isHtml: true,
    },
    {
      label: 'Loại lương',
      value: data?.loaiLuong,
    },
    {
      label: 'Ngạch lương',
      value: data?.ngachLuong,
    },
    {
      label: 'Bậc lương',
      value: data?.bacLuong ? String(data?.bacLuong) : '--',
    },
    {
      label: 'Hệ số lương',
      value: data?.heSoLuong ? String(data?.heSoLuong) : '--',
    },
    {
      label: 'Phần trăm hưởng',
      value: data?.phanTramHuong ? `${String(data?.phanTramHuong)}%` : '--',
    },
    {
      label: 'File đính kèm',
      value: data?.fileDinhKem?.[0] ? 'Xem chi tiết' : '--',
      link: data?.fileDinhKem?.[0],
      isLast: true,
    },
    ...fileArr?.map(itemFile => {
      return {
        label: '',
        value: itemFile ? 'Xem chi tiết' : '--',
        link: itemFile,
        isLast: true,
      };
    }),
  ];
};
