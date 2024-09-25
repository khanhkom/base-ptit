import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface ItemTrongProps {
  customStyle?: ViewStyle;
  content?: string;
  colorIcon?: string;
  icon?: string;
  onPressBtn?: (e: boolean) => void;
  onPress?: () => void;
  chidren?: ReactNode;
  hasBtn?: boolean;
  isLoaded?: boolean;
  subText?: string;
  percent?: number;
}
