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
import { getQuocPhong } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

const QuocPhongAnNinh = ({
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

      const res = await getQuocPhong(body);

      setlistHocHam(res?.data?.result ?? []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const goToAdd = () => {
    navigateScreen(APP_SCREEN.QUOCPHONGANNINHTABLE, {
      idUser,
      onRefresh: getData,
    });
  };

  const handleShow = (item: any) => {
    if (editVisible) {
      navigateScreen(APP_SCREEN.QUOCPHONGANNINHTABLE, {
        item,
        idUser,
        onRefresh: getData,
      });
    } else {
      onShowDetail && onShowDetail(listdata(item));
    }
  };

  const tableHead = [
    translate('hoSoNhanSu:quocPhonghAnNinh'),
    translate('hoSoNhanSu:batDau'),
    translate('hoSoNhanSu:ketThuc'),
  ];

  const widthArr = [WIDTH(123), WIDTH(120), WIDTH(100)];

  const tableData =
    listHocHam?.map((itemSV: any, indexSV: number) => {
      const dataRow = [
        <ItemInfor
          onPress={() => handleShow(itemSV)}
          content={itemSV?.coSoDaoTao ?? '--'}
          key={indexSV}
        />,
        <ItemInfor
          onPress={() => handleShow(itemSV)}
          content={
            itemSV?.thoiGianBatDau
              ? moment(itemSV?.thoiGianBatDau).format('DD/MM/YYYY')
              : '--'
          }
          key={indexSV}
        />,
        <ItemInfor
          onPress={() => handleShow(itemSV)}
          content={
            itemSV?.thoiGianKetThuc
              ? moment(itemSV?.thoiGianKetThuc).format('DD/MM/YYYY')
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
      title={translate('hoSoNhanSu:quocPhonghAnNinh')}
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

export default QuocPhongAnNinh;

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
    label: translate('hoSoNhanSu:vanBangChungChi'),
    value: item?.vanBangChungChi ?? '--',
  },
  {
    label: translate('hoSoNhanSu:coSoDaoTao'),
    value: item?.coSoDaoTao ?? '--',
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
