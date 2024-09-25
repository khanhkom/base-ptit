/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import R from '@assets/R';
import { EnumLoaiKeKhai } from '@common';
import MenuComponent from '@components/MenuNativeBase/MenuComponent';
import TabbarLong from '@components/TabbarCustome/TabbarLong';
import HeaderReal from '@libcomponents/header-real';
import { goBack } from '@navigation/navigation-service';
import {
  getDetailKeKhai,
  getInfoKeKhaiTaiSan,
  saveKhaiBao,
  saveNewKhaiBao,
} from '@networking/user/KeKhaiTaiSan';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import { Box, Skeleton, VStack } from 'native-base';

import BienDongTaiSan from './BienDongTaiSan';
import MoTaBienDong from './MoTaBienDong';
import MoTaVeTaiSan from './MoTaVeTaiSan';
import ThongTinChung from './ThongTinChung';
import { KeKhaiTaiSanProps } from './type';

import { DotKhaiBaoProps } from '../type';

interface Props {
  route: { params: { data: DotKhaiBaoProps; onRefresh: () => void } };
}
const DetailKeKhai = (props: Props) => {
  const data = props?.route?.params?.data;

  const { account } = useSelector(selectAppConfig);

  const isKeKhaiBoSung = data?.loai === EnumLoaiKeKhai.KE_KHAI_BO_SUNG;

  const isDisabled = !data?.chinhSua;

  const onRefresh = props?.route.params?.onRefresh;

  const [loading, setloading] = useState(false);

  const [detailKeKhai, setdetailKeKhai] = useState<KeKhaiTaiSanProps>();

  const [index, setIndex] = useState<number>(0);

  const [routes] = useState<any>([
    { key: 0, title: 'Thông tin chung' },
    {
      key: 1,
      title: !isKeKhaiBoSung
        ? 'Thông tin mô tả về tài sản'
        : 'Biến động tài sản, thu thập, giải trình nguồn gốc của tài sản, thu nhập tăng thêm',
    },
    {
      key: 2,
      title: !isKeKhaiBoSung
        ? 'Biến động tài sản, thu thập, giải trình nguồn gốc của tài sản, thu nhập tăng thêm'
        : 'Thông tin mô tả về tài sản, thu nhập tăng thêm',
    },
  ]);

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 0:
        return <ThongTinChung detailKeKhai={detailKeKhai} />;
      case 1:
        return isKeKhaiBoSung ? (
          <BienDongTaiSan
            stt={isKeKhaiBoSung ? 'II' : 'III'}
            isDisabled={isDisabled}
            setValue={setValue}
            detailKeKhai={detailKeKhai}
            control={control}
          />
        ) : (
          <MoTaVeTaiSan
            isHidden={isKeKhaiBoSung}
            isDisabled={isDisabled}
            setValue={setValue}
            detailKeKhai={detailKeKhai}
            control={control}
          />
        );
      case 2:
        return isKeKhaiBoSung ? (
          <MoTaBienDong
            setValue={setValue}
            defaultValue={detailKeKhai?.moTaBienDong}
            visible={isKeKhaiBoSung}
            isDisabled={isDisabled}
            control={control}
          />
        ) : (
          <BienDongTaiSan
            stt={isKeKhaiBoSung ? 'II' : 'III'}
            isDisabled={isDisabled}
            setValue={setValue}
            detailKeKhai={detailKeKhai}
            control={control}
          />
        );
    }
  };

  const { control, watch, setValue } = useForm();

  const watchValues = watch();

  useEffect(() => {
    getInitAPI();
  }, []);

  const getInitAPI = async () => {
    setloading(true);

    const responseAPI: any = await getDetailKeKhai(data?._id);

    let infoDotKeKhai: any;
    if (responseAPI?.data?.data === null) {
      infoDotKeKhai = await getInfoKeKhaiTaiSan(data?._id);
    }

    setdetailKeKhai(responseAPI?.data?.data ?? infoDotKeKhai?.data?.data);

    setloading(false);
  };

  const onSave = async (gui: boolean) => {
    const body = {
      ...detailKeKhai,
      gui: gui,
      moTaBienDong: watchValues?.moTaBienDong || '',
      cacLoaiGiayToCoGiaTri: watchValues?.cacLoaiGiayToCoGiaTri || [],
      congTrinhXayDungKhac: watchValues?.congTrinhXayDungKhac || [],
      kimLoaiDaQuy: watchValues?.kimLoaiDaQuy || [],
      nhaO: watchValues?.nhaO || [],
      quyenSuDungDat: watchValues?.quyenSuDungDat || [],
      taiKhoanONuocNgoai: watchValues?.taiKhoanONuocNgoai || [],
      taiSanKhacGanLienVoiDat: watchValues?.taiSanKhacGanLienVoiDat || [],
      taiSanKhac: watchValues?.taiSanKhac || [],
      taiSanONuocNgoai: watchValues?.taiSanONuocNgoai || '',
      tien: watchValues?.tien || [],
      tongThuNhapGiuaHaiLanKeKhai: {
        tongThuNhapNguoiKeKhai: watchValues?.tongThuNhapNguoiKeKhai || null,
        tongThuNhapCuaVo: watchValues?.tongThuNhapCuaVo || null,
        tongThuNhapConChuaThanhNien:
          watchValues?.tongThuNhapConChuaThanhNien || null,
        tongThuNhapChung: watchValues?.tongThuNhapChung || null,
      },
      bienDong: {
        ...(watchValues?.bienDong_datO && { datO: watchValues?.bienDong_datO }),
        ...(watchValues?.bienDong_cacLoaiDatKhac && {
          cacLoaiDatKhac: watchValues?.bienDong_cacLoaiDatKhac,
        }),
        ...(watchValues?.bienDong_nhaO && {
          nhaO: watchValues?.bienDong_nhaO,
        }),
        ...(watchValues?.bienDong_cacLoaiCongTrinhXayDungKhac && {
          cacLoaiCongTrinhXayDungKhac:
            watchValues?.bienDong_cacLoaiCongTrinhXayDungKhac,
        }),
        ...(watchValues?.bienDong_cayLauNam && {
          cayLauNam: watchValues?.bienDong_cayLauNam,
        }),
        ...(watchValues?.bienDong_vatKienTrucGanLienVoiDat && {
          vatKienTrucGanLienVoiDat:
            watchValues?.bienDong_vatKienTrucGanLienVoiDat,
        }),
        ...(watchValues?.bienDong_kimLoaiDaQuy && {
          kimLoaiDaQuy: watchValues?.bienDong_kimLoaiDaQuy,
        }),
        ...(watchValues?.bienDong_tien && {
          tien: watchValues?.bienDong_tien,
        }),
        ...(watchValues?.bienDong_coPhieu && {
          coPhieu: watchValues?.bienDong_coPhieu,
        }),
        ...(watchValues?.bienDong_traiPhieu && {
          traiPhieu: watchValues?.bienDong_traiPhieu,
        }),
        ...(watchValues?.bienDong_vonGop && {
          vonGop: watchValues?.bienDong_vonGop,
        }),
        ...(watchValues?.bienDong_cacLoaiGiayToKhac && {
          cacLoaiGiayToKhac: watchValues?.bienDong_cacLoaiGiayToKhac,
        }),
        ...(watchValues?.bienDong_taiSanTheoQuyDinh && {
          taiSanTheoQuyDinh: watchValues?.bienDong_taiSanTheoQuyDinh,
        }),
        ...(watchValues?.bienDong_taiSanKhac && {
          taiSanKhac: watchValues?.bienDong_taiSanKhac,
        }),
        ...(watchValues?.bienDong_taiSanONuocNgoai && {
          taiSanONuocNgoai: watchValues?.bienDong_taiSanONuocNgoai,
        }),
        ...(watchValues?.bienDong_tongThuNhapGiuaHaiLanKeKhai && {
          tongThuNhapGiuaHaiLanKeKhai:
            watchValues?.bienDong_tongThuNhapGiuaHaiLanKeKhai,
        }),
      },
    };

    let response;
    if (data?.trangThaiDuyet === 'Chưa kê khai') {
      response = await saveNewKhaiBao(
        {
          ...body,
          dotKeKhaiId: data?._id,
          thongTinNhanSuId: account?._id,
        },
        gui,
      );
    } else {
      response = await saveKhaiBao(
        detailKeKhai?._id || data?._id || '',
        body,
        gui,
      );
    }

    if (response?.status) {
      onRefresh && onRefresh();

      setTimeout(() => {
        goBack();
      }, 500);
    }
  };

  const onIndexChange = (i: number) => {
    setIndex(i);
  };

  if (loading) {
    return (
      <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
        <HeaderReal
          title={translate('slink:Asset_declaration')}
          childrenRight={<RightComponent visible={!isDisabled} />}
        />
        <Box flex={1}>
          <VStack w="100%" space={8} py="8" px="4" overflow="hidden">
            <Skeleton rounded="md" startColor="gray.200" />
            <Skeleton.Text lines={10} />
          </VStack>
        </Box>
      </Box>
    );
  }

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title={translate('slink:Asset_declaration')}
        childrenRight={
          <RightComponent
            visible={!isDisabled}
            onSave={() => onSave(false)}
            onSend={() => onSave(true)}
          />
        }
      />
      <Box flex={1}>
        <TabbarLong
          renderScene={renderScene}
          onIndexChange={onIndexChange}
          navigationState={{ index, routes }}
        />
      </Box>
    </Box>
  );
};

export default DetailKeKhai;

interface RightComponentProps {
  onSave?: () => void;
  onSend?: () => void;
  visible: boolean;
}
const RightComponent = (props: RightComponentProps) => {
  const { onSave, onSend, visible } = props;

  const listFunction = [
    { title: translate('slink:Send_now'), onPress: onSend },
    { title: translate('slink:Save_to_send_later'), onPress: onSave },
  ];

  if (visible) {
    return <MenuComponent listFunction={listFunction} />;
  }

  return null;
};
