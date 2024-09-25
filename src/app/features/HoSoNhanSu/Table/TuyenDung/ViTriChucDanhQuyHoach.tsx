/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @flow
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
import { getViTriChucDanhQuyHoach } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

const ViTriChucDanhQuyHoach = ({
  visibleEdit,
  infoUser,
  onShowDetail,
}: any) => {
  const [loading, setloading] = useState(false);

  const [viTri, setviTri] = useState<any[]>([]);

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

      const responViTri = await getViTriChucDanhQuyHoach(body);

      setviTri(responViTri?.data?.result ?? []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const tableHead = [
    translate('slink:Position_title'),
    translate('hoSoNhanSu:donVi'),
    translate('hoSoNhanSu:hieuLucTuNgay'),
  ];

  const widthArr = [WIDTH(123), WIDTH(110), WIDTH(110)];

  const handleShowdata = (item: any) => {
    if (visibleEdit) {
      navigateScreen(APP_SCREEN.VITRIQUYHOACHTABLE, {
        idUser: infoUser?._id,
        onRefresh: getData,
        item,
      });
    } else {
      onShowDetail && onShowDetail(listdata(item));
    }
  };

  const goToAdd = () => {
    navigateScreen(APP_SCREEN.VITRIQUYHOACHTABLE, {
      idUser: infoUser?._id,
      onRefresh: getData,
    });
  };

  const tableData =
    viTri?.map((itemSV: any, indexSV: number) => {
      const dataRow = [
        <ItemInfor
          onPress={() => handleShowdata(itemSV)}
          content={itemSV?.donViViTri?.tenChucVu ?? '--'}
          key={indexSV}
        />,
        <ItemInfor
          onPress={() => handleShowdata(itemSV)}
          content={itemSV?.donVi?.ten ?? '--'}
          key={indexSV}
        />,
        <ItemInfor
          onPress={() => handleShowdata(itemSV)}
          content={
            itemSV?.hieuLucTuNgay
              ? moment(itemSV?.hieuLucTuNgay).format('DD-MM-YYYY')
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
        visibleAdd={!!visibleEdit}
        title={'Vị trí, chức danh quy hoạch'}
        onPress={() => goToAdd()}>
        <SkeletonTable />
      </BoxHSNS>
    );
  }

  return (
    <BoxHSNS
      visibleAdd={!!visibleEdit}
      title={'Vị trí, chức danh quy hoạch'}
      onPress={() => goToAdd()}>
      {viTri?.length > 0 ? (
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

export default ViTriChucDanhQuyHoach;

const listdata = (item: any) => [
  {
    label: translate('hoSoNhanSu:donVi'),
    value: item?.donVi?.ten ?? '--',
  },
  {
    label: translate('hoSoNhanSu:donViViTri'),
    value: item?.donViViTri?.tenChucVu ?? '--',
  },

  {
    label: translate('hoSoNhanSu:loaiQuyetDinh'),
    value: item?.loaiQuyetDinh ?? '--',
  },
  {
    label: translate('hoSoNhanSu:ngayQuyetDinh'),
    value: item?.ngayQuyetDinh
      ? moment(item?.ngayQuyetDinh).format('DD-MM-YYYY')
      : '--',
  },
  {
    label: translate('hoSoNhanSu:soQuyetDinh'),
    value: item?.soQuyetDinh ?? '--',
  },
  {
    label: translate('hoSoNhanSu:hieuLucTuNgay'),
    value: item?.hieuLucTuNgay
      ? moment(item?.hieuLucTuNgay).format('DD-MM-YYYY')
      : '--',
  },
  {
    label: translate('hoSoNhanSu:hieuLucDenNgay'),
    value: item?.hieuLucDenNgay
      ? moment(item?.hieuLucDenNgay).format('DD-MM-YYYY')
      : '--',
  },
  {
    label: translate('hoSoNhanSu:conHieuLuc'),
    value: item?.conHieuLuc ? '✅' : '❌',
  },

  {
    label: translate('hoSoNhanSu:fileDinhKem'),
    value: item?.urlFileUpload ?? '--',
    isLink: item?.urlFileUpload,
  },
];

const styles = StyleSheet.create({
  itemtrong: {
    marginBottom: 0,
    marginTop: 0,
  },
  content: { paddingBottom: HEIGHT(20) },
});
