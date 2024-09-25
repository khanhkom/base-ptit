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
  delTrinhDoDaoTao,
  getHinhThucDaoTao,
  getNganh,
  getTrinhDoDTNS,
  postTrinhDoDaoTao,
  putTrinhDoDaoTao,
  uploadDocument,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

import BtnXoa from '../../BtnXoa/BtnXoa';

const ThongTinTrinhDoTable = props => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const thongTinNhanSuId = props?.route?.params?.idUser;

  const onRefresh = props?.route?.params?.onRefresh;

  const defaultData = props?.route?.params?.item;

  const [loadingSubmit, setloadingSubmit] = useState(false);

  const [listTrinhDoDTNS, setlistTrinhDoDTNS] = useState([]);

  const [listNganh, setlistNganh] = useState([]);

  const [listHTDT, setlistHTDT] = useState([]);

  const [loading, setloading] = useState(false);

  useEffect(() => {
    getData();

    if (defaultData) {
      initData();
    }
  }, []);

  const getData = async () => {
    setloading(true);

    const responseAPITrinhDo = await getTrinhDoDTNS();

    setlistTrinhDoDTNS(
      responseAPITrinhDo?.data?.data?.map((item: any) => {
        return {
          label: item?.ten ?? '',
          value: item?._id ?? '',
        };
      }) ?? [],
    );

    const responseAPINganh = await getNganh();

    setlistNganh(
      responseAPINganh?.data?.data?.map((item: any) => {
        return {
          label: item?.ten ?? '',
          value: item?.ma ?? '',
        };
      }) ?? [],
    );

    const responseAPIHTDT = await getHinhThucDaoTao();

    setlistHTDT(
      responseAPIHTDT?.data.map((item: any) => {
        return {
          label: item?.ten ?? '',
          value: item?._id,
        };
      }) ?? [],
    );

    setloading(false);
  };

  const initData = () => {
    const listId = [
      'nuocDaoTao',
      'noiDaoTao',
      'trinhDoDaoTaoId',
      'maNganh',
      'thoiGianBatDau',
      'thoiGianKetThuc',
      'hinhThucDaoTaoId',
      'vanBangChungChi',
      'namTotNghiep',
    ];

    listId?.forEach(id => setValue(id, defaultData?.[id]));
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
        nuocDaoTao: data?.nuocDaoTao || null,
        noiDaoTao: data?.noiDaoTao || null,
        trinhDoDaoTaoId: data?.trinhDoDaoTaoId,
        maNganh: data?.maNganh,
        ...(data?.thoiGianBatDau && { thoiGianBatDau: data?.thoiGianBatDau }),
        ...(data?.thoiGianKetThuc && {
          thoiGianKetThuc: data?.thoiGianKetThuc,
        }),
        hinhThucDaoTaoId: data?.hinhThucDaoTaoId,
        vanBangChungChi: data?.vanBangChungChi || null,
        ...(data?.namTotNghiep && {
          namTotNghiep: Number(data?.namTotNghiep),
        }),
        thongTinNhanSuId,
        ...(resupload?.[0]?.url && { fileDinhKem: resupload?.[0]?.url }),
      };

      let res: any;
      if (defaultData?._id) {
        res = await putTrinhDoDaoTao(body, defaultData?._id);
      } else {
        res = await postTrinhDoDaoTao(body);
      }

      setloadingSubmit(false);

      if (res?.status) {
        onRefresh && onRefresh();

        setTimeout(goBack, 500);
      }
    } catch (error) {
      setloadingSubmit(false);
    }
  };

  const onDel = async () => {
    setloadingSubmit(true);

    const res = await delTrinhDoDaoTao(defaultData?._id);

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh();

      setTimeout(goBack, 500);
    }
  };

  if (loading) {
    return (
      <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
        <HeaderReal title="Thông tin trình độ đào tạo" />
        <Box flex={1}>
          <LoadingComponent />
        </Box>
      </Box>
    );
  }

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title="Thông tin trình độ đào tạo"
        childrenRight={defaultData && <BtnXoa onPress={onDel} />}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <InputNBForm
          label="Nước đào tạo"
          defaultValue={defaultData?.nuocDaoTao}
          name={'nuocDaoTao'}
          control={control}
          error={errors?.nuocDaoTao?.message}
        />
        <InputNBForm
          label="Cơ sở đào tạo"
          defaultValue={defaultData?.noiDaoTao}
          name={'noiDaoTao'}
          control={control}
          error={errors?.noiDaoTao?.message}
        />
        <SingleSelectForm
          label="Trình độ"
          defaultValue={defaultData?.trinhDoDaoTaoId}
          data={listTrinhDoDTNS}
          name={'trinhDoDaoTaoId'}
          control={control}
          error={errors?.trinhDoDaoTaoId?.message}
          required
        />
        <SingleSelectForm
          label="Ngành đào tạo"
          defaultValue={defaultData?.maNganh}
          data={listNganh}
          name={'maNganh'}
          control={control}
          error={errors?.maNganh?.message}
        />
        <DatePickerForm
          label={translate('slink:Time_start')}
          defaultValue={defaultData?.thoiGianBatDau}
          error={errors?.thoiGianBatDau?.message}
          mode="date"
          isRequired
          name={'thoiGianBatDau'}
          control={control}
        />
        <DatePickerForm
          defaultValue={defaultData?.thoiGianKetThuc}
          label={translate('slink:Time_end')}
          error={errors?.thoiGianKetThuc?.message}
          mode="date"
          isRequired
          name={'thoiGianKetThuc'}
          control={control}
        />
        <SingleSelectForm
          label="Hình thức đào tạo"
          defaultValue={defaultData?.hinhThucDaoTaoId}
          data={listHTDT}
          name={'hinhThucDaoTaoId'}
          control={control}
          error={errors?.hinhThucDaoTaoId?.message}
          required
        />
        <InputNBForm
          label="Văn bằng được cấp"
          defaultValue={defaultData?.vanBangChungChi}
          name={'vanBangChungChi'}
          control={control}
          error={errors?.vanBangChungChi?.message}
        />
        <InputNBForm
          type={EKieuDuLieu.NUMBER}
          label="Năm tốt nghiệp"
          defaultValue={
            defaultData?.namTotNghiep
              ? String(defaultData?.namTotNghiep)
              : undefined
          }
          name={'namTotNghiep'}
          control={control}
          error={errors?.namTotNghiep?.message}
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

export default ThongTinTrinhDoTable;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: WIDTH(12),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
  },
});
