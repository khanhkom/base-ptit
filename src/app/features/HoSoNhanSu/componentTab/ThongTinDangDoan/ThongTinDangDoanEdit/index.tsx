/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';

import { EKieuDuLieu, HEIGHT, WIDTH } from '@common';
import TextLabelTCNS from '@components/BoxHSNS/TextLabelTCNS';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import DatePickerForm from '@components/QuyTrinhDong/component/Time/DatePickerForm';
import { infomationUserConfig } from '@redux-selector/infoUserTCNS';
import { translate } from '@utils/i18n/translate';

const ThongTinDangDoanEdit = (props: any) => {
  const { control, errors, setValue } = props;

  const { infoUserTCNS } = useSelector(infomationUserConfig);

  useEffect(() => {
    iniData();
  }, [infoUserTCNS]);

  const iniData = async () => {
    const listID = [
      'soTheDang',
      'noiVaoDang',
      'ngayVaoDangDuBi',
      'ngayChinhThuc',
      'noiVaoDoan',
      'ngayVaoDoan',
      'ngayNhapNgu',
      'ngayXuatNgu',
      'donViQuanDoi',
      'chucVuQuanDoi',
      'ngayKetNapDanQuanTuVe',
      'ngayHoanThanhNghiaVu',
      'chucDanhDanQuanTuVe',
      'soQuyetDinhHoanThanh',
      'nguoiKyQuyetDinh',
    ];

    listID?.forEach(id => {
      setValue(id, infoUserTCNS?.[id]);
    });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={[styles.contentBox]}>
      <TextLabelTCNS label={translate('hoSoNhanSu:dang')} />
      <InputNBForm
        type={EKieuDuLieu.NUMBER}
        label={translate('hoSoNhanSu:soTheDang')}
        name={'soTheDang'}
        error={errors?.soTheDang?.message}
        defaultValue={infoUserTCNS?.soTheDang}
        control={control}
      />
      <InputNBForm
        label={translate('hoSoNhanSu:noiVaoDang')}
        name={'noiVaoDang'}
        error={errors?.noiVaoDang?.message}
        defaultValue={infoUserTCNS?.noiVaoDang}
        control={control}
      />
      <DatePickerForm
        label={translate('hoSoNhanSu:ngayVaoDangDuBi')}
        error={errors?.ngayVaoDangDuBi?.message}
        mode="date"
        defaultValue={infoUserTCNS?.ngayVaoDangDuBi}
        name={'ngayVaoDangDuBi'}
        control={control}
      />
      <DatePickerForm
        label={translate('hoSoNhanSu:ngayChinhThuc')}
        error={errors?.ngayChinhThuc?.message}
        mode="date"
        defaultValue={infoUserTCNS?.ngayChinhThuc}
        name={'ngayChinhThuc'}
        control={control}
      />
      <TextLabelTCNS label={translate('hoSoNhanSu:doan')} />
      <InputNBForm
        label={translate('hoSoNhanSu:noiVaoDoan')}
        name={'noiVaoDoan'}
        error={errors?.noiVaoDoan?.message}
        defaultValue={infoUserTCNS?.noiVaoDoan}
        control={control}
      />
      <DatePickerForm
        label={translate('hoSoNhanSu:ngayVaoDoan')}
        error={errors?.ngayVaoDoan?.message}
        mode="date"
        defaultValue={infoUserTCNS?.ngayVaoDoan}
        name={'ngayVaoDoan'}
        control={control}
      />
      <TextLabelTCNS label={translate('hoSoNhanSu:quanDoi')} />
      <DatePickerForm
        label={translate('hoSoNhanSu:ngayNhapNgu')}
        error={errors?.ngayNhapNgu?.message}
        mode="date"
        defaultValue={infoUserTCNS?.ngayNhapNgu}
        name={'ngayNhapNgu'}
        control={control}
      />
      <DatePickerForm
        label={translate('hoSoNhanSu:ngayXuatNgu')}
        error={errors?.ngayXuatNgu?.message}
        mode="date"
        defaultValue={infoUserTCNS?.ngayXuatNgu}
        name={'ngayXuatNgu'}
        control={control}
      />
      <InputNBForm
        label={translate('hoSoNhanSu:donViQuanDoi')}
        name={'donViQuanDoi'}
        error={errors?.donViQuanDoi?.message}
        defaultValue={infoUserTCNS?.donViQuanDoi}
        control={control}
      />
      <InputNBForm
        label={translate('hoSoNhanSu:chucVuQuanDoi')}
        name={'chucVuQuanDoi'}
        error={errors?.chucVuQuanDoi?.message}
        defaultValue={infoUserTCNS?.chucVuQuanDoi}
        control={control}
      />
      <TextLabelTCNS label={translate('hoSoNhanSu:nghiaVu')} />
      <DatePickerForm
        label={translate('hoSoNhanSu:ngayKetNapDanQuanTuVe')}
        error={errors?.ngayKetNapDanQuanTuVe?.message}
        mode="date"
        defaultValue={infoUserTCNS?.ngayKetNapDanQuanTuVe}
        name={'ngayKetNapDanQuanTuVe'}
        control={control}
      />
      <DatePickerForm
        label={translate('hoSoNhanSu:ngayHoanThanhNghiaVu')}
        error={errors?.ngayHoanThanhNghiaVu?.message}
        mode="date"
        defaultValue={infoUserTCNS?.ngayHoanThanhNghiaVu}
        name={'ngayHoanThanhNghiaVu'}
        control={control}
      />
      <InputNBForm
        label={translate('hoSoNhanSu:chucDanhDanQuanTuVe')}
        name={'chucDanhDanQuanTuVe'}
        error={errors?.chucDanhDanQuanTuVe?.message}
        defaultValue={infoUserTCNS?.chucDanhDanQuanTuVe}
        control={control}
      />
      <InputNBForm
        label={translate('hoSoNhanSu:soQuyetDinhHoanThanh')}
        type={EKieuDuLieu.NUMBER}
        name={'soQuyetDinhHoanThanh'}
        error={errors?.soQuyetDinhHoanThanh?.message}
        defaultValue={infoUserTCNS?.soQuyetDinhHoanThanh}
        control={control}
      />
      <InputNBForm
        label={translate('hoSoNhanSu:nguoiKyQuyetDinh')}
        name={'nguoiKyQuyetDinh'}
        error={errors?.nguoiKyQuyetDinh?.message}
        defaultValue={infoUserTCNS?.nguoiKyQuyetDinh}
        control={control}
      />
    </KeyboardAwareScrollView>
  );
};

export default ThongTinDangDoanEdit;

const styles = StyleSheet.create({
  contentBox: {
    paddingBottom: HEIGHT(30),
    paddingHorizontal: WIDTH(12),
  },
});
