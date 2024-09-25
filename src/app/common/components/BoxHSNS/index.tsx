import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { HEIGHT } from '@config/function';
import { translate } from '@utils/i18n/translate';
import { Box, Link, View } from 'native-base';

import styles from './styles';
import TextLabelTCNS from './TextLabelTCNS';

interface Props {
  title?: string;
  children: ReactNode;
  customeStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  visibleAdd?: boolean;
}
const BoxHSNS = (props: Props) => {
  const { title, children, customeStyle, onPress, visibleAdd } = props;

  return (
    <View style={[styles.container, customeStyle]}>
      {title && (
        <ViewTitle title={title} onPress={onPress} visibleAdd={visibleAdd} />
      )}
      <View>{children}</View>
    </View>
  );
};

export default BoxHSNS;
const ViewTitle = ({
  title,
  onPress,
  visibleAdd = true,
}: {
  title: string;
  onPress?: () => void;
  visibleAdd?: boolean;
}) => {
  return (
    <Box marginBottom={HEIGHT(8)}>
      <TextLabelTCNS label={title} />
      {visibleAdd && (
        <Link
          onPress={onPress}
          _text={{
            color: 'cyan.600',
          }}
          isUnderlined>
          {translate('slink:Add')}
        </Link>
      )}
    </Box>
  );
};
