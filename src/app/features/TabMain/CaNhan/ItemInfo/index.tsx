import React from 'react';
import { View } from 'react-native';

import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';

import R from '@assets/R';
import { avatarUser, CONG_VWA, HEIGHT, showImage, WIDTH } from '@common';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import { HStack, Pressable, Text, VStack } from 'native-base';

import styles from './styles';

const ItemInfo = () => {
  const { account } = useSelector(selectAppConfig);
  const anhDaiDien = avatarUser(account);
  const getInforValue = () => {
    let [classLabel, classValue] = ['', ''];
    if (account?.vai_tro === CONG_VWA.CONG_HOC_VIEN) {
      classLabel = translate('slink:Class');

      classValue = account?.lopHanhChinhList?.[0]?.ten ?? '--';
    } else if (account?.isCanBo) {
      classLabel = 'Chức vụ';

      classValue = account?.donViViTri?.tenChucVu ?? '--';
    }

    return { classLabel, classValue };
  };
  const getInforValueMa = () => {
    let [classLabel, classValue] = ['', ''];
    if (account?.vai_tro === CONG_VWA.CONG_HOC_VIEN) {
      classLabel = translate('slink:Student_code');

      classValue = account?.ma ?? '--';
    } else if (account?.isCanBo) {
      classLabel = translate('hoSoNhanSu:maCanBo');

      classValue = account?.maCanBo ?? '--';
    }

    return { classLabel, classValue };
  };
  return (
    <View style={styles.container}>
      <Pressable
        _pressed={R.themes.pressed}
        borderWidth={1}
        borderColor="primary.500"
        onPress={() => showImage([{ source: anhDaiDien, title: '' }])}
        height={WIDTH(100)}
        width={WIDTH(100)}
        backgroundColor={R.colors.white}
        position="absolute"
        alignSelf="center"
        top={-WIDTH(50)}
        borderRadius={WIDTH(50)}
        overflow="hidden">
        <FastImage style={styles.ava} source={anhDaiDien} resizeMode="cover" />
      </Pressable>
      <Text
        marginTop={HEIGHT(70)}
        textAlign="center"
        fontFamily={R.fonts.BeVietnamProSemiBold}
        fontSize={'md'}
        paddingTop={HEIGHT(8)}
        color="black">
        {account?.data?.fullname || account?.fullname || '--'}
      </Text>
      <Text
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize="sm"
        mt="1"
        textAlign={'center'}
        color="gray.500">{`${getInforValueMa().classValue}`}</Text>
      <HStack alignSelf={'center'} px="4">
        <Text
          fontFamily={R.fonts.BeVietnamProRegular}
          fontSize="sm"
          mt="1"
          color="gray.500">{`${getInforValue().classLabel}: ${
          getInforValue().classValue
        }`}</Text>
      </HStack>
    </View>
  );
};

export default ItemInfo;
