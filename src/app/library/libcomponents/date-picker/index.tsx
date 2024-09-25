/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import R from '@assets/R';
import { WIDTH } from '@common';
import { ErrorLine } from '@libcomponents/text-input/error-line';
import { FocusedLine } from '@libcomponents/text-input/focused-line';
import { Label } from '@libcomponents/text-input/label';
import { useTheme } from '@theme';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { styles } from './styles';
import { Props } from './type';

const DatePicker: FunctionComponent<Props> = (props: Props) => {
  const {
    value,
    minDate,
    maxDate,
    onDateChange,
    isDisabled,
    error,
    mode = 'datetime',
    isRequired,
    label,
    noDefaultValue,
  } = props;

  const [date, setDate] = useState<Date | undefined>(
    new Date(value || new Date()),
  );

  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);

  useEffect(() => {
    const dateInit =
      noDefaultValue && _.isNil(value)
        ? new Date()
        : new Date(value || new Date());

    setDate(dateInit);

    onDateChange && onDateChange(dateInit);
  }, [value, noDefaultValue]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const focusedValue = useSharedValue(false);

  const errorValue = useDerivedValue(() => error === true, [error]);

  const disabled = useDerivedValue(() => !isDisabled === false, [isDisabled]);

  const { colors } = useTheme();

  const handleConfirm = (dateValue: Date) => {
    hideDatePicker();

    onDateChange && onDateChange(dateValue);
  };

  const dateValue =
    mode === 'datetime'
      ? moment(date).format('DD/MM/YYYY HH:mm')
      : mode === 'date'
      ? moment(date).format('DD/MM/YYYY')
      : moment(date).format('HH:mm');

  const displayValue = noDefaultValue
    ? !_.isNil(value)
      ? dateValue
      : mode === 'datetime'
      ? 'Chọn thời gian'
      : mode === 'date'
      ? 'Chọn ngày'
      : 'Chọn giờ'
    : dateValue;

  const borderColor = useDerivedValue(() => {
    switch (true) {
      case disabled.value:
        return colors.border;
      case errorValue.value:
        return colors.error;
      case focusedValue.value:
        return colors.primary;

      default:
        return colors.line;
    }
  }, [colors.primary, colors.error, colors.card, colors.border]);

  const containerRestyle = useAnimatedStyle(
    () => ({
      borderColor: borderColor.value,
    }),
    [],
  );

  return (
    <>
      <Label label={label} required={isRequired} />
      <Animated.View style={[styles.container, containerRestyle]}>
        <TouchableOpacity
          onPress={showDatePicker}
          style={[styles.buttoncontainer]}
          disabled={isDisabled}
          activeOpacity={0.6}>
          <Text style={styles.textTime}>{displayValue}</Text>
          <FontAwesome
            color={R.colors.black9}
            size={WIDTH(22)}
            name="calendar"
          />
        </TouchableOpacity>
        <FocusedLine focused={focusedValue} disabled={disabled} />
        <ErrorLine error={errorValue} disabled={disabled} />
      </Animated.View>
      <DateTimePickerModal
        is24Hour
        date={date}
        isVisible={isDatePickerVisible}
        mode={mode}
        locale="vi"
        minimumDate={minDate}
        maximumDate={maxDate}
        confirmTextIOS={translate('slink:Agree')}
        cancelTextIOS={translate('slink:Cancel')}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default DatePicker;
