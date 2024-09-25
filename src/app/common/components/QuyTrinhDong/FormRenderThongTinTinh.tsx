/* eslint-disable no-nested-ternary */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import {
  ELoaiThoiGianThucHien,
  ELoaiTruongThongTinTinh,
} from '@config/constant';

//Component

import {
  CauHinhTruongThongTinTinhProps,
  LoaiHinhNCKHProps,
} from '@features/QuanLyKhoaHocV2/type';

import TableThanhVien from './component/TableThanhVien';
import MyDatePicker from './component/Time';

const FormRenderThongTinTinh = (props: {
  cauHinhTinh: CauHinhTruongThongTinTinhProps;
  onChange: (e: any) => void;
  formValue?: any;
  defaultValue: any;
  error?: string;
  loaiHinh?: LoaiHinhNCKHProps;
}) => {
  const { cauHinhTinh, onChange, defaultValue, error, loaiHinh } = props;

  switch (cauHinhTinh?.loaiTruongThongTinTinh) {
    case ELoaiTruongThongTinTinh.MOC_THOI_GIAN:
      return (
        <MyDatePicker
          format={
            loaiHinh?.loaiThoiGianThucHien ===
            ELoaiThoiGianThucHien.THOIGIANCUTHE_YYYY
              ? 'YYYY'
              : loaiHinh?.loaiThoiGianThucHien ===
                ELoaiThoiGianThucHien.THOIGIANCUTHE_MMYYYY
              ? 'MM/YYYY'
              : 'DD/MM/YYYY'
          }
          type={
            loaiHinh?.loaiThoiGianThucHien ===
            ELoaiThoiGianThucHien.THOIGIANCUTHE_YYYY
              ? 'year'
              : loaiHinh?.loaiThoiGianThucHien ===
                ELoaiThoiGianThucHien.THOIGIANCUTHE_MMYYYY
              ? 'month'
              : 'date'
          }
          isRequired
          error={error}
          label={cauHinhTinh?.label}
          onChangeValue={onChange}
          placeholder={'Chọn'}
        />
      );
    case ELoaiTruongThongTinTinh.DANH_SACH_THANH_VIEN:
      return (
        <TableThanhVien
          loaiHinh={loaiHinh}
          defaultValue={defaultValue}
          error={error}
          onChange={onChange}
          label={cauHinhTinh?.label}
        />
      );

    default:
      return <></>;
  }
};

export default FormRenderThongTinTinh;
