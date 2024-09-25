import React from 'react';
import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { formatVND, getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';
import ItemIconSVG from '@libcomponents/icon-svg';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';

import R from '../../../assets/R';
import { translate } from '@utils/i18n/translate';

const ItemLichSu = (props: { item: any; onNavigate?: any }) => {
  const { item, onNavigate } = props;

  return (
    <TouchableOpacity
      style={styles.itemNavStyle}
      activeOpacity={0.6}
      onPress={() => onNavigate && onNavigate()}
      disabled={true}>
      <View style={styles.contentLeft}>
        <Text style={[styles.textInfo]}>
          {translate('slink:Time_start')}:{'  '}
          <Text
            style={{
              color: R.colors.primaryColor,
              fontFamily: R.fonts.BeVietnamProMedium,
            }}>
            {item?.thoiGianCheckIn
              ? moment(item?.thoiGianCheckIn ?? new Date()).format(
                  'hh:mm DD/MM/YYYY',
                )
              : ''}
          </Text>
        </Text>
        <Text style={[styles.textInfo]}>
          {translate('slink:Time_end')}:{' '}
          <Text
            style={{
              color: R.colors.primaryColor,
              fontFamily: R.fonts.BeVietnamProMedium,
            }}>
            {item?.thoiGianCheckOut
              ? moment(item?.thoiGianCheckOut ?? new Date()).format(
                  'hh:mm DD/MM/YYYY',
                )
              : ''}
          </Text>
        </Text>
        <View style={styles.twoText}>
          <Text style={[styles.textInfo]}>
            {translate('slink:Session')}:{' '}
            <Text
              style={{
                color: R.colors.primaryColor,
                fontFamily: R.fonts.BeVietnamProMedium,
              }}>
              {item?.buoi}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemLichSu;

const styles = StyleSheet.create({
  itemNavStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    minHeight: HEIGHT(60),
    paddingVertical: HEIGHT(12),
    paddingHorizontal: WIDTH(16),
    // paddingRight: WIDTH(16),
    width: WIDTH(343),
    backgroundColor: R.colors.white,
    marginBottom: HEIGHT(12),
    borderRadius: WIDTH(8),
  },
  twoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: WIDTH(311),
    marginTop: HEIGHT(4),
  },
  contentLeft: {
    // width: WIDTH(270),
    // flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textNav: {
    fontSize: getFontSize(14),
    color: R.colors.black0,
    lineHeight: getLineHeight(18),
    marginBottom: HEIGHT(8),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  textInfo: {
    fontSize: getFontSize(14),
    color: R.colors.black0,
    lineHeight: getLineHeight(18),
    // marginLeft: WIDTH(20),
    fontFamily: R.fonts.BeVietnamProSemiBold,
  },
  redText: {
    fontSize: getFontSize(14),
    color: R.colors.primaryColor,
    lineHeight: getLineHeight(18),
    // marginLeft: WIDTH(20),
    fontFamily: R.fonts.BeVietnamProBold,
  },
  image: {
    width: WIDTH(21),
    height: WIDTH(21),
  },
  viewIcon: {
    width: WIDTH(36),
    height: WIDTH(36),
    borderRadius: WIDTH(36) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.colorPink,
  },
});
