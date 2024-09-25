/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

import R from '@assets/R';
import { HEIGHT, popupOk, WIDTH } from '@common';
import FilterLHP from '@components/FilterLHP';
import ItemTrong from '@components/Item/ItemTrong';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  getDanhSachDotChamDiem,
  getDanhSachLichSuKhaiBao,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Box, FlatList, Pressable, Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ItemDonMinhChung from './Items/ItemDonMinhChung';
import styles from './styles';

const DanhSachMinhChung = props => {
  const itemDon = props?.route?.params?.item;

  const [listDot, setListDot] = useState<any>([]);

  const [dot, setDot] = useState('');

  const [listDon, setListDon] = useState([]);

  const [loading, setloading] = useState(false);

  const [loadMore, setLoadMore] = useState(false);

  const page = useRef(1);

  const maxData = useRef(false);

  const beginScroll = useRef<boolean>(false);

  const initDot = async () => {
    try {
      setloading(true);

      const res = await getDanhSachDotChamDiem();

      const dotCham =
        res?.data?.map((item: any) => {
          return {
            label:
              item?.tenDot +
              ` (Học kỳ ${item?.kyHoc?.substring(
                4,
              )} Năm ${item?.kyHoc?.substring(0, 4)})`,
            value: item?._id,
            infoDot: item,
          };
        }) || [];

      getLichSuDon(dotCham?.[0]?.value ?? '');

      setListDot(dotCham ?? []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  useEffect(() => {
    initDot();
  }, []);

  const getLichSuDon = async maDot => {
    try {
      setloading(true);

      setDot(maDot);

      const body = {
        page: 1,
        limit: 10,
        condition: {
          cauHinhMinhChungId: itemDon?._id,
          dotChamDiemId: maDot,
        },
      };

      const res = await getDanhSachLichSuKhaiBao(body);

      setListDon(res?.data?.result ?? []);

      maxData.current = res?.length < 10;

      page.current = 1;

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const loadMoreData = async () => {
    if (!maxData.current) {
      setLoadMore(true);

      page.current += 1;

      try {
        const body = {
          page: page.current,
          limit: 10,
          condition: {
            cauHinhMinhChungId: itemDon?._id,
            dotChamDiemId: dot,
          },
        };

        const res = await getDanhSachLichSuKhaiBao(body);

        setListDon(res?.data?.result ?? []);

        maxData.current = res?.length < 10;

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

  const curDot = listDot?.find(item => item?.value === dot);

  const onNavigate = () => {
    const now = moment();

    if (dot === '') {
      popupOk(translate('slink:Notice_t'), 'Vui lòng chọn đợt khai báo');
    } else if (
      now.isBefore(
        curDot?.infoDot?.thoiGianTiepNhanMinhChung?.thoiGianBatDau,
      ) ||
      now.isAfter(curDot?.infoDot?.thoiGianTiepNhanMinhChung?.thoiGianKetThuc)
    ) {
      popupOk(
        translate('slink:Notice_t'),
        'Ngoài thời gian khai báo minh chứng cho đợt này',
      );
    } else {
      navigateScreen(APP_SCREEN.THEMMOIMINHCHUNG, {
        item: itemDon,
        dot: dot,
        refreshing: () => getLichSuDon(dot),
      });
    }
  };

  return (
    <View style={styles.container}>
      <HeaderReal
        title={'Lịch sử khai báo'}
        childrenRight={<ChildrenRight onPress={onNavigate} />}
      />
      <Box bgColor={'white'} style={{ ...R.themes.shadowOffset }}>
        <Text
          my={HEIGHT(16)}
          width={WIDTH(343)}
          alignSelf={'center'}
          textAlign={'center'}
          fontSize={'md'}
          fontFamily={R.fonts.BeVietnamProExtraBold}
          // color={'rgba(171, 171, 171, 1)'}
        >
          {itemDon?.tenMinhChung}
        </Text>
      </Box>
      {/* <Divider /> */}
      <Filter dataNamHoc={listDot} onChangeNamHoc={getLichSuDon} />
      <TimeStartEnd
        thoiGianBatDau={
          curDot?.infoDot?.thoiGianTiepNhanMinhChung?.thoiGianBatDau
        }
        thoiGianKetThuc={
          curDot?.infoDot?.thoiGianTiepNhanMinhChung?.thoiGianKetThuc
        }
      />
      <FlatList
        data={listDon}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        ListEmptyComponent={<ItemTrong />}
        // columnWrapperStyle={styles.wrap}
        bounces={false}
        // contentContainerStyle={styles.contentContainer}
        renderItem={({ item, index }) => (
          <ItemDonMinhChung item={item} index={index} />
        )}
        ListFooterComponent={loadMore ? <LoadMore /> : <View />}
        onEndReachedThreshold={0.01}
        onRefresh={() => getLichSuDon(dot)}
        // contentContainerStyle={styles.containerNews}
        // style={styles.flatListNews}
        onMomentumScrollBegin={() => {
          beginScroll.current = true;
        }}
        onEndReached={getMore}
      />
      <LoadingComponent loading={loading} />
    </View>
  );
};

export default DanhSachMinhChung;
const Filter = (props: any) => {
  const { dataNamHoc, onChangeNamHoc } = props;

  return (
    <Box
      backgroundColor="white"
      width={WIDTH(343)}
      mt={'2'}
      paddingLeft={WIDTH(16)}
      paddingRight={WIDTH(16)}
      borderRadius={WIDTH(8)}
      alignSelf="center"
      overflow="hidden">
      <FilterLHP
        data={dataNamHoc}
        onChange={onChangeNamHoc}
        placeHolder={'Chọn đợt'}
        label={'Đợt khai báo'}
        isLast
      />
    </Box>
  );
};

const ChildrenRight = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable
      _pressed={R.themes.pressed}
      hitSlop={R.themes.hitSlop}
      onPress={onPress}>
      <Icon name="plus" size={WIDTH(24)} color={'white'} />
    </Pressable>
  );
};

const TimeStartEnd = (props: any) => {
  const { thoiGianBatDau, thoiGianKetThuc } = props;

  return (
    <View style={styles.viewTime}>
      <Text style={styles.textSubTime}>
        Từ{' '}
        <Text style={styles.textTime}>{`${
          thoiGianBatDau
            ? moment(thoiGianBatDau).format('HH:mm DD/MM/YYYY')
            : '--'
        }`}</Text>
      </Text>
      <Text style={styles.textSubTime}>
        Đến{' '}
        <Text style={styles.textTime}>{`${
          thoiGianKetThuc
            ? moment(thoiGianKetThuc).format('HH:mm DD/MM/YYYY')
            : '--'
        }`}</Text>
      </Text>
    </View>
  );
};
