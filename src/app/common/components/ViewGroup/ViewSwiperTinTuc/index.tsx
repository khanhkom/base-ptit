/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import Swiper from 'react-native-swiper';

import {
  EDaLuu,
  HEIGHT,
  MapKeyDaLuu,
  MAX_NEWS_SWIPEHOME,
  WIDTH,
} from '@common';
import TypeNew from '@components/Item/ItemTinTuc';
import ItemTrong from '@components/Item/ItemTrong';
import { WORD_PRESS_NEWS_URL } from '@env';
import ItemTextBlue from '@features/TabMain/TrangChu/component/ItemTextBlue';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getDSXemSauMany } from '@networking/user/DaLuu';
import { translate } from '@utils/i18n/translate';
import { Box, HStack, Skeleton } from 'native-base';

import styles from './styles';

const ShowSwiper = (props: any) => {
  const { data, listItemSaved, onRefresh } = props;

  const dataLimit =
    data?.length > MAX_NEWS_SWIPEHOME
      ? data.slice(0, MAX_NEWS_SWIPEHOME)
      : data;

  return (
    <Swiper
      key={dataLimit}
      autoplay={true}
      style={{ height: HEIGHT(188) }}
      showsButtons={false}
      autoplayTimeout={2}>
      {dataLimit?.map((value: any, index: number) => (
        <SubSwiperView
          key={index}
          data={value}
          listItemSaved={listItemSaved}
          onRefresh={onRefresh}
        />
      ))}
    </Swiper>
  );
};

const SubSwiperView = ({ data, listItemSaved, onRefresh }: any) => {
  const newsWP = !!WORD_PRESS_NEWS_URL;

  const goToChiTiet = (item: any) => {
    navigateScreen(
      newsWP ? APP_SCREEN.CHITIETTINTUCV2 : APP_SCREEN.CHITIETTINTUC,
      { content: item },
    );
  };

  const findSaved = listItemSaved?.find(
    (e: { sourceId: string }) => e?.sourceId === `${data?.id}`,
  );

  return (
    <View style={styles.viewSwiper}>
      <TypeNew
        newsWP={newsWP}
        onRefresh={onRefresh}
        idSaved={findSaved?._id}
        isSaved={!!findSaved}
        style={{ marginBottom: 0 }}
        content={data}
        title={data?.title?.rendered || data?.tieuDe}
        onPress={() => goToChiTiet(data)}
      />
    </View>
  );
};

const ViewSwiperTinTuc = (props: any) => {
  const { loading, data } = props;

  const [listItemSaved, setlistItemSaved] = useState<any[]>([]);

  useEffect(() => {
    getDSDaLuu();
  }, []);

  const getDSDaLuu = async () => {
    try {
      const responseDaLuuTinTuc = await getDSXemSauMany(
        MapKeyDaLuu[EDaLuu.TIN_TUC],
      );

      setlistItemSaved(responseDaLuuTinTuc?.data?.data);
    } catch (error) {}
  };

  const goToDetail = () => {
    navigateScreen(
      WORD_PRESS_NEWS_URL ? APP_SCREEN.TINTUCV2 : APP_SCREEN.TINTUC,
    );
  };

  if (loading) {
    return (
      <Box py={HEIGHT(12)}>
        <ItemTextBlue label={translate('slink:News')} onPress={goToDetail} />
        <HStack
          px={WIDTH(16)}
          mt="5"
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Skeleton rounded="xl" w={WIDTH(90)} h={HEIGHT(90)} />
          <Skeleton.Text w={WIDTH(240)} lines={4} />
        </HStack>
      </Box>
    );
  }

  return (
    <Box py={HEIGHT(12)}>
      <ItemTextBlue label={translate('slink:News')} onPress={goToDetail} />
      <Box marginTop={HEIGHT(20)} justifyContent="center">
        {data?.length !== 0 ? (
          <ShowSwiper
            listItemSaved={listItemSaved}
            data={data}
            onRefresh={getDSDaLuu}
          />
        ) : (
          <ItemTrong customStyle={styles.trong} content="Không có tin tức" />
        )}
      </Box>
    </Box>
  );
};

export default ViewSwiperTinTuc;
