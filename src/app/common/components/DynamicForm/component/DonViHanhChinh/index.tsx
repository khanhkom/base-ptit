/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-catch-shadow */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';

import { CAP_DON_VI_HANH_CHINH } from '@common';
import { HelperText } from '@libcomponents/helper-text';
import { getPhuongXa, getQuanHuyen, getTinhTP } from '@networking/user';

import DropdownDVHC from './DropDownDonViHanhChinh';
import { styles } from './styles';

import { TextInputV2 } from '../InputV2';
import { translate } from '@utils/i18n/translate';

const DonViHanhChinh = (props: any) => {
  const {
    defaultValue,
    error,
    capDonViHanhChinh,
    isRequired,
    disabled,
    onChangeValue,
    label,
    showInput,
  } = props;

  useEffect(() => {
    setTimeout(() => {
      if (defaultValue) {
        onChangeValue?.(defaultValue);
      }
    }, 500);
  }, [defaultValue]);

  const donViHanhChinh = useRef({
    maTinh: defaultValue?.maTinh ?? '',
    tenTinh: defaultValue?.tenTinh ?? '',
    maQuanHuyen: defaultValue?.maQuanHuyen ?? '',
    tenQuanHuyen: defaultValue?.tenQuanHuyen ?? '',
    maPhuongXa: defaultValue?.maPhuongXa ?? '',
    tenPhuongXa: defaultValue?.tenPhuongXa ?? '',
  });

  const [listTP, setlistTP] = useState([]);

  const [listQH, setlistQH] = useState([]);

  const [listPX, setlistPX] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res: any = await getTinhTP();

      const listData =
        res?.data?.data?.map((item: any) => {
          return {
            label: item?.tenDonVi,
            value: item?.ma,
          };
        }) ?? [];

      setlistTP(listData);
    } catch (error) {}
  };

  const onChangeTP = async (value: any) => {
    try {
      const resQH: any = await getQuanHuyen(value);

      const objTinhTP: any = listTP?.find((e: any) => e?.value === value);

      const listData =
        resQH?.data?.data?.map((item: any) => {
          return {
            label: item?.tenDonVi,
            value: item?.ma,
          };
        }) ?? [];

      const newDVHC = {
        maTinh: value,
        tenTinh: objTinhTP?.label,
        maQuanHuyen: '',
        tenQuanHuyen: '',
        maPhuongXa: '',
        tenPhuongXa: '',
      };

      donViHanhChinh.current = newDVHC;

      onChangeValue(donViHanhChinh.current);

      setlistQH(listData);

      // setlistPX([]);
    } catch (error) {}
  };

  const onChangeQH = async (value: string) => {
    try {
      const resPX: any = await getPhuongXa(value);

      const objQH: any = listQH?.find((e: any) => e?.value === value);

      const listData =
        resPX?.data?.data?.map((item: any) => {
          return {
            label: item?.tenDonVi,
            value: item?.ma,
          };
        }) ?? [];

      setlistPX(listData);

      const newDVHC = {
        ...donViHanhChinh.current,
        maQuanHuyen: value,
        tenQuanHuyen: objQH?.label,
        maPhuongXa: '',
        tenPhuongXa: '',
      };

      donViHanhChinh.current = newDVHC;

      onChangeValue(donViHanhChinh.current);
    } catch (error) {}
  };

  const onChangePX = async (value: string) => {
    try {
      const objPX: any = listPX?.find((e: any) => e?.value === value);

      const newDVHC = {
        ...donViHanhChinh.current,
        maPhuongXa: value,
        tenPhuongXa: objPX?.label,
      };

      donViHanhChinh.current = newDVHC;

      onChangeValue(donViHanhChinh.current);
    } catch (error) {}
  };

  const onChangeDCCT = (value: string) => {
    const newDVHC = {
      ...donViHanhChinh.current,
      soNhaTenDuong: value,
    };

    donViHanhChinh.current = newDVHC;

    onChangeValue(donViHanhChinh.current);
  };

  return (
    <View style={styles.viewContainer}>
      {label && (
        <Text style={styles.label}>
          {`${label ?? ''}`}
          {isRequired && <Text style={styles.dot}>{' * '}</Text>}
        </Text>
      )}
      <DropdownDVHC
        data={listTP}
        defaultValue={defaultValue?.maTinh}
        placeHolder={'Chọn Tỉnh/TP'}
        onChange={onChangeTP}
        marginBottom={4}
        disabled={listTP?.length === 0 || disabled}
        hidden={capDonViHanhChinh < CAP_DON_VI_HANH_CHINH.TINH}
      />
      <DropdownDVHC
        data={listQH}
        marginBottom={4}
        defaultValue={defaultValue?.maQuanHuyen}
        placeHolder={'Chọn Quận/Huyện'}
        onChange={onChangeQH}
        disabled={listQH?.length === 0 || disabled}
        hidden={capDonViHanhChinh < CAP_DON_VI_HANH_CHINH.HUYEN}
      />
      <DropdownDVHC
        data={listPX}
        placeHolder={'Chọn Phường/Xã'}
        defaultValue={defaultValue?.maPhuongXa}
        marginBottom={4}
        onChange={onChangePX}
        disabled={listPX?.length === 0 || disabled}
        hidden={capDonViHanhChinh < CAP_DON_VI_HANH_CHINH.XA}
      />
      <InputHanhChinh
        hidden
        editable={!disabled}
        defaultValue={defaultValue?.soNhaTenDuong ?? ''}
        onChange={onChangeDCCT}
        showInput={
          capDonViHanhChinh >= CAP_DON_VI_HANH_CHINH.SO_NHA || showInput
        }
      />
      <HelperText
        visible={error !== undefined}
        msg={error ?? ''}
        type={'error'}
      />
    </View>
  );
};

export default DonViHanhChinh;
const InputHanhChinh = (props: any) => {
  const { onChange, showInput, ...rest } = props;

  if (showInput) {
    return (
      <TextInputV2
        styleView={styles.viewInput}
        onChangeText={onChange}
        placeholder={translate('hoSoNhanSu:diaChiCuThe')}
        {...rest}
      />
    );
  } else {
    return <></>;
  }
};
