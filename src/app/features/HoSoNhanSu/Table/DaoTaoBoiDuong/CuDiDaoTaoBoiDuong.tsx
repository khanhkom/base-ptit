/* eslint-disable react-hooks/exhaustive-deps */
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
import { getHinhThucDaoTao, getQuaTrinhDaoTaoBoiDuong } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

const CuDiDaoTaoBoiDuong = ({
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

  const [listHTDT, setlistHTDT] = useState([]);

  const getData = async () => {
    try {
      setloading(true);

      const body = {
        page: 1,
        limit: 10,
        condition: { thongTinNhanSuId: idUser },
      };

      const res = await getQuaTrinhDaoTaoBoiDuong(body);

      const responseAPIHTDT = await getHinhThucDaoTao();

      setlistHTDT(
        responseAPIHTDT?.data.map((item: any) => {
          return {
            label: item?.ten ?? '',
            value: item?._id,
          };
        }) ?? [],
      );

      setlistHocHam(res?.data?.result || []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const goToAdd = () => {
    navigateScreen(APP_SCREEN.QUATRINHDTBDTABLE, {
      idUser,
      onRefresh: getData,
    });
  };

  const handleShow = (item: any) => {
    if (editVisible) {
      navigateScreen(APP_SCREEN.QUATRINHDTBDTABLE, {
        item,
        idUser,
        onRefresh: getData,
      });
    } else {
      onShowDetail && onShowDetail(listdata(item, listHTDT));
    }
  };

  const tableHead = [
    translate('hoSoNhanSu:khoaDtbd'),
    translate('hoSoNhanSu:dvToChuc'),
    translate('hoSoNhanSu:loaiBoiDuong'),
  ];

  const widthArr = [WIDTH(123), WIDTH(120), WIDTH(100)];

  const tableData =
    listHocHam?.map((itemSV: any, indexSV: number) => {
      const dataRow = [
        <ItemInfor
          onPress={() => handleShow(itemSV)}
          content={itemSV?.khoaBoiDuongTapHuan || '--'}
          key={indexSV}
        />,
        <ItemInfor
          onPress={() => handleShow(itemSV)}
          content={itemSV?.donViToChuc || '--'}
          key={indexSV}
        />,
        <ItemInfor
          onPress={() => handleShow(itemSV)}
          content={itemSV?.loaiBoiDuong?.ten || '--'}
          key={indexSV}
        />,
      ];

      return dataRow;
    }) || [];

  return (
    <BoxHSNS
      visibleAdd={!!editVisible}
      title={translate('hoSoNhanSu:quaTrinhBoiDuong')}
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

export default CuDiDaoTaoBoiDuong;

const listdata = (item: any, listHTDT: any[]) => [
  {
    label: translate('hoSoNhanSu:loaiBoiDuong'),
    value: item?.loaiBoiDuong?.ten || '--',
  },
  {
    label: 'Nước đi học',
    value: item?.noiBoiDuong || '--',
  },
  ...(item?.noiBoiDuong === 'Nước ngoài'
    ? [
        {
          label: 'Quốc gia',
          value: item?.tenQuocTich || '--',
        },
      ]
    : []),
  {
    label: translate('hoSoNhanSu:donViToChuc'),
    value: item?.donViToChuc || '--',
  },
  {
    label: 'Hình thức đào tạo',
    value:
      listHTDT?.find(itemHTDT => {
        return itemHTDT?.value === item?.hinhThucDaoTaoId;
      })?.label || '--',
  },
  {
    label: translate('hoSoNhanSu:diaDiemToChuc'),
    value: item?.diaDiemToChuc || '--',
  },
  {
    label: 'Chủ đề đào tạo, bồi dưỡng',
    value: item?.khoaBoiDuongTapHuan || '--',
  },
  {
    label: 'Số quyết định',
    value: item?.soQuyetDinh || '--',
  },
  {
    label: 'Ngày quyết định',
    value: item?.ngayQuyetDinh
      ? moment(item?.ngayQuyetDinh).format('DD-MM-YYYY')
      : '--',
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
    label: 'Gia hạn đến ngày',
    value: item?.giaHanDenNgay
      ? moment(item?.giaHanDenNgay).format('DD-MM-YYYY')
      : '--',
  },
  {
    label: translate('hoSoNhanSu:nguonKinhPhi'),
    value: item?.nguonKinhPhi || '--',
  },
  {
    label: 'Kinh phí',
    value: String(item?.kinhPhi) || '--',
  },
  {
    label: translate('hoSoNhanSu:chungChi'),
    value: item?.chungChi || '--',
  },
  {
    label: translate('hoSoNhanSu:ngayCap'),
    value: item?.ngayCap ? moment(item?.ngayCap).format('DD-MM-YYYY') : '--',
  },
  {
    label: translate('hoSoNhanSu:fileDinhKem') + ' kết quả',
    value: item?.fileDinhKemKetQua ?? '--',
    isLink: item?.fileDinhKemKetQua,
  },
  {
    label: translate('hoSoNhanSu:fileDinhKem') + ' số quyết định',
    value: item?.fileDinhKemSoQuyetDinh ?? '--',
    isLink: item?.fileDinhKemSoQuyetDinh,
  },
];

const styles = StyleSheet.create({
  itemtrong: {
    marginBottom: HEIGHT(20),
    marginTop: 0,
  },
  content: { paddingBottom: HEIGHT(20) },
});
