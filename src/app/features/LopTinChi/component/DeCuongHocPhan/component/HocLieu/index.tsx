/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

import { WIDTH } from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import ItemTrong from '@components/Item/ItemTrong';
import ItemInfor from '@libcomponents/ItemTable';
import { getDeCuongHocLieuSo } from '@networking/user';
import { translate } from '@utils/i18n/translate';

import styles from './styles';
import { APP_CONFIG_URL_THU_VIEN } from '@env';
interface Props {
  deCuongId: string;
}
const DeCuongHocLieu = (props: Props) => {
  const { deCuongId } = props;

  const [dataHLS, setdataHLS] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDeCuongHocLieu();
  }, []);

  const getDeCuongHocLieu = async () => {
    try {
      setLoading(true);

      const body = {
        page: 1,
        limit: 10,
        condition: { deCuongId },
      };

      const resDeCuong: any = await getDeCuongHocLieuSo(body);

      setdataHLS(resDeCuong?.data?.data?.result || []);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const tableHead = [
    translate('slink:No'),
    translate('slink:Title'),
    translate('slink:Loai_hoc_lieu'),
    translate('slink:Mo_ta'),
    translate('slink:Author'),
    translate('slink:Nha_xuat_ban'),
    translate('slink:Nam_xuat_ban'),
    translate('slink:Duong_dan'),
    translate('slink:Required'),
  ];

  const widthArr = [
    WIDTH(35),
    WIDTH(140),
    WIDTH(130),
    WIDTH(130),
    WIDTH(80),
    WIDTH(130),
    WIDTH(100),
    WIDTH(100),
    WIDTH(80),
  ];
  const tableData = dataHLS?.map((item: any, index: number) => {
    return [
      <ItemInfor key={index} content={String(index + 1)} />,
      <ItemInfor key={index} content={item?.tieuDe || '--'} />,
      <ItemInfor key={index} content={item?.loaiHocLieu || '--'} />,
      <ItemInfor key={index} content={item?.moTa || '--'} />,
      <ItemInfor key={index} content={item?.tacGia || '--'} />,
      <ItemInfor key={index} content={item?.tenNhaXuatBan || '--'} />,
      <ItemInfor key={index} content={item?.namXuatBan || '--'} />,
      <ItemInfor
        link={`${APP_CONFIG_URL_THU_VIEN}/${item?.url}`}
        key={index}
        content={translate('slink:See_details')}
      />,
      <ItemInfor key={index} content={item?.batBuoc ? '✅' : ''} />,
    ];
  });

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getDeCuongHocLieu} />
      }>
      {dataHLS?.length > 0 ? (
        <BaseTableComponent
          tableHead={tableHead}
          widthArr={widthArr}
          tableData={tableData}
          contentContainerStyle={styles.contentTable}
        />
      ) : (
        <ItemTrong />
      )}
    </ScrollView>
  );
};

export default DeCuongHocLieu;
