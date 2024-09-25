import { Box, Collapse, HStack, Pressable, Text } from 'native-base';
import React, { useState } from 'react';
import R from '@assets/R';
import HeaderReal from '@libcomponents/header-real';
import ColorPickerComponent from './SelectColor';
import {
  dispatch,
  HEIGHT,
  LIST_LICH_GV,
  LIST_LICH_SV,
  MapTenLoaiSuKien,
  WIDTH,
} from '@common';
import { selectAppConfig } from '@redux-selector/app';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import BaseButtonNB from '@components/BaseButtonNB';
import { translate } from '@utils/i18n/translate';
import { appActions } from '@redux-slice';
import {
  getSettingLich,
  postSettingLich,
  putSettingLich,
} from '@networking/user/SettingLich';

const ChangeColorCalendar = () => {
  const { account } = useSelector(selectAppConfig);
  const [visibleSelectColor, setvisibleSelectColor] = useState(false);
  const [loaiLichSelect, setloaiLichSelect] = useState('');
  const { colorCalendar } = useSelector(selectAppConfig);
  const [listMauTitle, setlistMauTitle] = useState(colorCalendar);
  const colorSetting = listMauTitle?.reduce((acc, item) => {
    acc[item.loaiLich] = item.maMau;
    return acc;
  }, {});
  const LIST_LICH = account?.isGiaoVien ? LIST_LICH_GV : LIST_LICH_SV;
  const onPress = (item: string) => {
    setloaiLichSelect(item);
    setvisibleSelectColor(true);
  };
  const onChange = (color: string) => {
    const bodyMau =
      listMauTitle?.map(item => {
        if (item?.loaiLich === loaiLichSelect) {
          return { loaiLich: loaiLichSelect, maMau: color };
        }
        return item;
      }) || [];
    setlistMauTitle(bodyMau);
  };
  const onSave = async () => {
    try {
      const responseSettingLich = await getSettingLich();
      const id = responseSettingLich?.data?.data?.result[0]?._id;
      const body = {
        danhSachSettingLich: listMauTitle,
        hoTen: account?.hoTen || '',
        maCanBo: account?.maCanBo || '',
        ssoId: account?.ssoId || '',
      };
      let capNhatMau: any;

      if (id) {
        capNhatMau = await putSettingLich(id, body);
      } else {
        capNhatMau = await postSettingLich(body);
      }
      if (capNhatMau?.status) {
        dispatch(appActions.setColorCalendar(listMauTitle));
        setloaiLichSelect('');
        setvisibleSelectColor(false);
      }
    } catch (error) {}
  };
  return (
    <Box flex={1} backgroundColor={'white'}>
      <HeaderReal title={translate('slink:Thiet_lap_mau_lich')} />
      {LIST_LICH?.map((item, index) => {
        return (
          <Pressable
            key={index}
            py={HEIGHT(16)}
            onPress={() => onPress(item)}
            alignItems={'center'}
            flexDir="row"
            backgroundColor={
              loaiLichSelect === item ? 'primary.100' : undefined
            }
            justifyContent="space-between"
            px={WIDTH(16)}
            borderWidth={0.5}
            borderColor="rgba(171, 171, 171, 0.4)">
            <HStack alignItems={'center'}>
              <Box
                borderWidth={0.5}
                height={WIDTH(24)}
                borderColor="gray.300"
                width={WIDTH(40)}
                backgroundColor={colorSetting?.[item]}></Box>
              <Text
                ml={WIDTH(16)}
                fontFamily={R.fonts.BeVietnamProMedium}
                fontSize={'md'}
                color="black">
                {MapTenLoaiSuKien?.[item]}
              </Text>
            </HStack>
            <Box
              height={WIDTH(24)}
              width={WIDTH(24)}
              justifyContent="center"
              alignItems="center">
              <Icon name="chevron-right" size={WIDTH(24)} color={'#848A95'} />
            </Box>
          </Pressable>
        );
      })}
      <Collapse
        pt={HEIGHT(24)}
        alignItems={'center'}
        isOpen={visibleSelectColor}>
        <ColorPickerComponent
          onChangeColor={onChange}
          defaultValue={colorSetting?.[loaiLichSelect]}
        />
      </Collapse>
      <BaseButtonNB
        isDisabled={!visibleSelectColor}
        isLoadingText={translate('slink:Loading')}
        width={WIDTH(140)}
        title={translate('slink:Save')}
        onPress={onSave}
      />
    </Box>
  );
};

export default ChangeColorCalendar;
