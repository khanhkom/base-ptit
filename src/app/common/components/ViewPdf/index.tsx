import React, { useEffect } from 'react';
import { View, BackHandler } from 'react-native';

import Pdf from 'react-native-pdf';

import HeaderReal from '@libcomponents/header-real';

import styles from './styles';
import { goBack } from '@navigation/navigation-service';
interface Props {
  route: { params: { content?: { sourcePDF?: string; title?: string } } };
}
const SeePDF = (props: Props) => {
  const sourcePDF = {
    uri: props.route.params?.content?.sourcePDF ?? '',
    cache: true,
  };
  const handleBackPress = () => {
    goBack();

    return true;
  };

  const title = props.route.params?.content?.title ?? '';
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  return (
    <View style={styles.cntViewPDF}>
      <HeaderReal title={title} />
      <View style={styles.cntPDF} testID="SeePDF">
        <Pdf trustAllCerts={false} source={sourcePDF} style={styles.pdf} />
      </View>
    </View>
  );
};

export default SeePDF;
