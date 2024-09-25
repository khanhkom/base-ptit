/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';

import R from '@assets/R';
import { WIDTH } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import ItemThacMacDiem from '@features/KetQuaHocTap/Item/ItemThacMacDiem';
import { TouchableScale } from '@libcomponents';
import HeaderReal from '@libcomponents/header-real';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getThacMacDiem } from '@networking/user';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

const ThacMacDiemLTC = (props: any) => {
  const itemLopTC = props?.route?.params?.itemLopTC;

  const [loading, setloading] = useState(false);

  const [dataThacMacDiem, setdataThacMacDiem] = useState<any>([]);

  const idKyHoc = props?.route?.params?.idKyHoc;

  const [loadMore, setLoadMore] = useState(false);

  const page = useRef(1);

  const maxData = useRef(false);

  const beginScroll = useRef<boolean>(false);

  useEffect(() => {
    getDataThacMac();
  }, []);

  const getDataThacMac = async () => {
    try {
      setloading(true);

      const body = {
        page: 1,
        limit: 10,
        condition: { kyHocId: idKyHoc, hocPhanId: itemLopTC?.mon_hoc_ids?.[0] },
      };

      const res: any = await getThacMacDiem(body);

      setloading(false);

      setdataThacMacDiem(res?.data?.data?.result ?? []);
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
          condition: {
            kyHocId: idKyHoc,
            hocPhanId: itemLopTC?.mon_hoc_ids?.[0],
          },
        };

        const res: any = await getThacMacDiem(body);

        setLoadMore(false);

        setdataThacMacDiem([
          ...dataThacMacDiem,
          ...(res?.data?.data?.result ?? []),
        ]);

        maxData.current = res?.data?.data?.result?.length < 10;
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
    <View style={styles.container}>
      <HeaderReal title="Thắc mắc điểm" />
      <FlatList
        data={dataThacMacDiem}
        extraData={dataThacMacDiem}
        style={styles.list}
        onEndReached={getMore}
        refreshing={loading}
        ListFooterComponent={loadMore ? <LoadMore /> : <View />}
        onEndReachedThreshold={0.01}
        onMomentumScrollBegin={() => {
          beginScroll.current = true;
        }}
        onRefresh={getDataThacMac}
        renderItem={({ item, index }) => (
          <ItemThacMacDiem
            key={index}
            item={item}
            onNavigate={() => {
              navigateScreen(APP_SCREEN.CHITIETTHACMAC, {
                chiTiet: item,
              });
            }}
          />
        )}
        ListEmptyComponent={<ItemTrong />}
        showsVerticalScrollIndicator={false}
      />
      <TouchableScale
        onPress={() => {
          navigateScreen(APP_SCREEN.GUITHACMACDIEM, {
            onRefreshThacMac: getDataThacMac,
            kyHocId: idKyHoc,
            hocPhanId: itemLopTC?.mon_hoc_ids?.[0],
          });
        }}
        containerStyle={styles.button}>
        <Icon name="plus" size={WIDTH(30)} color={R.colors.white100} />
      </TouchableScale>
    </View>
  );
};

export default ThacMacDiemLTC;
