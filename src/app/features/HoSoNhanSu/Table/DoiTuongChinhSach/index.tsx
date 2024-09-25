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
import { getDoiTuongChinhSach } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

const DoiTuongChinhSach = ({
  editVisible,
  infoUser,
  onShowDetail,
}: {
  infoUser?: any;
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
        condition: { thongTinNhanSuId: infoUser?._id },
      };

      const resLuong = await getDoiTuongChinhSach(body);

      setquaTrinhCongTac(resLuong?.data?.result ?? []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const goToAdd = () => {
    navigateScreen(APP_SCREEN.DOITUONGCHINHSACHTABLE, {
      idUser: infoUser?._id,
      onRefresh: getData,
    });
  };

  const handleShowData = (item: any) => {
    if (editVisible) {
      navigateScreen(APP_SCREEN.DOITUONGCHINHSACHTABLE, {
        item,
        idUser: infoUser?._id,
        onRefresh: getData,
      });
    } else {
      onShowDetail && onShowDetail(listdata(item));
    }
  };

  const tableHead = [
    translate('hoSoNhanSu:doiTuong'),
    translate('hoSoNhanSu:batDau'),
    translate('hoSoNhanSu:ketThuc'),
  ];

  const widthArr = [WIDTH(123), WIDTH(110), WIDTH(110)];

  const tableData =
    quaTrinhCongTac?.map((itemSV: any, indexSV: number) => {
      const dataRow = [
        <ItemInfor
          onPress={() => handleShowData(itemSV)}
          content={itemSV?.doiTuongChinhSach ?? '--'}
          key={indexSV}
        />,
        <ItemInfor
          onPress={() => handleShowData(itemSV)}
          content={
            itemSV?.tuNgay ? moment(itemSV?.tuNgay).format('DD-MM-YYYY') : '--'
          }
          key={indexSV}
        />,
        <ItemInfor
          onPress={() => handleShowData(itemSV)}
          content={
            itemSV?.denNgay
              ? moment(itemSV?.denNgay).format('DD-MM-YYYY')
              : '--'
          }
          key={indexSV}
        />,
      ];

      return dataRow;
    }) ?? [];

  if (loading) {
    return (
      <BoxHSNS
        title={translate('hoSoNhanSu:doiTuongChinhSach')}
        onPress={goToAdd}
        visibleAdd={!!editVisible}>
        <SkeletonTable />
      </BoxHSNS>
    );
  }

  return (
    <BoxHSNS
      title={translate('hoSoNhanSu:doiTuongChinhSach')}
      onPress={goToAdd}
      visibleAdd={!!editVisible}>
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

export default DoiTuongChinhSach;

const styles = StyleSheet.create({
  itemtrong: {
    marginBottom: HEIGHT(20),
    marginTop: 0,
  },
  content: { paddingBottom: HEIGHT(20) },
});

const listdata = (item: any) => [
  {
    label: translate('hoSoNhanSu:doiTuongChinhSach'),
    value: item?.doiTuongChinhSach ?? '--',
  },
  {
    label: translate('slink:FromDate'),
    value: item?.tuNgay ? moment(item?.tuNgay).format('DD-MM-YYYY') : '--',
  },
  {
    label: translate('slink:ToDate'),
    value: item?.denNgay ? moment(item?.denNgay).format('DD-MM-YYYY') : '--',
  },
  { label: translate('slink:Note'), value: item?.ghiChu ?? '--' },
  {
    label: translate('hoSoNhanSu:fileDinhKem'),
    value: item?.urlFileUpload ?? '--',
    isLink: item?.urlFileUpload,
  },
];
