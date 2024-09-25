import { HStack, Pressable, Text, useTheme, VStack } from 'native-base';
import R from '@assets/R';
import SelectHocKy from '@components/SelectHocKy';
import { HEIGHT, WIDTH } from '@common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { translate } from '@utils/i18n/translate';
import { DotDangKyTCProps } from '../type';
import moment from 'moment';
import { HocKyProps } from '@components/SelectHocKy/type';
interface Props {
  onPress: () => void;
  onChangeObject?: (e: HocKyProps | undefined) => void;
  dotDangKyTC: DotDangKyTCProps | undefined;
}
const ChangeSemester = (props: Props) => {
  const { onChangeObject, dotDangKyTC, onPress } = props;
  const theme = useTheme();
  const isVisible =
    !!dotDangKyTC?.thoiGianBatDau && !!dotDangKyTC?.thoiGianKetThuc;
  return (
    <VStack px={WIDTH(16)}>
      <HStack justifyContent="space-between" alignItems={'center'}>
        <SelectHocKy
          onChangeObject={onChangeObject}
          marginBottom={0}
          width={WIDTH(300)}
        />
        <Pressable onPress={onPress} _pressed={R.themes.pressed}>
          <AntDesign
            size={WIDTH(18)}
            name={'infocirlceo'}
            color={theme.colors.primary[500]}
          />
        </Pressable>
      </HStack>
      {isVisible && (
        <Text
          mt={HEIGHT(4)}
          color="green.600"
          fontSize={'xs'}
          fontFamily={R.fonts.BeVietnamProRegular}>
          {translate('slink:From')}{' '}
          <Text fontFamily={R.fonts.BeVietnamProMedium}>
            {moment(dotDangKyTC?.thoiGianBatDau).format('HH:mm DD/MM/YYYY')}
          </Text>{' '}
          {translate('slink:To')}{' '}
          <Text fontFamily={R.fonts.BeVietnamProMedium}>
            {' '}
            {moment(dotDangKyTC?.thoiGianKetThuc).format('HH:mm DD/MM/YYYY')}
          </Text>
        </Text>
      )}
    </VStack>
  );
};

export default ChangeSemester;
