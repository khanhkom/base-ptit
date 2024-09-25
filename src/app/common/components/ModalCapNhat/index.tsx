/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Image, Text, View } from 'react-native';

import R from '@assets/R';
import { Modal } from '@libcomponents/modal';

import styles from './styles';
import { translate } from '@utils/i18n/translate';

const ModalCapNhat = ({ turnOffModel, modalVisible, progressPercent }: any) => {
  return (
    <Modal isVisible={modalVisible} onPress={turnOffModel && turnOffModel}>
      <View style={styles.viewContent}>
        <View style={styles.img}>
          <Image source={R.images.updateApp} style={styles.img} />
        </View>
        <Text style={styles.textThanhCong}>{`${translate('slink:Loading')} ${
          progressPercent ?? 0
        }%`}</Text>
      </View>
    </Modal>
  );
};

export default ModalCapNhat;
