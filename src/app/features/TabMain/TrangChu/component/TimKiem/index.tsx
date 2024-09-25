/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Text, View } from 'react-native';

import ItemIconSVG from '@libcomponents/icon-svg';
import { AccountProps } from '@model/app';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { translate } from '@utils/i18n/translate';
import { Pressable } from 'native-base';

import styles from './styles';
interface Props {
  account: AccountProps | null;
}
const TimKiem = (props: Props) => {
  const { account } = props;

  const onGoToTK = () => {
    navigateScreen(APP_SCREEN.SEARCHSCREEN);
  };

  const gotoQR = () => {
    navigateScreen(APP_SCREEN.QRSCANNER);
  };

  return (
    <View style={styles.container}>
      <QRScanner visible={true} onPress={gotoQR} />
      <Pressable onPress={onGoToTK} style={styles.search}>
        <ItemIconSVG title={'MagnifyGlass'} />
        <Text style={styles.textTK}>{translate('slink:Search')}</Text>
      </Pressable>
    </View>
  );
};

export default TimKiem;
interface QRScannerProps {
  visible: boolean;
  onPress: () => void;
}
const QRScanner = (props: QRScannerProps) => {
  const { visible, onPress } = props;

  if (visible) {
    return (
      <Pressable onPress={onPress} style={styles.qrScan}>
        <ItemIconSVG title={'QRScanner'} />
      </Pressable>
    );
  }

  return null;
};
