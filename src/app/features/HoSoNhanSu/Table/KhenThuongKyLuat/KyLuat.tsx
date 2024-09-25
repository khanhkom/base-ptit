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
import { getKyLuatNhanSu } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

const KyLuat = ({
  editVisible,
  idUser,
  onShowDetail,
}: {
  idUser?: string;
  editVisible?: boolean;
  onShowDetail?: (e: any) => void;
}) => {
  const [kyLuatNS, setkyLuatNS] = useState<any[]>([]);

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

      const resLuong = await getKyLuatNhanSu(body);

      setkyLuatNS(resLuong?.data?.result ?? []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const goToAdd = () => {
    navigateScreen(APP_SCREEN.KYLUATTABLE, {
      idUser,
      onRefresh: getData,
    });
  };

  const handleShowData = (item: any) => {
    if (editVisible) {
      navigateScreen(APP_SCREEN.KYLUATTABLE, {
        idUser,
        item,
        onRefresh: getData,
      });
    } else {
      onShowDetail && onShowDetail(listdata(item));
    }
  };

  const tableData =
    kyLuatNS?.map((itemSV: any, indexSV: number) => {
      const dataRow = [
        <ItemInfor
          onPress={() => handleShowData(itemSV)}
          content={itemSV?.coQuanQuyetDinh?.trim() ?? '--'}
          key={indexSV}
        />,
        <ItemInfor
          onPress={() => handleShowData(itemSV)}
          content={itemSV?.capKyLuat?.ten ?? '--'}
          key={indexSV}
        />,
        <ItemInfor
          onPress={() => handleShowData(itemSV)}
          content={itemSV?.soQuyetDinh ?? '--'}
          key={indexSV}
        />,
      ];

      return dataRow;
    }) ?? [];

  const tableHead = [
    translate('hoSoNhanSu:coQuanQuyetDinh'),
    translate('hoSoNhanSu:capKyLuat'),
    translate('hoSoNhanSu:soQuyetDinh'),
  ];

  const widthArr = [WIDTH(143), WIDTH(100), WIDTH(100)];

  if (loading) {
    return (
      <BoxHSNS
        title={translate('hoSoNhanSu:kyLuat')}
        onPress={goToAdd}
        visibleAdd={!!editVisible}>
        <SkeletonTable />
      </BoxHSNS>
    );
  }

  return (
    <BoxHSNS
      title={translate('hoSoNhanSu:kyLuat')}
      onPress={goToAdd}
      visibleAdd={!!editVisible}>
      {kyLuatNS?.length > 0 ? (
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

export default KyLuat;

const listdata = (item: any) => [
  {
    label: translate('hoSoNhanSu:soQuyetDinh'),
    value: item?.soQuyetDinh ?? '--',
  },
  {
    label: translate('hoSoNhanSu:ngayQuyetDinh'),
    value: item?.ngayQuyetDinh
      ? moment(item?.ngayQuyetDinh).format('DD-MM-YYYY')
      : '--',
  },
  {
    label: translate('hoSoNhanSu:ngayKy'),
    value: item?.ngayKy ? moment(item?.ngayKy).format('DD-MM-YYYY') : '--',
  },
  {
    label: translate('hoSoNhanSu:coQuanQuyetDinh'),
    value: item?.coQuanQuyetDinh ?? '--',
  },
  { label: translate('hoSoNhanSu:nguoiKy'), value: item?.nguoiKy ?? '--' },

  {
    label: translate('hoSoNhanSu:capKyLuat'),
    value: item?.capKyLuat?.ten ?? '--',
  },
  {
    label: translate('hoSoNhanSu:hinhThucKyLuat'),
    value: item?.hinhThucKyLuat?.ten ?? '--',
  },
  {
    label: translate('hoSoNhanSu:anhHuongThoiGianKhenThuong'),
    value: item?.hinhThucKyLuat?.anhHuongThoiGianKyLuat ? '✅' : '❌',
  },
  {
    label: translate('hoSoNhanSu:thoiGianDieuChinh'),
    value: String(item?.hinhThucKyLuat?.thoiGianDieuChinh)
      ? String(item?.hinhThucKyLuat?.thoiGianDieuChinh)
      : '--',
  },
  {
    label: translate('hoSoNhanSu:noiDung'),
    value: item?.noiDung ?? '--',
  },
  {
    label: translate('hoSoNhanSu:fileDinhKem'),
    value: item?.urlFileUpload ?? '--',
    isLink: item?.urlFileUpload,
  },
];

const styles = StyleSheet.create({
  itemtrong: {
    marginBottom: HEIGHT(20),
    marginTop: 0,
  },
  content: { paddingBottom: HEIGHT(20) },
});
