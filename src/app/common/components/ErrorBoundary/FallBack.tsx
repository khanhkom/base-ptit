import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import R from '@assets/R';
import {
  getFontSize,
  getHeight,
  getLineHeight,
  HEIGHT,
  isIos,
  WIDTH,
} from '@common';
import { translate } from '@utils/i18n/translate';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from 'native-base';
import { useSelector } from 'react-redux';
import { selectAppConfig } from '@redux-selector/app';
import { notiToTele } from '@networking/user';
import { ID_CHAT_TELE, TOKEN_BOT_TELE } from '@env';
import LoadingComponent from '@libcomponents/loading/loading-component';

type Props = {
  resetError?: () => void;
  error?: string;
  errorInfo?: string;
};

const FallBack = (props: Props) => {
  const { resetError, error, errorInfo } = props;
  const theme = useTheme();
  const [loading, setloading] = useState(false);

  const { account } = useSelector(selectAppConfig);
  useEffect(() => {
    !!errorInfo && !!error && callNotiToTele();
  }, [errorInfo, error]);

  const callNotiToTele = async () => {
    setloading(true);
    try {
      const body = {
        chat_id: ID_CHAT_TELE,
        text: `${account?.data?.fullname || account?.fullname || '--'} - ${
          account?.username
        }\n${error}\nPlatform: ${
          isIos ? 'Iphone' : 'Android'
        }\nChi tiết${errorInfo}`,
      };
      await notiToTele(TOKEN_BOT_TELE, body);
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <AntDesign
          size={WIDTH(80)}
          name={'closecircleo'}
          color={theme.colors.white}
        />
      </View>
      <Text style={styles.textTitle}>{translate('slink:Notice_t')}</Text>
      <Text style={styles.textDescription}>
        {translate('slink:Fallback_description')}
      </Text>
      <TouchableOpacity
        style={styles.viewComeBack}
        onPress={() => {
          resetError && resetError();
        }}>
        <Text style={styles.textComeback}>{translate('slink:Go_back')}</Text>
      </TouchableOpacity>
      <LoadingComponent loading={loading} />
    </View>
  );
};

export default FallBack;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: R.colors.backgroundColorNew },
  viewContainer: {
    backgroundColor: R.colors.red500,
    height: getHeight() * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    alignSelf: 'center',
    marginTop: HEIGHT(40),
    fontWeight: 'bold',
    fontSize: getFontSize(24),
  },
  textDescription: {
    alignSelf: 'center',
    marginTop: HEIGHT(12),
    fontWeight: 'normal',
    fontSize: getFontSize(15),
    textAlign: 'center',
    width: WIDTH(300),
    lineHeight: getLineHeight(24),
  },
  viewComeBack: {
    alignSelf: 'center',
    width: WIDTH(200),
    backgroundColor: R.colors.red500,
    alignItems: 'center',
    justifyContent: 'center',
    height: HEIGHT(40),
    borderRadius: WIDTH(8),
    marginTop: HEIGHT(40),
  },
  textComeback: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: getFontSize(16),
  },
});
