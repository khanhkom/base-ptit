/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';

import R from '@assets/R';
import ItemTrong from '@components/Item/ItemTrong';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { getListLichSuDieuChuyenTaiSan } from '@networking/user';
import { Box, FlatList } from 'native-base';

import ItemLichSuDieuChuyenTaiSan from './Items/ItemLichSuDieuChuyenTaiSan';
import styles from './styles';

const LichSuDieuChuyenTaiSan = (props: any) => {
  const dataItem = props?.item;

  const [listDon, setListDon] = useState<any[]>([]);

  const [refreshing, setRefreshing] = useState(false);

  const [loadMore, setLoadMore] = useState(false);

  const page = useRef(1);

  const maxData = useRef(false);

  const beginScroll = useRef<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const getMore = () => {
    if (beginScroll.current && !maxData.current) {
      loadMoreData();

      beginScroll.current = false;
    }
  };

  const getData = async () => {
    setRefreshing(true);

    try {
      const body = {
        limit: 10,
        page: 1,
        condition: { maTaiSan: dataItem?.ma },
      };

      const res: any = await getListLichSuDieuChuyenTaiSan(body);

      setListDon(res?.data?.result ?? []);

      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
    }
  };

  const loadMoreData = async () => {
    if (!maxData.current) {
      setLoadMore(true);

      page.current += 1;

      try {
        const body = {
          page: page.current,
          limit: 10,
          condition: { maTaiSan: dataItem?.ma },
        };

        const res: any = await getListLichSuDieuChuyenTaiSan(body);

        setListDon([...listDon, ...(res?.data?.result ?? [])]);

        maxData.current = res?.data?.result?.length < 10;

        setLoadMore(false);
      } catch (error) {
        setLoadMore(false);
      }
    }
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <FlatList
        data={listDon}
        extraData={listDon}
        onRefresh={getData}
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
          <ItemLichSuDieuChuyenTaiSan
            item={item}
            key={index}
            refreshData={getData}
          />
        )}
      />
    </Box>
  );
};

export default LichSuDieuChuyenTaiSan;
