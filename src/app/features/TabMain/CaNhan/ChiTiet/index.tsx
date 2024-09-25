import React, { useEffect, useState } from 'react';
import { Platform, RefreshControl } from 'react-native';

import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';

import R from '@assets/R';
import {
  avatarUser,
  dispatch,
  getWidth,
  HEIGHT,
  openGallery,
  showImage,
  showToastError,
  showToastSuccess,
  WIDTH,
} from '@common';
import ItemLabel from '@components/Item/ItemLabel';
import ViewFilterNB from '@components/ViewFilterNB';
import HeaderReal from '@libcomponents/header-real';
import ItemIconSVG from '@libcomponents/icon-svg';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { AccountProps } from '@model/app';
import { getVaiTroByToken } from '@networking/helper';
import { updateInfoSinhVien, uploadDocument } from '@networking/user';
import { getDSDotCapNhatHS } from '@networking/user/DangKyTinChi';
import { selectAppConfig } from '@redux-selector/app';
import { appActions } from '@redux-slice';
import { translate } from '@utils/i18n/translate';
import { KEY_STORAGE, save } from '@utils/storage';
import moment from 'moment';
import { Box, Pressable, ScrollView, useTheme } from 'native-base';

import styles from './styles';
import { DotCapNhatHoSoProps } from './type';

const TrangCaNhan = () => {
  const { account } = useSelector(selectAppConfig);

  const [danhSachDot, setdanhSachDot] = useState<DotCapNhatHoSoProps[]>([]);

  const [dotCurrent, setdotCurrent] = useState<
    DotCapNhatHoSoProps | undefined
  >();

  const [refreshing, setrefreshing] = useState(false);

  const arrTop = [
    { label: translate('slink:Student_code'), value: account?.ma || '--' },
  ];

  const arrMid = [
    {
      label: translate('slink:Fullname'),
      value: account?.data?.fullname || account?.fullname || '--',
    },
  ];

  const arrDiaChi = [
    account?.soNhaTenDuongThuongTru,
    account?.xaPhuongThuongTru,
    account?.quanHuyenThuongTru,
    account?.tinhTpThuongTru,
  ]?.filter(item => !!item);

  const arrBottom = [
    { label: translate('slink:Gender'), value: account?.gioiTinh || '--' },
    {
      label: translate('slink:Phone_number'),
      value: account?.sdtCaNhan || account?.soDienThoai || '--',
    },
    {
      label: translate('slink:Email'),
      value: account?.email || '--',
    },
    {
      label: translate('slink:Citizen_identification_card'),
      value: account?.cccdCMND || account?.cccd || '--',
    },
    {
      label: translate('slink:Date_of_birth'),
      value: account?.ngaySinh
        ? moment(account?.ngaySinh).format('DD/MM/YYYY')
        : '--',
    },
    {
      label: translate('slink:Present_address'),
      multiline: arrDiaChi?.length > 0,
      value: arrDiaChi?.length === 0 ? '--' : arrDiaChi?.join(' - '),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setrefreshing(true);

    try {
      const response = await getDSDotCapNhatHS({
        condition: { kichHoat: true },
      });

      await getVaiTroByToken(account);

      setdanhSachDot(response?.data?.data || []);

      setdotCurrent(response?.data?.data?.[0]);

      setrefreshing(false);
    } catch (error) {
      setrefreshing(false);
    }
  };

  const onChangeValue = (value: string) => {
    const dotValue = danhSachDot?.find(item => item?._id === value);

    setdotCurrent(dotValue);
  };

  const now = moment();

  const isVisibleEdit =
    !!dotCurrent &&
    !(
      now.isBefore(dotCurrent?.thoiGianBatDau) ||
      now.isAfter(dotCurrent?.thoiGianKetThuc)
    );

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Account_information')} />
      <ScrollView
        keyboardShouldPersistTaps="always"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getData} />
        }
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <ViewFilterNB
          loading={refreshing}
          width={WIDTH(343)}
          marginBottom={HEIGHT(16)}
          alignSelf="center"
          data={danhSachDot?.map(item => {
            return { value: item?._id, label: item?.tenDot };
          })}
          onChange={onChangeValue}
        />
        <HeaderTrangCaNhan isVisible={isVisibleEdit} />
        <ViewInfo key={1} arrInfo={arrTop} />
        <ViewInfo key={2} arrInfo={arrMid} />
        <ViewInfo key={3} arrInfo={arrBottom} />
      </ScrollView>
    </Box>
  );
};

export default TrangCaNhan;
const HeaderTrangCaNhan = ({ isVisible }: { isVisible: boolean }) => {
  const { account } = useSelector(selectAppConfig);

  const isVisibleEdit = account?.choPhepSua || isVisible;

  const anhDaiDien = avatarUser(account);

  const [loading, setloading] = useState(false);

  const theme = useTheme();

  const updateAnh = async (value: any) => {
    setloading(true);

    try {
      const body = {
        uri:
          Platform.OS === 'android'
            ? value?.url
            : value?.url?.replace('file://', ''),
        type: value?.mimetype,
        name: value?.filename,
      };

      const avatarUrl = await uploadDocument([body]);

      const newBody: AccountProps | null = account
        ? {
            ...account,
            anhDaiDienUrl: avatarUrl?.[0]?.url || '',
          }
        : null;

      const responseThayAnh = await updateInfoSinhVien(
        account?._id || '',
        newBody,
      );

      setloading(false);

      if (responseThayAnh?.status) {
        showToastSuccess(translate('slink:Doi_anh_thanh_cong'));

        save(KEY_STORAGE.ACCOUNT, newBody);

        dispatch(appActions.setAppAccount(newBody));
      } else {
        showToastError(translate('slink:Doi_anh_that_bai'));
      }
    } catch (error) {
      showToastError(translate('slink:Doi_anh_that_bai'));

      setloading(false);
    }
  };

  return (
    <Box
      width={getWidth()}
      backgroundColor="white"
      paddingTop={HEIGHT(12)}
      paddingBottom={HEIGHT(16)}
      alignItems="center">
      <Box height={WIDTH(100)} width={WIDTH(100)}>
        <Pressable
          _pressed={R.themes.pressed}
          onPress={() => showImage([{ source: anhDaiDien, title: '' }])}
          borderWidth={1}
          borderColor="primary.500"
          borderRadius={WIDTH(50)}
          overflow="hidden">
          <FastImage
            style={styles.ava}
            source={anhDaiDien}
            resizeMode="cover"
          />
          <LoadingComponent loading={loading} />
        </Pressable>
        {isVisibleEdit && (
          <Pressable
            _pressed={R.themes.pressed}
            hitSlop={R.themes.hitSlop}
            onPress={() => openGallery(updateAnh)}
            position="absolute"
            backgroundColor={'primary.500'}
            borderRadius="full"
            shadow={'1'}
            padding={1.5}
            bottom={WIDTH(-3)}
            right={WIDTH(-3)}>
            <ItemIconSVG
              title={translate('slink:Edit')}
              color={theme?.colors?.white}
              width={WIDTH(16)}
              height={WIDTH(16)}
            />
          </Pressable>
        )}
      </Box>
    </Box>
  );
};

const ViewInfo = ({
  arrInfo,
}: {
  arrInfo: { value: string; label: string; multiline?: boolean }[];
}) => {
  return (
    <Box
      width={WIDTH(343)}
      alignSelf="center"
      backgroundColor="white"
      borderRadius={WIDTH(8)}
      paddingX={WIDTH(16)}
      marginTop={HEIGHT(24)}
      style={R.themes.shadowOffset}>
      {arrInfo?.map((item, index) => {
        return (
          <ItemLabel
            key={index}
            multiLine={item?.multiline}
            label={item?.label}
            value={item?.value}
            isLast={index === arrInfo?.length - 1}
          />
        );
      })}
    </Box>
  );
};
