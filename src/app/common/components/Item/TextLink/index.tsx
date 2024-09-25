import React from 'react';

import R from '@assets/R';
import { getFontSize } from '@config/function';
import { ITextProps, Text } from 'native-base';

import TextChuaCapNhat from '../TextChuaCapNhat';
interface Props extends ITextProps {
  label: string;
}
const TextLink = (props: Props) => {
  const { label, ...other } = props;

  if (label) {
    return (
      <Text
        fontFamily={R.fonts.BeVietnamProRegular}
        color={'rgba(129, 153, 215, 1)'}
        fontSize={getFontSize(12)}
        textDecorationLine="underline"
        {...other}>
        {label}
      </Text>
    );
  }

  return (
    <Text
      fontFamily={R.fonts.BeVietnamProRegular}
      fontSize={getFontSize(12)}
      {...other}>
      <TextChuaCapNhat />
    </Text>
  );
};

export default TextLink;
