/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ItemProps {
  onPress?: () => void;
  isLast: boolean;
  loading?: boolean;
  label: any;
  value: any;
  textLabel?: StyleProp<TextStyle>;
  textValue?: StyleProp<TextStyle>;
  style?: ViewStyle;
  image?: any;
  numberOfLines?: number;
  multiLine?: boolean | undefined;
  typeHTML?: boolean;
  link?: string;
  badge?: boolean;
  nullItem?: boolean;
}
