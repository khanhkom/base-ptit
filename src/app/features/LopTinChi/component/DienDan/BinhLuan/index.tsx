/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useRef, useState } from 'react';

import Hyperlink from 'react-native-hyperlink';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RenderHTML, { TNodeChildrenRenderer } from 'react-native-render-html';
import { useSelector } from 'react-redux';

import R from '@assets/R';
import {
  capitalizeFirstLetter,
  getWidth,
  HEIGHT,
  isIos,
  popupCancel,
  popupOk,
  removeStyles,
  showLink,
  WIDTH,
} from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import HeaderReal from '@libcomponents/header-real';
import { goBack, navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  delBaiDang,
  delBinhLuan,
  getChiTietBaiDang,
  postBinhLuan,
  putBaiDang,
  putBinhLuan,
} from '@networking/user/DienDanBinhLuan';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import {
  Actionsheet,
  Avatar,
  Box,
  Divider,
  FlatList,
  HStack,
  Input,
  KeyboardAvoidingView,
  Menu,
  Pressable,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

require('moment/locale/vi');

const BinhLuanLopTinChi = (props: any) => {
  const { account } = useSelector(selectAppConfig);

  const id = props?.route?.params?.item?._id;

  const onRefresh: () => void = props?.route?.params?.onRefresh;

  const [dataBaiDang, setDataBaiDang] = useState<any>(
    props?.route?.params?.item,
  );

  const [loading, setloading] = useState(false);

  const [edit, setEdit] = useState('');

  const refInput = useRef<any>();

  const [value, setValue] = useState('');

  const { isOpen, onOpen, onClose } = useDisclose();

  const [curComment, setCurComment] = useState<any>();

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      setloading(true);

      const response = await getChiTietBaiDang(id);

      setDataBaiDang(response?.data?.data ?? {});

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const sendMessage = async () => {
    try {
      setloading(true);

      if (value !== '') {
        if (edit === '') {
          await postBinhLuan({
            noiDung: value,
            baiDangId: id,
            fileDinhKem: null,
          });
        } else {
          await putBinhLuan(
            {
              noiDung: value,
              baiDangId: id,
              fileDinhKem: null,
            },
            edit,
          );
        }
      }

      initData();

      setValue('');

      setEdit('');

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const onXoaBinhLuan = id => {
    popupCancel(
      translate('slink:Notice_t'),
      'Bạn chắc chắn muốn xóa bình luận này',
      () => {
        onDeleteMessage(id);
      },
    );
  };

  const onDeleteMessage = async id => {
    try {
      setloading(true);

      await delBinhLuan(id);

      initData();

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const html = `${dataBaiDang?.noiDung ?? translate('slink:Chua_cap_nhat')}`;

  const renderHtmlProps = {
    source: { html: removeStyles(html) },
    renderers: {
      p: ParagraphRenderer,
    },
  };

  const ngayDang = moment(dataBaiDang?.ngayDang);

  return (
    <VStack flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={dataBaiDang?.tieuDe ?? 'Bài đăng'} />
      <KeyboardAvoidingView
        behavior={isIos ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          ListHeaderComponent={
            <Box paddingX={WIDTH(16)} mt="4">
              <Box flexDir={'row'}>
                <Pressable
                  onPress={() =>
                    showLink(dataBaiDang?.thongTinNguoiDang?.avatar)
                  }>
                  <Avatar
                    source={{ uri: dataBaiDang?.thongTinNguoiDang?.avatar }}>
                    {dataBaiDang?.thongTinNguoiDang?.hoTen?.[0]?.toUpperCase() ??
                      ''}
                  </Avatar>
                </Pressable>
                <Box>
                  <Text bold ml={'2'} fontSize={'md'}>
                    {dataBaiDang?.thongTinNguoiDang?.hoTen}{' '}
                    {dataBaiDang?.thongTinNguoiDang?.isGiaoVien ? (
                      <AntDesign
                        name="checkcircleo"
                        size={WIDTH(12)}
                        color={R.colors.green007F3E}
                        style={{ marginLeft: WIDTH(4) }}
                      />
                    ) : (
                      ` (${dataBaiDang?.thongTinNguoiDang?.ma})`
                    )}
                  </Text>
                  <Text ml={'2'} fontSize={'xs'} color={R.colors.grayba}>
                    {capitalizeFirstLetter(ngayDang.calendar())}
                  </Text>
                </Box>
                <MenuRight
                  item={dataBaiDang}
                  onEdit={() =>
                    navigateScreen(APP_SCREEN.CHITIETBAIDANG, {
                      idLopTc: props?.route?.params?.infoClass?._id,
                      onRefresh: () => initData(),
                      editValue: dataBaiDang,
                    })
                  }
                  onRefresh={() => {
                    initData();

                    if (onRefresh) {
                      onRefresh();
                    }
                  }}
                />
              </Box>
              <Text bold numberOfLines={2} mt="2">
                {dataBaiDang?.tieuDe}
              </Text>
              <RenderHTML {...renderHtmlProps} />
              {dataBaiDang?.fileDinhKem &&
                dataBaiDang?.fileDinhKem?.map(item => {
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
              <Divider my="2" w={getWidth()} ml={WIDTH(-16)} />
              <HStack justifyContent={'space-between'}>
                <HStack>
                  <Text mt="2" fontSize={'sm'} color={R.colors.grayba}>
                    {dataBaiDang?.soDaXem} đã xem
                  </Text>
                  <Text ml={'4'} mt="2" fontSize={'sm'} color={R.colors.grayba}>
                    {dataBaiDang?.danhSachBinhLuan?.length ?? 0} bình luận
                  </Text>
                </HStack>
                <Pressable
                  _pressed={R.themes.pressed}
                  onPress={() => {
                    refInput?.current?.focus();
                  }}>
                  <HStack alignItems={'center'}>
                    <Icon
                      name="message-circle"
                      size={WIDTH(16)}
                      style={{ marginTop: HEIGHT(8) }}
                    />
                    <Text ml={'2'} mt="2" fontSize={'sm'}>
                      Bình luận
                    </Text>
                  </HStack>
                </Pressable>
              </HStack>
              <Divider mt="4" w={getWidth()} ml={WIDTH(-16)} />
            </Box>
          }
          data={dataBaiDang?.danhSachBinhLuan}
          extraData={dataBaiDang}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: any) => {
            return (
              <ItemBinhLuan
                item={item}
                onLongPress={() => {
                  setCurComment(item);

                  onOpen();
                }}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<ItemTrong />}
          onEndReachedThreshold={0.01}
          onRefresh={initData}
          refreshing={loading}
          removeClippedSubviews
          contentContainerStyle={{ paddingBottom: HEIGHT(30) }}
        />
        <HStack mb={HEIGHT(16)} paddingX={WIDTH(16)} w={'full'}>
          <Input
            w="full"
            borderRadius={'full'}
            value={value}
            onChangeText={setValue}
            padding="4"
            fontSize={'sm'}
            borderWidth={1}
            borderColor={'gray.300'}
            InputRightElement={
              <Pressable
                onPress={sendMessage}
                backgroundColor={'primary.500'}
                borderRadius={'full'}
                padding="3"
                mr="2"
                my="2">
                <Icon name="send" size={WIDTH(18)} color={R.colors.white} />
              </Pressable>
            }
            placeholder={'Trả lời ...'}
          />
        </HStack>
        <MenuComment
          isOpen={isOpen}
          onClose={() => {
            setCurComment(undefined);

            onClose();
          }}
          item={curComment}
          account={account}
          onEdit={() => {
            setEdit(curComment?._id);

            setValue(curComment?.noiDung);

            setCurComment(undefined);

            onClose();
          }}
          onDelete={() => {
            onXoaBinhLuan(curComment?._id);

            setCurComment(undefined);

            onClose();
          }}
        />
      </KeyboardAvoidingView>
    </VStack>
  );
};

export default BinhLuanLopTinChi;
const ItemBinhLuan = ({ item, onLongPress }) => {
  return (
    <Pressable
      onLongPress={onLongPress}
      mt="4"
      paddingX={WIDTH(16)}
      _pressed={R.themes.pressed}>
      <Box flexDir={'row'}>
        <Pressable onPress={() => showLink(item?.thongTinNguoiDang?.avatar)}>
          <Avatar size={'sm'} source={{ uri: item?.thongTinNguoiDang?.avatar }}>
            {item?.thongTinNguoiDang?.hoTen?.[0]?.toUpperCase() ?? ''}
          </Avatar>
        </Pressable>
        <VStack>
          <VStack
            backgroundColor={R.colors.borderD}
            ml="2"
            paddingX={'3'}
            paddingY={'2'}
            borderRadius={'10'}
            maxW={WIDTH(280)}>
            <VStack alignItems={'baseline'}>
              <Text bold fontSize={'sm'}>
                {item?.thongTinNguoiDang?.hoTen}
                {item?.thongTinNguoiDang?.isGiaoVien ? (
                  <AntDesign
                    name="checkcircleo"
                    size={WIDTH(12)}
                    color={R.colors.green007F3E}
                    style={{ marginLeft: WIDTH(4) }}
                  />
                ) : (
                  ` (${item?.thongTinNguoiDang?.ma})`
                )}
              </Text>
              <Text fontSize={'xs'} color={R.colors.black5}>
                {capitalizeFirstLetter(moment(item?.ngayDang).calendar())}
              </Text>
            </VStack>
            <Hyperlink linkStyle={{ color: R.colors.bgBlue }} linkDefault>
              <Text fontSize={'sm'} maxW={WIDTH(240)}>
                {item?.noiDung}
              </Text>
            </Hyperlink>
          </VStack>
        </VStack>
      </Box>
    </Pressable>
  );
};

const MenuRight = ({ item, onEdit, onRefresh }) => {
  const onDelete = async () => {
    try {
      await delBaiDang(item?._id);

      popupOk(translate('slink:Notice_t'), 'Xoá bài viết thành công');

      onRefresh();

      goBack();
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
        <Box mr={'4'}>
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

const MenuComment = ({ item, account, onEdit, onDelete, isOpen, onClose }) => {
  if (item?.thongTinNguoiDang?.ssoId !== account?.ssoId) {
    if (account?.isGiaoVien) {
      return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Actionsheet.Item onPress={onDelete}>Xóa</Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      );
    }

    return <></>;
  }

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Actionsheet.Item onPress={onEdit}>Chỉnh sửa</Actionsheet.Item>
        <Actionsheet.Item onPress={onDelete}>Xóa</Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

const ParagraphRenderer: any = function ParagraphRenderer({
  TDefaultRenderer,
  tnode,
  type,
  ...props
}) {
  return (
    <TDefaultRenderer type={'block'} tnode={tnode} {...props}>
      <TNodeChildrenRenderer
        tnode={tnode}
        parentMarkers={props.markers}
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

const handleSeeDocument = (item, name) => {
  showLink(item, name);
};
