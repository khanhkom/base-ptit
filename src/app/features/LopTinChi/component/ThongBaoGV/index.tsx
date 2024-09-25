/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';

import { useSelector } from 'react-redux';

import { CONG_VWA, LOAI_LOP } from '@common';
import AddPlus from '@components/AddPlus';
import ItemTrong from '@components/Item/ItemTrong';
import ItemTab from '@features/ThongBao/TabThongBao/Item/ItemTab';
import HeaderReal from '@libcomponents/header-real';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { apiGetThongBaoGui, getThongbaoLHC } from '@networking/user';
import { getThongBaoLTC } from '@networking/user/DanhGiaGiangVien';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';

import styles from './styles';

const ThongBaoGV = (props: any) => {
  const itemLopHC = props?.route?.params?.infoClass;

  const loaiLop = props?.route?.params?.loaiLop;

  const { account } = useSelector(selectAppConfig);

  const [loading, setloading] = useState(false);

  const [loadMore, setLoadMore] = useState(false);

  const beginScroll = useRef<boolean>(false);

  const [dataTinTuc, setdataTinTuc] = useState<any>([]);

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
      const body =
        loaiLop === LOAI_LOP.LOP_HC
          ? {
              limit: 10,
              page: 1,
              condition: {},
            }
          : {
              limit: 10,
              page: 1,
              condition: {},
            };

      const res: any =
        loaiLop === LOAI_LOP.LOP_HC
          ? await getThongbaoLHC(itemLopHC?._id ?? '', body)
          : await getThongBaoLTC(itemLopHC?._id ?? '', body);

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
        const body =
          loaiLop === LOAI_LOP.LOP_HC
            ? {
                page: page.current,
                limit: 10,
                condition: {},
              }
            : {
                page: page.current,
                limit: 10,
                condition: {},
              };

        const res: any =
          loaiLop === LOAI_LOP.LOP_HC
            ? await getThongbaoLHC(itemLopHC?._id ?? '', body)
            : await getThongBaoLTC(itemLopHC?._id ?? '', body);

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

  const goToDetail = (item: any) => {
    navigateScreen(APP_SCREEN.CHITIETTHONGBAO, { item });
  };

  const goToAddTB = () => {
    navigateScreen(APP_SCREEN.TAOTHONGBAOGIANGVIEN, {
      itemLopHC,
      refreshData: refreshData,
      loaiLop,
    });
  };

  const visibleAdd = account?.role === CONG_VWA.CONG_CAN_BO;

  return (
    <View style={styles.container}>
      <HeaderReal title={translate('slink:Notice_t')} />
      <FlatList
        data={dataTinTuc}
        extraData={dataTinTuc}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ItemTab
            key={index}
            itemTab={item}
            onReadNoti={() => goToDetail(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        onEndReached={getMore}
        ListEmptyComponent={<ItemTrong />}
        ListFooterComponent={loadMore ? <LoadMore /> : null}
        onEndReachedThreshold={0.01}
        onRefresh={onRefresh}
        refreshing={loading}
        contentContainerStyle={styles.containerNews}
        onMomentumScrollBegin={() => {
          beginScroll.current = true;
        }}
      />
      <AddPlus onAdd={goToAddTB} visible={visibleAdd} />
    </View>
  );
};

export default ThongBaoGV;
