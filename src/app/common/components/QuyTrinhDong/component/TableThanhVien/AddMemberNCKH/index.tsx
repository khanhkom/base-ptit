/* eslint-disable no-inline-comments */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Control, Controller, FieldValues, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import R from '@assets/R';
import BaseButtonNB from '@components/BaseButtonNB';
import { EHocHam, EHocVi, EKieuDuLieu, ELoaiCanBo } from '@config/constant';
import { WIDTH } from '@config/function';
import { LoaiHinhNCKHProps } from '@features/QuanLyKhoaHocV2/type';
import HeaderReal from '@libcomponents/header-real';
import { goBack } from '@navigation/navigation-service';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import { customAlphabet } from 'nanoid/non-secure';
import { Box, Text } from 'native-base';

import styles from './styles';

import InputNB from '../../Input';
import MultiChoicesNB from '../../MultiChoices';
import SingleSelect from '../../SingleSelect';
import TCNSCanBo from '../../TCNSCanBo';
interface Props {
  route: {
    params: {
      index?: number | undefined;
      dataInit?: any;
      loaiHinh?: LoaiHinhNCKHProps;
      getData: (e: any, index: number | undefined) => void;
      delItem: (index: number) => void;
    };
  };
}
const AddMemberNCKH = (props: Props) => {
  const getData = props?.route?.params?.getData;

  const dsVaiTro =
    props?.route?.params?.loaiHinh?.danhSachVaiTroThanhVienKhaDung ?? [];

  const indexItem = props?.route?.params?.index;

  const delItem = props?.route?.params?.delItem;

  const dataInit = props?.route?.params?.dataInit ?? [];

  const {
    control,
    handleSubmit,
    unregister,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: dataInit });

  const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 20);

  const onSubmit = (data: any) => {
    const {
      hocHam,
      hocVi,
      hoVaTen,
      loai,
      donVi,
      soDienThoai,
      email,
      tongDiem,
      tongGio,
      danhSachVaiTro,
    } = data;

    const body = {
      hocHam,
      hocVi,
      loai,
      donVi,
      tongDiem,
      tongGio,
      soDienThoai,
      email,
      danhSachVaiTro,
      hoVaTen: data?.nhanSu
        ? `${data?.nhanSu?.hoDem ?? ''} ${data?.nhanSu?.ten ?? ''}`
        : hoVaTen,
      maDinhDanh: data?.nhanSu?.maCanBo || data?.maDinhDanh || '',
      maDonVi: data?.nhanSu?.donViChinh?.maDonVi || data?.maDonVi || '',
      ssoId:
        loai === ELoaiCanBo.TRONG_HOC_VIEN
          ? data?.nhanSu?.ssoId || data?.ssoId
          : nanoid(),
    };

    getData(body, indexItem);

    goBack();
  };

  const watchedValues = watch();

  const formThanhVien = [
    {
      label: translate('slink:Loai'),
      required: true,
      type: EKieuDuLieu.DANHMUC,
      data: _.values(ELoaiCanBo),
      name: 'loai',
      value: dataInit?.loai,
    },
    ...(watchedValues?.loai === 'Cán bộ / Giảng viên trong học viện'
      ? [
          {
            label: translate('slink:Fullname'),
            required: true,
            type: EKieuDuLieu.CAN_BO,
            value: dataInit?.maDinhDanh,
            name: 'nhanSu',
          },
        ]
      : [
          {
            label: translate('slink:Fullname'),
            required: true,
            type: EKieuDuLieu.TEXT,
            value: dataInit?.hoVaTen,
            name: 'hoVaTen',
          },
        ]),
    {
      label: translate('slink:Role'),
      required: true,
      type: EKieuDuLieu.MULTI_CHOICES,
      data: dsVaiTro,
      value: dataInit?.danhSachVaiTro,
      name: 'danhSachVaiTro',
    },
    ...(!props?.route?.params?.loaiHinh?.tinhTheoTungNam
      ? [
          {
            label: translate('slink:Gio_chuan_NCKH'),
            required: true,
            value: dataInit?.tongGio,
            type: EKieuDuLieu.NUMBER,
            name: 'tongGio',
          },
        ]
      : []),

    ...(props?.route?.params?.loaiHinh?.tinhDiem
      ? [
          {
            label: translate('slink:Diem_san_pham_NCKH'),
            required: true,
            value: dataInit?.tongDiem,
            type: EKieuDuLieu.NUMBER,
            name: 'tongDiem',
          },
        ]
      : []),
    {
      label: 'Cơ quan/đơn vị công tác',
      required: true,
      value: dataInit?.donVi,
      textarea: true,
      type: EKieuDuLieu.TEXT,
      name: 'donVi',
    },
    {
      label: translate('slink:Phone_number'),
      value: dataInit?.soDienThoai,
      type: EKieuDuLieu.NUMBER,
      name: 'soDienThoai',
    },
    {
      label: 'Email',
      value: dataInit?.email,
      type: EKieuDuLieu.TEXT,
      name: 'email',
    },
    {
      label: 'Học hàm',
      value: dataInit?.hocHam,
      type: EKieuDuLieu.DANHMUC,
      data: Object.values(EHocHam),
      name: 'hocHam',
    },
    {
      value: dataInit?.hocVi,
      label: 'Học vị',
      type: EKieuDuLieu.DANHMUC,
      data: Object.values(EHocVi),
      name: 'hocVi',
    },
  ];

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        childrenRight={
          <ChildrenR
            indexItem={indexItem}
            onPress={() => {
              delItem(indexItem ?? 0);

              goBack();
            }}
          />
        }
        title={
          indexItem !== undefined
            ? translate('slink:Edit')
            : translate('slink:Add')
        }
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        {formThanhVien?.map((item, index) => (
          <ViewRender
            key={index}
            unregister={unregister}
            setValue={setValue}
            cauHinh={item}
            errors={errors}
            control={control}
            formValue={watchedValues}
          />
        ))}
        <BaseButtonNB
          width={WIDTH(140)}
          title={
            indexItem !== undefined
              ? translate('slink:Save')
              : translate('slink:Add')
          }
          onPress={handleSubmit(onSubmit)}
        />
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default AddMemberNCKH;
const ChildrenR = ({
  onPress,
  indexItem,
}: {
  onPress: () => void;
  indexItem: number | undefined;
}) => {
  if (indexItem !== undefined) {
    return (
      <Text color={R.colors.white} onPress={onPress}>
        Xoá
      </Text>
    );
  }

  return null;
};

const ViewRender = (props: {
  cauHinh: any;
  control?: Control<FieldValues, any> | undefined;
  formValue?: any;
  unregister?: any;
  errors?: any;
  setValue?: any;
}) => {
  const { cauHinh, unregister, formValue, errors, control, setValue } = props;

  return (
    <Controller
      name={cauHinh.name}
      control={control}
      rules={{
        validate: (value: any) => {
          if (cauHinh?.required) {
            if (
              cauHinh?.type === EKieuDuLieu.CAN_BO &&
              formValue?.hoVaTen !== undefined
            ) {
              return true;
            }

            if (
              value === undefined || //undefined
              value === '' || // Chuỗi rỗng
              (typeof value === 'object' && Object.keys(value).length === 0) || // Đối tượng rỗng
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
            <FormRender
              setValue={setValue}
              error={errors?.[cauHinh?.name]?.message}
              formValue={formValue}
              unregister={unregister}
              onChange={field?.onChange}
              cauHinh={cauHinh}
            />
          </Box>
        );
      }}
    />
  );
};

const FormRender = (props: {
  cauHinh: any;
  onChange: (e: any) => void;
  formValue?: any;
  unregister?: any;
  setValue?: any;
  error?: string;
}) => {
  const { cauHinh, onChange, formValue, setValue, error, unregister } = props;

  const defaultValue = formValue?.[cauHinh?.name] || '';

  switch (cauHinh?.type) {
    case EKieuDuLieu.MULTI_CHOICES:
      return (
        <MultiChoicesNB
          data={cauHinh?.data?.map((item: string) => {
            return { label: item, value: item };
          })}
          onChangeValue={onChange}
          required={cauHinh?.required}
          defaultValue={defaultValue}
          label={cauHinh?.label}
          error={error}
        />
      );
    case EKieuDuLieu.DANHMUC:
      return (
        <SingleSelect
          data={cauHinh?.data?.map((item: string) => {
            return { label: item, value: item };
          })}
          onChangeValue={value => {
            onChange(value);

            cauHinh?.name === 'loai' && unregister(['hoVaTen', 'nhanSu']);
          }}
          required={cauHinh?.required}
          defaultValue={defaultValue}
          label={cauHinh?.label}
          error={error}
          placeholder={cauHinh?.label}
        />
      );
    case EKieuDuLieu.TEXT:
    case EKieuDuLieu.NUMBER:
      return (
        <InputNB
          defaultValue={defaultValue}
          placeholder={cauHinh?.label}
          textArea={cauHinh?.textarea}
          error={error}
          required={cauHinh?.required}
          label={cauHinh?.label}
          onChangeValue={onChange}
          type={cauHinh?.type}
        />
      );
    case EKieuDuLieu.CAN_BO:
      return (
        <TCNSCanBo
          required={cauHinh?.required}
          defaultValue={formValue?.hoVaTen}
          error={error}
          label={cauHinh?.label}
          onChange={(value: any) => {
            onChange(value);

            setValue('email', value?.email || '');

            setValue('donVi', value?.donViChinh?.ten || '');

            setValue('soDienThoai', value?.sdtCaNhan || '');

            setValue(
              'hocHam',

              value?.danhSachHocHam?.[0]?.danhHieu || value?.hocHam,
            );

            setValue('hocVi', value?.hocVi || value?.chatLuongNhanSu);
          }}
        />
      );

    default:
      return <></>;
  }
};
