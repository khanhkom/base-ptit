/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
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
import { getTrinhDoDaoTao } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

const TrinhDoDaoTao = ({
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

  const [listTrinhDoDaoTao, setlistTrinhDoDaoTao] = useState<any[]>([]);

  const getData = async () => {
    try {
      setloading(true);

      const body = {
        page: 1,
        limit: 10,
        condition: { thongTinNhanSuId: idUser },
      };

      const resTDDT = await getTrinhDoDaoTao(body);

      setlistTrinhDoDaoTao(resTDDT?.data?.result ?? []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const goToAdd = () => {
    navigateScreen(APP_SCREEN.TRINHDODAOTAOTABLE, {
      idUser,
      onRefresh: getData,
    });
  };

  const handleShow = (item: any) => {
    if (editVisible) {
      navigateScreen(APP_SCREEN.TRINHDODAOTAOTABLE, {
        item,
        idUser,
        onRefresh: getData,
      });
    } else {
      onShowDetail && onShowDetail(listdata(item));
    }
  };

  const tableHead = [
    translate('hoSoNhanSu:trinhDo'),
    translate('hoSoNhanSu:noiDaoTao'),
    translate('slink:Majors'),
  ];

  const widthArr = [WIDTH(123), WIDTH(100), WIDTH(120)];

  const tableData =
    listTrinhDoDaoTao?.map((itemSV: any, indexSV: number) => {
      const dataRow = [
        <ItemInfor
          onPress={() => handleShow(itemSV)}
          content={itemSV?.trinhDoDaoTao?.ten ?? '--'}
          key={indexSV + 1}
        />,
        <ItemInfor
          onPress={() => handleShow(itemSV)}
          content={itemSV?.noiDaoTao ?? '--'}
          key={indexSV + 1}
        />,
        <ItemInfor
          onPress={() => handleShow(itemSV)}
          content={itemSV?.nganh ?? '--'}
          key={indexSV + 1}
        />,
      ];

      return dataRow;
    }) ?? [];

  return (
    <BoxHSNS
      title={translate('hoSoNhanSu:ttTrinhDoDaoTao')}
      visibleAdd={!!editVisible}
      onPress={() => goToAdd()}>
      {loading ? (
        <SkeletonTable />
      ) : listTrinhDoDaoTao?.length > 0 ? (
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

export default TrinhDoDaoTao;
const listdata = (item: any) => [
  { value: item?.nuocDaoTao ?? '--', label: 'Nước đào tạo' },
  { value: item?.noiDaoTao ?? '--', label: 'Nơi đào tạo' },
  { value: item?.trinhDoDaoTao?.ten ?? '--', label: 'Trình độ' },
  { value: item?.nganh ?? '--', label: translate('slink:Majors') },
  {
    value: item?.thoiGianBatDau
      ? moment(item?.thoiGianBatDau).format('DD/MM/YYYY')
      : '--',
    label: translate('hoSoNhanSu:tuNgay'),
  },
  {
    value: item?.thoiGianKetThuc
      ? moment(item?.thoiGianKetThuc).format('DD/MM/YYYY')
      : '--',
    label: translate('hoSoNhanSu:denNgay'),
  },
  {
    value: item?.hinhThucDaoTao?.ten ?? '--',
    label: translate('hoSoNhanSu:hinhThucDaoTao'),
  },
  {
    value: item?.vanBangChungChi ?? '--',
    label: translate('hoSoNhanSu:vanBangChungChiShort'),
  },
  {
    value: `${item?.namTotNghiep ?? '--'}`,
    label: translate('hoSoNhanSu:namTotNghiep'),
  },
  {
    label: translate('hoSoNhanSu:fileDinhKem'),
    value: '',
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
