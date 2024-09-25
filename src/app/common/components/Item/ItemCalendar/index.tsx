import React from 'react';

import R from '@assets/R';
import { LOAI_SU_KIEN, MapTenLoaiSuKien } from '@config/constant';
import { getFontSize, HEIGHT, WIDTH } from '@config/function';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { HStack, Pressable, Text, useTheme, VStack } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';

interface Props {
  timeStart: Date | undefined;
  timeEnd: Date | undefined;
  onPress: () => void;
  loaiLich: string;
  diaDiem: string | undefined;
  noiDung: string | undefined;
  color: string | undefined;
  titleLTHV?: string;
  home?: boolean;
}
const ItemCalendar = (props: Props) => {
  const {
    timeStart,
    timeEnd,
    diaDiem,
    titleLTHV,
    onPress,
    loaiLich,
    noiDung,
    color,
    home,
  } = props;

  const ngayBatDau = timeStart ? moment(timeStart).format('DD/MM') : '--';

  const ngayKetThuc = timeEnd ? moment(timeEnd).format('DD/MM') : '--';

  const hasNgay = !!timeStart && !!timeEnd && ngayBatDau !== ngayKetThuc;

  const theme = useTheme();

  return (
    <HStack marginTop={HEIGHT(16)} justifyContent={'space-between'}>
      <VStack mr={'1'} minW={WIDTH(40)}>
        <TextTime
          visible={!!timeStart}
          day={moment(timeStart).format('HH:mm')}
        />
        <TextNgay visible={hasNgay} day={ngayBatDau} />

        <TextTime visible={!!timeEnd} day={moment(timeEnd).format('HH:mm')} />
        <TextNgay visible={!!home && !hasNgay} day={ngayBatDau} />
        <TextNgay visible={hasNgay} day={ngayKetThuc} />
      </VStack>
      <Pressable
        _pressed={R.themes.pressed}
        style={R.themes.shadowOffset}
        backgroundColor={'white'}
        px={WIDTH(12)}
        py={HEIGHT(8)}
        zIndex={10}
        borderLeftWidth={WIDTH(3.5)}
        alignSelf={'flex-end'}
        onPress={onPress}
        borderColor={color}
        w={WIDTH(290)}>
        <Text
          fontFamily={R.fonts.BeVietnamProMedium}
          fontSize={getFontSize(12)}
          color={
            loaiLich === LOAI_SU_KIEN.LICH_LAM_VIEC_TUAN ? 'black' : color
          }>
          {loaiLich === LOAI_SU_KIEN.LICH_LAM_VIEC_TUAN
            ? titleLTHV
            : MapTenLoaiSuKien?.[loaiLich]}
        </Text>
        <Text
          mt={HEIGHT(4)}
          color={noiDung ? 'black' : '#B9B9B9'}
          fontFamily={R.fonts.BeVietnamProMedium}
          fontSize={getFontSize(14)}>
          {noiDung ? `${noiDung}` : <TextChuaCapNhat />}
        </Text>
        <HStack mt={HEIGHT(8)} alignItems="center">
          <Icon
            size={WIDTH(10)}
            name="location-pin"
            color={diaDiem ? theme.colors.black : '#B9B9B9'}
          />
          <Text
            flex={1}
            ml={WIDTH(6)}
            fontSize={getFontSize(11)}
            fontFamily={R.fonts.BeVietnamProRegular}
            color={'black'}
            numberOfLines={1}>
            {diaDiem ? `${diaDiem}` : <TextChuaCapNhat />}
          </Text>
        </HStack>
      </Pressable>
    </HStack>
  );
};

export default ItemCalendar;
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

const TextTime = ({ day, visible }: { day: string; visible: boolean }) => {
  if (visible) {
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
  }

  return null;
};

const TextChuaCapNhat = ({ size }: { size?: number }) => {
  return (
    <Text
      fontFamily={R.fonts.BeVietnamProRegular}
      fontSize={size}
      fontStyle="italic"
      color={'#B9B9B9'}>
      {translate('slink:Chua_cap_nhat')}
    </Text>
  );
};
