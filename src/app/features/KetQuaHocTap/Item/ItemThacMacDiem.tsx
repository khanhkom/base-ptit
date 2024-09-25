import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';
import { translate } from '@utils/i18n/translate';

import R from '../../../assets/R';

const ItemThacMacDiem = (props: { item: any; onNavigate?: any }) => {
  const { item, onNavigate } = props;

  const color = item?.daDuyet ? R.colors.green2F9E44 : R.colors.redText;

  return (
    <TouchableOpacity
      style={styles.itemNavStyle}
      activeOpacity={0.6}
      onPress={() => onNavigate && onNavigate()}
      disabled={false}>
      <View style={styles.contentLeft}>
        <Text style={[styles.textNav]}>
          {item?.tenHocPhan || translate('slink:Chua_cap_nhat')}
        </Text>

        <View style={styles.twoText}>
          <Text style={[styles.textInfo]}>
            Học kỳ:
            {` ${
              item?.maKyHoc?.substring(0, 4) || translate('slink:Chua_cap_nhat')
            }-${
              item?.maKyHoc?.substring(4, 5) || translate('slink:Chua_cap_nhat')
            }`}
          </Text>
          <View
            style={{
              padding: WIDTH(2),
              borderRadius: WIDTH(2),
              paddingHorizontal: WIDTH(4),
              backgroundColor: color,
            }}>
            <Text style={[styles.redText]}>
              {item?.daDuyet
                ? translate('slink:Ans')
                : translate('slink:Not_ans')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemThacMacDiem;

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
    fontSize: getFontSize(12),
    color: R.colors.gray6B,
    lineHeight: getLineHeight(18),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  redText: {
    fontSize: getFontSize(12),
    color: R.colors.white100,
    lineHeight: getLineHeight(16),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
});
