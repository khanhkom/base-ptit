/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';

import { useSelector } from 'react-redux';

import {
  avatarUser,
  mapChucVuCanBo,
  ROLE_ACCOUNT_TU_XA,
  ROLE_ACCOUNT_VALUE,
} from '@common';
import { getCoCauToChuc } from '@networking/user';
import { selectAppConfig } from '@redux-selector/app';
import { useTheme } from '@theme';
import { translate } from '@utils/i18n/translate';

import styles from './styles';

const ViewContainer = Animated.createAnimatedComponent(TouchableOpacity);

const MaSV = ({ maSV, color }: any) => {
  if (maSV !== '') {
    return <Text style={[styles.maSv, { color }]}>{maSV}</Text>;
  }

  return null;
};

const DonVi = ({ visible, maSV }: any) => {
  if (visible) {
    return <MaSV maSV={maSV} />;
  }

  return null;
};

const StudentInfor = ({ account, danhSachDonVi }: any) => {
  const name = account?.hoTen ?? translate('slink:Chua_cap_nhat');

  const themeApp = useTheme();

  let maSV = '';
  if (account?.vai_tro === ROLE_ACCOUNT_TU_XA.SINH_VIEN) {
    maSV = `${translate('slink:Student_code')}: ${
      account?.ma_sv ||
      account?.ma_dinh_danh ||
      translate('slink:Chua_cap_nhat')
    }`;
  } else {
    const chucVu = account?.danhSachChucVuDonVi ?? [];

    let valueChucVu = '';
    if (chucVu?.length > 0) {
      valueChucVu =
        mapChucVuCanBo?.[`${account?.khoa?.capDonVi}|${chucVu[0]?.chucVu}`] ??
        '';

      if (valueChucVu !== '') {
        maSV = `${translate('slink:Position')}: ${valueChucVu}`;
      }
    } else {
      valueChucVu = account?.isGiaoVien
        ? ROLE_ACCOUNT_VALUE.GIANG_VIEN
        : account?.isCanBo
        ? ROLE_ACCOUNT_VALUE.CAN_BO
        : ROLE_ACCOUNT_VALUE.NHAN_VIEN;

      if (valueChucVu !== '') {
        maSV = `${translate('slink:Position')}: ${valueChucVu}`;
      }
    }
  }

  const donVi = danhSachDonVi?.find(
    (item: { ma_don_vi: string }) => item?.ma_don_vi === account?.don_vi_id,
  );

  const tenDonVi = `"Đơn vị": ${
    donVi?.ten_don_vi ?? translate('slink:Chua_cap_nhat')
  }`;

  return (
    <View style={styles.viewInfor}>
      <Text style={[styles.name]}>{name}</Text>
      <MaSV maSV={maSV} color={themeApp.colors.text} />
      <DonVi
        visible={
          donVi?.ten_don_vi && account?.vai_tro === ROLE_ACCOUNT_TU_XA.NHAN_VIEN
        }
        maSV={tenDonVi}
      />
    </View>
  );
};

const InfoLabel = (props: any) => {
  const { width, borderRadius, paddingTop, onPress } = props;

  const { account } = useSelector(selectAppConfig);

  const [danhSachDonVi, setDanhSachDonVi] = useState([]);

  const getDSDonVi = async () => {
    try {
      const listDonVi: any = await getCoCauToChuc();

      setDanhSachDonVi(listDonVi?.data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (account?.vai_tro === ROLE_ACCOUNT_TU_XA.NHAN_VIEN) {
      getDSDonVi();
    }
  }, [account]);

  const anhDaiDien = avatarUser(account);

  return (
    <ViewContainer
      style={[
        styles.container,
        {
          width,
          borderRadius,
          paddingTop,
        },
      ]}
      onPress={() => onPress && onPress()}
      activeOpacity={1}>
      <View style={styles.viewLeft}>
        <View style={styles.viewAva}>
          <Image
            style={styles.avatar}
            source={anhDaiDien}
            resizeMode="contain"
          />
        </View>
        <StudentInfor account={account} danhSachDonVi={danhSachDonVi} />
      </View>
    </ViewContainer>
  );
};

export default InfoLabel;
