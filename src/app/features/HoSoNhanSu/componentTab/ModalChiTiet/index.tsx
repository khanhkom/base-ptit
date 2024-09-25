/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { WIDTH } from '@common';
import ItemLabel from '@components/Item/ItemLabel';
import ModalCustome from '@libcomponents/modal/modal-custome';
import { translate } from '@utils/i18n/translate';

import styles from './styles';
interface Props {
  data: any[];
  isVisible: boolean;
  closeButton: () => void;
}

const ModalChiTietNhanSu = (props: Props) => {
  const { data, isVisible, closeButton } = props;

  return (
    <ModalCustome
      closeButton={closeButton}
      style={styles.modal}
      isVisible={isVisible}>
      <View>
        <Text style={styles.title}>{translate('slink:Detail_t')}</Text>
      </View>
      <FlatList
        style={styles.list}
        contentContainerStyle={{ paddingHorizontal: WIDTH(12) }}
        showsVerticalScrollIndicator={false}
        bounces={false}
        data={data}
        renderItem={({ item, index }) => {
          if (item) {
            return (
              <ItemLabel
                label={
                  <Text>
                    {item?.label}
                    {item?.required && <Text style={styles.dot}>{' *'}</Text>}
                  </Text>
                }
                numberOfLines={2}
                value={
                  item?.isLink ? translate('slink:See_details') : item?.value
                }
                textLabel={styles.textLabel2}
                isLast={data?.length - 1 === index}
                link={item?.isLink && item?.value ? item?.value : null}
                multiLine={item?.mutiline}
                typeHTML={item?.isHtml}
              />
            );
          } else {
            return null;
          }
        }}
      />
    </ModalCustome>
  );
};

export default ModalChiTietNhanSu;
