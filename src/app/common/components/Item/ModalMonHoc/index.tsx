/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import BaseButton from '@components/Popup/BaseButton';
import ModalCustome from '@libcomponents/modal/modal-custome';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getDeCuongHocPhan } from '@networking/user';
import { translate } from '@utils/i18n/translate';

import styles from './styles';
import { ModalProps } from './type';
import ItemLabel from '../ItemLabel';

const ModalMonHoc = (props: ModalProps) => {
  const { itemData, isVisible, chuyenNganh, closeButton, hinhThucDanhGia } =
    props;

  const deCuongId = itemData?.lopHocPhan?.deCuong?.deCuongId;

  const [itemMon, setItemMon] = useState(
    itemData?.lichSuDiem?.[0] || itemData?.diemHpSvHk,
  );

  const getData = async () => {
    try {
      const response = await getDeCuongHocPhan(deCuongId);

      setItemMon(
        response?.data?.data ??
          (itemData?.lichSuDiem?.[0] || itemData?.diemHpSvHk),
      );
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const listMauDiem = hinhThucDanhGia?.filter(
    item => itemMon?.[`trongSo${item?.field}`],
  );

  const truongDiem = listMauDiem?.length === 0 ? hinhThucDanhGia : listMauDiem;

  const diemTheoHTDG =
    truongDiem?.map((item: { ten: string; field: number }) => {
      return {
        label: `${item?.ten} (${itemMon?.[`trongSo${item?.field}`] ?? '--'}%)`,
        value:
          (itemData?.lichSuDiem?.[0] || itemData?.diemHpSvHk)?.[
            `diemThanhPhan${item?.field}`
          ] || '--',
      };
    }) || [];
  const chiTietDiem = [
    ...(diemTheoHTDG?.reverse() || []),
    ...[
      {
        label: translate('slink:Point_1'),
        value:
          (itemData?.lichSuDiem?.[0] || itemData?.diemHpSvHk)?.diemThi1 || '--',
      },
      {
        label: translate('slink:Point_2'),
        value:
          (itemData?.lichSuDiem?.[0] || itemData?.diemHpSvHk)?.diemThi2 || '--',
      },
      {
        label: translate('slink:Score_10'),
        value:
          (itemData?.lichSuDiem?.[0] || itemData?.diemHpSvHk)?.diemThang4 ||
          '--',
      },
      {
        label: translate('slink:Score_4'),
        value:
          (itemData?.lichSuDiem?.[0] || itemData?.diemHpSvHk)?.diemTongKet ||
          '--',
      },
      {
        label: translate('slink:Summary'),
        value:
          (itemData?.lichSuDiem?.[0] || itemData?.diemHpSvHk)?.diemChu || '--',
      },
    ],
  ];

  const goToChiTiet = () => {
    closeButton();

    setTimeout(() => {
      navigateScreen(APP_SCREEN.DECUONGHOCPHAN, { dataTienTrinh: itemData });
    }, 500);
  };

  return (
    <ModalCustome
      closeButton={closeButton}
      style={styles.modal}
      isVisible={isVisible}>
      <View>
        <Text style={styles.title}>{itemData?.hocPhan?.ten}</Text>
        {!!itemData?.soTinChi && (
          <Text style={styles.tinChi}>{`(${itemData?.soTinChi} ${translate(
            'slink:Credits',
          )?.toLowerCase()})`}</Text>
        )}
        {chuyenNganh && (
          <Text style={styles.tenChuyenNganh}>
            {translate('slink:Chuyen_nganh', { ten: chuyenNganh })}
          </Text>
        )}
      </View>
      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        bounces={false}
        data={chiTietDiem}
        extraData={chiTietDiem}
        renderItem={({ item, index }) => (
          <ItemLabel
            value={`${item?.value}`}
            label={item?.label}
            isLast={index === chiTietDiem?.length - 1}
          />
        )}
      />
      <BaseButton
        onPress={goToChiTiet}
        style={styles.button}
        text={styles.textButton}
        title={translate('slink:De_cuong_chi_tiet')}
      />
    </ModalCustome>
  );
};

export default ModalMonHoc;
