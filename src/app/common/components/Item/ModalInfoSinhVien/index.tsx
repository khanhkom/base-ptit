import React from 'react';
import { FlatList, Linking, TouchableOpacity, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import R from '@assets/R';
import { showToastError, WIDTH } from '@common';
import { translate } from '@utils/i18n/translate';
import { HStack, Modal, Pressable, Text, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';
import { ModalProps } from './type';

import ItemLabel from '../ItemLabel';

const ModalInfoSinhVien = (props: ModalProps) => {
  const { dataSinhVien, isVisible, closeButton } = props;
  const name = dataSinhVien?.sinhVien?.ten || '';

  const listInfo = [
    {
      label: translate('slink:Fullname'),
      value: name,
    },
    {
      label: translate('slink:Student_code'),
      value: dataSinhVien?.sinhVien?.ma || translate('slink:Chua_cap_nhat'),
    },
    {
      label: translate('slink:Phone_number'),
      value:
        dataSinhVien?.sinhVien?.soDienThoai || translate('slink:Chua_cap_nhat'),
    },
    {
      label: translate('slink:Email'),
      value: `${
        dataSinhVien?.sinhVien?.email || translate('slink:Chua_cap_nhat')
      }`,
    },
  ];

  const source = dataSinhVien?.sinhVien?.anhDaiDienUrl
    ? { uri: dataSinhVien.sinhVien?.anhDaiDienUrl }
    : R.images.logoApp;

  // const textMessenger = `Sinh viên: ${name} - Lớp: ${
  //   dataSinhVien?.lopHocPhan?.ten || ''
  // }:\n`;

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
        {/* <ViewThaoTac
          sdt={dataSinhVien?.sinhVien?.soDienThoai || ''}
          ten={textMessenger}
        /> */}
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

export default ModalInfoSinhVien;
const ViewThaoTac = ({ sdt, ten }: { sdt: string; ten: string }) => {
  const onPressCallClick = () => {
    if (!sdt) {
      showToastError(translate('slink:No_student_phone_number'));

      return;
    }

    Linking.openURL(`tel:${sdt}`);
  };

  const onPressMessageClick = () => {
    if (!sdt) {
      showToastError(translate('slink:No_student_phone_number'));

      return;
    }

    Linking.openURL(`sms:${sdt}?body=${ten}`);
  };

  const theme = useTheme();

  return (
    <HStack w="full" justifyContent={'center'}>
      <Pressable
        padding={'2'}
        backgroundColor={'primary.500'}
        rounded="full"
        hitSlop={R.themes.hitSlop}
        mx="1"
        onPress={onPressCallClick}
        _pressed={R.themes.pressed}>
        <Entypo size={WIDTH(18)} name={'phone'} color={theme?.colors?.white} />
      </Pressable>
      <Pressable
        mx="1"
        hitSlop={R.themes.hitSlop}
        padding={'2'}
        backgroundColor={'primary.500'}
        rounded="full"
        onPress={onPressMessageClick}
        _pressed={R.themes.pressed}>
        <Entypo size={WIDTH(18)} name={'chat'} color={theme?.colors?.white} />
      </Pressable>
    </HStack>
  );
};
