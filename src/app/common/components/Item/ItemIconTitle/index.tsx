import React from 'react';

import R from '@assets/R';
import { getFontSize, WIDTH } from '@config/function';
import ItemIconSVG from '@libcomponents/icon-svg';
import { Box, Skeleton, Text } from 'native-base';

import styles from './styles';

import TextChuaCapNhat from '../TextChuaCapNhat';

const ItemIconTitle = ({
  label,
  content,
  isLoaded = true,
  marginBottom,
}: {
  label: string;
  content?: string | undefined;
  marginBottom?: number;
  isLoaded?: boolean;
}) => {
  return (
    <Box flex={1} marginBottom={marginBottom} style={styles.viewLabel}>
      <Skeleton isLoaded={isLoaded} h="5" w="5">
        <ItemIconSVG
          title={label}
          color={R.colors.primaryColor}
          width={WIDTH(20)}
          height={WIDTH(20)}
        />
      </Skeleton>
      <Skeleton.Text isLoaded={isLoaded} lines={1} ml="4" maxWidth={WIDTH(250)}>
        <Text
          flex={1}
          marginLeft={WIDTH(12)}
          fontSize={getFontSize(14)}
          fontFamily={R.fonts.BeVietnamProMedium}>
          {content ? content : <TextChuaCapNhat />}
        </Text>
      </Skeleton.Text>
    </Box>
  );
};

export default ItemIconTitle;
