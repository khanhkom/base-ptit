/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/**
 * This component to show details news
 * @huanhtm
 */
// @flow
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  FlatList,
  Linking,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import Hyperlink from 'react-native-hyperlink';
import HTML from 'react-native-render-html';

import R from '@assets/R';
import {
  getLineHeight,
  HEIGHT,
  htmlProps,
  REGEX_FILE_NAME_URL,
  showLink,
  TYPE_NOTIFICATION,
  WIDTH,
} from '@common';
import HeaderDetail from '@components/HeaderDetail';
import { SUB_NAME_UPPERCASE } from '@env';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import * as NavigationService from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getChiTietThongBao } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import moment from 'moment';
import { Link, Text, useTheme, VStack } from 'native-base';

const DEFAULT_PROPS = {
  onLinkPress: (evt: any, href: any) => {
    Linking.openURL(href);
  },
};

const TepDinhKem = ({ urlFile }: { urlFile: string[] }) => {
  if (urlFile?.length > 0) {
    return (
      <VStack mt="4" mb="1">
        <Text
          fontFamily={R.fonts.BeVietnamProRegular}
          fontSize="xs"
          color={'gray.400'}>
          {`${translate('slink:Attachments')}:`}
        </Text>
        <FlatList
          data={urlFile}
          extraData={urlFile}
          showsVerticalScrollIndicator={false}
          bounces={false}
          renderItem={({ item, index }) => (
            <Link
              key={index}
              _text={{
                mt: '1',
                fontSize: 'xs',
                fontFamily: R.fonts.BeVietnamProMedium,
                color: 'blue.400',
              }}
              isUnderlined
              onPress={() => showLink(item)}>
              {item?.replace(REGEX_FILE_NAME_URL, '')}
            </Link>
          )}
        />
      </VStack>
    );
  }

  return null;
};

interface Props {
  route: {
    params: {
      idNoti?: string;
      notiType?: number;
      hideDetailBtn?: boolean;
      funGoBack?: () => void;
      item?: any;
    };
  };
}

const ChiTietThongBao = (props: Props) => {
  const idNoti = props.route.params?.idNoti;

  const theme = useTheme();

  const hideDetailBtn = props.route.params?.hideDetailBtn;

  const funGoBack = props.route.params?.funGoBack;

  const [item, setItem] = useState<any>(props.route.params?.item ?? undefined);

  const [loading, setLoading] = useState<boolean>(false);

  const pressBack = () => {
    if (idNoti) {
      NavigationService.resetScreen(APP_SCREEN.TABMAIN);
    } else {
      NavigationService.goBack();
    }
  };

  useEffect(() => {
    if (idNoti) {
      getDataNoti();
    }

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      funGoBack?.();

      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const getDataNoti = async () => {
    setLoading(true);

    try {
      const result: any = await getChiTietThongBao(idNoti ?? '');

      setItem(result?.data?.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleBackPress = () => {
    pressBack();

    return true;
  };

  const goToDetail = () => {
    const type = item?.oneSignalData?.notifType;

    switch (type) {
      case TYPE_NOTIFICATION.DICH_VU_MOT_CUA:
        NavigationService.navigateScreen(APP_SCREEN.CHITIETDONDV1C, {
          idDon: item?.oneSignalData?.id ?? '',
          funGoBack,
        });

        break;
      case TYPE_NOTIFICATION.DIEM_DANH:
        NavigationService.navigateScreen(APP_SCREEN.CHITIETLOPTINCHI, {
          idLopTinChi: item?.oneSignalData?.idLopTinChi ?? 0,
          funGoBack,
          isNotiDiemDanh: true,
        });

        break;
      case TYPE_NOTIFICATION.LOP_TIN_CHI:
        NavigationService.navigateScreen(APP_SCREEN.CHITIETLOPTINCHI, {
          idLopTinChi: item?.oneSignalData?.idLopTinChi ?? 0,
          funGoBack,
        });

        break;
      case TYPE_NOTIFICATION.LICH_TUAN:
        NavigationService.navigateScreen(APP_SCREEN.LICHTUANHOCVIEN);

        break;
      case TYPE_NOTIFICATION.DAILY_NOTIF_ALL:
        if (item?.oneSignalData?.idLopTinChi) {
          NavigationService.navigateScreen(APP_SCREEN.CHITIETLOPTINCHI, {
            idLopTinChi: item?.oneSignalData?.idLopTinChi ?? '',
            funGoBack,
          });
        }

        break;

      default:
        break;
    }
  };

  const type = item?.oneSignalData?.notifType;

  const nguoiGui = `${translate('slink:Noti_from')}: ${
    item?.senderName ? item?.senderName : SUB_NAME_UPPERCASE
  }`;

  if (loading) {
    return (
      <View style={styles.container}>
        <HeaderReal onButton={pressBack} title={translate('slink:Detail_t')} />
        <LoadingComponent loading={loading} />
      </View>
    );
  }

  const time = item?.createdAt;

  return (
    <View style={styles.container}>
      <HeaderReal onButton={pressBack} title={translate('slink:Detail_t')} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <HeaderDetail
          subTitle={
            time
              ? moment(time).format('HH:mm DD/MM/YYYY')
              : translate('slink:Chua_cap_nhat')
          }
          title={item?.title ?? translate('slink:Null_t')}
        />
        <View style={styles.cntHTML}>
          {_.has(item, 'content') ? (
            <HTML
              {...htmlProps}
              {...DEFAULT_PROPS}
              contentWidth={WIDTH(343)}
              source={{ html: item?.content ?? translate('slink:Null_t') }}
              baseStyle={{
                fontSize: theme.fontSizes.sm,
                fontWeight: '500',
                lineHeight: getLineHeight(24),
              }}
            />
          ) : (
            <Hyperlink linkStyle={{ color: R.colors.bgBlue }} linkDefault>
              <Text selectable>
                {item?.content ?? translate('slink:Null_t')}
              </Text>
            </Hyperlink>
          )}
        </View>
        <VStack px="4">
          <TepDinhKem urlFile={item?.taiLieuDinhKem} />
          {item?.thoiGianHieuLuc && (
            <Text
              fontFamily={R.fonts.BeVietnamProRegular}
              fontSize="xs"
              color={'gray.400'}>
              {translate('slink:Hieu_luc_thong_bao')}:{' '}
              <Text color="red.600">
                {moment(item?.thoiGianHieuLuc).format('DD/MM/YYYY')}
              </Text>
            </Text>
          )}
          {Object.values(TYPE_NOTIFICATION).includes(type) &&
            !hideDetailBtn && (
              <Link
                mt="1"
                justifyContent="flex-end"
                _text={{
                  fontSize: 'xs',
                  fontFamily: R.fonts.BeVietnamProRegular,
                  color: 'blue.400',
                }}
                isUnderlined
                onPress={goToDetail}>
                {translate('slink:See_details')}
              </Link>
            )}
          {nguoiGui && (
            <Text
              mt="1"
              color={'blue.400'}
              fontSize="xs"
              fontFamily={R.fonts.BeVietnamProThinItalic}
              textAlign="right"
              fontStyle={'italic'}>{`${nguoiGui}`}</Text>
          )}
        </VStack>
      </ScrollView>
    </View>
  );
};

export default ChiTietThongBao;

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: HEIGHT(30),
  },
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  cntHTML: {
    flex: 1,
    paddingHorizontal: WIDTH(16),
    paddingTop: HEIGHT(24),
  },
});
