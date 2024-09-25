/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
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
import { getTrinhDoLyLuanPage } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

const LyLuanChinhTri = ({
  onShowDetail,
  editVisible,
  idUser,
}: {
  idUser?: string;
  editVisible?: boolean;
  onShowDetail?: (e: any) => void;
}) => {
  useEffect(() => {
    getData();
  }, []);

  const [loading, setloading] = useState(false);

  const [listHocHam, setlistHocHam] = useState<any[]>([]);

  const getData = async () => {
    try {
      setloading(true);

      const body = {
        page: 1,
        limit: 10,
        condition: { thongTinNhanSuId: idUser },
      };

      const res = await getTrinhDoLyLuanPage(body);

      setlistHocHam(res?.data?.result ?? []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const goToAdd = () => {
    navigateScreen(APP_SCREEN.LYLUANCHINHTRITABLE, {
      idUser,
      onRefresh: getData,
    });
  };

  const handleShow = (item: any) => {
    if (editVisible) {
      navigateScreen(APP_SCREEN.LYLUANCHINHTRITABLE, {
        item,
        idUser,
        onRefresh: getData,
      });
    } else {
      onShowDetail && onShowDetail(listdata(item));
    }
  };

  const tableHead = [
    translate('hoSoNhanSu:hinhThucDaoTao'),
    translate('hoSoNhanSu:trinhDo'),
    translate('hoSoNhanSu:coSoDaoTao'),
  ];

  const widthArr = [WIDTH(123), WIDTH(120), WIDTH(100)];

  const tableData =
    listHocHam?.map((itemSV: any, indexSV: number) => {
      const dataRow = [
        <ItemInfor
          onPress={() => handleShow(itemSV)}
          content={itemSV?.hinhThucDaoTao?.ten ?? '--'}
          key={indexSV}
        />,
        <ItemInfor
          onPress={() => handleShow(itemSV)}
          content={itemSV?.trinhDoLyLuanChinhTri?.ten ?? '--'}
          key={indexSV}
        />,
        <ItemInfor
          onPress={() => handleShow(itemSV)}
          content={itemSV?.coSoDaoTao ?? '--'}
          key={indexSV}
        />,
      ];

      return dataRow;
    }) ?? [];

  return (
    <BoxHSNS
      title={translate('hoSoNhanSu:trinhDoLyLuanChinhTri')}
      visibleAdd={!!editVisible}
      onPress={() => goToAdd()}>
      {loading ? (
        <SkeletonTable />
      ) : listHocHam?.length > 0 ? (
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

export default LyLuanChinhTri;

const listdata = (item: any) => [
  {
    label: translate('hoSoNhanSu:tuNgay'),
    value: item?.thoiGianBatDau
      ? moment(item?.thoiGianBatDau).format('DD-MM-YYYY')
      : '--',
  },
  {
    label: translate('hoSoNhanSu:denNgay'),
    value: item?.thoiGianKetThuc
      ? moment(item?.thoiGianKetThuc).format('DD-MM-YYYY')
      : '--',
  },
  {
    label: translate('hoSoNhanSu:hinhThucDaoTao'),
    value: item?.hinhThucDaoTao?.ten ?? '--',
  },
  {
    label: translate('hoSoNhanSu:trinhDoLyLuanChinhTri'),
    value: item?.trinhDoLyLuanChinhTri?.ten ?? '--',
  },
  {
    label: translate('hoSoNhanSu:vanBangChungChi'),
    value: item?.vanBangChungChi ?? '--',
  },
  {
    label: translate('hoSoNhanSu:coSoDaoTao'),
    value: item?.coSoDaoTao ?? '--',
  },
  {
    label: translate('hoSoNhanSu:apDung'),
    value: item?.apDung ? '✅' : '❌',
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
