/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';

import R from '@assets/R';
import { WIDTH } from '@common';
import AddPlus from '@components/AddPlus';
import HeaderReal from '@libcomponents/header-real';
import {
  goBack,
  navigateScreen,
  resetScreen,
} from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import {
  Actionsheet,
  Box,
  Center,
  HStack,
  Pressable,
  Text,
  useDisclose,
  useTheme,
} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colorLoaiDoiTuongChuTri, LoaiDoiTuongChuTri } from './constant';
import CalendarWeek from './Tab/CalendarWeek';

const LichTuanHocVien = (props: any) => {
  const isFromOutside = props.route.params?.isFromOutside;

  const theme = useTheme();

  const [type, settype] = useState(LoaiDoiTuongChuTri.TAT_CA);

  const [dateCur, setDateCur] = useState();

  const handleBackPress = () => {
    if (isFromOutside && !_.isUndefined(isFromOutside)) {
      resetScreen(APP_SCREEN.TABMAIN);
    } else {
      goBack();
    }

    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const onChangeType = (item: LoaiDoiTuongChuTri) => {
    settype(item);
  };

  return (
    <Box flex={1} backgroundColor="white">
      <HeaderReal
        title={translate('slink:Academy_weekly_calender')}
        childrenRight={<ViewFilter onChangeType={onChangeType} />}
      />
      <CalendarWeek type={type} setDateCur={setDateCur} />
      <AddPlus
        onAdd={() =>
          navigateScreen(APP_SCREEN.DANHSACHDONXINNGHI, { curDate: dateCur })
        }
        customIcon={
          <Ionicons
            size={WIDTH(22)}
            name={'calendar-sharp'}
            color={theme.colors.white}
          />
        }
      />
    </Box>
  );
};

export default LichTuanHocVien;
const ViewFilter = (props: {
  onChangeType: (e: LoaiDoiTuongChuTri) => void;
}) => {
  const { onChangeType } = props;

  const { isOpen, onOpen, onClose } = useDisclose();

  const LIST_FILTER = _.values(LoaiDoiTuongChuTri);

  const [value, setvalue] = useState(LIST_FILTER[0]);

  const onSelect = (item: LoaiDoiTuongChuTri) => {
    setvalue(item);

    onChangeType(item);

    onClose();
  };

  return (
    <Center>
      <Pressable _pressed={R.themes.pressed} onPress={onOpen}>
        <Icon name="filter" size={WIDTH(24)} color={'white'} />
      </Pressable>
      <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Content>
          {LIST_FILTER?.map(item => (
            <Actionsheet.Item
              key={item}
              backgroundColor={value === item ? 'primary.500' : undefined}
              onPress={() => onSelect(item)}>
              <HStack alignItems={'center'}>
                <Box
                  height={WIDTH(8)}
                  width={WIDTH(8)}
                  backgroundColor={colorLoaiDoiTuongChuTri?.[item]}
                />
                <Text
                  fontSize={'sm'}
                  color={item === value ? 'white' : 'black'}
                  fontFamily={R.fonts.BeVietnamProMedium}
                  ml={'4'}>
                  {item}
                </Text>
              </HStack>
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
};
