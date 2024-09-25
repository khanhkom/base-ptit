/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { useSelector } from 'react-redux';

import R from '@assets/R';
import { getFontSize, HEIGHT } from '@config/function';
import ModalCustome from '@libcomponents/modal/modal-custome';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import { FlatList, Text, VStack } from 'native-base';

import styles from './styles';

import ItemLabel from '../ItemLabel';

const ModalThongTinKeHoachNam = (props: any) => {
  const { data, isVisible, closeButton, idDot } = props;

  const { account } = useSelector(selectAppConfig);

  const maDonVi = account?.maDonViChinh;

  const nguonKinhPhi = data?.nguonKinhPhi
    ?.map(item => {
      return item?.ten;
    })
    ?.join(', ');

  const donViPhoiHop = data?.donViPhoiHop
    ?.map(item => {
      return '- ' + item?.tenDonVi;
    })
    ?.join('\n');

  const danhSachYeuCau = data?.danhSachYeuCau
    ?.map(item => {
      return '- ' + item?.noiDung;
    })
    ?.join('\n');

  const listInfo = [
    {
      label: 'Mã hoạt dộng',
      value: data?.maHoatDong,
    },
    {
      label: 'Tên lĩnh vực chung',
      value: data?.linhVucChung?.ten || translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Tên lĩnh vực chi tiết',
      value: data?.linhVucChiTiet?.ten || translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Tên hoạt động',
      value: data?.noiDung || translate('slink:Chua_cap_nhat'),
    },
    {
      label: translate('slink:time'),
      value: `Tháng ${data?.tuThang} - ${data?.denThang}`,
    },
    {
      label: 'Đơn vị đầu mối',
      value: data?.donViDauMoi?.tenDonVi || translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Đơn vị phối hợp',
      value: donViPhoiHop || translate('slink:Chua_cap_nhat'),
      multiline: true,
    },
    {
      label: 'Nguồn kinh phí',
      value: nguonKinhPhi || translate('slink:Chua_cap_nhat'),
      multiline: true,
    },
    {
      label: 'Yêu cầu chi tiết',
      value: danhSachYeuCau || translate('slink:Chua_cap_nhat'),
      multiline: true,
    },

    data?.danhSachKeHoachHoatDong?.length === 0 ||
    data?.donViDauMoi?.maDonVi !== maDonVi
      ? {
          null: true,
        }
      : {
          label: 'Danh sách kế hoạch hoạt động',
          value: 'Xem chi tiết',
          onPress: () => {
            navigateScreen(APP_SCREEN.DSKEHOACHHOATDONG, {
              id: idDot,
              item: data,
            });
          },
        },
  ];

  return (
    <ModalCustome
      closeButton={closeButton}
      style={styles.modal}
      isVisible={isVisible}>
      <VStack>
        <Text
          textAlign="center"
          fontSize={getFontSize(18)}
          fontFamily={R.fonts.BeVietnamProSemiBold}
          color="primary.500"
          marginBottom="3">
          {'Thông tin kế hoạch'}
        </Text>
        <FlatList
          data={listInfo}
          nestedScrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: HEIGHT(20),
          }}
          renderItem={({ item, index }) => (
            <ItemLabel
              key={index}
              label={item?.label}
              value={item?.value}
              isLast={index === listInfo?.length - 1}
              multiLine={item?.multiline ?? false}
              onPress={item?.onPress}
              nullItem={item?.null}
            />
          )}
        />
      </VStack>
    </ModalCustome>
  );
};

export default ModalThongTinKeHoachNam;
