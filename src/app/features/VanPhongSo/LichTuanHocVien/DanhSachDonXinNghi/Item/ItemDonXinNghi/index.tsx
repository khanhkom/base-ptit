/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import R from '@assets/R';
import { translate } from '@utils/i18n/translate';
import { Text } from 'native-base';

import styles from './styles';
import { getLineHeight } from '@common';

const ItemDonXinNghi = (props: any) => {
  const { item, index } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      testID={`itemLopHanhChinhGV-${index}`}
      disabled
      style={styles.itemNavStyle}>
      <View style={styles.content}>
        <Text
          style={styles.tenLop}
          color={R.colors.primaryColor}
          lineHeight={getLineHeight(24)}
          fontSize={'sm'}>
          {`${item?.ten ?? translate('slink:Chua_cap_nhat')} `}
        </Text>
        <Text lineHeight={getLineHeight(24)} color={'black'} fontSize={'xs'}>
          {item?.tenDonVi ?? translate('slink:Chua_cap_nhat')}
        </Text>
        <View style={[styles.viewMaLop]}>
          <Text style={styles.maLop} fontSize={'xs'}>
            Số lượng ngày nghỉ:{' '}
            <Text color={'black'} fontSize={'xs'}>
              {item?.totalDaysOff ?? translate('slink:Chua_cap_nhat')}
            </Text>
          </Text>
        </View>
        <View style={[styles.viewMaLop]}>
          <Text style={styles.maLop} fontSize={'xs'}>
            Thời gian nghỉ:{' '}
            <Text color={'black'} fontSize={'xs'}>
              {item?.restTimes ?? translate('slink:Chua_cap_nhat')}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemDonXinNghi;
