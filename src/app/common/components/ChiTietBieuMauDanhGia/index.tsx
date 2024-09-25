/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Box, HStack, Skeleton, Text, VStack } from 'native-base';

import RenderItemServey from './RenderItem';
import { styles } from './styles';
import { KhoiProps } from './type';
interface Props {
  data: KhoiProps;
  initKetQua: any;
  disabled?: boolean;
  needsExpensive?: boolean;
}
const ChiTietBieuMauDanhGia = (props: Props) => {
  const { data, initKetQua, disabled, needsExpensive = true } = props;

  return (
    <Box style={styles.viewBox}>
      <TieuDeBox
        isLoaded={needsExpensive}
        title={data?.tieuDe}
        subTitle={data?.moTa}
      />
      {/* {needsExpensive && */}
      {data?.danhSachCauHoi?.map((item, index) => (
        <RenderItemServey
          initKetQua={initKetQua}
          item={item}
          disabled={disabled}
          index={index}
        />
      ))}
      {/* ))} */}
    </Box>
  );
};

export default ChiTietBieuMauDanhGia;
interface TieuDeProps {
  title: string | undefined;
  subTitle: string | undefined;
  isLoaded?: boolean;
}
const TieuDeBox = (props: TieuDeProps) => {
  const { title, subTitle, isLoaded } = props;

  if (isLoaded) {
    return (
      <VStack flex={1}>
        {title && <Text style={styles.title}>{title}</Text>}
        {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
      </VStack>
    );
  }

  return (
    <VStack flex="3" space="4">
      <Skeleton startColor="gray.300" />
      <Skeleton.Text />
      <VStack space="2">
        <HStack space="2" alignItems="center">
          <Skeleton size="5" rounded="full" />
          <Skeleton h="3" flex="2" rounded="full" />
        </HStack>
        <HStack space="2" alignItems="center">
          <Skeleton size="5" rounded="full" />
          <Skeleton h="3" flex="2" rounded="full" />
        </HStack>
        <HStack space="2" alignItems="center">
          <Skeleton size="5" rounded="full" />
          <Skeleton h="3" flex="2" rounded="full" />
        </HStack>
        <HStack space="2" alignItems="center">
          <Skeleton size="5" rounded="full" />
          <Skeleton h="3" flex="2" rounded="full" />
        </HStack>
      </VStack>
    </VStack>
  );
};
