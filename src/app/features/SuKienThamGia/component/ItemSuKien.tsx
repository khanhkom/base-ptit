import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import R from '@assets/R';
import { EDaLuu, HEIGHT, MapKeyDaLuu, WIDTH } from '@common';
import TextSaved from '@components/Item/TextSaved';
import { DEFAULT_MOST_USED_FUNCTION_CONFIG } from '@config/module';
import { deleteItemSaved, saveItem } from '@networking/user/DaLuu';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { HStack, Pressable, Text, VStack } from 'native-base';

import ModalDetailSuKien from './ModalDetailSuKien';

import { SuKienMeProps } from '../type';
interface Props {
  data: SuKienMeProps;
  isSaved: boolean;
  idSaved: string;
  onRefresh: () => void;
}
const ItemSuKien = (props: Props) => {
  const [visible, setvisible] = useState(false);

  const isHasSave = DEFAULT_MOST_USED_FUNCTION_CONFIG?.includes(
    translate('slink:Saved'),
  );

  const { data, isSaved, idSaved, onRefresh } = props;

  const { account } = useSelector(selectAppConfig);

  const onSaved = async () => {
    try {
      let response: any;
      if (isSaved) {
        response = await deleteItemSaved(idSaved);
      } else {
        const body = {
          loaiThongTin: MapKeyDaLuu[EDaLuu.SU_KIEN],
          sourceId: data?._id,
          thongTin: data,
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
    <VStack mb={HEIGHT(12)}>
      <Pressable
        onPress={() => setvisible(true)}
        _pressed={R.themes.pressed}
        backgroundColor={'white'}
        paddingX={WIDTH(12)}
        paddingY={HEIGHT(8)}
        borderRadius={WIDTH(8)}
        zIndex={10}
        borderColor={'primary.500'}
        borderLeftWidth={WIDTH(3.5)}
        style={R.themes.shadowOffset}>
        <HStack
          marginBottom={HEIGHT(8)}
          alignItems={'flex-start'}
          justifyContent="space-between">
          <Text
            flex={1}
            color={'black'}
            fontFamily={R.fonts.BeVietnamProMedium}
            fontSize="md">
            {data?.hoatDongCtsv?.phanLoaiCap2 || '--'}
          </Text>
          <TextSaved visible={isHasSave} isSaved={isSaved} onPress={onSaved} />
        </HStack>
        <Text
          color={'black'}
          fontFamily={R.fonts.BeVietnamProMedium}
          fontSize="sm">
          {data?.hoatDongCtsv?.ten || '--'}
        </Text>
        <Text
          mt={HEIGHT(4)}
          color={'gray.500'}
          fontFamily={R.fonts.BeVietnamProMedium}
          fontSize="xs">
          Thời gian:{' '}
          {data?.hoatDongCtsv?.thoiGianBatDau
            ? moment(data?.hoatDongCtsv?.thoiGianBatDau).format(
                'HH:mm DD-MM-YYYY',
              )
            : '--'}
        </Text>
      </Pressable>
      <ModalDetailSuKien
        item={data}
        isVisible={visible}
        closeButton={() => setvisible(false)}
      />
    </VStack>
  );
};

export default ItemSuKien;
