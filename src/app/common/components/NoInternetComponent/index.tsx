/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import { Modal } from '@libcomponents/modal';
import NetInfo from '@react-native-community/netinfo';
import { translate } from '@utils/i18n/translate';
import CodePush from 'react-native-code-push';

const NoInternetComponent = () => {
  const [showPopup, setshowPopup] = useState(false);

  const [loading, setloading] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setshowPopup(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onPress = () => {
    setloading(true);

    NetInfo.fetch().then((state: any) => {
      if (state?.isConnected) {
        CodePush.restartApp();
      } else {
        setloading(false);
      }
    });
  };

  return (
    <Modal isVisible={showPopup}>
      <View style={styles.container}>
        <View>
          <FastImage
            source={R.images.noInternet}
            style={styles.img}
            resizeMode="contain"
          />
          <View style={styles.viewContent}>
            <Text style={styles.text}>{translate('slink:No_internet')}</Text>
            <Text style={styles.textChiTiet}>
              {translate('slink:Pls_connect_again')}
            </Text>
          </View>
        </View>
        <BaseButtonNB
          width={WIDTH(100)}
          onPress={onPress}
          isLoading={loading}
          isLoadingText={translate('slink:Loading')}
          title={translate('slink:Try_again')}
        />
      </View>
    </Modal>
  );
};

export default NoInternetComponent;
const styles = StyleSheet.create({
  img: { width: WIDTH(300), height: HEIGHT(200) },
  text: {
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(16),
    marginBottom: HEIGHT(12),
  },
  textChiTiet: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(16),
    marginBottom: HEIGHT(4),
    color: 'rgba(111, 111, 111, 1)',
    textAlign: 'center',
  },
  viewContent: {
    alignItems: 'center',
    marginTop: HEIGHT(24),
    marginBottom: HEIGHT(8),
  },
  container: {
    borderRadius: WIDTH(8),
    width: WIDTH(343),
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: WIDTH(17),
    paddingVertical: HEIGHT(40),
    maxHeight: HEIGHT(640),
  },
  buttonOk: {
    backgroundColor: R.colors.primaryColor,
    width: WIDTH(100),
    paddingVertical: HEIGHT(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: HEIGHT(8),
    paddingHorizontal: WIDTH(20),
    marginTop: HEIGHT(5),
  },
});
