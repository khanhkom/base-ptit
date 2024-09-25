/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';

import R from '@assets/R';
import { popupOk, WIDTH } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import HeaderReal from '@libcomponents/header-real';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getListPhongKiemKeTaiSan } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { Box, FlatList, Pressable, useTheme } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ItemPhongKiemKeTaiSan from './Items/ItemPhongKiemKeTaiSan';
import styles from './styles';

const PhongKiemKeTaiSan = (props: any) => {
  const dotKiemKe = props?.route?.params?.dotKiemKe;

  const [listDon, setListDon] = useState<any[]>([]);

  const [refreshing, setRefreshing] = useState(false);

  const [loadMore, setLoadMore] = useState(false);

  const page = useRef(1);

  const maxData = useRef(false);

  const beginScroll = useRef<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

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
        condition: { dotKiemKeTaiSanId: dotKiemKe?._id },
      };

      const res: any = await getListPhongKiemKeTaiSan(body);

      setListDon(res?.data?.result ?? []);

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
          condition: { dotKiemKeTaiSanId: dotKiemKe?._id },
        };

        const res: any = await getListPhongKiemKeTaiSan(body);

        setListDon([...listDon, ...(res?.data?.result ?? [])]);

        maxData.current = res?.data?.result?.length < 10;

        setLoadMore(false);
      } catch (error) {
        setLoadMore(false);
      }
    }
  };

  const gotoQR = () => {
    const now = new Date().getTime();

    if (
      new Date(dotKiemKe?.thoiGianBatDau).getTime() <= now &&
      new Date(dotKiemKe?.thoiGianKetThuc).getTime() >= now
    ) {
      navigateScreen(APP_SCREEN.QRSCANNER, { extraData: dotKiemKe });
    } else {
      popupOk(translate('slink:Notice_t'), 'Ngoài thời gian kiểm kê');
    }
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title={translate('slink:Room_assets')}
        childrenRight={<QRScanner onPress={gotoQR} />}
      />
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
        numColumns={3}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={{ columnGap: WIDTH(20) }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ItemPhongKiemKeTaiSan item={item} key={index} onRefresh={getData} />
        )}
      />
    </Box>
  );
};

export default PhongKiemKeTaiSan;
interface QRScannerProps {
  onPress: () => void;
}
const QRScanner = (props: QRScannerProps) => {
  const { onPress } = props;

  const theme = useTheme();

  return (
    <Pressable onPress={onPress}>
      <MaterialCommunityIcons
        name={'qrcode-scan'}
        size={WIDTH(24)}
        color={theme.colors.white}
      />
    </Pressable>
  );
};
