import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { EDaLuu, HEIGHT, MapKeyDaLuu, WIDTH } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import TabbarLong from '@components/TabbarCustome/TabbarLong';
import HeaderReal from '@libcomponents/header-real';
import { getDSXemSauMany } from '@networking/user/DaLuu';
import { getSuKienMe } from '@networking/user/SuKien';
import { translate } from '@utils/i18n/translate';
import { Box, FlatList } from 'native-base';

import ItemSuKien from './component/ItemSuKien';
import { SuKienMeProps } from './type';

const SuKienThamGia = () => {
  useEffect(() => {
    getData();

    getDSXemSau();
  }, []);

  const [routes] = useState<{ title: string; key: number }[]>([
    { key: 0, title: 'Giáo dục chính trị tư tưởng' },
    { key: 1, title: 'Phục vụ cộng đồng' },
    { key: 2, title: 'Văn hóa, thể thao' },
  ]);

  const [index, setIndex] = React.useState(0);

  const [loading, setloading] = useState(false);

  const [listEvents, setlistEvents] = useState<SuKienMeProps[]>();

  const [listItemSaved, setlistItemSaved] = useState<any[]>([]);

  const getDSXemSau = async () => {
    try {
      const reponseEvent = await getDSXemSauMany(MapKeyDaLuu[EDaLuu.SU_KIEN]);

      setlistItemSaved(reponseEvent?.data?.data || []);
    } catch (error) {}
  };

  const getData = async () => {
    setloading(true);

    try {
      const reponseEvent = await getDSXemSauMany(MapKeyDaLuu[EDaLuu.SU_KIEN]);

      setlistItemSaved(reponseEvent?.data?.data || []);

      const response = await getSuKienMe();

      setlistEvents(response?.data?.data || []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const renderScene = ({ route }: any) => {
    const data = listEvents?.filter(
      item => item?.hoatDongCtsv?.phanLoaiCap1 === route?.title,
    );

    return (
      <FlatList
        data={data}
        extraData={data}
        refreshing={loading}
        onRefresh={getData}
        ListEmptyComponent={<ItemTrong />}
        contentContainerStyle={styles.content}
        renderItem={({ item, index }) => {
          const findSaved = listItemSaved?.find(e => e?.sourceId === item?._id);

          return (
            <ItemSuKien
              onRefresh={getDSXemSau}
              idSaved={findSaved?._id}
              isSaved={!!findSaved}
              key={index}
              data={item}
            />
          );
        }}
      />
    );
  };

  const onIndexChange = (curindex: number) => {
    setIndex(curindex);
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Su_kien')} />
      <TabbarLong
        renderScene={renderScene}
        onIndexChange={onIndexChange}
        navigationState={{ index, routes }}
      />
    </Box>
  );
};

export default SuKienThamGia;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: WIDTH(16),
    paddingBottom: HEIGHT(30),
  },
});
