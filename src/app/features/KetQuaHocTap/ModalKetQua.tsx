import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { KetQuaHocTapProp } from '@features/LopTinChi/component/KetQuaHocTap/type';
import { translate } from '@utils/i18n/translate';
import ModalCustome from '@libcomponents/modal/modal-custome';
import { FlatList } from 'native-base';
import ItemLabel from '@components/Item/ItemLabel';
import { getFontSize, HEIGHT } from '@common';
import R from '@assets/R';
interface Props {
  closeButton: () => void;
  isVisible: boolean;
  data: KetQuaHocTapProp;
  hinhThucDG: any;
}

const ModalKetQua = (props: Props) => {
  const { closeButton, isVisible, data, hinhThucDG } = props;

  const diemTheoHTDG =
    hinhThucDG?.map((item: { ten: string; field: number }) => {
      const trongSo = data?.[`trongSo${item?.field}`] || 0;

      return {
        label: `${item?.ten} (${trongSo}%)`,
        trongSo,
        value: data?.[`diemThanhPhan${item?.field}`] ?? '--',
      };
    }) ?? [];

  const diemTheoTrongSo = diemTheoHTDG?.filter(item => item?.trongSo !== 0);

  const listDiem =
    diemTheoTrongSo?.length === 0 ? diemTheoHTDG : diemTheoTrongSo;

  const list = [
    ...(listDiem?.reverse() ?? []),
    ...[
      {
        label: translate('slink:Point_1'),
        value: data?.diemThi1 ?? '--',
      },
      {
        label: translate('slink:Point_2'),
        value: data?.diemThi2 ?? '--',
      },
      {
        label: translate('slink:Score_4'),
        value: data?.diemThang4 ?? '--',
      },
      {
        label: translate('slink:Score_10'),
        value: data?.diemTongKet ?? '--',
      },
      {
        label: translate('slink:Summary'),
        value: data?.diemChu ? data?.diemChu : '--',
      },
    ],
  ];

  return (
    <ModalCustome
      closeButton={closeButton}
      style={styles.modal}
      isVisible={isVisible}>
      <View>
        <Text style={styles.title}>{data?.hocPhan?.ten ?? ''}</Text>
        {!!data?.hocPhan?.soTinChi && (
          <Text style={styles.tinChi}>{`(${data?.hocPhan?.soTinChi} ${translate(
            'slink:Credits',
          )})`}</Text>
        )}
      </View>
      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        bounces={false}
        data={list}
        renderItem={({ item, index }) => (
          <ItemLabel
            label={item?.label}
            value={`${item?.value}`}
            isLast={list?.length - 1 === index}
          />
        )}
      />
    </ModalCustome>
  );
};

export default ModalKetQua;

const styles = StyleSheet.create({
  list: { marginTop: HEIGHT(32) },
  modal: { paddingVertical: HEIGHT(40) },
  title: {
    textAlign: 'center',
    fontSize: getFontSize(18),
    fontFamily: R.fonts.BeVietnamProSemiBold,
    color: R.colors.primaryColor,
  },
  tinChi: {
    textAlign: 'center',
    marginTop: HEIGHT(4),
    fontSize: getFontSize(14),
    fontFamily: R.fonts.BeVietnamProRegular,
    color: R.colors.grayText,
  },
});
