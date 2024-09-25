/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { useSelector } from 'react-redux';

import { LOAI_SU_KIEN, popupCancel, renderCalendar } from '@common';
import ItemCalendar from '@components/Item/ItemCalendar';
import ItemTrong from '@components/Item/ItemTrong';
import ModalLichHoc from '@components/Item/ModalLichHoc';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  deleteSuKien,
  getLichKhaoThiNVFromTo,
  getLichKhaoThiSVFromTo,
  getLichNVFromTo,
  getLichSuKien,
  getLichSVFromTo,
  getLichTuanMe,
} from '@networking/user';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import moment from 'moment';
import { Text } from 'native-base';

import styles from './styles';

import ItemTextBlue from '../ItemTextBlue';

export const thu = [
  'Chủ nhật',
  'Thứ 2',
  'Thứ 3',
  'Thứ 4',
  'Thứ 5',
  'Thứ 6',
  'Thứ 7',
];

const LichV2 = () => {
  const { account } = useSelector(selectAppConfig);

  const { colorCalendar } = useSelector(selectAppConfig);

  const colorSetting = colorCalendar?.reduce((acc, item) => {
    acc[item.loaiLich] = item.maMau;

    return acc;
  }, {});

  const [itemData, setitemData] = useState<any>();

  const [isVisible, setisVisible] = useState(false);

  const [data, setdata] = useState<any[]>([]);

  const [expand, setexpand] = useState(false);

  const [loading, setloading] = useState<boolean>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setloading(true);

      const today = new Date();

      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

      const firstDayOfWeek = moment().toISOString();

      const lastDayOfWeek = moment(new Date(nextWeek))
        .endOf('date')
        .toISOString();

      const body = {};

      let lichHoc: any;
      let lichKhaoThi: any;
      let lichBanThan: any;
      if (!account?.isGiaoVien) {
        lichHoc = await getLichSVFromTo(firstDayOfWeek, lastDayOfWeek);

        lichKhaoThi = await getLichKhaoThiSVFromTo(
          firstDayOfWeek,
          lastDayOfWeek,
        );
      } else {
        lichHoc = await getLichNVFromTo(firstDayOfWeek, lastDayOfWeek);

        lichKhaoThi = await getLichKhaoThiNVFromTo(
          firstDayOfWeek,
          lastDayOfWeek,
        );

        lichBanThan = await getLichTuanMe(firstDayOfWeek, lastDayOfWeek);
      }

      const lichSuKien: any = await getLichSuKien(
        body,
        firstDayOfWeek,
        lastDayOfWeek,
      );

      await Promise.all([lichHoc, lichKhaoThi, lichSuKien, lichBanThan]);

      const lichHocNew =
        lichHoc?.data?.data?.map((item: any) => {
          return {
            ...item,
            loaiSuKien: account?.isGiaoVien
              ? LOAI_SU_KIEN.LICH_GIANG_DAY
              : LOAI_SU_KIEN.LICH_HOC,
          };
        }) ?? [];

      const lichThiNew =
        lichKhaoThi?.data?.data?.map((item: any) => {
          return {
            ...item,
            loaiSuKien: account?.isGiaoVien
              ? LOAI_SU_KIEN.LICH_COI_THI
              : LOAI_SU_KIEN.LICH_THI,
          };
        }) ?? [];

      const lichSuKienNew =
        lichSuKien?.data?.data?.map((item: any) => {
          return { ...item };
        }) ?? [];

      const lichBanThanNew =
        lichBanThan?.data?.data?.map((item: any) => {
          return { ...item, loaiSuKien: LOAI_SU_KIEN.LICH_TUAN };
        }) ?? [];

      const listDuLieu = [
        ...lichHocNew,
        ...lichThiNew,
        ...lichSuKienNew,
        ...lichBanThanNew,
      ];

      const listDuLieuSort =
        listDuLieu?.sort((a: any, b: any) => {
          return (
            new Date(a?.thoiGianBatDau).getTime() -
            new Date(b?.thoiGianBatDau).getTime()
          );
        }) ?? [];

      setdata(listDuLieuSort);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const listData = expand ? data : data?.slice(0, 2);

  const gotoEdit = () => {
    setisVisible(false);

    setTimeout(() => {
      navigateScreen(APP_SCREEN.ADDEVENTCALENDAR, {
        item: itemData,
        onRefresh: getData,
      });
    }, 700);
  };

  const goToLTC = () => {
    setisVisible(false);

    setTimeout(() => {
      if (itemData?.loaiSuKien === LOAI_SU_KIEN.CA_NHAN) {
        popupCancel(
          translate('slink:Notice_t'),
          translate('slink:Confirm_delete'),
          () => {
            delSuKien(itemData?._id);
          },
        );
      } else {
        if (itemData?.lopHocPhan?.loai === 'TH') {
          navigateScreen(APP_SCREEN.THONGTINCHUNGLTC, {
            nhomTH: true,
            infoClass: itemData?.lopHocPhan,
          });
        } else {
          const ngayHoc = moment(itemData?.ngay ?? new Date()).format(
            'DD/MM/YYYY',
          );

          const nhomTH =
            !_.isNil(itemData?.nhom_lop_tin_chi_id?.[1]) &&
            itemData?.nhom_lop_tin_chi_id?.[1] !== false
              ? `(Nhóm TH: ${itemData?.nhom_lop_tin_chi_id?.[1]})`
              : '';

          const thuHoc = moment(itemData?.ngay).toDate().getDay() ?? 0;

          const title = `${thu?.[thuHoc]}, ngày ${ngayHoc} ${nhomTH}`;

          navigateScreen(
            account?.isGiaoVien
              ? APP_SCREEN.BUOIHOCGIANGVIEN
              : APP_SCREEN.CHITIETBUOIHOC,
            {
              propNDChuanBi: {
                id: itemData?._id ?? '',
                urlBaiHoc: itemData?.urlBaiHoc,
                noiDungChiTiet: itemData?.noiDungBaiHoc,
                tieuDe: itemData?.tieuDeBaiHoc,
                funGoBack: () => getData(),
              },
              funGoBack: () => getData(),
              infoCard: itemData,
              title: title,
            },
          );
        }
      }
    }, 700);
  };

  const delSuKien = async (id: string) => {
    try {
      const res = await deleteSuKien(id);

      if (res?.status) {
        getData();
      }
    } catch (error) {}
  };

  const showModal = (item: any) => {
    setitemData(item);

    setisVisible(true);
  };

  if (listData?.length === 0 || loading) {
    return null;
  }

  return (
    <View style={{}}>
      <ItemTextBlue
        label={translate('slink:Upcoming')}
        onPress={() => {
          navigateScreen(APP_SCREEN.THOIKHOABIEUV2);
        }}
      />
      <FlatList
        data={listData}
        extraData={[data, expand]}
        bounces={false}
        scrollEnabled={false}
        contentContainerStyle={styles.content}
        ListFooterComponent={
          data?.length <= 2 ? (
            <></>
          ) : (
            <Text
              onPress={() => {
                setexpand(!expand);
              }}
              style={styles.xemThem}>
              {expand ? translate('slink:Collapse') : translate('slink:Expand')}
            </Text>
          )
        }
        keyExtractor={(item, index) => `${index}`}
        ListEmptyComponent={
          <ItemTrong
            customStyle={styles.viewtrong}
            content={translate('slink:No_class_schedule')}
          />
        }
        style={styles.listMon}
        renderItem={({ item, index }: any) => {
          return (
            <ItemCalendar
              home
              key={index}
              onPress={() => showModal(item)}
              loaiLich={item?.loaiSuKien || ''}
              timeStart={item?.thoiGianBatDau || item?.tuNgay}
              timeEnd={item?.thoiGianKetThuc || item?.denNgay}
              noiDung={renderCalendar(item)?.noiDung}
              diaDiem={renderCalendar(item)?.diaDiem}
              color={colorSetting?.[item?.loaiSuKien]}
            />
          );
        }}
      />
      <ModalLichHoc
        onPress={goToLTC}
        isVisible={isVisible}
        itemData={itemData}
        giangVien={account?.isGiaoVien}
        closeButton={() => {
          setisVisible(false);
        }}
        onPressEdit={gotoEdit}
      />
    </View>
  );
};

export default LichV2;
