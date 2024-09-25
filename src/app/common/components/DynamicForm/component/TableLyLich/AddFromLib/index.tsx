/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import R from '@assets/R';
import { getFontSize, WIDTH } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import { CheckBox } from '@libcomponents/check-box';
import HeaderReal from '@libcomponents/header-real';
import ItemIconSVG from '@libcomponents/icon-svg';
import { goBack } from '@navigation/navigation-service';
import {
  getCongTrinhCuaToi,
  getGiaiThuong,
  getNghienCuuKhoaHoc,
} from '@networking/user';

import { styles } from './styles';
import { translate } from '@utils/i18n/translate';

const bodyData = (id: string) => {
  switch (id) {
    case 'congTrinhChuYeu':
      return {
        page: 1,
        limit: 100,
        isFiveYear: false,
        condition: { danhMucNCKH: { $ne: 'Đề tài/ nhiệm vụ KHCN' } },
      };
    case 'duAnThamGia':
    case 'duAnChuTri':
      return {
        page: 1,
        limit: 1000,
        isFiveYear: false,
        condition: { danhMucNCKH: 'Đề tài/ nhiệm vụ KHCN' },
      };
    case 'congTrinhApDung':
      return {
        page: 1,
        limit: 1000,
        isFiveYear: false,
      };
    case 'noiDungVanBang':
      return {
        page: 1,
        limit: 1000,
        isFiveYear: false,
        condition: { danhMucNCKH: 'Khác' },
      };
    case 'hoatDongKhac':
      return {
        page: 1,
        limit: 1000,
        condition: { danhMucNCKH: 'Khác' },
        mode: 'ALL',
      };

    default:
      break;
  }
};

const AddFromLib = (props: any) => {
  const idData = props?.route?.params?.id;

  const onAddItem = props?.route?.params?.onAddItem;

  const [checkedAll, setcheckedAll] = useState(false);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [listInfo, setlistInfo] = useState<any[]>([]);

  const [loading, setloading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setloading(true);

      const body = bodyData(idData);

      let listData: any;
      let res;
      switch (idData) {
        case 'hoatDongKhac':
          res = await getNghienCuuKhoaHoc(body);

          listData = res?.data?.data?.result ?? [];

          break;
        case 'giaiThuong':
          res = await getGiaiThuong();

          listData = res?.data?.data ?? [];

          break;

        default:
          res = await getCongTrinhCuaToi(body);

          listData = res?.data?.data?.result ?? [];

          break;
      }

      setloading(false);

      setlistInfo(listData);
    } catch (error) {}
  };

  const handleItemPress = (itemId: string) => {
    // Check if the item is already selected
    const isItemSelected = selectedItems.includes(itemId);

    // Toggle the selection based on the current state
    if (isItemSelected) {
      setSelectedItems(selectedItems.filter((id: string) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const getSortedSelectedItems = () => {
    // Sort selectedItems based on the original order in DATA
    return listInfo.filter(item => selectedItems.includes(item._id));
  };

  const handleSave = () => {
    const listData = getSortedSelectedItems();

    const dataNeedToGet = listData?.map((item: any) => {
      switch (idData) {
        case 'congTrinhChuYeu':
          return {
            ...item,
            idType: idData,
          };
        case 'congTrinhApDung':
          return {
            tenCongTrinh: item?.tenSanPhamNCKH,
            idType: idData,
            hinhThucQuyMo: '',
            thoiGianBatDau: item?.thoiGianThucHienBatDau,
            thoiGianKetThuc: item?.thoiGianThucHienBatDau,
          };
        case 'duAnChuTri':
        case 'duAnThamGia':
          return {
            idType: idData,
            daNghiemThu: item?.trangThaiNghiemThu?.isNghiemThu,
            tenCongTrinh: item?.tenSanPhamNCKH,
            thoiGianBatDau: item?.thoiGianThucHienBatDau,
            thoiGianKetThuc: item?.thoiGianThucHienBatDau,
            thuocChuongTrinh: '',
          };
        case 'noiDungVanBang':
          return {
            idType: idData,
            tenVaNoiDung: item?.tenSanPhamNCKH,
            namCap: item?.namCap,
          };
        case 'giaiThuong':
          return {
            hinhThucVaNoiDung: item?.tenGiaiThuong,
            idType: idData,
            // namTangThuong: item?.namTangThuong,
          };
        case 'hoatDongKhac':
          return {
            tenSanPhamNCKH: item?.tenSanPhamNCKH,
            thoiGianBatDau: item?.startDate,
            thoiGianKetThuc: item?.endDate,
            idType: idData,
            // namTangThuong: item?.namTangThuong,
          };

        default:
          return item;
      }
    });

    onAddItem(dataNeedToGet);

    goBack();
  };

  const onTouchAll = () => {
    if (checkedAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(listInfo?.map(item => item?._id));
    }

    setcheckedAll(!checkedAll);
  };

  const initCheckAll =
    selectedItems?.length === listInfo?.length ? true : false;

  return (
    <View style={styles.container}>
      <HeaderReal
        title={translate('slink:Add')}
        childrenRight={<ChildrenRight onPress={handleSave} />}
      />
      <ViewChooseAll onTouchAll={onTouchAll} initCheckAll={initCheckAll} />
      <FlatList
        data={listInfo}
        extraData={listInfo}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ItemCongTrinh
            key={index}
            item={item}
            initCheck={checkedAll}
            onPress={() => handleItemPress(item?._id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<ItemTrong />}
        onEndReachedThreshold={0.01}
        onRefresh={getData}
        refreshing={loading}
        contentContainerStyle={styles.containerNews}
        style={styles.flatListNews}
      />
    </View>
  );
};

export default AddFromLib;

const ItemCongTrinh = (props: {
  item: any;
  onPress: () => void;
  initCheck: boolean;
}) => {
  const { item, onPress, initCheck } = props;

  const [checked, setchecked] = useState(false);

  useEffect(() => {
    setchecked(initCheck);
  }, [initCheck]);

  const onTouch = () => {
    onPress();

    if (checked) {
      setchecked(false);
    } else {
      setchecked(true);
    }
  };

  const borderColor = checked ? R.colors.colorMain : R.colors.white;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onTouch}
      style={[styles.viewItem, { borderColor }]}>
      <View style={styles.viewCheckBox}>
        <CheckBox
          onToggle={onPress}
          value={checked}
          style={[styles.checkBox]}
        />
      </View>
      {item?.tenGiaiThuong ? (
        <ItemGiaiThuong
          capGiaiThuong={item?.capGiaiThuong}
          loaiGiaiThuong={item?.loaiGiaiThuong}
          tenGiaiThuong={item?.tenGiaiThuong}
        />
      ) : (
        <ItemDanhMuc danhMuc={item?.danhMucNCKH} tenSP={item?.tenSanPhamNCKH} />
      )}
    </TouchableOpacity>
  );
};

const ItemDanhMuc = (props: { danhMuc: string; tenSP: string }) => {
  const { danhMuc, tenSP } = props;

  return (
    <View style={styles.viewTT}>
      <Text style={styles.danhMuc}>{`${danhMuc ?? '--'}`}</Text>
      <Text style={styles.tenSP}>{`${tenSP ?? '--'}`}</Text>
    </View>
  );
};

const ItemGiaiThuong = (props: {
  capGiaiThuong: string;
  loaiGiaiThuong: string;
  tenGiaiThuong: string;
}) => {
  const { capGiaiThuong, loaiGiaiThuong, tenGiaiThuong } = props;

  return (
    <View style={styles.viewTT}>
      <Text style={styles.tenSP}>
        Giải:{' '}
        <Text style={[styles.danhMuc, { fontSize: getFontSize(12) }]}>
          {loaiGiaiThuong ?? '--'}
        </Text>{' '}
        - Cấp:{' '}
        <Text style={[styles.danhMuc, { fontSize: getFontSize(12) }]}>
          {capGiaiThuong ?? '--'}
        </Text>
      </Text>
      <Text style={styles.tenSP}>{`${tenGiaiThuong ?? '--'}`}</Text>
    </View>
  );
};

const ViewChooseAll = (props: {
  onTouchAll: () => void;
  initCheckAll: boolean;
}) => {
  const { onTouchAll, initCheckAll } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onTouchAll}
      style={styles.viewCheckAll}>
      <CheckBox
        onToggle={onTouchAll}
        value={initCheckAll}
        style={[styles.checkBox]}
        text="Chọn tất cả"
        textStyle={[styles.danhMuc, { marginLeft: WIDTH(16) }]}
      />
    </TouchableOpacity>
  );
};

const ChildrenRight = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ItemIconSVG
        title={'Save'}
        color={R.colors.white}
        width={WIDTH(24)}
        height={WIDTH(24)}
      />
    </TouchableOpacity>
  );
};
