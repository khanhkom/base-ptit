/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { HEIGHT } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import HeaderReal from '@libcomponents/header-real';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { getDanhSachHopDong } from '@networking/user/DanhGiaNhanSu';
import { Box, FlatList } from 'native-base';

import ItemHopDong from './Items/ItemHopDong';

const HopDong = () => {
  const [dsDotDG, setdsDotDG] = useState<any[]>([]);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getInitAPI();
  }, []);

  const getInitAPI = async () => {
    setRefreshing(true);

    const params = {
      page: 1,
      limit: 10,
      condition: { loaiDanhMucHopDong: 'Hợp đồng cơ hữu' },
    };

    const responseDotDG: any = await getDanhSachHopDong(params);

    setdsDotDG(responseDotDG?.data?.data?.result || []);

    setRefreshing(false);
  };

  const loadMoreData = async () => {
    if (!maxData.current) {
      setLoadMore(true);

      page.current += 1;

      try {
        const params = {
          page: page.current,
          limit: 10,
          condition: { loaiDanhMucHopDong: 'Hợp đồng cơ hữu' },
        };

        const responseDotDG: any = await getDanhSachHopDong(params);

        setdsDotDG([...dsDotDG, ...(responseDotDG?.data?.data?.result ?? [])]);

        maxData.current = responseDotDG?.data?.data?.result?.length < 10;

        setLoadMore(false);
      } catch (error) {
        setLoadMore(false);
      }
    }
  };

  const [loadMore, setLoadMore] = useState(false);

  const page = useRef(1);

  const maxData = useRef(false);

  const beginScroll = useRef<boolean>(false);

  const getMore = () => {
    if (beginScroll.current && !maxData.current) {
      loadMoreData();

      beginScroll.current = false;
    }
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={'Hợp đồng'} />
      <FlatList
        data={dsDotDG}
        extraData={dsDotDG}
        onRefresh={getInitAPI}
        onEndReached={getMore}
        refreshing={refreshing}
        ListFooterComponent={loadMore ? <LoadMore /> : null}
        onEndReachedThreshold={0.01}
        onMomentumScrollBegin={() => {
          beginScroll.current = true;
        }}
        ListEmptyComponent={<ItemTrong />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ItemHopDong item={item} key={index} />
        )}
      />
    </Box>
  );
};

export default HopDong;

const styles = StyleSheet.create({
  listContainer: { paddingBottom: HEIGHT(30), paddingTop: HEIGHT(24) },
});
