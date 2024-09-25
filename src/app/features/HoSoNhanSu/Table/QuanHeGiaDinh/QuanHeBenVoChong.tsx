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
import { qhgdVoChong } from '@networking/user';
import { translate } from '@utils/i18n/translate';

const QuanHeBenVoChong = ({
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

      const resLuong = await qhgdVoChong(body);

      setdienBienLuong(resLuong?.data?.result ?? []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const goToAdd = () => {
    navigateScreen(APP_SCREEN.GIADINHVOTABLE, {
      idUser,
      onRefresh: getData,
    });
  };

  const handleShowData = (item: any) => {
    if (editVisible) {
      navigateScreen(APP_SCREEN.GIADINHVOTABLE, {
        item,
        idUser,
        onRefresh: getData,
      });
    } else {
      onShowDetail && onShowDetail(listdata(item));
    }
  };

  const tableHead = [
    translate('slink:Fullname'),
    translate('hoSoNhanSu:moiQuanHe'),
    translate('hoSoNhanSu:namSinh'),
  ];

  const widthArr = [WIDTH(163), WIDTH(90), WIDTH(90)];

  const tableData =
    dienBienLuong?.map((itemSV: any, indexSV: number) => {
      const dataRow = [
        <ItemInfor
          onPress={() => handleShowData(itemSV)}
          content={itemSV?.hoVaTen || '--'}
          key={indexSV}
        />,
        <ItemInfor
          content={itemSV?.moiQuanHe || '--'}
          onPress={() => handleShowData(itemSV)}
          key={indexSV}
        />,
        <ItemInfor
          content={itemSV?.namSinh || '--'}
          // content={date(itemSV)}
          onPress={() => handleShowData(itemSV)}
          key={indexSV}
        />,
      ];

      return dataRow;
    }) ?? [];

  if (loading) {
    return (
      <BoxHSNS
        title={translate('hoSoNhanSu:moiQuanHeVoChong')}
        onPress={goToAdd}
        visibleAdd={!!editVisible}>
        <SkeletonTable />
      </BoxHSNS>
    );
  }

  return (
    <BoxHSNS
      title={translate('hoSoNhanSu:moiQuanHeVoChong')}
      onPress={goToAdd}
      visibleAdd={!!editVisible}>
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

export default QuanHeBenVoChong;

const date = (data: any) => {
  const { ngaySinh, thangSinh, namSinh } = data;

  if (ngaySinh && thangSinh && namSinh) {
    return `${ngaySinh}-${thangSinh}-${namSinh}`;
  }

  if (thangSinh && namSinh) {
    return `${thangSinh}-${namSinh}`;
  }

  if (namSinh) {
    return `${namSinh}`;
  }

  return '--';
};

const listdata = (item: any) => [
  {
    label: translate('slink:Fullname'),
    value: item?.hoVaTen || '--',
  },
  {
    label: translate('hoSoNhanSu:namSinh'),
    value: date(item),
  },
  {
    label: translate('hoSoNhanSu:moiQuanHe'),
    value: item?.moiQuanHe || '--',
  },
  {
    label: translate('hoSoNhanSu:ngheNghiep'),
    value: item?.ngheNghiep || '--',
  },
  {
    label: translate('hoSoNhanSu:noiCongTac'),
    value: item?.noiCongTac || '--',
  },
  {
    label: translate('hoSoNhanSu:noiDung'),
    value: item?.noiDung || '--',
  },
  {
    label: translate('hoSoNhanSu:nguoiPhuThuoc'),
    value: item?.nguoiPhuThuoc ? '✅' : '❌',
  },
];

const styles = StyleSheet.create({
  itemtrong: {
    marginBottom: HEIGHT(20),
    marginTop: 0,
  },
  content: { paddingBottom: HEIGHT(20) },
});
