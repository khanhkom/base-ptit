import React, { ReactNode, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import Swiper from 'react-native-swiper';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import { NEW_MODULE } from '@env';
import { load, save } from '@utils/storage';
import {
  Box,
  Button,
  HStack,
  Image,
  Modal,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LIST_MODULE = [
  {
    img: R.images.module1,
    title: 'Thống kê',
    description: 'Thống kê nhân viên đi làm hàng ngày của quản lý!',
  },
  {
    img: R.images.module1,
    title: 'Quản lý đơn',
    description:
      'Quản lý có thể duyệt/không duyệt đơn của nhân viên ngay trực tiếp trên ứng dụng!',
  },
  {
    img: R.images.module1,
    title: 'Đơn xin làm Remote',
    description: 'Nhân viên có thể gửi đơn xin làm Remote trên ứng dụng!',
  },
];

const NewModuleScreen = () => {
  const VERSION = '2.4';

  const hasNew = NEW_MODULE === 'true';

  const [modalVisible, setmodalVisible] = useState(false);

  useEffect(() => {
    checkReadNews();
  }, []);

  const checkReadNews = () => {
    const responseCheck = load(VERSION);

    setmodalVisible(hasNew && !responseCheck?.readNews);
  };

  if (!hasNew) {
    return null;
  }

  const onClose = () => {
    setmodalVisible(false);

    save(VERSION, { readNews: true });
  };

  return (
    <Modal isOpen={modalVisible}>
      <Swiper showsButtons showsPagination={false} loop={false}>
        {LIST_MODULE?.map((item, index) => (
          <ViewBox
            visible={index === LIST_MODULE?.length - 1}
            key={index}
            onClose={onClose}>
            <TextDescription
              title={item?.title}
              description={item?.description}
            />
            <Image
              source={item?.img}
              style={styles.imageLg}
              resizeMode="contain"
            />
          </ViewBox>
        ))}
      </Swiper>
    </Modal>
  );
};

export default NewModuleScreen;
interface Props {
  children: ReactNode;
  onClose: () => void;
  visible: boolean;
}
const ViewBox = (props: Props) => {
  const { children, onClose, visible } = props;

  const theme = useTheme();

  return (
    <Box flex={1} backgroundColor="gray.200" justifyContent="center">
      {children}
      {visible && (
        <Button
          onPress={onClose}
          backgroundColor={'red.700'}
          right={WIDTH(48.5)}
          borderRadius={WIDTH(8)}
          position={'absolute'}
          bottom={HEIGHT(20)}>
          <HStack alignItems={'center'}>
            <Text
              fontSize={'sm'}
              color="white"
              fontFamily={R.fonts.BeVietnamProMedium}
              mr="1">
              {'Bỏ qua'}
            </Text>
            <MaterialCommunityIcons
              size={WIDTH(18)}
              name={'skip-next'}
              color={theme.colors.white}
            />
          </HStack>
        </Button>
      )}
    </Box>
  );
};

const TextDescription = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <VStack width={WIDTH(278)} alignSelf="center">
      {!!title && (
        <Text
          color={'primary.500'}
          textTransform={'uppercase'}
          fontFamily={R.fonts.BeVietnamProMedium}
          fontSize="sm">
          {title}
        </Text>
      )}
      <Text
        color={'black'}
        mb="4"
        fontFamily={R.fonts.BeVietnamProMedium}
        fontSize="sm">
        {description}
      </Text>
    </VStack>
  );
};

const styles = StyleSheet.create({
  imageLg: {
    height: WIDTH(564),
    width: WIDTH(278),
    alignSelf: 'center',
  },
});
