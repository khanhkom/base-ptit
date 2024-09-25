/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';
import FlatlistItem from '@features/TabMain/Item/FlatListItem';
import HeaderReal from '@libcomponents/header-real';
import ItemIconSVG from '@libcomponents/icon-svg';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getQuyenDanhGia } from '@networking/user/DanhGiaNhanSu';
import { translate } from '@utils/i18n/translate';
import { Box, Collapse, HStack, Pressable, Text, VStack } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';

const listFunc = [
  { title: translate('slink:HR_records') },
  { title: translate('slink:Contract') },
  { title: translate('slink:Process_sending_for_training') },
  { title: translate('slink:Process_sending_for_business_trip') },
  { title: translate('slink:Asset_declaration') },
  { title: translate('slink:Attendance_sheet') },
  { title: translate('slink:Ot_table') },
];

const ToChucNhanSu = () => {
  const onCaNhan = () => {
    navigateScreen(APP_SCREEN.DANHGIACANHAN);
  };

  const onDonVi = () => {
    navigateScreen(APP_SCREEN.DANHGIADONVI);
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Personnel_organization')} />
      <FlatlistItem
        data={listFunc}
        ListFooterComponent={
          <ButtonThiDua onCaNhan={onCaNhan} onDonVi={onDonVi} />
        }
      />
    </Box>
  );
};

export default ToChucNhanSu;
interface ThiDuaProps {
  onCaNhan: () => void;
  onDonVi: () => void;
}
const ButtonThiDua = (props: ThiDuaProps) => {
  const { onCaNhan, onDonVi } = props;

  const [expand, setexpand] = useState(false);

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    getAuth();
  }, []);

  const getAuth = async () => {
    const res: any = await getQuyenDanhGia();

    setIsAuth(res?.data?.data?.quyenDanhGia ?? false);
  };

  const onPress = () => {
    if (isAuth) {
      setexpand(!expand);
    } else {
      onCaNhan();
    }
  };

  return (
    <VStack
      style={R.themes.shadowOffset}
      borderRadius={WIDTH(8)}
      paddingY={HEIGHT(16)}
      paddingX={WIDTH(16)}
      overflow="hidden"
      backgroundColor={R.colors.white}>
      <Pressable
        onPress={onPress}
        _pressed={R.themes.pressed}
        hitSlop={R.themes.hitSlop}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <HStack alignItems="center" flex={1}>
          <ItemIconSVG
            title={translate('slink:Emulation_and_Reward')}
            color={R.colors.primaryColor}
            width={WIDTH(21)}
            height={WIDTH(21)}
          />
          <Text
            marginLeft={WIDTH(16)}
            fontFamily={R.fonts.BeVietnamProMedium}
            fontSize={getFontSize(16)}
            color={R.colors.black0}>
            {translate('slink:Emulation_and_Reward')}
          </Text>
        </HStack>
        <Icon
          name={
            isAuth ? (expand ? 'chevron-up' : 'chevron-right') : 'chevron-right'
          }
          size={WIDTH(24)}
          color={'#848A95'}
        />
      </Pressable>
      <Collapse isOpen={expand}>
        <Pressable
          onPress={onCaNhan}
          _pressed={R.themes.pressed}
          hitSlop={R.themes.hitSlop}
          mt="4"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <HStack paddingLeft={WIDTH(16)} alignItems="center" flex={1}>
            <ItemIconSVG
              title={translate('slink:Personal_review')}
              color={R.colors.primaryColor}
              width={WIDTH(21)}
              height={WIDTH(21)}
            />
            <Text
              marginLeft={WIDTH(16)}
              fontFamily={R.fonts.BeVietnamProRegular}
              fontSize={'sm'}
              color={R.colors.black0}>
              {translate('slink:Personal_review')}
            </Text>
          </HStack>
          <Icon name="chevron-right" size={WIDTH(24)} color={'#848A95'} />
        </Pressable>
        <Pressable
          onPress={onDonVi}
          _pressed={R.themes.pressed}
          hitSlop={R.themes.hitSlop}
          mt="4"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <HStack paddingLeft={WIDTH(16)} alignItems="center" flex={1}>
            <ItemIconSVG
              title={translate('slink:In-unit_evaluation')}
              color={R.colors.primaryColor}
              width={WIDTH(21)}
              height={WIDTH(21)}
            />
            <Text
              marginLeft={WIDTH(16)}
              fontFamily={R.fonts.BeVietnamProRegular}
              fontSize={'sm'}
              color={R.colors.black0}>
              {translate('slink:In-unit_evaluation')}
            </Text>
          </HStack>
          <Icon name="chevron-right" size={WIDTH(24)} color={'#848A95'} />
        </Pressable>
      </Collapse>
    </VStack>
  );
};
