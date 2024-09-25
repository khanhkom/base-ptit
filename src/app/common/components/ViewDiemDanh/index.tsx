import React from 'react';

import R from '@assets/R';
import { ETrangThaiDiemDanh } from '@config/constant';
import { WIDTH } from '@config/function';
import { Box, HStack, Pressable, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import styles from './styles';

const ViewDiemDanhSV = ({
  value,
  onChangeKyHoc,
}: {
  value: string;
  onChangeKyHoc: (e: ETrangThaiDiemDanh) => void;
}) => {
  const theme = useTheme();

  const LIST_DD = [
    {
      icon: 'check',
      code: ETrangThaiDiemDanh.CO_MAT,
      backgroundColor: theme.colors.green[600],
    },
    {
      icon: 'clock',
      code: ETrangThaiDiemDanh.MUON_VE_SOM,
      backgroundColor: theme.colors.purple[600],
    },
    {
      icon: 'alert-triangle',
      code: ETrangThaiDiemDanh.VANG_CO_PHEP,
      backgroundColor: theme.colors.blue[600],
    },
    {
      icon: 'x',
      code: ETrangThaiDiemDanh.VANG_KHONG_PHEP,
      backgroundColor: theme.colors.yellow[600],
    },
  ];

  return (
    <HStack alignItems="center">
      {LIST_DD?.map((item, index) => {
        const active = value === item?.code;
        const backgroundColor = active ? item?.backgroundColor : R.colors.white;
        const onPress = () => {
          onChangeKyHoc?.(item?.code);
        };
        return (
          <Pressable
            disabled={active}
            onPress={onPress}
            _pressed={R.themes.pressed}
            hitSlop={styles.hitSlop}
            key={index}
            backgroundColor="white"
            height={WIDTH(28)}
            width={WIDTH(28)}
            alignItems="center"
            justifyContent="center"
            ml={'2'}
            borderRadius={WIDTH(8)}
            style={[styles.buttonDD, { backgroundColor }]}>
            <Icon
              name={item?.icon}
              size={WIDTH(16)}
              color={active ? R.colors.white : R.colors.grayText}
            />
          </Pressable>
        );
      })}
    </HStack>
  );
};

export default ViewDiemDanhSV;
