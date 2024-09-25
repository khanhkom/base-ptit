/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';

// config
import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';
import { useTheme } from '@theme';
import { translate } from '@utils/i18n/translate';

const ViewText = (props: any) => {
  const { handlePress, handleOpenMess } = props;

  const theme = useTheme();

  return (
    <Text style={[styles.title1, { color: theme.colors.text }]}>
      {/* {`${i18n.t("THI_SINH_DK")} `} */}
      {translate('slink:Instructions_for_logging_in')}
      <Text
        style={[styles.redText, { color: theme.colors.primary }]}
        onPress={handlePress && handlePress}>
        {translate('slink:Here')?.toLowerCase()}
      </Text>
      {` ${translate('slink:Or')} `}
      <Text
        style={[styles.redText, { color: theme.colors.primary }]}
        onPress={handleOpenMess && handleOpenMess}>
        liên hệ Fanpage
      </Text>
      {translate('slink:Get_support')}
    </Text>
  );
};

export default ViewText;

const styles = StyleSheet.create({
  title1: {
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(24),
    color: R.colors.black0,
    width: WIDTH(320),
    textAlign: 'center',
    marginTop: HEIGHT(16),
  },
  redText: {
    color: R.colors.colorPink,
    fontWeight: Platform.OS === 'ios' ? '500' : 'bold',
    textDecorationLine: 'underline',
    marginLeft: WIDTH(4),
  },
});
