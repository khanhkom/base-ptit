/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Text, View } from 'react-native';

import R from '@assets/R';
import { LOAI_LOP, WIDTH } from '@common';
import HeaderReal from '@libcomponents/header-real';
import ItemIconSVG from '@libcomponents/icon-svg';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { translate } from '@utils/i18n/translate';
import { Pressable } from 'native-base';

import styles from './styles';
import ThongTinChungLopHC from './ThongTinChung';

const ChiTietLopHC = (props: any) => {
  const data = props?.route?.params?.item;

  return (
    <View style={styles.container}>
      <HeaderReal
        title={translate('slink:Lop_hanh_chinh')}
        childrenRight={
          <ChildrenRight
            onPress={() =>
              navigateScreen(APP_SCREEN.THONGBAOGV, {
                loaiLop: LOAI_LOP.LOP_HC,
                infoClass: data,
              })
            }
          />
        }
      />
      <ViewHeader data={data} />
      <ThongTinChungLopHC dataLop={data} />
    </View>
  );
};

export default ChiTietLopHC;
const ViewHeader = ({ data }: { data: any }) => {
  return (
    <View style={[styles.containerText]}>
      <Text style={styles.textTitle}>
        {data?.ten ?? translate('slink:Chua_cap_nhat')}
      </Text>
      <View style={styles.line} />
      <View style={styles.viewSub}>
        <View style={styles.viewInfo}>
          <ItemIconSVG
            title={'Khối ngành'}
            color={R.colors.colorPink}
            width={WIDTH(24)}
            height={WIDTH(24)}
          />
          <Text style={styles.textInfo}>
            {data?.nganh?.ma ?? translate('slink:Chua_cap_nhat')}
          </Text>
        </View>
        <View style={styles.viewInfo}>
          <ItemIconSVG
            title={'Ngành-LHC'}
            color={R.colors.colorPink}
            width={WIDTH(24)}
            height={WIDTH(24)}
          />
          <Text style={styles.textInfo}>{`${
            data?.nganh?.ten ?? translate('slink:Chua_cap_nhat')
          }`}</Text>
        </View>
      </View>
    </View>
  );
};

const ChildrenRight = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable _pressed={R.themes.pressed} onPress={onPress}>
      <ItemIconSVG
        title={translate('slink:Notice_t')}
        color={R.colors.white}
        width={WIDTH(24)}
        height={WIDTH(24)}
      />
    </Pressable>
  );
};
