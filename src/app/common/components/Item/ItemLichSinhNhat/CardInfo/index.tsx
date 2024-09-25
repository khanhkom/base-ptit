/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import FastImage from 'react-native-fast-image';

import R from '@assets/R';
import { getFontSize } from '@config/function';
import moment from 'moment';
import { Badge, Box } from 'native-base';

import styles from './styles';

const CardInfo = ({ showDetail, item }: any) => {
  const visibleTagNew = item?.thoiGian === moment().format('DD-MM-YYYY');

  const fullname = `${item?.hoDem || ''} ${item?.ten || ''}`;

  const chucVu = item?.chucVuChinh?.ten ?? '--';

  const donViChinh = item?.donViChinh?.ten ?? '--';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={showDetail && showDetail}
      style={[styles.container]}>
      <Box flexDirection={'row'} justifyContent="space-between">
        <Box style={styles.img}>
          <FastImage
            style={styles.img}
            source={R.images.logoApp}
            resizeMode="contain"
          />
        </Box>
        {visibleTagNew && (
          <Badge
            colorScheme="info"
            rounded="full"
            variant="solid"
            alignSelf="flex-start"
            _text={{
              fontSize: getFontSize(12),
            }}>
            N
          </Badge>
        )}
      </Box>
      <Text style={styles.fullname}>{`${fullname} (${moment(
        item?.ngaySinh,
        'YYYY-MM-DD',
      ).format('DD-MM-YYYY')})`}</Text>
      <Text style={styles.donVi}>{`${chucVu} - ${donViChinh}`}</Text>
    </TouchableOpacity>
  );
};

export default CardInfo;
