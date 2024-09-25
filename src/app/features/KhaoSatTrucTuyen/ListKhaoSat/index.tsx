/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';

import ItemKhaoSatTrucTuyen from '@components/Item/ItemKhaoSatTrucTuyen';
import ItemTrong from '@components/Item/ItemTrong';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { getKhaoSat } from '@networking/user';
import { Box, FlatList } from 'native-base';

import styles from './styles';

const ListKhaoSat = (props: { type: string }) => {
  const { type } = props;

  const [listDon, setListDon] = useState<any>([]);

  const [refreshing, setRefreshing] = useState(false);

  const [loadMore, setLoadMore] = useState(false);

  const page = useRef(1);

  const maxData = useRef(false);

  const beginScroll = useRef<boolean>(false);

  useEffect(() => {
    getData();
  }, [type]);

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
        sort: { thoiGianKetThuc: -1 },
        condition: { kichHoat: true },
        filters: [
          { active: true, field: 'loai', operator: 'eq', values: ['BIEU_MAU'] },
        ],
        thoiGian: type,
      };

      const res: any = await getKhaoSat(body);

      setListDon(res?.data?.data?.result ?? []);

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
          sort: { thoiGianKetThuc: -1 },
          condition: { kichHoat: true },
          filters: [
            {
              active: true,
              field: 'loai',
              operator: 'eq',
              values: ['BIEU_MAU'],
            },
          ],
          thoiGian: type,
        };

        const res: any = await getKhaoSat(body);

        setListDon([...listDon, ...(res?.data?.data?.result ?? [])]);

        maxData.current = res?.data?.data?.result?.length < 10;

        setLoadMore(false);
      } catch (error) {
        setLoadMore(false);
      }
    }
  };

  return (
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
        <ItemKhaoSatTrucTuyen
          type={type}
          item={item}
          index={index}
          refreshData={getData}
        />
      )}
    />
  );
};

export default ListKhaoSat;
