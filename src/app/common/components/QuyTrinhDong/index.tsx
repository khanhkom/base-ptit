/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inline-comments */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useEffect, useMemo } from 'react';

import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormUnregister,
  UseFormWatch,
} from 'react-hook-form';

import BaseButtonNB from '@components/BaseButtonNB';
import {
  ELoaiTruongThongTinTinh,
  LoaiDefaultValue,
  MapIdLoaiTruongThongTinTinh,
} from '@config/constant';
import { WIDTH } from '@config/function';
import { CauHinhLoaiHinhProps } from '@features/KhaiBaoQuyTrinh/type';
import {
  CauHinhTruongThongTinTinhProps,
  LoaiHinhNCKHProps,
} from '@features/QuanLyKhoaHocV2/type';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

import InputQuantityMember from './component/InputQuantityMemBer';
import UploadFileForm from './component/UploadFileQuyTrinh/UploadfileForm';
import FormFooter from './FormFooter';
import FormHeader from './FormHeader';
import FormRender from './FormRender';
import FormRenderThongTinTinh from './FormRenderThongTinTinh';
import { ruleQTD } from './rule';
interface Props {
  formKhaiBao?: CauHinhLoaiHinhProps[];
  unregister?: UseFormUnregister<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  onPress?: () => void;
  control?: Control<FieldValues, any> | undefined;
  children?: ReactNode;
  titleButton?: string;
  truongThongTinTinh?: CauHinhTruongThongTinTinhProps[];
  loaiHinh?: LoaiHinhNCKHProps;
  register?: UseFormRegister<FieldValues>;
  invisible?: boolean;
  setValue?: UseFormSetValue<FieldValues>;
  defaultValue?: any;
  formData?: any;
}
const QuyTrinhDong = (props: Props) => {
  const {
    formKhaiBao,
    watch,
    control,
    unregister,
    register,
    onPress,
    errors,
    setValue,
    truongThongTinTinh,
    children,
    titleButton,
    loaiHinh,
    defaultValue,
    formData,
  } = props;

  const watchedValues = watch();

  return (
    <>
      <FormHeader {...props} />
      {formKhaiBao?.map((itemInfo: CauHinhLoaiHinhProps, index: number) => {
        return (
          <ItemInputAndInfo
            key={index}
            control={control}
            formValue={watchedValues}
            unregister={unregister}
            setValue={setValue}
            register={register}
            errors={errors}
            truongThongTinTinh={truongThongTinTinh}
            item={itemInfo}
            loaiHinh={loaiHinh}
            defaultValue={defaultValue}
            formData={formData}
          />
        );
      })}
      <FormFooter {...props} />
      {children}
      <BaseButtonNB
        hidden={!titleButton}
        width={WIDTH(140)}
        title={titleButton ?? ''}
        onPress={onPress}
      />
    </>
  );
};

export default QuyTrinhDong;
interface ItemProps {
  item: CauHinhLoaiHinhProps;
  unregister?: UseFormUnregister<FieldValues>;
  watchedValues?: any;
  errors?: any;
  formValue?: any;
  setValue?: UseFormSetValue<FieldValues>;
  control?: Control<FieldValues, any> | undefined;
  truongThongTinTinh?: CauHinhTruongThongTinTinhProps[];
  register?: UseFormRegister<FieldValues>;
  loaiHinh?: LoaiHinhNCKHProps;
  defaultValue?: any;
  formData?: any;
}
const ItemInputAndInfo = (props: ItemProps) => {
  const {
    item,
    control,
    formValue,
    errors,
    setValue,
    unregister,
    register,
    truongThongTinTinh,
    loaiHinh,
    defaultValue,
    formData,
  } = props;

  useEffect(() => {
    item?.loaiDefaultValue && getInitValue();

    formData?.[item?.ma]?.value && initDonValue();
  }, [formData, defaultValue]);

  const initDonValue = async () => {
    setValue?.(item?.ma, formData?.[item?.ma]?.value);
  };

  const getInitValue = async () => {
    if (item?.loaiDefaultValue === LoaiDefaultValue.CUSTOM) {
      setValue?.(item?.ma, item?.customDefaultValue);
    } else {
      setValue?.(item?.ma, defaultValue?.[item?.ma]);
    }
  };

  const formTruongThongTinhTinh =
    truongThongTinTinh?.filter(
      e => e.maTruongThongTinDungSau === item?.ma && e?.display,
    ) ?? [];

  const fieldLienQuan = item?.truongThongTinLienQuan;

  //kiểm tra trường thông tin liên quan có hiển thị element tiếp theo hay không
  const checkTruongThongTinLienQuan = useMemo(() => {
    let check = false;
    if (!item?.truongThongTinLienQuan) {
      return true;
    }

    if (formValue?.[item?.truongThongTinLienQuan] === item?.giaTriLienQuan) {
      return true;
    }

    if (item.giaTriLienQuan.includes) {
      if (
        item?.giaTriLienQuan?.includes(
          formValue?.[item?.truongThongTinLienQuan],
        )
      ) {
        return true;
      }

      if (formValue?.[item?.truongThongTinLienQuan]?.map) {
        formValue?.[item?.truongThongTinLienQuan]?.map((e: any) => {
          if (item?.giaTriLienQuan?.includes(e)) {
            check = true;
          }
        });
      }
    }

    return check;
  }, [
    item?.truongThongTinLienQuan,
    item?.giaTriLienQuan,
    formValue?.[item?.truongThongTinLienQuan],
  ]);

  useEffect(() => {
    fieldLienQuan && onUnregister();
  }, [checkTruongThongTinLienQuan]);

  const visibleMinhChungChiaGio =
    formValue?.soLuongThanhVien &&
    formValue?.soLuongThanhVien > 1 &&
    loaiHinh?.danhSachCauHinhTruongThongTinTinh?.find(
      e =>
        e.loaiTruongThongTinTinh ===
        ELoaiTruongThongTinTinh.MINH_CHUNG_CHIA_GIO,
    )?.display !== false;

  const onUnregister = () => {
    if (fieldLienQuan && !checkTruongThongTinLienQuan) {
      unregister?.(item?.ma);
    } else {
      register?.(item?.ma);
    }
  };

  if (checkTruongThongTinLienQuan) {
    return (
      <>
        <Controller
          name={item.ma}
          control={control}
          rules={{
            validate: (value: any) => {
              return ruleQTD(value, item);
            },
          }}
          render={({ field }) => {
            return (
              <Box alignSelf={'center'} width={WIDTH(343)}>
                <FormRender
                  disabled={item?.readonly}
                  defaultValue={formValue?.[item?.ma]}
                  error={errors?.[item?.ma]?.message}
                  onChange={field?.onChange}
                  cauHinh={item}
                />
              </Box>
            );
          }}
        />
        {formTruongThongTinhTinh?.map(data => {
          const idTinh =
            MapIdLoaiTruongThongTinTinh?.[data?.loaiTruongThongTinTinh];

          return (
            <>
              <InputQuantityMember
                visible={
                  data?.loaiTruongThongTinTinh ===
                  ELoaiTruongThongTinTinh.DANH_SACH_THANH_VIEN
                }
                defaultValue={formValue?.soLuongThanhVien}
                control={control}
                error={errors?.soLuongThanhVien?.message}
              />
              <Controller
                name={idTinh}
                control={control}
                rules={{
                  validate: (value: any) => {
                    if (
                      data?.loaiTruongThongTinTinh !==
                      ELoaiTruongThongTinTinh.DANH_SACH_THANH_VIEN
                    ) {
                      if (
                        value === undefined || //undefined
                        value === '' || // Chuỗi rỗng
                        (Array.isArray(value) && value.length === 0) // Mảng rỗng
                      ) {
                        return translate('slink:Required');
                      }

                      return true;
                    }

                    return true;
                  },
                }}
                render={({ field }) => {
                  return (
                    <Box alignSelf={'center'} width={WIDTH(343)}>
                      <FormRenderThongTinTinh
                        loaiHinh={loaiHinh}
                        defaultValue={formValue?.[idTinh]}
                        error={
                          errors?.[
                            MapIdLoaiTruongThongTinTinh?.[
                              data?.loaiTruongThongTinTinh
                            ]
                          ]?.message
                        }
                        formValue={formValue}
                        onChange={field?.onChange}
                        cauHinhTinh={data}
                      />
                    </Box>
                  );
                }}
              />
              {visibleMinhChungChiaGio &&
                data?.loaiTruongThongTinTinh ===
                  ELoaiTruongThongTinTinh.DANH_SACH_THANH_VIEN && (
                  <Box alignSelf={'center'} width={WIDTH(343)}>
                    <UploadFileForm
                      name={'danhSachMinhChung'}
                      arrayFile={
                        formValue?.danhSachMinhChung
                          ? formValue?.danhSachMinhChung
                          : []
                      }
                      error={errors?.danhSachMinhChung?.message}
                      control={control}
                      required
                      label="Minh chứng chia giờ"
                    />
                  </Box>
                )}
            </>
          );
        })}
      </>
    );
  }

  return null;
};
