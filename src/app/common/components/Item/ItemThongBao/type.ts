/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextStyle, ViewStyle } from 'react-native';

export interface ItemProps {
  data: any;
  index: number;
  onPress: () => void;
}
