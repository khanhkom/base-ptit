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
import { EKieuDuLieu, LOAI_LUONG_TCNS } from '@config/constant';
import { HEIGHT, WIDTH } from '@config/function';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { goBack } from '@navigation/navigation-service';
import {
  delDBLuong,
  getBacLuong,
  ngachLuong,
  postDBLuong,
  putDBLuong,
  uploadDocument,
} from '@networking/user';
import { Box } from 'native-base';

import { translate } from '@utils/i18n/translate';
import BtnXoa from '../../BtnXoa/BtnXoa';
interface NgachLuongProps {
  _id: string;
  suDung: null;
  ngachLuongId: string;
  ghiChu: null;
  bacLuong: number;
  heSo: number;
  namApDung: number;
  tenNgachLuong: null;
  createdAt: Date;
  updatedAt: Date;
  ngachLuong: {
    ma: string;
    ten: string;
  };
}

const DienBienLuongTable = props => {
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

  const thongTinNhanSuId = props?.route?.params?.idUser;

  const onRefresh = props?.route?.params?.onRefresh;

  const defaultData = props?.route?.params?.item;

  useEffect(() => {
    getData();

    if (defaultData) {
      initData();
    }
  }, []);

  const [listNgach, setlistNgach] = useState([]);

  const [listBacLuong, setlistBacLuong] = useState<NgachLuongProps[]>([]);

  const getData = async () => {
    try {
      setloading(true);

      const responseNgach = await ngachLuong();

      setlistNgach(
        responseNgach?.data?.data.map((item: any) => {
          return {
            label: item?.ten ?? '--',
            value: item?._id ?? '',
          };
        }) || [],
      );

      const responseBac = await getBacLuong();

      setloading(false);

      setlistBacLuong(responseBac?.data?.data ?? []);
    } catch (error) {}
  };

  const initData = () => {
    setValue('loaiLuong', defaultData?.loaiLuong);
    setValue('bacLuongId', defaultData?.bacLuongId);

    setValue('denNgay', defaultData?.denNgay);

    setValue('heSo', defaultData?.heSo);

    setValue('mocXetNangLuong', defaultData?.mocXetNangLuong);

    setValue('ngachLuongId', defaultData?.ngachLuongId);

    setValue('ngayQuyetDinh', defaultData?.ngayQuyetDinh);

    setValue('phanTramHuong', defaultData?.phanTramHuong);

    setValue('phuCapVuotKhung', defaultData?.phuCapVuotKhung);

    setValue('soQuyetDinh', defaultData?.soQuyetDinh);

    setValue('tuNgay', defaultData?.tuNgay);
  };

  const onSubmit = async (data: any) => {
    try {
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
        loaiLuong: data?.loaiLuong,
        bacLuongId: data?.bacLuongId,

        ...(data?.bacLuong?.heSo && {
          heSo: Number(data?.bacLuong?.heSo),
        }),
        mocXetNangLuong: currentDate?.toISOString(),
        ngachLuongId: data?.ngachLuongId,
        ...(data?.ngayQuyetDinh && {
          ngayQuyetDinh: new Date(data?.ngayQuyetDinh)?.toISOString(),
        }),
        ...(data?.phanTramHuong && {
          phanTramHuong: Number(data?.phanTramHuong),
        }),
        ...(data?.phuCapVuotKhung && {
          phuCapVuotKhung: Number(data?.phuCapVuotKhung),
        }),
        soQuyetDinh: data?.soQuyetDinh || null,
        ...(data?.tuNgay && {
          tuNgay: new Date(data?.tuNgay)?.toISOString(),
        }),
        ...(data?.denNgay && {
          denNgay: new Date(data?.denNgay)?.toISOString(),
        }),
        thongTinNhanSuId,
        ...(resupload?.[0]?.url && { fileDinhKem: resupload?.[0]?.url }),
      };

      let res: any;
      if (defaultData?._id) {
        res = await putDBLuong(body, defaultData?._id);
      } else {
        res = await postDBLuong(body);
      }

      setloadingSubmit(false);

      if (res?.status) {
        onRefresh && onRefresh?.();

        setTimeout(goBack, 500);
      }
    } catch (error) {}
  };

  const onDel = async () => {
    setloadingSubmit(true);

    const res = await delDBLuong(defaultData?._id);

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh();

      setTimeout(goBack, 500);
    }
  };

  if (loading) {
    return (
      <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
        <HeaderReal title={translate('hoSoNhanSu:dienBienLuong')} />
        <Box flex={1}>
          <LoadingComponent />
        </Box>
      </Box>
    );
  }

  const listNgachLuong = listBacLuong?.filter(
    item => item?.ngachLuongId === watchValues?.ngachLuongId,
  );

  const listDataNgach =
    listNgachLuong?.map(item => {
      return {
        label: `${item?.bacLuong || ''}`,
        value: item?._id ?? '',
      };
    }) ?? [];

  const heSoLuong = listNgachLuong?.find(
    item => watchValues?.bacLuongId === item?._id,
  )?.heSo;

  const currentDate = new Date(watchValues?.tuNgay ?? new Date());

  // Cộng thêm 3 năm
  currentDate.setFullYear(currentDate.getFullYear() + 3);

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title={translate('hoSoNhanSu:dienBienLuong')}
        childrenRight={defaultData && <BtnXoa onPress={onDel} />}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <SingleSelectForm
          label={translate('hoSoNhanSu:loaiLuong')}
          data={LOAI_LUONG_TCNS?.map((e: string) => {
            return { label: e, value: e };
          })}
          defaultValue={defaultData?.loaiLuong}
          name={'loaiLuong'}
          control={control}
          error={errors?.loaiLuong?.message}
          required
        />
        <SingleSelectForm
          label={translate('hoSoNhanSu:ngachLuong')}
          defaultValue={defaultData?.ngachLuongId}
          data={listNgach}
          name={'ngachLuongId'}
          control={control}
          error={errors?.ngachLuongId?.message}
          required
        />
        <SingleSelectForm
          label={translate('hoSoNhanSu:bacLuong')}
          data={listDataNgach}
          defaultValue={defaultData?.bacLuongId}
          name={'bacLuongId'}
          control={control}
          error={errors?.bacLuongId?.message}
          required
        />
        <InputNBForm
          label={translate('hoSoNhanSu:heSo')}
          name={'heSo'}
          defaultValue={heSoLuong ? `${heSoLuong}` : ''}
          isDisabled
          control={control}
        />
        <InputNBForm
          type={EKieuDuLieu.NUMBER}
          label={translate('hoSoNhanSu:phanTramHuong')}
          error={errors?.phanTramHuong?.message}
          name={'phanTramHuong'}
          defaultValue={String(defaultData?.phanTramHuong ?? '')}
          control={control}
        />
        <InputNBForm
          type={EKieuDuLieu.NUMBER}
          label={translate('hoSoNhanSu:phuCapVuotKhung')}
          error={errors?.phuCapVuotKhung?.message}
          defaultValue={String(defaultData?.phuCapVuotKhung ?? '')}
          name={'phuCapVuotKhung'}
          control={control}
        />
        <DatePickerForm
          label={translate('slink:FromDate')}
          isRequired
          mode="date"
          error={errors?.tuNgay?.message}
          defaultValue={defaultData?.tuNgay}
          name={'tuNgay'}
          control={control}
        />
        <DatePickerForm
          mode="date"
          label={translate('slink:ToDate')}
          error={errors?.denNgay?.message}
          defaultValue={defaultData?.denNgay}
          name={'denNgay'}
          control={control}
        />
        <InputNBForm
          label={translate('hoSoNhanSu:soQuyetDinh')}
          name={'soQuyetDinh'}
          error={errors?.soQuyetDinh?.message}
          defaultValue={defaultData?.soQuyetDinh}
          control={control}
        />
        <DatePickerForm
          label={translate('hoSoNhanSu:mocXetNangLuong')}
          error={errors?.mocXetNangLuong?.message}
          defaultValue={watchValues?.tuNgay && currentDate}
          mode="date"
          // isRequired
          isDisabled
          name={'mocXetNangLuong'}
          control={control}
        />
        <DatePickerForm
          label={translate('hoSoNhanSu:ngayQuyetDinh')}
          error={errors?.ngayQuyetDinh?.message}
          defaultValue={defaultData?.ngayQuyetDinh}
          mode="date"
          name={'ngayQuyetDinh'}
          control={control}
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

export default DienBienLuongTable;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: WIDTH(12),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
  },
});
