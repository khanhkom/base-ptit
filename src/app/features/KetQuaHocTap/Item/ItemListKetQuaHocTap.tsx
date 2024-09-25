/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { formatVND, getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';
import { Divider } from '@libcomponents';
import ItemIconSVG from '@libcomponents/icon-svg';
import { translate } from '@utils/i18n/translate';
import Icon from 'react-native-vector-icons/Feather';

import R from '../../../assets/R';

const ItemListKetQuaHocTap = (props: {
  index: number;
  item: any;
  onNavigate?: any;
}) => {
  const { item, onNavigate, index } = props;

  const fakeData: any = {
    stt: index,
    name: item?.tenMonHoc,
    tc: item?.soTinChi,
    summary: item?.tongKetHe10,
    summary4: item?.tongKetHe4,
    summaryText: item?.tongKetChu,
  };

  const mappingFieldHeader = [
    {
      name: translate('slink:No'),
      width: WIDTH(30),
    },
    {
      name: translate('slink:Course_name'),
      width: WIDTH(136),
    },
    {
      name: translate('slink:Number_of_credits_short'),
      width: WIDTH(120),
    },
    {
      name: translate('slink:Score_10'),
      width: WIDTH(120),
    },
    {
      name: translate('slink:Score_4'),
      width: WIDTH(120),
    },
    {
      name: translate('slink:Summary'),
      width: WIDTH(140),
    },
  ];

  const mappingField = [
    {
      name: 'stt',
      width: WIDTH(30),
    },
    {
      name: 'name',
      width: WIDTH(136),
    },
    {
      name: 'tc',
      width: WIDTH(120),
    },
    {
      name: 'summary',
      width: WIDTH(120),
    },
    {
      name: 'summary4',
      width: WIDTH(120),
    },
    {
      name: 'summaryText',
      width: WIDTH(140),
    },
  ];

  if (index === 0) {
    return (
      <TouchableOpacity
        style={[
          styles.itemNavStyle,
          {
            backgroundColor: R.colors.primaryColor,
          },
        ]}
        activeOpacity={0.6}
        onPress={() => onNavigate && onNavigate()}
        disabled>
        {mappingFieldHeader?.map(item => {
          return (
            <Text
              style={[
                styles?.textMain,
                {
                  width: item?.width ?? WIDTH(60),
                  fontFamily: R.fonts.BeVietnamProExtraBold,
                },
              ]}>
              {item?.name}
            </Text>
          );
        })}
      </TouchableOpacity>
    );
  }

  return (
    <>
      <TouchableOpacity
        style={styles.itemNavStyle}
        activeOpacity={0.6}
        onPress={() => onNavigate && onNavigate()}
        disabled={false}>
        {mappingField?.map(item => {
          return (
            <Text
              style={[
                styles?.textMain,
                {
                  width: item?.width ?? WIDTH(60),
                  color: R.colors.black0,
                },
              ]}>
              {fakeData?.[item?.name]}
            </Text>
          );
        })}
      </TouchableOpacity>
      <Divider />
    </>
  );
};

export default ItemListKetQuaHocTap;

const styles = StyleSheet.create({
  itemNavStyle: {
    // paddingVertical: HEIGHT(12),
    paddingHorizontal: WIDTH(16),
    height: HEIGHT(60),
    // width: WIDTH(640),
    // backgroundColor: '#E3EBFF',
    // marginLeft: WIDTH(16),
    borderRadius: WIDTH(8),
    // justifyContent:"center",
    marginHorizontal: WIDTH(4),
    flexDirection: 'row',
  },
  textMain: {
    marginRight: WIDTH(20),
    // marginTop: HEIGHT(9),
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(18),
    textAlign: 'center',
    alignSelf: 'center',
    color: R.colors.white100,
  },
  twoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: WIDTH(311),
    marginTop: HEIGHT(4),
  },
  flag: {
    alignSelf: 'flex-end',
    marginTop: HEIGHT(-4),
    marginRight: WIDTH(12),
    // width: WIDTH(270),
    alignItems: 'flex-start',
    flexDirection: 'row',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
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
    // marginLeft: WIDTH(20),
    fontFamily: R.fonts.BeVietnamProMedium,
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
