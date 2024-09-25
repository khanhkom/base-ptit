/* eslint-disable no-nested-ternary */
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import R from '@assets/R';
import { WIDTH } from '@common';
import ItemLabel from '@components/Item/ItemLabel';
import { translate } from '@utils/i18n/translate';
import { Modal } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import { ModalProps } from './type';
import { useSelector } from 'react-redux';
import { selectAppConfig } from '@redux-selector/app';

const ModalInfoSinhVienLHC = (props: ModalProps) => {
  const { dataSinhVien, isVisible, closeButton } = props;
  const { account } = useSelector(selectAppConfig);

  const listInfo = [
    {
      label: translate('slink:Fullname'),
      value: dataSinhVien?.ten || '',
    },
    {
      label: translate('slink:Gender'),
      value: dataSinhVien?.gioiTinh || translate('slink:Chua_cap_nhat'),
    },
    {
      label: translate('slink:Student_code'),
      value: dataSinhVien?.ma || translate('slink:Chua_cap_nhat'),
    },
    ...(account?.isGiaoVien
      ? [
          {
            label: translate('slink:Phone_number'),
            value:
              dataSinhVien?.soDienThoai || translate('slink:Chua_cap_nhat'),
          },
          {
            label: translate('slink:Email'),
            value: `${dataSinhVien?.email || translate('slink:Chua_cap_nhat')}`,
          },
        ]
      : []),
  ];

  const source = dataSinhVien?.anhDaiDienUrl
    ? { uri: dataSinhVien?.anhDaiDienUrl }
    : dataSinhVien?.gioiTinh === 'Nữ'
    ? R.images.sinhVienNu
    : R.images.sinhVienNam;

  return (
    <Modal isOpen={isVisible} backdropVisible onClose={closeButton}>
      <View style={styles.container}>
        <TouchableOpacity onPress={closeButton} style={styles.closeButton}>
          <Icon size={WIDTH(13)} name="close" color={R.colors.black0} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>{translate('slink:Student_info')}</Text>
        </View>
        <View style={styles.viewAVA}>
          <FastImage source={source} resizeMode="cover" style={styles.ava} />
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
    </Modal>
  );
};

export default ModalInfoSinhVienLHC;
