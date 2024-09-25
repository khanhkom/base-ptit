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
import { getKhenThuongNhanSu } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

const KhenThuong = ({
  editVisible,
  idUser,
  onShowDetail,
}: {
  idUser?: string;
  editVisible?: boolean;
  onShowDetail?: (e: any) => void;
}) => {
  const [khenThuongNS, setkhenThuongNS] = useState<any[]>([]);

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

      const resLuong = await getKhenThuongNhanSu(body);

      setkhenThuongNS(resLuong?.data?.result || []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const goToAdd = () => {
    navigateScreen(APP_SCREEN.KHENTHUONGTABLE, {
      idUser,
      onRefresh: getData,
    });
  };

  const handleShowData = (item: any) => {
    if (editVisible) {
      navigateScreen(APP_SCREEN.KHENTHUONGTABLE, {
        idUser,
        item,
        onRefresh: getData,
      });
    } else {
      onShowDetail && onShowDetail(listdata(item));
    }
  };

  const tableHead = [
    translate('hoSoNhanSu:coQuanQuyetDinh'),
    translate('hoSoNhanSu:capKhenThuong'),
    translate('hoSoNhanSu:soQuyetDinh'),
  ];

  const widthArr = [WIDTH(123), WIDTH(120), WIDTH(100)];

  const tableData =
    khenThuongNS?.map((itemSV: any, indexSV: number) => {
      const dataRow = [
        <ItemInfor
          onPress={() => handleShowData(itemSV)}
          content={itemSV?.coQuanQuyetDinh || '--'}
          key={indexSV}
        />,
        <ItemInfor
          onPress={() => handleShowData(itemSV)}
          content={itemSV?.capKhenThuong?.ten || '--'}
          key={indexSV}
        />,
        <ItemInfor
          onPress={() => handleShowData(itemSV)}
          content={itemSV?.soQuyetDinh ?? '--'}
          key={indexSV}
        />,
      ];

      return dataRow;
    }) || [];

  if (loading) {
    return (
      <BoxHSNS
        title={translate('hoSoNhanSu:khenThuong')}
        onPress={goToAdd}
        visibleAdd={!!editVisible}>
        <SkeletonTable />
      </BoxHSNS>
    );
  }

  return (
    <BoxHSNS
      title={translate('hoSoNhanSu:khenThuong')}
      onPress={goToAdd}
      visibleAdd={!!editVisible}>
      {khenThuongNS?.length > 0 ? (
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

export default KhenThuong;

const listdata = (item: any) => [
  {
    label: translate('hoSoNhanSu:soQuyetDinh'),
    value: item?.soQuyetDinh || '--',
  },
  {
    label: translate('hoSoNhanSu:coQuanQuyetDinh'),
    value: item?.coQuanQuyetDinh || '--',
  },

  {
    label: translate('hoSoNhanSu:ngayQuyetDinh'),
    value: item?.ngayQuyetDinh
      ? moment(item?.ngayQuyetDinh).format('DD-MM-YYYY')
      : '--',
  },
  {
    label: translate('hoSoNhanSu:nguoiKy'),
    value: item?.nguoiKy || '--',
  },
  {
    label: translate('hoSoNhanSu:ngayKy'),
    value: item?.ngayKy ? moment(item?.ngayKy).format('DD-MM-YYYY') : '--',
  },
  {
    label: translate('hoSoNhanSu:capKhenThuong'),
    value: item?.capKhenThuong?.ten || '--',
  },
  {
    label: translate('hoSoNhanSu:loaiKhenThuong'),
    value: item?.loaiKhenThuong?.ten || '--',
  },
  {
    label: translate('hoSoNhanSu:phuongThucKhenThuong'),
    value: item?.phuongThucKhenThuong?.ten || '--',
  },
  {
    label: translate('hoSoNhanSu:hinhThucKhenThuong'),
    value: item?.hinhThucKhenThuong?.ten || '--',
  },
  {
    label: translate('hoSoNhanSu:anhHuongThoiGianKhenThuong'),
    value: item?.anhHuongThoiGianKhenThuong ? '✅' : '❌',
  },
  {
    label: translate('hoSoNhanSu:thoiGianDieuChinh'),
    value: item?.thoiGianDieuChinh ? String(item?.thoiGianDieuChinh) : '--',
  },
  {
    label: translate('hoSoNhanSu:daXetDieuChinhTangLuong'),
    value: item?.daXetDieuChinhTangLuong ? '✅' : '❌',
  },
  { label: translate('hoSoNhanSu:noiDung'), value: item?.noiDung || '--' },
  {
    label: translate('hoSoNhanSu:urlFileQuyetDinh'),
    value: item?.urlFileQuyetDinh ?? '--',
    isLink: item?.urlFileQuyetDinh,
  },
  {
    label: translate('hoSoNhanSu:urlFileHoSoDeXuat'),
    value: item?.urlFileHoSoDeXuat ?? '--',
    isLink: item?.urlFileHoSoDeXuat,
  },
  {
    label: translate('hoSoNhanSu:urlFileBangKhen'),
    value: item?.urlFileBangKhen ?? '--',
    isLink: item?.urlFileBangKhen,
  },
  {
    label: translate('hoSoNhanSu:urlFileCacTaiLieuKhac'),
    value: item?.urlFileCacTaiLieuKhac ?? '--',
    isLink: item?.urlFileCacTaiLieuKhac,
  },
];

const styles = StyleSheet.create({
  itemtrong: {
    marginBottom: HEIGHT(20),
    marginTop: 0,
  },
  content: { paddingBottom: HEIGHT(20) },
});
