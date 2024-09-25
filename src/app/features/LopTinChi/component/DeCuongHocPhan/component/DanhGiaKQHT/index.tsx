/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import ItemLabel from '@components/Item/ItemLabel';
import { HTDGProps } from '@features/LopTinChi/component/ThongTinChung/type';
import { getDeCuongHocPhan, getHinhThucDanhGia } from '@networking/user';
import { translate } from '@utils/i18n/translate';

import styles from './styles';
import { ScrollView } from 'native-base';
import BoxHSNS from '@components/BoxHSNS';
interface Props {
  infoClass?: any;
  deCuongId: string;
}
const DeCuongDanhGiaKQHT = (props: Props) => {
  const { infoClass, deCuongId } = props;

  const [loading, setloading] = useState(false);

  const [htDanhGia, sethtDanhGia] = useState<any[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setloading(true);

    try {
      const resHTDG = await getHinhThucDanhGia();

      const res = await getDeCuongHocPhan(deCuongId);

      const trongSoDanhGia = resHTDG?.data?.data
        ?.sort((a: HTDGProps, b: HTDGProps) => {
          return a?.field - b?.field;
        })
        ?.map((item: HTDGProps) => {
          return {
            label: item?.ten,
            value:
              infoClass?.stc?.[`trongSo${item?.field}`] ??
              res?.data?.data?.[`trongSo${item?.field}`] ??
              0,
          };
        })
        ?.filter((item: { label: string; value: number }) => item?.value !== 0);
      const tongTrongSo =
        trongSoDanhGia?.reduce(
          (total: any, monHoc: any) => total + (monHoc?.value ?? 0),
          0,
        ) ?? 0;

      const totalListTrongSoHP = [
        ...trongSoDanhGia,
        { label: 'Điểm thi KTHP', value: 100 - tongTrongSo },
      ];

      sethtDanhGia(totalListTrongSoHP);

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
      contentContainerStyle={styles.contentContainer}
      flex={1}>
      <BoxHSNS visibleAdd={false} title={translate('slink:Course_percentage')}>
        <FlatList
          style={styles.contentBox}
          data={htDanhGia}
          scrollEnabled={false}
          extraData={htDanhGia}
          bounces={false}
          nestedScrollEnabled={false}
          renderItem={({ item, index }) => (
            <ItemLabel
              key={index}
              label={item?.label}
              value={`${item?.value}%`}
              isLast={index === htDanhGia?.length - 1}
            />
          )}
        />
      </BoxHSNS>
    </ScrollView>
  );
};

export default DeCuongDanhGiaKQHT;
