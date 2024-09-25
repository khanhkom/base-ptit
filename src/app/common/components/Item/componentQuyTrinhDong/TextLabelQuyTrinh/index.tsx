import React from 'react';

import R from '@assets/R';
import { ITextProps, Text } from 'native-base';
interface Props extends ITextProps {
  label?: string;
  isRequired?: boolean;
}
const TextLabelQuyTrinh = ({ label, isRequired, ...rest }: Props) => {
  if (label) {
    return (
      <Text
        flex={1}
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize={'xs'}
        color={'gray.500'}
        {...rest}>
        {isRequired && <Text color={R.colors.redColor}>{'* '}</Text>}
        {label}
      </Text>
    );
  }

  return null;
};

export default TextLabelQuyTrinh;
