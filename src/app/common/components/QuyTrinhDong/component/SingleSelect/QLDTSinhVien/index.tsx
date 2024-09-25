/* eslint-disable no-catch-shadow */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import R from '@assets/R';
import { tenGiangVien, WIDTH } from '@common';
import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import { HelperText } from '@libcomponents/helper-text';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { AccountProps } from '@model/app';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getDSSinhVien } from '@networking/user';
import { Box, Pressable } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import { styles } from './styles';

const QLDTSinhVien = (props: any) => {
  const { defaultValue, label, onChange, required, isLast, style, error } =
    props;

  const [hoVaTen, sethoVaTen] = useState('');

  const [loading, setloading] = useState(false);

  useEffect(() => {
    defaultValue && getInitDSCanBo();
  }, [defaultValue]);

  const getInitDSCanBo = async () => {
    setloading(true);

    try {
      const body = {
        page: 1,
        limit: 20,
        // condition: { trangThaiChinhSua: 'Duyệt - đang áp dụng' },
        filters: [
          {
            active: true,
            field: 'ssoId',
            values: [defaultValue],
            operator: 'in',
          },
        ],
      };

      const responseDS = await getDSSinhVien(body);

      setloading(false);

      const userInfo = responseDS?.data?.data?.result?.[0];

      userInfo && sethoVaTen(tenGiangVien(userInfo));
    } catch (error) {
      setloading(false);
    }
  };

  const getNhanSu = (item: AccountProps) => {
    onChange(item?.ssoId);

    sethoVaTen(tenGiangVien(item));
  };

  const onPress = () => {
    navigateScreen(APP_SCREEN.SEARCHQLDTSINHVIEN, { getNhanSu });
  };

  const borderColor = error ? R.colors.red600 : R.colors.gray30;

  return (
    <View
      style={[
        styles.containerInput,
        style,
        isLast && { borderBottomWidth: 0 },
      ]}>
      <TextLabelQuyTrinh label={label} isRequired={required} />
      <Pressable
        mt="1"
        backgroundColor={'white'}
        _pressed={R.themes.pressed}
        onPress={onPress}
        style={[styles.dropDown, { borderColor }]}>
        {hoVaTen ? (
          <Text style={styles.giangVien}>{`${hoVaTen}`}</Text>
        ) : (
          <Text style={styles.giangVien}>Chọn sinh viên</Text>
        )}
        <Box w={WIDTH(20)}>
          {loading ? (
            <LoadingComponent size={'small'} />
          ) : (
            <Icon name="search" size={WIDTH(20)} color={R.colors.grayText} />
          )}
        </Box>
      </Pressable>
      <HelperText
        visible={error !== undefined}
        msg={error ?? ''}
        type={'error'}
      />
    </View>
  );
};

export default QLDTSinhVien;
