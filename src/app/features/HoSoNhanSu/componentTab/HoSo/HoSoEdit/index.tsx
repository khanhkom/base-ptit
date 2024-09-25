/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Image, Platform, TouchableOpacity } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';

import R from '@assets/R';
import { dispatch, openGallery, showToastError } from '@common';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { InfoUserTCNSProps } from '@model/infoUserTCNS';
import {
  getDanToc,
  getQuocGia,
  getTonGiao,
  updateChinhSuaNS,
  uploadDocument,
} from '@networking/user';
import { infomationUserConfig } from '@redux-selector/infoUserTCNS';
import { infoUserTCNSActions } from '@redux-slice';
import { translate } from '@utils/i18n/translate';

import InfoUserTCNS from './InfoUserTCNS';
import styles from './styles';

const HoSoEdit = ({
  infoUser,
  watchValues,
  control,
  errors,
  setValue,
}: {
  infoUser: InfoUserTCNSProps;
  watchValues: any;
  control: any;
  errors: any;
  setValue: any;
}) => {
  const { infoUserTCNS } = useSelector(infomationUserConfig);

  const [listQT, setlistQT] = useState([]);

  const [listTG, setlistTG] = useState([]);

  const [listDT, setlistDT] = useState([]);

  const [loading, setloading] = useState(false);

  useEffect(() => {
    initValue();
  }, [infoUserTCNS]);

  useEffect(() => {
    getData();
  }, []);

  const initValue = async () => {
    setValue('maCanBo', infoUserTCNS?.maCanBo);

    setValue('donViChinhId', infoUserTCNS?.donViChinhId);

    setValue('chucVuChinhId', infoUserTCNS?.chucVuChinhId);

    setValue('hoDem', infoUserTCNS?.hoDem);

    setValue('ten', infoUserTCNS?.ten);

    setValue('tenGoiKhac', infoUserTCNS?.tenGoiKhac);

    setValue('ngaySinh', infoUserTCNS?.ngaySinh);

    setValue('gioiTinh', infoUserTCNS?.gioiTinh);

    setValue('hocHam', infoUserTCNS?.hocHam);

    setValue('chatLuongNhanSu', infoUserTCNS?.chatLuongNhanSu);

    setValue('trinhDoDaoTaoId', infoUserTCNS?.trinhDoDaoTaoId);

    setValue('emailCanBo', infoUserTCNS?.emailCanBo);

    setValue('email', infoUserTCNS?.email);

    setValue('sdtCaNhan', infoUserTCNS?.sdtCaNhan);

    setValue('trangThai', infoUserTCNS?.trangThai);

    setValue('cccdCMND', infoUserTCNS?.cccdCMND);

    setValue('ngayCap', infoUserTCNS?.ngayCap);

    setValue('noiCap', infoUserTCNS?.noiCap);

    setValue('loaiCanBoGiangVien', infoUserTCNS?.loaiCanBoGiangVien);

    setValue('soHieuVienChuc', infoUserTCNS?.soHieuVienChuc);

    setValue('tinhNghiPhep', infoUserTCNS?.tinhNghiPhep);

    setValue('ngayTuyenDung', infoUserTCNS?.ngayTuyenDung);

    setValue('soSoBHXH', infoUserTCNS?.soSoBHXH);

    setValue('isNganSach', infoUserTCNS?.isNganSach);

    setValue(
      'isThuocDienKeKhaiHangNam',
      infoUserTCNS?.isThuocDienKeKhaiHangNam,
    );
  };

  const onHandleSave = async (urlAnh: string) => {
    const bodyUpdate = {
      ...infoUser,
      urlAnhDaiDien: urlAnh || null,
    };

    const res = await updateChinhSuaNS(infoUser?._id, bodyUpdate);

    if (res?.status) {
      dispatch(
        infoUserTCNSActions.setInfoUserTCNS({ infoUserTCNS: bodyUpdate }),
      );
    }
  };

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

    setloading(false);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <AnhDaiDien
        onChangeImg={(e: string) => onHandleSave(e)}
        url={infoUserTCNS?.urlAnhDaiDien}
      />
      <InfoUserTCNS
        errors={errors}
        control={control}
        watchValues={watchValues}
        listQT={listQT}
        listDT={listDT}
        listTG={listTG}
      />
      <LoadingComponent loading={loading} />
    </KeyboardAwareScrollView>
  );
};

export default HoSoEdit;

const AnhDaiDien = ({
  url,
  gioiTinh,
  onChangeImg,
}: {
  url?: string;
  gioiTinh?: 'Nam' | 'Nữ';
  onChangeImg?: (e: string) => void;
}) => {
  const [urlAnh, seturlAnh] = useState('');

  const [loading, setloading] = useState(false);

  useEffect(() => {
    !!url && seturlAnh(url);
  }, [url]);

  const sourceImg = urlAnh
    ? { uri: urlAnh }
    : gioiTinh === 'Nam'
    ? R.images.giangVienNam
    : R.images.giangVienNu;

  const updateAnh = async (value: any) => {
    try {
      setloading(true);

      const body = {
        uri:
          Platform.OS === 'android'
            ? value?.url
            : value?.url?.replace('file://', ''),
        type: value?.mimetype,
        name: value?.filename,
      };

      const avatarUrl: any = await uploadDocument([body]);

      setloading(false);

      if (avatarUrl?.[0]?.url) {
        const urlADD = avatarUrl?.[0]?.url ?? '';

        seturlAnh(urlADD);

        onChangeImg?.(urlADD ?? '');
      } else {
        showToastError(translate('slink:Da_co_loi_xay_ra'));
      }
    } catch (error) {}
  };

  return (
    <TouchableOpacity onPress={() => openGallery(updateAnh)} style={styles.img}>
      <LoadingComponent size="small" loading={loading} />
      <Image source={sourceImg} style={styles.img} resizeMode="contain" />
    </TouchableOpacity>
  );
};
