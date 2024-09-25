/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { Controller, useController } from 'react-hook-form';

import { DVMC_TYPE } from '@common';

import ItemInput from './form-controller';
import { validate } from './ruleDynamicForm';
import { styles } from './styles';
import { translate } from '@utils/i18n/translate';

const DynamicForm: FunctionComponent<any> = (props: any) => {
  const {
    style,
    formInput,
    title,
    disabled,
    control,
    onChangeValue,
    show,
    unregister,
    errors,
    formContainer,
  } = props;

  const [dataInfor, setDataInfor] = useState<any>([]);

  const [listTG, setlistTG] = useState<any[]>();

  const [pthucKhenThuong, setpthucKhenThuong] = useState('');

  const getListTG = (item: any[]) => {
    setlistTG(item);
  };

  const onChange = (value: string, id: string) => {
    if (id === 'loaiKhenThuong') {
      setpthucKhenThuong(value);
    }
  };

  useEffect(() => {
    setDataInfor(formInput);

    return () => {
      formInput?.forEach((element: any) => {
        unregister?.(element?._id);
      });
    };
  }, [formInput, show]);

  if (!dataInfor?.length) {
    return <View />;
  }

  return (
    <View style={[styles.container, style]}>
      {title && <Text style={styles.textTitle}>{title}</Text>}
      <View style={[styles.subContainer, formContainer]}>
        {dataInfor?.map((itemInfo: any) => {
          return (
            <ItemInputAndInfo
              control={control}
              errors={errors}
              listTG={listTG}
              idPhuongThucKhenThuong={pthucKhenThuong}
              onChangeValue={(value: string, id: string) => {
                onChangeValue?.(value, id);

                onChange?.(value, id);
              }}
              unregister={unregister}
              item={itemInfo}
              getListTG={getListTG}
              rules={{
                validate: {
                  required: (value: any) => validate(value, itemInfo),
                },
              }}
              disabled={disabled}
              {...props}
            />
          );
        })}
        {/* </View> */}
      </View>
    </View>
  );
};

export default DynamicForm;
const ItemInputAndInfo = ({
  item,
  disabled,
  control,
  errors,
  unregister,
  rules,
  onChangeValue,
  listTG,
  getListTG,
  idPhuongThucKhenThuong,
  ...props
}: any) => {
  const valueInfor = item?.value;

  const country = useController({
    name: item?._id,
    control,
    defaultValue: '',
  });

  const {
    field: { onChange },
  } = country;

  if (item.type !== DVMC_TYPE.TEXT_BLOCK) {
    const pickerData =
      item?.dataSource?.map((source: any) => {
        return {
          label: source?.label ?? '',
          value: source?.value ?? source?.label ?? '',
        };
      }) ?? [];

    const dataSourceElement =
      item?.dataSource?.map((source: any) => source?.relatedElement ?? []) ??
      [];

    return (
      <Controller
        key={item._id}
        name={item._id}
        control={control}
        defaultValue={item.value}
        rules={rules}
        render={({ field }) => {
          return (
            <ItemInput
              idPhuongThucKhenThuong={idPhuongThucKhenThuong}
              onChange={(value: any) => {
                item?.type === DVMC_TYPE.TABLE_NHAN_SU && getListTG(value);

                onChangeValue?.(value, item?._id);

                onChange(value);
              }}
              unregister={unregister}
              ref={field?.ref}
              relatedElement={
                item?.type === DVMC_TYPE.TABLE_CHUONG_SACH
                  ? formChuongSach(listTG)
                  : item?.relatedElement ?? []
              }
              onBlur={field?.onBlur}
              placeholder={disabled ? '' : translate('slink:Enter_here')}
              pickerData={pickerData}
              dataSourceElement={dataSourceElement}
              disabled={disabled || item?.disabled}
              defaultValue={valueInfor}
              valueChuongSach={valueTableCS(
                listTG,
                item?.value ?? [],
                item?.type,
              )}
              itemData={item}
              control={control}
              errors={errors}
              {...props}
            />
          );
        }}
      />
    );
  } else {
    return (
      <View style={styles.viewTextBlock}>
        <Text style={styles.textBlock}>{item?.label ?? ''}</Text>
      </View>
    );
  }
};

const valueTableCS = (listTG: any[], def: any[], type: string) => {
  if (type === DVMC_TYPE.TABLE_CHUONG_SACH) {
    return (
      def?.map(item => {
        return formChuongSach(listTG, item);
      }) ?? []
    );
  }

  return null;
};

const formChuongSach = (listTG: any[], defaultValue?: any) => {
  return [
    {
      type: 'TEXT_INPUT',
      label: 'Tên chương',
      isRequired: true,
      value: defaultValue?.tenChuong ?? '',
      relatedElement: [],
      _id: 'tenChuong',
    },
    {
      type: 'DROP_LIST_SINGLE',
      value: defaultValue?.loaiChuongSach ?? '',
      label: translate('slink:Loai'),
      dataSource: [
        {
          label: 'Viết mới',
          relatedElement: [],
        },
        {
          label: 'Chỉnh sửa bổ sung',
          relatedElement: [],
        },
      ],
      isRequired: true,
      relatedElement: [],
      _id: 'loai',
    },
    {
      value: defaultValue?.isXuatBanQuocTe,
      type: DVMC_TYPE.CHECK_BOX,
      label: 'Chương sách xuất bản quốc tế',
      _id: 'isXuatBanQuocTe',
    },
    {
      type: DVMC_TYPE.DROP_LIST_MULTI,
      value:
        defaultValue?.danhSachDongTacGia?.map(
          (item: { _id: string }) => item?._id,
        ) ?? [],
      label: 'Danh sách tác giả',
      isRequired: true,
      dataSource: listTG?.map(item => {
        return {
          label: `${item?.nguoiKhaiBao?.hoVaTen} (${item?.vaiTroKhcn})`,
          value: item?.nguoiKhaiBao?._id ?? '',
        };
      }),
      relatedElement: [],
      _id: 'dsTacGia',
    },
  ];
};
