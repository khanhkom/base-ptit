/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';
// import { TouchableScale } from '@components';
// import ItemIconSVG from '@components/icon-svg';
import moment from 'moment';
interface TimeProps {
  thoiGianBatDau: Date;
  thoiGianKetThuc: Date;
}
const ItemList = (props: {
  item: any;
  onNavigate?: any;
  onRefresh: () => void;
}) => {
  const { item, onNavigate } = props;

  const chuaNop = item?.ketQua?.trangThaiChamSinhVien !== 'Đã nộp';

  const currentTime = moment();

  const isThoiGianDanhGia =
    currentTime.isAfter(item?.thoiGianSVChamDiem?.thoiGianBatDau) &&
    currentTime.isBefore(item?.thoiGianSVChamDiem?.thoiGianKetThuc);

  return (
    <TouchableOpacity
      style={styles.itemNavStyle}
      activeOpacity={0.6}
      onPress={() => onNavigate && onNavigate()}>
      <View style={[styles.contentLeft]}>
        <View style={[styles.twoText, { marginBottom: HEIGHT(12) }]}>
          {/* <Status label={ttPhieuDiem(item?.ketQua)} /> */}
          {/* <KhieuNaiView onPress={onNavigateComplain} visible={isKhieuNai} /> */}
        </View>
        <Text numberOfLines={2} style={[styles.textNav]}>
          {item.tenDot
            ? `${item.tenDot} (Học kỳ ${item?.kyHoc?.substring(
                4,
              )} Năm ${item?.kyHoc?.substring(0, 4)})`
            : '--'}
        </Text>
        <TimeStartEnd
          thoiGianBatDau={item?.thoiGianSVChamDiem?.thoiGianBatDau}
          thoiGianKetThuc={item?.thoiGianSVChamDiem?.thoiGianKetThuc}
        />
        <ButtonChamNgay visible={chuaNop && isThoiGianDanhGia} />
      </View>
    </TouchableOpacity>
  );
};

export default ItemList;
// const KhieuNaiView = ({
//   visible,
//   onPress,
// }: {
//   onPress: () => void;
//   visible: boolean;
// }) => {
//   if (visible) {
//     return (
//       <TouchableScale onPress={onPress}>
//         <ItemIconSVG title="Khiếu nại" />
//       </TouchableScale>
//     );
//   }

//   return null;
// };

const ButtonChamNgay = ({ visible }: { visible: boolean }) => {
  if (visible) {
    return (
      <View style={styles.viewButton}>
        <Text style={styles.textChamngay}>Chấm điểm ngay</Text>
      </View>
    );
  }

  return <></>;
};

const TimeStartEnd = (props: TimeProps) => {
  const { thoiGianBatDau, thoiGianKetThuc } = props;

  return (
    <View style={styles.viewTime}>
      <Text style={styles.textSubTime}>
        Từ{' '}
        <Text style={styles.textTime}>{`${moment(thoiGianBatDau).format(
          'HH:mm DD/MM/YYYY',
        )}`}</Text>
      </Text>
      <Text style={styles.textSubTime}>
        Đến{' '}
        <Text style={styles.textTime}>{`${moment(thoiGianKetThuc).format(
          'HH:mm DD/MM/YYYY',
        )}`}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textChamngay: {
    fontFamily: R.fonts.BeVietnamProMedium,
    color: R.colors.white,
    fontSize: getFontSize(16),
  },
  viewButton: {
    marginTop: HEIGHT(12),
    backgroundColor: '#8199D7',
    borderRadius: WIDTH(8),
    paddingVertical: HEIGHT(12),
    paddingHorizontal: WIDTH(20),
    alignSelf: 'flex-end',
  },
  textSubTime: {
    fontSize: getFontSize(12),
    fontFamily: R.fonts.BeVietnamProRegular,
    color: 'rgba(171, 171, 171, 1)',
  },
  textTime: { color: R.colors.grayText },
  viewTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemNavStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    minHeight: HEIGHT(60),
    paddingVertical: HEIGHT(12),
    paddingHorizontal: WIDTH(16),
    width: WIDTH(343),
    backgroundColor: R.colors.white,
    marginBottom: HEIGHT(12),
    borderRadius: WIDTH(8),
  },

  twoText: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    width: WIDTH(311),
  },
  contentLeft: {
    justifyContent: 'flex-start',
  },
  textNav: {
    fontSize: getFontSize(14),
    color: R.colors.black0,
    lineHeight: getLineHeight(18),
    marginBottom: HEIGHT(8),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
});
