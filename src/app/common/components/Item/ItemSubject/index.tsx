/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-inline-comments */
import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import R from '@assets/R';
import {
  getBookmarkColorByGrade,
  getFontSize,
  getLineHeight,
  HEIGHT,
  TRANG_THAI_HOC,
  WIDTH,
} from '@common';
import BadgeCustome from '@components/Item/Badge';
import ItemIconSVG from '@libcomponents/icon-svg';
import { AccountProps } from '@model/app';
import { translate } from '@utils/i18n/translate';
import { Badge, Text, VStack } from 'native-base';

import ModalMonHoc from '../ModalMonHoc';
interface Props {
  maLop?: string;
  soTinChi?: string | number | undefined;
  account?: AccountProps | null;
  tenMon?: string;
  visiblePoint?: boolean;
  backgroundColor?: string;
  onPress?: () => void;
  listPoint?: string[];
  item?: any;
  hinhThucDanhGia?: any;
  hasModal?: boolean;
}
const ItemSubject = (props: Props) => {
  const {
    maLop,
    soTinChi,
    account,
    tenMon,
    visiblePoint,
    onPress,
    listPoint,
    item,
    hinhThucDanhGia,
    hasModal,
  } = props;

  const [visible, setVisible] = useState(false);

  let backgroundColor = R.colors.whitef0;
  const daHoc = [
    TRANG_THAI_HOC.DA_HOC,
    TRANG_THAI_HOC.DANG_HOC,
    TRANG_THAI_HOC.CHUA_DAT,
  ].includes(item?.hocPhan?.hoc ?? item?.hoc);

  if (daHoc) {
    backgroundColor = '#E3EBFF';
  }

  const onDetail = () => {
    if (hasModal) {
      setVisible(true);
    } else {
      onPress && onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.itemNavStyle, { backgroundColor }]}
      activeOpacity={0.6}
      onPress={onDetail}
      disabled={false}>
      <View style={styles.viewPosition}>
        <ItemIconSVG title={'card-LTC-1'} />
      </View>
      <View style={styles.viewPosition1}>
        <ItemIconSVG title={'card-LTC-3'} />
      </View>
      {visiblePoint && (
        <View style={styles.flag}>
          <FlatList
            data={listPoint}
            horizontal
            ListEmptyComponent={<TagDiem isLast item={'--'} />}
            renderItem={({ item }) => <TagDiem isLast={true} item={item} />}
          />
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
              {maLop ?? '--'}
            </Text>
          </Badge>
        ) : (
          <BadgeCustome
            value={`${soTinChi || 0} ${translate(
              'slink:Credits',
            )?.toLowerCase()}`}
          />
        )}
        <Text
          numberOfLines={3}
          fontFamily={R.fonts.BeVietnamProMedium}
          fontSize={getFontSize(14)}>
          {tenMon || '--'}
        </Text>
      </VStack>
      <ModalMonHoc
        chuyenNganh={item?.chuyenNganh?.ten}
        hinhThucDanhGia={hinhThucDanhGia}
        itemData={item}
        isVisible={visible}
        closeButton={() => setVisible(false)}
      />
    </TouchableOpacity>
  );
};

export default ItemSubject;
const TagDiem = ({ item, isLast }: { item: string; isLast: boolean }) => {
  return (
    <>
      <View style={styles.triangleCorner} />
      <View
        style={[
          styles.flagContent,
          isLast && styles.flagContentisLast,
          {
            backgroundColor: getBookmarkColorByGrade(item), //mau cờ
          },
        ]}>
        <Text style={[styles.flagTxt, isLast && styles.flagTxtIsLast]}>
          {item || '--'}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flagTxt: {
    color: R.colors.white100,
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(11),
    lineHeight: getLineHeight(16),
  },
  flagTxtIsLast: {
    color: R.colors.white100,
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(13),
    lineHeight: getLineHeight(16),
  },

  flagContent: {
    width: WIDTH(16),
    height: WIDTH(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagContentisLast: {
    width: WIDTH(26),
    height: WIDTH(26),
    alignItems: 'center',
    justifyContent: 'center',
  },
  triangleCorner: {
    marginLeft: WIDTH(4),
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: WIDTH(4),
    borderTopWidth: WIDTH(4),
    borderRightColor: 'transparent',
    borderTopColor: R.colors.black0,
    transform: [{ rotate: '180deg' }],
  },
  itemNavStyle: {
    width: WIDTH(163),
    backgroundColor: 'white',
    marginTop: HEIGHT(12),
    borderRadius: WIDTH(8),
    // marginHorizontal: WIDTH(4),
    paddingHorizontal: WIDTH(14),
    paddingVertical: HEIGHT(14),
    minHeight: HEIGHT(90),
    marginBottom: HEIGHT(0),
    ...R.themes.shadowOffset,
  },
  viewPosition1: { position: 'absolute', top: HEIGHT(14), left: 0 },
  viewPosition: { position: 'absolute', bottom: 0, right: 0 },
  flag: {
    position: 'absolute',
    right: WIDTH(12),
    top: -WIDTH(4),
  },
});
