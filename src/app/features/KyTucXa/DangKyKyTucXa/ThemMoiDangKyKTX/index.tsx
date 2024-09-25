/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { DevSettings, StyleSheet } from 'react-native';

import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';

import R from '@assets/R';
import { EKieuDuLieu, HEIGHT, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import SingleSelectForm from '@components/QuyTrinhDong/component/SingleSelect/SingleSelectForm';
import DatePickerForm from '@components/QuyTrinhDong/component/Time/DatePickerForm';
import UploadFileForm from '@components/QuyTrinhDong/component/UploadFileQuyTrinh/UploadfileForm';
import HeaderReal from '@libcomponents/header-real';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Box } from 'native-base';

const ThemMoiDangKyKTX = () => {
  const { account } = useSelector(selectAppConfig);

  const [loadingSubmit, setloadingSubmit] = useState(false);

  useEffect(() => {
    initValue();
  }, []);

  const initValue = async () => {
    setValue('maCanBo', account?.maCanBo);

    setValue('hoDem', account?.hoDem);

    setValue('ten', account?.ten);

    setValue('tenGoiKhac', account?.tenGoiKhac);

    setValue('ngaySinh', account?.ngaySinh);

    setValue('gioiTinh', account?.gioiTinh);

    setValue('emailCanBo', account?.emailCanBo);

    setValue('email', account?.email);

    setValue('sdtCaNhan', account?.sdtCaNhan);

    setValue('trangThai', account?.trangThai);

    setValue('cccdCMND', account?.cccdCMND);

    setValue('ngayCap', account?.ngayCap);

    setValue('noiCap', account?.noiCap);

    setValue('loaiCanBoGiangVien', account?.loaiCanBoGiangVien);

    setValue('soHieuVienChuc', account?.soHieuVienChuc);
  };

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = value => {};

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Dorm_register')} />
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Box width={WIDTH(351)} alignSelf="center">
          <InputNBForm
            label={'Họ và tên'}
            name={'hoTen'}
            error={errors?.maCanBo?.message}
            defaultValue={account?.fullname}
            control={control}
            required
            // isDisabled={true}
          />
          <SingleSelectForm
            label={translate('slink:Gender')}
            data={[
              { label: translate('hoSoNhanSu:male'), value: 'Nam' },
              { label: translate('hoSoNhanSu:female'), value: 'Nữ' },
            ]}
            defaultValue={account?.gioiTinh}
            name={'gioiTinh'}
            control={control}
            error={errors?.gioiTinh?.message}
            required
          />
          <DatePickerForm
            label={'Ngày tháng năm sinh'}
            error={errors?.ngaySinh?.message}
            mode="date"
            defaultValue={account?.ngaySinh}
            name={'ngaySinh'}
            control={control}
            customContainerStyle={{ marginTop: HEIGHT(12) }}
            isRequired
          />
          <InputNBForm
            label={'Quê quán'}
            name={'hoDem'}
            error={errors?.hoDem?.message}
            defaultValue={account?.queQuan}
            control={control}
            // textArea
            required
          />
          <InputNBForm
            label={'Số CCCD/CMND'}
            name={'cccdCMND'}
            error={errors?.cccdCMND?.message}
            defaultValue={account?.cccd}
            control={control}
            required
            type={EKieuDuLieu.NUMBER}
          />
          <DatePickerForm
            label={'Ngày cấp'}
            error={errors?.ngaySinh?.message}
            mode="date"
            defaultValue={account?.ngayCapCccd ?? new Date()}
            name={'ngaySinh'}
            control={control}
            customContainerStyle={{ marginTop: HEIGHT(12) }}
            isRequired
          />
          <InputNBForm
            label={'Nơi cấp'}
            name={'hoDem'}
            error={errors?.hoDem?.message}
            defaultValue={account?.noiCapCccd}
            control={control}
            required
          />
          <InputNBForm
            label={'Hộ khẩu thường trú'}
            name={'hoDem'}
            error={errors?.hoDem?.message}
            defaultValue={account?.hoKhauThuongTru}
            control={control}
            required
            textArea
          />
          <InputNBForm
            label={'Là SV Lớp'}
            name={'tenGoiKhac'}
            error={errors?.tenGoiKhac?.message}
            required
            defaultValue={account?.lopHanhChinhList?.[0]?.ten ?? ''}
            //Lấy lớp đầu tiên
            control={control}
          />
          <InputNBForm
            label={'Khoa (ngành)'}
            name={'sdtCaNhan'}
            error={errors?.sdtCaNhan?.message}
            defaultValue={account?.nganh?.ten}
            required
            control={control}
          />
          <InputNBForm
            label={'Khoá'}
            name={'tenGoiKhac'}
            error={errors?.tenGoiKhac?.message}
            defaultValue={account?.khoaSinhVien?.ten}
            required
            control={control}
          />
          <InputNBForm
            label={'Mã số HSSV'}
            defaultValue={account?.ma}
            name={'trangThai'}
            control={control}
            error={errors?.trangThai?.message}
          />
          <InputNBForm
            label={'Đối tượng ưu tiên ở nội trú'}
            // defaultValue={'3'}
            name={'trangThai'}
            control={control}
            error={errors?.trangThai?.message}
          />
          <InputNBForm
            label={'Điện thoại liên hệ'}
            defaultValue={account?.soDienThoai}
            name={'trangThai'}
            control={control}
            error={errors?.trangThai?.message}
            type={EKieuDuLieu.NUMBER}
            required
          />
          <InputNBForm
            label={translate('slink:Email')}
            defaultValue={account?.email}
            name={'trangThai'}
            control={control}
            error={errors?.trangThai?.message}
            required
          />
          <InputNBForm
            label={'Khi cần báo tin cho'}
            // defaultValue={'3'}
            name={'trangThai'}
            control={control}
            error={errors?.trangThai?.message}
            required
          />
          <InputNBForm
            label={'Điện thoại'}
            // defaultValue={'3'}
            name={'trangThai'}
            control={control}
            error={errors?.trangThai?.message}
            type={EKieuDuLieu.NUMBER}
            required
          />
          <InputNBForm
            label={translate('slink:Address')}
            name={'hoDem'}
            error={errors?.hoDem?.message}
            // defaultValue={'2'}
            control={control}
            required
            textArea
          />
          <SingleSelectForm
            label={'Nơi nội chú'}
            data={[
              { label: 'Nhà A1', value: 'A1' },
              { label: 'Nhà A2', value: 'A2' },
            ]}
            // defaultValue={account?.gioiTinh}
            name={'gioiTinh'}
            control={control}
            error={errors?.gioiTinh?.message}
            required
          />
          <DatePickerForm
            label={'Ngày bắt đầu nội trú'}
            error={errors?.ngaySinh?.message}
            mode="date"
            name={'ngaySinh'}
            control={control}
            customContainerStyle={{ marginTop: HEIGHT(12) }}
            isRequired
          />
          <UploadFileForm
            name={'fileDinhKem'}
            // arrayFile={[]}
            singleType
            error={errors?.fileDinhKem?.message}
            control={control}
            label={'Minh chứng'}
            required
          />

          <BaseButtonNB
            isLoading={loadingSubmit}
            isLoadingText={translate('slink:Loading')}
            width={WIDTH(140)}
            title={translate('slink:Add')}
            onPress={handleSubmit(onSubmit)}
          />
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default ThemMoiDangKyKTX;
const styles = StyleSheet.create({
  container: {
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(100),
  },
});
