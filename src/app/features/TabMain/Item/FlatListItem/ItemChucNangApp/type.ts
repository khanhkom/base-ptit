/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface ItemTrongProps {
  item?: any;
  customStyle?: ViewStyle;
  content?: string;
  icon?: string;
  onPressBtn?: (e: boolean) => void;
  onPress?: () => void;
  chidren?: ReactNode;
  hasBtn?: boolean;
  account?: any;
}
