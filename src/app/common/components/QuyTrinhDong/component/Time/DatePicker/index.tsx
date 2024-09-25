import React, { FunctionComponent, useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import R from '@assets/R';
import { WIDTH } from '@common';
import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import { HelperText } from '@libcomponents';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Box, theme } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

import { styles } from './styles';
import { Props } from './type';

const DatePickerQuyTrinhDong: FunctionComponent<Props> = (props: Props) => {
  const {
    error,
    defaultValue,
    minDate,
    maxDate,
    onDateChange,
    isDisabled,
    placeholder,
    mode = 'datetime',
    isRequired,
    label,
    customContainerStyle,
  } = props;

  const [date, setDate] = useState<Date | undefined>();

  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);

  useEffect(() => {
    if (defaultValue) {
      const dateInit = new Date(defaultValue);

      setDate(dateInit);
    } else {
      setDate(undefined);
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

  const colorDisabled = isDisabled ? theme.colors.gray[200] : R.colors.black0;

  const borderWidth = error ? 1 : 0;

  return (
    <>
      <Box style={styles.container}>
        <Box style={[styles.buttoncontainer, customContainerStyle]}>
          <TextLabelQuyTrinh label={label} isRequired={isRequired} />
          <TouchableOpacity
            onPress={showDatePicker}
            disabled={isDisabled}
            activeOpacity={0.6}
            style={styles.viewDisplay}>
            {date ? (
              <>
                {mode !== 'date' && (
                  <Box style={[styles.time, { borderWidth }]}>
                    <Text style={[styles.textTime]}>{displayHour}</Text>
                  </Box>
                )}
                {mode !== 'time' && (
                  <Box style={[styles.time, { borderWidth }]}>
                    <Text style={[styles.textTime]}>{displayDate}</Text>
                  </Box>
                )}
              </>
            ) : (
              <Box
                backgroundColor={isDisabled ? 'gray.200' : '#ABABAB66'}
                style={[styles.time, { borderWidth }]}>
                <Text style={[styles.textTime]}>
                  {isDisabled ? '--' : placeholder || 'Chọn'}
                </Text>
              </Box>
            )}
          </TouchableOpacity>
          <Entypo
            style={styles.iconDown}
            color={colorDisabled}
            size={WIDTH(22)}
            name="chevron-down"
          />
        </Box>
        <HelperText
          visible={error !== undefined}
          msg={error ?? ''}
          type={'error'}
        />
      </Box>
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

export default DatePickerQuyTrinhDong;
