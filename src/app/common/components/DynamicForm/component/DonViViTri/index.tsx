/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';

import { HelperText } from '@libcomponents/helper-text';
import { donViNhanSu, donViViTri } from '@networking/user';
import { translate } from '@utils/i18n/translate';

import DropdownV2 from '../DropDownV2';

const DonViViTriChucDanh = (props: any) => {
  const { defaultValue, required, error, disabled, onChange } = props;

  console.log('error đây', error);

  const [listDonVi, setlistDonVi] = useState([]);

  const [listChucDanh, setlistChucDanh] = useState([]);

  const [donViIdCur, setdonViIdCur] = useState(defaultValue?.donViId);

  const bodySubmit = useRef({
    donViId: '',
    donViViTriId: '',
  });

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (defaultValue) {
      onChange?.(defaultValue);
    }
  }, [defaultValue]);

  const getData = async () => {
    const response = await donViNhanSu();

    setlistDonVi(
      response?.data?.data.map(
        (item: { ten: string; maDonVi: string; _id: string }) => {
          const labelDonVi = `${item?.ten ?? '--'} (${item?.maDonVi ?? '--'})`;

          return {
            label: labelDonVi,
            value: item?._id ?? '',
          };
        },
      ) ?? [],
    );

    const responseDonViViTri = await donViViTri();

    setlistChucDanh(responseDonViViTri?.data?.data ?? []);
  };

  const onChangeDonVi = (value: string) => {
    setdonViIdCur(value);

    bodySubmit.current = { donViId: value, donViViTriId: '' };

    onChange?.(bodySubmit.current);
  };

  const onChangeChucDanh = (value: string) => {
    bodySubmit.current = { ...bodySubmit.current, donViViTriId: value };

    onChange?.(bodySubmit.current);
  };

  const dsChucDanh =
    listChucDanh
      ?.filter((item: { donViId: string }) => item?.donViId === donViIdCur)
      ?.map((item: { tenChucVu: string; _id: string }) => {
        const labelChucDanh = `${item?.tenChucVu ?? '--'}`;

        return {
          label: labelChucDanh,
          value: item?._id ?? '',
        };
      }) ?? [];

  return (
    <>
      <DropdownV2
        required={required}
        label={'Đơn vị - Vị trí, việc làm'}
        placeHolder={
          listDonVi?.length === 0 ? translate('slink:Null_t') : 'Đơn vị'
        }
        defaultValue={defaultValue?.donViId}
        disabled={disabled}
        onChange={onChangeDonVi}
        data={listDonVi}
        style={{ paddingBottom: 0 }}
      />
      <DropdownV2
        style={{ paddingVertical: 0 }}
        defaultValue={defaultValue?.donViViTriId}
        placeHolder={
          dsChucDanh?.length === 0
            ? translate('slink:Null_t')
            : 'Vị trí, việc làm'
        }
        disabled={disabled}
        onChange={onChangeChucDanh}
        data={dsChucDanh}
      />
      <HelperText
        visible={error !== undefined}
        msg={error ?? ''}
        type={'error'}
      />
    </>
  );
};

export default DonViViTriChucDanh;
