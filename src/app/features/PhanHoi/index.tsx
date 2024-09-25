/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { TabView } from 'react-native-tab-view';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';
import AddPlus from '@components/AddPlus';
import ItemTrong from '@components/Item/ItemTrong';
import HeaderReal from '@libcomponents/header-real';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getPhanHoi } from '@networking/user';
import { translate } from '@utils/i18n/translate';

import ItemListPhanHoi from './component/ItemListPhanHoi';
import styles from './styles';

const PhanHoi = () => {
  const [index, setIndex] = useState(0);

  const [loading, setloading] = useState(false);

  const [loadMore, setLoadMore] = useState(false);

  const page = useRef(1);

  const maxData = useRef(false);

  const beginScroll = useRef<boolean>(false);

  const [routes] = useState<any>([
    { key: 0, title: translate('slink:All') },
    { key: 1, title: translate('slink:Not_ans') },
    { key: 2, title: translate('slink:Ans') },
  ]);

  const onIndexChange = (curindex: number) => {
    setIndex(curindex);
  };

  const [listData, setlistData] = useState<Array<any>>([]);

  useEffect(() => {
    getDataAPI();
  }, [index]);

  const getDataAPI = async () => {
    setloading(true);

    try {
      const body = {
        page: 1,
        limit: 10,
        sort: { createdAt: -1 },
        condition: {
          ...(index === 0
            ? {}
            : { daTraLoiPhanHoi: index === 1 ? false : true }),
        },
      };

      maxData.current = false;

      page.current = 1;

      const responseAPI: any = await getPhanHoi(body);

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
          sort: { createdAt: -1 },
          condition: {
            ...(index === 0
              ? {}
              : { daTraLoiPhanHoi: index === 1 ? false : true }),
          },
        };

        const responseAPI: any = await getPhanHoi(body);

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

  const renderScene = () => {
    return (
      <FlatList
        data={listData}
        extraData={listData}
        onRefresh={getDataAPI}
        onEndReached={getMore}
        refreshing={loading}
        ListFooterComponent={loadMore ? <LoadMore /> : <View />}
        onEndReachedThreshold={0.01}
        onMomentumScrollBegin={() => {
          beginScroll.current = true;
        }}
        ListEmptyComponent={<ItemTrong />}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <ItemListPhanHoi
            item={item}
            onNavigate={() =>
              navigateScreen(APP_SCREEN.THONGTINPHANHOI, { item })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const data = [
    translate('slink:All'),
    translate('slink:Not_ans'),
    translate('slink:Ans'),
  ];

  const onAdd = () => {
    navigateScreen(APP_SCREEN.THEMDONPHANHOI, {
      onRefresh: getDataAPI,
    });
  };

  return (
    <View style={styles.container} testID="TabDVu1Cua">
      <HeaderReal title={translate('slink:Feedback')} />
      <View style={styles.tabContainer}>
        <Tabbar data={data} onChangeIndex={onIndexChange} curIndex={index} />
      </View>
      <TabView
        navigationState={{ index, routes }}
        onIndexChange={onIndexChange}
        renderScene={renderScene}
        renderTabBar={() => null}
        lazy
      />
      <AddPlus onAdd={onAdd} />
    </View>
  );
};

export default PhanHoi;

const Tabbar = ({ data, onChangeIndex, curIndex }: any) => {
  const textStyleHightLight = {
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(14),
    color: R.colors.black0,
  };

  const textStyleNonHightLight = {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: '#6F6F6F',
  };

  return (
    <FlatList
      bounces={false}
      style={{
        borderRadius: WIDTH(8),
        flex: 1,
        backgroundColor: '#EBEBEB',
      }}
      contentContainerStyle={{
        height: HEIGHT(42),
        paddingVertical: HEIGHT(4),
        paddingHorizontal: WIDTH(4),
      }}
      data={data}
      horizontal
      renderItem={({ item, index }) => {
        const hightLight = index === curIndex ? true : false;

        const isLast = data?.length - 1 === index;

        return (
          <TouchableOpacity
            onPress={() => onChangeIndex(index)}
            activeOpacity={0.6}
            style={[
              {
                height: HEIGHT(34),
                width: WIDTH(106),
                backgroundColor: R.colors.white,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: WIDTH(8),
              },
              {
                marginLeft: isLast ? WIDTH(12) : 0,
                backgroundColor: hightLight
                  ? R.colors.white
                  : R.colors.transparent,
              },
            ]}>
            <Text
              style={hightLight ? textStyleHightLight : textStyleNonHightLight}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};
