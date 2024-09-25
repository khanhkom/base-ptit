/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, useWindowDimensions, View } from 'react-native';

import OneSignal from 'react-native-onesignal';
import { TabView } from 'react-native-tab-view';
import { useSelector } from 'react-redux';

import {
  COMON_TOPIC,
  dispatch,
  FuntionAler,
  LIST_LICH_GV,
  LIST_LICH_SV,
  MapColorMauLichDefault,
  TAB_MAIN,
} from '@common';
import { WORD_PRESS_NEWS_URL } from '@env';
import { CongNoProps } from '@features/CongNo/type';
import global from '@features/global';
import { getVaiTroByToken } from '@networking/helper';
import {
  getCommonTopic,
  getListInvoiceV2,
  getTinTucByPage,
  khoiTaoOneSignal,
  listTinTucV2,
} from '@networking/user';
import { getSettingLich } from '@networking/user/SettingLich';
import { selectAppConfig } from '@redux-selector/app';
import { appActions } from '@redux-slice';
import { translate } from '@utils/i18n/translate';
import { MixPanelEvent, trackEvent } from '@utils/Mixpanel';

import CaNhan from './CaNhan';
import CustomTabbar from './component/CustomTabBar';
import GocHocTap from './GocHocTap';
import styles from './styles';
import TabTienIch from './TienIch';
import TrangChu from './TrangChu';

const TabMain = () => {
  const [index, setIndex] = React.useState(0);

  const indexCur = useRef(0);

  const [listInvoice, setListInvoice] = useState<CongNoProps[]>([]);

  const [loading, setloading] = useState(false);

  const { account } = useSelector(selectAppConfig);

  const [dataTinTuc, setdataTinTuc] = useState([]);

  useEffect(() => {
    trackEvent(MixPanelEvent.BUTTON_TRANG_CHU);

    // WORD_PRESS_NEWS_URL ? getData() : getTinTucBase();

    // initConfigColor();

    // updateAccount();
    init();

    global.isOpened = true;

    setTimeout(() => {
      initOneSignal();
    }, 1000);
  }, []);

  const initOneSignal = async () => {
    const data = await OneSignal.getDeviceState();

    const player_id = data?.userId;

    const body = { playerId: player_id };

    await khoiTaoOneSignal(body);
  };

  const updateAccount = async () => {
    setloading(true);

    global.goToFirstTab = goToFirstTab;

    try {
      await getVaiTroByToken(account);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const goToFirstTab = () => {
    indexCur.current === TAB_MAIN.TRANG_CHU
      ? showAlertExitApp()
      : onChangeIndex(TAB_MAIN.TRANG_CHU);
  };

  const showAlertExitApp = () => {
    FuntionAler(
      translate('slink:Notice_t'),
      translate('slink:Exit_app'),
      () => {},
      () => BackHandler.exitApp(),
    );
  };
  const getTinTucBase = async () => {
    try {
      setloading(true);

      //Tin tức base
      const body = {
        condition: { type: COMON_TOPIC.NEWS },
      };

      const resLoaiTinTuc: any = await getCommonTopic(body);

      dispatch(appActions.setLoaiTinTuc(resLoaiTinTuc?.data?.data ?? []));

      const bodyTinTucBase = {
        limit: 10,
        page: 1,
        sort: { ngayDang: -1 },
      };

      const resTinTucBase: any = await getTinTucByPage(bodyTinTucBase);

      setdataTinTuc(resTinTucBase?.data?.data?.result ?? []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const getData = async () => {
    try {
      setloading(true);

      const body = {
        page: 1,
        per_page: 10,
        _embed: 'wp:featuredmedia',
        categories: [2343],
      };

      const res = await listTinTucV2(body);

      setdataTinTuc(res ?? []);
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const initConfigColor = async () => {
    try {
      const responseSettingLich = await getSettingLich();
      const LIST_LICH = account?.isGiaoVien ? LIST_LICH_GV : LIST_LICH_SV;
      const bodyColorDefault = LIST_LICH?.map(item => {
        return { maMau: MapColorMauLichDefault?.[item], loaiLich: item };
      });
      !responseSettingLich?.data?.data?.result?.[0]?._id &&
        dispatch(appActions.setColorCalendar(bodyColorDefault));
    } catch (error) {}
  };

  const [routes] = useState<any>([
    { key: TAB_MAIN.TRANG_CHU, title: translate('slink:Home') },
    {
      key: TAB_MAIN.GOC_HOC_TAP,
      title: account?.isGiaoVien
        ? translate('slink:Job')
        : translate('slink:Study'),
    },
    { key: TAB_MAIN.WALL, title: translate('slink:Calendar_general') },
    { key: TAB_MAIN.TIEN_ICH, title: translate('slink:Utilities') },
    { key: TAB_MAIN.CA_NHAN, title: translate('slink:Personal') },
  ]);

  const getCongNo = async () => {
    try {
      const body = {
        page: 1,
        limit: 10,
        sort: {},
        condition: {},
        filters: [{ field: 'status', operator: 'in', values: ['open'] }],
      };

      const responseListInvoice = await getListInvoiceV2(body);

      setListInvoice(responseListInvoice?.data?.data?.result || []);
    } catch (error) {}
  };
  const init = async () => {
    try {
      setloading(true);
      initConfigColor();
      updateAccount();
      getCongNo();
      WORD_PRESS_NEWS_URL ? getData() : getTinTucBase();
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };
  const layout = useWindowDimensions();

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (Number(route.key)) {
      case TAB_MAIN.TRANG_CHU:
        return (
          <TrangChu
            dataTinTuc={dataTinTuc}
            listInvoice={listInvoice}
            onChangeIndex={onChangeIndex}
            onRefreshCongNo={getCongNo}
            loading={loading}
          />
        );
      case TAB_MAIN.GOC_HOC_TAP:
        return <GocHocTap />;
      case TAB_MAIN.WALL:
        return <View />;
      case TAB_MAIN.TIEN_ICH:
        return <TabTienIch />;
      case TAB_MAIN.CA_NHAN:
        return <CaNhan />;
    }

    return null;
  };

  const onChangeIndex = (currentIndex: number) => {
    setIndex(currentIndex);

    indexCur.current = currentIndex;
  };

  return (
    <View style={[styles.container]}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        tabBarPosition="bottom"
        renderTabBar={() => null}
        lazy
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        swipeEnabled={false}
        animationEnabled
      />
      <CustomTabbar
        onChangeTab={onChangeIndex}
        currentIndex={index}
        menuTabBar={routes}
      />
    </View>
  );
};

export default TabMain;
