/* eslint-disable react-hooks/exhaustive-deps */

import React, { FunctionComponent, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import R from '@assets/R';
import { WIDTH } from '@common';
import { HelperText } from '@libcomponents/helper-text';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';

import { styles } from './styles';
import { Props } from './type';

const DatePickerV2: FunctionComponent<Props> = (props: Props) => {
  const {
    defaultValue,
    error,
    minDate,
    maxDate,
    onDateChange,
    isDisabled,
    mode = 'datetime',
    isRequired,
    label,
    customContainerStyle,
  } = props;

  const [date, setDate] = useState<Date | undefined>();

  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);

  useEffect(() => {
    if (_.isNil(defaultValue)) {
    } else {
      const dateInit = new Date(defaultValue || new Date());

      setDate(dateInit);

      onDateChange && onDateChange(dateInit);
    }
  }, [defaultValue]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dateValue: Date) => {
    hideDatePicker();

    setDate(dateValue);

    onDateChange && onDateChange(dateValue);
  };

  const displayHour = moment(date).format('HH:mm');

  const displayDate = moment(date).format('DD/MM/YYYY');

  const colorDisabled = isDisabled ? R.colors.grayText : R.colors.black0;

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={showDatePicker}
          style={[styles.buttoncontainer, customContainerStyle]}
          disabled={isDisabled}
          activeOpacity={0.6}>
          <Text style={styles.label}>
            {`${label ?? ''}`}
            {isRequired && <Text style={styles.dot}>{' * '}</Text>}
          </Text>
          <View style={styles.viewDisplay}>
            {date ? (
              <>
                {mode !== 'date' && (
                  <View style={styles.date}>
                    <Text style={[styles.textTime, { color: colorDisabled }]}>
                      {displayHour}
                    </Text>
                  </View>
                )}
                {mode !== 'time' && (
                  <View style={styles.time}>
                    <Text style={[styles.textTime, { color: colorDisabled }]}>
                      {displayDate}
                    </Text>
                  </View>
                )}
              </>
            ) : (
              <View style={styles.time}>
                <Text style={[styles.textTime, { color: colorDisabled }]}>
                  {isDisabled ? '--' : 'Chọn'}
                </Text>
              </View>
            )}
            <Entypo
              style={styles.iconDown}
              color={colorDisabled}
              size={WIDTH(22)}
              name="chevron-down"
            />
          </View>
        </TouchableOpacity>
        <HelperText
          visible={error !== undefined}
          msg={error ?? ''}
          type={'error'}
        />
      </View>
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

export default DatePickerV2;
