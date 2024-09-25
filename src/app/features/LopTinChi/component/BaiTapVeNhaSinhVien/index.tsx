/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';

import R from '@assets/R';
import ItemTrong from '@components/Item/ItemTrong';
import TabbarCustome from '@components/TabbarCustome/Tabbar';
import HeaderReal from '@libcomponents/header-real';
import LoadMore from '@libcomponents/loading/loadmore-component';
import {
  getListAssignment,
  getListAssignmentSV,
} from '@networking/user/BaiTapVeNha';
import { Box, FlatList, VStack } from 'native-base';

import ItemBaiTapSinhVien from './Items/ItemBaiTapSinhVien';
import styles from './styles';

import ItemBaiTap from '../BaiTapVeNha/Items/ItemBaiTap';

const BaiTapVeNhaSinhVien = props => {
  const infoClass = props?.route?.params?.infoClass;

  const [index, setIndex] = useState(0);

  const [routes] = useState<any>([
    { key: 0, title: 'Đang diễn ra' },
    { key: 1, title: 'Đã quá hạn' },
  ]);

  const onIndexChange = (curindex: number) => {
    setIndex(curindex);
  };

  const renderScene = ({ route }) => {
    return (
      <DanhSachBaiTap
        infoClass={infoClass}
        loaiDon={route?.key === 0 ? 'dang-dien-ra' : 'da-ket-thuc'}
      />
    );
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={'Bài tập, bài kiểm tra'} />
      <TabbarCustome
        renderScene={renderScene}
        onIndexChange={onIndexChange}
        navigationState={{ index, routes }}
      />
    </Box>
  );
};

export default BaiTapVeNhaSinhVien;
const DanhSachBaiTap = ({ loaiDon, infoClass }) => {
  const [danhSachBaiDang, setdanhSachBaiDang] = useState<any[]>([]);

  const page = useRef(1);

  const beginScroll = useRef<boolean>(false);

  const [loading, setloading] = useState(false);

  const [loadMore, setLoadMore] = useState(false);

  const maxData = useRef(false);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      //   const params = {
      //     page: 1,
      //     limit: 10,
      //     condition: { baiDangId: '66cfff2089420f5dddda3803' },
      //   };
      setloading(true);

      const params = {
        page: 1,
        limit: 10,
        condition: { lopHocPhanId: infoClass?._id || '' },
      };

      const response: any = await getListAssignmentSV(
        infoClass?._id,
        loaiDon,
        params,
      );

      maxData.current = response?.data?.data?.result?.length < 10;

      page.current = 1;

      setdanhSachBaiDang(response?.data?.data?.result || []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const loadMoreData = async () => {
    if (!maxData.current) {
      setLoadMore(true);

      page.current += 1;

      try {
        const params = {
          page: page.current,
          limit: 10,
          condition: { lopHocPhanId: infoClass?._id || '' },
        };

        const response: any = await getListAssignmentSV(
          infoClass?._id,
          loaiDon,
          params,
        );

        maxData.current = response?.data?.data?.result?.length < 10;

        setdanhSachBaiDang([
          ...danhSachBaiDang,
          ...(response?.data?.data?.result ?? []),
        ]);

        setLoadMore(false);
      } catch (error) {
        setLoadMore(false);
      }
    }
  };

  const getMore = () => {
    if (beginScroll.current && !maxData.current) {
      loadMoreData();

      beginScroll.current = false;
    }
  };

  return (
    <VStack flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <FlatList
        data={danhSachBaiDang}
        extraData={danhSachBaiDang}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ItemBaiTapSinhVien
            item={item}
            key={index}
            onEdit={() => {
              // navigateScreen(APP_SCREEN.CHITIETBAITAP, {
              //   item: item,
              //   onRefresh: () => initData(),
              //   editValue: item,
              // });
            }}
            onRefresh={initData}
          />
        )}
        showsVerticalScrollIndicator={false}
        onEndReached={getMore}
        ListEmptyComponent={<ItemTrong />}
        ListFooterComponent={loadMore ? <LoadMore /> : null}
        onEndReachedThreshold={0.01}
        onRefresh={initData}
        refreshing={loading}
        contentContainerStyle={styles.containerNews}
        removeClippedSubviews
        onMomentumScrollBegin={() => {
          beginScroll.current = true;
        }}
      />
    </VStack>
  );
};
