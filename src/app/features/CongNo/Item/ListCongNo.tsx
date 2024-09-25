/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { HEIGHT } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getListInvoiceV2 } from '@networking/user';

import ItemListCongNo from './ItemListCongNo';

import { CongNoProps } from '../type';

const ListCongNo = () => {
  const [listInvoice, setListInvoice] = useState<CongNoProps[]>([]);

  const [refreshing, setRefreshing] = useState(false);

  const page = useRef(1);

  const maxData = useRef(false);

  const [loadMore, setLoadMore] = useState(false);

  const beginScroll = useRef<boolean>(false);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    setRefreshing(true);

    page.current = 1;

    try {
      const body = {
        page: page.current,
        limit: 10,
      };

      const responseListInvoice: any = await getListInvoiceV2(body);

      maxData.current = responseListInvoice?.data?.data?.result?.length < 10;

      setListInvoice(responseListInvoice?.data?.data?.result || []);

      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
    }
  };

  const loadMoreData = async () => {
    if (!maxData.current) {
      setLoadMore(true);

      page.current = 1;

      try {
        const body = {
          page: page.current,
          limit: 10,
        };

        const responseListInvoice: any = await getListInvoiceV2(body);

        maxData.current = responseListInvoice?.data?.data?.result?.length < 10;

        setListInvoice([
          ...listInvoice,
          ...(responseListInvoice?.data?.data?.result || []),
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
    <FlatList
      data={listInvoice}
      extraData={listInvoice}
      onRefresh={getListData}
      onEndReached={getMore}
      refreshing={refreshing}
      ListFooterComponent={loadMore ? <LoadMore /> : null}
      onEndReachedThreshold={0.01}
      onMomentumScrollBegin={() => {
        beginScroll.current = true;
      }}
      ListEmptyComponent={<ItemTrong />}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <ItemListCongNo
          item={item}
          key={index}
          onNavigate={() =>
            navigateScreen(APP_SCREEN.CHITIETCONGNO, {
              itemInfo: item,
              onRefreshList: getListData,
            })
          }
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ListCongNo;

const styles = StyleSheet.create({
  listContainer: { paddingBottom: HEIGHT(30), paddingTop: HEIGHT(24) },
});
