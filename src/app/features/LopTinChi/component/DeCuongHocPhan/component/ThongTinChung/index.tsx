/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, ScrollView } from 'react-native';

import BoxHSNS from '@components/BoxHSNS';
import ItemChucNangExpand from '@components/Item/ItemChucNangExpand';
import ItemLabel from '@components/Item/ItemLabel';
import { InfoClassProps } from '@features/LopTinChi/ChiTietLopTinChi/type';
import { getDeCuongHocPhan } from '@networking/user';
import { translate } from '@utils/i18n/translate';

import styles from './styles';
import { ThongTinDeCuongProps } from './type';
interface Props {
  infoClass: InfoClassProps;
  deCuongId: string;
}
const DeCuongThongTinChung = (props: Props) => {
  const { infoClass, deCuongId } = props;

  const [loading, setloading] = useState(false);

  const [ttDeCuong, setttDeCuong] = useState<ThongTinDeCuongProps>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setloading(true);

    try {
      const res = await getDeCuongHocPhan(deCuongId);

      setttDeCuong(res?.data?.data);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getData} />
      }
      contentContainerStyle={styles.contentContainer}>
      <ThongTinHocPhan infoClass={infoClass} />
      <ThongTinDeCuong ttDeCuong={ttDeCuong} />
      <MucTieu ttDeCuong={ttDeCuong} />
    </ScrollView>
  );
};

export default DeCuongThongTinChung;
const ThongTinHocPhan = ({ infoClass }: { infoClass: InfoClassProps }) => {
  const listData = [
    {
      label: translate('slink:Course_name'),
      multiLine: true,
      value: infoClass?.hocPhan?.ten ?? translate('slink:Chua_cap_nhat'),
    },
    {
      label: translate('slink:Course_name_en'),
      multiLine: true,
      value:
        infoClass?.hocPhan?.tenTiengAnh ?? translate('slink:Chua_cap_nhat'),
    },
    {
      label: translate('slink:Course_id'),
      value: infoClass?.hocPhan?.ma ?? translate('slink:Chua_cap_nhat'),
    },
    {
      label: translate('slink:Number_of_credits'),
      value: infoClass?.hocPhan?.soTinChi
        ? `${infoClass?.hocPhan?.soTinChi} ${translate(
            'slink:Credits',
          )?.toLowerCase()}`
        : translate('slink:Chua_cap_nhat'),
    },
  ];

  return (
    <BoxHSNS visibleAdd={false} title={translate('slink:Course_information')}>
      <FlatList
        style={styles.contentBox}
        data={listData}
        bounces={false}
        nestedScrollEnabled={false}
        renderItem={({ item, index }) => (
          <ItemLabel
            label={item?.label}
            value={item?.value}
            multiLine={item?.multiLine}
            isLast={index === listData?.length - 1}
          />
        )}
      />
    </BoxHSNS>
  );
};

const ThongTinDeCuong = ({
  ttDeCuong,
}: {
  ttDeCuong: ThongTinDeCuongProps | undefined;
}) => {
  const listData = [
    {
      label: translate('slink:Thoi_diem_ban_hanh'),
      value: ttDeCuong?.thoiDiemApDung ?? translate('slink:Chua_cap_nhat'),
    },
    {
      label: translate('slink:QD_ban_hanh_de_cuong'),
      value: ttDeCuong?.canCu?.ten ?? translate('slink:Chua_cap_nhat'),
      multiline: !!ttDeCuong?.canCu?.ten,
      link: ttDeCuong?.canCu?.url || '',
    },
    {
      label: translate('slink:De_cuong_chi_tiet_dinh_kem'),
      value: ttDeCuong?.url
        ? translate('slink:See_details')
        : translate('slink:Chua_cap_nhat'),
      link: ttDeCuong?.url || '',
    },
  ];

  return (
    <BoxHSNS visibleAdd={false} title={translate('slink:Outline_information')}>
      <FlatList
        style={styles.contentBox}
        data={listData}
        bounces={false}
        nestedScrollEnabled={false}
        renderItem={({ item, index }) => (
          <ItemLabel
            label={item?.label}
            value={item?.value}
            multiLine={item?.multiline}
            link={item?.link}
            isLast={index === listData?.length - 1}
          />
        )}
      />
    </BoxHSNS>
  );
};

const MucTieu = ({
  ttDeCuong,
}: {
  ttDeCuong: ThongTinDeCuongProps | undefined;
}) => {
  const listData = [
    {
      label: translate('slink:Target_subject'),
      value: ttDeCuong?.mucTieuHocPhan ?? '--',
    },
    {
      label: translate('slink:Chuan_dau_ra'),
      value: ttDeCuong?.chuanDauRa ?? '--',
    },
  ];

  return (
    <FlatList
      data={listData}
      bounces={false}
      nestedScrollEnabled={false}
      renderItem={({ item }) => (
        <ItemChucNangExpand content={item?.label} value={item?.value} />
      )}
    />
  );
};
