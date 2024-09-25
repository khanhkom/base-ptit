/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
import React, { ReactNode } from 'react';

import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
  UseFormUnregister,
  UseFormWatch,
} from 'react-hook-form';

import {
  ELoaiThoiGianThucHien,
  ELoaiTruongThongTinTinh,
} from '@config/constant';
import { WIDTH } from '@config/function';
import { CauHinhLoaiHinhProps } from '@features/KhaiBaoQuyTrinh/type';
import {
  CauHinhTruongThongTinTinhProps,
  LoaiHinhNCKHProps,
} from '@features/QuanLyKhoaHocV2/type';
import { Box } from 'native-base';

import MyDatePicker from './component/Time';
import DateFromTo from './component/Time/DateFromTo';
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
const FormHeader = (props: Props) => {
  const { control, errors, loaiHinh, invisible, watch } = props;

  if (invisible) {
    return null;
  }

  const watchedValues = watch();

  const visibleFromTo =
    !loaiHinh?.danhSachCauHinhTruongThongTinTinh?.find(
      item =>
        item.loaiTruongThongTinTinh ===
          ELoaiTruongThongTinTinh.THOI_GIAN_BAT_DAU ||
        item.loaiTruongThongTinTinh ===
          ELoaiTruongThongTinTinh.THOI_GIAN_KET_THUC,
    )?.maTruongThongTinDungSau &&
    loaiHinh &&
    [
      ELoaiThoiGianThucHien.NAM,
      ELoaiThoiGianThucHien.NGAYTHANGNAM,
      ELoaiThoiGianThucHien.THANGNAM,
    ].includes(loaiHinh?.loaiThoiGianThucHien);

  const visibleTime =
    !loaiHinh?.danhSachCauHinhTruongThongTinTinh?.find(
      item =>
        item.loaiTruongThongTinTinh === ELoaiTruongThongTinTinh.MOC_THOI_GIAN,
    )?.maTruongThongTinDungSau &&
    loaiHinh &&
    [
      ELoaiThoiGianThucHien.THOIGIANCUTHE_DDMMYYYY,
      ELoaiThoiGianThucHien.THOIGIANCUTHE_MMYYYY,
      ELoaiThoiGianThucHien.THOIGIANCUTHE_YYYY,
    ].includes(loaiHinh?.loaiThoiGianThucHien);

  return (
    <Box alignSelf={'center'} width={WIDTH(343)}>
      {visibleFromTo && (
        <Controller
          name={'thoiGian'}
          control={control}
          rules={{
            validate: (value: any) => {
              if (!value?.end || !value?.start) {
                return translate('slink:Required');
              }

              if (value?.end < value?.start) {
                return translate('slink:Time_end_greater_time_start');
              }

              return true;
            },
          }}
          render={({ field }) => {
            return (
              <DateFromTo
                isRequired
                defaultValue={watchedValues?.thoiGian}
                error={errors?.thoiGian?.message}
                onChangeValue={field?.onChange}
                format={
                  loaiHinh.loaiThoiGianThucHien === ELoaiThoiGianThucHien.NAM
                    ? 'YYYY'
                    : loaiHinh.loaiThoiGianThucHien ===
                      ELoaiThoiGianThucHien.THANGNAM
                    ? 'MM/YYYY'
                    : 'DD/MM/YYYY'
                }
                type={
                  loaiHinh.loaiThoiGianThucHien === ELoaiThoiGianThucHien.NAM
                    ? 'year'
                    : loaiHinh.loaiThoiGianThucHien ===
                      ELoaiThoiGianThucHien.THANGNAM
                    ? 'month'
                    : 'date'
                }
                label={`${loaiHinh.startLabel} - ${loaiHinh.endLabel}`}
              />
            );
          }}
        />
      )}
      {visibleTime && (
        <Controller
          name={'mocThoiGianTinh'}
          control={control}
          rules={{
            validate: (value: any) => {
              if (!value?.end || !value?.start) {
                return translate('slink:Required');
              }

              if (value?.end < value?.start) {
                return translate('slink:Time_end_greater_time_start');
              }

              return true;
            },
          }}
          render={({ field }) => {
            return (
              <MyDatePicker
                format={
                  loaiHinh.loaiThoiGianThucHien ===
                  ELoaiThoiGianThucHien.THOIGIANCUTHE_YYYY
                    ? 'YYYY'
                    : loaiHinh.loaiThoiGianThucHien ===
                      ELoaiThoiGianThucHien.THOIGIANCUTHE_MMYYYY
                    ? 'MM/YYYY'
                    : 'DD/MM/YYYY'
                }
                type={
                  loaiHinh.loaiThoiGianThucHien ===
                  ELoaiThoiGianThucHien.THOIGIANCUTHE_YYYY
                    ? 'year'
                    : loaiHinh.loaiThoiGianThucHien ===
                      ELoaiThoiGianThucHien.THOIGIANCUTHE_MMYYYY
                    ? 'month'
                    : 'date'
                }
                isRequired
                label={loaiHinh?.timelineLabel}
                onChangeValue={field.onChange}
                placeholder={'Chọn'}
              />
            );
          }}
        />
      )}
    </Box>
  );
};

export default FormHeader;
