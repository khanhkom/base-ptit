/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

import FastImage from 'react-native-fast-image';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import R from '@assets/R';
import { avatarUser, CONG_VWA, HEIGHT, isIos, showImage, WIDTH } from '@common';
import { TienTrinhProps } from '@features/XetTotNghiep/type';
import ItemIconSVG from '@libcomponents/icon-svg';
import { AccountProps } from '@model/app';
import * as NavigationService from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  getKhoaNganh,
  getNotiByPage,
  getThongTinSinhVien,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { MixPanelEvent, trackEvent } from '@utils/Mixpanel';
import { Box, Pressable, Skeleton, Text } from 'native-base';

import styles from './styles';

const ScoreBoard = () => {
  const [currentGPA, setcurrentGPA] = useState<string | number>('--');

  // const navigateToTrangCaNhan = () => {
  //   const url = 'vwa://app/profile/123';
  //   Linking.openURL(url).catch(err => console.error('An error occurred', err));
  // };
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setloading(true);

    try {
      const responseKhoaNganh = await getKhoaNganh();

      const khoaNganhChinh = responseKhoaNganh?.data?.data?.khoaNganhChinh;

      const response: TienTrinhProps = await getThongTinSinhVien(
        khoaNganhChinh?.ma || '',
      );

      setcurrentGPA(
        response?.kqhtHocKy?.trungBinhTichLuyToanKhoaThang4 ?? '--',
      );

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const navigateResult = () => {
    NavigationService.navigateScreen(APP_SCREEN.KETQUAHOCTAPMAIN);
  };

  return (
    <Skeleton isLoaded={!loading} w={'full'} h={'6'} rounded="full" mt="1">
      <Pressable
        _pressed={R.themes.pressed}
        onPress={navigateResult}
        style={styles.viewScore}>
        <Text style={styles.scoreChinh} numberOfLines={1}>
          {currentGPA}
          <Text style={styles.score}>{'/4'}</Text>
        </Text>
      </Pressable>
    </Skeleton>
  );
};

const HeaderHome = ({
  account,
  loading,
}: {
  account: AccountProps | null;
  loading: boolean;
}) => {
  const [amountUnread, setamountUnread] = useState(0);

  useEffect(() => {
    getAmountUnRead();
  }, []);

  const getAmountUnRead = async () => {
    const body = {
      limit: 1,
      page: 1,
    };

    const response: any = await getNotiByPage(body);

    setamountUnread(response?.data?.data?.unread ?? 0);
  };

  const goToThongBao = () => {
    trackEvent(MixPanelEvent.BUTTON_THONG_BAO);

    NavigationService.navigateScreen(APP_SCREEN.THONGBAO, {
      getAmountUnread: getAmountUnRead,
    });
  };

  const paddingTop = isIos ? HEIGHT(20) - getStatusBarHeight(true) : 0;

  return (
    <Box style={[styles.container, { paddingTop }]}>
      <ViewInfo loading={loading} account={account} />
      <Pressable style={styles.iconBell} onPress={goToThongBao}>
        {amountUnread > 0 ? (
          <Image
            source={R.images.bellAni}
            resizeMode="contain"
            style={styles.img}
          />
        ) : (
          <ItemIconSVG
            title={'bell'}
            color={R.colors.white}
            width={WIDTH(24)}
            height={WIDTH(24)}
          />
        )}
      </Pressable>
    </Box>
  );
};

export default HeaderHome;
interface Props {
  account: AccountProps | null;
  loading: boolean;
}
const ViewInfo = (props: Props) => {
  const { account, loading } = props;

  const anhDaiDien = avatarUser(account);

  let maSV = `ID: ${account?.username || '--'}`;
  if (account?.vai_tro === CONG_VWA.CONG_HOC_VIEN) {
    maSV = `ID: ${account?.username || '--'}`;
  } else {
    let valueChucVu = '';

    valueChucVu = account?.donViViTri?.tenChucVu ?? '';

    if (valueChucVu !== '') {
      maSV = `${translate('slink:Position')}: ${valueChucVu}`;
    }
  }

  return (
    <Box flexDirection="row" alignItems="center" flex={1}>
      <Box style={styles.styleCenter}>
        <Skeleton w="10" h={'10'} rounded="full" isLoaded={!loading}>
          <Pressable
            _pressed={R.themes.pressed}
            onPress={() => showImage([{ source: anhDaiDien, title: '' }])}
            style={styles.viewLogo}>
            <FastImage
              style={styles.imgAVA}
              source={anhDaiDien}
              resizeMode="cover"
            />
          </Pressable>
        </Skeleton>
        {!account?.isGiaoVien && <ScoreBoard />}
      </Box>
      <Box flex={1} justifyContent="center" w={'full'} marginLeft={WIDTH(12)}>
        {loading ? (
          <Skeleton.Text lines={2} w="full" />
        ) : (
          <>
            <Text
              fontFamily={R.fonts.BeVietnamProMedium}
              color="white"
              fontSize="sm">
              {account?.data?.fullname || account?.fullname || '--'}
            </Text>
            <Text
              mt={HEIGHT(2)}
              numberOfLines={3}
              fontFamily={R.fonts.BeVietnamProRegular}
              color="white"
              fontSize="xs">
              {maSV}
            </Text>
          </>
        )}
      </Box>
    </Box>
  );
};
