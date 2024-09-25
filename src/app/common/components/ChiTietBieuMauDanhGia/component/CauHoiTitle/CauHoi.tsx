import React from 'react';
import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';
import { translate } from '@utils/i18n/translate';
import { Text } from 'native-base';
interface Props {
  index: number;
  content: string;
  required: boolean;
  table?: boolean;
}
const CauHoi = (props: Props) => {
  const { index, content, required, table } = props;

  return (
    <Text style={[styles.textQuestion]}>
      <Text style={styles.dot}>{required ? '* ' : ''}</Text>
      {table ? `${(index || 0) + 1}: ` : `Câu ${(index || 0) + 1}: `}
      <Text style={styles.noiDung}>
        {content || translate('slink:Chua_cap_nhat')}
      </Text>
    </Text>
  );
};

export default CauHoi;

const styles = StyleSheet.create({
  textQuestion: {
    maxWidth: WIDTH(327),
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(14),
    color: R.colors.black0,
    marginVertical: HEIGHT(4),
  },
  dot: { color: R.colors.red },
  noiDung: { color: R.colors.black0 },
});
