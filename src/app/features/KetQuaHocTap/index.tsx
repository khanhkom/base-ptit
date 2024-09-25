/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import Swiper from 'react-native-swiper';

import R from '@assets/R';
import { getFontSize, HEIGHT, removeAccents, WIDTH } from '@common';
import HeaderSongNganh from '@components/HeaderSongNganh';
// import SkeletonTable from '@components/HoSoNhanSu/SkeletonTable';
import TotalSV from '@components/Item/ItemStudents/component/TotalSV';
import ItemSubject from '@components/Item/ItemSubject';
import ItemTrong from '@components/Item/ItemTrong';
import { SearchItem } from '@components/SearchAction/snack-bar-item';
import { KetQuaHocTapProp } from '@features/LopTinChi/component/KetQuaHocTap/type';
import LoadingComponent from '@libcomponents/loading/loading-component';
import {
  getDeCuongHocPhan,
  getHinhThucDanhGia,
  sinhVienGetDiemMonHocTheoKy,
  thongKeKetQuaHocTapTheoKy,
  // thongKeKetQuaHocTapTheoKy,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import { Box, FlatList, Pressable, Text, VStack } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

// import DiemThanhPhan from './DiemTP';
// import BangThongKe from './Item/BangThongKe';
import BangThongKe from './Item/BangThongKe';
import BangThongKeTinChi from './Item/BangThongKeTinChi';
import ModalKetQua from './ModalKetQua';
import styles from './styles';

const KetQuaHocTapMain = () => {
  const [visible, setvisible] = useState(false);

  const [itemChoose, setitemChoose] = useState<any>();

  const [dataTheoKy, setdataTheoKy] = useState<KetQuaHocTapProp[]>([]);

  const [refreshing, setRefreshing] = useState(false);

  const [hinhThucDG, sethinhThucDG] = useState([]);

  const [loadingOpenModal, setloadingOpenModal] = useState(false);

  const [dataThongKe, setDataThongKe] = useState([]);

  const [keySearch, setkeySearch] = useState('');

  const [listSearch, setlistSearch] = useState<KetQuaHocTapProp[]>([]);

  const [visibleSearch, setvisibleSearch] = useState(false);

  const getData = async () => {
    try {
      const resHTDG: any = await getHinhThucDanhGia();

      sethinhThucDG(resHTDG?.data?.data ?? []);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const getDataMonHocTheoKy = async (maKhoaNganh?: string | undefined) => {
    try {
      setRefreshing(true);

      const body = {
        condition: {
          ...(maKhoaNganh && { maKhoaNganh }),
        },
      };

      const res = await sinhVienGetDiemMonHocTheoKy(body);

      setdataTheoKy(res?.data?.data ?? []);

      const resThongKe = await thongKeKetQuaHocTapTheoKy(
        {
          sort: { maHocKy: 1 },
        },
        maKhoaNganh,
      );

      setDataThongKe(resThongKe?.data?.data ?? []);

      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
    }
  };

  const onChiTiet = async (item: KetQuaHocTapProp) => {
    setloadingOpenModal(true);

    try {
      const response = await getDeCuongHocPhan(item?.hocPhan?.deCuongHienTaiId);

      if (response?.status) {
        setitemChoose({ ...item, ...response?.data?.data });

        setvisible(true);
      }

      setloadingOpenModal(false);
    } catch (error) {
      setloadingOpenModal(false);
    }
  };

  const onSearch = (value: string) => {
    setkeySearch(value);

    if (value !== '') {
      const listFilter =
        dataTheoKy?.filter(item =>
          removeAccents(item?.hocPhan?.ten?.trim()?.toLowerCase())?.includes(
            value?.trim()?.toLowerCase(),
          ),
        ) ?? [];

      setlistSearch(listFilter);
    } else {
      setlistSearch([]);
    }
  };

  const listSubjectResult =
    listSearch?.length === 0 && keySearch === '' ? dataTheoKy : listSearch;

  const dataFormatKy = _.chain(listSubjectResult)
    .groupBy(x => x?.hocKy?.ten)
    .map((value, key) => ({ label: key, monHoc: value }))
    .value();

  return (
    <View style={styles.container}>
      <HeaderSongNganh
        onChangeKhoaNganh={val => {
          getDataMonHocTheoKy(val?.ma);
        }}
        title={translate('slink:Grade')}
        childrenRight={
          <Pressable
            _pressed={R.themes.pressed}
            onPress={() => {
              setvisibleSearch(true);
            }}>
            <Icon name="search" size={WIDTH(24)} color={'white'} />
          </Pressable>
        }
      />

      <VStack flex={1}>
        {/* <BangThongKe data={dataThongKe} /> */}
        <FlatList
          data={dataFormatKy}
          extraData={listSubjectResult}
          onRefresh={getData}
          contentContainerStyle={{
            paddingTop: HEIGHT(24),
            paddingBottom: HEIGHT(30),
          }}
          // ListHeaderComponent={
          //   <Box height={HEIGHT(280)}>
          //     <Swiper
          //       autoplay={true}
          //       height={HEIGHT(180)}
          //       showsButtons={false}
          //       autoplayTimeout={5}>
          //       <BangThongKe data={dataThongKe} />
          //       <BangThongKeTinChi data={dataThongKe} />
          //     </Swiper>
          //   </Box>
          // }
          refreshing={refreshing}
          ListEmptyComponent={<ItemTrong />}
          renderItem={({ item, index }) => {
            return (
              <Box px={WIDTH(16)} mb="5">
                <Text
                  textAlign="left"
                  fontFamily={R.fonts.BeVietnamProMedium}
                  my="2"
                  fontSize={getFontSize(14)}>
                  {item?.label}
                </Text>
                <FlatList
                  data={item?.monHoc}
                  numColumns={2}
                  columnWrapperStyle={{ justifyContent: 'space-between' }}
                  contentContainerStyle={styles.contentList}
                  ListEmptyComponent={<ItemTrong />}
                  renderItem={({ item: itemMonHoc }) => {
                    const listPoint = [itemMonHoc?.diemChu];

                    return (
                      <ItemSubject
                        key={index}
                        listPoint={listPoint}
                        visiblePoint
                        soTinChi={itemMonHoc?.hocPhan?.soTinChi}
                        tenMon={itemMonHoc?.hocPhan?.ten}
                        onPress={() => onChiTiet(itemMonHoc)}
                      />
                    );
                  }}
                />
              </Box>
            );
          }}
        />
        <ModalKetQua
          hinhThucDG={hinhThucDG}
          data={itemChoose}
          closeButton={() => setvisible(false)}
          isVisible={visible}
        />
        <LoadingComponent loading={loadingOpenModal} />
      </VStack>
      <SearchItem
        defaultValue={keySearch}
        placeholder={translate('slink:Nhap_ten_mon_hoc')}
        visible={visibleSearch}
        onClose={() => {
          setvisibleSearch(false);
        }}
        onCancel={() => {
          setvisibleSearch(false);

          onSearch('');
        }}
        onChangeValue={onSearch}
      />
    </View>
  );
};

export default KetQuaHocTapMain;
