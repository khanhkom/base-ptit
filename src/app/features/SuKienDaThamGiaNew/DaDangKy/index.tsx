/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';

import R from '@assets/R';
import { ESuKienType, LIMIT_OF_PAGE, popupOk, WIDTH } from '@common';
import AddPlus from '@components/AddPlus';
import FilterLHP from '@components/FilterLHP';
import ItemLabel from '@components/Item/ItemLabel';
import ItemTrong from '@components/Item/ItemTrong';
import LoadingComponent from '@libcomponents/loading/loading-component';
import LoadMore from '@libcomponents/loading/loadmore-component';
import ModalCustome from '@libcomponents/modal/modal-custome';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getDanhSachSuKien, getSuKienDaThamGia } from '@networking/user';
import { diemDanhSuKien } from '@networking/user/QuetQR';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Box, Divider, FlatList, Pressable, Text } from 'native-base';

import ItemSuKienDaThamGia from '../Item/ItemSuKienDaThamGia';
import ModalThamGia from '../Item/ModalThamGia';
import styles from '../styles';

const DaDangKy = () => {
  const [listSK, setlistSK] = useState<Array<any>>([]);

  const [loading, setloading] = useState(false);

  const [loaiSuKien, setLoaiSuKien] = useState('Tất cả');

  const [loadMore, setLoadMore] = useState(false);

  const page = useRef(1);

  const maxData = useRef(false);

  const beginScroll = useRef<boolean>(false);

  const listLoaiSuKien: any = Object.keys(ESuKienType).map(key => ({
    label: ESuKienType[key as keyof typeof ESuKienType],
    value: ESuKienType[key as keyof typeof ESuKienType],
  }));

  listLoaiSuKien.unshift({ label: 'Tất cả', value: 'Tất cả' });

  const onChangeLoaiSuKien = data => {
    if (!data) {
      setLoaiSuKien('Tất cả');

      //   getData('Tất cả', dotChamDiem);
    } else {
      setLoaiSuKien(data);

      //   getData(data, dotChamDiem);
    }
  };

  const getData = async (loaiSK?: string, dotCD?: string) => {
    try {
      setloading(true);

      const filterData: any = [];

      if (loaiSK && loaiSK !== 'Tất cả') {
        filterData.push({
          values: [`${loaiSK}`],
          field: 'loaiSuKien',
          operator: 'contain',
        });
      }

      if (dotCD && dotCD !== 'Tất cả') {
        filterData.push({
          values: [`${dotCD}`],
          field: 'dotChamDiem',
          operator: 'contain',
        });
      }

      const body = {
        condition: { loaiQR: 'Đăng ký' },
        page: 1,
        limit: LIMIT_OF_PAGE,
      };

      const resSuKien = await getSuKienDaThamGia(body);

      const resAllSuKien = await getDanhSachSuKien({ filters: filterData });

      resSuKien?.data?.result?.map(item => {
        item.dataSuKien = resAllSuKien?.data?.result?.find(
          i => i._id === item?.idSuKien,
        );
      });

      setlistSK(resSuKien?.data?.result?.filter(item => item.dataSuKien));

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  useEffect(() => {
    getData(loaiSuKien);
  }, [loaiSuKien]);

  const loadMoreData = async () => {
    try {
      if (!maxData.current) {
        setLoadMore(true);

        page.current += 1;

        const filterData: any = [];

        if (loaiSuKien && loaiSuKien !== 'Tất cả') {
          filterData.push({
            values: [`${loaiSuKien}`],
            field: 'loaiSuKien',
            operator: 'contain',
          });
        }

        // if (dotCD && dotCD !== 'Tất cả') {
        //   filterData.push({
        //     values: [`${dotCD}`],
        //     field: 'dotChamDiem',
        //     operator: 'contain',
        //   });
        // }

        const body = {
          condition: { loaiQR: 'Đăng ký' },
          page: page.current,
          limit: LIMIT_OF_PAGE,
        };

        const resSuKien = await getSuKienDaThamGia(body);

        const resAllSuKien = await getDanhSachSuKien({ filters: filterData });

        resSuKien?.data?.result?.map(item => {
          item.dataSuKien = resAllSuKien?.data?.result?.find(
            i => i._id === item?.idSuKien,
          );
        });

        setlistSK([
          ...listSK,
          ...resSuKien?.data?.result?.filter(item => item.dataSuKien),
        ]);

        maxData.current = resSuKien?.data?.result?.length < LIMIT_OF_PAGE;

        setLoadMore(false);
      }
    } catch (error) {
      setLoadMore(false);
    }
  };

  const getMore = () => {
    if (beginScroll.current && !maxData.current) {
      loadMoreData();

      beginScroll.current = false;
    }
  };

  const [visible, setvisible] = useState(false);

  const onDiemDanh = async maDiemDanh => {
    setvisible(false);

    try {
      const body = {
        ma: maDiemDanh,
        loaiQR: 'Đăng ký',
      };

      const responseUpdate: any = await diemDanhSuKien(body);

      if (responseUpdate?.status) {
        popupOk(
          translate('slink:Notice_t'),
          'Đăng ký tham gia sự kiện thành công',
          () => {
            getData(loaiSuKien);

            if (responseUpdate?.data?.data?.idKhaoSat) {
              navigateScreen(APP_SCREEN.KHAOSATSUKIEN, {
                idKhaoSat: responseUpdate?.data?.data?.idKhaoSat,
                loaiKhaoSatSuKien: 'DANG_KY',
                idSuKien: responseUpdate?.data?.data?.idSuKien,
                isNhapMa: true,
                data: itemData,
              });
            }
          },
        );
      } else {
        popupOk(
          translate('slink:Notice_t'),
          responseUpdate?.msg ?? 'Đăng ký tham gia sự kiện thất bại',
        );
      }
    } catch (error) {
      popupOk(translate('slink:Notice_t'), 'Đăng ký tham gia sự kiện thất bại');
    }
  };

  const [isVisible, setisVisible] = useState(false);

  const [itemData, setitemData] = useState<any>();

  const showModal = (item: any) => {
    setitemData(item);

    setisVisible(true);
  };

  return (
    <Box flex={1} bg={R.colors.backgroundColorNew}>
      <Filter
        dataLoaiSuKien={listLoaiSuKien}
        onChangeLoaiSuKien={onChangeLoaiSuKien}
      />
      <FlatList
        data={listSK}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        //   ListHeaderComponent={
        //     <HeaderFlatList isDangKy={isDangKy} setIsDangKy={setIsDangKy} />
        //   }
        ListEmptyComponent={<ItemTrong />}
        bounces={false}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <ItemSuKienDaThamGia
            item={item}
            isDangKy={true}
            showModal={() => {
              showModal(item);
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={getMore}
        onEndReachedThreshold={0.01}
        ListFooterComponent={loadMore ? <LoadMore /> : <Box />}
        onMomentumScrollBegin={() => {
          beginScroll.current = true;
        }}
      />
      <AddPlus onAdd={() => setvisible(true)} visible={true} />
      <LoadingComponent loading={loading} />
      <ModalThamGia
        onDangKy={onDiemDanh}
        isVisible={visible}
        closeButton={() => setvisible(false)}
        isThamGia={true}
      />
      <ModalThongTinSk
        visible={isVisible}
        itemData={itemData}
        onClose={() => {
          setisVisible(false);
        }}
      />
    </Box>
  );
};

export default DaDangKy;
const Filter = (props: any) => {
  const { dataLoaiSuKien, onChangeLoaiSuKien } = props;

  return (
    <Box
      bg="white"
      w={WIDTH(343)}
      mb="2"
      px={WIDTH(16)}
      borderRadius={WIDTH(8)}
      alignSelf="center"
      overflow="hidden">
      <FilterLHP
        data={dataLoaiSuKien}
        onChange={onChangeLoaiSuKien}
        placeHolder={translate('slink:Choose_event_type')}
        label={translate('slink:Event_type')}
        isLast={true}
      />
    </Box>
  );
};

const ModalThongTinSk = ({ itemData, visible, onClose }) => {
  const dataChung = [
    {
      label: translate('slink:Event_name'),
      value: `${
        itemData?.suKien?.tenSuKien ?? translate('slink:Chua_cap_nhat')
      }`,
    },
    {
      label: translate('slink:Event_type'),
      value: `${
        itemData?.suKien?.loaiSuKien ?? translate('slink:Chua_cap_nhat')
      }`,
    },
    {
      label: translate('slink:Location'),
      value: itemData?.suKien?.diaDiem ?? translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Thời gian checkin',
      value: `${
        itemData?.thoiGian
          ? moment(itemData?.thoiGian).format('HH:mm DD/MM/YYYY')
          : translate('slink:Chua_cap_nhat')
      }`,
    },

    {
      label: translate('slink:Time_start'),
      value: itemData?.suKien?.thoiGianBatDau
        ? moment(itemData?.suKien?.thoiGianBatDau).format('HH:mm DD/MM/YYYY')
        : translate('slink:Chua_cap_nhat'),
    },
    {
      label: translate('slink:Time_end'),
      value: itemData?.suKien?.thoiGianKetThuc
        ? moment(itemData?.suKien?.thoiGianKetThuc).format('HH:mm DD/MM/YYYY')
        : translate('slink:Chua_cap_nhat'),
    },
  ];

  return (
    <ModalCustome
      closeButton={onClose}
      style={styles.modal}
      isVisible={visible}>
      <Text
        textAlign="center"
        fontSize={'md'}
        fontFamily={R.fonts.BeVietnamProSemiBold}
        color={R.colors.primaryColor}>
        {translate('slink:Detail_t')}
      </Text>
      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        bounces={false}
        data={dataChung}
        renderItem={({ item, index }) => {
          return (
            <ItemLabel
              label={item?.label}
              value={item?.value}
              isLast={index === dataChung?.length - 1}
            />
          );
        }}
      />
      {itemData?.dataSuKien?.idKhaoSatDangKy && (
        <>
          <Divider h="0.4" />
          <Pressable
            my={'4'}
            onPress={() => {
              onClose();

              navigateScreen(APP_SCREEN.KHAOSATSUKIEN, {
                idKhaoSat: itemData?.dataSuKien?.idKhaoSatDangKy,
                loaiKhaoSatSuKien: 'DANG_KY',
                idSuKien: itemData?.idSuKien,
                disable: itemData?.isLamKhaoSatDangKy,
                data: itemData,
              });
            }}>
            <Text
              // fontFamily={R.fonts.BeVietnamProMedium}
              // textDecorationLine={'underline'}
              fontSize={'md'}
              color={R.colors.colorPink}>
              {itemData?.isLamKhaoSatDangKy
                ? 'Chi tiết khảo sát '
                : 'Điền khảo sát'}
            </Text>
          </Pressable>
        </>
      )}
    </ModalCustome>
  );
};
