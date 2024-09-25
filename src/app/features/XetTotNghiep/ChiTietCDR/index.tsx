/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';

import { XET_TOT_NGHIEP } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import TabbarCustome from '@components/TabbarCustome/Tabbar';
import HeaderReal from '@libcomponents/header-real';

import ItemTarget from './ItemTarget';
import styles from './styles';

import { ChiTietProps, ThongTinCDRProps } from '../type';
interface Props {
  route: { params: { data: ThongTinCDRProps } };
}

const ChiTietCDR = (props: Props) => {
  const dataCDR = props?.route?.params?.data;

  const [index, setIndex] = useState(0);

  const [routes] = useState<{ key: number; title: string }[]>([
    { key: 0, title: 'Chứng chỉ của tôi' },
    { key: 1, title: 'Chuẩn đầu ra' },
  ]);

  const isNgoaiNgu = dataCDR?.maLoaiChungChi === 'NN';

  const renderScene = ({
    route,
  }: {
    route: { key: number; title: string };
  }) => {
    const data: any =
      route?.key === XET_TOT_NGHIEP.CC_CHUAN_DAU_RA
        ? listCDR(dataCDR, isNgoaiNgu)
        : listCCMe(dataCDR, isNgoaiNgu);

    return <ListCDR key={route?.key} type={route?.key} data={data} />;
  };

  const onIndexChange = (curindex: number) => {
    setIndex(curindex);
  };

  return (
    <View style={styles.container}>
      <HeaderReal
        title={dataCDR?.loaiChungChi?.ten || 'Chứng chỉ chuẩn đầu ra'}
      />
      <TabbarCustome
        renderScene={renderScene}
        onIndexChange={onIndexChange}
        navigationState={{ index, routes }}
        lazy={false}
      />
    </View>
  );
};

export default ChiTietCDR;
const ListCDR = ({
  data,
  type,
}: {
  data: ChiTietProps[] | undefined;
  type: number;
}) => {
  return (
    <FlatList
      data={data}
      ListEmptyComponent={<ItemTrong />}
      renderItem={({ item, index }) => {
        return <ItemTarget type={type} key={index} data={item} />;
      }}
    />
  );
};

const listCCMe = (dataCDR: ThongTinCDRProps, isNgoaiNgu: boolean) => {
  return dataCDR?.chungChiDaDat?.map(item => {
    const ten = isNgoaiNgu
      ? `${item?.chungChi?.loaiChungChi?.ten || '--'} - ${
          item?.maChungChi || '--'
        }`
      : `${item?.chungChi?.loaiChungChi?.ten || '--'}`;

    return {
      ten,
      ...(isNgoaiNgu && {
        ngoaiNgu: item?.maChungChi || '--',
      }),
      ngayCap: item?.ngayCap || '--',
      ngayHetHan: item?.ngayHetHan || '--',
      chungChiCoThoiHan: item?.chungChi?.chungChiCoThoiHan ?? false,
      donViCap: item?.donViCap || '--',
      trinhDo:
        item?.chungChi?.phuongThucTinhDiem === 'Đạt'
          ? true
          : item?.diem || '--',
    };
  });
};

const listCDR = (dataCDR: ThongTinCDRProps, isNgoaiNgu: boolean) => {
  return dataCDR?.danhSachChungChiCtdtCdr?.map(item => {
    const pttinhdiemByBac = `${
      item?.chungChi?.phuongThucTinhDiem || '--'
    }: ${item?.chungChi?.bac?.map(e => e?.ten)?.join(', ')}`;

    const pttinhdiembyPoin = `${item?.chungChi?.phuongThucTinhDiem || '--'}: ${
      item?.chungChi?.min ?? '--'
    } - ${item?.chungChi?.max ?? '--'}`;

    const pttdTheoBac = item?.chungChi?.phuongThucTinhDiem === 'Theo bậc';

    const cdrTheoBac = item?.chungChi?.bac?.find(
      cdr => cdr?.order === item?.chuanDauRa,
    );

    const dkToiThieu = pttdTheoBac ? cdrTheoBac?.ten : item?.chuanDauRa ?? '';

    return {
      ten: item?.chungChi?.ten || '',
      ...(isNgoaiNgu && {
        ngoaiNgu: item?.chungChi?.maNgonNgu || '',
      }),
      pttd:
        item?.chungChi?.phuongThucTinhDiem === 'Đạt'
          ? 'Đạt'
          : pttdTheoBac
          ? pttinhdiemByBac
          : pttinhdiembyPoin,
      dkToiThieu,
    };
  });
};
