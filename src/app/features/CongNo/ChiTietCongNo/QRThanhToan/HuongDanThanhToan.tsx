import React from 'react';

import R from '@assets/R';
import { getFontSize, HEIGHT } from '@common';
import { URL_GUIDELINES_PAYMENT } from '@env';
import ModalCustome from '@libcomponents/modal/modal-custome';
import { ModalProps } from '@libcomponents/modal/modal-custome/type';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { translate } from '@utils/i18n/translate';
import { ScrollView, Text, VStack } from 'native-base';
interface Props extends ModalProps {
  codePayment?: string | number;
  isPhanHieu: boolean;
}
const HuongDanThanhToan = (props: Props) => {
  const { closeButton, isPhanHieu } = props;

  const STK = 'v100098' + props.codePayment || '';

  const onGuidelines = () => {
    closeButton && closeButton();

    setTimeout(() => {
      navigateScreen(APP_SCREEN.SEEPDF, {
        content: {
          title: translate('slink:Payment_guide'),
          sourcePDF: URL_GUIDELINES_PAYMENT,
        },
      });
    }, 500);
  };

  return (
    <ModalCustome {...props}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <Text
          textAlign="center"
          fontSize={getFontSize(18)}
          fontFamily={R.fonts.BeVietnamProSemiBold}
          color={R.colors.primaryColor}>
          {translate('slink:Payment_guide')}
        </Text>
        <HDThanhToan
          isPhanHieu={isPhanHieu}
          STK={STK}
          onGuidelines={onGuidelines}
          codePayment={props?.codePayment || ''}
        />
        <Text
          fontFamily={R.fonts.BeVietnamProMedium}
          fontSize="sm"
          mt={HEIGHT(16)}>
          {translate('slink:Payment_note')}
        </Text>
      </ScrollView>
    </ModalCustome>
  );
};

export default HuongDanThanhToan;
interface HDThanhToanProps {
  isPhanHieu: boolean;
  onGuidelines: () => void;
  codePayment: string | number;
  STK: string;
}
const HDThanhToan = (props: HDThanhToanProps) => {
  const { isPhanHieu, codePayment, STK } = props;

  if (isPhanHieu) {
    return (
      <VStack mt={HEIGHT(32)}>
        <Text fontFamily={R.fonts.BeVietnamProRegular} fontSize="sm">
          {translate('slink:Tieu_de_huong_dan_QR')}
        </Text>
        <Text mt="4" fontFamily={R.fonts.BeVietnamProRegular} fontSize="sm">
          {translate('slink:Guide_PH_1')}
        </Text>
        <Text fontFamily={R.fonts.BeVietnamProRegular} fontSize="sm">
          {translate('slink:Guide_PH_2')}
        </Text>
        <Text fontFamily={R.fonts.BeVietnamProRegular} fontSize="sm">
          {`- ${translate('slink:So_tai_khoan')}:  `}
          <Text fontFamily={R.fonts.BeVietnamProMedium} color="primary.500">
            1810071908
          </Text>
        </Text>
        <Text fontFamily={R.fonts.BeVietnamProRegular} fontSize="sm">
          {translate('slink:Guide_PH_3')}
        </Text>
        <Text fontFamily={R.fonts.BeVietnamProRegular} fontSize="sm">
          {translate('slink:Guide_PH_4')}
        </Text>
        <Text mt="4" fontFamily={R.fonts.BeVietnamProRegular} fontSize="sm">
          {translate('slink:Payment_Guide_Step_3')}
        </Text>
      </VStack>
    );
  }

  return (
    <VStack mt={HEIGHT(32)}>
      <Text fontFamily={R.fonts.BeVietnamProRegular} fontSize="sm">
        {translate('slink:Tieu_de_huong_dan_QR')}
      </Text>
      <Text mt="4" fontFamily={R.fonts.BeVietnamProRegular} fontSize="sm">
        {translate('slink:Payment_Guide_Step_1')}
      </Text>
      <Text mt="4" fontFamily={R.fonts.BeVietnamProRegular} fontSize="sm">
        {translate('slink:Payment_Guide_Step_2')}
        <Text>{`\n${translate('slink:Student_back_acc')}`}</Text>
        <Text fontFamily={R.fonts.BeVietnamProMedium} color="primary.500">
          {codePayment}
        </Text>
        {`\n${translate('slink:Bank_24/7')} `}
        <Text fontFamily={R.fonts.BeVietnamProMedium} color="primary.500">
          {STK}
        </Text>
      </Text>
    </VStack>
  );
};
