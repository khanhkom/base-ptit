/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import FastImage from 'react-native-fast-image';
import TextTicker from 'react-native-text-ticker';

import R from '@assets/R';
import { lichSinhNhat } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Text, useTheme } from 'native-base';

import styles from './styles';

const LichSinhNhat = () => {
  const [data, setdata] = useState([]);

  const [loading, setloading] = useState<boolean>();

  const theme = useTheme();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setloading(true);

      const resMoment: any = await lichSinhNhat(moment().format('MM'));

      const res = resMoment?.data?.data ?? [];

      const dataToDay =
        res?.filter(
          (item: { ngaySinh: string }) =>
            moment(item?.ngaySinh).format('DD-MM') === moment().format('DD-MM'),
        ) ?? [];

      setdata(dataToDay);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  if (loading) {
    return null;
  }

  const text = data
    ?.map((item: any) => {
      return `${item?.hoDem ?? ''} ${item?.ten ?? ''}${
        item?.ngaySinh
          ? ` (${moment(item?.ngaySinh).format('DD-MM-YYYY')})`
          : ''
      }${item?.donViChinh?.ten ? ` - ${item?.donViChinh?.ten ?? '--'}` : ''}`;
    })
    ?.join('       ');

  return data?.length > 0 ? (
    <View style={styles.viewCMSN}>
      <FastImage source={R.images.birthdayCake} style={styles.viewImg} />
      <TextTicker
        style={[
          styles.fullname,
          { color: theme.colors.primary[500], fontSize: theme.fontSizes.sm },
        ]}
        duration={text?.length * 200}
        loop
        bounce
        repeatSpacer={200}
        marqueeDelay={1000}>
        <Text
          color="black"
          fontFamily={R.fonts.BeVietnamProMedium}
          fontSize={'sm'}>{`${translate('slink:Happy_birthday')}       `}</Text>
        {text ?? ''}
      </TextTicker>
    </View>
  ) : (
    <></>
  );
};

export default LichSinhNhat;
