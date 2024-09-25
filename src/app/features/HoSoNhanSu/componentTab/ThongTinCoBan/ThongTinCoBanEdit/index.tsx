/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';

import { HEIGHT, WIDTH } from '@common';
import TextLabelTCNS from '@components/BoxHSNS/TextLabelTCNS';
import DVHCForm from '@components/QuyTrinhDong/component/DHVCForm';
import SingleSelectForm from '@components/QuyTrinhDong/component/SingleSelect/SingleSelectForm';
import LoadingComponent from '@libcomponents/loading/loading-component';
import {
  getDanToc,
  getQuocGia,
  getTinhTrangHonNhan,
  getTonGiao,
} from '@networking/user';
import { infomationUserConfig } from '@redux-selector/infoUserTCNS';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

const ThongTinCoBanEdit = (props: any) => {
  const { control, errors, setValue } = props;

  const { infoUserTCNS } = useSelector(infomationUserConfig);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    initValue();
  }, [infoUserTCNS]);

  const initValue = async () => {
    setValue('tonGiaoId', infoUserTCNS?.tonGiaoId);

    setValue('quocTichId', infoUserTCNS?.quocTichId);

    setValue('maTonGiao', infoUserTCNS?.maTonGiao);

    setValue('tinhTrangHonNhanId', infoUserTCNS?.tinhTrangHonNhanId);
  };

  const [listQT, setlistQT] = useState([]);

  const [listTG, setlistTG] = useState([]);

  const [listDT, setlistDT] = useState([]);

  const [listHN, setlistHN] = useState([]);

  const [loading, setloading] = useState(false);

  const getData = async () => {
    // Quốc tịch
    setloading(true);

    const responseQuocTich: any = await getQuocGia();

    const dataQT =
      responseQuocTich?.data?.data.map((item: any) => {
        return {
          label: item?.tenQuocTich ?? '',
          value: item?._id,
        };
      }) ?? [];

    setlistQT(dataQT);

    // Dân tộc
    const responseDanToc: any = await getDanToc();

    const dataDT =
      responseDanToc?.data?.data?.map((item: any) => {
        return { label: item?.tenDanToc, value: item?._id };
      }) ?? [];

    setlistDT(dataDT);

    // Tôn giáo
    const responseTonGiao: any = await getTonGiao();

    const dataTG =
      responseTonGiao?.data?.data.map((item: any) => {
        return {
          label: item?.tenTonGiao,
          value: item?._id,
        };
      }) ?? [];

    setlistTG(dataTG);

    // Hôn nhân
    const responseHonNhan = await getTinhTrangHonNhan();

    const dataHN =
      responseHonNhan?.data?.data.map((item: any) => {
        return {
          label: item?.ten ?? '',
          value: item?._id ?? '',
        };
      }) ?? [];

    setlistHN(dataHN);

    setloading(false);
  };

  return (
    <>
      <KeyboardAwareScrollView
        key={0}
        contentContainerStyle={[styles.contentBox]}>
        <ThongTinCoBanTCNS
          errors={errors}
          control={control}
          defaultData={infoUserTCNS}
          listQT={listQT}
          listDT={listDT}
          listHN={listHN}
          listTG={listTG}
        />
      </KeyboardAwareScrollView>
      <LoadingComponent loading={loading} />
    </>
  );
};

export default ThongTinCoBanEdit;

const ThongTinCoBanTCNS = ({
  control,
  errors,
  defaultData,
  listHN,
  listDT,
  listTG,
  listQT,
}: any) => {
  const defaultValueNoiSinh = {
    maTinh: defaultData?.noiSinhThanhPhoMa || '',
    tenTinh: defaultData?.noiSinhThanhPhoTen || '',
    maQuanHuyen: defaultData?.noiSinhQuanMa || '',
    tenQuanHuyen: defaultData?.noiSinhQuanTen || '',
    maPhuongXa: defaultData?.noiSinhXaMa || '',
    tenPhuongXa: defaultData?.noiSinhXaTen || '',
  };

  const defaultValueQueQuan = {
    maTinh: defaultData?.queQuanThanhPhoMa || '',
    tenTinh: defaultData?.queQuanThanhPhoTen || '',
    maQuanHuyen: defaultData?.queQuanQuanMa || '',
    tenQuanHuyen: defaultData?.queQuanQuanTen || '',
    maPhuongXa: defaultData?.queQuanXaMa || '',
    tenPhuongXa: defaultData?.queQuanXaTen || '',
  };

  const defaultValueHKTT = {
    maTinh: defaultData?.hoKhauThanhPhoMa || '',
    tenTinh: defaultData?.hoKhauThanhPhoTen || '',
    maQuanHuyen: defaultData?.hoKhauQuanMa || '',
    tenQuanHuyen: defaultData?.hoKhauQuanTen || '',
    maPhuongXa: defaultData?.hoKhauXaMa || '',
    tenPhuongXa: defaultData?.hoKhauXaTen || '',
    soNhaTenDuong: defaultData?.hoKhauSoNha || '',
  };

  const defaultValueNoiOHienNay = {
    maTinh: defaultData?.noiOThanhPhoMa || '',
    tenTinh: defaultData?.noiOThanhPhoTen || '',
    maQuanHuyen: defaultData?.noiOQuanMa || '',
    tenQuanHuyen: defaultData?.noiOQuanTen || '',
    maPhuongXa: defaultData?.noiOXaMa || '',
    tenPhuongXa: defaultData?.noiOXaTen || '',
    soNhaTenDuong: defaultData?.noiOSoNha || '',
  };

  return (
    <Box width={WIDTH(351)} alignSelf="center">
      <TextLabelTCNS label={translate('hoSoNhanSu:noiSinh')} />
      <DVHCForm
        control={control}
        error={errors?.dvhc?.message}
        capDonViHanhChinh={3}
        name={'noiSinh'}
        defaultValue={defaultValueNoiSinh}
      />
      <TextLabelTCNS label={translate('hoSoNhanSu:queQuan')} />
      <DVHCForm
        control={control}
        capDonViHanhChinh={3}
        error={errors?.dvhc?.message}
        name={'queQuan'}
        defaultValue={defaultValueQueQuan}
      />
      <TextLabelTCNS label={translate('hoSoNhanSu:hoKhau')} />
      <DVHCForm
        control={control}
        error={errors?.dvhc?.message}
        name={'hoKhau'}
        defaultValue={defaultValueHKTT}
      />
      <TextLabelTCNS label={translate('hoSoNhanSu:noiOHienNay')} />
      <DVHCForm
        control={control}
        error={errors?.dvhc?.message}
        name={'noiOHienNay'}
        defaultValue={defaultValueNoiOHienNay}
      />
      <TextLabelTCNS label={translate('hoSoNhanSu:thanhPhanBanThan')} />
      <SingleSelectForm
        label={translate('hoSoNhanSu:quocTichId')}
        data={listQT}
        defaultValue={defaultData?.quocTichId || undefined}
        name={'quocTichId'}
        control={control}
        error={errors?.quocTichId?.message}
      />
      <SingleSelectForm
        label={translate('hoSoNhanSu:tonGiaoId')}
        data={listDT}
        defaultValue={defaultData?.danTocId || undefined}
        name={'tonGiaoId'}
        control={control}
        error={errors?.tonGiaoId?.message}
      />
      <SingleSelectForm
        label={translate('hoSoNhanSu:maTonGiao')}
        data={listTG}
        defaultValue={defaultData?.tonGiaoId || undefined}
        name={'maTonGiao'}
        control={control}
        error={errors?.maTonGiao?.message}
      />
      <SingleSelectForm
        label={translate('hoSoNhanSu:tinhTrangHonNhanId')}
        data={listHN}
        defaultValue={defaultData?.tinhTrangHonNhanId || undefined}
        name={'tinhTrangHonNhanId'}
        control={control}
        error={errors?.tinhTrangHonNhanId?.message}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  contentBox: { paddingBottom: HEIGHT(30) },
});
