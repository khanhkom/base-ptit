/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import R from '@assets/R';
import {
  getFontSize,
  getLineHeight,
  HEIGHT,
  IS_PDF,
  popupCancel,
  REGEX_FILE_TYPE_URL,
  showLink,
  WIDTH,
} from '@common';
import ItemLabel from '@components/Item/ItemLabel';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { deleteLichTuan } from '@networking/user/LichTuan';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import moment from 'moment';
import {
  Box,
  Button,
  FlatList,
  HStack,
  Link,
  Modal,
  Text,
  useTheme,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { DataCalendarProps } from './ModalCalendarWeekProps';

import { LoaiDoiTuongChuTri } from '../constant';
interface Props {
  turnOffModel: () => void;
  modalVisible: boolean;
  data: DataCalendarProps;
  isPhatHanh?: boolean;
  onRefresh?: () => void;
}

const ModalWeekCalendar = (props: Props) => {
  const { turnOffModel, onRefresh, modalVisible, data, isPhatHanh } = props;
  const theme = useTheme();
  const visibleDoc = data?.taiLieu?.[0]?.public;
  const initialRef = React.useRef(null);

  const finalRef = React.useRef(null);

  if (!modalVisible) {
    return null;
  }

  const timeStart = data?.thoiGianBatDau
    ? moment(data?.thoiGianBatDau).format('HH:mm DD/MM/YYYY')
    : '--';

  const timeEnd = data?.thoiGianKetThuc
    ? moment(data?.thoiGianKetThuc).format('HH:mm DD/MM/YYYY')
    : '--';
  const chuTri = data?.chuTri?.map((e: any) => `${e.ten || '--'}`) || [];
  const lanhDao =
    data?.chuTri?.[0]?.id === -1 && data?.chuTri?.length === 1
      ? data?.chuTri?.[0]?.ten || '--'
      : chuTri?.join('\n');

  const infoNguoiTao = [
    data?.info?.nguoiTao?.fullname,
    data?.info?.nguoiTao?.code,
  ]?.filter(e => typeof e === 'string' && !!e?.trim());

  const nguoiTao = infoNguoiTao?.join(' - ');

  const ngayTao = data?.createdAt
    ? moment(data?.createdAt).format('HH:mm DD/MM/YYYY')
    : '--';

  const thanhPhanThamDu =
    data?.thanhPhanThamDu?.map((e: any) => `${e.tenDonVi || '--'}`) || [];

  const tptdValue = thanhPhanThamDu?.join(', ');

  const thanhPhanNguoiThamDu =
    data?.thanhPhanNguoiThamDu?.map((e: any) => `${e.ten || '--'}`) || [];

  const tpntdValue = `${translate('slink:Dong_chi', {
    name: thanhPhanNguoiThamDu?.join(', '),
  })}`;

  const tptdKhac = data?.thanhPhanThamDuKhac;
  const thanhPhan =
    [tpntdValue, tptdValue, tptdKhac]?.filter(e => {
      return typeof e === 'string' && !!e?.trim() && e?.trim() !== 'Đ/c';
    }) || [];

  const diaDiemValue = data?.diaDiem?.value || '--';

  const diaDiemKhac = data?.diaDiemKhac || '--';

  const valueDiaDiem = data?.diaDiem ? diaDiemValue : diaDiemKhac;

  const listDataRender = [
    {
      label: translate('slink:time'),
      value: `${timeStart} - ${timeEnd}`,
      multiline: true,
    },
    {
      label: translate('slink:Work_detail'),
      value: data?.noiDungCongViec || '--',
      multiline: true,
    },
    { label: labelMain(data?.loaiDoiTuong), value: lanhDao, multiline: true },
    ...(thanhPhan?.length === 0
      ? []
      : [
          {
            label: translate('slink:Participants'),
            value: thanhPhan?.join(', '),
            multiline: true,
          },
        ]),
    ...(visibleDoc
      ? [
          {
            label: translate('slink:Document'),
            value: data?.taiLieu || [],
            type: 1,
          },
        ]
      : []),
    { label: translate('slink:Location'), value: valueDiaDiem },
    ...(!!data?.ghiChu
      ? [{ label: translate('slink:Note'), value: data?.ghiChu || '--' }]
      : []),
    {
      label: translate('slink:Creator'),
      value: nguoiTao,
      multiline: infoNguoiTao?.length === 0 ? false : true,
    },
    { label: translate('slink:Create_date'), value: ngayTao },
  ];

  const visibleButton = !isPhatHanh;

  const onEdit = () => {
    turnOffModel();

    setTimeout(() => {
      navigateScreen(APP_SCREEN.ADDNEWCALENDAR, {
        dataDefault: data,
        onRefresh: onRefresh,
      });
    }, 300);
  };

  const handleDel = () => {
    turnOffModel();

    setTimeout(() => {
      popupCancel(
        translate('slink:Notice_t'),
        translate('slink:Confirm_delete'),
        () => onDel(),
      );
    }, 300);
  };

  const onDel = async () => {
    const responseDel = await deleteLichTuan(data?._id);

    if (responseDel?.status) {
      onRefresh && onRefresh();
    }
  };

  return (
    <Modal
      isOpen={modalVisible}
      onClose={turnOffModel}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}>
      <Modal.Content w={'full'}>
        <Modal.CloseButton />
        <Modal.Header>
          <Text
            fontSize="sm"
            fontFamily={R.fonts.BeVietnamProSemiBold}
            color="black">
            {translate('slink:Academy_weekly_calender')}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <FlatList
            scrollEnabled={false}
            data={listDataRender}
            extraData={listDataRender}
            bounces={false}
            nestedScrollEnabled={false}
            renderItem={({ item, index }) => {
              if (item?.type === 1) {
                return (
                  <ItemTaiLieu
                    turnOffModel={turnOffModel}
                    label={item?.label}
                    value={item?.value}
                  />
                );
              }
              return (
                <ItemLabel
                  textValue={{ fontSize: theme.fontSizes.xs }}
                  textLabel={{ fontSize: theme.fontSizes.sm }}
                  label={item?.label}
                  value={item?.value}
                  multiLine={item?.multiline}
                  isLast={index === listDataRender?.length - 1}
                />
              );
            }}
          />
        </Modal.Body>
        {visibleButton && (
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="outline" onPress={onEdit}>
                <HStack alignItems={'center'}>
                  <AntDesign
                    size={WIDTH(14)}
                    name={'edit'}
                    color={theme.colors.black}
                  />
                  <Text fontSize={'xs'} ml="1">
                    Sửa
                  </Text>
                </HStack>
              </Button>
              <Button
                borderColor={'red.500'}
                variant="outline"
                onPress={handleDel}>
                <HStack alignItems={'center'}>
                  <AntDesign
                    size={WIDTH(14)}
                    name={'delete'}
                    color={theme.colors.red[500]}
                  />
                  <Text fontSize={'xs'} color={'red.500'} ml="1">
                    {translate('slink:Delete')}
                  </Text>
                </HStack>
              </Button>
            </Button.Group>
          </Modal.Footer>
        )}
      </Modal.Content>
    </Modal>
    // <ModalCustome
    //   closeButton={turnOffModel}
    //   style={{ paddingVertical: HEIGHT(40) }}
    //   isVisible={modalVisible}>
    //   <Box>
    //     <Text style={styles.title}>{translate('slink:Detail_t')}</Text>
    //   </Box>
    //   <FlatList
    //     style={styles.list}
    //     showsVerticalScrollIndicator={false}
    //     bounces={false}
    //     data={listDataRender}
    //     renderItem={({ item, index }) => (
    //       <ItemLabel
    //         textValue={{ fontSize: theme.fontSizes.xs }}
    //         textLabel={{ fontSize: theme.fontSizes.sm }}
    //         label={item?.label}
    //         value={item?.value}
    //         multiLine={item?.multiline}
    //         isLast={index === listDataRender?.length - 1}
    //       />
    //     )}
    //   />
    // </ModalCustome>
  );
};

export default ModalWeekCalendar;

const ItemTaiLieu = ({
  label,
  value,
  turnOffModel,
}: {
  label: string;
  turnOffModel: () => void;
  value: {
    public: boolean;
    url: string;
  }[];
}) => {
  return (
    <Box
      borderColor="rgba(171, 171, 171, 0.4)"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="flex-start"
      py={HEIGHT(16)}
      borderBottomWidth={0.5}>
      <Text
        color="black"
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize="sm"
        mb="2">
        {label}
      </Text>
      <FlatList
        data={value}
        bounces={false}
        scrollEnabled={false}
        nestedScrollEnabled={false}
        renderItem={({ item, index }) => {
          const fileType = item?.url?.replace(REGEX_FILE_TYPE_URL, '');
          const isPdf = IS_PDF?.includes(fileType);
          const onPress = () => {
            if (isPdf) {
              turnOffModel();
              setTimeout(() => {
                showLink(item?.url);
              }, 500);
              return;
            }
            showLink(item?.url);
          };
          return (
            <Box key={index}>
              <Link
                key={index}
                mt="1"
                _text={{
                  fontSize: 'sm',
                  fontFamily: R.fonts.BeVietnamProMedium,
                  color: 'blue.400',
                }}
                isUnderlined
                onPress={onPress}>
                {`${translate('slink:Xem_tai_lieu', { name: index + 1 })}`}
              </Link>
            </Box>
          );
        }}
      />
    </Box>
  );
};

const labelMain = (loaiLich: string) => {
  switch (loaiLich) {
    case LoaiDoiTuongChuTri.CHUNG:
      return translate('slink:Implementing_agencies');
    case LoaiDoiTuongChuTri.DON_VI:
      return translate('slink:Unit');
    case LoaiDoiTuongChuTri.LANH_DAO:
    case LoaiDoiTuongChuTri.TRUONG_DON_VI:
      return translate('slink:Fullname');
    default:
      return translate('slink:Implementing');
  }
};
