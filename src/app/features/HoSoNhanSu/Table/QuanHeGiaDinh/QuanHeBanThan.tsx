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
import { qhgdBanThan } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

const QuanHeBanThan = ({
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

      const resLuong = await qhgdBanThan(body);

      setdienBienLuong(resLuong?.data?.result ?? []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const goToAdd = () => {
    navigateScreen(APP_SCREEN.GIADINHMETABLE, {
      idUser,
      onRefresh: getData,
    });
  };

  const handleShowData = (item: any) => {
    if (editVisible) {
      navigateScreen(APP_SCREEN.GIADINHMETABLE, {
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
          // content={date(itemSV)}
          content={itemSV?.namSinh || '--'}
          onPress={() => handleShowData(itemSV)}
          key={indexSV}
        />,
      ];

      return dataRow;
    }) ?? [];

  if (loading) {
    <BoxHSNS
      title={translate('hoSoNhanSu:moiQuanHeGiaDinh')}
      onPress={goToAdd}
      visibleAdd={!!editVisible}>
      <SkeletonTable />
    </BoxHSNS>;
  }

  return (
    <BoxHSNS
      title={translate('hoSoNhanSu:moiQuanHeGiaDinh')}
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

export default QuanHeBanThan;

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

const monthList: number[] = [];

for (let i = 1; i <= 12; i++) {
  monthList.push(i);
}

const dayList: number[] = [];

for (let i = 1; i <= 31; i++) {
  dayList.push(i);
}

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
    label: translate('slink:Phone_number'),
    value: item?.soDienThoai || '--',
  },
  {
    label: translate('hoSoNhanSu:cccdCMND'),
    value: item?.cccdCMND || '--',
  },
  {
    label: translate('hoSoNhanSu:ngayCap'),
    value: item?.ngayCap ? moment(item?.ngayCap).format('DD-MM-YYYY') : '--',
  },
  {
    label: translate('hoSoNhanSu:noiCap'),
    value: item?.noiCap || '--',
  },
  {
    label: translate('hoSoNhanSu:moiQuanHe'),
    value: item?.moiQuanHe || '--',
  },
  {
    label: translate('hoSoNhanSu:hoKhau'),
    value: '',
  },
  {
    label: translate('hoSoNhanSu:hoKhauThanhPhoTen'),
    value: item?.hoKhauThanhPhoTen || '--',
  },
  {
    label: translate('hoSoNhanSu:hoKhauQuanTen'),
    value: item?.hoKhauQuanTen || '--',
  },
  {
    label: translate('hoSoNhanSu:hoKhauXaTen'),
    value: item?.hoKhauXaTen || '--',
  },
  {
    label: translate('hoSoNhanSu:hoKhauSoNha'),
    value: item?.hoKhauSoNha || '--',
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
