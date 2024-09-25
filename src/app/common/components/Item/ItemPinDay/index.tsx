import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

const ItemPindDay = ({
  ngayPindCur,
  isVisible,
  format,
}: {
  ngayPindCur: string;
  isVisible: boolean;
  format?: string;
}) => {
  if (isVisible) {
    return (
      <View style={styles.viewDay}>
        <Text style={styles.textNgay}>
          {ngayPindCur === moment().format(format ?? 'YYYY-MM-DD')
            ? translate('slink:toDay')
            : moment(ngayPindCur, format ?? 'YYYY-MM-DD').format('DD/MM/YYYY')}
        </Text>
      </View>
    );
  } else {
    return <></>;
  }
};

export default ItemPindDay;

const styles = StyleSheet.create({
  viewDay: {
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    top: HEIGHT(5),
    borderRadius: WIDTH(20),
    paddingVertical: HEIGHT(8),
    paddingHorizontal: WIDTH(16),
    zIndex: 10,
    backgroundColor: R.colors.white,
    ...R.themes.shadowGray,
  },
  textNgay: {
    fontFamily: R.fonts.BeVietnamProMedium,
    lineHeight: getLineHeight(20),
    fontSize: getFontSize(14),
  },
});
