/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// import i18n from "@assets/languages/i18n";
import R from '@assets/R';
import { getFontSize, HEIGHT, LOAI_LOP, WIDTH } from '@common';
import ItemThongBao from '@components/Item/ItemThongBao';
import ItemTrong from '@components/Item/ItemTrong';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  getThongBaoLopHCSinhVien,
  getThongBaoLopTCSinhVien,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';

const ThongBaoSVNhan = (props: { itemLopHC: any; loaiLop: any }) => {
  const { itemLopHC, loaiLop } = props;

  const [refreshing, setRefreshing] = useState(false);

  const [maxdata, setMaxdata] = useState(false);

  const [showfooter, setShowfooter] = useState(false);

  const [soLuongTin, setsoLuongTin] = useState(0);

  const [firstloading, setFirstloading] = useState(false);

  const listThongBao = useRef<any>([]);

  const page = useRef(2);

  const initialNumToRender = useRef(0);

  const getNotification =
    loaiLop === LOAI_LOP.LOP_HC
      ? getThongBaoLopHCSinhVien
      : getThongBaoLopTCSinhVien;

  const refreshData = useCallback(async () => {
    page.current = 2;

    setFirstloading(true);

    setRefreshing(true);

    const body = {
      id: itemLopHC?.id,
      limit: 10,
      page: 1,
    };

    try {
      const res: any = await getNotification(itemLopHC?.id, body);

      initialNumToRender.current = res?.data?.total;

      if (res.data?.data?.result?.length < 10) {
        setMaxdata(true);
      } else {
        setMaxdata(false);
      }

      setsoLuongTin(res?.data?.data?.total);

      listThongBao.current = res?.data.data?.result;

      setFirstloading(false);

      setRefreshing(false);

      setMaxdata(false);
    } catch (error) {
      setFirstloading(false);

      setRefreshing(false);

      setMaxdata(false);
    }
  }, [getNotification, itemLopHC]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const loadMoreData = async () => {
    if (!maxdata) {
      setRefreshing(true);

      setShowfooter(true);

      const body = {
        id: itemLopHC?.id,
        limit: 10,
        page: page.current,
      };

      try {
        const res: any = await getNotification(itemLopHC?.id, body);

        page.current += 1;

        if (res?.data.data?.result?.length === 0) {
          setMaxdata(true);
        } else {
          listThongBao.current = [
            ...listThongBao.current,
            ...(res?.data.data?.result ?? []),
          ];
        }

        setRefreshing(false);

        setShowfooter(false);
      } catch (error) {
        setRefreshing(false);

        setShowfooter(false);
      }
    }
  };

  const renderFooter = () =>
    showfooter ? (
      <View style={{ height: HEIGHT(30) }}>
        <ActivityIndicator animating color={R.colors.black0} size="small" />
      </View>
    ) : (
      <View style={{ height: HEIGHT(30) }} />
    );

  const goToDetail = (item: any) => {
    navigateScreen(APP_SCREEN.DETAILNOTI, { item, hideDetailBtn: true });
  };

  if (firstloading) {
    return <LoadingComponent />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={listThongBao.current}
        extraData={listThongBao.current}
        ListHeaderComponent={
          soLuongTin > 0 ? (
            <View style={styles.viewKQ}>
              <Text style={styles.textKQ}>{`${soLuongTin} ${translate(
                'slink:News',
              )?.toLowerCase()}`}</Text>
            </View>
          ) : null
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ItemThongBao
            data={item}
            index={index}
            onPress={() => {
              goToDetail(item);
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
        initialNumToRender={initialNumToRender.current}
        onRefresh={refreshData}
        refreshing={refreshing && !showfooter}
        onEndReachedThreshold={0.01}
        onEndReached={loadMoreData}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={<ItemTrong content={'Không có thông báo'} />}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default ThongBaoSVNhan;

const styles = StyleSheet.create({
  viewKQ: {
    width: WIDTH(343),
    marginBottom: HEIGHT(16),
  },
  textKQ: {
    textAlign: 'right',
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
  },
  contentContainer: {
    paddingBottom: HEIGHT(20),
    paddingTop: HEIGHT(24),
  },
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
});
