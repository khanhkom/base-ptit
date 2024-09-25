/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StyleSheet } from 'react-native';

import R from '@assets/R';
import {
  getDayOfWeek,
  getFontSize,
  getLineHeight,
  HEIGHT,
  WIDTH,
} from '@common';
import { EMapColorTrangThaiLamNgoaiGio } from '@features/VanPhongSo/LichTuanHocVien/constant';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Box, HStack, Pressable, Text, useTheme, VStack } from 'native-base';

const ListEvent = ({ day, data }: any) => {
  const theme = useTheme();

  const thu: any = getDayOfWeek(
    new Date(moment(day, 'DD/MM/YYYY').add(1, 'day').toISOString()).getUTCDay(),
  );

  const toDay = moment(new Date()).format('YYYY-MM-DD');

  const dataList = data?.filter(item => {
    return moment(item?.tuNgay).format('DD/MM/YYYY') === day;
  });

  return (
    <Box width={WIDTH(343)} alignSelf={'center'} mt={HEIGHT(8)}>
      <Text style={styles.textNgay}>
        {day === toDay ? translate('slink:toDay') : `${thu}, ${day}`}
      </Text>
      {dataList?.map(item => {
        const ngayBatDau = moment(item?.thoiGianBatDau ?? item?.tuNgay).format(
          'DD/MM',
        );

        const ngayKetThuc = moment(
          item?.thoiGianKetThuc ?? item?.denNgay,
        ).format('DD/MM');

        const hasNgay = ngayBatDau !== ngayKetThuc;

        return (
          <HStack marginTop={HEIGHT(16)} justifyContent={'space-between'}>
            <VStack mr={'1'} minW={WIDTH(40)}>
              <TextTime
                day={moment(item?.thoiGianBatDau ?? item?.tuNgay).format(
                  'HH:mm',
                )}
              />
              <TextNgay visible={hasNgay} day={ngayBatDau} />
              <TextTime
                day={moment(item?.thoiGianKetThuc ?? item?.denNgay).format(
                  'HH:mm',
                )}
              />
              <TextNgay visible={hasNgay} day={ngayKetThuc} />
            </VStack>
            <Box>
              <ContainerCard
                borderRadius={'xl'}
                borderLeftWidth={0}
                backgroundColor={
                  EMapColorTrangThaiLamNgoaiGio?.[item?.loaiLamThemGio]
                }
                borderColor={theme.colors.green[400]}>
                <Text
                  color={'white'}
                  fontFamily={R.fonts.BeVietnamProBold}
                  fontSize="sm">
                  {item?.loaiLamThemGio || ''}
                </Text>
                <Text
                  color={'white'}
                  fontFamily={R.fonts.BeVietnamProMedium}
                  fontSize="xs">
                  Số giờ làm thêm: {item?.soGioLamThem || ''}
                </Text>
                <Text
                  color={'white'}
                  fontFamily={R.fonts.BeVietnamProMedium}
                  fontSize="xs">
                  Nội dung công việc: {item?.congViecLamThem || ''}
                </Text>
              </ContainerCard>
            </Box>
          </HStack>
        );
      })}
    </Box>
  );
};

export default ListEvent;
const ContainerCard = ({
  children,
  onPress,
  borderColor,
  borderLeftWidth,
  backgroundColor,
  borderRadius,
  disable = false,
}: {
  children: any;
  onPress?: () => void;
  borderColor: string;
  borderLeftWidth?: number;
  borderRadius?: string;
  backgroundColor?: string;
  disable?: boolean;
}) => {
  return (
    <Pressable
      disabled={disable}
      _pressed={R.themes.pressed}
      backgroundColor={backgroundColor || 'white'}
      paddingX={WIDTH(12)}
      paddingY={HEIGHT(8)}
      borderRadius={borderRadius}
      zIndex={10}
      borderLeftWidth={borderLeftWidth ?? WIDTH(3.5)}
      alignSelf={'flex-end'}
      onPress={onPress}
      borderColor={borderColor}
      w={WIDTH(290)}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  textNgay: {
    fontFamily: R.fonts.BeVietnamProSemiBold,
    lineHeight: getLineHeight(20),
    fontSize: getFontSize(16),
  },
});

const TextTime = ({ day }: { day: string }) => {
  return (
    <Text
      fontSize={'sm'}
      fontFamily={R.fonts.BeVietnamProRegular}
      marginRight={WIDTH(4)}
      justifyContent="center"
      alignItems="center">
      {day}
    </Text>
  );
};

const TextNgay = ({ visible, day }: { visible: boolean; day: string }) => {
  if (visible) {
    return (
      <Text
        fontSize={'xs'}
        fontFamily={R.fonts.BeVietnamProRegular}
        marginRight={WIDTH(4)}
        color="gray.500"
        justifyContent="center"
        alignItems="center">
        {day}
      </Text>
    );
  }

  return null;
};
