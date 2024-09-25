/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { ETrangThaiDanhGia, HEIGHT, showToastError, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import ItemTrong from '@components/Item/ItemTrong';
import SingleSelect from '@components/QuyTrinhDong/component/SingleSelect';
import HeaderReal from '@libcomponents/header-real';
import LoadMore from '@libcomponents/loading/loadmore-component';
import ModalCustome from '@libcomponents/modal/modal-custome';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  getDanhSachBieuMau,
  getDotDanhGiaNS,
} from '@networking/user/DanhGiaNhanSu';
import { translate } from '@utils/i18n/translate';
import { Box, FlatList, Text } from 'native-base';

import { DotDanhGiaProps } from './type';

import ItemDotDGNS from '../component/ItemDotDGNS';

const DanhGiaCaNhan = () => {
  const [dsDotDG, setdsDotDG] = useState<DotDanhGiaProps[]>([]);

  const [dsBieuMau, setdsBieuMau] = useState<any[]>([]);

  const [curItem, setCurItem] = useState<any>();

  const [visible, setVisible] = useState<boolean>(false);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getInitAPI();
  }, []);

  useEffect(() => {
    getDataBieuMau();
  }, []);

  const getDataBieuMau = async () => {
    setRefreshing(true);

    const responseBieuMau: any = await getDanhSachBieuMau();

    setdsBieuMau(responseBieuMau?.data?.data || []);

    setRefreshing(false);
  };

  const getInitAPI = async () => {
    setRefreshing(true);

    const params = {
      page: 1,
      limit: 10,
      sort: { thoiGianBatDau: -1 },
    };

    const responseDotDG: any = await getDotDanhGiaNS(params);

    setdsDotDG(responseDotDG?.data?.data?.result || []);

    setRefreshing(false);
  };

  const loadMoreData = async () => {
    if (!maxData.current) {
      setLoadMore(true);

      page.current += 1;

      try {
        const params = {
          page: page.current,
          limit: 10,
          sort: { thoiGianBatDau: -1 },
        };

        const responseDotDG: any = await getDotDanhGiaNS(params);

        setdsDotDG([...dsDotDG, ...(responseDotDG?.data?.data?.result ?? [])]);

        maxData.current = responseDotDG?.data?.data?.result?.length < 10;

        setLoadMore(false);
      } catch (error) {
        setLoadMore(false);
      }
    }
  };

  const [loadMore, setLoadMore] = useState(false);

  const page = useRef(1);

  const maxData = useRef(false);

  const beginScroll = useRef<boolean>(false);

  const getMore = () => {
    if (beginScroll.current && !maxData.current) {
      loadMoreData();

      beginScroll.current = false;
    }
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Personal_review')} />
      <FlatList
        data={dsDotDG}
        extraData={dsDotDG}
        onRefresh={getInitAPI}
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
        renderItem={({ item, index }) => (
          <ItemDotDGNS
            item={item}
            key={index}
            refreshData={getInitAPI}
            onPress={() => {
              setVisible(true);

              setCurItem(item);
            }}
          />
        )}
      />
      <ModalBieuMau
        isVisible={true}
        turnOffModel={() => setVisible(false)}
        itemCur={curItem}
        refreshData={getInitAPI}
        listBieuMau={dsBieuMau}
      />
    </Box>
  );
};

export default DanhGiaCaNhan;

const styles = StyleSheet.create({
  listContainer: { paddingBottom: HEIGHT(30), paddingTop: HEIGHT(24) },
});

const ModalBieuMau = ({
  isVisible,
  turnOffModel,
  itemCur,
  refreshData,
  listBieuMau,
}) => {
  const dsBieuMau = listBieuMau?.map(item => {
    return {
      label: item?.tieuDe,
      value: item?._id,
    };
  });

  const [trangThai, setTrangThai] = useState<any>();

  const start = new Date(itemCur?.thoiGianBatDau).getTime();

  const end = new Date(itemCur?.thoiGianKetThuc).getTime();

  const currentTime = new Date().getTime();

  const isTouch = currentTime >= start && currentTime <= end;

  const khongTheSuaDanhGia =
    itemCur?.trangThaiLam !== ETrangThaiDanhGia.CHUA_DANH_GIA &&
    itemCur?.trangThaiLam !== ETrangThaiDanhGia.DA_DANH_GIA_CHUA_GUI;

  useEffect(() => {
    if (
      itemCur &&
      !isTouch &&
      itemCur?.trangThaiLam === ETrangThaiDanhGia.CHUA_DANH_GIA
    ) {
      showToastError('Ngoài thời gian đánh giá');
    } else if (itemCur && khongTheSuaDanhGia) {
      navigateScreen(APP_SCREEN.DETAILDANHGIACANHAN, {
        data: itemCur,
        isDisabled: khongTheSuaDanhGia,
        onRefresh: refreshData,
      });
    }

    setTrangThai(dsBieuMau?.[0]?.value ?? null);
  }, [itemCur]);

  const navigateDetail = () => {
    if (trangThai) {
      const curBieuMau = listBieuMau?.find(item => item?._id === trangThai);

      turnOffModel();

      setTimeout(
        () =>
          navigateScreen(APP_SCREEN.DETAILDANHGIACANHAN, {
            data: itemCur,
            isDisabled: khongTheSuaDanhGia,
            onRefresh: refreshData,
            bieuMau: curBieuMau,
          }),
        500,
      );
    } else {
      showToastError('Vui lòng chọn biểu mẫu');
    }
  };

  return (
    <ModalCustome
      style={{ paddingHorizontal: 0 }}
      isVisible={isVisible && isTouch && !khongTheSuaDanhGia}
      closeButton={turnOffModel}>
      <Box w={WIDTH(300)} alignSelf={'center'}>
        <Text
          fontFamily={R.fonts.BeVietnamProRegular}
          fontSize={'sm'}
          color={'gray.500'}>
          Biểu mẫu đánh giá
        </Text>
        <SingleSelect
          data={dsBieuMau}
          onChangeValue={setTrangThai}
          placeholder="Chọn biểu mẫu đánh giá"
          defaultValue={dsBieuMau?.[0]?.value ?? null}
        />

        <BaseButtonNB
          width={WIDTH(140)}
          onPress={() => navigateDetail()}
          title={translate('slink:Continue')}
        />
      </Box>
    </ModalCustome>
  );
};
