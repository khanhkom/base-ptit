/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import R from '@assets/R';
import { getBookmarkColorByGrade, getFontSize, HEIGHT } from '@common';
import ItemIconSVG from '@libcomponents/icon-svg';
import { translate } from '@utils/i18n/translate';
import { Badge, Text, VStack } from 'native-base';

import styles from './styles';
import BadgeCustome from '../Badge';

const ItemLopTinChi = (props: any) => {
  const { item, onPress, account } = props;

  const diemDangChu = item?.diem?.diemChu;

  return (
    <TouchableOpacity onPress={onPress && onPress} style={styles.container}>
      <View style={styles.viewPosition}>
        <ItemIconSVG title={'card-LTC-1'} />
      </View>
      <View style={styles.viewPosition1}>
        <ItemIconSVG title={'card-LTC-3'} />
      </View>
      {diemDangChu && (
        <View style={styles.flag}>
          <View style={styles.triangleCorner} />
          <View
            style={[
              styles.flagContent,
              {
                backgroundColor: getBookmarkColorByGrade(diemDangChu),
              },
            ]}>
            <Text style={styles.flagTxt}>{diemDangChu}</Text>
          </View>
        </View>
      )}
      <VStack flex={1}>
        {account?.isGiaoVien ? (
          <Badge
            mb={HEIGHT(8)}
            backgroundColor={R.colors.colorMain}
            alignSelf={'flex-start'}>
            <Text
              color={R.colors.white}
              fontSize={getFontSize(12)}
              fontFamily={R.fonts.BeVietnamProMedium}>
              {item?.maLop ?? '--'}
            </Text>
          </Badge>
        ) : (
          <BadgeCustome
            value={`${item?.stc || item?.stc?.soTinChi || 0} ${translate(
              'slink:Credits',
            )?.toLowerCase()}`}
          />
        )}
        <Text
          numberOfLines={3}
          fontFamily={R.fonts.BeVietnamProMedium}
          fontSize={getFontSize(14)}>
          {item?.hocPhan?.ten ?? ''}
        </Text>
      </VStack>
    </TouchableOpacity>
  );
};

export default ItemLopTinChi;
