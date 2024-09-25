import React from 'react';
import { FlatList, Text, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import R from '@assets/R';
import ModalCustome from '@libcomponents/modal/modal-custome';
import { translate } from '@utils/i18n/translate';

import styles from './styles';
import { ModalProps } from './type';

import ItemLabel from '../ItemLabel';

const ModalThongTinCanBo = (props: ModalProps) => {
  const { data, isVisible, closeButton } = props;

  const hoTen = [data?.hoDem, data?.ten]?.filter(e => e !== undefined);

  const listInfo = [
    {
      label: translate('slink:Fullname'),
      value:
        hoTen?.length === 0
          ? translate('slink:Chua_cap_nhat')
          : hoTen?.join(' '),
    },
    {
      label: 'Mã định danh',
      value: data?.maCanBo || translate('slink:Chua_cap_nhat'),
    },
    {
      label: translate('slink:Date_of_birth'),
      value: data?.ngaySinh || translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Chức vụ',
      value: data?.chucVuChinh?.ten || translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Đơn vị',
      value: data?.donViChinh?.ten || translate('slink:Chua_cap_nhat'),
    },
  ];

  return (
    <ModalCustome
      closeButton={closeButton}
      style={styles.modal}
      isVisible={isVisible}>
      <View>
        <View>
          <Text style={styles.title}>{'Thông tin cán bộ'}</Text>
        </View>
        <View style={styles.viewAVA}>
          <FastImage
            source={R.images.logoApp}
            resizeMode="contain"
            style={styles.ava}
          />
        </View>
        <FlatList
          data={listInfo}
          nestedScrollEnabled={false}
          renderItem={({ item, index }) => (
            <ItemLabel
              label={item?.label}
              value={item?.value}
              isLast={index === listInfo?.length - 1}
            />
          )}
        />
      </View>
    </ModalCustome>
  );
};

export default ModalThongTinCanBo;
