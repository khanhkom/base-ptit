import React from 'react';
import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { decodeHtmlEntities, HEIGHT, removeHtmlTags } from '@common';
import ItemLabel from '@components/Item/ItemLabel';
import ModalCustome from '@libcomponents/modal/modal-custome';
import { translate } from '@utils/i18n/translate';
import { FlatList, Text } from 'native-base';

import { TomTatHocPhanProps } from './type';

interface Props {
  closeButton: () => void;
  isVisible: boolean;
  data: TomTatHocPhanProps | undefined;
}
const ModalTomTatHP = (props: Props) => {
  const { closeButton, isVisible, data } = props;

  const sum =
    (data?.gioLyThuyet || 0) +
    (data?.gioBaiTapTL || 0) +
    (data?.gioThucHanh || 0) +
    (data?.gioTuHoc || 0);

  const list = [
    {
      label: translate('slink:Ly_thuyet'),
      value: `${data?.gioLyThuyet || 0}`,
    },
    {
      label: translate('slink:BT_TL'),
      value: `${data?.gioBaiTapTL || 0}`,
    },
    {
      label: translate('slink:Thuc_hanh'),
      value: `${data?.gioThucHanh || 0}`,
    },
    {
      label: translate('slink:Tu_hoc'),
      value: `${data?.gioTuHoc || 0}`,
    },
    {
      label: translate('slink:Sum'),
      value: `${sum || 0}`,
    },
  ];

  const decodedText = decodeHtmlEntities(data?.ten || '');

  const cleanText = removeHtmlTags(decodedText);

  return (
    <ModalCustome
      closeButton={closeButton}
      style={styles.modal}
      isVisible={isVisible}>
      <FlatList
        ListHeaderComponent={
          <Text
            fontFamily={R.fonts.BeVietnamProSemiBold}
            fontSize={'md'}
            mb={HEIGHT(32)}
            color="black">
            {cleanText}
          </Text>
        }
        showsVerticalScrollIndicator={false}
        bounces={false}
        data={list}
        renderItem={({ item, index }) => (
          <ItemLabel
            label={item?.label}
            value={`${item?.value}`}
            isLast={list?.length - 1 === index}
          />
        )}
      />
    </ModalCustome>
  );
};

export default ModalTomTatHP;

const styles = StyleSheet.create({
  modal: { paddingVertical: HEIGHT(40) },
});
