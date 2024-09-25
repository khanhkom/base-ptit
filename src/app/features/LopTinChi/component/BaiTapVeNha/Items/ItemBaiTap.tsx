/* eslint-disable @typescript-eslint/no-shadow */

import React from 'react';

import RenderHTML from 'react-native-render-html';

import R from '@assets/R';
import {
  getWidth,
  HEIGHT,
  htmlProps,
  removeStyles,
  showLink,
  WIDTH,
} from '@common';
import TextChuaCapNhat from '@components/Item/TextChuaCapNhat';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Box, HStack, Pressable, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import HeaderBTVN from './HeaderBTVN';

import { BaiTapVeNhaProps } from '../type';

require('moment/locale/vi');

interface Props {
  item: BaiTapVeNhaProps;
  onEdit: () => void;
  onRefresh: () => void;
}

const ItemBaiTap = (props: Props) => {
  const { item, onEdit, onRefresh } = props;

  const html = `${item?.huongDanNop}`;

  const ngayDang = moment(item?.thoiGianKetThuc).format('HH:mm DD/MM/YYYY');

  const hanNop = item?.thoiGianLamBaiQuiz
    ? translate('slink:Dead_line_long', {
        time: item?.thoiGianLamBaiQuiz,
        ngayDang,
      })
    : translate('slink:Dead_line', { ngayDang });

  const goToBinhLuan = () => {
    navigateScreen(APP_SCREEN.CHITIETBAITAP, {
      item,
      onRefresh,
      onEdit,
    });
  };

  return (
    <Pressable
      w={getWidth()}
      mt={'2'}
      paddingY={'4'}
      _pressed={R.themes.pressed}
      onPress={goToBinhLuan}
      backgroundColor={'white'}
      style={R.themes.shadowOffset}>
      <Box paddingX={WIDTH(16)}>
        <HeaderBTVN
          item={item}
          onEdit={onEdit}
          onRefresh={onRefresh}
          hanNop={hanNop}
        />
        <Box maxH={HEIGHT(60)} overflow={'hidden'}>
          {item?.huongDanNop ? (
            <RenderHTML
              {...htmlProps}
              renderersProps={{
                iframe: {
                  scalesPageToFit: true,
                  webViewProps: {},
                },
              }}
              contentWidth={WIDTH(343)}
              source={{ html: removeStyles(html) }}
            />
          ) : (
            <TextChuaCapNhat />
          )}
        </Box>
        <Pressable _pressed={R.themes.pressed} onPress={goToBinhLuan}>
          <Text underline color={R.colors.textLink}>
            Xem thêm
          </Text>
        </Pressable>
        {item?.urlTepDinhKem &&
          item?.urlTepDinhKem?.map(item => {
            return (
              <Pressable
                _pressed={R.themes.pressed}
                onPress={() => {
                  showLink(item);
                }}>
                <HStack mt={'3'}>
                  <Icon name="file" size={WIDTH(16)} />
                  <Text ml={'2'}>{getNameFile(item)}</Text>
                </HStack>
              </Pressable>
            );
          })}
      </Box>
    </Pressable>
  );
};

export default ItemBaiTap;

function getNameFile(url: string): string {
  if (typeof url !== 'string') {
    return 'Đường dẫn không đúng';
  }

  return decodeURI(url.split('/')?.at(-1) ?? '');
}
