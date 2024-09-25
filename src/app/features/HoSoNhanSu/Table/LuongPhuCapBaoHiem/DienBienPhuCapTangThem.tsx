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
import { getDienBienPhuCapTangThem } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

const DienBienPhuCapTangThem = ({
  editVisible,
  idUser,
  onShowDetail,
}: {
  idUser?: string;
  editVisible?: boolean;
  onShowDetail?: (e: any) => void;
}) => {
  const [dienBienPC, setDienBienPC] = useState<any[]>([]);

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

      const resLuong = await getDienBienPhuCapTangThem(body);

      setDienBienPC(resLuong?.data?.result ?? []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const goToAdd = () => {
    navigateScreen(APP_SCREEN.DIENBIENPHUCAPTANGTHEMTABLE, {
      idUser,
      onRefresh: getData,
    });
  };

  const handleShowData = (item: any) => {
    if (editVisible) {
      navigateScreen(APP_SCREEN.DIENBIENPHUCAPTANGTHEMTABLE, {
        item,
        idUser,
        onRefresh: getData,
      });
    } else {
      onShowDetail && onShowDetail(listdata(item));
    }
  };

  const tableHead = [
    translate('hoSoNhanSu:loaiPhuCapTangThem'),
    translate('hoSoNhanSu:mucPhuCapTangThem'),
    translate('hoSoNhanSu:heSoPhanTramGiaTri'),
  ];

  const widthArr = [WIDTH(130), WIDTH(100), WIDTH(110)];

  const tableData =
    dienBienPC?.map((itemSV: any, indexSV: number) => {
      const dataRow = [
        <ItemInfor
          onPress={() => handleShowData(itemSV)}
          content={itemSV?.loaiPhuCapTangThem?.ten ?? '--'}
          key={indexSV}
        />,

        <ItemInfor
          onPress={() => handleShowData(itemSV)}
          content={itemSV?.mucPhuCapTangThem?.ten ?? '--'}
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
    <BoxHSNS
      title={translate('hoSoNhanSu:dienBienKhoan')}
      visibleAdd={!!editVisible}
      onPress={goToAdd}>
      <SkeletonTable />
    </BoxHSNS>;
  }

  return (
    <BoxHSNS
      title={'Diễn biến phụ cấp tăng thêm'}
      visibleAdd={!!editVisible}
      onPress={goToAdd}>
      {dienBienPC?.length > 0 ? (
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

export default DienBienPhuCapTangThem;

const listdata = (item: any) => [
  {
    label: translate('hoSoNhanSu:loaiPhuCapTangThem'),
    value: item?.loaiPhuCapTangThem?.ten ?? '--',
  },
  {
    label: translate('hoSoNhanSu:mucPhuCapTangThem'),
    value: item?.mucPhuCapTangThem?.ten ?? '--',
  },
  {
    // label: 'Hệ số/Phần trăm hưởng',
    label: translate('hoSoNhanSu:heSoPhanTram'),
    value: item?.heSo ? String(item?.heSo) : '--',
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
    label: `${translate('hoSoNhanSu:mucHuong')} (%)`,
    value: item?.mucHuong ? String(item?.mucHuong) : '--',
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
