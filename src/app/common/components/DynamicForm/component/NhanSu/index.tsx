/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import R from '@assets/R';
import { tenGiangVien, WIDTH } from '@common';
import { HelperText } from '@libcomponents/helper-text';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getDSCanBo } from '@networking/user';
import Icon from 'react-native-vector-icons/Feather';

import { styles } from './styles';
import { translate } from '@utils/i18n/translate';

const NhanSuDynamicForm = (props: any) => {
  const { defaultValue, label, onChange, required, isLast, error, style } =
    props;

  const [infoUser, setinfoUser] = useState<any>(defaultValue ?? null);

  // useEffect(() => {
  //   onChange(defaultValue);
  // }, []);

  const getNhanSu = (item: any) => {
    setinfoUser(item);

    onChange(item);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const body = {
      page: 1,
      limit: 20,
      condition: { trangThaiChinhSua: 'Duyệt - đang áp dụng' },
      filters: [
        { field: 'maCanBo', values: [defaultValue], operator: 'contain' },
      ],
    };

    const responseDS = await getDSCanBo(body);

    setinfoUser(responseDS?.data?.data?.result?.[0]);

    onChange(responseDS?.data?.data?.result?.[0]);
  };

  const onPress = () => {
    navigateScreen(APP_SCREEN.SEARCHNS, { getNhanSu });
  };

  return (
    <View
      style={[
        styles.containerInput,
        style,
        isLast && { borderBottomWidth: 0 },
      ]}>
      <Text style={[styles.label]}>
        {`${label ?? ''}`}
        {required && <Text style={styles.dot}>{' * '}</Text>}
      </Text>
      <TouchableOpacity onPress={onPress} style={styles.dropDown}>
        {infoUser ? (
          <Text style={styles.giangVien}>{`${tenGiangVien(infoUser)}`}</Text>
        ) : (
          <Text style={styles.giangVien}>
            {translate('slink:Chon_giang_vien')}
          </Text>
        )}
        <Icon name="search" size={WIDTH(20)} color={R.colors.grayText} />
      </TouchableOpacity>
      <HelperText
        visible={error !== undefined}
        msg={error ?? ''}
        type={'error'}
      />
    </View>
  );
};

export default NhanSuDynamicForm;
