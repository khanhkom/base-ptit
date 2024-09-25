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

const DaThamGia = () => {
  const [listSK, setlistSK] = useState<Array<any>>([]);

  const [loading, setloading] = useState(false);

  const [loaiSuKien, setLoaiSuKien] = useState('Tất cả');

  const [loadMore, setLoadMore] = useState(false);

  const [visible, setvisible] = useState(false);

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

      page.current = 1;

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
        condition: { loaiQR: 'Tham gia' },
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
          condition: { loaiQR: 'Tham gia' },
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

  const onDiemDanh = async maDiemDanh => {
    const body = { ma: maDiemDanh };

    const responseSk: any = await diemDanhSuKien(body);

    setvisible(false);

    if (responseSk?.status) {
      popupOk(
        translate('slink:Notice_t'),
        'Điểm danh sự kiện thành công',
        () => {
          getData(loaiSuKien);

          if (responseSk?.data?.data?.idKhaoSat) {
            navigateScreen(APP_SCREEN.KHAOSATSUKIEN, {
              idKhaoSat: responseSk?.data?.data?.idKhaoSat,
              loaiKhaoSatSuKien: responseSk?.data?.data?.thoiGianCheckOut
                ? 'CHECK_OUT'
                : 'CHECK_IN',
              idSuKien: responseSk?.data?.data?.idSuKien,
              isNhapMa: true,
              data: responseSk?.data?.data,
            });
          }
        },
      );
    } else {
      popupOk(
        translate('slink:Notice_t'),
        responseSk?.msg ?? 'Điểm danh sự kiện thất bại',
      );
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
        ListEmptyComponent={<ItemTrong />}
        bounces={false}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <ItemSuKienDaThamGia
            item={item}
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
      <ModalThamGia
        onDangKy={onDiemDanh}
        isVisible={visible}
        closeButton={() => setvisible(false)}
      />
      <LoadingComponent loading={loading} />
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

export default DaThamGia;
const Filter = (props: any) => {
  const { dataLoaiSuKien, onChangeLoaiSuKien } = props;

  return (
    <Box
      bg="white"
      w={WIDTH(343)}
      px={WIDTH(16)}
      mb="2"
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
        itemData?.thoiGianCheckIn
          ? moment(itemData?.thoiGianCheckIn).format('HH:mm DD/MM/YYYY')
          : translate('slink:Chua_cap_nhat')
      }`,
    },
    {
      label: 'Thời gian checkout',
      value: `${
        itemData?.thoiGianCheckOut
          ? moment(itemData?.thoiGianCheckOut).format('HH:mm DD/MM/YYYY')
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

      {itemData?.dataSuKien?.idKhaoSatCheckIn && (
        <>
          <Divider h="0.4" />
          <Pressable
            my={'4'}
            onPress={() => {
              onClose();

              navigateScreen(APP_SCREEN.KHAOSATSUKIEN, {
                idKhaoSat: itemData?.dataSuKien?.idKhaoSatCheckIn,
                loaiKhaoSatSuKien: 'CHECK_IN',
                idSuKien: itemData?.idSuKien,
                disable: itemData?.isLamKhaoSatCheckIn,
                data: itemData,
              });
            }}>
            <Text
              // fontFamily={R.fonts.BeVietnamProMedium}
              // textDecorationLine={'underline'}
              fontSize={'md'}
              color={R.colors.colorPink}>
              {itemData?.isLamKhaoSatCheckIn
                ? 'Chi tiết khảo sát '
                : 'Điền khảo sát '}
              <Text textDecorationLine={'none'}>(Check-in)</Text>
            </Text>
          </Pressable>
        </>
      )}
      {itemData?.dataSuKien?.idKhaoSatCheckOut && (
        <>
          <Divider h="0.4" />
          <Pressable
            my={'4'}
            onPress={() => {
              onClose();

              navigateScreen(APP_SCREEN.KHAOSATSUKIEN, {
                idKhaoSat: itemData?.dataSuKien?.idKhaoSatCheckOut,
                loaiKhaoSatSuKien: 'CHECK_OUT',
                idSuKien: itemData?.idSuKien,
                disable: itemData?.isLamKhaoSatCheckOut,
                data: itemData,
              });
            }}>
            <Text
              // fontFamily={R.fonts.BeVietnamProMedium}
              // textDecorationLine={'underline'}
              fontSize={'md'}
              color={R.colors.colorPink}>
              {itemData?.isLamKhaoSatCheckOut
                ? 'Chi tiết khảo sát '
                : 'Điền khảo sát '}
              <Text textDecorationLine={'none'}>(Check-out)</Text>
            </Text>
          </Pressable>
        </>
      )}
    </ModalCustome>
  );
};
