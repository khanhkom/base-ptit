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
import MultiSelectForm from '@components/QuyTrinhDong/component/MultiSelectForm';
import NhanSuMultiSelect from '@components/QuyTrinhDong/component/MultiSelectForm/ElementSelect';
import TCNSCanBo from '@components/QuyTrinhDong/component/TCNSCanBo';
import DatePickerForm from '@components/QuyTrinhDong/component/Time/DatePickerForm';
import { HEIGHT, WIDTH } from '@config/function';
import HeaderReal from '@libcomponents/header-real';
import { goBack } from '@navigation/navigation-service';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

const ThemMoiDanhSachLamThem = props => {
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
    const listId = [
      'lamThemVaoLuc',
      'congViecLamThem',
      'ngayLamThem',
      'nguoiGiaoViec',
    ];

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
        title="Thêm mới công việc"
        childrenRight={defaultData && <BtnXoa onPress={onDel} />}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <DatePickerForm
          label={'Ngày làm thêm'}
          defaultValue={defaultData?.ngayLamThem}
          error={errors?.ngayLamThem?.message}
          mode="date"
          isRequired
          name={'ngayLamThem'}
          control={control}
        />
        <MultiSelectForm
          label="Làm thêm vào lúc"
          defaultValue={defaultData?.lamThemVaoLuc ?? []}
          data={listTimePick()}
          name={'lamThemVaoLuc'}
          control={control}
          error={errors?.lamThemVaoLuc?.message}
          required
          // numOfRow={3}
        />
        <InputNBForm
          label="Công việc làm thêm"
          defaultValue={defaultData?.congViecLamThem}
          name={'congViecLamThem'}
          control={control}
          error={errors?.congViecLamThem?.message}
          textArea
          required
        />
        {/* <NhanSuMultiSelect
          defaultValue={defaultData?.nguoiGiaoViec}
          label={'Người giao việc'}
          placeholder="Chọn cán bộ, giảng viên (tìm kiếm theo họ tên)"
          name={'nguoiGiaoViec'}
          control={control}
          error={errors?.nguoiGiaoViec?.message}
          required
          maxSelect={1}
        /> */}
        <TCNSCanBo
          defaultValue={defaultData?.nguoiGiaoViec}
          error={errors?.nguoiGiaoViec?.message}
          label={'Người giao việc'}
          onChange={value => {
            setValue('nguoiGiaoViec', value);
          }}
          required={true}
          placeholder="Chọn cán bộ"
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

export default ThemMoiDanhSachLamThem;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: WIDTH(12),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
  },
});

const listTimePick = () => {
  const listData: any = [];

  for (let i = 0; i < 24; i++) {
    listData.push({
      label: `Từ ${i} đến ${i + 1} giờ`,
      value: `Từ ${i} giờ đến ${i + 1} giờ`,
    });
  }

  return listData;
};
