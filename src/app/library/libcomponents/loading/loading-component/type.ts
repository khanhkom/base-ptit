import { StyleProp, ViewStyle } from 'react-native';

import { I18nKeys } from '@utils/i18n/locales';

export interface LoadingType {
  size?: number | 'small' | 'large' | undefined;
  customStyle?: ViewStyle;
  loading?: boolean;
  color?: string;
}
