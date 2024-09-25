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
import { getFontSize, HEIGHT, WIDTH } from '@config/function';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { goBack } from '@navigation/navigation-service';
import {
  delDBPhuCap,
  getLoaiPhuCap,
  postDBPhuCap,
  putDBPhuCap,
  uploadDocument,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { Box, Checkbox, Text } from 'native-base';

import { EKieuDuLieu } from '@config/constant';
import BtnXoa from '../../BtnXoa/BtnXoa';
interface LoaiPhuCapProps {
  _id: string;
  ma: string;
  ten: string;
  soThuTu: null;
  moTa: null;
  suDung: null;
  thoiGianLenPhuCap: number;
  phuCapBHXH: boolean;
  hinhThucHuong: string;
  createdAt: Date;
  updatedAt: Date;
  danhSachMucPhuCap: DanhSachMucPhuCapProps[];
}

interface DanhSachMucPhuCapProps {
  _id: string;
  ten: string;
  mucPhuCap: number;
  trangThai: boolean;
  loaiPhuCapId: string;
  createdAt: Date;
  updatedAt: Date;
}

const DienBienPhuCapTable = props => {
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

  const [listLoaiPC, setlistLoaiPC] = useState<LoaiPhuCapProps[]>([]);

  const getData = async () => {
    setloading(true);

    const responseLoaiPC = await getLoaiPhuCap();

    setloading(false);

    setlistLoaiPC(responseLoaiPC?.data?.data || []);
  };

  const initData = () => {
    setValue(
      'mucHuong',
      defaultData?.mucHuong ? String(defaultData?.mucHuong) : '',
    );

    setValue('loaiPhuCapId', defaultData?.loaiPhuCapId);

    setValue('mucPhuCapId', defaultData?.mucPhuCapId);

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

    const body = {
      ...(data?.mucHuong && {
        mucHuong: Number(data?.mucHuong),
      }),
      phuCapTinhBHXH: objectPCChoose?.phuCapBHXH,
      loaiPhuCapId: data?.loaiPhuCapId,
      loaiPhuCap: objectPCChoose,
      mucPhuCapId: data?.mucPhuCapId,
      ...(data?.tuNgay && {
        tuNgay: new Date(data?.tuNgay)?.toISOString(),
      }),
      ...(data?.denNgay && {
        denNgay: new Date(data?.denNgay)?.toISOString(),
      }),
      thongTinNhanSuId,
      ...((dataHeSoThuong || heSoThuong) && {
        heSo: dataMucPC?.length === 0 ? Number(dataHeSoThuong) : heSoThuong,
      }),
      ...(resupload?.[0]?.url && { fileDinhKem: resupload?.[0]?.url }),
    };

    let res: any;
    if (defaultData?._id) {
      res = await putDBPhuCap(body, defaultData?._id);
    } else {
      res = await postDBPhuCap(body);
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
        <HeaderReal title={translate('hoSoNhanSu:dienBienPhuCap')} />
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
    item => item?._id === watchValues.loaiPhuCapId,
  );

  const heSoThuong = objectPCChoose?.danhSachMucPhuCap?.find(
    item => item?._id === watchValues.mucPhuCapId,
  )?.mucPhuCap;

  const dataMucPC =
    objectPCChoose?.danhSachMucPhuCap?.map((item: any) => {
      return {
        label: item?.ten ?? '',
        value: item?._id ?? '',
      };
    }) ?? [];

  const onDel = async () => {
    setloadingSubmit(true);

    const res = await delDBPhuCap(defaultData?._id);

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh();

      setTimeout(goBack, 500);
    }
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title={translate('hoSoNhanSu:dienBienPhuCap')}
        childrenRight={defaultData && <BtnXoa onPress={onDel} />}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <SingleSelectForm
          label={translate('hoSoNhanSu:loaiPhuCap')}
          defaultValue={defaultData?.loaiPhuCapId}
          data={listPC}
          name={'loaiPhuCapId'}
          control={control}
          error={errors?.loaiPhuCapId?.message}
          required
        />
        {dataMucPC?.length === 0 || (
          <SingleSelectForm
            label={translate('hoSoNhanSu:mucPhuCap')}
            defaultValue={defaultData?.mucPhuCapId}
            data={dataMucPC}
            name={'mucPhuCapId'}
            control={control}
            error={errors?.mucPhuCapId?.message}
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
          placeholder={translate('slink:Enter_here')}
          defaultValue={watchValues.mucHuong}
          // isDisabled={objectPCChoose?.hinhThucHuong !== 'Phần trăm hưởng'}
          control={control}
          type={EKieuDuLieu.NUMBER}
        />
        <Checkbox
          isDisabled
          my="2"
          isChecked={objectPCChoose?.phuCapBHXH}
          value="Phụ cấp tính BHXH">
          <Text maxWidth={WIDTH(300)} fontSize={getFontSize(12)}>
            {translate('hoSoNhanSu:phuCapTinhBHXH')}
          </Text>
        </Checkbox>
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

export default DienBienPhuCapTable;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: WIDTH(12),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
  },
});
