/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useSelector } from 'react-redux';

import { HEIGHT, popupCancel, showToastWarn } from '@common';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  bieuMauKhaoSatTrucTuyen,
  getKetQuaKhaoSat,
  getKetQuaKhaoSatCB,
} from '@networking/user';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import moment from 'moment';
import { Badge, HStack } from 'native-base';

import styles from './styles';
import { Props } from './type';

const ItemKhaoSatTrucTuyen = (props: Props) => {
  const { item, index, refreshData, type } = props;

  const { account } = useSelector(selectAppConfig);

  const disabled = type === 'DA_DIEN_RA';

  const timeStart = item?.thoiGianBatDau
    ? moment(item?.thoiGianBatDau).format('HH:mm DD/MM/YYYY')
    : '';

  const timeEnd = item?.thoiGianKetThuc
    ? moment(item?.thoiGianKetThuc).format('HH:mm DD/MM/YYYY')
    : '';

  const currentTime = new Date();

  const startTime = new Date(item?.thoiGianBatDau);

  const endTime = new Date(item?.thoiGianKetThuc);

  const isInTime = currentTime >= startTime && currentTime <= endTime;

  const handleInitTracNghiem = async (dataKhaoSat: any, dataBieuMau: any) => {
    let initKetQua: any;
    if (account?.isGiaoVien) {
      const responseKetQua: any = await getKetQuaKhaoSatCB(
        item?.idKhaoSat,
        item?._id,
      );

      const sortedData = _.orderBy(
        responseKetQua.data?.data,
        ['updatedAt'],
        ['desc'],
      );

      initKetQua = sortedData[0];
    } else {
      const responseKetQua: any = await getKetQuaKhaoSat(item?._id);

      initKetQua = responseKetQua?.data?.data;
    }

    navigateScreen(APP_SCREEN.DANHGIAGIANGVIEN, {
      data: dataBieuMau,
      disabled,
      idDot: dataKhaoSat?._id ?? '',
      idKhaoSat: dataKhaoSat?.idKhaoSat,
      refreshData,
      initKetQua,
    });
  };

  const onPress = async () => {
    let [responseBieuMau, dataBieuMau]: any = [undefined, undefined];
    const dataKhaoSat = { ...item, daTraLoi: item?.daLam };

    try {
      responseBieuMau = await bieuMauKhaoSatTrucTuyen(
        dataKhaoSat?.idKhaoSat ?? '',
      );

      dataBieuMau = responseBieuMau?.data?.data;
    } catch (error) {}

    if (!dataKhaoSat?.kichHoat) {
      showToastWarn(translate('slink:Survey_not_allowed_to_participate'));
    } else if (item?.daLam) {
      if (isInTime) {
        popupCancel(
          translate('slink:Notice_t'),
          translate('slink:You_has_completed_this_survay'),
          () => {
            handleInitTracNghiem(dataKhaoSat, dataBieuMau);
          },
        );
      } else {
        handleInitTracNghiem(dataKhaoSat, dataBieuMau);
      }
    } else {
      navigateScreen(APP_SCREEN.DANHGIAGIANGVIEN, {
        data: dataBieuMau,
        disabled,
        idDot: dataKhaoSat?._id ?? '',
        idKhaoSat: dataKhaoSat?.idKhaoSat,
        refreshData,
      });
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      testID={`ItemKhaoSatTrucTuyen-${index}`}
      onPress={onPress}
      style={styles.itemNavStyle}>
      <View style={styles.viewContent}>
        <ViewStatus trangThai={item?.daLam} />
        <Text style={styles.title}>{item?.ten}</Text>
        <ViewTime timeStart={timeStart} timeEnd={timeEnd} />
      </View>
    </TouchableOpacity>
  );
};

export default ItemKhaoSatTrucTuyen;
const ViewStatus = ({ trangThai }: { trangThai: boolean }) => {
  const colorScheme = trangThai ? 'success' : 'error';

  const nameBadge = trangThai
    ? translate('slink:Da_thuc_hien')
    : translate('slink:Chua_thuc_hien');

  return (
    <Badge
      alignSelf={'flex-start'}
      marginBottom={HEIGHT(12)}
      colorScheme={colorScheme}>
      {nameBadge}
    </Badge>
  );
};

const ViewTime = ({
  timeStart,
  timeEnd,
}: {
  timeStart: string;
  timeEnd: string;
}) => {
  if (timeStart !== '' && timeEnd !== '') {
    return (
      <HStack justifyContent={'space-between'}>
        <Text style={styles.label}>
          {`${translate('slink:From')}  `}
          <Text style={styles.time}>{timeStart}</Text>
        </Text>
        <Text style={styles.label}>
          {`${translate('slink:To')}  `}
          <Text style={styles.time}>{timeEnd}</Text>
        </Text>
      </HStack>
    );
  } else {
    return <Text style={styles.time}>{translate('slink:No_time_limit')}</Text>;
  }
};
