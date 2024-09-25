/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

import ItemTrong from '@components/Item/ItemTrong';
import ModalChiTietNhanSu from '@features/HoSoNhanSu/componentTab/ModalChiTiet';
import HeaderReal from '@libcomponents/header-real';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { getLichSuDangKyDayBu } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { FlatList } from 'native-base';

import ItemThongTinDayBu from './Item';
import styles from './styles';

const LichSuDayBu = (props: any) => {
  const [listDayBu, setlistDayBu] = useState<Array<any>>([]);

  const tenDayBu = props?.route?.params?.tenDayBu;

  const page = useRef(1);

  const maxData = useRef(false);

  const beginScroll = useRef<boolean>(false);

  const [loading, setloading] = useState(false);

  const [loadMore, setLoadMore] = useState(false);

  const [isVisible, setisVisible] = useState(false);

  const [dataShow, setdataShow] = useState<
    { value: string; label: string; required: boolean }[]
  >([]);

  const getData = async () => {
    setloading(true);

    try {
      const body = {
        page: 1,
        limit: 20,
        condition: { tenLopHocPhan: tenDayBu },
      };

      const res: any = await getLichSuDangKyDayBu(body);

      setlistDayBu(res?.data?.data?.result ?? []);

      setloading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const loadMoreData = async () => {
    if (!maxData.current) {
      setLoadMore(true);

      page.current += 1;

      try {
        const res: any = await getLichSuDangKyDayBu({
          page: page.current,
          limit: 20,
          condition: { tenLopHocPhan: tenDayBu },
        });

        setloading(false);

        setlistDayBu([...listDayBu, ...(res?.data?.data?.result ?? [])]);

        maxData.current = res?.data?.data?.result?.length < 20;

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

  const onShowDetail = (
    item: { label: string; value: string; required: boolean }[],
  ) => {
    setdataShow(item);

    setisVisible(true);
  };

  return (
    <View style={styles.container}>
      <HeaderReal title={translate('slink:Lich_su_dang_ky_day_bu')} />

      <FlatList
        data={listDayBu}
        extraData={listDayBu}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item?._id}
        renderItem={({ item, index }) => (
          <ItemThongTinDayBu
            key={index}
            index={index}
            data={item}
            onShowDetail={onShowDetail}
          />
        )}
        onRefresh={getData}
        refreshing={loading}
        contentContainerStyle={styles.viewContent}
        onEndReached={getMore}
        onEndReachedThreshold={0.01}
        ListFooterComponent={loadMore ? <LoadMore /> : <View />}
        ListEmptyComponent={<ItemTrong />}
        onMomentumScrollBegin={() => {
          beginScroll.current = true;
        }}
      />
      <ModalChiTietNhanSu
        isVisible={isVisible}
        data={dataShow}
        closeButton={() => {
          setisVisible(false);
        }}
      />
    </View>
  );
};

export default LichSuDayBu;
