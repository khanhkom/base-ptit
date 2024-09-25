/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { RefreshControl, TouchableOpacity, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';

import R from '@assets/R';
import { showImage, WIDTH } from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import HeaderQLDT from '@components/HeaderQLDT';
import ListStudent from '@components/Item/ItemStudents/ListStudent';
import ItemTrong from '@components/Item/ItemTrong';
import ModalInfoGiangVien from '@components/Item/ModalInfoGiangVien';
import ModalInfoSinhVien from '@components/Item/ModalInfoSinhVien';
import { SearchItem } from '@components/SearchAction/snack-bar-item';
import HeaderReal from '@libcomponents/header-real';
import ItemInfor from '@libcomponents/ItemTable';
import {
  getListNhanSu,
  getLopTCByIdGV,
  getLopTCByIdSV,
  getThongTinSVLop,
} from '@networking/user';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import { Pressable, ScrollView, Text, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import ModalBonusPoint from './ModalBonusPoint';
import styles from './styles';
import { SinhVienProps } from './type';

const ThongTinChungLTC = (props: any) => {
  const dataLopHC = props?.route?.params?.infoClass;

  const [dataGV, setdataGV] = useState<Array<any>>([]);

  const nhomTH = props?.route?.params?.nhomTH;

  const [visible, setVisible] = useState(false);

  const [loading, setloading] = useState(false);

  const [isVisible, setisVisible] = useState(false);

  const [modalisVisibleGiangVien, setmodalisVisibleGiangVien] = useState(false);

  const [keySearch, setkeySearch] = useState('');

  const [listSearch, setlistSearch] = useState<SinhVienProps[]>([]);

  const [dataSinhVien, setdataSinhVien] = useState<SinhVienProps | null>(null);

  const [listSV, setlistSV] = useState<SinhVienProps[]>(
    dataLopHC?.sinhVienList || [],
  );

  const [sinhVienChoose, setsinhVienChoose] = useState<SinhVienProps | null>(
    null,
  );

  const [visibleModalDiemCong, setvisibleModalDiemCong] = useState(false);

  const [listGV, setlistGV] = useState<any[]>([]);

  const goToDetail = (item: any) => {
    setisVisible(true);

    setdataSinhVien(item);
  };

  const { account } = useSelector(selectAppConfig);

  useEffect(() => {
    getData(true);
  }, []);

  const getGV = async () => {
    try {
      const body = {
        condition: { lopHocPhanId: dataLopHC?._id ?? '' },
      };

      const reponseGV: any = await getListNhanSu(body);

      setlistGV(reponseGV?.data?.data ?? []);
    } catch (error) {}
  };

  const getData = async (isLoading?: boolean) => {
    isLoading && setloading(true);

    let res: any;
    try {
      if (nhomTH) {
        if (account?.isGiaoVien) {
          res = await getLopTCByIdGV(dataLopHC?._id);
        } else {
          res = await getLopTCByIdSV(dataLopHC?._id);
        }

        await getGV();

        setlistSV(res?.data?.data?.sinhVienList ?? []);
      } else {
        const response = await getThongTinSVLop(dataLopHC?._id);

        setlistSV(response);
      }

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const onSearch = (value: string) => {
    setkeySearch(value);

    if (value !== '') {
      const listFilter =
        listSV?.filter((item: any) =>
          item?.sinhVien?.ten
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
    listSearch?.length === 0 && keySearch === '' ? listSV : listSearch;

  const tableHeadGV = [
    translate('slink:No'),
    translate('slink:Fullname'),
    translate('slink:Total_point_add'),
    translate('slink:Absence_with_permission'),
    translate('slink:Absence_without_permission'),
    translate('slink:Back_early'),
  ];

  const widthArr = [
    WIDTH(60),
    WIDTH(175),
    WIDTH(120),
    WIDTH(120),
    WIDTH(120),
    WIDTH(120),
  ];

  const onViewBonusPoint = (sv: SinhVienProps) => {
    setvisibleModalDiemCong(true);

    setsinhVienChoose(sv);
  };

  const theme = useTheme();

  const tableData =
    listHSResult?.map((itemSV, indexSV: number) => {
      const dataRow = [
        <ItemInfor content={String(indexSV + 1)} key={indexSV} />,
        <ItemName
          onPress={() => goToDetail(itemSV)}
          item={itemSV}
          key={indexSV}
        />,
        <ItemInfor
          textStyle={{ color: theme?.colors?.primary?.[500] }}
          onPress={() => onViewBonusPoint(itemSV)}
          content={itemSV?.diemCongTong || '--'}
          key={indexSV}
        />,
        <ItemInfor content={itemSV?.vangCoPhep || '--'} key={indexSV} />,
        <ItemInfor content={itemSV?.vangKhongPhep || '--'} key={indexSV} />,
        <ItemInfor content={itemSV?.muonVeSom || '--'} key={indexSV} />,
      ];

      return dataRow;
    }) ?? [];

  const onChiTietGV = (gv: any) => {
    setmodalisVisibleGiangVien(true);

    setdataGV(gv?.nhanSu);
  };

  return (
    <View style={styles.container}>
      <HeaderReal
        title={translate('slink:General_information')}
        childrenRight={
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}>
            <Icon name="search" size={WIDTH(24)} color={'white'} />
          </TouchableOpacity>
        }
      />
      {nhomTH && (
        <ViewInfoLopTH
          loading={loading}
          data={dataLopHC}
          gv={listGV}
          onPress={onChiTietGV}
        />
      )}
      {account?.isGiaoVien ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => getData(true)}
            />
          }>
          {listHSResult?.length === 0 ? (
            <ItemTrong />
          ) : (
            <View style={styles.table}>
              <View style={styles.viewKQ}>
                <Text style={styles.textKQ}>{`${
                  listHSResult?.length ?? 0
                } ${translate('slink:Student')?.toLowerCase()}`}</Text>
              </View>
              <BaseTableComponent
                tableHead={tableHeadGV}
                widthArr={widthArr}
                tableData={tableData}
                contentContainerStyle={styles.content}
                customeStyleData={styles.data}
              />
            </View>
          )}
        </ScrollView>
      ) : (
        <ListStudent
          loading={loading}
          onRefresh={() => getData(true)}
          danhSachSV={listHSResult}
          onPress={goToDetail}
        />
      )}
      <ModalInfoSinhVien
        closeButton={() => setisVisible(false)}
        isVisible={isVisible}
        dataSinhVien={dataSinhVien}
      />
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
      <ModalBonusPoint
        onRefresh={getData}
        idLHP={dataLopHC?._id}
        sinhVien={sinhVienChoose}
        modalVisible={visibleModalDiemCong}
        turnOffModel={() => setvisibleModalDiemCong(false)}
      />
      <ModalInfoGiangVien
        data={dataGV}
        isVisible={modalisVisibleGiangVien}
        closeButton={() => {
          setmodalisVisibleGiangVien(false);
        }}
      />
    </View>
  );
};

export default ThongTinChungLTC;

const ItemName = ({
  item,
  onPress,
}: {
  item: SinhVienProps;
  onPress?: () => void;
}) => {
  const source = item?.sinhVien?.anhDaiDienUrl
    ? { uri: item.sinhVien?.anhDaiDienUrl }
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
              title: item?.sinhVien?.ten || item?.ten || '',
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
          {item?.sinhVien?.ten || item?.ten || '--'}
        </Text>
        <Text fontSize="xs" fontFamily={R.fonts.BeVietnamProRegular}>
          {item?.sinhVien?.ma || item?.ma || '--'}
        </Text>
      </View>
    </Pressable>
  );
};

const ViewInfoLopTH = ({
  gv,
  data,
  onPress,
  loading,
}: {
  data: any;
  onPress: (e: any) => void;
  gv?: any;
  loading?: boolean;
}) => {
  return (
    <HeaderQLDT
      loading={loading}
      listGV={gv}
      onPress={onPress}
      maLop={data?.ten}
      title={`Nhóm: ${data?.soThuTuNhom || '--'}`}
    />
  );
};
