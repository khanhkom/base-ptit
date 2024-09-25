/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { BackHandler, FlatList } from 'react-native';

import { useSelector } from 'react-redux';

import R from '@assets/R';
import { LOAI_LOP, WIDTH } from '@common';
import HeaderQLDT from '@components/HeaderQLDT';
import ItemChucNang from '@components/Item/ItemChucNang';
import ModalInfoGiangVien from '@components/Item/ModalInfoGiangVien';
import HeaderReal from '@libcomponents/header-real';
import ItemIconSVG from '@libcomponents/icon-svg';
import {
  goBack,
  navigateScreen,
  resetScreen,
} from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  getListNhanSu,
  getLopTCByIdGV,
  getLopTCByIdSV,
} from '@networking/user';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import { MixPanelEvent, trackEvent } from '@utils/Mixpanel';
import _ from 'lodash';
import moment from 'moment';
import { Box, Pressable, ScrollView } from 'native-base';

import SelectTeacher from './SelectTeacher';
import styles from './styles';
import { GiangVienProps, InfoClassProps } from './type';

const ChiTietLopTinChi = (props: any) => {
  const itemLopTC = props?.route?.params?.item;

  const isFromOutside = props.route.params?.isFromOutside;

  const idFromLich = props?.route?.params?.idFromLich;

  const [infoGV, setinfoGV] = useState<any>();

  const [isVisibleDGGV, setisVisibleDGGV] = useState(false);

  const [isVisible, setisVisible] = useState(false);

  const [dataTimeline, setdataTimeline] = useState<any>();

  const [listGV, setlistGV] = useState<GiangVienProps[]>([]);

  const [infoClass, setinfoClass] = useState<InfoClassProps>();

  const [loading, setloading] = useState(false);

  const { account } = useSelector(selectAppConfig);

  const pastLesson =
    dataTimeline?.filter((e: { ngay: string }) => {
      return new Date(e.ngay) < moment().endOf('day').toDate();
    }) ?? [];

  const percent =
    pastLesson?.length === 0 ?? dataTimeline?.length === 0
      ? 0
      : (pastLesson?.length * 100) / dataTimeline?.length;

  const listChucNangSV = [
    {
      label: translate('slink:Tien_trinh_mon_hoc'),
      percent,
    },
    { label: translate('slink:General_information') },
    { label: translate('slink:Dien_dan') },
    { label: translate('slink:Bai_tap') },
    { label: translate('slink:Student_info') },
    // { label: translate('slink:Lop_thuc_hanh')},
    { label: translate('slink:Danh_gia_giang_vien') },
    { label: translate('slink:Grade') },
    {
      label: translate('slink:Course_document'),
      subText: `${infoClass?.deCuong?.deCuong?.ma || ''}`,
    },
  ];

  const listChucNangGV = [
    {
      label: translate('slink:Tien_trinh_mon_hoc'),
      percent,
    },
    { label: translate('slink:General_information') },
    { label: translate('slink:Bai_tap') },
    { label: translate('slink:Dien_dan') },
    {
      label: translate('slink:Student_info'),
      subText: `${infoClass?.siSo || 0} sinh viên`,
    },
    {
      label: translate('slink:Grade'),
      subText: infoClass?.trangThaiDiemLop,
    },
    // { label: translate('slink:Lop_thuc_hanh') },
    {
      label: translate('slink:Course_document'),
      subText: `${infoClass?.deCuong?.deCuong?.ma || ''}`,
    },
  ];

  const idLTC = idFromLich ?? itemLopTC?._id;

  const idKyHoc =
    props?.route?.params?.idKyHoc ??
    props?.route?.params?.item?.hocKy?.ma ??
    infoClass?.hocKy?.ma;

  useEffect(() => {
    trackEvent(MixPanelEvent.XEM_LOP_TIN_CHI);

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    getData();

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const handleBackPress = () => {
    if (isFromOutside && !_.isUndefined(isFromOutside)) {
      resetScreen(APP_SCREEN.TABMAIN);
    } else {
      goBack();
    }

    return true;
  };

  const getData = async () => {
    setloading(true);

    try {
      let detailLopTC: any = null;

      if (account?.isGiaoVien) {
        detailLopTC = await getLopTCByIdGV(idLTC);
      } else {
        detailLopTC = await getLopTCByIdSV(idLTC);
      }

      const body = {
        condition: { lopHocPhanId: detailLopTC?.data?.data?._id ?? '' },
      };

      const listdataGV: any = await getListNhanSu(body);

      setinfoClass(detailLopTC?.data?.data);

      setlistGV(listdataGV?.data?.data ?? []);

      setdataTimeline(detailLopTC?.data?.data?.thoiKhoaBieuList);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const soTinChi = infoClass?.hocPhan?.soTinChi;

  const onGoTo = (item: any) => {
    const infoClassNew: InfoClassProps | undefined = infoClass
      ? { ...infoClass, stc: soTinChi }
      : undefined;

    switch (item?.label) {
      case translate('slink:Courseware'):
        navigateScreen(APP_SCREEN.HOCLIEUSO, { infoClass });

        break;
      case translate('slink:Student_info'):
        navigateScreen(APP_SCREEN.THONGTINCHUNGLTC, { infoClass });

        break;

      case translate('slink:Grade'):
        account?.isGiaoVien
          ? navigateScreen(APP_SCREEN.KETQUAHOCTAPSV, { infoClass })
          : navigateScreen(APP_SCREEN.KETQUAHOCTAP, { infoClass, idKyHoc });

        break;
      case translate('slink:Danh_gia_giang_vien'):
        setisVisibleDGGV(true);

        break;
      case translate('slink:Lop_thuc_hanh'):
        navigateScreen(APP_SCREEN.LOPTHUCHANH, { infoClass });

        break;
      case translate('slink:Dien_dan'):
        navigateScreen(APP_SCREEN.DIENDAN, { infoClass });

        break;
      case translate('slink:Course_document'):
        navigateScreen(APP_SCREEN.DECUONGHOCPHAN, {
          infoClass: infoClassNew,
        });

        break;
      case translate('slink:Tien_trinh_mon_hoc'):
        navigateScreen(APP_SCREEN.THONGTINBUOIHOC, {
          dataBuoiHoc: dataTimeline,
          infoClass,
        });

        break;
      case translate('slink:General_information'):
        navigateScreen(APP_SCREEN.GIOITHIEULOPTINCHI, {
          infoClass: infoClassNew,
        });

        break;
      case translate('slink:Bai_tap'):
        account?.isGiaoVien
          ? navigateScreen(APP_SCREEN.BAITAPVENHA, {
              infoClass: infoClassNew,
            })
          : navigateScreen(APP_SCREEN.BAITAPVENHASINHVIEN, {
              infoClass: infoClassNew,
            });

        break;

      default:
        break;
    }
  };

  const onShowDetailGV = (item: any) => {
    setisVisible(true);

    setinfoGV(item);
  };

  const onPress = () =>
    navigateScreen(APP_SCREEN.THONGBAOGV, {
      loaiLop: LOAI_LOP.LOP_TC,
      infoClass,
    });

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        childrenRight={<ChildrenRight onPress={onPress} />}
        title={translate('slink:Lop_tin_chi')}
        onButton={handleBackPress}
      />
      <ScrollView flex={1}>
        <HeaderQLDT
          loading={loading}
          soTinChi={soTinChi}
          listGV={listGV}
          onPress={onShowDetailGV}
          maLop={infoClass?.maHocPhan || ''}
          title={infoClass?.hocPhan?.ten || ''}
        />
        <FlatList
          bounces={false}
          data={account?.isGiaoVien ? listChucNangGV : listChucNangSV}
          style={styles.list}
          contentContainerStyle={styles.contentList}
          renderItem={({ item, index }) => (
            <ItemChucNang
              isLoaded={!loading}
              key={index}
              onPress={() => onGoTo(item)}
              content={item?.label}
              icon={item?.label}
              subText={item?.subText}
              percent={item?.percent}
            />
          )}
        />
      </ScrollView>
      <ModalInfoGiangVien
        account={account}
        data={infoGV?.nhanSu}
        tenNhanSu={infoGV?.tenNhanSu}
        isVisible={isVisible}
        closeButton={() => setisVisible(false)}
      />
      <SelectTeacher
        idKyHoc={idKyHoc}
        maLop={infoClass?.ten || ''}
        lopHocPhanId={infoClass?._id || ''}
        listTeacher={listGV}
        idLop={idLTC}
        modalVisible={isVisibleDGGV}
        turnOffModel={() => setisVisibleDGGV(false)}
      />
    </Box>
  );
};

export default ChiTietLopTinChi;

const ChildrenRight = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable _pressed={R.themes.pressed} onPress={onPress}>
      <ItemIconSVG
        title={translate('slink:Notice_t')}
        color={R.colors.white}
        width={WIDTH(24)}
        height={WIDTH(24)}
      />
    </Pressable>
  );
};
