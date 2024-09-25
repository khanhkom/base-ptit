import React, { useEffect } from 'react';
import { View } from 'react-native';

// styles

import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';

import styles from './styles';
import GiaLapDiem from './GiaLapDiem';

const MayTinhThongMinh = () => {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <HeaderReal title={translate('slink:Smart_computer')} />
      <GiaLapDiem />
    </View>
  );
};

export default MayTinhThongMinh;
