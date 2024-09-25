import { Text } from 'native-base';
import React from 'react';
import R from '@assets/R';
interface Props {
  msg: string;
  visible: boolean;
}
const TextSub = (props: Props) => {
  const { msg, visible } = props;
  if (visible) {
    return (
      <Text
        flex={1}
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize={'xs'}
        color={'rgb(255, 59, 48)'}>
        {msg || ''}
      </Text>
    );
  }
  return null;
};

export default TextSub;
