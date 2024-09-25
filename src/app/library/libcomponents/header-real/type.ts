/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ItemProps {
  hideBack?: boolean;
  title: string;
  childrenRight?: any;
  onButton?: () => void;
  containerStyles?: StyleProp<ViewStyle>;
  titleViewStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  isStatusBarAndroidVisible?: boolean;
  innerContainerStyles?: StyleProp<ViewStyle>;
}

export type Props = {
  backgroundColor?: string;
  lightBarStyle?: boolean;
  isStatusBarAndroidVisible?: boolean;
};
