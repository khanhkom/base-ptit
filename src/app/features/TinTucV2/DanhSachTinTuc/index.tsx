/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';

import { EDaLuu, MapKeyDaLuu } from '@common';
import TypeNew from '@components/Item/ItemTinTuc';
import ItemTrong from '@components/Item/ItemTrong';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { listTinTucV2 } from '@networking/user';
import { getDSXemSauMany } from '@networking/user/DaLuu';

import styles from './styles';

const DanhSachTinTucV2 = () => {
  const [loading, setloading] = useState(false);

  const [loadMore, setLoadMore] = useState(false);

  const beginScroll = useRef<boolean>(false);

  const [dataTinTuc, setdataTinTuc] = useState<any>([]);

  const page = useRef(1);

  const maxData = useRef(false);

  const [listItemSaved, setlistItemSaved] = useState<any[]>([]);

  useEffect(() => {
    refreshData();

    getListXemSau();
  }, []);

  const onRefresh = () => {
    refreshData();
  };

  const getListXemSau = async () => {
    try {
      const responseDaLuuTinTuc = await getDSXemSauMany(
        MapKeyDaLuu[EDaLuu.TIN_TUC],
      );

      setlistItemSaved(responseDaLuuTinTuc?.data?.data);
    } catch (error) {}
  };

  const refreshData = async () => {
    setloading(true);

    try {
      const body = {
        page: 1,
        per_page: 10,
        _embed: 'wp:featuredmedia',
        categories: [2343],
      };

      const res: any = await listTinTucV2(body);

      maxData.current = res?.length < 10;

      page.current = 1;

      setdataTinTuc(res ?? []);

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
          per_page: 10,
          _embed: 'wp:featuredmedia',
          categories: [2343],
        };

        const res: any = await listTinTucV2(body);

        maxData.current = res?.length < 10;

        setdataTinTuc([...dataTinTuc, ...(res ?? [])]);

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

  const goToChiTiet = (item: any) => {
    navigateScreen(APP_SCREEN.CHITIETTINTUCV2, { content: item });
  };

  return (
    <FlatList
      data={dataTinTuc}
      extraData={dataTinTuc}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => {
        const findSaved = listItemSaved?.find(
          e => e?.sourceId === `${item?.id}`,
        );

        return (
          <TypeNew
            newsWP
            onRefresh={getListXemSau}
            idSaved={findSaved?._id}
            isSaved={!!findSaved}
            key={index}
            content={item}
            title={item?.title?.rendered}
            index={index}
            onPress={() => goToChiTiet(item)}
          />
        );
      }}
      showsVerticalScrollIndicator={false}
      onEndReached={getMore}
      ListEmptyComponent={<ItemTrong />}
      ListFooterComponent={loadMore ? <LoadMore /> : <View />}
      onEndReachedThreshold={0.01}
      onRefresh={onRefresh}
      refreshing={loading}
      contentContainerStyle={styles.containerNews}
      style={styles.flatListNews}
      onMomentumScrollBegin={() => {
        beginScroll.current = true;
      }}
    />
  );
};

export default DanhSachTinTucV2;
