/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { useSelector } from 'react-redux';

import {
  compareFunction,
  getDayOfWeek,
  HEIGHT,
  LOAI_SU_KIEN,
  renderCalendar,
} from '@common';
import {
  colorLoaiDoiTuongChuTri,
  LoaiDoiTuongChuTri,
} from '@features/VanPhongSo/LichTuanHocVien/constant';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Text, VStack } from 'native-base';

import styles from './styles';

import ItemCalendar from '../ItemCalendar';

const ItemEvenInDay = (props: any) => {
  const { itemKeys, showDetail, onLayout, indexKeys } = props;

  const ngayCurrent =
    itemKeys?.key || itemKeys?.title || itemKeys?.tuNgay || '';

  const dataInDay = itemKeys?.value || itemKeys?.data || [];

  const toDay = moment(new Date()).format('YYYY-MM-DD');

  const listEventinDay = dataInDay?.sort(compareFunction);

  const thu: any = getDayOfWeek(new Date(ngayCurrent).getUTCDay());

  const { colorCalendar } = useSelector(selectAppConfig);

  const colorSetting = colorCalendar?.reduce((acc, item) => {
    acc[item.loaiLich] = item.maMau;

    return acc;
  }, {});

  return (
    <VStack
      marginBottom={HEIGHT(24)}
      onLayout={onLayout}
      key={`${indexKeys}-${itemKeys}`}>
      <Text style={styles.textNgay}>
        {ngayCurrent === toDay
          ? translate('slink:toDay')
          : `${thu}, ${moment(ngayCurrent, 'YYYY-MM-DD').format('DD/MM/YYYY')}`}
      </Text>
      <VStack>
        {listEventinDay?.map((item: any, index: number) => {
          //Module Lich Tuan
          const chuTri =
            item?.chuTri?.map((e: { ten: string }) => e?.ten) || [];

          const title = [
            LoaiDoiTuongChuTri.TRUONG_DON_VI,
            LoaiDoiTuongChuTri.LANH_DAO,
          ]?.includes(item?.loaiDoiTuong)
            ? `${translate('slink:Dong_chi', { name: chuTri?.join(', ') })}`
            : chuTri?.join(', ');

          const color =
            item?.loaiSuKien === LOAI_SU_KIEN.LICH_LAM_VIEC_TUAN
              ? colorLoaiDoiTuongChuTri?.[item?.loaiDoiTuong]
              : colorSetting?.[item?.loaiSuKien];

          //Module Lich Tuan
          return (
            <ItemCalendar
              key={index}
              titleLTHV={title}
              onPress={() => showDetail(item)}
              loaiLich={item?.loaiSuKien}
              timeStart={item?.thoiGianBatDau || item?.tuNgay}
              timeEnd={item?.thoiGianKetThuc || item?.denNgay}
              noiDung={renderCalendar(item)?.noiDung}
              diaDiem={renderCalendar(item)?.diaDiem}
              color={color}
            />
          );
        })}
      </VStack>
    </VStack>
  );
};

export default ItemEvenInDay;
