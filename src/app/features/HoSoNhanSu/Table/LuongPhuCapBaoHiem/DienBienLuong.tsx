/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { HEIGHT, WIDTH } from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import BoxHSNS from '@components/BoxHSNS';
import SkeletonTable from '@components/HoSoNhanSu/SkeletonTable';
import ItemTrong from '@components/Item/ItemTrong';
import ItemInfor from '@libcomponents/ItemTable';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getDienBienLuong } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

const DienBienLuong = ({
  editVisible,
  idUser,
  onShowDetail,
}: {
  idUser?: string;
  editVisible?: boolean;
  onShowDetail?: (e: any) => void;
}) => {
  const [dienBienLuong, setdienBienLuong] = useState<any[]>([]);

  const [loading, setloading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setloading(true);

    try {
      const body = {
        page: 1,
        limit: 10,
        condition: { thongTinNhanSuId: idUser },
      };

      const resLuong = await getDienBienLuong(body);

      setdienBienLuong(resLuong?.data?.result ?? []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const goToAdd = () => {
    navigateScreen(APP_SCREEN.DIENBIENLUONGTABLE, {
      idUser,
      onRefresh: getData,
    });
  };

  const handleShowData = (item: any) => {
    if (editVisible) {
      navigateScreen(APP_SCREEN.DIENBIENLUONGTABLE, {
        item,
        idUser,
        onRefresh: getData,
      });
    } else {
      onShowDetail && onShowDetail(listdata(item));
    }
  };

  const tableHead = [
    translate('hoSoNhanSu:ngachLuong'),
    translate('hoSoNhanSu:bacLuong'),
    translate('hoSoNhanSu:heSo'),
  ];

  const widthArr = [WIDTH(123), WIDTH(100), WIDTH(120)];

  const tableData =
    dienBienLuong?.map((itemSV: any, indexSV: number) => {
      const dataRow = [
        <ItemInfor
          onPress={() => handleShowData(itemSV)}
          content={itemSV?.ngachLuong?.ten ?? '--'}
          key={indexSV}
        />,
        <ItemInfor
          onPress={() => handleShowData(itemSV)}
          content={itemSV?.bacLuong?.bacLuong ?? '--'}
          key={indexSV}
        />,
        <ItemInfor
          onPress={() => handleShowData(itemSV)}
          content={itemSV?.heSo ?? '--'}
          key={indexSV}
        />,
      ];

      return dataRow;
    }) ?? [];

  if (loading) {
    return (
      <BoxHSNS
        title={translate('hoSoNhanSu:dienBienLuong')}
        visibleAdd={!!editVisible}
        onPress={goToAdd}>
        <SkeletonTable />
      </BoxHSNS>
    );
  }

  return (
    <BoxHSNS
      title={translate('hoSoNhanSu:dienBienLuong')}
      visibleAdd={!!editVisible}
      onPress={goToAdd}>
      {dienBienLuong?.length > 0 ? (
        <BaseTableComponent
          tableHead={tableHead}
          widthArr={widthArr}
          tableData={tableData}
          contentContainerStyle={styles.content}
        />
      ) : (
        <ItemTrong customStyle={styles.itemtrong} />
      )}
    </BoxHSNS>
  );
};

export default DienBienLuong;

const listdata = (item: any) => [
  { label: translate('hoSoNhanSu:loaiLuong'), value: item?.loaiLuong ?? '--' },
  {
    label: translate('hoSoNhanSu:ngachLuong'),
    value: item?.ngachLuong?.ten ?? '--',
  },
  {
    label: translate('hoSoNhanSu:bacLuong'),
    value: item?.bacLuong?.bacLuong ? String(item?.bacLuong?.bacLuong) : '--',
  },
  {
    label: translate('hoSoNhanSu:heSo'),
    value: item?.heSo ? String(item?.heSo) : '--',
  },
  {
    label: translate('hoSoNhanSu:phanTramHuong'),
    value: item?.phanTramHuong ? String(item?.phanTramHuong) + '%' : '--',
  },
  {
    label: translate('hoSoNhanSu:phuCapVuotKhung'),
    value: item?.phuCapVuotKhung ?? '--',
  },
  {
    label: translate('slink:FromDate'),
    value: item?.tuNgay ? moment(item?.tuNgay).format('DD-MM-YYYY') : '--',
  },
  {
    label: translate('slink:ToDate'),
    value: item?.denNgay ? moment(item?.denNgay).format('DD-MM-YYYY') : '--',
  },
  {
    label: translate('hoSoNhanSu:soQuyetDinh'),
    value: item?.soQuyeDinh ?? '--',
  },
  {
    label: translate('hoSoNhanSu:mocXetNangLuong'),
    value: item?.mocXetNangLuong
      ? moment(item?.mocXetNangLuong).format('DD-MM-YYYY')
      : '--',
  },
  {
    label: translate('hoSoNhanSu:ngayQuyetDinh'),
    value: item?.ngayQuyetDinh
      ? moment(item?.ngayQuyetDinh).format('DD-MM-YYYY')
      : '--',
  },
  {
    label: translate('hoSoNhanSu:fileDinhKem'),
    value: item?.fileDinhKem ?? '--',
    isLink: item?.fileDinhKem,
  },
];

const styles = StyleSheet.create({
  itemtrong: {
    marginBottom: HEIGHT(20),
    marginTop: 0,
  },
  content: { paddingBottom: HEIGHT(20) },
});
