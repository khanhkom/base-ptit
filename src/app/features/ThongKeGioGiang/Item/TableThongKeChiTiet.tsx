/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import R from '@assets/R';
import {
  getFontSize,
  getLineHeight,
  getWidth,
  HEIGHT,
  roundNumberWith2DigitsAfterComma,
  WIDTH,
} from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import ItemTrong from '@components/Item/ItemTrong';
import { getChiTietTKGioGiang } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';

const tableHead = [
  translate('slink:No'),
  'Tên lớp',
  'Tên học phần',
  'Giờ giảng lý thuyết',
  'Giờ giảng thực hành',
  'Tổng giờ giảng',
];

const widthArr = [
  WIDTH(60),
  WIDTH(180),
  WIDTH(180),
  WIDTH(150),
  WIDTH(150),
  WIDTH(150),
];

interface Props {
  namHocSelected: string;
  heDaoTaoSelected: string;
  listGioGiang: any[];
  listNamHoc: any[];
  listNamHocPicker: any[];
  listHeDaoTaoPicker: any[];
}

const TableThongKeChiTiet = (props: Props) => {
  const {
    namHocSelected,
    heDaoTaoSelected,
    listGioGiang,
    listNamHoc,
    listNamHocPicker,
    listHeDaoTaoPicker,
  } = props;

  const [listData, setListData] = useState([]);

  const getDataChiTiet = async () => {
    let [indexNamHoc, indexHinhThuc] = [0, 0];
    listNamHocPicker.reduce((_total: any, val: any, ind: number) => {
      if (val?.value === namHocSelected) {
        indexNamHoc = ind;
      }

      return null;
    }, 0);

    listHeDaoTaoPicker.reduce((_total: any, val: any, ind: number) => {
      if (val?.value === heDaoTaoSelected) {
        indexHinhThuc = ind;
      }

      return null;
    }, 0);

    try {
      const responseChiTiet: any = await getChiTietTKGioGiang(
        listNamHoc?.[indexNamHoc]?.id ?? 0,
        {
          ...(heDaoTaoSelected !== translate('slink:All') && {
            idHinhThuc:
              listGioGiang?.[(indexHinhThuc ?? 1) - 1]?.hinhThucDaoTaoId ?? 0,
          }),
        },
      );

      setListData(responseChiTiet?.data?.data ?? []);
    } catch (error) {}
  };

  useEffect(() => {
    getDataChiTiet();
  }, [heDaoTaoSelected, namHocSelected]);

  const tableData = listData.map((item: any, index: number) => [
    <Text style={styles.txtTable} key={index}>
      {index + 1}
    </Text>,
    <Text style={styles.txtTable} key={index}>
      {item?.tenLop ?? translate('slink:Chua_cap_nhat')}
    </Text>,
    <Text style={styles.txtTable} key={index}>
      {item?.tenHocPhan ?? translate('slink:Chua_cap_nhat')}
    </Text>,
    <Text style={styles.txtTable} key={index}>
      {!_.isNil(item?.gioLyThuyet) && item?.gioLyThuyet !== false
        ? roundNumberWith2DigitsAfterComma(item?.gioLyThuyet)
        : translate('slink:Chua_cap_nhat')}
    </Text>,
    <Text style={styles.txtTable} key={index}>
      {!_.isNil(item?.gioThucHanh) && item?.gioThucHanh !== false
        ? roundNumberWith2DigitsAfterComma(item?.gioThucHanh)
        : translate('slink:Chua_cap_nhat')}
    </Text>,
    <Text style={styles.txtTable} key={index}>
      {!_.isNil(item?.gioThucHanh) &&
      item?.gioThucHanh !== false &&
      !_.isNil(item?.gioLyThuyet) &&
      item?.gioLyThuyet !== false
        ? roundNumberWith2DigitsAfterComma(
            Number(item?.gioThucHanh) + Number(item?.gioLyThuyet),
          )
        : translate('slink:Chua_cap_nhat')}
    </Text>,
  ]);

  if (tableData.length > 0) {
    return (
      <View style={styles.viewTable}>
        <BaseTableComponent
          tableHead={tableHead}
          widthArr={widthArr}
          tableData={tableData}
          customeStyleData={styles.rowTable}
        />
      </View>
    );
  }

  return <ItemTrong content={translate('slink:No_data')} />;
};

export default TableThongKeChiTiet;

const styles = StyleSheet.create({
  viewTable: {
    width: getWidth(),
    marginTop: HEIGHT(24),
    alignSelf: 'center',
    borderRadius: WIDTH(8),
  },
  txtTable: {
    textAlign: 'center',
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(24),
    fontFamily: R.fonts.BeVietnamProRegular,
    color: R.colors.black0,
  },
  rowTable: {
    // minHeight: HEIGHT(50),
    marginTop: HEIGHT(20),
    // backgroundColor: R.colors.whitef0,
  },
});
