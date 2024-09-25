/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';

import { ScrollView } from 'react-native-gesture-handler';
import RenderHTML, {
  CustomBlockRenderer,
  TNodeChildrenRenderer,
} from 'react-native-render-html';

import R from '@assets/R';
import {
  getWidth,
  popupCancel,
  popupOk,
  removeStyles,
  showLink,
  WIDTH,
} from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import HeaderReal from '@libcomponents/header-real';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  delAssignment,
  getAssignment,
  getListResponse,
  updateAssignment,
} from '@networking/user/BaiTapVeNha';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import {
  Box,
  Divider,
  HStack,
  Menu,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ItemPhanHoi from '../Items/ItemPhanHoi';

require('moment/locale/vi');

const ChiTietBaiTapVeNha = (props: any) => {
  const { item, onEdit, onRefresh } = props?.route?.params;

  const [loading, setloading] = useState(false);

  const [danhSachPhanHoi, setdanhSachPhanHoi] = useState<any[]>([]);

  const [itemChiTiet, setItemChiTiet] = useState(false);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      setloading(true);

      const dataChiTiet = await getAssignment(item?._id);

      setItemChiTiet(dataChiTiet?.data?.data);

      const params = {
        page: 1,
        limit: 10,
        condition: { assignmentId: item?._id || '' },
      };

      const response: any = await getListResponse(params);

      setdanhSachPhanHoi(response?.data?.data?.result || []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const html = `${item?.huongDanNop ?? translate('slink:Chua_cap_nhat')}`;

  const renderHtmlProps = {
    source: { html: removeStyles(html) },
    renderers: {
      p: ParagraphRenderer,
    },
  };

  const ngayDang = moment(item?.thoiGianKetThuc).format('HH:mm DD/MM/YYYY');

  const hanNop = item?.thoiGianLamBaiQuiz
    ? `${item?.thoiGianLamBaiQuiz} phút (Hạn ${ngayDang})`
    : `Hạn ${ngayDang}`;

  return (
    <VStack flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={'Thông tin bài tập'} />
      <ScrollView>
        <Box w={getWidth()} mt={'2'} paddingY={'4'} backgroundColor={'white'}>
          <Box paddingX={WIDTH(16)}>
            <Box flexDir={'row'}>
              <Box>
                <Text bold fontSize={'md'}>
                  {item?.noiDung}
                </Text>
                <Text fontSize={'sm'} color={R.colors.grayba}>
                  {hanNop}
                </Text>
                {item?.active && (
                  <Text my="1" fontSize={'sm'} color={R.colors.green007F3E}>
                    Đã kích hoạt
                  </Text>
                )}
              </Box>
              <MenuRight item={item} onEdit={onEdit} onRefresh={onRefresh} />
            </Box>
            <RenderHTML {...renderHtmlProps} />
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
          <HStack justifyContent={'space-between'}>
            <HStack>
              <Text ml={'5'} mt="2" fontSize={'sm'} color={R.colors.black0}>
                {item?.chuaThucHien} chưa nộp
              </Text>
              <Text
                ml={'4'}
                mt="2"
                fontSize={'sm'}
                color={R.colors.green007F3E}>
                {item?.daThucHien} đã nộp
              </Text>
            </HStack>
          </HStack>
        </Box>
        <Divider />
        {danhSachPhanHoi?.length > 0 ? (
          danhSachPhanHoi.map((item, index) => (
            <ItemPhanHoi
              key={index}
              index={index}
              data={item}
              onPress={() => {
                navigateScreen(APP_SCREEN.KHAOSATBAITAP, {
                  itemBaiTap: itemChiTiet,
                  itemSinhVien: item,
                });
              }}
            />
          ))
        ) : (
          <ItemTrong content={translate('slink:Khong_co_thong_tin_lop_hoc')} />
        )}
      </ScrollView>
      {/* <TablePhanHoi label="Danh sách phản hồi" arrayFile={danhSachPhanHoi} /> */}
    </VStack>
  );
};

export default ChiTietBaiTapVeNha;
const handleSeeDocument = (item, name) => {
  showLink(item, name);
};

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

      onRefresh();
    } catch (error) {}
  };

  const onDeleteAsk = () => {
    popupCancel(
      translate('slink:Notice_t'),
      'Bạn có chắc chắn muốn xoá bài tập này?',
      () => onDelete(),
    );
  };

  const onPin = async () => {
    try {
      await updateAssignment({ ...item, active: !item?.active }, item?._id);

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
        <Menu.Item onPress={onEdit}>Chỉnh sửa bài tập</Menu.Item>
        <Menu.Item onPress={onPin}>
          {item?.active ? 'Hủy kích hoạt' : 'Kích hoạt'}
        </Menu.Item>
        <Menu.Item onPress={onDeleteAsk}>Xóa bài tập</Menu.Item>
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
