import React from 'react';

import Swiper from 'react-native-swiper';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import { Box, HStack, Text, VStack } from 'native-base';

const Legend = () => {
  return (
    <VStack>
      <Swiper autoplay style={{ height: HEIGHT(82) }} autoplayTimeout={2}>
        <HStack
          alignItems={'center'}
          w={WIDTH(300)}
          alignSelf={'center'}
          mt={'3'}>
          <HStack alignItems={'center'}>
            <Box
              w="4"
              h="4"
              borderRadius={'16'}
              backgroundColor={'#27AE60'}
              mr={'4'}
            />
            <Text
              w={WIDTH(160)}
              fontSize={'xs'}
              color={R.colors.black0}
              fontFamily={R.fonts.BeVietnamProRegular}>
              Lương theo thời gian
            </Text>
          </HStack>
          <HStack alignItems={'center'}>
            <Box
              w="4"
              h="4"
              borderRadius={'16'}
              backgroundColor={'#E67E22'}
              mr={'4'}
            />
            <Text
              fontSize={'xs'}
              color={R.colors.black0}
              fontFamily={R.fonts.BeVietnamProRegular}>
              Hội nghị, học tập
            </Text>
          </HStack>
        </HStack>
        <HStack
          alignItems={'center'}
          w={WIDTH(300)}
          alignSelf={'center'}
          mt={'3'}>
          <HStack alignItems={'center'}>
            <Box
              w="4"
              h="4"
              borderRadius={'16'}
              backgroundColor={'#3498DB'}
              mr={'4'}
            />
            <Text
              w={WIDTH(160)}
              fontSize={'xs'}
              color={R.colors.black0}
              fontFamily={R.fonts.BeVietnamProRegular}>
              Nghỉ việc riêng
            </Text>
          </HStack>
          {/* <HStack alignItems={'center'}>
          <Box
            w="4"
            h="4"
            borderRadius={'16'}
            backgroundColor={'blue.800'}
            mr={'4'}
          />
          <Text
            fontSize={'xs'}
            color={R.colors.black0}
            fontFamily={R.fonts.BeVietnamProRegular}>
            Nghỉ lễ
          </Text>
        </HStack> */}
          <HStack alignItems={'center'}>
            <Box
              w="4"
              h="4"
              borderRadius={'16'}
              backgroundColor={'#F1C40F'}
              mr={'4'}
            />
            <Text
              fontSize={'xs'}
              color={R.colors.black0}
              fontFamily={R.fonts.BeVietnamProRegular}>
              Nghỉ phép
            </Text>
          </HStack>
        </HStack>
        <HStack
          alignItems={'center'}
          w={WIDTH(300)}
          alignSelf={'center'}
          mt={'3'}>
          <HStack alignItems={'center'}>
            <Box
              w="4"
              h="4"
              borderRadius={'16'}
              backgroundColor={'gray.500'}
              mr={'4'}
            />
            <Text
              w={WIDTH(160)}
              fontSize={'xs'}
              color={R.colors.black0}
              fontFamily={R.fonts.BeVietnamProRegular}>
              Nghỉ theo chế độ bảo hiểm
            </Text>
          </HStack>
          <HStack alignItems={'center'}>
            <Box
              w="4"
              h="4"
              borderRadius={'16'}
              backgroundColor={'red.500'}
              mr={'4'}
            />
            <Text
              fontSize={'xs'}
              color={R.colors.black0}
              fontFamily={R.fonts.BeVietnamProRegular}>
              Ngưng việc
            </Text>
          </HStack>
        </HStack>
        <HStack
          alignItems={'center'}
          w={WIDTH(300)}
          alignSelf={'center'}
          mt={'3'}>
          <HStack alignItems={'center'}>
            <Box
              w="4"
              h="4"
              borderRadius={'16'}
              backgroundColor={'blue.800'}
              mr={'4'}
            />
            <Text
              fontSize={'xs'}
              color={R.colors.black0}
              fontFamily={R.fonts.BeVietnamProRegular}>
              Nghỉ lễ
            </Text>
          </HStack>
        </HStack>
        {/* <HStack alignItems={'center'}>
          <Box
            w="4"
            h="4"
            borderRadius={'16'}
            backgroundColor={'blue.800'}
            mr={'4'}
          />
          <Text
            fontSize={'xs'}
            color={R.colors.black0}
            fontFamily={R.fonts.BeVietnamProRegular}>
            Nghỉ lễ
          </Text>
        </HStack> */}
      </Swiper>
    </VStack>
  );
};

export default Legend;

//   [TrangThaiChamCong.LUONG_THEO_THOI_GIAN]: '#27AE60',
//   [TrangThaiChamCong.OM_DIEU_DUONG]: 'gray',
//   [TrangThaiChamCong.CON_OM]: 'gray',
//   [TrangThaiChamCong.THAI_SAN]: 'gray',
//   [TrangThaiChamCong.TAI_NAN]: 'gray',
//   [TrangThaiChamCong.NGHI_PHEP]: '#F1C40F',
//   [TrangThaiChamCong.NGHI_VIEC_RIENG]: '#3498DB',
//   [TrangThaiChamCong.NGHI_LE]: 'blue',
//   [TrangThaiChamCong.HOI_NGHI_HOC_TAP]: '#E67E22',
//   [TrangThaiChamCong.NGHI_BU]: '#F1C40F',
//   [TrangThaiChamCong.NGHI_KHONG_LUONG]: '#F1C40F',
//   [TrangThaiChamCong.LAO_DONG_NGHIA_VU]: '#F1C40F',
//   [TrangThaiChamCong.NGUNG_VIEC]: 'red',
// };
