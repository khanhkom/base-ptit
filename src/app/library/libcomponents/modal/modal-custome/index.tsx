import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import R from '@assets/R';
import { WIDTH } from '@common';
import { Modal } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import { ModalProps } from './type';

const ModalCustome = (props: ModalProps) => {
  const { children, isVisible, closeButton, style } = props;

  return (
    <Modal isOpen={isVisible} backdropVisible onClose={closeButton}>
      <View style={[styles.container, style]}>
        <TouchableOpacity onPress={closeButton} style={styles.closeButton}>
          <Icon size={WIDTH(13)} name="close" color={R.colors.black0} />
        </TouchableOpacity>
        {children}
      </View>
    </Modal>
  );
};

export default ModalCustome;
