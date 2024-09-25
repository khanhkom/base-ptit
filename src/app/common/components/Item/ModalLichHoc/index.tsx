import React from 'react';
import { FlatList } from 'react-native';

import { useSelector } from 'react-redux';

import R from '@assets/R';
import {
  colorDieuKienCongNo,
  colorDieuKienHocTap,
  colorTrangThaiThi,
  HEIGHT,
  IS_PDF,
  LOAI_SU_KIEN,
  REGEX_FILE_TYPE_URL,
  renderDiaDiemLT,
  showLink,
  tenNguoiDung,
} from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import { LoaiDoiTuongChuTri } from '@features/VanPhongSo/LichTuanHocVien/constant';
import ModalCustome from '@libcomponents/modal/modal-custome';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import moment from 'moment';
import { Badge, Box, HStack, Link, Text, useTheme } from 'native-base';

import styles from './styles';
import { ModalProps } from './type';

import ItemLabel from '../ItemLabel';

const ModalLichHoc = (props: ModalProps) => {
  const { account } = useSelector(selectAppConfig);

  const {
    itemData,
    isVisible,
    visibleButtonLT,
    closeButton,
    onPress,
    onPressEdit,
  } = props;

  //Su Kien Chung -- SuKienCaNhan

  const dataChung = [
    {
      label: translate('slink:Event_name'),
      value: `${itemData?.tenSuKien ?? translate('slink:Chua_cap_nhat')}`,
    },
    {
      label: translate('slink:Event_type'),
      value: `${itemData?.loaiSuKien ?? translate('slink:Chua_cap_nhat')}`,
    },
    {
      label: translate('slink:Location'),
      value: itemData?.diaDiem ?? translate('slink:Chua_cap_nhat'),
    },
    {
      label: translate('slink:Note'),
      value: `${itemData?.ghiChu ?? translate('slink:Chua_cap_nhat')}`,
    },
    {
      label: translate('slink:Time_start'),
      value: itemData?.thoiGianBatDau
        ? moment(itemData?.thoiGianBatDau).format('HH:mm DD/MM/YYYY')
        : translate('slink:Chua_cap_nhat'),
    },
    {
      label: translate('slink:Time_end'),
      value: itemData?.thoiGianKetThuc
        ? moment(itemData?.thoiGianKetThuc).format('HH:mm DD/MM/YYYY')
        : translate('slink:Chua_cap_nhat'),
    },
  ];

  const monThi = itemData?.danhSachHocPhan?.map(e => e.ten)?.join('\n');

  const dataLichThi = [
    {
      label: translate('slink:Event_name'),
      value: `${itemData?.loaiSuKien ?? translate('slink:Chua_cap_nhat')}`,
    },
    {
      label: translate('slink:Exam_name'),
      value:
        itemData?.danhSachHocPhan?.length > 0
          ? monThi
          : translate('slink:Chua_cap_nhat'),
    },

    {
      label: translate('slink:Time_start'),
      value: itemData?.thoiGianBatDau
        ? moment(itemData?.thoiGianBatDau).format('HH:mm DD/MM/YYYY')
        : translate('slink:Chua_cap_nhat'),
    },
    {
      label: translate('slink:Time_end'),
      value: itemData?.thoiGianKetThuc
        ? moment(itemData?.thoiGianKetThuc).format('HH:mm DD/MM/YYYY')
        : translate('slink:Chua_cap_nhat'),
    },
    {
      label: translate('slink:Phong_thi'),
      value: itemData?.phong?.ten ?? translate('slink:Chua_cap_nhat'),
    },
    ...(account?.isGiaoVien
      ? [
          {
            label: translate('slink:So_luong_sinh_vien'),
            value: `${
              itemData?.soLuongSinhVien ?? translate('slink:Chua_cap_nhat')
            }`,
          },
          {
            label: translate('slink:Giam_thi_coi_thi'),
            value:
              itemData?.danhSachGiamThi?.length > 0
                ? itemData?.danhSachGiamThi?.map(e => e?.ten)?.join(', ')
                : translate('slink:Chua_cap_nhat'),
          },
        ]
      : [
          {
            badge: itemData?.dieuKienCongNo ? true : false,
            label: translate('slink:Dieu_kien_cong_no'),
            value: itemData?.dieuKienCongNo ? (
              <Badge
                colorScheme={
                  colorDieuKienCongNo?.[itemData?.dieuKienCongNo]
                }>{`${itemData?.dieuKienCongNo}`}</Badge>
            ) : (
              translate('slink:Chua_cap_nhat')
            ),
          },
          {
            badge: itemData?.dieuKienKetQuaHocTap ? true : false,
            label: translate('slink:Dieu_kien_hoc_tap'),
            value: itemData?.dieuKienKetQuaHocTap ? (
              <Badge
                colorScheme={
                  colorDieuKienHocTap?.[itemData?.dieuKienKetQuaHocTap]
                }>{`${itemData?.dieuKienKetQuaHocTap}`}</Badge>
            ) : (
              translate('slink:Chua_cap_nhat')
            ),
          },
          {
            badge: itemData?.trangThai ? true : false,
            label: translate('slink:Status'),
            value: itemData?.trangThai ? (
              <Badge
                colorScheme={
                  colorTrangThaiThi?.[itemData?.trangThai]
                }>{`${itemData?.trangThai}`}</Badge>
            ) : (
              translate('slink:Chua_cap_nhat')
            ),
          },
        ]),
  ];

  const dataLichHoc = [
    {
      label: translate('slink:Event_type'),
      value: `${itemData?.loaiSuKien ?? translate('slink:Chua_cap_nhat')}`,
    },
    {
      label: translate('slink:Lop_tin_chi'),
      value: itemData?.lopHocPhan?.ten ?? translate('slink:Chua_cap_nhat'),
    },
    {
      label: translate('slink:Course_name'),
      value: `${
        itemData?.lopHocPhan?.hocPhan?.ten ?? translate('slink:Chua_cap_nhat')
      }`,
    },
    {
      label: translate('slink:Time_start'),
      value: itemData?.thoiGianBatDau
        ? moment(itemData?.thoiGianBatDau).format('HH:mm DD/MM/YYYY')
        : translate('slink:Chua_cap_nhat'),
    },
    {
      label: translate('slink:Time_end'),
      value: itemData?.thoiGianKetThuc
        ? moment(itemData?.thoiGianKetThuc).format('HH:mm DD/MM/YYYY')
        : translate('slink:Chua_cap_nhat'),
    },
    {
      label: translate('slink:Type_learning'),
      value: itemData?.loaiHinhHocTap ?? translate('slink:Chua_cap_nhat'),
    },
    {
      label: translate('slink:Classroom'),
      value: itemData?.phongHoc ?? translate('slink:Chua_cap_nhat'),
    },
    {
      label: translate('slink:Teacher'),
      value: itemData?.giangVien
        ? tenNguoiDung({
            ...itemData?.giangVien,
            isGiaoVien: true,
          })
        : translate('slink:Chua_cap_nhat'),
    },
  ];

  //info lịch tuần
  // const visibleDoc = itemData?.taiLieu?.[0]?.public;
  const visibleDoc = itemData?.taiLieu?.length > 0;

  const chuTri = itemData?.chuTri?.map((e: { ten: string }) => e?.ten) ?? [];

  const lanhDao = [
    LoaiDoiTuongChuTri.TRUONG_DON_VI,
    LoaiDoiTuongChuTri.LANH_DAO,
  ]?.includes(itemData?.loaiDoiTuong)
    ? `${translate('slink:Dong_chi', { name: chuTri?.join(', ') })}`
    : chuTri?.join(', ');

  const infoNguoiTao = [
    itemData?.info?.nguoiTao?.fullname,
    itemData?.info?.nguoiTao?.code,
  ]?.filter(e => typeof e === 'string' && !!e?.trim());

  const nguoiTao = infoNguoiTao?.join(' - ');

  const thanhPhanNguoiThamDu =
    itemData?.thanhPhanNguoiThamDu?.map(
      (e: any) => `${e.ten ?? '--'} (${e.maDinhDanh ?? '--'})`,
    ) ?? [];

  const thanhPhanThamDu =
    itemData?.thanhPhanThamDu?.map(
      (e: any) => `${e.tenDonVi ?? '--'} (${e.maDonVi ?? '--'})`,
    ) ?? [];

  const tptdKhac = itemData?.thanhPhanThamDuKhac;

  const tptdValue = thanhPhanThamDu?.join(', ');

  const tpntdValue = `${translate('slink:Dong_chi', {
    name: thanhPhanNguoiThamDu?.join(', '),
  })}`;

  const tpHoiDongNhom = itemData?.danhSachHoiDongNhom
    ?.map((e: any) => `${e.ten ?? '--'}`)
    ?.join(', ');

  const thanhPhan =
    [tpntdValue, tptdValue, tpHoiDongNhom, tptdKhac]?.filter(
      e => typeof e === 'string' && !!e?.trim() && e?.trim() !== 'Đ/c',
    ) ?? [];

  const ngayTao = itemData?.createdAt
    ? moment(itemData?.createdAt).format('HH:mm DD/MM/YYYY')
    : '--';

  const valueDiaDiem = renderDiaDiemLT(itemData);

  const timeStart = itemData?.thoiGianBatDau
    ? moment(itemData?.thoiGianBatDau).format('HH:mm DD/MM/YYYY')
    : '--';

  const timeEnd = itemData?.thoiGianKetThuc
    ? moment(itemData?.thoiGianKetThuc).format('HH:mm DD/MM/YYYY')
    : '--';

  const dataLichTuan = [
    {
      label: translate('slink:Work_detail'),
      value: itemData?.noiDungCongViec ?? '--',
      multiline: true,
    },
    {
      label: translate('slink:time'),
      value: `${timeStart} - ${timeEnd}`,
    },
    {
      label: translate('slink:Loai_lich'),
      value: itemData?.loaiDoiTuong,
    },
    {
      label: labelMain(itemData?.loaiDoiTuong),
      value: lanhDao,
    },
    ...([
      LoaiDoiTuongChuTri.TRUONG_DON_VI,
      LoaiDoiTuongChuTri.LANH_DAO,
    ]?.includes(itemData?.loaiDoiTuong)
      ? []
      : [
          {
            label: translate('slink:Participants'),
            value: itemData?.tatCaCanBo
              ? translate('slink:All_can_bo')
              : thanhPhan?.join(', '),
            multiline: true,
          },
        ]),
    ...(visibleDoc
      ? [
          {
            label: translate('slink:Document'),
            value: itemData?.taiLieu ?? [],
            type: 1,
          },
        ]
      : []),
    { label: translate('slink:Location'), value: valueDiaDiem },
    ...(itemData?.ghiChu
      ? [
          {
            label: translate('slink:Other_notes'),
            value: itemData?.ghiChu ?? '--',
          },
        ]
      : []),
    {
      label: translate('slink:Creator'),
      value: nguoiTao,
    },
    { label: translate('slink:Create_date'), value: ngayTao },
  ];

  const listData: any = () => {
    switch (itemData?.loaiSuKien) {
      case LOAI_SU_KIEN.CA_NHAN:
      case LOAI_SU_KIEN.CHUNG:
        return dataChung;
      case LOAI_SU_KIEN.LICH_HOC:
        return dataLichHoc;
      case LOAI_SU_KIEN.LICH_THI:
      case LOAI_SU_KIEN.LICH_COI_THI:
        return dataLichThi;
      case LOAI_SU_KIEN.LICH_LAM_VIEC_TUAN:
      case LOAI_SU_KIEN.LICH_TUAN:
        return dataLichTuan;

      default:
        return dataLichHoc;
    }
  };

  const visibleButton =
    [LOAI_SU_KIEN.LICH_LAM_VIEC_TUAN, LOAI_SU_KIEN?.LICH_TUAN]?.includes(
      itemData?.loaiSuKien,
    ) && visibleButtonLT;

  const theme = useTheme();

  return (
    <ModalCustome
      closeButton={closeButton}
      style={styles.modal}
      isVisible={isVisible}>
      <Text
        textAlign="center"
        fontSize={'md'}
        fontFamily={R.fonts.BeVietnamProSemiBold}
        color={R.colors.primaryColor}>
        {translate('slink:Detail_t')}
      </Text>
      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        bounces={false}
        data={listData()}
        renderItem={({ item, index }) => {
          if (item?.type === 1) {
            return (
              <ItemTaiLieu
                turnOffModel={closeButton}
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
              badge={item?.badge}
              multiLine={item?.multiline}
              isLast={index === listData()?.length - 1}
            />
          );
        }}
      />
      {[LOAI_SU_KIEN.LICH_HOC, LOAI_SU_KIEN.LICH_GIANG_DAY]?.includes(
        itemData?.loaiSuKien,
      ) && (
        <BaseButtonNB
          onPress={onPress}
          title={translate('slink:See_details')}
        />
      )}
      {(itemData?.loaiSuKien === LOAI_SU_KIEN.CA_NHAN ?? visibleButton) && (
        <HStack justifyContent="space-between">
          <BaseButtonNB
            onPress={onPress}
            style={styles.buttonEdit}
            text={styles.textEdit}
            title={translate('slink:Delete')}
          />
          <BaseButtonNB
            onPress={() => {
              onPressEdit && onPressEdit();
            }}
            style={styles.buttonView}
            title={translate('slink:Edit')}
          />
        </HStack>
      )}
    </ModalCustome>
  );
};

export default ModalLichHoc;

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
