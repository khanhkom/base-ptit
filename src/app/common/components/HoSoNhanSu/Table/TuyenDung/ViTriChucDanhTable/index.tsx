/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import R from '@assets/R';
import BaseButtonNB from '@components/BaseButtonNB';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import MultiChoiceForm from '@components/QuyTrinhDong/component/MultiChoices/MultiChoiceForm';
import SingleSelectForm from '@components/QuyTrinhDong/component/SingleSelect/SingleSelectForm';
import DatePickerForm from '@components/QuyTrinhDong/component/Time/DatePickerForm';
import UploadFileForm from '@components/QuyTrinhDong/component/UploadFileQuyTrinh/UploadfileForm';
import { EKieuDuLieu, LOAI_QUYET_DINH_TCNS } from '@config/constant';
import { HEIGHT, WIDTH } from '@config/function';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { goBack } from '@navigation/navigation-service';
import {
  delViTriChucDanh,
  donViNhanSu,
  donViViTri,
  postViTriChucDanh,
  putViTriChucDanh,
  uploadDocument,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

import BtnXoa from '../../BtnXoa/BtnXoa';

const ViTriChucDanhTable = props => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const thongTinNhanSuId = props?.route?.params?.idUser;

  const onRefresh = props?.route?.params?.onRefresh;

  const defaultData = props?.route?.params?.item;

  const watchValues = watch();

  const [loading, setloading] = useState(false);

  const [loadingSubmit, setloadingSubmit] = useState(false);

  const [listDonVi, setlistDonVi] = useState([]);

  const [listChucDanh, setlistChucDanh] = useState([]);

  useEffect(() => {
    getData();

    if (defaultData) {
      initData();
    }
  }, []);

  const initData = () => {
    setValue('donViId', defaultData?.donViId);

    setValue('donViViTriId', defaultData?.donViViTriId);

    setValue('hieuLucDenNgay', defaultData?.hieuLucDenNgay);

    setValue('hieuLucTuNgay', defaultData?.hieuLucTuNgay);

    setValue('loaiQuyetDinh', defaultData?.loaiQuyetDinh);

    setValue('ngayQuyetDinh', defaultData?.ngayQuyetDinh);

    setValue('soQuyetDinh', defaultData?.soQuyetDinh);

    setValue(
      'conHieuLuc',
      defaultData?.conHieuLuc ? [translate('hoSoNhanSu:conHieuLuc')] : [],
    );

    setValue(
      'laDonViChinh',
      defaultData?.laDonViChinh ? [translate('hoSoNhanSu:laDonViChinh')] : [],
    );

    setValue(
      'isBoMonChinh',
      defaultData?.isBoMonChinh ? [translate('hoSoNhanSu:isBoMonChinh')] : [],
    );
  };

  const getData = async () => {
    setloading(true);

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

    setloading(false);

    setlistChucDanh(responseDonViViTri?.data?.data ?? []);
  };

  const dsChucDanh =
    listChucDanh
      ?.filter(
        (item: { donViId: string }) =>
          item?.donViId === watchValues?.donViId ||
          item?.donViId === defaultData?.donViId,
      )
      ?.map((item: { tenChucVu: string; _id: string }) => {
        const labelChucDanh = `${item?.tenChucVu ?? '--'}`;

        return {
          label: labelChucDanh,
          value: item?._id ?? '',
        };
      }) ?? [];

  const onSubmit = async (data: any) => {
    setloadingSubmit(true);

    let resupload: any;
    if (data?.urlFileUpload?.length !== 0) {
      if (data?.urlFileUpload?.[0]?.type) {
        resupload = await uploadDocument(data?.urlFileUpload);
      } else {
        resupload = data?.urlFileUpload;
      }
    }

    const body = {
      conHieuLuc:
        data?.conHieuLuc === undefined || data?.conHieuLuc?.length === 0
          ? false
          : true,
      donViId: data?.donViId,
      donViViTriId: data?.donViViTriId,
      hieuLucDenNgay: data?.hieuLucDenNgay,
      hieuLucTuNgay: data?.hieuLucTuNgay,
      loaiQuyetDinh: data?.loaiQuyetDinh,
      laDonViChinh:
        data?.laDonViChinh === undefined || data?.laDonViChinh?.length === 0
          ? false
          : true,
      isBoMonChinh:
        data?.isBoMonChinh === undefined || data?.isBoMonChinh?.length === 0
          ? false
          : true,
      ngayQuyetDinh: data?.ngayQuyetDinh,
      soQuyetDinh: data?.soQuyetDinh,
      thongTinNhanSuId,
      ...(resupload?.[0]?.url && { urlFileUpload: resupload?.[0]?.url }),
    };

    let res: any;
    if (defaultData?._id) {
      res = await putViTriChucDanh(body, defaultData?._id);
    } else {
      res = await postViTriChucDanh(body);
    }

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh?.();

      setTimeout(goBack, 500);
    }
  };

  const onDel = async () => {
    setloadingSubmit(true);

    const res = await delViTriChucDanh(defaultData?._id);

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh();

      setTimeout(goBack, 500);
    }
  };

  if (loading) {
    return (
      <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
        <HeaderReal title="Vị trí chức danh" />
        <Box flex={1}>
          <LoadingComponent />
        </Box>
      </Box>
    );
  }

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title={translate('hoSoNhanSu:donViViTri')}
        childrenRight={defaultData && <BtnXoa onPress={onDel} />}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <SingleSelectForm
          defaultValue={defaultData?.donViId}
          label={translate('slink:Select_unit')}
          data={listDonVi}
          name={'donViId'}
          control={control}
          error={errors?.donViId?.message}
          required
        />
        <SingleSelectForm
          label={translate('hoSoNhanSu:Chon_vi_tri')}
          defaultValue={defaultData?.donViViTriId}
          data={dsChucDanh}
          name={'donViViTriId'}
          control={control}
          error={errors?.donViViTriId?.message}
          required
        />
        <SingleSelectForm
          label={translate('hoSoNhanSu:loaiQuyetDinh')}
          data={LOAI_QUYET_DINH_TCNS?.map((e: string) => {
            return { label: e, value: e };
          })}
          defaultValue={defaultData?.loaiQuyetDinh}
          name={'loaiQuyetDinh'}
          control={control}
          error={errors?.loaiQuyetDinh?.message}
          required
        />
        <DatePickerForm
          label={translate('hoSoNhanSu:ngayQuyetDinh')}
          error={errors?.ngayQuyetDinh?.message}
          defaultValue={defaultData?.ngayQuyetDinh}
          mode="date"
          name={'ngayQuyetDinh'}
          control={control}
        />
        <InputNBForm
          label={translate('slink:Decision_number')}
          name={'soQuyetDinh'}
          defaultValue={defaultData?.soQuyetDinh}
          type={EKieuDuLieu.NUMBER}
          control={control}
          error={errors?.soQuyetDinh?.message}
        />
        <DatePickerForm
          label={translate('hoSoNhanSu:hieuLucTuNgay')}
          error={errors?.hieuLucTuNgay?.message}
          defaultValue={defaultData?.hieuLucTuNgay}
          mode="date"
          name={'hieuLucTuNgay'}
          control={control}
        />
        <DatePickerForm
          label={translate('hoSoNhanSu:hieuLucDenNgay')}
          error={errors?.hieuLucDenNgay?.message}
          defaultValue={defaultData?.hieuLucDenNgay}
          mode="date"
          name={'hieuLucDenNgay'}
          control={control}
        />
        <MultiChoiceForm
          name={'conHieuLuc'}
          error={errors?.conHieuLuc?.message}
          defaultValue={
            defaultData?.conHieuLuc ? [translate('hoSoNhanSu:conHieuLuc')] : []
          }
          control={control}
          data={[
            {
              label: translate('hoSoNhanSu:conHieuLuc'),
              value: translate('hoSoNhanSu:conHieuLuc'),
            },
          ]}
        />
        <MultiChoiceForm
          error={errors?.laDonViChinh?.message}
          defaultValue={
            defaultData?.laDonViChinh
              ? [translate('hoSoNhanSu:laDonViChinh')]
              : []
          }
          name={'laDonViChinh'}
          control={control}
          data={[
            {
              label: translate('hoSoNhanSu:laDonViChinh'),
              value: translate('hoSoNhanSu:laDonViChinh'),
            },
          ]}
        />
        <MultiChoiceForm
          error={errors?.isBoMonChinh?.message}
          defaultValue={
            defaultData?.isBoMonChinh
              ? [translate('hoSoNhanSu:isBoMonChinh')]
              : []
          }
          name={'isBoMonChinh'}
          control={control}
          data={[
            {
              label: translate('hoSoNhanSu:isBoMonChinh'),
              value: translate('hoSoNhanSu:isBoMonChinh'),
            },
          ]}
        />
        <UploadFileForm
          name={'urlFileUpload'}
          arrayFile={
            defaultData?.urlFileUpload
              ? [{ url: defaultData?.urlFileUpload }]
              : []
          }
          singleType
          error={errors?.urlFileUpload?.message}
          control={control}
          label={translate('hoSoNhanSu:fileDinhKem')}
        />
        <BaseButtonNB
          isLoading={loadingSubmit}
          isLoadingText={translate('slink:Loading')}
          width={WIDTH(140)}
          title={
            defaultData ? translate('slink:Update') : translate('slink:Add')
          }
          onPress={handleSubmit(onSubmit)}
        />
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default ViTriChucDanhTable;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: WIDTH(12),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
  },
});
