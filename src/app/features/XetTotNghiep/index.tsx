import React, { ReactNode, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { WIDTH } from '@common';
import TabbarCustome from '@components/TabbarCustome/Tabbar';
import HeaderReal from '@libcomponents/header-real';
import ItemIconSVG from '@libcomponents/icon-svg';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { getKhoaNganh, getThongTinSinhVien } from '@networking/user';
import { translate } from '@utils/i18n/translate';

import DotXetTotNghiep from './DotXetTotNghiep';
import ItemChungChiCDR from './ItemChungChiCDR';
import styles from './styles';
import { ThongTinCDRProps, TienTrinhProps } from './type';

const XetTotNghiep = () => {
  useEffect(() => {
    getInitData();
  }, []);

  const [loading, setloading] = useState(false);

  const [infoTienTrinh, setinfoTienTrinh] = useState<TienTrinhProps>();

  const [index, setIndex] = useState(0);

  const [routes] = useState<{ key: number; title: string }[]>([
    { key: 0, title: translate('slink:Dieu_kien_xet_TN') },
    { key: 1, title: translate('slink:Graduation') },
  ]);

  const renderScene = ({
    route,
  }: {
    route: { key: number; title: string };
  }) => {
    return route.key === 1 ? (
      <DotXetTotNghiep />
    ) : (
      <FlatList
        data={listDieuKienXTN}
        bounces={false}
        contentContainerStyle={styles.content}
        ListFooterComponent={<ViewResult dat={false} />}
        renderItem={({ item }) => (
          <ViewBox title={item?.title}>
            <ViewChildren
              data={item?.data}
              disabled={item?.disabled}
              typeDiem={item?.typeDiem}
            />
          </ViewBox>
        )}
      />
    );
  };

  const onIndexChange = (curindex: number) => {
    setIndex(curindex);
  };

  const getInitData = async () => {
    try {
      setloading(true);
      const responseKhoaNganh = await getKhoaNganh();
      const khoaNganhChinh = responseKhoaNganh?.data?.data?.khoaNganhChinh;
      const response: TienTrinhProps = await getThongTinSinhVien(
        khoaNganhChinh?.ma || '',
      );
      setloading(false);
      setinfoTienTrinh(response);
    } catch (error) {
      setloading(false);
    }
  };

  const listDieuKienXTN: {
    data: ThongTinCDRProps[];
    typeDiem: boolean;
    disabled: boolean;
    title: string;
  }[] = [
    {
      title: 'Điều kiện học tập',
      data: listDKHT(infoTienTrinh),
      typeDiem: true,
      disabled: true,
    },
    {
      title: 'Chứng chỉ chuẩn đầu ra',
      data: infoTienTrinh?.thongTinCdr ?? [],
      typeDiem: false,
      disabled: false,
    },
  ];

  return (
    <View style={styles.container}>
      <HeaderReal title={translate('slink:Graduation')} />
      <TabbarCustome
        renderScene={renderScene}
        onIndexChange={onIndexChange}
        navigationState={{ index, routes }}
        lazy={false}
      />
      <LoadingComponent loading={loading} />
    </View>
  );
};

export default XetTotNghiep;
const ViewResult = ({ dat }: { dat: boolean }) => {
  const color = dat ? '#389500' : '#FFAF0B';

  const icon = dat ? 'Hoàn thành' : 'Chưa đạt';

  const text = dat
    ? ' Bạn đã đủ điều kiện xét tốt nghiệp'
    : ' Bạn chưa đủ điều kiện xét tốt nghiệp';

  const backgroundColor = dat ? '#d8eacd' : '#fff3da';

  return (
    <View style={[styles.containerResult, { backgroundColor }]}>
      <ItemIconSVG width={WIDTH(16)} height={WIDTH(16)} title={icon} />
      <Text style={[styles.textResult, { color }]}>{text}</Text>
    </View>
  );
};

const ViewChildren = ({
  data,
  typeDiem,
  disabled,
}: {
  data: ThongTinCDRProps[];
  typeDiem: boolean;
  disabled: boolean;
}) => {
  return (
    <FlatList
      data={data}
      scrollEnabled={false}
      numColumns={2}
      columnWrapperStyle={styles.wrapper}
      renderItem={({ item, index }) => (
        <ItemChungChiCDR
          disabled={disabled}
          typeDiem={typeDiem}
          item={item}
          index={index}
        />
      )}
    />
  );
};

const ViewBox = (props: { title: string; children: ReactNode }) => {
  const { title, children } = props;

  return (
    <View style={styles.containerBox}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

const listDKHT = (infoTienTrinh: TienTrinhProps | undefined) => [
  {
    chuanDauRa: '4',
    title: 'Trung bình cộng tích luỹ',
    value: `${
      infoTienTrinh?.kqhtHocKy?.trungBinhTichLuyToanKhoaThang4 ?? '--'
    }`,
    hoanThanh:
      infoTienTrinh?.kqhtHocKy?.trungBinhTichLuyToanKhoaThang4 &&
      infoTienTrinh?.diemTichLuyToiThieu
        ? infoTienTrinh?.kqhtHocKy?.trungBinhTichLuyToanKhoaThang4 >
          infoTienTrinh?.diemTichLuyToiThieu
        : false,
  },
  {
    chuanDauRa: `${infoTienTrinh?.ctdtKeHoach?.tongSoTinChi ?? '--'}`,
    title: 'Số tín chỉ tích luỹ',
    value: `${infoTienTrinh?.kqhtHocKy?.tongSoTinChiTichLuyToanKhoa ?? '--'}`,
    hoanThanh:
      infoTienTrinh?.kqhtHocKy?.tongSoTinChiTichLuyToanKhoa &&
      infoTienTrinh?.ctdtKeHoach?.tongSoTinChi
        ? infoTienTrinh?.kqhtHocKy?.tongSoTinChiTichLuyToanKhoa ===
          infoTienTrinh?.ctdtKeHoach?.tongSoTinChi
        : false,
  },
];
