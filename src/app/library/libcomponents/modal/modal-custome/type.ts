import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface ItemProps {
  isLast: boolean;
  item: { label: string; value: string };
}

export interface ModalProps {
  style?: ViewStyle;
  children?: ReactNode;
  isVisible: boolean;
  closeButton?: () => void;
}
