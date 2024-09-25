import React, { useState } from 'react';

import R from '@assets/R';
import { ECHART_NCKH_TYPE, WIDTH } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import { LoaiHinhNCKHProps } from '@features/QuanLyKhoaHocV2/type';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { Box, Pressable, Text, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';

import { QuyDoiGioProps } from '../../type';
interface Props {
  thongKeGio: QuyDoiGioProps[];
  tieuDe: string;
  listLH?: LoaiHinhNCKHProps[];
  type: ECHART_NCKH_TYPE;
}
const LIST_COLOR = ['#008ffb', '#00e396', '#ffb01a', '#ff4560', '#775dd0'];

const ChuThich = (props: Props) => {
  const { listLH } = props;

  const [expand, setexpand] = useState(false);

  const navigateList = (item: LoaiHinhNCKHProps) => {
    navigateScreen(APP_SCREEN.DANHSACHKHAIBAONCKH, { dataLoaiHinh: item });
  };

  const listData = expand ? listLH : listLH?.slice(0, 2);

  const theme = useTheme();

  return (
    <Box mt={'2'}>
      {listData?.length === 0 ? (
        <ItemTrong />
      ) : (
        listData?.map((item, index) => {
          const indexColor = index % 5;

          return (
            <Pressable
              onPress={() => {
                navigateList(item);
              }}
              key={index}
              flexDirection={'row'}
              alignItems="center">
              <Box
                height={WIDTH(8)}
                width={WIDTH(8)}
                mr="2"
                backgroundColor={LIST_COLOR?.[indexColor]}
              />
              <Text
                textDecorationColor={'gray.400'}
                textDecorationLine={'underline'}
                fontFamily={R.fonts.BeVietnamProRegular}
                flex={1}
                fontSize={'xs'}
                numberOfLines={1}>
                {item?.ten}
              </Text>
            </Pressable>
          );
        })
      )}
      <Pressable
        onPress={() => {
          setexpand(!expand);
        }}
        hitSlop={R.themes.hitSlop}
        alignSelf="center"
        mt="1"
        _pressed={R.themes.pressed}>
        <Icon
          name={expand ? 'chevron-up' : 'chevron-down'}
          size={WIDTH(16)}
          color={theme.colors.blue[500]}
        />
      </Pressable>
    </Box>
  );
};

export default ChuThich;
