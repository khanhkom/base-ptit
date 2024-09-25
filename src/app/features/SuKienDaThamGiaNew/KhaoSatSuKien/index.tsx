/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

// Chưa sửa theo biểu mẫu khảo sát mới

import React from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';

import { EQUESTION_TYPE, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import ChiTietBieuMauDanhGia from '@components/ChiTietBieuMauDanhGia';
import SkeletonTable from '@components/HoSoNhanSu/SkeletonTable';
import ItemXacNhan from '@components/Item/ItemXacNhan';
import { showToast } from '@components/Toast';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { goBack, replaceScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  bieuMauKhaoSatTrucTuyen,
  getDefaultDataKhaoSatSuKien,
  submitBieuMauKhaoSat,
  uploadDocument,
} from '@networking/user';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import { Box } from 'native-base';

import styles from './styles';

const KhaoSatSuKien = (props: any) => {
  const { account } = useSelector(selectAppConfig);

  const idKhaoSat = props?.route?.params?.idKhaoSat;

  const idSuKien = props?.route?.params?.idSuKien;

  const loaiKhaoSatSuKien = props?.route?.params?.loaiKhaoSatSuKien;

  const disable = props?.route?.params?.disable ?? false;

  const isNhapMa = props?.route?.params?.isNhapMa;

  const [loading, setLoading] = React.useState(true);

  const [listQuestion, setListQuestion] = React.useState<any[]>([]);

  const [defaultData, setDefaultData] = React.useState<any[]>([]);

  const [checked, setChecked] = React.useState<any>({});

  const checkCamKet = React.useRef(false);

  React.useEffect(() => {
    if (disable) {
      getDefaultData();
    }

    getDataExamination();
  }, []);

  const getDefaultData = async () => {
    try {
      setLoading(true);

      const res: any = await getDefaultDataKhaoSatSuKien(
        idSuKien,
        loaiKhaoSatSuKien,
        account?.ssoId,
      );

      setDefaultData(res?.data?.data?.danhSachTraLoi ?? []);

      getDataExamination();

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getDataExamination = async () => {
    try {
      setLoading(true);

      const res = await bieuMauKhaoSatTrucTuyen(idKhaoSat);

      setListQuestion(res?.data?.data?.danhSachKhoi ?? []);

      setChecked({
        coCamKet: res?.data?.data?.coCamKet ?? false,
        noiDungCamKet: res?.data?.data?.noiDungCamKet,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onSendAnswer = async (dataSubmit?: any) => {
    try {
      setLoading(true);

      const dataTranform = await tranformData(dataSubmit);

      const danhSachTraLoi = await Promise.all(dataTranform);

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
        idKhaoSat: idKhaoSat,
        idSuKien: idSuKien,
        loaiKhaoSatSuKien: loaiKhaoSatSuKien,
        ssoId: account?.ssoId,
        ...infoUser,
      };

      const res = await submitBieuMauKhaoSat(bodyKhaoSat);

      setLoading(false);

      if (res?.status) {
        isNhapMa
          ? goBack()
          : replaceScreen(APP_SCREEN.SUKIENDATHAMGIA, {
              isThamGia: loaiKhaoSatSuKien === 'DANG_KY' ? 0 : 1,
            });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const methods = useForm();

  const handleData = (dataSubmit: any) => {
    if (!checkCamKet.current) {
      showToast({
        msg: `Vui lòng tích chọn "${checked?.noiDungCamKet ?? ''}" !`,
        interval: 4000,
        type: 'warning',
      });
    } else {
      onSendAnswer(dataSubmit);
    }
  };

  if (!listQuestion?.length) {
    return (
      <Box style={styles.flex}>
        <HeaderReal title={translate('slink:Survey')} />
        <Box w={WIDTH(343)} alignSelf={'center'} mt={'4'}>
          <SkeletonTable />
        </Box>
      </Box>
    );
  }

  const title = translate('slink:Survey');

  if (loading) {
    return (
      <Box style={styles.flex}>
        <HeaderReal title={title} /> <LoadingComponent loading={loading} />
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
          {[...listQuestion]?.map((item, index) => (
            <ChiTietBieuMauDanhGia
              disabled={disable}
              initKetQua={defaultData}
              data={item}
              key={index}
              // errors={errors}
              // control={control}
            />
          ))}
          <FormFooterComponent
            visible={!disable}
            camKet={checked}
            onCheckCommit={e => (checkCamKet.current = e)}
          />
          <BaseButtonNB
            onPress={methods?.handleSubmit(handleData)}
            isLoading={loading}
            isLoadingText={translate('slink:Sending')}
            width={WIDTH(100)}
            title={translate('slink:Send')}
            hidden={disable}
          />
        </KeyboardAwareScrollView>
        <LoadingComponent loading={loading} />
      </Box>
    </FormProvider>
  );
};

export default KhaoSatSuKien;

const tranformData = async (data: any) => {
  const listResult = _.map(data, (value, key) => ({ key, value }));

  const listAnswer = listResult.map(async item => {
    if (item?.value?.listUrlFile?.length > 0) {
      const transform = item?.value?.listUrlFile?.map(async (e: any) => {
        if (e?.type) {
          const listUrlFileResponse: any = await uploadDocument([e]);

          return listUrlFileResponse?.[0]?.url;
        } else {
          return e?.uri;
        }
      });

      const listUrlFile = await Promise.all(transform);

      return {
        ...item,
        value: {
          ...item?.value,
          listUrlFile,
        },
      };
    } else {
      return item;
    }
  });

  const listAnswerResult = await Promise.all(listAnswer);

  //filter Các trường ko có giá trị
  const result = listAnswerResult
    ?.filter(
      itemDon => itemDon?.value?.cauTraLoi || itemDon?.value?.listUrlFile,
    )
    ?.map(item => {
      const body = () => {
        switch (item?.value?.loai) {
          case EQUESTION_TYPE.SingleChoice:
          case EQUESTION_TYPE.MultipleChoice:
            return {
              listLuaChon: item?.value?.cauTraLoi ?? [],
              traLoiKhac: item?.value?.ghiChu,
            };
          case EQUESTION_TYPE.GridSingleChoice:
          case EQUESTION_TYPE.GridMultipleChoice:
            return {
              listLuaChonBang: item?.value?.cauTraLoi ?? [],
            };
          case EQUESTION_TYPE.NumbericRange:
            return { luaChonTuyenTinh: item?.value?.cauTraLoi || 0 };
          case EQUESTION_TYPE.Text:
            return { traLoiText: item?.value?.cauTraLoi || '' };
          case EQUESTION_TYPE.UploadFile:
            return { listUrlFile: item?.value?.listUrlFile || '' };

          default:
            return {};
        }
      };

      return { idCauHoi: item?.key, ...body() };
    });

  return result;
};

const FormFooterComponent = (props: any) => {
  const { camKet, onCheckCommit, visible = true } = props;

  if (camKet?.coCamKet) {
    return (
      <ItemXacNhan
        style={styles.itemXacNhan}
        title={camKet?.noiDungCamKet || ''}
        onCheck={onCheckCommit}
        defaultIsChecked={!visible}
      />
    );
  }

  return null;
};
