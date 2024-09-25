/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import ItemIconSVG from '@libcomponents/icon-svg';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Badge, Box, HStack, Pressable, Text } from 'native-base';

const ItemPhanHoi = (props: any) => {
  const { onPress, data } = props;

  const title = `${data?.hoTen} (${data?.maSinhVien})`;

  const onClick = () => {
    onPress?.(data, title);
  };

  return (
    <Pressable
      mt={'4'}
      width={WIDTH(343)}
      marginBottom={HEIGHT(12)}
      alignSelf="center"
      backgroundColor={R.colors.white}
      paddingTop={HEIGHT(12)}
      paddingBottom={HEIGHT(12)}
      borderRadius={WIDTH(8)}
      paddingLeft={WIDTH(16)}
      paddingRight={WIDTH(16)}
      style={[R.themes.shadowOffset]}
      onPress={onClick}>
      <ViewTieuDe title={title} diemDanh={data?.trangThai} />
      <Text
        flexDirection="row"
        alignItems="center"
        fontSize="xs"
        fontFamily={R.fonts.BeVietnamProRegular}
        mb="1">
        {data?.noiDungTraLoi}
      </Text>
      <HStack alignItems={'center'} mt="2">
        <ItemIconSVG
          title={translate('slink:time')}
          color={R.colors.black0}
          width={WIDTH(12)}
          height={WIDTH(12)}
        />
        <Text
          fontFamily={R.fonts.BeVietnamProRegular}
          fontSize="xs"
          color="black"
          marginLeft="1">
          {data?.updatedAt
            ? moment(data?.updatedAt).format('HH:mm DD/MM/YYYY')
            : '--'}
        </Text>
      </HStack>
    </Pressable>
  );
};

export default ItemPhanHoi;
const ViewTieuDe = ({
  title,
  diemDanh,
}: {
  title: string;
  diemDanh: string;
}) => {
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      marginBottom={HEIGHT(8)}>
      <Text
        flex={1}
        fontFamily={R.fonts.BeVietnamProMedium}
        fontSize={'sm'}
        color={'black'}
        numberOfLines={3}>
        {title}
      </Text>
      <Badge colorScheme={diemDanh === 'DA_NOP' ? 'green' : 'red'}>
        {diemDanh === 'DA_NOP' ? 'Đã nộp' : 'Chưa nộp'}
      </Badge>
    </Box>
  );
};
