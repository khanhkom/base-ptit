import React, { useState } from 'react';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import {
  Box,
  Collapse,
  HStack,
  Pressable,
  Radio,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

const data = [
  'Hoàn thành xuất sắc nhiệm vụ (loại A+, từ 90 - 100 điểm)',
  'Hoàn thành tốt nhiệm vụ (loại A, từ 80 - dưới 90 điểm)',
  'Hoàn thành tốt nhiệm vụ (loại B, từ 70 - dưới 80 điểm)',
  'Hoàn thành nhiệm vụ (loại C, từ 50 - dưới 70 điểm)',
  'Không hoàn thành nhiệm vụ (loại D, dưới 50 điểm)',
];

const MapPoint = (val: number) => {
  if (val < 50) {
    return data?.[4];
  }

  if (val >= 50 && val < 70) {
    return data?.[3];
  }

  if (val >= 70 && val < 80) {
    return data?.[2];
  }

  if (val >= 80 && val < 90) {
    return data?.[1];
  }

  if (val >= 90 && val < 100) {
    return data?.[0];
  }
};

const TuPhanLoai = ({ val, label }: { val: number; label: string }) => {
  const theme = useTheme();

  const [expand, setexpand] = useState(false);

  return (
    <VStack>
      <Pressable onPress={() => setexpand(!expand)}>
        <Box
          backgroundColor={'gray.200'}
          paddingX={WIDTH(16)}
          w="full"
          paddingY={HEIGHT(12)}
          flexDirection={'row'}
          justifyContent={'space-between'}
          my="2">
          <Text
            fontFamily={R.fonts.BeVietnamProMedium}
            fontSize={'sm'}
            lineHeight="lg"
            color={'black'}>
            {label}
          </Text>
          {typeof expand === 'boolean' && (
            <Box alignSelf="center">
              <Entypo
                style={{ marginLeft: WIDTH(16) }}
                color={theme.colors.gray[400]}
                size={WIDTH(20)}
                name={expand ? 'chevron-up' : 'chevron-down'}
              />
            </Box>
          )}
        </Box>
      </Pressable>
      <Collapse isOpen={expand}>
        <Box px={WIDTH(16)}>
          <Radio.Group value={MapPoint(val)} isReadOnly={true} name="Radio">
            {data?.map((item, index) => (
              <HStack key={index} my="1" alignItems={'center'}>
                <Radio isDisabled={true} key={index} size="sm" value={item} />
                <Text
                  ml="2"
                  flex={1}
                  fontFamily={R.fonts.BeVietnamProRegular}
                  fontSize={'xs'}
                  color={'black'}>
                  {item}
                </Text>
              </HStack>
            ))}
          </Radio.Group>
        </Box>
      </Collapse>
    </VStack>
  );
};

export default TuPhanLoai;
