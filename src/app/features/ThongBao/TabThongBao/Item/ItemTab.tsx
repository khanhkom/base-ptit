/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, showImage, WIDTH } from '@common';
import { SUB_NAME_UPPERCASE } from '@env';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Badge, Pressable } from 'native-base';

const ImgNoti = ({ imageUrl }: { imageUrl?: string }) => {
  const imgNoti = imageUrl ? { uri: imageUrl ?? '' } : R.images.logoApp;

  return (
    <Pressable
      _pressed={R.themes.pressed}
      onPress={() => showImage([{ source: imgNoti, title: '' }])}
      style={styles.viewImgNoti}>
      <Image
        source={imgNoti}
        resizeMode="stretch"
        defaultSource={R.images.logoApp}
        style={styles.imgNoti}
      />
    </Pressable>
  );
};

const NewIcon = ({ itemTab }: { itemTab: any }) => {
  return typeof itemTab.read === 'boolean' && !itemTab.read ? (
    <Badge
      colorScheme="info"
      rounded="full"
      variant="solid"
      alignSelf="flex-start"
      _text={{
        fontSize: 'xs',
        fontFamily: R.fonts.BeVietnamProMedium,
      }}>
      N
    </Badge>
  ) : null;
};

const MoTa = ({ itemTab }: { itemTab: any }) => {
  const moTa = itemTab?.description;

  return itemTab?.description && itemTab?.description !== '' ? (
    <Text style={styles.content} numberOfLines={1}>
      {moTa}
    </Text>
  ) : (
    <></>
  );
};

const TitleAndContent = ({ itemTab }: { itemTab: any }) => {
  const nguoiGui = `${
    itemTab?.senderName ? itemTab?.senderName : SUB_NAME_UPPERCASE
  }`;

  return (
    <View style={styles.viewContent}>
      <Text style={styles.title} numberOfLines={2}>
        {itemTab?.title ?? ''}
      </Text>
      <MoTa itemTab={itemTab} />
      <View>
        <Text style={[styles.content, styles.ngayGui]}>
          {nguoiGui},
          <Text
            style={[
              styles.content,
              styles.ngayGui,
              { color: R.colors.colorTextDetail },
            ]}>{` ${translate('slink:Date')} ${moment(
            itemTab.createdAt ?? new Date(),
          ).format('DD/MM/YYYY')}`}</Text>
        </Text>
      </View>
    </View>
  );
};

interface Props {
  itemTab: any;
  onReadNoti: () => void;
}

const ItemTab: FunctionComponent<Props> = (props: Props) => {
  const { itemTab, onReadNoti } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.itemContainer}
      onPress={onReadNoti}>
      <ImgNoti imageUrl={itemTab?.imageUrl} />
      <TitleAndContent itemTab={itemTab} />
      <NewIcon itemTab={itemTab} />
    </TouchableOpacity>
  );
};

export default ItemTab;

const styles = StyleSheet.create({
  viewContent: { flex: 1, marginLeft: WIDTH(8) },
  itemContainer: {
    width: WIDTH(343),
    padding: WIDTH(12),
    alignSelf: 'center',
    backgroundColor: R.colors.white,
    marginBottom: HEIGHT(12),
    borderRadius: WIDTH(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...R.themes.shadowOffset,
  },
  viewImgNoti: {
    width: WIDTH(48),
    height: WIDTH(48),
    borderRadius: WIDTH(48) / 2,
    shadowColor: R.colors.black50p,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    backgroundColor: R.colors.white,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imgNoti: {
    width: WIDTH(48),
    height: WIDTH(48),
    borderRadius: WIDTH(24),
  },
  title: {
    // width: WIDTH(225),
    // flex: 1,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(24),
    fontFamily: R.fonts.BeVietnamProMedium,
    color: R.colors.black0,
  },
  content: {
    // width: WIDTH(225),
    fontSize: getFontSize(12),
    lineHeight: getLineHeight(20),
    fontFamily: R.fonts.BeVietnamProRegular,
    color: R.colors.grayText,
    marginVertical: HEIGHT(8),
  },
  ngayGui: {
    color: R.colors.colorPink,
    marginBottom: 0,
  },
});
