/* eslint-disable react-hooks/exhaustive-deps */
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
import { HEIGHT, WIDTH } from '@config/function';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { goBack } from '@navigation/navigation-service';
import {
  delQuanLyNhaNuoc,
  getDSTrinhDoQuanLyNN,
  getHinhThucDaoTao,
  postQuanLyNhaNuoc,
  putQuanLyNhaNuoc,
  uploadDocument,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

import BtnXoa from '../../BtnXoa/BtnXoa';

const TEXT_CHECKBOX = 'Là trình độ chính';

const QuanLyNhaNuocTable = props => {
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

  useEffect(() => {
    if (defaultData) {
      initData();
    }
  }, []);

  const [listHTDT, setlistHTDT] = useState([]);

  const [listLLCT, setlistLLCT] = useState([]);

  const [loading, setloading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setloading(true);

    const responseAPIHTDT = await getHinhThucDaoTao();

    setlistHTDT(
      responseAPIHTDT?.data.map((item: any) => {
        return {
          label: item?.ten ?? '',
          value: item?._id,
        };
      }) ?? [],
    );

    const responseAPILLCT = await getDSTrinhDoQuanLyNN();

    setlistLLCT(
      responseAPILLCT?.data?.map((item: any) => {
        return {
          label: item?.ten ?? '',
          value: item?._id ?? '',
        };
      }) ?? [],
    );

    setloading(false);
  };

  const initData = () => {
    const listId = [
      'thoiGianBatDau',
      'thoiGianKetThuc',
      'hinhThucDaoTaoId',
      'vanBangChungChi',
      'trinhDoQuanLyNhaNuocId',
      'coSoDaoTao',
    ];

    listId?.forEach(id => setValue(id, defaultData?.[id]));

    setValue('apDung', defaultData?.apDung ? [TEXT_CHECKBOX] : []);
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
      ...(data?.thoiGianBatDau && { thoiGianBatDau: data?.thoiGianBatDau }),
      ...(data?.thoiGianKetThuc && { thoiGianKetThuc: data?.thoiGianKetThuc }),
      hinhThucDaoTaoId: data?.hinhThucDaoTaoId,
      trinhDoQuanLyNhaNuocId: data?.trinhDoQuanLyNhaNuocId || null,
      vanBangChungChi: data?.vanBangChungChi || null,
      coSoDaoTao: data?.coSoDaoTao || null,
      apDung: data?.apDung?.includes(TEXT_CHECKBOX),
      thongTinNhanSuId,
      ...(resupload?.[0]?.url && { fileDinhKem: resupload?.[0]?.url }),
    };

    let res: any;
    if (defaultData?._id) {
      res = await putQuanLyNhaNuoc(body, defaultData?._id);
    } else {
      res = await postQuanLyNhaNuoc(body);
    }

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh();

      setTimeout(goBack, 500);
    }
  };

  const onDel = async () => {
    setloadingSubmit(true);

    const res = await delQuanLyNhaNuoc(defaultData?._id);

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh();

      setTimeout(goBack, 500);
    }
  };

  if (loading) {
    return (
      <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
        <HeaderReal title="Trình độ quản lý nhà nước" />
        <Box flex={1}>
          <LoadingComponent />
        </Box>
      </Box>
    );
  }

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title="Trình độ quản lý nhà nước"
        childrenRight={defaultData && <BtnXoa onPress={onDel} />}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <DatePickerForm
          label={translate('slink:Time_start')}
          defaultValue={defaultData?.thoiGianBatDau}
          error={errors?.thoiGianBatDau?.message}
          mode="date"
          name={'thoiGianBatDau'}
          control={control}
        />
        <DatePickerForm
          defaultValue={defaultData?.thoiGianKetThuc}
          label={translate('slink:Time_end')}
          error={errors?.thoiGianKetThuc?.message}
          mode="date"
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
        <SingleSelectForm
          label="Trình độ quản lý nhà nước"
          defaultValue={defaultData?.trinhDoQuanLyNhaNuocId}
          data={listLLCT}
          name={'trinhDoQuanLyNhaNuocId'}
          control={control}
          error={errors?.trinhDoQuanLyNhaNuocId?.message}
          required
        />
        <InputNBForm
          label="Văn bằng/Chứng chỉ/Chứng nhận được cấp"
          defaultValue={defaultData?.vanBangChungChi}
          name={'vanBangChungChi'}
          control={control}
          error={errors?.vanBangChungChi?.message}
        />
        <InputNBForm
          label="Cơ sở đào tạo"
          defaultValue={defaultData?.coSoDaoTao}
          name={'coSoDaoTao'}
          required
          control={control}
          error={errors?.coSoDaoTao?.message}
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
        <MultiChoiceForm
          error={errors?.apDung?.message}
          defaultValue={defaultData?.apDung ? [TEXT_CHECKBOX] : []}
          name={'apDung'}
          control={control}
          data={[{ label: TEXT_CHECKBOX, value: TEXT_CHECKBOX }]}
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

export default QuanLyNhaNuocTable;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: WIDTH(12),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
  },
});
