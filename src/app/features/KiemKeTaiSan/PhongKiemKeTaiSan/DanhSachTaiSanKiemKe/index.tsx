/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';

import R from '@assets/R';
import { popupCancel, popupOk, WIDTH } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import HeaderReal from '@libcomponents/header-real';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { goBack } from '@navigation/navigation-service';
import {
  getListKiemKeTinhTrangSuDung,
  getListTaiSanKiemKe,
  putKiemKeTaiSan,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { Box, FlatList, Pressable, useTheme } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ItemTaiSanKiemKe from './Items/ItemTaiSanKiemKe';
import styles from './styles';

const DanhSachTaiSanKiemKe = props => {
  const itemPhong = props?.route?.params?.data;

  const onRefresh = props?.route?.params?.onRefresh;

  const [listDon, setListDon] = useState<any[]>([]);

  const [listTinhTrang, setListTinhTrang] = useState<any[]>([]);

  const [listTinhTrangNew, setListTinhTrangNew] = useState<any[]>([]);

  const [refreshing, setRefreshing] = useState(false);

  const [loadMore, setLoadMore] = useState(false);

  const page = useRef(1);

  const maxData = useRef(false);

  const beginScroll = useRef<boolean>(false);

  useEffect(() => {
    getListTinhTrang();

    getData();
  }, []);

  const getListTinhTrang = async () => {
    setRefreshing(true);

    try {
      const res: any = await getListKiemKeTinhTrangSuDung();

      const dataPicker = res?.data?.map(item => {
        return {
          label: item?.tinhTrangSuDung,
          value: item?.ma,
        };
      });

      setListTinhTrang(dataPicker ?? []);

      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
    }
  };

  const getMore = () => {
    if (beginScroll.current && !maxData.current) {
      loadMoreData();

      beginScroll.current = false;
    }
  };

  const getData = async () => {
    setRefreshing(true);

    try {
      const body = {
        limit: 10,
        page: 1,
        condition: { dotKiemKeTaiSanPhongId: itemPhong?._id },
      };

      const res: any = await getListTaiSanKiemKe(body);

      setListDon(res?.data?.result ?? []);

      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
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
          condition: { dotKiemKeTaiSanPhongId: itemPhong?._id },
        };

        const res: any = await getListTaiSanKiemKe(body);

        setListDon([...listDon, ...(res?.data?.result ?? [])]);

        maxData.current = res?.data?.result?.length < 10;

        setLoadMore(false);
      } catch (error) {
        setLoadMore(false);
      }
    }
  };

  const onChange = (maTrangThai, maTaiSan) => {
    const isIn = listTinhTrangNew?.find(item => item?._id === maTaiSan);

    if (isIn) {
      const replaceList = listTinhTrangNew?.map(item => {
        if (item?._id === maTaiSan) {
          return {
            ...item,
            maTinhTrangSuDung: maTrangThai,
          };
        } else {
          return item;
        }
      });

      setListTinhTrangNew(replaceList);
    } else {
      setListTinhTrangNew([
        ...listTinhTrangNew,
        { _id: maTaiSan, maTinhTrangSuDung: maTrangThai },
      ]);
    }
  };

  const onCheck = () => {
    popupCancel(
      translate('slink:Notice_t'),
      'Bạn có muốn kiểm kê tài sản',
      () => {
        onSend();
      },
    );
  };

  const onSend = async () => {
    try {
      const dataKiemKe = listDon?.map(itemTaiSan => {
        const thongTinThayDoi = listTinhTrangNew?.find(
          itemThayDoi => itemThayDoi?._id === itemTaiSan?._id,
        );

        if (thongTinThayDoi) {
          return {
            _id: itemTaiSan?._id,
            maTinhTrangSuDung: thongTinThayDoi?.maTinhTrangSuDung,
            giuNguyenHienTrang:
              thongTinThayDoi?.maTinhTrangSuDung ===
              itemTaiSan?.maTinhTrangSuDung,
          };
        } else {
          return {
            _id: itemTaiSan?._id,
            maTinhTrangSuDung: itemTaiSan?.maTinhTrangSuDung,
            giuNguyenHienTrang: true,
          };
        }
      });

      const res = await putKiemKeTaiSan(itemPhong?.dotKiemKeTaiSanId, {
        danhSachKiemKe: dataKiemKe,
      });

      if (res?.success) {
        popupOk(translate('slink:Notice_t'), 'Kiểm kê thành công', () => {
          if (onRefresh) {
            onRefresh();
          }

          goBack();
        });
      } else {
        popupOk(
          translate('slink:Notice_t'),
          translate('slink:Da_co_loi_xay_ra'),
        );
      }
    } catch (error) {}
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title={translate('slink:Assets_check')}
        childrenRight={<SendIcon onPress={onCheck} />}
      />
      <FlatList
        data={listDon}
        extraData={listDon}
        onRefresh={getData}
        onEndReached={getMore}
        refreshing={refreshing}
        ListFooterComponent={loadMore ? <LoadMore /> : null}
        onEndReachedThreshold={0.01}
        onMomentumScrollBegin={() => {
          beginScroll.current = true;
        }}
        ListEmptyComponent={<ItemTrong />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ItemTaiSanKiemKe
            item={item}
            listTinhTrang={listTinhTrang}
            onChange={onChange}
          />
        )}
      />
    </Box>
  );
};

export default DanhSachTaiSanKiemKe;
const SendIcon = (props: any) => {
  const { onPress } = props;

  const theme = useTheme();

  return (
    <Pressable onPress={onPress}>
      <MaterialCommunityIcons
        name={'send'}
        size={WIDTH(24)}
        color={theme.colors.white}
      />
    </Pressable>
  );
};
