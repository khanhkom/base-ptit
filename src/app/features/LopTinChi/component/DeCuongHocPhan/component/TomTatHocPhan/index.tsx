/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { HEIGHT } from '@common';
import ItemTomTatHP from '@components/Item/ItemTomTatHP';
import ItemTrong from '@components/Item/ItemTrong';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { getNoiDungHocPhan } from '@networking/user';
import { Box } from 'native-base';

import ModalTomTatHP from './ModalTomTatHP';
import { TomTatHocPhanProps } from './type';
interface Props {
  deCuongId: string;
}
const DeCuongLichTrinhCuThe = (props: Props) => {
  const { deCuongId } = props;

  const [itemChoose, setitemChoose] = useState<
    TomTatHocPhanProps | undefined
  >();

  const [visible, setvisible] = useState(false);

  const [loadMore, setLoadMore] = useState(false);

  const page = useRef(1);

  const maxData = useRef(false);

  const beginScroll = useRef<boolean>(false);

  const [loading, setloading] = useState(false);

  const [dsChuongHP, setdsChuongHP] = useState<TomTatHocPhanProps[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setloading(true);

    try {
      const body = {
        condition: {
          deCuongHpId: deCuongId,
        },
        page: 1,
        limit: 10,
      };

      const res: any = await getNoiDungHocPhan(body);

      setdsChuongHP(res?.data?.data?.result || []);

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
          condition: {
            deCuongHpId: deCuongId,
          },
          page: page.current,
          limit: 10,
        };

        const res: any = await getNoiDungHocPhan(body);

        setdsChuongHP([...dsChuongHP, ...(res?.data?.data?.result || [])]);

        maxData.current = res?.data?.result?.length < 10;

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

  const onDetail = (item: TomTatHocPhanProps) => {
    setitemChoose(item);

    setvisible(true);
  };

  return (
    <Box flex={1}>
      <FlatList
        data={dsChuongHP}
        extraData={dsChuongHP}
        numColumns={2}
        refreshing={loading}
        onRefresh={getData}
        onEndReached={getMore}
        ListFooterComponent={loadMore ? <LoadMore /> : null}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ItemTomTatHP
            onDetail={() => onDetail(item)}
            index={index}
            item={item}
            key={index}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<ItemTrong />}
        onEndReachedThreshold={0.01}
        contentContainerStyle={styles.containerNews}
      />
      <ModalTomTatHP
        data={itemChoose}
        closeButton={() => setvisible(false)}
        isVisible={visible}
      />
    </Box>
  );
};

export default DeCuongLichTrinhCuThe;
const styles = StyleSheet.create({
  containerNews: {
    paddingBottom: HEIGHT(30),
    paddingHorizontal: HEIGHT(16),
  },
});
