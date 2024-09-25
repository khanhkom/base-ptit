import React from 'react';

import R from '@assets/R';
import { translate } from '@utils/i18n/translate';
import { Text } from 'native-base';

const TextChuaCapNhat = () => {
  return (
    <Text
      fontFamily={R.fonts.BeVietnamProRegular}
      fontStyle="italic"
      textDecorationLine="none"
      color={'#B9B9B9'}>
      {translate('slink:Chua_cap_nhat')}
    </Text>
  );
};

export default TextChuaCapNhat;
