import React from 'react';
import { View } from 'react-native';

import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';

import ListCongNo from './Item/ListCongNo';
import styles from './styles';

const CongNo = () => {
  return (
    <View style={styles.container} testID="TabDVu1Cua">
      <HeaderReal title={translate('slink:Debt')} />
      <ListCongNo />
    </View>
  );
};

export default CongNo;
