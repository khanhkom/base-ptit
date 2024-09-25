import React from 'react';
import { View } from 'react-native';

import FlatlistItem from '@features/TabMain/Item/FlatListItem';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';

import styles from './styles';

const listFunc = [
  {
    title: translate('slink:Khai_minh_chung'),
  },
  {
    title: translate('slink:Phieu_diem'),
  },
];

const DiemRenLuyen = () => {
  return (
    <View style={styles.container}>
      <HeaderReal title={translate('slink:Diem_ren_luyen')} />
      <FlatlistItem data={listFunc} />
    </View>
  );
};

export default DiemRenLuyen;
