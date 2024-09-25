/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FlatList } from 'react-native';

import { useSelector } from 'react-redux';

import { selectAppConfig } from '@redux-selector/app';

import ItemChucNangApp from './ItemChucNangApp';
import styles from './styles';
interface Props {
  data: { title: string; code?: string }[];
  ListHeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
  ListFooterComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
}
const FlatlistItem = (props: Props) => {
  const { data, ListHeaderComponent, ListFooterComponent } = props;

  const { account, codePhanQuyen } = useSelector(selectAppConfig);

  const menu =
    data?.map((item: { title: string; code?: string }) => {
      if (
        codePhanQuyen?.includes(item?.code ?? '') ||
        item?.code === undefined
      ) {
        return item;
      }

      return undefined;
    }) || [];

  return (
    <FlatList
      data={menu}
      extraData={menu}
      bounces={false}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <ItemChucNangApp
          account={account}
          content={item?.title}
          icon={item?.title}
          item={item}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default FlatlistItem;
