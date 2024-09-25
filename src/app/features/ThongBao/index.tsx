/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { BackHandler, View } from 'react-native';

// routers
import { FuntionAler, NotiTab, TIME_FILTER } from '@common';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import SettingNotificationModal from '@libcomponents/modal/modal-custome/SettingNotificationModal';
import * as NavigationService from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { postReadAllNotification } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import * as AsyncStorageUtils from '@utils/storage';
import _ from 'lodash';

// apis
import FilterView from './Item/FilterView';
import styles from './styles';
import TabThongBao from './TabThongBao';

interface Props {
  route: {
    params: {
      isFromOutside?: boolean;
      getAmountUnread?: () => void;
    };
  };
}

const ThongBao = (props: Props) => {
  const isFromOutside = props.route.params?.isFromOutside;

  const getAmountUnread = props.route.params?.getAmountUnread;

  const [loading, setLoading] = useState<boolean>(true);

  const [isMute, setIsMute] = useState<boolean>(false);

  const [refresh, setRefresh] = useState<boolean>(false);

  const [isShowNotif, setIsShowNotif] = useState<boolean>(false);

  const [timeFilter, setTimeFilter] = useState<number>(TIME_FILTER.HOM_NAY);

  useEffect(() => {
    getStatusNotificationSetting();

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const handleBackPress = () => {
    if (isFromOutside && !_.isUndefined(isFromOutside)) {
      NavigationService.resetScreen(APP_SCREEN.TABMAIN);
    } else {
      NavigationService.goBack();
    }

    return true;
  };

  const getStatusNotificationSetting = async () => {
    await AsyncStorageUtils.load(AsyncStorageUtils.KEY.MUTE_NOTI).then(
      async (values?: boolean | string) => {
        if (values === null || values === 'null') {
          setIsMute(false);
        } else {
          setIsMute(true);
        }
      },
    );
  };

  const onChangeTimeFilter = (value: number) => {
    setTimeFilter(value);
  };

  const handleReadAllNotif = () => {
    FuntionAler(
      translate('slink:Notice_t'),
      translate('slink:Mark_all_notifications_as_read'),
      () => {},
      onReadAllNotification,
    );
  };

  const onReadAllNotification = async () => {
    await postReadAllNotification();

    setRefresh(!refresh);

    getAmountUnread?.();
  };

  const onChangeMute = (value: boolean) => {
    setIsMute(value);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <HeaderReal
          title={translate('slink:Notice_t')}
          onButton={handleBackPress}
        />
        <LoadingComponent />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <HeaderReal
          title={translate('slink:Notice_t')}
          onButton={handleBackPress}
        />
        <FilterView
          onChangeTimeFilter={onChangeTimeFilter}
          isMute={isMute}
          onReadAllNotif={handleReadAllNotif}
          onShowNotificationModal={() => setIsShowNotif(true)}
        />
        <TabThongBao
          notiType={NotiTab.THONG_BAO_CHUNG}
          filterType={timeFilter}
          refresh={refresh}
          getAmountUnread={getAmountUnread}
        />
        <SettingNotificationModal
          visible={isShowNotif}
          isMute={isMute}
          onChangeStatus={onChangeMute}
          onCloseModal={() => setIsShowNotif(false)}
        />
      </View>
    );
  }
};

export default ThongBao;
