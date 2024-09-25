/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import R from '@assets/R';
import BaseButtonNB from '@components/BaseButtonNB';
import BtnXoa from '@components/HoSoNhanSu/Table/BtnXoa/BtnXoa';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import { HEIGHT, WIDTH } from '@config/function';
import HeaderReal from '@libcomponents/header-real';
import { goBack } from '@navigation/navigation-service';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

const ThemMoiDanhSachHocLieu = props => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const defaultData = props?.route?.params?.item;

  const onDelete = props?.route?.params?.onDelete;

  const onSubmitData = props?.route?.params?.onSubmitData;

  useEffect(() => {
    if (defaultData) {
      initData();
    }
  }, []);

  const initData = () => {
    const listId = ['url', 'ten'];

    listId?.forEach(id => setValue(id, defaultData?.[id]));
  };

  const onSubmit = (data: any) => {
    if (onSubmitData) {
      onSubmitData(data);

      goBack();
    }
  };

  const onDel = () => {
    if (onDelete) {
      onDelete();

      goBack();
    }
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title="Thêm mới hoc liệu"
        childrenRight={defaultData && <BtnXoa onPress={onDel} />}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <InputNBForm
          label="Tên học liệu"
          defaultValue={defaultData?.ten}
          name={'ten'}
          control={control}
          error={errors?.ten?.message}
          required
        />
        <InputNBForm
          label="Đường dẫn"
          defaultValue={defaultData?.url}
          name={'url'}
          control={control}
          error={errors?.url?.message}
        />
        <BaseButtonNB
          isLoading={false}
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

export default ThemMoiDanhSachHocLieu;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: WIDTH(12),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
  },
});
