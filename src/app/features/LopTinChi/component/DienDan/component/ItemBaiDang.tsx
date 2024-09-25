/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import RenderHTML, {
  CustomBlockRenderer,
  TNodeChildrenRenderer,
} from 'react-native-render-html';

import R from '@assets/R';
import {
  capitalizeFirstLetter,
  getWidth,
  HEIGHT,
  popupCancel,
  popupOk,
  removeStyles,
  showLink,
  WIDTH,
} from '@common';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { delBaiDang, putBaiDang } from '@networking/user/DienDanBinhLuan';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import {
  Avatar,
  Box,
  Divider,
  HStack,
  Menu,
  Pressable,
  Text,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { BaiDangProps } from '../types';

require('moment/locale/vi');

interface Props {
  item: BaiDangProps;
  onEdit: () => void;
  onRefresh: () => void;
}

const ItemBaiDang = (props: Props) => {
  const { item, onEdit, onRefresh } = props;

  const html = `${item?.noiDung ?? translate('slink:Chua_cap_nhat')}`;

  const renderHtmlProps = {
    source: { html: removeStyles(html) },
    renderers: {
      p: ParagraphRenderer,
    },
  };

  const ngayDang = moment(item?.ngayDang);

  const goToBinhLuan = () => {
    navigateScreen(APP_SCREEN.BINHLUAN, { item, onRefresh });
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
        <Box flexDir={'row'}>
          <Avatar source={{ uri: item?.thongTinNguoiDang?.avatar }}>
            {item?.thongTinNguoiDang?.hoTen?.[0]?.toUpperCase() ?? ''}
          </Avatar>
          <Box>
            <Text bold ml={'2'} fontSize={'md'}>
              {item?.thongTinNguoiDang?.hoTen}
              {item?.thongTinNguoiDang?.isGiaoVien ? (
                <>
                  {' '}
                  <AntDesign
                    name="checkcircleo"
                    size={WIDTH(12)}
                    color={R.colors.green007F3E}
                  />
                </>
              ) : (
                ` (${item?.thongTinNguoiDang?.ma})`
              )}
            </Text>
            <Text ml={'2'} fontSize={'sm'} color={R.colors.grayba}>
              {capitalizeFirstLetter(ngayDang.calendar())}
            </Text>
          </Box>
          <MenuRight item={item} onEdit={onEdit} onRefresh={onRefresh} />
        </Box>
        <Text bold numberOfLines={2} mt="2">
          {item?.tieuDe}
        </Text>
        <Box maxH={HEIGHT(60)} overflow={'hidden'}>
          <RenderHTML {...renderHtmlProps} />
        </Box>
        <Pressable _pressed={R.themes.pressed} onPress={goToBinhLuan}>
          <Text underline color={R.colors.textLink}>
            Xem thêm
          </Text>
        </Pressable>
        {item?.fileDinhKem &&
          item?.fileDinhKem?.map(item => {
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

      <Divider my="2" />
      <HStack justifyContent={'space-between'}>
        <HStack>
          <Text ml={'4'} mt="2" fontSize={'sm'} color={R.colors.grayba}>
            {item?.soDaXem} đã xem
          </Text>
          <Text ml={'4'} mt="2" fontSize={'sm'} color={R.colors.grayba}>
            {item?.danhSachBinhLuan?.length ?? 0} bình luận
          </Text>
        </HStack>
        <Pressable _pressed={R.themes.pressed} onPress={goToBinhLuan}>
          <HStack alignItems={'center'}>
            <Icon
              name="message-circle"
              size={WIDTH(16)}
              style={{ marginTop: HEIGHT(8) }}
            />
            <Text ml={'2'} mr={'4'} mt="2" fontSize={'sm'}>
              Bình luận
            </Text>
          </HStack>
        </Pressable>
      </HStack>
    </Pressable>
  );
};

export default ItemBaiDang;
const handleSeeDocument = (item, name) => {
  showLink(item, name);
};

const MenuRight = ({ item, onEdit, onRefresh }) => {
  const onDelete = async () => {
    try {
      await delBaiDang(item?._id);

      popupOk(translate('slink:Notice_t'), 'Xoá bài viết thành công');

      onRefresh();
    } catch (error) {}
  };

  const onDeleteAsk = () => {
    popupCancel(
      translate('slink:Notice_t'),
      'Bạn có chắc chắn muốn xoá bài viết này?',
      () => onDelete(),
    );
  };

  const onPin = async () => {
    try {
      await putBaiDang({ ghimBaiViet: !item?.ghimBaiViet }, item?._id);

      onRefresh();
    } catch (error) {}
  };

  return (
    <HStack position={'absolute'} right={0}>
      {item?.ghimBaiViet && (
        <Box mr={WIDTH(16)}>
          <MaterialCommunityIcons
            size={WIDTH(20)}
            name="pin"
            color={R.colors.primaryColor}
          />
        </Box>
      )}

      <Menu
        w="190"
        trigger={triggerProps => {
          return (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <Entypo
                name="dots-three-horizontal"
                size={WIDTH(20)}
                color={R.colors.grayba}
              />
            </Pressable>
          );
        }}>
        <Menu.Item onPress={onEdit}>Chỉnh sửa bài viết</Menu.Item>
        <Menu.Item onPress={onPin}>
          {item?.ghimBaiViet ? 'Bỏ ghim' : 'Ghim'}
        </Menu.Item>
        <Menu.Item onPress={onDeleteAsk}>Xóa bài viết</Menu.Item>
      </Menu>
    </HStack>
  );
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
