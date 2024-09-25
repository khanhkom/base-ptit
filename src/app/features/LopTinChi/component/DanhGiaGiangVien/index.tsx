/* eslint-disable no-inline-comments */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';

import { HEIGHT, LoaiKhaoSat, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import ChiTietBieuMauDanhGia from '@components/ChiTietBieuMauDanhGia';
import HeaderDetail from '@components/HeaderDetail';
import ItemTrong from '@components/Item/ItemTrong';
import ItemXacNhan from '@components/Item/ItemXacNhan';
import { showToast } from '@components/Toast';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { goBack } from '@navigation/navigation-service';
import {
  postKetQuaKhaoSatTietHoc,
  submitBieuMauKhaoSat,
} from '@networking/user';
import { submitDanhGiaGV } from '@networking/user/DanhGiaGiangVien';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
// import _ from 'lodash';
import moment from 'moment';
import { Box } from 'native-base';

import { ConvertKhaoSat } from './function';
import styles from './styles';
import { CauTraLoi, ChiTietBieuMauProps, ValuesProps } from './type';

const DanhGiaGiangVien = (props: ChiTietBieuMauProps) => {
  const { account } = useSelector(selectAppConfig);

  const data = props?.route?.params?.data;

  const giangVien = props?.route?.params?.giangVien; //Thông tin giảng viên của đánh giá giảng viên

  //Dữ liệu chung
  const dotDanhGia = props?.route?.params?.dot;

  const idKhaoSat = props?.route?.params?.idKhaoSat;

  const initKetQua = props?.route?.params?.initKetQua?.danhSachTraLoi;

  const disabled = props?.route?.params?.disabled;

  const refreshData = props?.route?.params?.refreshData;

  const idDot = props?.route?.params?.idDot;

  //Dữ liệu chung
  const isTietHoc = props?.route?.params?.isTietHoc;

  const hasEnd = props?.route?.params?.hasEnd;

  const [loading, setLoading] = React.useState(false);

  const checked = React.useRef(!data?.coCamKet);

  const isDGGV = data?.loai === LoaiKhaoSat?.DANH_GIA_GIANG_VIEN;

  const isKhaoSat = data?.loai === LoaiKhaoSat?.KHAO_SAT;

  const [needsExpensive, setNeedsExpensive] = useState(false);

  const onLoad = useCallback(() => {
    setNeedsExpensive(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      onLoad();
    }, 200);
  }, []);

  const onSendAnswer = async (danhSachTraLoi: CauTraLoi[]) => {
    try {
      setLoading(true);

      const infoUser = account?.isGiaoVien
        ? {
            gioiTinh: account?.gioiTinh || '',
            idDonVi: account?.donViChinhId || '',
            maDonVi: account?.donViChinh?.maDonVi || '',
            tenDonVi: account?.donViChinh?.ten || '',
            trangThaiLamViec: account?.trangThai || '',
            vaiTroNguoiKhaoSat: 'nhan_vien',
          }
        : {
            gioiTinh: account?.gioiTinh ?? '',
            trangThaiSinhVien: account?.trangThaiHoc ?? '',
            vaiTroNguoiKhaoSat: 'sinh_vien',
            danToc: account?.danToc ?? '',
          };

      const bodyKhaoSat = {
        danhSachTraLoi,
        idDot: idDot,
        idKhaoSat: idKhaoSat,
        ...(isKhaoSat && infoUser),
        ...(isDGGV && giangVien),
      };

      let res: any;
      if (isDGGV) {
        res = await submitDanhGiaGV(bodyKhaoSat);
      } else {
        res = await submitBieuMauKhaoSat(bodyKhaoSat);
      }

      setLoading(false);

      if (res?.status) {
        goBack();

        setTimeout(() => refreshData && refreshData(), 500);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onDanhGiaTietHoc = async (danhSachTraLoi: CauTraLoi[]) => {
    try {
      setLoading(true);

      const bodyKhaoSat = {
        danhSachTraLoi,
        idDot: idDot,
        idKhaoSat: idKhaoSat,
      };

      const body = {
        cauTraLoi: bodyKhaoSat,
        idTkb: dotDanhGia,
      };

      const res: any = await postKetQuaKhaoSatTietHoc(body);

      setLoading(false);

      if (res?.status) {
        goBack();

        setTimeout(() => refreshData && refreshData(), 500);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const methods = useForm();

  const handleData = async (dataSubmit: { [key: string]: ValuesProps }) => {
    const danhSachTraLoi: CauTraLoi[] = await ConvertKhaoSat(dataSubmit, data);

    if (!checked.current) {
      showToast({
        msg: translate('slink:Cam_ket', { noiDungCamKet: data?.noiDungCamKet }),
        interval: 4000,
        type: 'warning',
      });
    } else {
      if (isTietHoc) {
        onDanhGiaTietHoc(danhSachTraLoi);
      } else {
        onSendAnswer(danhSachTraLoi);
      }
    }
  };

  const moTa = translate('slink:Thoi_gian_DGGV', {
    giangVien: giangVien?.hoTenGiangVien || '',
    timeStart: moment(dotDanhGia?.thoiGianBatDau).format('DD/MM/YYYY'),
    timeEnd: moment(dotDanhGia?.thoiGianKetThuc).format('DD/MM/YYYY'),
  });

  const subTitle = isDGGV ? moTa : data?.moTa;

  const title = isTietHoc
    ? translate('slink:Danh_gia_buoi_hoc')
    : isDGGV
    ? translate('slink:Danh_gia_giang_vien')
    : translate('slink:Survey');

  if (!data?.danhSachKhoi?.length) {
    return (
      <Box style={styles.flex}>
        <HeaderReal title={title} />
        <ItemTrong content={translate('slink:No_data')} />
      </Box>
    );
  }

  if (isTietHoc && hasEnd) {
    return (
      <Box style={styles.flex}>
        <HeaderReal title={title} />
        <ItemTrong content={translate('slink:Lesson_not_end')} />
      </Box>
    );
  }

  return (
    <FormProvider {...methods}>
      <Box style={styles.flex}>
        <HeaderReal title={title} />
        <KeyboardAwareScrollView
          style={styles.viewContent}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <HeaderDetail
            title={data?.tieuDe}
            subTitle={subTitle}
            isTietHoc={isTietHoc}
          />
          {data?.danhSachKhoi?.map((item, index) => (
            <ChiTietBieuMauDanhGia
              needsExpensive={needsExpensive}
              disabled={disabled}
              initKetQua={initKetQua}
              data={item}
              key={index}
            />
          ))}
          <FormFooterComponent
            visible={!disabled}
            camKet={{
              coCamKet: data?.coCamKet,
              noiDungCamKet: data?.noiDungCamKet,
            }}
            onCheckCommit={e => (checked.current = e)}
          />
        </KeyboardAwareScrollView>
        <BaseButtonNB
          hidden={!needsExpensive || disabled}
          onPress={methods?.handleSubmit(handleData)}
          isLoading={loading}
          isLoadingText={translate('slink:Sending')}
          width={WIDTH(100)}
          bottom={HEIGHT(30)}
          position="absolute"
          title={translate('slink:Send')}
        />
        <LoadingComponent loading={loading} />
      </Box>
    </FormProvider>
  );
};

export default DanhGiaGiangVien;
interface FooterProps {
  camKet: { coCamKet?: boolean; noiDungCamKet?: string };
  onCheckCommit: (e: boolean) => void;
  visible: boolean;
}
const FormFooterComponent = (props: FooterProps) => {
  const { camKet, onCheckCommit, visible = true } = props;

  if (camKet?.coCamKet && visible) {
    return (
      <ItemXacNhan
        style={styles.itemXacNhan}
        title={camKet?.noiDungCamKet || ''}
        onCheck={onCheckCommit}
      />
    );
  }

  return null;
};
