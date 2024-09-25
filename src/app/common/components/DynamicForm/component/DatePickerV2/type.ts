/* eslint-disable @typescript-eslint/no-explicit-any */
import { ViewStyle } from 'react-native';

export interface Props {
  label?: string;
  value?: Date | undefined;
  minDate?: Date;
  maxDate?: Date;
  defaultValue?: Date;
  onDateChange?: (value: Date) => void;
  isDisabled?: boolean;
  containerStyle?: ViewStyle;
  mode?: ModeDatePicker;
  noDefaultValue?: boolean;
  errorContent?: string;
  errorColor?: string;
  isRequired?: boolean;
  error?: any;
  customContainerStyle?: ViewStyle;
}
type ModeDatePicker = 'date' | 'time' | 'datetime';
