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
import { LOAI_QUYET_DINH_TCNS } from '@config/constant';
import { HEIGHT, WIDTH } from '@config/function';
import HeaderReal from '@libcomponents/header-real';
import { goBack } from '@navigation/navigation-service';
import {
  delQuaTrinhCongTac,
  postQuaTrinhCongTac,
  putQuaTrinhCongTac,
  uploadDocument,
} from '@networking/user';
import { Box } from 'native-base';

import BtnXoa from '../../BtnXoa/BtnXoa';
import { translate } from '@utils/i18n/translate';

const QuaTrinhCongTacTable = props => {
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
    setValue('chucDanh', defaultData?.chucDanh);

    setValue('chucVu', defaultData?.chucVu);

    setValue('loaiQuyetDinh', defaultData?.loaiQuyetDinh);

    setValue('denThangNam', defaultData?.denThangNam);

    setValue('donViCongTac', defaultData?.donViCongTac);

    setValue('noiDung', defaultData?.noiDung);

    setValue('tuThagNam', defaultData?.tuThagNam);
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
      chucDanh: data?.chucDanh,
      chucVu: data?.chucVu,
      loaiQuyetDinh: data?.loaiQuyetDinh,
      denThangNam: data?.denThangNam,
      tuThagNam: data?.tuThagNam,
      donViCongTac: data?.donViCongTac,
      noiDung: data?.noiDung,
      thongTinNhanSuId,
      ...(resupload?.[0]?.url && { fileDinhKem: resupload?.[0]?.url }),
    };

    let res: any;
    if (defaultData?._id) {
      res = await putQuaTrinhCongTac(body, defaultData?._id);
    } else {
      res = await postQuaTrinhCongTac(body);
    }

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh?.();

      setTimeout(goBack, 500);
    }
  };

  const onDel = async () => {
    setloadingSubmit(true);

    const res = await delQuaTrinhCongTac(defaultData?._id);

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh();

      setTimeout(goBack, 500);
    }
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title={translate('hoSoNhanSu:quaTrinhCongTac')}
        childrenRight={defaultData && <BtnXoa onPress={onDel} />}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <SingleSelectForm
          label={translate('slink:Type_of_decision')}
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
          label={translate('slink:From_month_year')}
          isRequired
          error={errors?.tuThagNam?.message}
          defaultValue={defaultData?.tuThagNam}
          mode="date"
          name={'tuThagNam'}
          control={control}
        />
        <DatePickerForm
          label={translate('slink:To_month_year')}
          error={errors?.denThangNam?.message}
          defaultValue={defaultData?.denThangNam}
          mode="date"
          name={'denThangNam'}
          control={control}
        />
        <InputNBForm
          label={translate('slink:Place_of_work')}
          name={'donViCongTac'}
          required
          defaultValue={defaultData?.donViCongTac}
          control={control}
          error={errors?.donViCongTac?.message}
        />
        <InputNBForm
          label={translate('hoSoNhanSu:chucDanh')}
          name={'chucDanh'}
          defaultValue={defaultData?.chucDanh}
          control={control}
          error={errors?.chucDanh?.message}
        />
        <InputNBForm
          label={translate('slink:Position_of_work')}
          name={'chucVu'}
          defaultValue={defaultData?.chucVu}
          control={control}
          error={errors?.chucVu?.message}
        />
        <InputNBForm
          label={translate('slink:Content')}
          textArea
          name={'noiDung'}
          defaultValue={defaultData?.noiDung}
          control={control}
          error={errors?.noiDung?.message}
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

export default QuaTrinhCongTacTable;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: WIDTH(12),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
  },
});
