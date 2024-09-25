/* eslint-disable no-nested-ternary */
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
import { getHocHamMe } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

const HocHam = ({
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

      const res = await getHocHamMe(body);

      setlistHocHam(res?.data?.result ?? []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const goToAdd = () => {
    navigateScreen(APP_SCREEN.HOCHAMTABLE, {
      idUser,
      onRefresh: getData,
    });
  };

  const handleShow = (item: any) => {
    if (editVisible) {
      navigateScreen(APP_SCREEN.HOCHAMTABLE, {
        item,
        idUser,
        onRefresh: getData,
      });
    } else {
      onShowDetail && onShowDetail(listdata(item));
    }
  };

  const tableHead = [
    translate('hoSoNhanSu:danhHieu'),
    translate('hoSoNhanSu:loaiQuyetDinh'),
    translate('hoSoNhanSu:ngayCoHieuLuc'),
  ];

  const widthArr = [WIDTH(123), WIDTH(120), WIDTH(100)];

  const tableData =
    listHocHam?.map((itemSV: any, indexSV: number) => {
      const dataRow = [
        <ItemInfor
          onPress={() => handleShow(itemSV)}
          content={itemSV?.danhHieu ?? '--'}
          key={indexSV}
        />,

        <ItemInfor
          onPress={() => handleShow(itemSV)}
          content={itemSV?.loaiQuyetDinh ?? '--'}
          key={indexSV}
        />,
        <ItemInfor
          onPress={() => handleShow(itemSV)}
          content={
            itemSV?.ngayCoHieuLuc
              ? moment(itemSV?.ngayCoHieuLuc).format('DD-MM-YYYY')
              : '--'
          }
          key={indexSV}
        />,
      ];

      return dataRow;
    }) ?? [];

  return (
    <BoxHSNS
      visibleAdd={!!editVisible}
      title={translate('hoSoNhanSu:hocHam')}
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

export default HocHam;

const listdata = (item: any) => [
  { label: translate('hoSoNhanSu:danhHieu'), value: item?.danhHieu ?? '--' },
  { label: translate('hoSoNhanSu:nam'), value: `${item?.nam ?? '--'}` },
  { label: translate('slink:Decision_number'), value: item?.soQĐ ?? '--' },
  {
    label: translate('slink:Type_of_decision'),
    value: item?.loaiQuyetDinh ?? '--',
  },
  {
    label: translate('slink:Decision_date'),
    value: item?.ngayQĐ ? moment(item?.ngayQĐ).format('DD-MM-YYYY') : '--',
  },
  {
    label: translate('hoSoNhanSu:ngayCoHieuLuc'),
    value: item?.ngayCoHieuLuc
      ? moment(item?.ngayCoHieuLuc).format('DD-MM-YYYY')
      : '--',
  },
  {
    label: translate('hoSoNhanSu:noiDung'),
    value: item?.noiDung ?? '--',
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
