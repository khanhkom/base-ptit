/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { EDaLuu, MapKeyDaLuu, WIDTH } from '@common';
import TypeNew from '@components/Item/ItemTinTuc';
import ItemTrong from '@components/Item/ItemTrong';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getTinTucByPage } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import Icon from 'react-native-vector-icons/Feather';

import styles from './styles';
import { getDSXemSauMany } from '@networking/user/DaLuu';

const TinTucSK = () => {
  const [chuDeChoose, setchuDeChoose] = useState<any>();

  const [loading, setloading] = useState(false);

  const [soLuongTin, setsoLuongTin] = useState(0);

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
    refreshData(chuDeChoose?._id);
  };
  const getListXemSau = async () => {
    try {
      const responseDaLuuTinTuc = await getDSXemSauMany(
        MapKeyDaLuu[EDaLuu.TIN_TUC],
      );
      setlistItemSaved(responseDaLuuTinTuc?.data?.data);
    } catch (error) {}
  };
  const refreshData = async (id?: string) => {
    setloading(true);

    try {
      const body = {
        limit: 10,
        page: 1,
        sort: { ngayDang: -1 },
        ...(id && {
          condition: {
            idTopic: id,
          },
        }),
      };

      const res: any = await getTinTucByPage(body);

      setsoLuongTin(res?.data?.data?.total ?? 0);

      maxData.current = res?.data?.data?.result?.length < 10;

      page.current = 1;

      setdataTinTuc(res?.data?.data?.result ?? []);

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
          sort: { ngayDang: -1 },
          condition: {
            idTopic: chuDeChoose?._id,
          },
        };

        const res: any = await getTinTucByPage(body);

        maxData.current = res?.data?.data?.result?.length < 10;

        setdataTinTuc([...dataTinTuc, ...(res?.data?.data?.result ?? [])]);

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
    navigateScreen(APP_SCREEN.CHITIETTINTUC, { content: item });
  };

  const onFilter = (item: any) => {
    setchuDeChoose(item);

    refreshData(item?._id);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <HeaderReal
          title={translate('slink:News')}
          childrenRight={
            <TouchableOpacity
              onPress={() => {
                navigateScreen(APP_SCREEN.FILTERTINTUC, {
                  onFilter: onFilter,
                  chuDeChoose,
                });
              }}>
              <Icon name="filter" size={WIDTH(24)} color={'white'} />
            </TouchableOpacity>
          }
        />
        <LoadingComponent />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderReal
        title={translate('slink:News')}
        childrenRight={
          <TouchableOpacity
            onPress={() => {
              navigateScreen(APP_SCREEN.FILTERTINTUC, {
                onFilter: onFilter,
                chuDeChoose,
              });
            }}>
            <Icon name="filter" size={WIDTH(24)} color={'white'} />
          </TouchableOpacity>
        }
      />
      <FlatList
        data={dataTinTuc}
        ListHeaderComponent={
          <View style={styles.viewKQ}>
            <Text style={styles.textKQ}>{`${soLuongTin || 0} ${translate(
              'slink:News',
            )?.toLowerCase()}`}</Text>
          </View>
        }
        extraData={dataTinTuc}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const findSaved = listItemSaved?.find(
            e => e?.sourceId === `${item?.id}`,
          );
          return (
            <TypeNew
              newsWP={false}
              onRefresh={getListXemSau}
              idSaved={findSaved?._id}
              isSaved={!!findSaved}
              key={index}
              content={item}
              title={item?.tieuDe}
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
    </View>
  );
};

export default TinTucSK;
