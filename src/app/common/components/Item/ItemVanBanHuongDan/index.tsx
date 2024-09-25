import React from 'react';

import { useSelector } from 'react-redux';

import R from '@assets/R';
import { EDaLuu, MapKeyDaLuu } from '@config/constant';
import { getFontSize, HEIGHT, showLink, WIDTH } from '@config/function';
import { DEFAULT_MOST_USED_FUNCTION_CONFIG } from '@config/module';
import { deleteItemSaved, saveItem } from '@networking/user/DaLuu';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import { Box, HStack, Pressable, Text, VStack } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

import BadgeCustome from '../Badge';
import TextSaved from '../TextSaved';

interface VBHDProps {
  ten: string;
  url: string;
  _id: string;
}
interface Props {
  item: VBHDProps;
  index: number;
  isSaved: boolean;
  idSaved: string;
  onRefresh?: () => void;
}
const ItemVanBanHuongDan = (props: Props) => {
  const { item, index, isSaved, idSaved, onRefresh } = props;

  const isHasSave = DEFAULT_MOST_USED_FUNCTION_CONFIG?.includes(
    translate('slink:Saved'),
  );

  const onDetail = () => showLink(item?.url);

  const { account } = useSelector(selectAppConfig);

  const onSaved = async () => {
    try {
      let response: any;
      if (isSaved) {
        response = await deleteItemSaved(idSaved);
      } else {
        const body = {
          loaiThongTin: MapKeyDaLuu[EDaLuu.VBHD],
          sourceId: item?._id,
          thongTin: item,
          userSsoId: account?.ssoId,
        };

        response = await saveItem(body);
      }

      if (response?.status) {
        onRefresh && onRefresh();
      }
    } catch (error) {}
  };

  return (
    <Pressable
      _pressed={R.themes.pressed}
      backgroundColor={'white'}
      w={WIDTH(164)}
      px={WIDTH(14)}
      py={HEIGHT(16)}
      mb={HEIGHT(16)}
      borderRadius={WIDTH(8)}
      onPress={onDetail}
      justifyContent={'space-between'}
      style={R.themes.shadowOffset}>
      <VStack>
        <HStack justifyContent={'space-between'} alignItems="flex-start">
          <BadgeCustome value={`${index + 1}`} />
          <TextSaved visible={isHasSave} isSaved={isSaved} onPress={onSaved} />
        </HStack>
        <Text
          numberOfLines={4}
          fontFamily={R.fonts.BeVietnamProSemiBold}
          fontSize={'md'}
          color="black">
          {item?.ten || '--'}
        </Text>
      </VStack>
      <ViewTep />
    </Pressable>
  );
};

export default ItemVanBanHuongDan;
const ViewTep = () => {
  return (
    <HStack
      justifyContent={'space-between'}
      alignItems="center"
      mt={HEIGHT(20)}
      paddingTop={HEIGHT(20)}
      borderTopWidth={1}
      borderColor={'gray.200'}>
      <Text
        color="rgba(0, 132, 255, 1)"
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize={'xs'}
        textDecorationLine="underline">
        {translate('slink:Xem_tep_dinh_kem')}
      </Text>
      <AntDesign
        size={WIDTH(12)}
        name={'arrowright'}
        color={'rgba(0, 132, 255, 1)'}
      />
    </HStack>
  );
};
