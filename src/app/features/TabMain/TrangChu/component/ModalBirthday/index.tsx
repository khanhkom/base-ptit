/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inline-comments */
/* eslint-disable no-promise-executor-return */
import React, { useEffect, useState } from 'react';

import FastImage from 'react-native-fast-image';

import R from '@assets/R';
import { WIDTH } from '@common';
import { AccountProps } from '@model/app';
import { translate } from '@utils/i18n/translate';
import { Box, Modal, Text, VStack } from 'native-base';
interface Props {
  account: AccountProps | null;
  modalVisible: boolean;
  onClose: () => void;
}
const ModalBirthday = (props: Props) => {
  const { account, modalVisible, onClose } = props;

  const [visibleText, setVisibleText] = useState('');

  const initialRef = React.useRef(null);

  const finalRef = React.useRef(null);

  const name = account?.isGiaoVien
    ? `${translate('slink:Teacher')?.toLowerCase()} ${
        account?.data?.fullname || ''
      }`
    : `${translate('slink:Student')?.toLowerCase()} ${
        account?.data?.fullname || account?.fullname || ''
      }`;

  const greetings = translate('slink:Best_wishes', { name });

  useEffect(() => {
    const animateText = async () => {
      for (let i = 0; i < greetings.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 40)); // Thời gian delay giữa các chữ (100ms trong ví dụ)

        setVisibleText(prevText => prevText + greetings[i]);
      }
    };

    animateText();
  }, []);

  return (
    <Modal
      backdropVisible
      isOpen={modalVisible}
      onClose={onClose}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}>
      <VStack alignItems={'center'}>
        <FastImage
          style={{ width: WIDTH(250), height: WIDTH(250) }}
          resizeMode="contain"
          source={R.images.bdCake}
        />
        <Box
          mt="14"
          padding="4"
          backgroundColor={'white'}
          w={WIDTH(343)}
          borderRadius={WIDTH(8)}>
          <Text
            fontFamily={R.fonts.BeVietnamProMedium}
            fontSize="xs"
            lineHeight={'xl'}>
            {visibleText}
          </Text>
        </Box>
      </VStack>
    </Modal>
  );
};

export default ModalBirthday;
