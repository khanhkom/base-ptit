import React, { useEffect, useState } from 'react';
import { Image, StatusBar, TouchableOpacity, View } from 'react-native';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useSelector } from 'react-redux';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';
import { goBack } from '@navigation/navigation-service';
import { getKhoaNganh } from '@networking/user';
import { selectAppConfig } from '@redux-selector/app';
import { HStack, Pressable, Text, VStack } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import { DSKhoaNganhProps, ItemProps, Props } from './type';

const HeaderSongNganh = (props: ItemProps) => {
  const {
    title,
    onButton,
    childrenRight,
    onChangeKhoaNganh,
    containerStyles,
    isStatusBarAndroidVisible,
    innerContainerStyles,
  } = props;

  const { account } = useSelector(selectAppConfig);

  useEffect(() => {
    getKhoaNganhSinhVien();
  }, []);

  const [isField, setisField] = useState<'khoaNganhChinh' | 'khoaNganhPhu'>(
    'khoaNganhChinh',
  );

  const [khoaNganhSV, setkhoaNganhSV] = useState<DSKhoaNganhProps>();

  const [visible, setvisible] = useState(false);

  const getKhoaNganhSinhVien = async () => {
    const responseKhoaNganh = await getKhoaNganh();

    const khoaNganh: DSKhoaNganhProps = responseKhoaNganh?.data?.data;

    setkhoaNganhSV(khoaNganh);

    setvisible(!!khoaNganh?.khoaNganhPhu && !account?.isGiaoVien);

    onChangeKhoaNganh(khoaNganh?.khoaNganhChinh);
  };

  const height = HEIGHT(70) + getStatusBarHeight(isStatusBarAndroidVisible);

  const onExchange = () => {
    if (isField === 'khoaNganhChinh') {
      onChangeKhoaNganh(khoaNganhSV?.khoaNganhPhu);

      setisField('khoaNganhPhu');
    } else {
      onChangeKhoaNganh(khoaNganhSV?.khoaNganhChinh);

      setisField('khoaNganhChinh');
    }
  };

  return (
    <View>
      <CustomStatusBar
        backgroundColor={R.colors.transparent}
        lightBarStyle={true}
        isStatusBarAndroidVisible={isStatusBarAndroidVisible}
      />
      <Image
        source={R.images.bgLogo}
        resizeMode="stretch"
        style={[styles.img, { height }]}
      />
      <View style={[styles.container, containerStyles && containerStyles]}>
        <View style={[styles.viewContent, innerContainerStyles]}>
          <TouchableOpacity
            hitSlop={R.themes.hitSlop}
            style={styles.btnBack}
            onPress={onButton || goBack}>
            <Icon size={WIDTH(28)} name="chevron-left" color={R.colors.white} />
          </TouchableOpacity>
          <VStack width={WIDTH(260)}>
            <Text
              numberOfLines={2}
              color={R.colors.white}
              fontSize={getFontSize(18)}
              textAlign="center"
              fontFamily={R.fonts.BeVietnamProSemiBold}>
              {title}
            </Text>
            {visible && (
              <Text
                numberOfLines={2}
                color={R.colors.white}
                fontSize="sm"
                textAlign="center"
                fontFamily={R.fonts.BeVietnamProSemiBold}>
                {khoaNganhSV?.[isField]?.ten || '123123'}
              </Text>
            )}
          </VStack>
          <HStack flex={1} position="absolute" right={0}>
            {visible && (
              <Pressable
                onPress={onExchange}
                mr="2"
                _pressed={R.themes.pressed}>
                <FontAwesome
                  size={WIDTH(24)}
                  name="exchange"
                  color={R.colors.white}
                />
              </Pressable>
            )}
            {childrenRight && childrenRight}
          </HStack>
        </View>
      </View>
    </View>
  );
};

export default HeaderSongNganh;

export const CustomStatusBar: React.FC<Props> = (props: Props) => {
  const { isStatusBarAndroidVisible, backgroundColor, lightBarStyle } = props;

  const color = backgroundColor || R.colors.transparent;

  const bar = lightBarStyle ? 'light-content' : 'dark-content';

  const height = getStatusBarHeight(isStatusBarAndroidVisible);

  return (
    <View style={{ height, backgroundColor: color }}>
      <StatusBar
        networkActivityIndicatorVisible={true}
        translucent
        backgroundColor={color}
        barStyle={bar}
      />
    </View>
  );
};
