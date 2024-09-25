import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import R from '@assets/R';
import { translate } from '@utils/i18n/translate';
import { Box, Checkbox, Text } from 'native-base';

import { styles } from './styles';
interface Props {
  onCheck: (e: boolean) => void;
  title: string;
  style?: StyleProp<ViewStyle>;
  defaultIsChecked?: boolean;
}
const ItemXacNhan = (props: Props) => {
  const { onCheck, title, style, defaultIsChecked = false } = props;

  return (
    <Box style={[styles.viewBox, style]}>
      <Checkbox
        defaultIsChecked={defaultIsChecked}
        isDisabled={defaultIsChecked}
        color={R.colors.colorMain}
        value="success"
        onChange={onCheck}>
        <Text style={styles.textStyle}>
          {title || translate('slink:Confirm')}
        </Text>
      </Checkbox>
    </Box>
  );
};

export default ItemXacNhan;
