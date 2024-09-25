import React, { useState } from 'react';

import R from '@assets/R';
import {
  ETrangThaiYeuCauQuyDoiGio,
  getFontSize,
  HEIGHT,
  MapKeyColorTrangThaiYeuCauQuyDoiGio,
  MapKeyTextTrangThaiYeuCauQuyDoiGio,
  popupCancel,
  WIDTH,
} from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import ItemLabel from '@components/Item/ItemLabel';
import {
  DanhSachThanhVienProps,
  KetQuaKhaiBaoProps,
  LoaiHinhNCKHProps,
} from '@features/QuanLyKhoaHocV2/type';
import ItemInfor from '@libcomponents/ItemTable';
import ModalCustome from '@libcomponents/modal/modal-custome';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { delKhaiBao } from '@networking/user/QuanLyKhoaHoc';
import { translate } from '@utils/i18n/translate';
import { Box, FlatList, Pressable, Text } from 'native-base';

const ItemKhaiBao = ({
  data,
  dataLoaiHinh,
  onRefresh,
  dotId,
  onlySee,
  width,
}: {
  data: KetQuaKhaiBaoProps;
  dataLoaiHinh?: LoaiHinhNCKHProps;
  onRefresh?: () => void;
  dotId?: string;
  onlySee?: boolean;
  width?: number;
}) => {
  const [visible, setvisible] = useState(false);

  const visibleButton =
    onlySee !== undefined
      ? !onlySee
      : data?.trangThaiSanPham === ETrangThaiYeuCauQuyDoiGio.CHUA_TIEP_NHAN;

  const isTinhGio = !dataLoaiHinh?.tinhTheoTungNam;

  const isTinhDiem = dataLoaiHinh?.tinhDiem || false;

  const dsTVQuyDoiGio =
    data?.danhSachYeuCauQuyDoiGio?.find(item => item?.namHocId === dotId)
      ?.danhSachKetQuaTinhGioThanhVien || [];

  const dsTVQuyDoiDiem =
    data?.danhSachYeuCauQuyDoiDiem?.find(item => item?.namHocId === dotId)
      ?.danhSachKetQuaTinhGioThanhVien || [];

  const trangThai =
    MapKeyTextTrangThaiYeuCauQuyDoiGio?.[data?.trangThaiSanPham];

  const color = MapKeyColorTrangThaiYeuCauQuyDoiGio?.[data?.trangThaiSanPham];

  const dataLoaiHinhNckh = dataLoaiHinh || data?.loaiHinhNckh;

  const searchLabel =
    dataLoaiHinhNckh?.cauHinhLoaiHinh?.find(
      item => item?.ma === dataLoaiHinhNckh?.searchKey1,
    )?.ten ?? '';

  const listData = [
    {
      label: 'Người khai báo',
      value: data?.nguoiKhaiBao?.hoVaTen,
    },
    {
      label: 'Thành viên',
      value: `${data?.soLuongThanhVien} thành viên`,
      onPress: () => setvisible(true),
    },
    ...(data?.searchValue1
      ? [
          {
            label: searchLabel,
            value: data?.searchValue1,
            multiline: data?.searchValue1?.length > 30,
          },
        ]
      : []),
    {
      label: translate('slink:Status'),
      value: trangThai,
      color,
    },
  ];

  const onnavigate = () => {
    navigateScreen(APP_SCREEN.DETAILTSANPHAM, { data, dataLoaiHinh });
  };

  const onNavigateEdit = () => {
    navigateScreen(APP_SCREEN.VIEWRENDERNCKH, {
      dataLoaiHinh,
      data,
      dotId,
      onRefresh: () => onRefresh?.(),
    });
  };

  const onDel = () => {
    popupCancel(
      translate('slink:Notice_t'),
      translate('slink:Confirm_delete'),
      onHandleDel,
    );
  };

  const onHandleDel = async () => {
    const resDel = await delKhaiBao(data?._id);

    if (resDel?.status) {
      onRefresh && onRefresh();
    }
  };

  return (
    <Pressable
      disabled={onlySee}
      onPress={onnavigate}
      _pressed={R.themes.pressed}
      backgroundColor={R.colors.white}
      marginBottom={HEIGHT(12)}
      alignSelf="center"
      width={width || WIDTH(343)}
      flexDirection="column"
      paddingBottom={HEIGHT(8)}
      paddingTop={HEIGHT(8)}
      paddingLeft={WIDTH(8)}
      paddingRight={WIDTH(8)}
      borderRadius={WIDTH(8)}
      style={{ ...R.themes.shadowOffset }}>
      <FlatList
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        data={listData}
        renderItem={({ item, index }) => {
          return (
            <ItemLabel
              textValue={{ color: item?.color || R.colors.grayText }}
              value={item?.value}
              label={item?.label}
              multiLine={item?.multiline}
              isLast={listData?.length - 1 === index}
              onPress={item?.onPress}
            />
          );
        }}
      />
      <ModalThanhVien
        isTinhGio={isTinhGio}
        isTinhDiem={isTinhDiem}
        dsTVQuyDoiGio={dsTVQuyDoiGio}
        dsTVQuyDoiDiem={dsTVQuyDoiDiem}
        isVisible={visible}
        closeButton={() => setvisible(false)}
        listMember={data?.danhSachThanhVien}
      />
      <ViewButton
        visible={visibleButton}
        onPressEdit={onNavigateEdit}
        onPressDel={onDel}
      />
    </Pressable>
  );
};

export default ItemKhaiBao;
const ViewButton = ({
  visible,
  onPressEdit,
  onPressDel,
}: {
  visible: boolean;
  onPressEdit: () => void;
  onPressDel: () => void;
}) => {
  if (visible) {
    return (
      <Box flexDirection={'row'} alignItems="center" paddingBottom={HEIGHT(8)}>
        <Text
          fontFamily={R.fonts.BeVietnamProMedium}
          color={R.colors.greenNew}
          fontSize={getFontSize(12)}
          onPress={onPressEdit}
          flex={1}
          textAlign="center">
          {translate('slink:Edit')}
        </Text>
        <Text
          fontFamily={R.fonts.BeVietnamProMedium}
          onPress={onPressDel}
          fontSize={getFontSize(12)}
          color={R.colors.redColor}
          flex={1}
          textAlign="center">
          Xoá
        </Text>
      </Box>
    );
  }

  return null;
};

interface Props {
  isVisible: boolean;
  closeButton: () => void;
  listMember: DanhSachThanhVienProps[];
  dsTVQuyDoiGio: {
    ssoId: string;
    tongGio: number;
  }[];
  dsTVQuyDoiDiem: {
    ssoId: string;
    tongGio: number;
  }[];
  isTinhDiem: boolean;
  isTinhGio: boolean;
}
const ModalThanhVien = (props: Props) => {
  const {
    isVisible,
    closeButton,
    listMember,
    isTinhDiem,
    isTinhGio,
    dsTVQuyDoiGio,
    dsTVQuyDoiDiem,
  } = props;

  const tableahead = [
    translate('slink:No'),
    translate('slink:Fullname'),
    translate('slink:Place_of_work'),
    translate('slink:Role'),
    ...(isTinhDiem ? [translate('slink:Diem_san_pham_NCKH')] : []),
    ...(isTinhGio ? [translate('slink:Gio_chuan_NCKH')] : []),
  ];

  const widthArr = [
    WIDTH(60),
    WIDTH(140),
    WIDTH(150),
    WIDTH(150),
    ...(isTinhDiem ? [WIDTH(150)] : []),
    ...(isTinhGio ? [WIDTH(150)] : []),
  ];

  const tableData = listMember?.map((item, index) => {
    const gio =
      dsTVQuyDoiGio?.find(mem => mem.ssoId === item?.ssoId)?.tongGio || 0;

    const diem =
      dsTVQuyDoiDiem?.find(mem => mem.ssoId === item?.ssoId)?.tongGio || 0;

    return [
      <ItemInfor key={index} content={index + 1} />,
      <ItemInfor key={index} content={item?.hoVaTen} />,
      <ItemInfor key={index} content={item?.donVi} />,
      <ItemInfor key={index} content={item?.danhSachVaiTro?.join(', ')} />,
      ...(isTinhDiem ? [<ItemInfor key={index} content={diem} />] : []),
      ...(isTinhGio ? [<ItemInfor key={index} content={gio} />] : []),
    ];
  });

  return (
    <ModalCustome isVisible={isVisible} closeButton={closeButton}>
      <BaseTableComponent
        tableHead={tableahead}
        widthArr={widthArr}
        tableData={tableData}
      />
    </ModalCustome>
  );
};
