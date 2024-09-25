/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';

import { WIDTH } from '@common';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import SingleSelectForm from '@components/QuyTrinhDong/component/SingleSelect/SingleSelectForm';
import CuDiDaoTaoBoiDuong from '@features/HoSoNhanSu/Table/DaoTaoBoiDuong/CuDiDaoTaoBoiDuong';
import HocHam from '@features/HoSoNhanSu/Table/DaoTaoBoiDuong/HocHam';
import LyLuanChinhTri from '@features/HoSoNhanSu/Table/DaoTaoBoiDuong/LyLuanChinhTri';
import NgoaiNgu from '@features/HoSoNhanSu/Table/DaoTaoBoiDuong/NgoaiNgu';
import QuanLyHanhChinh from '@features/HoSoNhanSu/Table/DaoTaoBoiDuong/QuanLyHanhChinh';
import QuanLyNhaNuoc from '@features/HoSoNhanSu/Table/DaoTaoBoiDuong/QuanLyNhaNuoc';
import QuocPhongAnNinh from '@features/HoSoNhanSu/Table/DaoTaoBoiDuong/QuocPhongAnNinh';
import TinHoc from '@features/HoSoNhanSu/Table/DaoTaoBoiDuong/TinHoc';
import TrinhDoDaoTao from '@features/HoSoNhanSu/Table/DaoTaoBoiDuong/TrinhDoDaoTao';
import { infomationUserConfig } from '@redux-selector/infoUserTCNS';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

import styles from './styles';

const DATA_TRINH_DO = [
  '12/12',
  '10/12',
  '9/12',
  '8/12',
  '10/10',
  '9/10',
  '7/10',
];

const ThongTinDaoTaoEdit = ({
  control,
  errors,
  setValue,
}: {
  control: any;
  errors: any;
  setValue: any;
}) => {
  const { infoUserTCNS } = useSelector(infomationUserConfig);

  useEffect(() => {
    setValue(
      'trinhDoGiaoDucPhoThongId',
      infoUserTCNS?.trinhDoGiaoDucPhoThongId,
    );

    setValue('soTruongCongTac', infoUserTCNS?.soTruongCongTac);
  }, [infoUserTCNS]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <InfoUser infoUserTCNS={infoUserTCNS} errors={errors} control={control} />
      <HocHam idUser={infoUserTCNS?._id} editVisible />
      <TrinhDoDaoTao idUser={infoUserTCNS?._id} editVisible />
      <LyLuanChinhTri idUser={infoUserTCNS?._id} editVisible />
      <QuanLyHanhChinh idUser={infoUserTCNS?._id} editVisible />
      <QuanLyNhaNuoc idUser={infoUserTCNS?._id} editVisible />
      <NgoaiNgu idUser={infoUserTCNS?._id} editVisible />
      <TinHoc idUser={infoUserTCNS?._id} editVisible />
      <QuocPhongAnNinh idUser={infoUserTCNS?._id} editVisible />
      <CuDiDaoTaoBoiDuong idUser={infoUserTCNS?._id} editVisible />
    </KeyboardAwareScrollView>
  );
};

export default ThongTinDaoTaoEdit;
const InfoUser = (props: any) => {
  const { infoUserTCNS, errors, control } = props;

  return (
    <Box width={WIDTH(351)} alignSelf="center">
      <SingleSelectForm
        label={translate('hoSoNhanSu:trinhDoGiaoDucPhoThongId')}
        data={DATA_TRINH_DO?.map(ite => {
          return { label: ite, value: ite };
        })}
        defaultValue={infoUserTCNS?.trinhDoGiaoDucPhoThongId || undefined}
        name={'trinhDoGiaoDucPhoThongId'}
        control={control}
        error={errors?.trinhDoGiaoDucPhoThongId?.message}
      />
      <InputNBForm
        label={translate('hoSoNhanSu:soTruongCongTac')}
        name={'soTruongCongTac'}
        error={errors?.soTruongCongTac?.message}
        defaultValue={infoUserTCNS?.soTruongCongTac}
        control={control}
      />
    </Box>
  );
};
