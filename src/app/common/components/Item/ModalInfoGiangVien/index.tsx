/* eslint-disable no-nested-ternary */

import React from 'react';
import { FlatList, Linking, Text, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import R from '@assets/R';
import { showImage, showToastError, tenGiangVien, WIDTH } from '@common';
import ModalCustome from '@libcomponents/modal/modal-custome';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { HStack, Pressable, useTheme } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';
import { ModalProps } from './type';

import ItemLabel from '../ItemLabel';

const ModalInfoGiangVien = (props: ModalProps) => {
  const { data, isVisible, closeButton, tenNhanSu } = props;
  const hoTen = tenNhanSu || tenGiangVien(data);

  const listInfo = [
    {
      label: translate('slink:Fullname'),
      value: hoTen,
    },
    {
      label: translate('slink:Date_of_birth'),
      value: data?.ngaySinh
        ? moment(data?.ngaySinh, 'YYYY-MM-DD').format('DD/MM/YYYY')
        : '--',
    },
    {
      label: translate('slink:Phone_number'),
      value: data?.sdtCaNhan ?? '--',
    },
  ];
  const urlImg = data?.nhanSu?.urlAnhDaiDien || data?.urlAnhDaiDien;
  const anhDaiDien = urlImg
    ? { uri: urlImg }
    : data?.gioiTinh === 'Nam'
    ? R.images.giangVienNam
    : R.images.giangVienNu;

  return (
    <ModalCustome
      closeButton={closeButton}
      style={styles.modal}
      isVisible={isVisible}>
      <View>
        <View>
          <Text style={styles.title}>
            {translate('slink:Infomation_lecturer')}
          </Text>
        </View>
        <Pressable
          _pressed={R.themes.pressed}
          onPress={() => showImage([{ source: anhDaiDien, title: hoTen }])}
          style={styles.viewAVA}>
          <FastImage
            source={anhDaiDien}
            resizeMode="cover"
            style={styles.ava}
          />
        </Pressable>
        <ViewThaoTac sdt={data?.sdtCaNhan || ''} />
        <FlatList
          data={listInfo}
          scrollEnabled={false}
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

export default ModalInfoGiangVien;
const ViewThaoTac = ({ sdt }: { sdt: string }) => {
  const onPressCallClick = () => {
    if (!sdt) {
      showToastError(translate('slink:No_lecturer_phone_number'));

      return;
    }

    Linking.openURL(`tel:${sdt}`);
  };

  const onPressMessageClick = () => {
    if (!sdt) {
      showToastError(translate('slink:No_lecturer_phone_number'));

      return;
    }

    Linking.openURL(`sms:${sdt}`);
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
