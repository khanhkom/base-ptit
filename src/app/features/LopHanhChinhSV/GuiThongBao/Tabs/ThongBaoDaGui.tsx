import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import R from '@assets/R';
import {
  getFontSize,
  getLineHeight,
  getWidth,
  HEIGHT,
  LOAI_LOP,
  WIDTH,
} from '@common';
import _ from 'lodash';
import moment from 'moment';

const ThongBaoDaGui = (props: any) => {
  const page = useRef(1);

  const beginScroll = useRef(false);

  useEffect(() => {
    refreshData();
  }, []);

  const renderItem = (item: {
    title: any;
    content: any;
    createdAt: moment.MomentInput;
  }) => (
    <TouchableOpacity activeOpacity={0.6} style={styles.itemContainer}>
      <Text style={styles.title} numberOfLines={2}>
        {item?.title ?? ''}
      </Text>
      <Text style={styles.content} numberOfLines={2}>
        {item?.content ?? ''}
      </Text>
      <View style={styles.row}>
        <Text style={[styles.content, styles.ngayGui]}>
          PTIT,
          <Text
            style={[
              styles.content,
              styles.ngayGui,
              { color: R.colors.colorTextDetail },
            ]}>{` ngày ${
            _.isNil(item.createdAt)
              ? ''
              : moment(item.createdAt).format('DD/MM/YYYY')
          }`}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );

  const { itemLopHC, loaiLop } = props;

  const refreshData = () => {
    page.current = 1;

    const body =
      loaiLop === LOAI_LOP.LOP_HC
        ? {
            limit: 10,
            page: page.current,
            cond: {
              senderID: props?.Account?._id ?? '',
              danhSachMaLopHanhChinh: itemLopHC?.tenLop ?? '',
            },
          }
        : {
            id: itemLopHC?.id,
            limit: 10,
            page: page.current,
          };

    loaiLop === LOAI_LOP.LOP_HC
      ? props.getThongBaoGui(body, itemLopHC?.id ?? '')
      : props.getThongBaoGuiTC(body, itemLopHC?.id ?? '');
  };

  const loadMoreData = () => {
    if (beginScroll.current) {
      page.current += 1;

      const body =
        loaiLop === LOAI_LOP.LOP_HC
          ? {
              limit: 10,
              page: page.current,
              cond: {
                senderID: props?.Account?._id ?? '',
                danhSachMaLopHanhChinh: itemLopHC?.tenLop ?? '',
              },
            }
          : {
              id: itemLopHC?.id,
              limit: 10,
              page: page.current,
            };

      loaiLop === LOAI_LOP.LOP_HC
        ? props.getMoreThongBaoGui(body, itemLopHC?.id ?? '')
        : props.getMoreThongBaoGuiTC(body, itemLopHC?.id ?? '');
    }
  };

  const { loadMore } = props;

  const renderFooter = () => {
    if (loadMore) {
      return (
        <View style={styles.loadingFooter}>
          <ActivityIndicator animating color={R.colors.grey1000} size="small" />
        </View>
      );
    } else {
      return <View />;
    }
  };

  const { listSentNoti, loading } = props;

  return (
    <View style={styles.container}>
      <FlatList
        data={listSentNoti ?? []}
        extraData={listSentNoti ?? []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem(item)}
        showsVerticalScrollIndicator={false}
        onMomentumScrollBegin={() => {
          beginScroll.current = true;
        }}
        onRefresh={refreshData}
        refreshing={loading}
        onEndReachedThreshold={0.01}
        onEndReached={loadMoreData}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <Text style={styles.txtEmpty}>{'Không có thông báo'}</Text>
        }
        contentContainerStyle={{ paddingBottom: HEIGHT(20) }}
      />
    </View>
  );
};

export default ThongBaoDaGui;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  itemContainer: {
    width: WIDTH(351),
    padding: WIDTH(12),
    alignSelf: 'center',
    backgroundColor: R.colors.white,
    marginTop: HEIGHT(12),
    borderRadius: WIDTH(8),
  },
  title: {
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(24),
    color: R.colors.black0,
    fontWeight: 'bold',
  },
  content: {
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(20),
    color: R.colors.black0,
    marginVertical: HEIGHT(8),
  },
  ngayGui: {
    color: R.colors.colorPink,
    marginBottom: 0,
  },
  txtEmpty: {
    alignSelf: 'center',
    marginTop: HEIGHT(40),
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(20),
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loadingFooter: {
    width: getWidth(),
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute',
  },
});
