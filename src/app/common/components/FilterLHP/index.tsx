/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@config/function';
import { DropDown } from '@libcomponents';
import { RowDropDown } from '@libcomponents/drop-down/type';
import { Box, Text, useTheme, VStack } from 'native-base';
interface Props {
  data: Array<RowDropDown>;
  placeHolder?: string;
  onChange: (item?: any, index?: number | number[]) => void;
  isLast?: boolean;
  label: string;
  visileSubtitle?: boolean;
  subtitle?: string;
  defaultValue?: any;
}
const FilterLHP = (props: Props) => {
  const theme = useTheme();

  const {
    data,
    placeHolder,
    onChange,
    isLast,
    label,
    visileSubtitle,
    subtitle,
    defaultValue,
  } = props;

  return (
    <Box
      borderBottomWidth={isLast ? 0 : 1}
      borderColor={'gray.200'}
      backgroundColor="white"
      flexDirection="row"
      alignItems={'center'}
      justifyContent="space-between"
      paddingTop={HEIGHT(16)}
      paddingBottom={HEIGHT(16)}>
      <VStack>
        <Text
          fontSize={'sm'}
          color={'black'}
          fontFamily={R.fonts.BeVietnamProRegular}>
          {label || ''}
        </Text>
        {visileSubtitle && (
          <Text color={R.colors.blueLight} fontSize="xs" marginTop={HEIGHT(4)}>
            {subtitle}
          </Text>
        )}
      </VStack>
      <DropDown
        data={data || []}
        defaultValue={defaultValue ?? data?.[0]?.value}
        style={styles.dropdown}
        placeholderStyle={styles.textInfo}
        disabled={data?.length === 0}
        placeHolder={placeHolder}
        arrowColor={theme.colors.gray[400]}
        containerStyle={styles.containerStyle}
        onChangeItem={onChange}
      />
    </Box>
  );
};

export default FilterLHP;

const styles = StyleSheet.create({
  dropdown: { alignItems: 'flex-end', minWidth: WIDTH(120) },
  containerStyle: {
    height: HEIGHT(36),
  },
  textInfo: {
    flex: 0,
    fontSize: getFontSize(14),
    color: R.colors.gray6B,
    lineHeight: getLineHeight(18),
    textAlign: 'right',
    fontFamily: R.fonts.BeVietnamProRegular,
  },
});
