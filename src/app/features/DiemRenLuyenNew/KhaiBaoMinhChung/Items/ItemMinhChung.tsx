import React from 'react';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import ItemIconSVG from '@libcomponents/icon-svg';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { Box, Pressable, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';

const ItemMinhChung = ({ item }) => {
  return (
    <Pressable
      w={WIDTH(343)}
      alignSelf={'center'}
      hitSlop={R.themes.hitSlop}
      marginBottom={HEIGHT(16)}
      backgroundColor={R.colors.white}
      paddingTop={HEIGHT(16)}
      paddingBottom={HEIGHT(16)}
      borderRadius={WIDTH(8)}
      paddingRight={WIDTH(16)}
      paddingLeft={WIDTH(16)}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      style={[R.themes.shadowOffset]}
      onPress={() => {
        navigateScreen(APP_SCREEN.DANHSACHMINHCHUNG, { item: item });
      }}>
      <Box alignItems={'center'} flexDirection={'row'}>
        <ItemIconSVG
          title={String('Đơn điểm rèn luyện')}
          color={R.colors.primaryColor}
          width={WIDTH(21)}
          height={WIDTH(21)}
        />
        <Text
          fontSize={'md'}
          ml="3"
          fontFamily={R.fonts.BeVietnamProMedium}
          numberOfLines={2}
          textAlign={'justify'}
          maxW={WIDTH(240)}>
          {item?.tenMinhChung}
        </Text>
      </Box>
      <Icon name="chevron-right" size={WIDTH(24)} color={'#848A95'} />
    </Pressable>
  );
};

export default ItemMinhChung;
