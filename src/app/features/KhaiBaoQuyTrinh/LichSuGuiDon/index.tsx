/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';

import ItemKhaiBaoQuyTrinh from '@components/Item/ItemKhaiBaoQuyTrinh';
import ItemTrong from '@components/Item/ItemTrong';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getLichSuKhaiBao } from '@networking/user/KhaiBaoQuyTrinh';
import { FlatList } from 'native-base';

import styles from './styles';

import { LichSuKhaiBaoProps } from '../type';

const LichSuGuiDon = ({ refresh }: { refresh: boolean }) => {
  const [loading, setloading] = useState(false);

  const [loadMore, setLoadMore] = useState(false);

  const page = useRef(1);

  const maxData = useRef(false);

  const beginScroll = useRef<boolean>(false);

  const [listData, setlistData] = useState<LichSuKhaiBaoProps[]>([]);

  useEffect(() => {
    getDataAPI();
  }, [refresh]);

  const getDataAPI = async () => {
    setloading(true);

    try {
      const body = {
        page: 1,
        limit: 10,
        condition: {},
      };

      maxData.current = false;

      page.current = 1;

      const responseAPI: any = await getLichSuKhaiBao(body);

      setlistData(responseAPI?.data?.data?.result ?? []);

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
        const body = {
          page: page.current,
          limit: 10,
          condition: {},
        };

        const responseAPI: any = await getLichSuKhaiBao(body);

        setlistData([...listData, ...(responseAPI?.data?.data?.result ?? [])]);

        maxData.current = responseAPI?.data?.data?.result?.length < 10;

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

  const navigateDetail = (item: LichSuKhaiBaoProps) => {
    navigateScreen(APP_SCREEN.CACBUOCKHAIBAO, {
      banGhiDon: item,
      refreshLichSu: getDataAPI,
    });
  };

  return (
    <FlatList
      data={listData}
      extraData={listData}
      onRefresh={getDataAPI}
      onEndReached={getMore}
      refreshing={loading}
      ListFooterComponent={loadMore ? <LoadMore /> : null}
      onEndReachedThreshold={0.01}
      onMomentumScrollBegin={() => {
        beginScroll.current = true;
      }}
      ListEmptyComponent={<ItemTrong />}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <ItemKhaiBaoQuyTrinh
          onRefresh={getDataAPI}
          khaiBao={false}
          data={item}
          key={index}
          title={item?.quyTrinh?.ten}
          index={index}
          onPress={() => navigateDetail(item)}
        />
      )}
    />
  );
};

export default LichSuGuiDon;
