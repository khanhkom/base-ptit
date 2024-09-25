/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import Swiper from 'react-native-swiper';

import R from '@assets/R';
import { MAX_NEWS_SWIPEHOME } from '@common';
import ItemSwiperNews from '@components/Item/ItemSwiperNews';
import ItemTextBlue from '@components/Item/ItemTextBlue';
import { Skeleton } from '@libcomponents/skeleton';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { translate } from '@utils/i18n/translate';

import styles from './styles';

const ShowSwiper = ({ loading, data }: { loading: boolean; data: any }) => {
  if (loading) {
    return (
      <View style={styles.loading}>
        <Skeleton />
      </View>
    );
  } else {
    let count = -2;
    const dataLimit =
      data?.length > MAX_NEWS_SWIPEHOME
        ? data.slice(0, MAX_NEWS_SWIPEHOME)
        : data;

    const dataSwiper = dataLimit
      .map(() => {
        count += 2;

        return [data?.[count], data?.[count + 1]];
      })
      .filter((item: any) => !!item?.[0]);

    return (
      <Swiper
        key={dataSwiper}
        autoplay={true}
        showsButtons={false}
        dotStyle={styles.dot}
        activeDotStyle={styles.styleActiveDot}
        autoplayTimeout={2}>
        {dataSwiper.map((value: any, index: number) => (
          <SubSwiperView key={index} data={value} />
        ))}
      </Swiper>
    );
  }
};

const SubSwiperView = ({ data }: { data: any }) => {
  return (
    <View style={styles.viewSwiper}>
      <ItemSwiperNews itemNew={data?.[0]} />
      <ItemSwiperNews itemNew={data?.[1]} />
    </View>
  );
};

const ViewSwiperTinTuc = (props: any) => {
  const { data, backgroundColor } = props;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const color = backgroundColor ? backgroundColor : R.colors.backgroundColorNew;

  const goToDetail = () => {
    navigateScreen(APP_SCREEN.TINTUC);
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <ItemTextBlue
        label={'Tin nổi bật'}
        extend={translate('slink:Expand')}
        color={backgroundColor || R.colors.white}
        onPress={goToDetail}
      />
      <View style={styles.swiper}>
        <ShowSwiper loading={loading} data={data} />
      </View>
    </View>
  );
};

export default ViewSwiperTinTuc;
