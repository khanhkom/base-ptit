/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';

import { EDaLuu, MapKeyDaLuu } from '@common';
import TypeNew from '@components/Item/ItemTinTuc';
import ItemTrong from '@components/Item/ItemTrong';
import ItemVanBanHuongDan from '@components/Item/ItemVanBanHuongDan';
import { WORD_PRESS_NEWS_URL } from '@env';
import ItemSuKien from '@features/SuKienThamGia/component/ItemSuKien';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getDSXemSau } from '@networking/user/DaLuu';

import styles from './styles';

const TabDetail = ({ loaiThongTin }: { loaiThongTin: string }) => {
  const [loading, setloading] = useState(false);

  const [loadMore, setLoadMore] = useState(false);

  const beginScroll = useRef<boolean>(false);

  const [danhSachDaLuu, setdanhSachDaLuu] = useState<any>([]);

  // const [listItemSaved, setlistItemSaved] = useState<any[]>([]);

  const page = useRef(1);

  const maxData = useRef(false);

  useEffect(() => {
    refreshData();
  }, []);

  const onRefresh = () => {
    refreshData();
  };

  const refreshData = async () => {
    setloading(true);

    try {
      const body = {
        page: 1,
        limit: 10,
        condition: { loaiThongTin },
      };

      const res: any = await getDSXemSau(body);

      maxData.current = res?.data?.data?.result?.length < 10;

      page.current = 1;

      setdanhSachDaLuu(res?.data?.data?.result ?? []);

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
          condition: { loaiThongTin },
        };

        const res: any = await getDSXemSau(body);

        maxData.current = res?.data?.data?.result?.length < 10;

        setdanhSachDaLuu([
          ...danhSachDaLuu,
          ...(res?.data?.data?.result ?? []),
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

  const goToChiTiet = (item: any) => {
    navigateScreen(APP_SCREEN.CHITIETTINTUCV2, { content: item });
  };

  const renderItem = ({ item, index }) => {
    const findObject = danhSachDaLuu?.find(
      (e: { sourceId: string }) =>
        e?.sourceId === `${item?.id}` || e?.sourceId === `${item?._id}`,
    );

    const idSaved = findObject?._id;

    const newsWP = !!WORD_PRESS_NEWS_URL;

    switch (loaiThongTin) {
      case MapKeyDaLuu[EDaLuu.TIN_TUC]:
        return (
          <TypeNew
            newsWP={newsWP}
            onRefresh={refreshData}
            idSaved={idSaved}
            isSaved
            key={index}
            content={item}
            title={item?.title?.rendered}
            index={index}
            onPress={() => goToChiTiet(item)}
          />
        );
      case MapKeyDaLuu[EDaLuu.SU_KIEN]:
        return (
          <ItemSuKien
            onRefresh={refreshData}
            idSaved={idSaved}
            isSaved
            key={index}
            data={item}
          />
        );
      case MapKeyDaLuu[EDaLuu.VBHD]:
        return (
          <ItemVanBanHuongDan
            onRefresh={refreshData}
            idSaved={idSaved}
            isSaved
            index={index}
            item={item}
            key={index}
          />
        );

      default:
        return null;
    }
  };

  const listData = danhSachDaLuu?.map((item: any) => item?.thongTin);

  if (loaiThongTin === MapKeyDaLuu[EDaLuu.VBHD]) {
    return (
      <FlatList
        data={listData}
        extraData={listData}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
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
  }

  return (
    <FlatList
      data={listData}
      extraData={listData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
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

export default TabDetail;
