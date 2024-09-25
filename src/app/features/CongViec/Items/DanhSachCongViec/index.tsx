/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';

import { useSelector } from 'react-redux';

import R from '@assets/R';
import { ECongViec, HEIGHT, WIDTH } from '@common';
import FilterLHP from '@components/FilterLHP';
import ItemTrong from '@components/Item/ItemTrong';
import LoadingComponent from '@libcomponents/loading/loading-component';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getDSCongViecCuaToi, getDSDotXayDungKeHoach } from '@networking/user';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Box } from 'native-base';

import styles from './styles';

import ItemCongViec from '../ItemCongViec';

const listTrangThai = [
  {
    label: 'Tất cả',
    value: 'Tất cả',
  },
  {
    label: 'Sắp tới hạn',
    value: 'Sắp tới hạn',
  },
  {
    label: 'Quá hạn',
    value: 'Quá hạn',
  },
];

const DanhSachCongViec = ({ type }: any) => {
  const { account } = useSelector(selectAppConfig);

  const [trangThai, setTrangThai] = useState('');

  const [listCongViec, setlistCongViec] = useState<Array<any>>([]);

  const [loading, setloading] = useState(false);

  const [listDot, setlistDot] = useState([]);

  const [dotCongViec, setDotCongViec] = useState('');

  const [loadMore, setLoadMore] = useState(false);

  const page = useRef(1);

  const maxData = useRef(false);

  const beginScroll = useRef<boolean>(false);

  useEffect(() => {
    getDotKeHoach();
  }, []);

  const getDotKeHoach = async () => {
    try {
      setloading(true);

      const resDot: any = await getDSDotXayDungKeHoach();

      const dot =
        resDot?.map((item: any) => {
          return {
            label: item?.ten,
            value: item?._id,
          };
        }) || [];

      setlistDot(dot);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const getData = async (dot: string, trangThai?: string) => {
    if (dot) {
      try {
        setloading(true);

        const filterLoai =
          type === ECongViec.PHU_TRACH
            ? {
                active: true,
                field: 'caNhanPhuTrach.nhanSuSsoId',
                values: [account?.ssoId],
                operator: 'in',
              }
            : {
                active: true,
                field: 'donViPhoiHop.maDonVi',
                values: [account?.maDonViChinh],
                operator: 'in',
              };

        let filterTrangThai: any = {};

        if (trangThai === 'Sắp tới hạn') {
          filterTrangThai = {
            field: 'thoiGianKetThuc',
            operator: 'between',
            values: [
              moment().toISOString(),
              moment().add(7, 'd').toISOString(),
            ],
            active: true,
          };
        } else if (trangThai === 'Quá hạn') {
          filterTrangThai = {
            field: 'thoiGianKetThuc',
            operator: 'lt',
            values: [moment().toISOString()],
            active: true,
          };
        }

        const body = {
          page: 1,
          limit: 10,
          sort: { thoiGianKetThuc: 1 },
          condition: {},
          filters: [filterLoai, filterTrangThai],
        };

        const res = await getDSCongViecCuaToi(dot, body);

        setlistCongViec(res?.result ?? []);

        page.current = 1;

        setloading(false);
      } catch (error) {
        setloading(false);
      }
    } else {
      setlistCongViec([]);
    }
  };

  const loadMoreData = async () => {
    if (!maxData.current) {
      setLoadMore(true);

      page.current += 1;

      try {
        const filterLoai =
          type === ECongViec.PHU_TRACH
            ? {
                active: true,
                field: 'caNhanPhuTrach.nhanSuSsoId',
                values: [account?.ssoId],
                operator: 'in',
              }
            : {
                active: true,
                field: 'donViPhoiHop.maDonVi',
                values: [account?.maDonViChinh],
                operator: 'in',
              };

        let filterTrangThai: any = {};

        if (trangThai === 'Sắp tới hạn') {
          filterTrangThai = {
            field: 'thoiGianKetThuc',
            operator: 'between',
            values: [
              moment().toISOString(),
              moment().add(7, 'd').toISOString(),
            ],
            active: true,
          };
        } else if (trangThai === 'Quá hạn') {
          filterTrangThai = {
            field: 'thoiGianKetThuc',
            operator: 'lt',
            values: [moment().toISOString()],
            active: true,
          };
        }

        const body = {
          page: page.current,
          limit: 10,
          sort: { thoiGianKetThuc: 1 },
          condition: {},
          filters: [filterLoai, filterTrangThai],
        };

        const res = await getDSCongViecCuaToi(dotCongViec, body);

        setlistCongViec([...listCongViec, ...(res?.result ?? [])]);

        // setlistDS([...listDS, ...(responseDS?.data?.data?.result ?? [])]);

        maxData.current = res?.result?.length < 10;

        setLoadMore(false);
      } catch (error) {
        setLoadMore(false);
      }
    }
  };

  const getMore = () => {
    if (beginScroll.current && !maxData.current) {
      loadMoreData();

      beginScroll.current = false;
    }
  };

  const onChangeDot = (value: string) => {
    setDotCongViec(value);

    if (value) {
      getData(value, trangThai);
    }
  };

  const onChangeTrangThai = (value: string) => {
    setTrangThai(value);

    if (value) {
      getData(dotCongViec, value);
    } else {
      getData(dotCongViec, value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Filter
          dataDot={listDot}
          onChangeDot={onChangeDot}
          onChangeTrangThai={onChangeTrangThai}
        />
        <FlatList
          data={listCongViec}
          extraData={listCongViec}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          ListEmptyComponent={<ItemTrong />}
          bounces={false}
          contentContainerStyle={{
            paddingTop: HEIGHT(24),
            paddingBottom: HEIGHT(30),
          }}
          onRefresh={() => getData(dotCongViec, trangThai)}
          renderItem={({ item }) => (
            <ItemCongViec
              item={item}
              type={type}
              onPress={() =>
                navigateScreen(APP_SCREEN.CHITIETCONGVIEC, {
                  item,
                  onRefresh: () => getData(dotCongViec, trangThai),
                })
              }
            />
          )}
          onEndReached={getMore}
          onEndReachedThreshold={0.01}
          ListFooterComponent={loadMore ? <LoadMore /> : <View />}
          onMomentumScrollBegin={() => {
            beginScroll.current = true;
          }}
        />
        {/* <LoadingComponent loading={loading} /> */}
      </View>
    </View>
  );
};

export default DanhSachCongViec;
const Filter = (props: any) => {
  const { onChangeTrangThai, dataDot, onChangeDot } = props;

  return (
    <Box
      backgroundColor="white"
      width={WIDTH(343)}
      paddingLeft={WIDTH(16)}
      paddingRight={WIDTH(16)}
      borderRadius={WIDTH(8)}
      alignSelf="center"
      style={{ ...R.themes.shadowOffset }}
      overflow="hidden">
      <FilterLHP
        data={dataDot}
        onChange={onChangeDot}
        placeHolder={translate('slink:Choose_period')}
        label={translate('slink:Period')}
      />
      <FilterLHP
        data={listTrangThai}
        onChange={onChangeTrangThai}
        placeHolder={translate('slink:Choose_status')}
        label={translate('slink:Status')}
        isLast={true}
      />
    </Box>
  );
};
