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
import DatePickerForm from '@components/QuyTrinhDong/component/Time/DatePickerForm';
import UploadFileForm from '@components/QuyTrinhDong/component/UploadFileQuyTrinh/UploadfileForm';
import { HEIGHT, WIDTH } from '@config/function';
import HeaderReal from '@libcomponents/header-real';
import { goBack } from '@navigation/navigation-service';
import {
  delQuocPhong,
  postQuocPhong,
  putQuocPhong,
  uploadDocument,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

import BtnXoa from '../../BtnXoa/BtnXoa';

const TEXT_CHECKBOX = 'Là trình độ chính';

const QuocPhongAnNinhTable = props => {
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

  const initData = () => {
    const listId = [
      'thoiGianBatDau',
      'thoiGianKetThuc',
      'vanBangChungChi',
      'coSoDaoTao',
    ];

    listId?.forEach(id => setValue(id, defaultData?.[id]));

    // setValue('apDung', defaultData?.apDung ? [TEXT_CHECKBOX] : []);
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
      vanBangChungChi: data?.vanBangChungChi || null,
      coSoDaoTao: data?.coSoDaoTao || null,
      // apDung: data?.apDung?.includes(TEXT_CHECKBOX),
      thongTinNhanSuId,
      ...(resupload?.[0]?.url && { fileDinhKem: resupload?.[0]?.url }),
    };

    let res: any;
    if (defaultData?._id) {
      res = await putQuocPhong(body, defaultData?._id);
    } else {
      res = await postQuocPhong(body);
    }

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh();

      setTimeout(goBack, 500);
    }
  };

  const onDel = async () => {
    setloadingSubmit(true);

    const res = await delQuocPhong(defaultData?._id);

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh();

      setTimeout(goBack, 500);
    }
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title="Bồi dưỡng quốc phòng an ninh"
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
        {/* <SingleSelectForm
          label="Hình thức đào tạo"
          defaultValue={defaultData?.hinhThucDaoTaoId}
          data={listHTDT}
          name={'hinhThucDaoTaoId'}
          control={control}
          error={errors?.hinhThucDaoTaoId?.message}
          required
        /> */}
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
        {/* <MultiChoiceForm
          error={errors?.apDung?.message}
          defaultValue={defaultData?.apDung ? [TEXT_CHECKBOX] : []}
          name={'apDung'}
          control={control}
          data={[{ label: TEXT_CHECKBOX, value: TEXT_CHECKBOX }]}
        /> */}
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

export default QuocPhongAnNinhTable;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: WIDTH(12),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
  },
});
