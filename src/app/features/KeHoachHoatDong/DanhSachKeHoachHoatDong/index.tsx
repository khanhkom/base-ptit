/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import ItemKeHoachHoatDong from '@components/Item/ItemKeHoachHoatDong';
import ItemKeHoachNam from '@components/Item/ItemKeHoachNam';
import ItemTrong from '@components/Item/ItemTrong';
import ModalThongTinKeHoachNam from '@components/Item/ModalThongTinKeHoachNam';
import SingleSelect from '@components/QuyTrinhDong/component/SingleSelect';
import HeaderReal from '@libcomponents/header-real';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getDSDotXayDungKeHoach, getDSKeHoachHoatDong } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import { Box, FlatList, View } from 'native-base';

import { KeHoachNamProps } from '../KeHoachNam/type';

const DanhSachKeHoachHoatDong = props => {
  const idDot = props?.route?.params?.id;

  const keHoachNam = props?.route?.params?.item;

  const [loading, setloading] = useState(false);

  const [listKeHoach, setlistKeHoach] = useState<KeHoachNamProps[]>([]);

  const [loadMore, setLoadMore] = useState(false);

  const [filter, setFilter] = useState<any[]>([]);

  const [pickVal, setPickVal] = useState(idDot ?? '');

  const page = useRef(1);

  const maxData = useRef(false);

  const beginScroll = useRef<boolean>(false);

  useEffect(() => {
    if (idDot) {
    } else {
      getDataFilter();
    }
  }, []);

  useEffect(() => {
    getData(pickVal);
  }, []);

  const getDataFilter = async () => {
    setloading(true);

    const res: any = await getDSDotXayDungKeHoach();

    const listDot =
      _.map(res, (value, key) => ({
        label: value?.ten,
        value: value?._id,
      })) ?? [];

    setFilter(listDot ?? []);

    setPickVal(listDot[0]?.value);

    await getData(listDot[0]?.value);
  };

  const getData = async (dataID: string) => {
    try {
      setloading(true);

      page.current = 1;

      const body = {
        page: 1,
        limit: 10,
        condition: {},
      };

      const bodyKHN = {
        page: page.current,
        limit: 10,
        condition: { keHoachNamId: keHoachNam?._id },
      };

      const res: any = await getDSKeHoachHoatDong(
        idDot ?? dataID,
        keHoachNam ? bodyKHN : body,
      );

      setlistKeHoach(res?.result ?? []);

      maxData.current = res?.result?.length < 10;

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const loadMoreData = async () => {
    if (!maxData.current && listKeHoach.length !== 0) {
      setLoadMore(true);

      page.current += 1;

      try {
        const body = {
          page: page.current,
          limit: 10,
          condition: {},
        };

        const bodyKHN = {
          page: page.current,
          limit: 10,
          condition: { keHoachNamId: keHoachNam?._id },
        };

        const res: any = await getDSKeHoachHoatDong(
          idDot ?? pickVal,
          keHoachNam ? bodyKHN : body,
        );

        maxData.current = res?.result?.length < 10;

        setlistKeHoach([...listKeHoach, ...(res?.result ?? [])]);

        setLoadMore(false);
      } catch (error) {
        setLoadMore(false);
      }
    }
  };

  const goTo = (item: any) => {
    navigateScreen(APP_SCREEN.CHITIETKEHOACHHOATDONG, {
      item,
      listDot: filter,
    });
  };

  const onChangeValue = (value: string) => {
    getData(value);

    setPickVal(value);
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Activity_plan_list')} />
      <Box flex={1} paddingTop={'4'}>
        {idDot ? (
          <></>
        ) : (
          <SingleSelect
            width={WIDTH(343)}
            alignSelf="center"
            placeholder={translate('slink:Select_month')}
            onChangeValue={onChangeValue}
            defaultValue={filter[0]?.value ?? ''}
            data={filter}
          />
        )}

        <Box flex={1} mt={'4'}>
          <FlatList
            data={listKeHoach}
            extraData={listKeHoach}
            onEndReached={loadMoreData}
            contentContainerStyle={{ paddingBottom: HEIGHT(30) }}
            ListFooterComponent={loadMore ? <LoadMore /> : <View />}
            onEndReachedThreshold={0.01}
            onRefresh={() => getData(pickVal)}
            onMomentumScrollBegin={() => {
              beginScroll.current = true;
            }}
            refreshing={loading}
            renderItem={({ item, index }: any) => (
              <ItemKeHoachHoatDong
                showDetail={goTo}
                itemKeys={item}
                key={index}
              />
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<ItemTrong />}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DanhSachKeHoachHoatDong;
