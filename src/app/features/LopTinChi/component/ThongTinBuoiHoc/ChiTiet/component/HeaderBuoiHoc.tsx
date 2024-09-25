import { View } from 'react-native';
import React from 'react';
import R from '@assets/R';
import styles from '../styles';
import { translate } from '@utils/i18n/translate';
import ItemIconSVG from '@libcomponents/icon-svg';
import { WIDTH } from '@common';
import { Text } from 'native-base';
const HeaderBuoiHoc = props => {
  const { infoCard, title } = props;
  const thoiGianBatDau = infoCard?.tietBatDau || '--';
  const thoiGianKetThuc = infoCard?.tietKetThuc || '--';

  return (
    <View style={[styles.containerText]}>
      <Text style={styles.textTitle}>
        {infoCard?.lopHocPhan?.hocPhan?.ten || translate('slink:Chua_cap_nhat')}
      </Text>
      <Text style={styles.buoi}>{title}</Text>
      <View style={styles.line} />
      <View style={styles.viewSub}>
        <View style={styles.viewInfo}>
          <ItemIconSVG
            title={translate('slink:Address')}
            color={R.colors.grayText}
            width={WIDTH(24)}
            height={WIDTH(24)}
          />
          <Text style={styles.textInfo}>
            {infoCard?.phongHoc || translate('slink:Chua_cap_nhat')}
          </Text>
        </View>
        <View style={styles.viewInfo}>
          <ItemIconSVG
            title={translate('slink:time')}
            color={R.colors.grayText}
            width={WIDTH(24)}
            height={WIDTH(24)}
          />
          <Text style={styles.textInfo}>{`${translate(
            'slink:Tiet',
          )} ${thoiGianBatDau} - ${thoiGianKetThuc}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderBuoiHoc;
