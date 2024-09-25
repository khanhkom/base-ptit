/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unstable-nested-components */

/* eslint-disable react/react-in-jsx-scope */
import { ReactNode } from 'react';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Badge, HStack, Pressable, Text, useTheme, VStack } from 'native-base';

import styles from '../styles';

enum TrangThaiThamGiaColor {
  'Xác nhận' = 'green',
  'Chưa xác nhận' = 'yellow',
  'Từ chối' = 'red',
}
const ItemSuKienDaThamGia = (props: any) => {
  const { item, showModal } = props;

  const theme = useTheme();

  const getBgColor = (status: string) => {
    switch (status) {
      case 'Đang diễn ra':
        return theme.colors.blue[400];
      case 'Chưa diễn ra':
        return theme.colors.yellow[400];
      case 'Đã diễn ra':
        return theme.colors.green[400];

      default:
        return theme.colors.blue[400];
    }
  };

  const ItemLich = () => {
    const ngayBD = moment(item?.suKien?.thoiGianBatDau).format('DD/MM');

    const ngayKT = moment(item?.suKien?.thoiGianKetThuc).format('DD/MM');

    const hasNgayKT = ngayBD !== ngayKT;

    const timeBD = moment(item?.suKien?.thoiGianBatDau).format('HH:mm');

    const timeKT = moment(item?.suKien?.thoiGianKetThuc).format('HH:mm');

    return (
      <HStack marginTop={HEIGHT(8)}>
        <VStack mr={'2'} minW={WIDTH(40)}>
          <TextNgay visible={true} day={ngayBD} />
          <TextTime day={timeBD} />
          <TextNgay visible={hasNgayKT} day={ngayKT} />
          <TextTime day={timeKT} />
        </VStack>
        <ContainerCard
          onPress={showModal}
          borderColor={getBgColor(item?.dataSuKien?.trangThai)}>
          {item?.trangThaiThamGia && (
            <Badge
              alignSelf={'flex-start'}
              mb={'1'}
              colorScheme={TrangThaiThamGiaColor?.[item?.trangThaiThamGia]}>
              {item?.trangThaiThamGia === 'Chưa xác nhận'
                ? 'Chờ phòng công tác sinh viên xác nhận'
                : item?.trangThaiThamGia}
            </Badge>
          )}
          <Title
            color={getBgColor(item?.dataSuKien?.trangThai)}
            value={item?.suKien?.loaiSuKien}
          />
          <Text style={styles.tenSK}>{item?.suKien?.tenSuKien}</Text>
        </ContainerCard>
      </HStack>
    );
  };

  return <ItemLich />;
};

export default ItemSuKienDaThamGia;
const TextNgay = ({ visible, day }: { visible: boolean; day: string }) => {
  if (visible) {
    return (
      <Text
        fontSize={'xs'}
        fontFamily={R.fonts.BeVietnamProRegular}
        color="gray.500">
        {day}
      </Text>
    );
  }

  return null;
};

const TextTime = ({ day }: { day: string }) => {
  return (
    <Text
      fontSize={'sm'}
      color="black"
      fontFamily={R.fonts.BeVietnamProRegular}>
      {day}
    </Text>
  );
};

const ContainerCard = ({
  children,
  onPress,
  borderColor,
  borderLeftWidth,
  backgroundColor,
  borderRadius,
  disable = false,
}: {
  children: ReactNode;
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

const Title = ({ color, value }: { color: string; value: string }) => {
  return (
    <Text fontFamily={R.fonts.BeVietnamProMedium} fontSize={'sm'} color={color}>
      {value || translate('slink:Chua_cap_nhat')}
    </Text>
  );
};
