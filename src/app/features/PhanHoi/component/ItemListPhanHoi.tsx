import React from 'react';
import { StyleSheet, View } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Badge, Box, Pressable, Text } from 'native-base';

const ItemListPhanHoi = (props: { item: any; onNavigate?: any }) => {
  const { item, onNavigate } = props;
  return (
    <Pressable
      width={WIDTH(343)}
      marginBottom={HEIGHT(12)}
      alignSelf="center"
      hitSlop={R.themes.hitSlop}
      _pressed={R.themes.pressed}
      onPress={() => onNavigate && onNavigate()}
      backgroundColor={R.colors.white}
      paddingTop={HEIGHT(12)}
      paddingBottom={HEIGHT(12)}
      borderRadius={WIDTH(8)}
      paddingLeft={WIDTH(16)}
      paddingRight={WIDTH(16)}
      style={R.themes.shadowOffset}>
      <View style={styles.contentLeft}>
        <Text
          flex={1}
          fontFamily={R.fonts.BeVietnamProMedium}
          fontSize={'sm'}
          color={'black'}
          numberOfLines={2}>
          {item.noiDungPhanHoi ?? ''}
        </Text>
        {!!item?.tenChuyenVien && (
          <Text
            color={'gray.500'}
            fontSize="xs"
            fontFamily={R.fonts.BeVietnamProRegular}
            marginTop={HEIGHT(8)}>
            {translate('slink:Respondent', {
              user: item?.tenChuyenVien || '--',
            })}
          </Text>
        )}
        <Box
          alignItems="flex-end"
          flexDirection="row"
          justifyContent="space-between"
          marginTop={HEIGHT(8)}>
          <Text
            color={'gray.500'}
            fontSize="xs"
            fontFamily={R.fonts.BeVietnamProRegular}>
            {moment(item?.createdAt).format('HH:mm  DD/MM/YYYY')}
          </Text>
          <Status check={item?.daTraLoiPhanHoi} />
        </Box>
      </View>
    </Pressable>
  );
};

export default ItemListPhanHoi;
const Status = ({ check }: { check: boolean }) => {
  return (
    <Badge colorScheme={check ? 'success' : 'error'}>
      {check ? translate('slink:Ans') : translate('slink:Not_ans')}
    </Badge>
  );
};

const styles = StyleSheet.create({
  viewInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  itemNavStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    minHeight: HEIGHT(60),
    paddingVertical: HEIGHT(12),
    paddingHorizontal: WIDTH(16),
    width: WIDTH(343),
    backgroundColor: R.colors.white,
    marginBottom: HEIGHT(12),
    borderRadius: WIDTH(8),
  },
  twoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: WIDTH(311),
    marginTop: HEIGHT(4),
  },
  contentLeft: {
    justifyContent: 'flex-start',
  },
  textNav: {
    fontSize: getFontSize(14),
    color: R.colors.black0,
    lineHeight: getLineHeight(18),
    marginBottom: HEIGHT(8),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  textType: {
    fontSize: getFontSize(12),
    flex: 1,
    color: R.colors.gray6B,
    lineHeight: getLineHeight(18),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
  textInfo: {
    fontSize: getFontSize(12),
    color: R.colors.gray6B,
    lineHeight: getLineHeight(18),
    fontFamily: R.fonts.BeVietnamProMedium,
  },
});
