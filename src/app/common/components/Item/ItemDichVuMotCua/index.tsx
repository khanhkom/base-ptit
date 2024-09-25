/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { formatVND } from '@common';
import ItemIconSVG from '@libcomponents/icon-svg';
import { getThanhToanDVMC } from '@networking/user';

import styles from './styles';
import { Props } from './type';

const ItemMotCua = (props: Props) => {
  const { item, handleNavigate, index } = props;

  const [loading, setLoading] = useState(false);

  const [giaTienVND, setgiaTienVND] = useState('');

  const handlePress = () => {
    handleNavigate && handleNavigate();
  };

  useEffect(() => {
    item?.thongTinThuTuc?.yeuCauTraPhi && onGetLePhiDichVu();
  }, []);

  const onGetLePhiDichVu = async () => {
    try {
      setLoading(true);

      const result: any = await getThanhToanDVMC(
        item?.thongTinThuTuc?.idMucThu,
      );

      setgiaTienVND(formatVND(result?.data?.data?.unitAmount ?? 0));

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      testID={`ItemMotCua-${index}`}
      onPress={handlePress}
      style={styles.itemNavStyle}>
      <ViewTitle ten={item?.ten?.trim()} />
      <ViewTime giaTien={giaTienVND} loading={loading} item={item} />
    </TouchableOpacity>
  );
};

export default ItemMotCua;
const ViewTitle = ({ ten }: { ten: string }) => {
  return (
    <View>
      <Text style={styles.title}>{ten ?? ''}</Text>
    </View>
  );
};

const ViewTime = ({
  item,
  giaTien,
  loading,
}: {
  item: any;
  giaTien: string;
  loading: boolean;
}) => {
  return (
    <View style={styles.viewTime}>
      <Text style={styles.textThoiHan}>
        {item?.soNgayHen
          ? `Thời gian xử lý: ${item?.soNgayHen} ngày`
          : 'Chưa có thời gian xử lý'}
      </Text>
      <View>
        {item?.thongTinThuTuc?.yeuCauTraPhi ? (
          <Text style={styles.textAmount}>{giaTien}</Text>
        ) : (
          <ItemIconSVG title="Arrow-Right" />
        )}
      </View>
    </View>
  );
};
