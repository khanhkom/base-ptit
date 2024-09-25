import React, { ReactNode } from 'react';
import { Text, VStack } from 'native-base';
import R from '@assets/R';
import { getFontSize } from '@common';
const BoxTitle = ({
  title,
  children,
  isRequired,
}: {
  title: string;
  isRequired?: boolean;
  children: ReactNode;
}) => {
  return (
    <VStack mb="2">
      {title && (
        <Text
          fontFamily={R.fonts.BeVietnamProMedium}
          fontSize={getFontSize(13)}
          my="2"
          color="gray.400"
          textTransform="uppercase">
          {isRequired && <Text color={R.colors.redColor}>{'* '}</Text>}
          {title}
        </Text>
      )}
      {children}
    </VStack>
  );
};

export default BoxTitle;
