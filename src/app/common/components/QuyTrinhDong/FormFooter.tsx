/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react';

import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
  UseFormUnregister,
  UseFormWatch,
} from 'react-hook-form';

import UploadFileForm from '@components/QuyTrinhDong/component/UploadFileQuyTrinh/UploadfileForm';
import {
  ELoaiTruongThongTinTinh,
  MapIdLoaiTruongThongTinTinh,
} from '@config/constant';
import { WIDTH } from '@config/function';
import { CauHinhLoaiHinhProps } from '@features/KhaiBaoQuyTrinh/type';
import {
  CauHinhTruongThongTinTinhProps,
  LoaiHinhNCKHProps,
} from '@features/QuanLyKhoaHocV2/type';
import { Box } from 'native-base';

import InputQuantityMember from './component/InputQuantityMemBer';
import TableThanhVien from './component/TableThanhVien';
import { translate } from '@utils/i18n/translate';

interface Props {
  formKhaiBao?: CauHinhLoaiHinhProps[];
  unregister?: UseFormUnregister<FieldValues>;
  errors?: any;
  watch: UseFormWatch<FieldValues>;
  onPress?: () => void;
  control?: Control<FieldValues, any> | undefined;
  children?: ReactNode;
  titleButton?: string;
  truongThongTinTinh?: CauHinhTruongThongTinTinhProps[];
  loaiHinh?: LoaiHinhNCKHProps;
  register?: UseFormRegister<FieldValues>;
  invisible?: boolean;
}
const FormFooter = (props: Props) => {
  const { watch, control, errors, loaiHinh, invisible } = props;

  if (invisible) {
    return null;
  }

  const watchedValues = watch();

  const visibleDSTV = !loaiHinh?.danhSachCauHinhTruongThongTinTinh?.find(
    item =>
      item.loaiTruongThongTinTinh ===
      ELoaiTruongThongTinTinh.DANH_SACH_THANH_VIEN,
  )?.maTruongThongTinDungSau;

  const label =
    loaiHinh?.danhSachCauHinhTruongThongTinTinh?.find(
      item =>
        item.loaiTruongThongTinTinh ===
        ELoaiTruongThongTinTinh.DANH_SACH_THANH_VIEN,
    )?.label ?? translate('slink:List_member');

  const idDS =
    MapIdLoaiTruongThongTinTinh?.[ELoaiTruongThongTinTinh.DANH_SACH_THANH_VIEN];

  const visibleMinhChungChiaGio =
    watchedValues?.soLuongThanhVien &&
    watchedValues?.soLuongThanhVien > 1 &&
    loaiHinh?.danhSachCauHinhTruongThongTinTinh?.find(
      item =>
        item.loaiTruongThongTinTinh ===
        ELoaiTruongThongTinTinh.MINH_CHUNG_CHIA_GIO,
    )?.display !== false;

  return (
    <Box alignSelf={'center'} width={WIDTH(343)}>
      {visibleDSTV && (
        <>
          <InputQuantityMember
            visible
            defaultValue={watchedValues?.soLuongThanhVien}
            control={control}
            error={errors?.soLuongThanhVien?.message}
          />
          <Controller
            name={idDS}
            control={control}
            rules={{
              validate: value =>
                (Array.isArray(value) && value.length > 0) ||
                translate('slink:Required'),
            }}
            render={({ field }) => {
              return (
                <TableThanhVien
                  loaiHinh={loaiHinh}
                  defaultValue={watchedValues?.[idDS]}
                  error={errors?.soLuongThanhVien?.message}
                  onChange={field?.onChange}
                  label={label}
                />
              );
            }}
          />
          {visibleMinhChungChiaGio && (
            <UploadFileForm
              name={'danhSachMinhChung'}
              arrayFile={
                watchedValues?.danhSachMinhChung
                  ? watchedValues?.danhSachMinhChung
                  : []
              }
              error={errors?.danhSachMinhChung?.message}
              control={control}
              required
              label="Minh chứng chia giờ"
            />
          )}
        </>
      )}
    </Box>
  );
};

export default FormFooter;
