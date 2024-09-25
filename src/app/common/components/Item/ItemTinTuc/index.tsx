/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Image,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';

import R from '@assets/R';
import { EDaLuu, MapKeyDaLuu } from '@config/constant';
import { decodeHTMLEntities, HEIGHT } from '@config/function';
import { DEFAULT_MOST_USED_FUNCTION_CONFIG } from '@config/module';
import { deleteItemSaved, saveItem } from '@networking/user/DaLuu';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { HStack, Text, VStack } from 'native-base';

import styles from './styles';

import TextSaved from '../TextSaved';

interface Props {
  content: any;
  title: string;
  index?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onRefresh?: () => void;
  isSaved: boolean;
  idSaved: string;
  newsWP: boolean;
}
const TypeNew = (props: Props) => {
  const {
    content,
    title,
    index,
    style,
    isSaved,
    idSaved,
    newsWP,
    onRefresh,
    onPress,
  } = props;

  const isHasSave = DEFAULT_MOST_USED_FUNCTION_CONFIG?.includes(
    translate('slink:Saved'),
  );

  const { account } = useSelector(selectAppConfig);

  const onSaved = async () => {
    try {
      let response: any;
      if (isSaved) {
        response = await deleteItemSaved(idSaved);
      } else {
        const body = {
          loaiThongTin: MapKeyDaLuu[EDaLuu.TIN_TUC],
          sourceId: `${content?.id}`,
          thongTin: content,
          userSsoId: account?.ssoId,
        };

        response = await saveItem(body);
      }

      if (response?.status) {
        onRefresh && onRefresh();
      }
    } catch (error) {}
  };

  const subTitle = newsWP
    ? content.content?.rendered.replace(/<[^>]+>|&nbsp;/g, '')
    : content?.moTa;

  const img = newsWP
    ? content?._embedded?.['wp:featuredmedia']?.[0]?.source_url
    : content?.urlAnhDaiDien;

  const createdAt = newsWP ? content?.date : content?.ngayDang;

  return (
    <TouchableOpacity
      testID={`TypeNew ${index}`}
      activeOpacity={0.7}
      style={[styles.container, style]}
      onPress={onPress && onPress}>
      <View style={styles.cntImage}>
        <Image
          source={{
            uri: img,
          }}
          resizeMode={FastImage.resizeMode.cover}
          defaultSource={R.images.tinTuc}
          style={styles.cntImage}
        />
      </View>
      <View style={styles.viewContent}>
        <VStack flex={1} mb={HEIGHT(4)}>
          <Text style={styles.textTitle} numberOfLines={2}>
            {decodeHTMLEntities(
              title?.toString()?.trim() || translate('slink:Chua_cap_nhat'),
            )}
          </Text>
          {subTitle && (
            <Text style={[styles.textChuDe]} numberOfLines={1}>
              {subTitle?.trim() || translate('slink:Chua_cap_nhat')}
            </Text>
          )}
        </VStack>
        <HStack justifyContent={'space-between'} alignItems={'flex-end'}>
          <Text
            numberOfLines={1}
            flex={1}
            mr="2"
            fontFamily={R.fonts.BeVietnamProRegular}
            fontSize={'xs'}
            color={R.colors.grayText}>
            {`${translate('slink:Ngay_dang', {
              time: moment(createdAt).format('HH:mm DD/MM/YYYY'),
            })}`}
          </Text>
          <TextSaved visible={isHasSave} isSaved={isSaved} onPress={onSaved} />
        </HStack>
      </View>
    </TouchableOpacity>
  );
};

export default TypeNew;
