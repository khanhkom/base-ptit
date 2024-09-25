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
import { HEIGHT, WIDTH } from '@config/function';
import HeaderReal from '@libcomponents/header-real';
import { goBack } from '@navigation/navigation-service';
import {
  delDoiTuongChinhSach,
  postDoiTuongChinhSach,
  putDoiTuongChinhSach,
  uploadDocument,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

import BtnXoa from '../../BtnXoa/BtnXoa';

const DoiTuongChinhSachTable = props => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [loadingSubmit, setloadingSubmit] = useState(false);

  const thongTinNhanSuId = props?.route?.params?.idUser;

  const onRefresh = props?.route?.params?.onRefresh;

  const defaultData = props?.route?.params?.item;

  useEffect(() => {
    if (defaultData) {
      initData();
    }
  }, []);

  const initData = () => {
    setValue('doiTuongChinhSach', defaultData?.doiTuongChinhSach);

    setValue('tuNgay', defaultData?.tuNgay);

    setValue('denNgay', defaultData?.denNgay);

    setValue('ghiChu', defaultData?.ghiChu);
  };

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
      ...(data?.doiTuongChinhSach && {
        doiTuongChinhSach: data?.doiTuongChinhSach,
      }),
      ...(data?.tuNgay && {
        tuNgay: data?.tuNgay,
      }),
      ...(data?.denNgay && {
        denNgay: data?.denNgay,
      }),
      ghiChu: data?.ghiChu || null,
      thongTinNhanSuId,
      ...(resupload?.[0]?.url && { urlFileUpload: resupload?.[0]?.url }),
    };

    let res: any;
    if (defaultData?._id) {
      res = await putDoiTuongChinhSach(body, defaultData?._id);
    } else {
      res = await postDoiTuongChinhSach(body);
    }

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh?.();

      setTimeout(goBack, 500);
    }
  };

  const onDel = async () => {
    setloadingSubmit(true);

    const res = await delDoiTuongChinhSach(defaultData?._id);

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh();

      setTimeout(goBack, 500);
    }
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title={translate('hoSoNhanSu:doiTuongChinhSach')}
        childrenRight={defaultData && <BtnXoa onPress={onDel} />}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <SingleSelectForm
          label={translate('hoSoNhanSu:doiTuongChinhSach')}
          data={DATA_DOI_TUONG?.map(item => {
            return { label: item, value: item };
          })}
          defaultValue={defaultData?.doiTuongChinhSach}
          name={'doiTuongChinhSach'}
          control={control}
          error={errors?.doiTuongChinhSach?.message}
          required
        />
        <DatePickerForm
          label={translate('slink:FromDate')}
          error={errors?.tuNgay?.message}
          mode="date"
          isRequired
          defaultValue={defaultData?.tuNgay}
          name={'tuNgay'}
          control={control}
        />
        <DatePickerForm
          label={translate('slink:ToDate')}
          error={errors?.denNgay?.message}
          mode="date"
          defaultValue={defaultData?.denNgay}
          name={'denNgay'}
          control={control}
        />
        <InputNBForm
          label={translate('slink:Note')}
          textArea
          error={errors?.ghiChu?.message}
          defaultValue={defaultData?.ghiChu}
          name={'ghiChu'}
          control={control}
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

export default DoiTuongChinhSachTable;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: WIDTH(12),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
  },
});

const DATA_DOI_TUONG = [
  'Anh hùng lực lượng vũ trang',
  'Anh hùng lao động',
  'Thương binh',
  'Con của liệt sỹ',
  'Con của thương binh',
  'Con của bệnh binh',
  'Con của người hưởng chính sách',
];
