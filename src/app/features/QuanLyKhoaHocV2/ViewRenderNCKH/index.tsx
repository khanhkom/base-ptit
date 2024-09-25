/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import R from '@assets/R';
import {
  dispatch,
  ELoaiCanBo,
  ELoaiTruongThongTinTinh,
  HEIGHT,
  showToastError,
  WIDTH,
} from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import QuyTrinhDong from '@components/QuyTrinhDong';
import HeaderReal from '@libcomponents/header-real';
import { goBack } from '@navigation/navigation-service';
import { uploadDocument } from '@networking/user';
import {
  getDanhMucNCKH,
  khaiBaoNCKHV2,
  kiemTraTenQLKH,
  updateKhaiBao,
  yeuCauQuyDoiGio,
} from '@networking/user/QuanLyKhoaHoc';
import { appActions } from '@redux-slice';
import { translate } from '@utils/i18n/translate';
import { MixPanelEvent, trackEvent } from '@utils/Mixpanel';
import _ from 'lodash';
import { Box } from 'native-base';

import ModalDeTaiTrung from './ModalDeTaiTrung';

import { KetQuaKhaiBaoProps, LoaiHinhNCKHProps } from '../type';
interface Props {
  route: {
    params: {
      dataLoaiHinh?: LoaiHinhNCKHProps;
      dotId?: string;
      data?: KetQuaKhaiBaoProps;
      onRefresh: () => void;
    };
  };
}
const ViewRenderNCKH = (props: Props) => {
  const dataLoaiHinh = props?.route?.params?.dataLoaiHinh;

  const dataEdit = props?.route?.params?.data;

  const dotId = props?.route?.params?.dotId;

  const onRefresh = props?.route?.params?.onRefresh;

  const [visible, setvisible] = useState(false);

  const [listDeTaiTrung, setlistDeTaiTrung] = useState<KetQuaKhaiBaoProps[]>(
    [],
  );

  const [loading, setloading] = useState(false);

  useEffect(() => {
    getDanhMuc();
  }, []);

  const getDanhMuc = async () => {
    const responseDanhMuc: any = await getDanhMucNCKH();

    dispatch(appActions.setdanhMucNCKH(responseDanhMuc?.data?.data ?? []));
  };

  const cauHinh = dataLoaiHinh?.cauHinhLoaiHinh;

  const listFormTinh = dataLoaiHinh?.danhSachCauHinhTruongThongTinTinh;

  const truongThongTinTinh = listFormTinh?.filter(item =>
    [
      ELoaiTruongThongTinTinh.DANH_SACH_THANH_VIEN,
      ELoaiTruongThongTinTinh.MOC_THOI_GIAN,
    ]?.includes(item?.loaiTruongThongTinTinh),
  );

  const {
    control,
    handleSubmit,
    unregister,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dataEdit && initData();
  }, []);

  const initData = () => {
    dataEdit?.thongTinKhaiBao?.forEach(item => {
      setValue(item?.ma, item?.value);
    });

    dataEdit?.soLuongThanhVien &&
      setValue('soLuongThanhVien', dataEdit?.soLuongThanhVien);

    (dataEdit?.danhSachMinhChung &&
      setValue(
        'danhSachMinhChung',
        dataEdit?.danhSachMinhChung?.map(url => {
          return { url };
        }),
      )) ||
      [];

    dataEdit?.thongTinThoiGian?.timeline &&
      setValue('mocThoiGianTinh', dataEdit?.thongTinThoiGian?.timeline);

    dataEdit?.thongTinThoiGian?.end &&
      dataEdit?.thongTinThoiGian?.start &&
      setValue('thoiGian', {
        start: dataEdit?.thongTinThoiGian?.start,
        end: dataEdit?.thongTinThoiGian?.end,
      });

    const objQuyDoiDiem = dataEdit?.danhSachYeuCauQuyDoiDiem?.find(
      item => item?.namHocId === dotId,
    );

    const objQuyDoiGio = dataEdit?.danhSachYeuCauQuyDoiGio?.find(
      item => item?.namHocId === dotId,
    );

    const dsThanhVien = dataEdit?.danhSachThanhVien?.map(item => {
      const tongDiem = objQuyDoiDiem?.danhSachKetQuaTinhGioThanhVien?.find(
        (e: { ssoId: string; tongGio: number }) => e?.ssoId === item?.ssoId,
      )?.tongGio;

      const tongGio = objQuyDoiGio?.danhSachKetQuaTinhGioThanhVien?.find(
        (e: { ssoId: string; tongGio: number }) => e?.ssoId === item?.ssoId,
      )?.tongGio;

      return {
        ...item,
        loai: item?.maDinhDanh
          ? ELoaiCanBo.TRONG_HOC_VIEN
          : ELoaiCanBo.NGOAI_HOC_VIEN,
        ...(tongDiem && { tongDiem: `${tongDiem}` }),
        ...(tongGio && { tongGio: `${tongGio}` }),
      };
    });

    dataEdit?.danhSachThanhVien &&
      dataEdit?.danhSachThanhVien?.length > 0 &&
      setValue('danhSachThanhVien', dsThanhVien);
  };

  const watchedValues = watch();

  const calculatePointAllMember = watchedValues?.danhSachThanhVien?.reduce(
    (acc: any, item: { tongDiem: any }) => acc + Number(item.tongDiem),
    0,
  );

  const onSubmit = async (data: any) => {
    if (dataLoaiHinh?.tinhDiem && calculatePointAllMember > 5) {
      showToastError(translate('slink:Total_point_no_greater_5'));

      return;
    }

    setloading(true);

    const fieldSearchKey = dataLoaiHinh?.searchKey1;

    let resultKQ = [];

    if (fieldSearchKey) {
      const bodyTextQuery = { textQuery: data?.[fieldSearchKey] ?? '' };

      const responseCheck: any = await kiemTraTenQLKH(bodyTextQuery);

      if (responseCheck?.status) {
        resultKQ = responseCheck?.data?.data ?? [];
      }
    }

    if (resultKQ?.length === 0) {
      await onContinue();
    } else {
      setvisible(true);

      setlistDeTaiTrung(resultKQ ?? []);
    }

    setloading(false);
  };

  const onContinue = async () => {
    let resupload: string[] = [];

    if (watchedValues?.danhSachMinhChung?.length > 0) {
      const fileUpload = watchedValues?.danhSachMinhChung?.map(async item => {
        if (item?.type) {
          const response = await uploadDocument([item]);

          return response?.[0]?.url;
        }

        return item?.url;
      });

      resupload = await Promise.all(fileUpload);
    }

    setloading(true);

    const listIdDong = cauHinh?.map(item => item?.ma);

    let valueDong = {};

    listIdDong?.forEach(item => {
      valueDong = { ...valueDong, [item]: watchedValues?.[item] ?? null };
    });

    const transformedArray = _.map(valueDong, (value, key) => ({
      ma: key,
      value,
    }));

    const thongTinKhaiBao = transformedArray?.filter(item => !!item?.value);

    const bodySubmit = {
      ...(dataEdit && { ...dataEdit }),
      danhSachMinhChung: resupload,
      thongTinKhaiBao,
      soLuongThanhVien: watchedValues?.soLuongThanhVien
        ? Number(watchedValues?.soLuongThanhVien)
        : 0,
      danhSachThanhVien: watchedValues?.danhSachThanhVien ?? [],
      loaiHinhNckhId: dataLoaiHinh?._id,
      dotId,
      thongTinThoiGian: {
        loaiThoiGianThucHien: dataLoaiHinh?.loaiThoiGianThucHien,
        ...(watchedValues?.mocThoiGianTinh && {
          timeline: watchedValues?.mocThoiGianTinh,
        }),
        ...(watchedValues?.thoiGian?.start && {
          start: watchedValues?.thoiGian?.start,
        }),
        ...(watchedValues?.thoiGian?.end && {
          end: watchedValues?.thoiGian?.end,
        }),
      },
    };

    const responseKhaiBao: any = dataEdit
      ? await updateKhaiBao(dataEdit?._id, bodySubmit)
      : await khaiBaoNCKHV2(bodySubmit);

    setloading(false);

    if (responseKhaiBao?.status) {
      trackEvent(MixPanelEvent.KHAI_BAO_QLKH);

      await requestQuyDoiGio(
        dataEdit?._id || responseKhaiBao?.data?.data?._id,
        watchedValues?.danhSachThanhVien,
      );

      onRefresh && onRefresh();

      setvisible(false);

      setTimeout(() => goBack(), 500);
    }
  };

  const requestQuyDoiGio = async (id: string, dsMember: any[]) => {
    if (dataLoaiHinh?.tinhDiem) {
      const bodyTinhDiem = {
        danhSachKetQuaTinhGioThanhVien:
          dsMember?.map(item => {
            return { ssoId: item?.ssoId, tongGio: Number(item?.tongDiem || 0) };
          }) ?? [],
        danhSachMinhChung: [],
        namHocId: dotId,
      };

      await yeuCauQuyDoiGio(id, 'DIEM', bodyTinhDiem);
    }

    if (!dataLoaiHinh?.tinhTheoTungNam) {
      const bodyTinhGio = {
        danhSachKetQuaTinhGioThanhVien:
          dsMember?.map(item => {
            return { ssoId: item?.ssoId, tongGio: Number(item?.tongGio || 0) };
          }) ?? [],
        danhSachMinhChung: [],
        namHocId: dotId,
      };

      await yeuCauQuyDoiGio(id, 'GIO', bodyTinhGio);
    }
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title={
          dataLoaiHinh?.ten ||
          translate('slink:Scientific_and_technological_results')
        }
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <QuyTrinhDong
          control={control}
          watch={watch}
          unregister={unregister}
          register={register}
          errors={errors}
          truongThongTinTinh={truongThongTinTinh}
          formKhaiBao={cauHinh}
          children={
            <BaseButtonNB
              width={WIDTH(140)}
              isLoading={loading}
              isLoadingText={
                dataEdit
                  ? translate('slink:Saving')
                  : translate('slink:Sending')
              }
              title={
                dataEdit ? translate('slink:Save') : translate('slink:Add')
              }
              onPress={handleSubmit(onSubmit)}
            />
          }
          loaiHinh={dataLoaiHinh}
        />
      </KeyboardAwareScrollView>
      <ModalDeTaiTrung
        loading={loading}
        textLoading={
          dataEdit ? translate('slink:Saving') : translate('slink:Sending')
        }
        modalVisible={visible}
        turnOffModel={() => setvisible(false)}
        listData={listDeTaiTrung}
        onPress={onContinue}
      />
    </Box>
  );
};

export default ViewRenderNCKH;

const styles = StyleSheet.create({
  content: { paddingTop: HEIGHT(24), paddingBottom: HEIGHT(30) },
});
