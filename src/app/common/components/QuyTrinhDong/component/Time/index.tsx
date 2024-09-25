import React, { useEffect, useState } from 'react';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import { HelperText } from '@libcomponents';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Box } from 'native-base';

import ButtonPick from './component/ButtonPick';
import MonthYearPicker from './component/MonthYearPicker';
import YearPicker from './component/YearPicker';
import { Props } from './type';

const MyDatePicker = (props: Props) => {
  const {
    label,
    isRequired,
    error,
    format,
    placeholder,
    type,
    onChangeValue,
    minDate,
    maxDate,
    defaultValue,
  } = props;

  const [date, setDate] = useState<string>();

  const [show, setshow] = useState<boolean>(false);

  useEffect(() => {
    if (defaultValue) {
      setDate(defaultValue);
    }
  }, [defaultValue]);

  const showDatePicker = () => {
    setshow(!show);
  };

  const hideDatePicker = () => {
    setshow(false);
  };

  const handleConfirm = (dateValue: Date) => {
    hideDatePicker();

    onChange(dateValue.toISOString());
  };

  const onChange = (value: string) => {
    setDate(value);

    onChangeValue(value);
  };

  const displayDate = date
    ? moment(date).format(format)
    : placeholder || 'Chọn';

  return (
    <Box flexDirection={'column'} w="full">
      <Box flexDirection={'row'} alignItems="center" w="full">
        <TextLabelQuyTrinh label={label} isRequired={isRequired} />
        <ButtonPick label={displayDate} onPress={showDatePicker} />
      </Box>
      <HelperText
        visible={error !== undefined}
        msg={error ?? ''}
        type={'error'}
      />
      {show && type === 'month' && (
        <MonthYearPicker
          onClose={hideDatePicker}
          onMonthChange={onChange}
          min={minDate}
          max={maxDate}
          defaultValue={date}
        />
      )}
      {show && type === 'year' && (
        <YearPicker
          onClose={hideDatePicker}
          onMonthChange={onChange}
          min={minDate}
          max={maxDate}
          defaultValue={date}
        />
      )}
      {type === 'date' && (
        <DateTimePickerModal
          is24Hour
          date={date ? new Date(date) : undefined}
          isVisible={show}
          mode={'date'}
          locale="vi"
          minimumDate={minDate}
          maximumDate={maxDate}
          confirmTextIOS={translate('slink:Agree')}
          cancelTextIOS={translate('slink:Cancel')}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      )}
    </Box>
  );
};

export default MyDatePicker;
