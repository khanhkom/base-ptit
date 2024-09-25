import React from 'react';
import { StyleSheet } from 'react-native';

import ItemTrong from '@components/Item/ItemTrong';
import { HEIGHT, WIDTH } from '@config/function';
import { translate } from '@utils/i18n/translate';
import { FlatList } from 'native-base';

import ItemStudents from '..';
import TotalSV from '../component/TotalSV';

interface Props {
  danhSachSV: any[];
  onPress: (e: any) => void;
  loading?: boolean;
  onRefresh?: () => void;
}
const ListStudent = (props: Props) => {
  const { danhSachSV, onPress, loading, onRefresh } = props;

  return (
    <FlatList
      data={danhSachSV}
      extraData={danhSachSV}
      refreshing={loading}
      onRefresh={onRefresh}
      ListEmptyComponent={<ItemTrong />}
      ListHeaderComponent={
        <TotalSV
          name={translate('slink:Student')?.toLowerCase()}
          total={danhSachSV?.length}
        />
      }
      contentContainerStyle={styles.contentList}
      renderItem={({ item, index }) => {
        return (
          <ItemStudents
            onPress={() => onPress(item)}
            key={index}
            hoVaTen={item?.sinhVien?.ten || item?.ten || '--'}
            maSinhVien={item?.sinhVien?.ma || item?.ma || '--'}
            url={item.sinhVien?.anhDaiDienUrl || item?.anhDaiDienUrl || ''}
          />
        );
      }}
    />
  );
};

export default ListStudent;

const styles = StyleSheet.create({
  contentList: {
    paddingHorizontal: WIDTH(16),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
  },
});
