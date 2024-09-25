/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import R from '@assets/R';
import { EKieuDuLieu, getFontSize, HEIGHT, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import SingleSelectForm from '@components/QuyTrinhDong/component/SingleSelect/SingleSelectForm';
import DatePickerForm from '@components/QuyTrinhDong/component/Time/DatePickerForm';
import { PhongHopProps } from '@features/VanPhongSo/LichTuanHocVien/Tab/AddNewCalendar/type';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { goBack } from '@navigation/navigation-service';
import { dangKyDayBu, getListNhanSu } from '@networking/user';
import { getPhongHopMany } from '@networking/user/LichTuan';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Box, HStack, Text, VStack } from 'native-base';

import { BuoiHocProp, NhanSuGiangVienProp } from './type';
interface Props {
  route: { params: { dataBuoiHoc: BuoiHocProp; title: string } };
}
const DangKyDayBu = (props: any) => {
  const dataBuoiHoc = props?.route?.params?.dataBuoiHoc;

  const title = props?.route?.params?.title;

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [loadingSubmit, setloadingSubmit] = useState(false);

  const [loading, setloading] = useState(false);

  const watchValues = watch();

  const soTiet = dataBuoiHoc?.tietKetThuc - dataBuoiHoc?.tietBatDau;

  const [listPhong, setlistPhong] = useState<PhongHopProps[]>([]);

  const [listGV, setlistGV] = useState<NhanSuGiangVienProp[]>([]);

  const tietKetThucMoi = watchValues?.tietBatDauMoi
    ? Number(watchValues?.tietBatDauMoi) + soTiet
    : '--';

  useEffect(() => {
    getInitAPI();
  }, []);

  const soTietToiDa = 17;

  const getInitAPI = async () => {
    setloading(true);

    const body = {
      condition: { trangThai: 'Hoạt động' },
    };

    const responsePhongHop = await getPhongHopMany(body);

    setlistPhong(responsePhongHop?.data?.data || []);

    const bodyGV = {
      condition: { lopHocPhanId: dataBuoiHoc?.lopHocPhan?._id ?? '' },
    };

    const reponseGV = await getListNhanSu(bodyGV);

    setlistGV(reponseGV?.data?.data ?? []);

    setValue('maPhongHocMoi', dataBuoiHoc?.phongHoc);

    setValue('nhanSuSsoIdMoi', dataBuoiHoc?.nhanSuSsoId);

    setloading(false);
  };

  const onSubmit = async () => {
    setloadingSubmit(true);

    const gvNew = listGV?.find(
      gv => gv.nhanSuSsoId === watchValues?.nhanSuSsoIdMoi,
    );

    const bodySubmit = {
      idTkb: dataBuoiHoc?._id,
      lyDoDuyet: watchValues?.lyDoDuyet || '',
      maPhongHocMoi: watchValues?.maPhongHocMoi || '',
      ngayMoi: watchValues?.ngayMoi || '',
      nhanSuSsoIdMoi: watchValues?.nhanSuSsoIdMoi || '',
      tenNhanSuMoi: gvNew?.tenNhanSu || '',
      tietBatDauMoi: Number(watchValues?.tietBatDauMoi || ''),
      tietKetThucMoi: Number(tietKetThucMoi || ''),
    };

    const response = await dangKyDayBu(bodySubmit);

    setloadingSubmit(false);

    if (response?.status) {
      setTimeout(goBack, 500);
    }
  };

  if (loading) {
    return (
      <VStack flex={1} backgroundColor={R.colors.backgroundColorNew}>
        <HeaderReal title={translate('slink:Dang_ky_hoan_lich_day_bu')} />
        <VStack flex={1}>
          <ItemThongTinBuoiHoc infoCard={dataBuoiHoc} title={title} />
          <LoadingComponent />
        </VStack>
      </VStack>
    );
  }

  return (
    <VStack flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Dang_ky_hoan_lich_day_bu')} />
      <ItemThongTinBuoiHoc infoCard={dataBuoiHoc} title={title} />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <DatePickerForm
          label={translate('slink:Ngay_day_bu')}
          mode="date"
          isRequired
          placeholder={translate('slink:Chon_thoi_diem')}
          error={errors?.ngayMoi?.message}
          name={'ngayMoi'}
          control={control}
        />
        <InputNBForm
          label={translate('slink:Tiet_bat_dau')}
          name={'tietBatDauMoi'}
          placeholder={translate('slink:Tiet_bat_dau')}
          error={errors?.tietBatDauMoi?.message}
          control={control}
          max={soTietToiDa - soTiet}
          required
          type={EKieuDuLieu.NUMBER}
        />
        <InputNBForm
          defaultValue={`${tietKetThucMoi}`}
          label={translate('slink:Tiet_ket_thuc')}
          name={'tietKetThuc'}
          error={errors?.tietKetThucMoi?.message}
          placeholder={translate('slink:Tiet_ket_thuc')}
          control={control}
          isDisabled
          type={EKieuDuLieu.NUMBER}
        />
        <SingleSelectForm
          label={translate('slink:Classroom')}
          data={listPhong?.map(item => {
            return {
              label: `${item?.ten} (${item?.ma || '--'})`,
              value: item?.ma,
            };
          })}
          defaultValue={dataBuoiHoc?.phongHoc}
          placeholder={translate('slink:Chon_phong_hoc')}
          name={'maPhongHocMoi'}
          control={control}
          error={errors?.maPhongHocMoi?.message}
          required
        />
        <SingleSelectForm
          label={translate('slink:Teacher')}
          data={listGV?.map(item => {
            return {
              label: `${item?.tenNhanSu} - ${item?.maNhanSu}`,
              value: item?.nhanSuSsoId,
            };
          })}
          defaultValue={`${dataBuoiHoc?.nhanSuSsoId}`}
          placeholder={translate('slink:Chon_giang_vien')}
          name={'nhanSuSsoIdMoi'}
          control={control}
          error={errors?.nhanSuSsoIdMoi?.message}
          required
        />
        <InputNBForm
          label={translate('slink:Ly_do_hoan_lich')}
          name={'lyDoDuyet'}
          error={errors?.lyDoDuyet?.message}
          placeholder={translate('slink:Ly_do_hoan_lich')}
          control={control}
          textArea
          required
          type={EKieuDuLieu.TEXT}
        />
        <BaseButtonNB
          isLoading={loadingSubmit}
          isLoadingText={translate('slink:Loading')}
          width={WIDTH(140)}
          title={translate('slink:Register')}
          onPress={handleSubmit(onSubmit)}
        />
      </KeyboardAwareScrollView>
    </VStack>
  );
};

export default DangKyDayBu;
const ItemThongTinBuoiHoc = (props: {
  infoCard: BuoiHocProp;
  title: string;
}) => {
  const { infoCard, title } = props;

  const thoiGianBatDau = infoCard?.thoiGianBatDau
    ? moment(infoCard?.thoiGianBatDau).format('HH:mm')
    : '--';

  const thoiGianKetThuc = infoCard?.thoiGianKetThuc
    ? moment(infoCard?.thoiGianKetThuc).format('HH:mm')
    : '--';

  return (
    <Box
      alignItems="center"
      backgroundColor="white"
      pt={HEIGHT(24)}
      pb={HEIGHT(16)}
      borderRadius={WIDTH(8)}
      px={WIDTH(16)}
      flexDirection="column">
      <Text
        fontSize={getFontSize(16)}
        fontFamily={R.fonts.BeVietnamProMedium}
        mb={HEIGHT(8)}>
        {infoCard?.lopHocPhan?.hocPhan?.ten || translate('slink:Chua_cap_nhat')}
      </Text>
      <Text
        textAlign="center"
        marginBottom={HEIGHT(12)}
        fontSize={getFontSize(14)}
        fontFamily={R.fonts.BeVietnamProRegular}
        color={R.colors.grayText}>
        {infoCard?.tenLopHocPhan || translate('slink:Chua_cap_nhat')}
      </Text>
      <View style={styles.line} />
      <HStack
        width={WIDTH(343)}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text
          fontFamily={R.fonts.BeVietnamProRegular}
          fontSize={getFontSize(14)}
          color={R.colors.grayText}>
          {title || translate('slink:Chua_cap_nhat')}
        </Text>
        <Text
          fontFamily={R.fonts.BeVietnamProRegular}
          fontSize={getFontSize(14)}
          color={
            R.colors.grayText
          }>{`${thoiGianBatDau} - ${thoiGianKetThuc}`}</Text>
      </HStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  line: {
    height: WIDTH(1),
    width: WIDTH(160),
    backgroundColor: 'rgba(171, 171, 171, 0.4)',
    marginBottom: HEIGHT(12),
  },
  content: {
    paddingHorizontal: WIDTH(12),
    paddingTop: HEIGHT(16),
    paddingBottom: HEIGHT(30),
  },
});
