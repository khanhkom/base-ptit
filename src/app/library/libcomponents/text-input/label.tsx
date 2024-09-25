import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

import { useTranslation } from 'react-i18next';

import R from '@assets/R';
import { getFontSize } from '@common';
import { useTheme } from '@theme';

import { styles } from './styles';
import { LabelProps } from './type';

export const Label = ({ label, labelI18n, required }: LabelProps) => {
  // state
  const [t] = useTranslation();

  const { colors } = useTheme();

  const content = useMemo(
    () => label || (labelI18n && t(labelI18n)),
    [label, labelI18n, t],
  );

  // render
  return (
    <View style={styles.rowLabel}>
      <Text
        style={{
          color: colors.text,
          fontFamily: R.fonts.BeVietnamProRegular,
          fontSize: getFontSize(14),
        }}>
        {content}
      </Text>
      {required ? <Text style={{ color: colors.error }}> *</Text> : null}
    </View>
  );
};
