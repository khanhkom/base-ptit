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
import { getQuaTrinhCongTac } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

const DienBienCongTac = ({
  editVisible,
  idUser,
  onShowDetail,
}: {
  idUser?: string;
  editVisible?: boolean;
  onShowDetail?: (e: any) => void;
}) => {
  const [quaTrinhCongTac, setquaTrinhCongTac] = useState<any[]>([]);

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

      const resLuong = await getQuaTrinhCongTac(body);

      setquaTrinhCongTac(resLuong?.data?.result ?? []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const goToAdd = () => {
    navigateScreen(APP_SCREEN.QUATRINHCONGTACTABLE, {
      idUser,
      onRefresh: getData,
    });
  };

  const handleShowData = (item: any) => {
    if (editVisible) {
      navigateScreen(APP_SCREEN.QUATRINHCONGTACTABLE, {
        item,
        idUser,
        onRefresh: getData,
      });
    } else {
      onShowDetail && onShowDetail(listdata(item));
    }
  };

  const tableHead = [
    translate('hoSoNhanSu:donViCongTac'),
    translate('slink:FromDate'),
    translate('slink:ToDate'),
  ];

  const widthArr = [WIDTH(123), WIDTH(110), WIDTH(110)];

  const tableData =
    quaTrinhCongTac?.map((itemSV: any, indexSV: number) => {
      const dataRow = [
        <ItemInfor
          onPress={() => handleShowData(itemSV)}
          content={itemSV?.donViCongTac ?? '--'}
          key={indexSV}
        />,
        <ItemInfor
          onPress={() => handleShowData(itemSV)}
          content={
            itemSV?.tuThagNam
              ? moment(itemSV?.tuThagNam).format('DD-MM-YYYY')
              : '--'
          }
          key={indexSV}
        />,
        <ItemInfor
          onPress={() => handleShowData(itemSV)}
          content={
            itemSV?.denThangNam
              ? moment(itemSV?.denThangNam).format('DD-MM-YYYY')
              : '--'
          }
          key={indexSV}
        />,
      ];

      return dataRow;
    }) ?? [];

  if (loading) {
    <BoxHSNS
      visibleAdd={!!editVisible}
      title={translate('hoSoNhanSu:quaTrinhCongTac')}
      onPress={() => goToAdd()}>
      <SkeletonTable />
    </BoxHSNS>;
  }

  return (
    <BoxHSNS
      visibleAdd={!!editVisible}
      title={translate('hoSoNhanSu:quaTrinhCongTac')}
      onPress={() => goToAdd()}>
      {quaTrinhCongTac?.length > 0 ? (
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

export default DienBienCongTac;

const listdata = (item: any) => [
  {
    label: translate('hoSoNhanSu:loaiQuyetDinh'),
    value: item?.loaiQuyetDinh ?? '--',
  },
  {
    label: translate('hoSoNhanSu:donViCongTac'),
    value: item?.donViCongTac ?? '--',
  },
  {
    label: translate('hoSoNhanSu:chucDanh'),
    value: item?.chucDanh ?? '--',
  },
  { label: translate('hoSoNhanSu:chucVu'), value: item?.chucVu ?? '--' },
  {
    label: translate('slink:FromDate'),
    value: item?.tuThagNam
      ? moment(item?.tuThagNam).format('DD-MM-YYYY')
      : '--',
  },
  {
    label: translate('slink:ToDate'),
    value: item?.denThangNam
      ? moment(item?.denThangNam).format('DD-MM-YYYY')
      : '--',
  },
  { label: translate('hoSoNhanSu:noiDung'), value: item?.noiDung ?? '--' },
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
