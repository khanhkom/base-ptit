/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';

import {
  ARRAY_FILTER,
  FuntionAler,
  getFirstDayAndLastDayInWeek,
  NotiTab,
  popupOk,
} from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import * as NavigationService from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  getKhaoSatById,
  getNotiByPage,
  postReadOneNotification,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import moment from 'moment';

// Item
import ItemTab from './Item/ItemTab';
// common
import styles from './styles';
import LoadMore from '@libcomponents/loading/loadmore-component';

interface Props {
  notiType: number;
  filterType: number;
  refresh: boolean;
  getAmountUnread?: () => void;
}

const TabThongBao: FunctionComponent<Props> = (props: Props) => {
  const { notiType, filterType, refresh, getAmountUnread } = props;

  const [refreshing, setRefreshing] = useState(true);

  const [showfooter, setShowfooter] = useState(false);

  const [listThongBao, setListThongBao] = useState<any[]>([]);

  const page = useRef(1);

  const maxdata = useRef(true);

  const getStartTimeAndEndTime = () => {
    let startTime: any = null;
    let endTime: any = null;
    switch (ARRAY_FILTER[filterType]) {
      case ARRAY_FILTER[0]:
        startTime = null;

        endTime = null;

        break;
      case ARRAY_FILTER[1]:
        startTime = new Date(
          `${moment(new Date()).format('YYYY-MM-DD')} 00:00`,
        ).toISOString();

        endTime = new Date(
          `${moment(new Date()).format('YYYY-MM-DD')} 23:59`,
        ).toISOString();

        break;
      case ARRAY_FILTER[2]:
        {
          const { firstDayInWeek } = getFirstDayAndLastDayInWeek();

          const { lastDayInWeek } = getFirstDayAndLastDayInWeek();

          startTime = new Date(
            `${moment(new Date(firstDayInWeek)).format('YYYY-MM-DD')} 00:00`,
          ).toISOString();

          endTime = new Date(
            `${moment(new Date(lastDayInWeek)).format('YYYY-MM-DD')} 23:59`,
          ).toISOString();
        }

        break;
      case ARRAY_FILTER[3]:
        {
          const lastDayInMonth = new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0,
          ).getDate();

          startTime = new Date(
            `${new Date().getFullYear()}-${new Date().getMonth() + 1}-01 00:00`,
          ).toISOString();

          endTime = new Date(
            `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${lastDayInMonth} 23:59`,
          ).toISOString();
        }

        break;

      default:
        startTime = null;

        endTime = null;

        break;
    }

    return {
      startTime,
      endTime,
    };
  };

  useEffect(() => {
    refreshData();
  }, [filterType, refresh]);

  const refreshData = async () => {
    page.current = 1;

    setRefreshing(true);

    const { startTime } = getStartTimeAndEndTime();

    const { endTime } = getStartTimeAndEndTime();

    const filters = [
      {
        values: [startTime, endTime],
        field: 'createdAt',
        operator: 'between',
      },
    ];

    const body = {
      ...(startTime !== null && endTime !== null && { filters }),
      limit: 10,
      page: 1,
      sort: {
        createdAt: -1,
      },
    };

    try {
      const response: any = await getNotiByPage(body);

      setListThongBao(response?.data?.data?.result ?? []);

      maxdata.current = response?.data?.data?.result?.length < 10;

      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
    }
  };

  const loadMoreData = async () => {
    if (!maxdata.current) {
      page.current += 1;

      setShowfooter(true);

      const { startTime } = getStartTimeAndEndTime();

      const { endTime } = getStartTimeAndEndTime();

      const filters = [
        {
          values: [startTime, endTime],
          field: 'createdAt',
          operator: 'between',
        },
      ];

      const body = {
        ...(startTime !== null && endTime !== null && { filters }),
        limit: 10,
        page: page.current,
        sort: {
          createdAt: -1,
        },
      };

      try {
        const response: any = await getNotiByPage(body);

        if (response?.data?.data?.result?.length > 0) {
          setListThongBao([
            ...listThongBao,
            ...(response?.data?.data?.result ?? []),
          ]);

          maxdata.current = false;
        } else {
          maxdata.current = true;
        }

        setShowfooter(false);
      } catch (error) {
        setShowfooter(false);
      }
    }
  };

  const onSeenSurvey = async (item: any) => {
    const _id = item?.thongTinKhac?.idKhaoSat;

    try {
      const resKhaoSat: any = await getKhaoSatById(_id);

      const dataKhaoSat = resKhaoSat?.data?.data;

      if (!dataKhaoSat?.kichHoat) {
        popupOk(
          translate('slink:Notice_t'),
          translate('slink:Survey_not_allowed_to_participate'),
        );
      } else if (_.has(dataKhaoSat, 'daTraLoi') && dataKhaoSat.daTraLoi) {
        FuntionAler(
          translate('slink:Notice_t'),
          translate('slink:You_has_completed_this_survay'),
          () => {},
          () => {},
        );
      } else {
      }
    } catch (error) {}
  };

  const onSeenNotification = async (item: any) => {
    try {
      if (!item?.read) {
        await postReadOneNotification({
          notificationId: item?._id,
        });

        getAmountUnread?.();
      }
    } catch (error) {}

    if (item?.thongTinKhac?.idKhaoSat && notiType === NotiTab.THONG_BAO_CHUNG) {
      onSeenSurvey(item);
    } else if (item?.idTinTuc) {
      NavigationService.navigateScreen(APP_SCREEN.CHITIETTINTUC, {
        isFromNoticeScreen: true,
        idTinTuc: item?.idTinTuc,
        content: {
          funGoBack: () => {
            setTimeout(refreshData, 500);
          },
        },
      });
    } else {
      NavigationService.navigateScreen(APP_SCREEN.CHITIETTHONGBAO, {
        item,
        funGoBack: () => {
          setTimeout(refreshData, 500);
        },
        notiType: notiType,
      });
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={listThongBao}
        extraData={listThongBao}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <ItemTab itemTab={item} onReadNoti={() => onSeenNotification(item)} />
        )}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.01}
        ListFooterComponent={showfooter ? <LoadMore /> : null}
        onRefresh={refreshData}
        ListEmptyComponent={<ItemTrong />}
      />
    </View>
  );
};

export default TabThongBao;
