/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { FlatList } from 'native-base';

import ItemDeCuongGV from '@components/Item/ItemDeCuongGV';
import ItemTrong from '@components/Item/ItemTrong';
import { getDeCuongGV } from '@networking/user';
import { translate } from '@utils/i18n/translate';

import styles from './styles';
interface Props {
  deCuongId: string;
}
const DCHPGiangVien = (props: Props) => {
  const { deCuongId } = props;

  const [listGV, setlistGV] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getGV();
  }, []);

  const getGV = async () => {
    try {
      setLoading(true);

      const body = {
        condition: { deCuongId },
      };

      const resDeCuong: any = await getDeCuongGV(body);

      setlistGV(resDeCuong?.data?.data ?? []);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <FlatList
      data={listGV}
      onRefresh={getGV}
      refreshing={loading}
      ListEmptyComponent={<ItemTrong content={translate('slink:No_teacher')} />}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item, index }) => {
        return <ItemDeCuongGV key={index} item={item} />;
      }}
    />
  );
};

export default DCHPGiangVien;
