/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { FlatList } from 'react-native';

import ItemTrong from '@components/Item/ItemTrong';
import ItemListCongNo from '@features/CongNo/Item/ItemListCongNo';
import { CongNoProps } from '@features/CongNo/type';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { translate } from '@utils/i18n/translate';
import { VStack } from 'native-base';

import styles from './styles';

import ItemTextBlue from '../ItemTextBlue';

const CongNoTabMain = ({
  listInvoice,
  onRefreshCongNo,
}: {
  listInvoice: CongNoProps[];
  onRefreshCongNo: () => void;
}) => {
  return (
    <VStack>
      <ItemTextBlue
        label={translate('slink:Debt')}
        onPress={() => {
          navigateScreen(APP_SCREEN.CONGNO);
        }}
      />
      <FlatList
        data={listInvoice}
        extraData={[listInvoice]}
        bounces={false}
        scrollEnabled={false}
        contentContainerStyle={styles.content}
        keyExtractor={(item, index) => `${index}`}
        ListEmptyComponent={
          <ItemTrong
            customStyle={styles.viewtrong}
            content={translate('slink:No_class_schedule')}
          />
        }
        style={styles.listMon}
        renderItem={({ item, index }: any) => {
          return (
            <ItemListCongNo
              item={item}
              key={index}
              onNavigate={() =>
                navigateScreen(APP_SCREEN.CHITIETCONGNO, {
                  itemInfo: item,
                  onRefreshList: onRefreshCongNo,
                })
              }
            />
          );
        }}
      />
    </VStack>
  );
};

export default CongNoTabMain;
