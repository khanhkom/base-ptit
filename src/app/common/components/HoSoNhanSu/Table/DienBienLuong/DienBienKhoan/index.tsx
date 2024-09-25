/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import R from '@assets/R';
import BaseButtonNB from '@components/BaseButtonNB';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import SingleSelectForm from '@components/QuyTrinhDong/component/SingleSelect/SingleSelectForm';
import DatePickerForm from '@components/QuyTrinhDong/component/Time/DatePickerForm';
import UploadFileForm from '@components/QuyTrinhDong/component/UploadFileQuyTrinh/UploadfileForm';
import { EKieuDuLieu } from '@config/constant';
import { HEIGHT, WIDTH } from '@config/function';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { goBack } from '@navigation/navigation-service';
import {
  delDBKhoan,
  getLoaiKhoan,
  postDBKhoan,
  putDBKhoan,
  uploadDocument,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

import BtnXoa from '../../BtnXoa/BtnXoa';
interface LoaiKhoanProps {
  _id: string;
  ma: string;
  ten: string;
  soThuTu: null;
  moTa: null;
  suDung: null;
  thoiGianLenKhoan: number;
  khoanTinhBHXH: boolean;
  hinhThucHuong: string;
  createdAt: Date;
  updatedAt: Date;
  danhSachMucKhoan: DanhSachMucKhoanProps[];
}

interface DanhSachMucKhoanProps {
  _id: string;
  ten: string;
  mucKhoan: number;
  trangThai: boolean;
  loaiKhoanId: string;
  createdAt: Date;
  updatedAt: Date;
}
interface SendForm {
  thongTinNhanSuId?: string;
  idGoc?: string;
  ssoId?: string;
  loaiKhoanId?: string;
  mucKhoanId?: string;
  mucHuong?: number;
  tuNgay?: Date;
  denNgay?: Date;
  khoanTinhBHXH?: boolean;
  fileDinhKem?: string;
  daXetDuyet?: boolean;
  isHoiDongXetDuyet?: boolean;
  denNgayBackUp?: Date;
  idDotXetNangLuong?: string;
}
const DienBienKhoanTable = props => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const watchValues = watch();

  const [loading, setloading] = useState(false);

  const [loadingSubmit, setloadingSubmit] = useState(false);

  const [dataHeSoThuong, setDataHeSoThuong] = useState<any>('');

  const thongTinNhanSuId = props?.route?.params?.idUser;

  const onRefresh = props?.route?.params?.onRefresh;

  const defaultData = props?.route?.params?.item;

  useEffect(() => {
    getData();

    if (defaultData) {
      initData();
    }
  }, []);

  const [listLoaiPC, setlistLoaiPC] = useState<LoaiKhoanProps[]>([]);

  const getData = async () => {
    setloading(true);

    const responseLoaiPC = await getLoaiKhoan();

    setloading(false);

    setlistLoaiPC(responseLoaiPC?.data?.data || []);
  };

  const initData = () => {
    setValue('mucHuong', defaultData?.mucHuong);

    setValue('loaiKhoanId', defaultData?.loaiKhoanId);

    setValue('mucKhoanId', defaultData?.mucKhoanId);

    setValue('denNgay', defaultData?.denNgay);

    setValue('tuNgay', defaultData?.tuNgay);
  };

  const onSubmit = async (data: any) => {
    setloadingSubmit(true);

    let resupload: any;
    if (data?.fileDinhKem?.length !== 0) {
      if (data?.fileDinhKem?.[0]?.type) {
        resupload = await uploadDocument(data?.fileDinhKem);
      } else {
        resupload = data?.fileDinhKem;
      }
    }

    const body: SendForm = {
      ...(data?.mucHuong && {
        mucHuong: Number(data?.mucHuong),
      }),
      khoanTinhBHXH: objectPCChoose?.khoanTinhBHXH,
      loaiKhoanId: data?.loaiKhoanId,
      loaiKhoan: objectPCChoose,
      mucKhoanId: data?.mucKhoanId,
      denNgay: data?.denNgay,
      tuNgay: data?.tuNgay,
      thongTinNhanSuId,
      ...((dataHeSoThuong || heSoThuong) && {
        heSo: dataMucPC?.length === 0 ? Number(dataHeSoThuong) : heSoThuong,
      }),
      ...(resupload?.[0]?.url && { fileDinhKem: resupload?.[0]?.url }),
    };

    let res: any;
    if (defaultData?._id) {
      res = await putDBKhoan(body, defaultData?._id);
    } else {
      res = await postDBKhoan(body);
    }

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh?.();

      setTimeout(goBack, 500);
    }
  };

  if (loading) {
    return (
      <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
        <HeaderReal title="Diễn biến khoán" />
        <Box flex={1}>
          <LoadingComponent />
        </Box>
      </Box>
    );
  }

  const listPC =
    listLoaiPC?.map((item: any) => {
      return {
        label: item?.ten ?? '',
        value: item?._id ?? '',
      };
    }) ?? [];

  const objectPCChoose = listLoaiPC?.find(
    item => item?._id === watchValues.loaiKhoanId,
  );

  const heSoThuong = objectPCChoose?.danhSachMucKhoan?.find(
    item => item?._id === watchValues.mucKhoanId,
  )?.mucKhoan;

  const dataMucPC =
    objectPCChoose?.danhSachMucKhoan?.map((item: any) => {
      return {
        label: item?.ten ?? '',
        value: item?._id ?? '',
      };
    }) ?? [];

  const onDel = async () => {
    setloadingSubmit(true);

    const res = await delDBKhoan(defaultData?._id);

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh();

      setTimeout(goBack, 500);
    }
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title={translate('hoSoNhanSu:dienBienKhoan')}
        childrenRight={defaultData && <BtnXoa onPress={onDel} />}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <SingleSelectForm
          label={translate('hoSoNhanSu:loaiKhoan')}
          defaultValue={defaultData?.loaiKhoanId}
          data={listPC}
          name={'loaiKhoanId'}
          control={control}
          error={errors?.loaiKhoanId?.message}
          required
        />
        {dataMucPC?.length === 0 || (
          <SingleSelectForm
            label={translate('hoSoNhanSu:heSoKhoan')}
            defaultValue={defaultData?.mucKhoanId}
            data={dataMucPC}
            name={'mucKhoanId'}
            control={control}
            error={errors?.mucKhoanId?.message}
            required
          />
        )}
        <InputNBForm
          label={translate('hoSoNhanSu:heSoPhanTramGiaTri')}
          name={'heSo'}
          placeholder={translate('slink:Enter_here')}
          defaultValue={heSoThuong ? String(heSoThuong) : ''}
          isDisabled={dataMucPC?.length !== 0}
          control={control}
          type={EKieuDuLieu.NUMBER}
          onChangeValue={setDataHeSoThuong}
        />
        <DatePickerForm
          label={translate('slink:FromDate')}
          mode="date"
          isRequired
          error={errors?.tuNgay?.message}
          defaultValue={defaultData?.tuNgay}
          name={'tuNgay'}
          control={control}
        />
        <DatePickerForm
          label={translate('slink:ToDate')}
          error={errors?.denNgay?.message}
          defaultValue={defaultData?.denNgay}
          name={'denNgay'}
          mode="date"
          control={control}
        />
        <InputNBForm
          label={`${translate('hoSoNhanSu:mucHuong')} (%)`}
          name={'mucHuong'}
          placeholder={
            objectPCChoose?.hinhThucHuong !== 'Phần trăm hưởng'
              ? translate('slink:Null_t')
              : translate('slink:Enter_here')
          }
          defaultValue={
            defaultData?.mucHuong ? String(defaultData?.mucHuong) : ''
          }
          // isDisabled={objectPCChoose?.hinhThucHuong !== 'Phần trăm hưởng'}
          control={control}
          type={EKieuDuLieu.NUMBER}
        />
        <UploadFileForm
          name={'fileDinhKem'}
          arrayFile={
            defaultData?.fileDinhKem ? [{ url: defaultData?.fileDinhKem }] : []
          }
          singleType
          error={errors?.fileDinhKem?.message}
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

export default DienBienKhoanTable;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: WIDTH(12),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
  },
});
