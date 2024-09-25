/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { RefreshControl, TouchableOpacity, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import R from '@assets/R';
import { ETrangThaiThi, showImage, tenNguoiDung, WIDTH } from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import ItemTrong from '@components/Item/ItemTrong';
import { SearchItem } from '@components/SearchAction/snack-bar-item';
import HeaderReal from '@libcomponents/header-real';
import ItemInfor from '@libcomponents/ItemTable';
import {
  getDeCuongHocPhan,
  getHinhThucDanhGia,
  gvGetDiemSVLopTC,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import { Box, Pressable, ScrollView, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import styles from './styles';
import { SinhVienProps } from './type';

import { DSDiemProps, HTDGProps } from '../ThongTinChung/type';

const KetQuaHocTapSV = (props: any) => {
  const itemLopTC = props?.route?.params?.infoClass;

  const [visible, setVisible] = useState(false);

  const [listDiemSV, setListDiemSV] = useState([]);

  const [hinhThucDG, sethinhThucDG] = useState([]);

  const [loading, setLoading] = useState(true);

  const [keySearch, setkeySearch] = useState('');

  const [listSearch, setlistSearch] = useState([]);

  const deCuongId =
    itemLopTC?.deCuong?.deCuongId || itemLopTC?.hocPhan?.deCuongHienTaiId;

  const getDataDiemSV = async () => {
    try {
      const responseDiemSV: any = await gvGetDiemSVLopTC(itemLopTC?._id);

      const resHTDG = await getHinhThucDanhGia();

      const sortHTDG =
        resHTDG?.data?.data?.sort(function (a: HTDGProps, b: HTDGProps) {
          return a.field - b.field;
        }) || [];

      const response = await getDeCuongHocPhan(deCuongId);

      setLoading(false);

      const dsDiem =
        sortHTDG?.map((item: HTDGProps) => {
          return {
            ...item,
            trongSo: response?.data?.data?.[`trongSo${item?.field}`] || 0,
          };
        }) || [];

      const dsDiemFilter = dsDiem?.filter(
        (item: DSDiemProps) => item?.trongSo !== 0,
      );

      sethinhThucDG(dsDiemFilter);

      setListDiemSV(responseDiemSV?.data?.data ?? []);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataDiemSV();
  }, []);

  const onSearch = (value: string) => {
    setkeySearch(value);

    if (value !== '') {
      const listFilter =
        listDiemSV?.filter((item: any) =>
          tenNguoiDung(item?.sinhVien)
            ?.trim()
            ?.toLowerCase()
            ?.includes(value?.trim()?.toLowerCase()),
        ) ?? [];

      setlistSearch(listFilter);
    } else {
      setlistSearch([]);
    }
  };

  const listHSResult =
    listSearch?.length === 0 && keySearch === '' ? listDiemSV : listSearch;

  const tableHead = [
    translate('slink:No'),
    translate('slink:Fullname'),
    ...hinhThucDG?.map((item: HTDGProps) => `${item?.ten} (${item?.trongSo}%)`),
    translate('slink:Khong_du_DKDT'),
  ];

  const widthArr = [
    WIDTH(60),
    WIDTH(175),
    ...Array(hinhThucDG?.length).fill(WIDTH(80)),
    WIDTH(80),
  ];

  const tableData =
    listHSResult?.map((itemDiemSV: any, indexDiemSV: number) => {
      const isCamThi =
        itemDiemSV?.diemHpSvHk?.trangThaiThi === ETrangThaiThi.CAM_THI;

      const dataRow = [
        <ItemInfor content={indexDiemSV + 1} key={indexDiemSV} />,
        <ItemName item={itemDiemSV?.sinhVien} key={indexDiemSV} />,
        ...(hinhThucDG?.map((field: any, indexField: number) => {
          return (
            <ItemInfor
              content={
                !_.isNil(
                  itemDiemSV?.diemHpSvHk?.[`diemThanhPhan${field?.field}`],
                )
                  ? itemDiemSV?.diemHpSvHk?.[`diemThanhPhan${field?.field}`]
                  : '--'
              }
              key={`${indexField}_${indexDiemSV}`}
            />
          );
        }) ?? []),
        <ItemInfor content={isCamThi ? '❌' : ''} key={indexDiemSV} />,
      ];

      return dataRow;
    }) ?? [];

  return (
    <View style={styles.container}>
      <HeaderReal
        title={translate('slink:Grade')}
        childrenRight={
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}>
            <Icon name="search" size={WIDTH(24)} color={'white'} />
          </TouchableOpacity>
        }
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getDataDiemSV} />
        }>
        {listDiemSV?.length > 0 ? (
          <Box pt="6">
            <View style={styles.viewKQ}>
              <Text style={styles.textKQ}>{`${listHSResult?.length} ${translate(
                'slink:Student',
              )?.toLowerCase()}`}</Text>
            </View>
            <View style={styles.tableView}>
              <BaseTableComponent
                tableHead={tableHead}
                tableData={tableData}
                widthArr={widthArr}
                contentContainerStyle={styles.content}
                customeStyleData={styles.viewTable}
              />
            </View>
          </Box>
        ) : (
          <ItemTrong />
        )}
      </ScrollView>
      <SearchItem
        defaultValue={keySearch}
        placeholder={translate('slink:Enter_student_name')}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);

          onSearch('');
        }}
        onChangeValue={onSearch}
      />
    </View>
  );
};

export default KetQuaHocTapSV;

const ItemName = ({
  item,
  onPress,
}: {
  item: SinhVienProps;
  onPress?: () => void;
}) => {
  const source = item?.anhDaiDienUrl
    ? { uri: item.anhDaiDienUrl }
    : R.images.logoApp;

  return (
    <Pressable
      onPress={onPress}
      _pressed={R.themes.pressed}
      style={styles.viewCenter}>
      <Pressable
        width={WIDTH(36)}
        height={WIDTH(36)}
        rounded="full"
        mr="2"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        onPress={() =>
          showImage([
            {
              source,
              title: item?.ten || '',
            },
          ])
        }
        _pressed={R.themes.pressed}>
        <FastImage
          source={source}
          resizeMode="cover"
          style={styles.avaSinhVien}
        />
      </Pressable>
      <View style={styles.viewTTSV}>
        <Text
          fontSize="xs"
          fontFamily={R.fonts.BeVietnamProMedium}
          maxWidth={WIDTH(140)}>
          {item?.ten || '--'}
        </Text>
        <Text fontSize="xs" fontFamily={R.fonts.BeVietnamProRegular}>
          {item?.ma || '--'}
        </Text>
      </View>
    </Pressable>
  );
};
