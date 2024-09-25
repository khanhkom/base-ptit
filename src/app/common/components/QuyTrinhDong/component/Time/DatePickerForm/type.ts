/* eslint-disable @typescript-eslint/no-explicit-any */
import { ViewStyle } from 'react-native';

import { Control, FieldValues } from 'react-hook-form';

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
  placeholder?: string;
  name: string;
  control: Control<FieldValues, any>;

  error?: any;
  customContainerStyle?: ViewStyle;
}
type ModeDatePicker = 'date' | 'time' | 'datetime';
