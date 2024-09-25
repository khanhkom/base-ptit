/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import { Box, CheckIcon, Select, Text } from 'native-base';

const ItemTaiSanKiemKe = (props: any) => {
  const { item, listTinhTrang, onChange } = props;

  const onChangeItem = itemPicker => {
    onChange(itemPicker, item?._id);
  };

  return (
    <Box
      alignSelf="center"
      paddingY={HEIGHT(12)}
      paddingX={WIDTH(16)}
      width={WIDTH(343)}
      backgroundColor="white"
      marginBottom={HEIGHT(12)}
      style={R.themes.shadowOffset}
      borderRadius={WIDTH(8)}>
      <Text
        flex={1}
        fontFamily={R.fonts.BeVietnamProMedium}
        fontSize={'sm'}
        color={'black'}
        numberOfLines={3}>
        {item?.taiSan?.ten || ''}
        {item?.maTaiSan ? ` (${item?.maTaiSan})` : ''}
      </Text>
      <Text
        marginTop={HEIGHT(4)}
        fontFamily={R.fonts.BeVietnamProRegular}
        mb={'2'}
        fontSize="xs">
        Tình trạng hiện tại:
      </Text>
      <Select
        placeholder={'Chọn tình trạng hiện tại'}
        _selectedItem={{
          bg: 'teal.600',
          endIcon: <CheckIcon size="5" />,
        }}
        mt={0}
        height={HEIGHT(40)}
        justifyContent={'flex-start'}
        defaultValue={item?.maTinhTrangSuDung}
        onValueChange={onChangeItem}>
        {listTinhTrang?.map(item => {
          return (
            <Select.Item
              fontSize={16}
              label={item?.label}
              value={item?.value}
            />
          );
        })}
      </Select>
    </Box>
  );
};

export default ItemTaiSanKiemKe;
