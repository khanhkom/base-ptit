// @flow
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { EDaLuu, HEIGHT, MapKeyDaLuu } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import ItemVanBanHuongDan from '@components/Item/ItemVanBanHuongDan';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { Box, FlatList } from 'native-base';
import { getDSXemSauMany } from '@networking/user/DaLuu';

export interface VBHDProps {
  ten: string;
  url: string;
  _id: string;
}
interface Props {
  route: {
    params: { item: { ten: string; danhSachTep: VBHDProps[] } };
  };
}
const DanhSachChiTietVanBanHuongDan = (props: Props) => {
  const [listItemSaved, setlistItemSaved] = useState<any[]>([]);

  const title = props.route?.params?.item?.ten || '--';

  const dataTaiLieu = props.route?.params?.item?.danhSachTep ?? [];

  useEffect(() => {
    getInit();
  }, []);

  const getInit = async () => {
    try {
      const reponseEvent = await getDSXemSauMany(MapKeyDaLuu[EDaLuu.VBHD]);
      setlistItemSaved(reponseEvent?.data?.data || []);
    } catch (error) {}
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={title} />
      <FlatList
        data={dataTaiLieu}
        extraData={dataTaiLieu}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const findSaved = listItemSaved?.find(
            e => e?.sourceId === `${item?._id}`,
          );
          return (
            <ItemVanBanHuongDan
              onRefresh={getInit}
              idSaved={findSaved?._id}
              isSaved={!!findSaved}
              index={index}
              item={item}
              key={index}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<ItemTrong />}
        onEndReachedThreshold={0.01}
        contentContainerStyle={styles.containerNews}
      />
    </Box>
  );
};

export default DanhSachChiTietVanBanHuongDan;

const styles = StyleSheet.create({
  containerNews: {
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
    paddingHorizontal: HEIGHT(16),
  },
});
