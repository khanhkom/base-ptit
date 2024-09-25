/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';

import { WIDTH } from '@common';
import TextLabelTCNS from '@components/BoxHSNS/TextLabelTCNS';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import SingleSelectForm from '@components/QuyTrinhDong/component/SingleSelect/SingleSelectForm';
import DatePickerForm from '@components/QuyTrinhDong/component/Time/DatePickerForm';
import DienBienCongTac from '@features/HoSoNhanSu/Table/TuyenDung/QuaTrinhCongTac';
import ViTriChucDanhQuyHoach from '@features/HoSoNhanSu/Table/TuyenDung/ViTriChucDanhQuyHoach';
import ViTriTuyenDung from '@features/HoSoNhanSu/Table/TuyenDung/ViTriTuyenDung';
import LoadingComponent from '@libcomponents/loading/loading-component';
import {
  donViNhanSu,
  donViViTri,
  dotTuyenDung,
  hinhThucTuyenDung,
} from '@networking/user';
import { infomationUserConfig } from '@redux-selector/infoUserTCNS';
import { translate } from '@utils/i18n/translate';
import { Box, Checkbox, Text } from 'native-base';

import styles from './styles';

const ThongTinTuyenDungEdit = ({
  control,
  errors,
  setValue,
  watchValues,
}: {
  control: any;
  errors: any;
  setValue: any;
  watchValues: any;
}) => {
  const { infoUserTCNS } = useSelector(infomationUserConfig);

  useEffect(() => {
    initValue();
  }, [infoUserTCNS]);

  useEffect(() => {
    getData();
  }, []);

  const [listNS, setlistNS] = useState([]);

  const [listDVVT, setlistDVVT] = useState([]);

  const [listHTTD, setlistHTTD] = useState([]);

  const [listDTD, setlistDTD] = useState([]);

  const [loading, setloading] = useState(false);

  useEffect(() => {
    getViTri();
  }, [watchValues?.donViTuyenDungId]);

  const getViTri = async () => {
    //
    const params = {
      condition: { donViId: watchValues?.donViTuyenDungId },
    };

    const responseDVVT = await donViViTri(params);

    setlistDVVT(
      responseDVVT?.data?.data.map((item: any) => {
        const label = `${item?.tenChucVu ?? '--'}`;

        return {
          label,
          value: item?._id ?? '',
        };
      }) ?? [],
    );
  };

  const getData = async () => {
    setloading(true);

    const responseNS = await donViNhanSu();

    setlistNS(
      responseNS?.data?.data.map((item: any) => {
        const label = `${item?.ten ?? '--'} (${item?.maDonVi ?? '--'})`;

        return {
          label,
          value: item?._id ?? '',
        };
      }) ?? [],
    );

    //
    const responseHTTD = await hinhThucTuyenDung();

    setlistHTTD(
      responseHTTD?.data?.data.map((item: any) => {
        return {
          label: item?.ten ?? '',
          value: item?._id ?? '',
        };
      }) ?? [],
    );

    //
    const responseDTD = await dotTuyenDung();

    setlistDTD(
      responseDTD?.data?.data?.map((item: any) => {
        const label = `${item?.tenDotTuyenDung ?? '--'} (${item?.nam ?? '--'})`;

        return {
          label,
          value: item?._id ?? '',
        };
      }) ?? [],
    );

    setloading(false);
  };

  const initValue = async () => {
    setValue('ngayTuyenDung', infoUserTCNS?.ngayTuyenDung);

    setValue(
      'ngayBatDauLamViecTaiTruong',
      infoUserTCNS?.ngayBatDauLamViecTaiTruong,
    );

    setValue('donViTuyenDungId', infoUserTCNS?.donViTuyenDungId);

    setValue('donViViTriTuyenDungId', infoUserTCNS?.donViViTriTuyenDungId);

    setValue('hinhThucTuyenDungId', infoUserTCNS?.hinhThucTuyenDungId);

    setValue('dotTuyenDungId', infoUserTCNS?.dotTuyenDungId);

    setValue('soBaoDanh', infoUserTCNS?.soBaoDanh);

    setValue('ngayVaoNganh', infoUserTCNS?.ngayVaoNganh);
  };

  return (
    <>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <InfoUser
          setValue={setValue}
          listNS={listNS}
          listDVVT={listDVVT}
          listHTTD={listHTTD}
          listDTD={listDTD}
          infoUser={infoUserTCNS}
          errors={errors}
          control={control}
        />
        <ViTriTuyenDung visibleEdit infoUser={infoUserTCNS} />
        <ViTriChucDanhQuyHoach visibleEdit infoUser={infoUserTCNS} />
        <DienBienCongTac editVisible idUser={infoUserTCNS?._id} />
      </KeyboardAwareScrollView>
      <LoadingComponent loading={loading} />
    </>
  );
};

export default ThongTinTuyenDungEdit;
const InfoUser = (props: any) => {
  const {
    infoUser,
    errors,
    control,
    setValue,
    listDTD,
    listHTTD,
    listDVVT,
    listNS,
  } = props;

  const isIn =
    infoUser?.donViTuyenDungId === null && !!infoUser?.tenDonViTuyenDung;

  const [inAcademy, setinAcademy] = useState(!isIn);

  useEffect(() => {
    setValue('tuyenDungTrongHocVien', inAcademy);
  }, [inAcademy]);

  return (
    <Box width={WIDTH(351)} alignSelf="center">
      <TextLabelTCNS label={translate('hoSoNhanSu:ttTuyenDung')} />
      <DatePickerForm
        label={translate('hoSoNhanSu:ngayBatDauLamViecTaiTruong')}
        error={errors?.ngayTuyenDung?.message}
        mode="date"
        defaultValue={infoUser?.ngayTuyenDung}
        name={'ngayTuyenDung'}
        control={control}
      />
      <DatePickerForm
        label={translate('hoSoNhanSu:ngayBatDauTinhBHXH')}
        error={errors?.ngayBatDauLamViecTaiTruong?.message}
        mode="date"
        defaultValue={infoUser?.ngayBatDauLamViecTaiTruong}
        name={'ngayBatDauLamViecTaiTruong'}
        control={control}
      />
      <Checkbox
        my="2"
        isChecked={inAcademy}
        value={translate('hoSoNhanSu:donViTuyenDungHocVien')}
        onChange={() => {
          setinAcademy(!inAcademy);

          setValue('tuyenDungTrongHocVien', inAcademy);
        }}>
        <Text maxWidth={WIDTH(343)} fontSize={'xs'}>
          {translate('hoSoNhanSu:donViTuyenDungHocVien')}
        </Text>
      </Checkbox>
      {inAcademy ? (
        <>
          <SingleSelectForm
            label={translate('hoSoNhanSu:donViTuyenDungId')}
            data={listNS}
            defaultValue={infoUser?.donViTuyenDungId}
            name={'donViTuyenDungId'}
            control={control}
            error={errors?.donViTuyenDungId?.message}
          />
          <SingleSelectForm
            label={translate('hoSoNhanSu:donViViTriTuyenDungId')}
            data={listDVVT}
            defaultValue={infoUser?.donViViTriTuyenDungId}
            name={'donViViTriTuyenDungId'}
            control={control}
            error={errors?.donViViTriTuyenDungId?.message}
          />
        </>
      ) : (
        <>
          <InputNBForm
            label={translate('hoSoNhanSu:donViTuyenDungId')}
            name={'tenDonViTuyenDung'}
            error={errors?.tenDonViTuyenDung?.message}
            defaultValue={infoUser?.tenDonViTuyenDung}
            control={control}
          />
          <InputNBForm
            label={translate('hoSoNhanSu:donViViTriTuyenDungId')}
            name={'tenDonViViTriTuyenDung'}
            error={errors?.tenDonViViTriTuyenDung?.message}
            defaultValue={infoUser?.tenDonViViTriTuyenDung}
            control={control}
          />
        </>
      )}
      <SingleSelectForm
        label={translate('hoSoNhanSu:hinhThucTuyenDungId')}
        data={listHTTD}
        defaultValue={infoUser?.hinhThucTuyenDungId}
        name={'hinhThucTuyenDungId'}
        control={control}
        error={errors?.hinhThucTuyenDungId?.message}
      />
      <SingleSelectForm
        label={translate('hoSoNhanSu:dotTuyenDungId')}
        data={listDTD}
        defaultValue={infoUser?.dotTuyenDungId}
        name={'dotTuyenDungId'}
        control={control}
        error={errors?.dotTuyenDungId?.message}
      />
      <InputNBForm
        label={translate('hoSoNhanSu:soBaoDanh')}
        name={'soBaoDanh'}
        error={errors?.soBaoDanh?.message}
        defaultValue={infoUser?.soBaoDanh}
        control={control}
      />
      <DatePickerForm
        label={translate('hoSoNhanSu:ngayVaoNganh')}
        error={errors?.ngayVaoNganh?.message}
        mode="date"
        defaultValue={infoUser?.ngayVaoNganh}
        name={'ngayVaoNganh'}
        control={control}
      />
    </Box>
  );
};
