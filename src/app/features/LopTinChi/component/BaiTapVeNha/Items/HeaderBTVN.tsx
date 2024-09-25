/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import R from '@assets/R';
import { popupCancel, popupOk, WIDTH } from '@common';
import TextChuaCapNhat from '@components/Item/TextChuaCapNhat';
import { delAssignment, updateAssignment } from '@networking/user/BaiTapVeNha';
import { translate } from '@utils/i18n/translate';
import {
  Badge,
  Divider,
  HStack,
  Menu,
  Pressable,
  Switch,
  Text,
  VStack,
} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

require('moment/locale/vi');

const HeaderBTVN = props => {
  const { hanNop, item, onEdit, onRefresh } = props;

  const onPin = async () => {
    try {
      const response = await updateAssignment(
        { ...item, active: !item?.active },
        item?._id,
      );

      response?.status && onRefresh && onRefresh();
    } catch (error) {}
  };

  return (
    <VStack>
      <HStack alignItems={'flex-start'}>
        <Text
          fontSize={'sm'}
          fontFamily={R.fonts.BeVietnamProSemiBold}
          flex={1}
          bold>
          {item?.noiDung || <TextChuaCapNhat />}
          {'  '}
          {item?.isQuiz && (
            <Badge variant="solid" colorScheme={'lightBlue'}>
              Quiz
            </Badge>
          )}
        </Text>

        <MenuRight item={item} onEdit={onEdit} onRefresh={onRefresh} />
      </HStack>
      <HStack mt="2" alignItems={'flex-start'} justifyContent={'space-between'}>
        <Text
          fontFamily={R.fonts.BeVietnamProRegular}
          fontSize={'xs'}
          color={item?.active ? 'primary.500' : 'red.500'}>
          {item?.active ? hanNop : 'Chưa kích hoạt'}
        </Text>
        <Switch
          size={'sm'}
          onToggle={onPin}
          isChecked={item?.active}
          onTrackColor="primary.500"
        />
      </HStack>
      <Divider my="2" />
      <HStack my="2" justifyContent={'space-around'}>
        <TextSoLuong soLuong={item?.chuaThucHien} daNop={false} />
        <TextSoLuong soLuong={item?.daThucHien} daNop />
      </HStack>
    </VStack>
  );
};

export default HeaderBTVN;

const MenuRight = ({ item, onEdit, onRefresh }) => {
  const onDelete = async () => {
    try {
      const res = await delAssignment(item?._id);

      if (res?.status) {
        popupOk(translate('slink:Notice_t'), 'Xoá bài tập thành công');

        onRefresh();
      } else {
        popupOk(
          translate('slink:Notice_t'),
          res?.msg ?? 'Xoá bài tập thất bại',
        );
      }
    } catch (error) {}
  };

  const onDeleteAsk = () => {
    popupCancel(
      translate('slink:Notice_t'),
      'Bạn có chắc chắn muốn xoá bài tập này?',
      () => onDelete(),
    );
  };

  return (
    <HStack>
      {item?.ghimBaiViet && (
        <MaterialCommunityIcons
          size={WIDTH(20)}
          style={{ marginRight: WIDTH(16) }}
          name="pin"
          color={R.colors.primaryColor}
        />
      )}

      <Menu
        w="190"
        trigger={triggerProps => {
          return (
            <Pressable _pressed={R.themes.pressed} {...triggerProps}>
              <Entypo
                name="dots-three-horizontal"
                size={WIDTH(20)}
                color={R.colors.grayba}
              />
            </Pressable>
          );
        }}>
        <Menu.Item onPress={onEdit}>Chỉnh sửa bài tập</Menu.Item>
        <Menu.Item onPress={onDeleteAsk}>Xóa bài tập</Menu.Item>
      </Menu>
    </HStack>
  );
};

const TextSoLuong = ({ soLuong, daNop }) => {
  return (
    <VStack alignItems={'center'}>
      <Text
        fontSize={'md'}
        fontFamily={R.fonts.BeVietnamProRegular}
        color={daNop ? 'green.500' : 'black'}>
        {`${soLuong}`}
      </Text>
      {/* <Text
        fontSize={'xs'}
        fontFamily={R.fonts.BeVietnamProRegular}
        color={'black'}>
        {`${daNop ? 'Đã nộp' : 'Chưa nộp'}`}
      </Text> */}
      <Badge mt={'1'} colorScheme={daNop ? 'green' : 'gray'}>{`${
        daNop ? 'Đã nộp' : 'Chưa nộp'
      }`}</Badge>
    </VStack>
  );
};
