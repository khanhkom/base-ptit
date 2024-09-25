/* eslint-disable @typescript-eslint/no-shadow */

import React from 'react';

import RenderHTML, {
  CustomBlockRenderer,
  TNodeChildrenRenderer,
} from 'react-native-render-html';

import R from '@assets/R';
import { getWidth, HEIGHT, removeStyles, showLink, WIDTH } from '@common';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Badge, Box, HStack, Pressable, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

interface Props {
  item: any;
  onEdit: () => void;
  onRefresh: () => void;
}

const ItemBaiTapSinhVien = (props: Props) => {
  const { item, onRefresh } = props;

  console.log('🚀 ~ ItemBaiTap ~ item:', item);

  const html = `${item?.assignment?.huongDanNop ?? 'Không có mô tả'}`;

  const renderHtmlProps = {
    source: { html: removeStyles(html) },
    renderers: {
      p: ParagraphRenderer,
    },
  };

  const ngayDang = moment(item?.assignment?.thoiGianKetThuc).format(
    'HH:mm DD/MM/YYYY',
  );

  const hanNop = item?.assignment?.thoiGianLamBaiQuiz
    ? `${item?.assignment?.thoiGianLamBaiQuiz} phút (Hạn ${ngayDang})`
    : `Hạn ${ngayDang}`;

  const goToBinhLuan = () => {
    navigateScreen(APP_SCREEN.KHAOSATBAITAP, {
      itemBaiTap: item?.assignment,
      itemSinhVien: item,
      onRefresh,
      isSinhVien: true,
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
        <Box flexDir={'row'} justifyContent={'space-between'}>
          <Box>
            <Text bold fontSize={'md'}>
              {item?.assignment?.noiDung}
            </Text>
            <Text fontSize={'sm'} color={R.colors.grayba}>
              {hanNop}
            </Text>
          </Box>
          <Badge
            height={HEIGHT(32)}
            colorScheme={item?.trangThai === 'DA_NOP' ? 'green' : 'red'}>
            {item?.trangThai === 'DA_NOP' ? 'Đã nộp' : 'Chưa nộp'}
          </Badge>
        </Box>

        <Box maxH={HEIGHT(60)} overflow={'hidden'}>
          <RenderHTML {...renderHtmlProps} />
        </Box>
        <Pressable _pressed={R.themes.pressed} onPress={goToBinhLuan}>
          <Text underline color={R.colors.textLink}>
            Xem thêm
          </Text>
        </Pressable>
        {item?.assignment?.fileDinhKem &&
          item?.assignment?.fileDinhKem?.map(item => {
            return (
              <Pressable
                _pressed={R.themes.pressed}
                onPress={() => {
                  handleSeeDocument(item, getNameFile(item));
                }}>
                <HStack mt={'3'}>
                  <Icon name="file" size={WIDTH(16)} />
                  <Text ml={'2'}>{getNameFile(item)}</Text>
                </HStack>
              </Pressable>
            );
          })}
      </Box>

      <HStack justifyContent={'space-between'}>
        <HStack>
          <Text ml={'5'} mt="2" fontSize={'md'} color={R.colors.green007F3E}>
            Điểm số: {item?.tongDiem ?? '--'}
          </Text>
        </HStack>
      </HStack>
    </Pressable>
  );
};

export default ItemBaiTapSinhVien;
const handleSeeDocument = (item, name) => {
  showLink(item, name);
};

const ParagraphRenderer: CustomBlockRenderer = function ParagraphRenderer({
  TDefaultRenderer,
  tnode,
  type,
  ...props
}) {
  return (
    <TDefaultRenderer type={'block'} tnode={tnode} {...props}>
      <TNodeChildrenRenderer
        tnode={tnode}
        renderChild={({ childElement }) => {
          return type === 'block' ? (
            <Text numberOfLines={2}>{childElement}</Text>
          ) : (
            <Text numberOfLines={2}>{childElement}</Text>
          );
        }}
      />
    </TDefaultRenderer>
  );
};

function getNameFile(url: string): string {
  if (typeof url !== 'string') {
    return 'Đường dẫn không đúng';
  }

  return decodeURI(url.split('/')?.at(-1) ?? '');
}
