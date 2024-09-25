import React from 'react';
import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import BoxHSNS from '@components/BoxHSNS';
import ItemLabel from '@components/Item/ItemLabel';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { FlatList, ScrollView } from 'native-base';

const ThongTinDangDoan = ({ infoUser }: any) => {
  const listData = [
    {
      label: translate('hoSoNhanSu:dang'),
      data: [
        {
          label: translate('hoSoNhanSu:soTheDang'),
          value: infoUser?.soTheDang || '--',
        },
        {
          label: translate('hoSoNhanSu:noiVaoDang'),
          value: infoUser?.noiVaoDang || '--',
        },
        {
          label: translate('hoSoNhanSu:ngayVaoDangDuBi'),
          value: infoUser?.ngayVaoDangDuBi
            ? moment(infoUser?.ngayVaoDangDuBi).format('DD-MM-YYYY')
            : '--',
        },
        {
          label: translate('hoSoNhanSu:ngayChinhThuc'),
          value: infoUser?.ngayChinhThuc
            ? moment(infoUser?.ngayChinhThuc).format('DD-MM-YYYY')
            : '--',
        },
      ],
    },
    {
      label: translate('hoSoNhanSu:doan'),
      data: [
        {
          label: translate('hoSoNhanSu:noiVaoDoan'),
          value: infoUser?.noiVaoDoan || '--',
        },
        {
          label: translate('hoSoNhanSu:ngayVaoDoan'),
          value: infoUser?.ngayVaoDoan
            ? moment(infoUser?.ngayVaoDoan).format('DD-MM-YYYY')
            : '--',
        },
      ],
    },
    {
      label: translate('hoSoNhanSu:quanDoi'),
      data: [
        {
          label: translate('hoSoNhanSu:ngayNhapNgu'),
          value: infoUser?.ngayNhapNgu
            ? moment(infoUser?.ngayNhapNgu).format('DD-MM-YYYY')
            : '--',
        },
        {
          label: translate('hoSoNhanSu:ngayXuatNgu'),
          value: infoUser?.ngayXuatNgu
            ? moment(infoUser?.ngayXuatNgu).format('DD-MM-YYYY')
            : '--',
        },
        {
          label: translate('hoSoNhanSu:donViQuanDoi'),
          // multiLine: true,
          value: infoUser?.donViQuanDoi || '--',
        },
        {
          label: translate('hoSoNhanSu:chucVuQuanDoi'),
          // multiLine: true,
          value: infoUser?.chucVuQuanDoi || '--',
        },
      ],
    },
    {
      label: translate('hoSoNhanSu:nghiaVu'),
      data: [
        {
          label: translate('hoSoNhanSu:ngayKetNapDanQuanTuVe'),
          value: infoUser?.ngayKetNapDanQuanTuVe
            ? moment(infoUser?.ngayKetNapDanQuanTuVe).format('DD-MM-YYYY')
            : '--',
        },
        {
          label: translate('hoSoNhanSu:ngayHoanThanhNghiaVu'),
          value: infoUser?.ngayHoanThanhNghiaVu
            ? moment(infoUser?.ngayHoanThanhNghiaVu).format('DD-MM-YYYY')
            : '--',
        },
        {
          label: translate('hoSoNhanSu:chucDanhDanQuanTuVe'),
          value: infoUser?.chucDanhDanQuanTuVe || '--',
        },
        {
          label: translate('hoSoNhanSu:soQuyetDinhHoanThanh'),
          value: infoUser?.soQuyetDinhHoanThanh || '--',
        },
        {
          label: translate('hoSoNhanSu:nguoiKyQuyetDinh'),
          value: infoUser?.nguoiKyQuyetDinh || '--',
        },
      ],
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.contentBox}>
      {listData?.map((e: { label: string; data: any[] }) => {
        return (
          <BoxHSNS title={e?.label} visibleAdd={false}>
            <FlatList
              scrollEnabled={false}
              style={styles.contentBox2}
              data={e?.data}
              bounces={false}
              nestedScrollEnabled={false}
              renderItem={({ item, index }) => (
                <ItemLabel
                  label={item?.label}
                  value={item?.value}
                  multiLine={item?.multiLine}
                  isLast={index === e?.data?.length - 1}
                />
              )}
            />
          </BoxHSNS>
        );
      })}
    </ScrollView>
  );
};

export default ThongTinDangDoan;

const styles = StyleSheet.create({
  contentBox2: {
    paddingHorizontal: WIDTH(16),
    width: WIDTH(343),
    backgroundColor: R.colors.white,
    alignSelf: 'center',
  },
  contentBox: { paddingBottom: HEIGHT(30) },
});
