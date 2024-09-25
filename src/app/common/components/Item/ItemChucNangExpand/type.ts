import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface ItemTrongProps {
  customStyle?: ViewStyle;
  content?: string;
  icon?: string;
  onPressBtn?: (e: boolean) => void;
  onPress?: () => void;
  chidren?: ReactNode;
  hasBtn?: boolean;
  html?: boolean;
  value?: string;
}
