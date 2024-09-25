import React, { useEffect, useState } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';

import R from '@assets/R';
import {
  ELoaiHocPhanDangKyTinChi,
  ETrangThaiDangKyTinChi,
  ETrangThaiLopHocPhan,
  HEIGHT,
} from '@common';
import { DSKhoaNganhProps } from '@components/HeaderSongNganh/type';
import { HocKyProps } from '@components/SelectHocKy/type';
import HeaderReal from '@libcomponents/header-real';
import { getDotDangKyMe, getKhoaNganh } from '@networking/user';
import {
  getDotDangKyTC,
  getDSMonHocByHK,
  getMucThuHocPhiTheoNam,
} from '@networking/user/DangKyTinChi';
import { translate } from '@utils/i18n/translate';
import { Box, ScrollView } from 'native-base';

import ChangeSemester from './component/ChangeSemester';
import ModalThongTin from './component/ModalThongTin';
import DanhSachSelect from './DanhSachSelect';
import ThongTinDangKyTinChi from './ThongTinDangKy';
import {
  DotDangKyTCProps,
  DotDKTCMeProps,
  LopHocPhanDKTCProps,
  MucThuMeProps,
} from './type';

const DangKyTinChiSinhVien = () => {
  const [visible, setvisible] = useState(false);

  const [maHocKy, setmaHocKy] = useState('');

  const [loading, setloading] = useState(true);

  const [infoHocKy, setinfoHocKy] = useState<HocKyProps>();

  const [dotDangKyTC, setdotDangKyTC] = useState<DotDangKyTCProps>();

  const [khoaNganhSV, setkhoaNganhSV] = useState<DSKhoaNganhProps>();

  const [listLHPRegistered, setlistLHPRegistered] = useState<
    LopHocPhanDKTCProps[]
  >([]);

  const [mucThuMe, setmucThuMe] = useState<MucThuMeProps | undefined>();

  const [dotDangKyMe, setdotDangKyMe] = useState<DotDKTCMeProps>();

  const onChange = (val: HocKyProps | undefined) => {
    val && setmaHocKy(val?.ma);

    val && setinfoHocKy(val);
  };

  useEffect(() => {
    !!maHocKy && getInit();
  }, [maHocKy]);

  const getInit = async () => {
    setloading(true);

    try {
      const [responseHPMe, responseKhoaNganh, responseDot, responseDSMonHoc] =
        await Promise.all([
          getMucThuHocPhiTheoNam(maHocKy?.substring(0, 4)),
          getKhoaNganh(),
          getDotDangKyTC(maHocKy),
          getDSMonHocByHK(maHocKy),
        ]);

      const responseDotDangKyMe = await getDotDangKyMe(
        responseDot?.data?.data?._id,
      );

      setdotDangKyMe(responseDotDangKyMe?.data?.data);

      const khoaNganh: DSKhoaNganhProps = responseKhoaNganh?.data?.data;

      setmucThuMe(responseHPMe?.data?.data);

      setkhoaNganhSV(khoaNganh);

      setdotDangKyTC(responseDot?.data?.data);

      const phieuDangKy: any = responseDSMonHoc?.data?.data;

      const lopDangKy =
        phieuDangKy
          ?.filter(
            (item: any) =>
              item.lopHocPhan?.trangThaiLop === ETrangThaiLopHocPhan.MO,
          )
          ?.map((item: any) => ({
            ...item.lopHocPhan,
            _id: item.lopHocPhanId,
            ten: item.lopHocPhan.ten,
            soTinChi: item.lopHocPhan?.hocPhan?.soTinChi ?? 0,
            loai: item.loai,
            trangThai: ETrangThaiDangKyTinChi.DA_DANG_KY,
            maKhoaNganh: item.maKhoaNganh,
          })) ?? [];

      setlistLHPRegistered(lopDangKy);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const onChangeLHP = (item: LopHocPhanDKTCProps) => {
    const newItem = {
      ...item,
      // TODO: Update loại đăng ký
      loai: ELoaiHocPhanDangKyTinChi.TIEN_TRINH,
      trangThai: ETrangThaiDangKyTinChi.CHUA_DANG_KY,
    };

    const newList = listLHPRegistered;

    //check mã học phần học kỳ có chưa
    const indexHasMaHP = newList?.findIndex(
      e => e?.maHocPhanHocKy === item?.maHocPhanHocKy,
    );

    if (indexHasMaHP !== -1) {
      newList?.splice(indexHasMaHP, 1);
    }

    !!item && setlistLHPRegistered([newItem, ...newList]);
  };

  const onPressDel = (index: number) => {
    const newList = listLHPRegistered;

    if (index !== -1) {
      newList?.splice(index, 1);
    }

    setlistLHPRegistered(JSON.parse(JSON.stringify(newList)));
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Course_registration')} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => !!maHocKy && getInit()}
          />
        }
        contentContainerStyle={styles.content}>
        <ChangeSemester
          onPress={() => setvisible(true)}
          dotDangKyTC={dotDangKyTC}
          onChangeObject={onChange}
        />
        <ThongTinDangKyTinChi
          dotDangKyMe={dotDangKyMe}
          loadingContainer={loading}
          khoaNganhSV={khoaNganhSV}
          listLHPRegistered={listLHPRegistered}
          onChangeLHP={onChangeLHP}
          maHocKy={maHocKy}
        />
        <DanhSachSelect
          loadingContainer={loading}
          dotDangKyTC={dotDangKyTC}
          mucThuMe={mucThuMe}
          onPressDel={onPressDel}
          listLHPRegistered={listLHPRegistered}
        />
      </ScrollView>
      <ModalThongTin
        infoHocKy={infoHocKy}
        dotDangKyTC={dotDangKyTC}
        isVisible={visible}
        closeButton={() => setvisible(false)}
      />
    </Box>
  );
};

export default DangKyTinChiSinhVien;

const styles = StyleSheet.create({
  content: {
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
  },
});
