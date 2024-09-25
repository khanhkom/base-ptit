import React from 'react';
import { View } from 'react-native';

import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';

import DanhSachTinTucV2 from './DanhSachTinTuc';
import styles from './styles';

const TinTucSKV2 = () => {
  return (
    <View style={styles.container}>
      <HeaderReal title={translate('slink:News')} />
      <DanhSachTinTucV2 />
    </View>
  );
};

export default TinTucSKV2;
