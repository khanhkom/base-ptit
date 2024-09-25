/* eslint-disable @typescript-eslint/no-explicit-any */
import { ViewStyle } from 'react-native';

export interface ItemTrongProps {
  customStyle?: ViewStyle;
  content?: string;
  icon?: string;
  onPress?: () => void;
  data?: any;
}
