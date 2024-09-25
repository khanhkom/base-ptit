/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import R from '@assets/R';
import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import { TIME_FROM_TO } from '@config/constant';
import { WIDTH } from '@config/function';
import { HelperText } from '@libcomponents';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Box } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';

import { Props } from './type';

import ButtonPick from '../component/ButtonPick';
import MonthYearPicker from '../component/MonthYearPicker';
import YearPicker from '../component/YearPicker';

const DateFromTo = (props: Props) => {
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

  const [show, setshow] = useState(false);

  const [indexChoose, setindexChoose] = useState<number | undefined>();

  const [timeStart, settimeStart] = useState<string>();

  const [timeEnd, settimeEnd] = useState<string>();

  useEffect(() => {
    if (defaultValue?.end && defaultValue?.start) {
      settimeStart(defaultValue?.start);

      settimeEnd(defaultValue?.end);

      onChangeValue?.(defaultValue);
    }
  }, [defaultValue]);

  const onPressStart = () => {
    if (show && indexChoose !== TIME_FROM_TO.START) {
      setindexChoose(TIME_FROM_TO.START);

      setshow(false);

      setTimeout(() => {
        setshow(true);
      }, 100);
    } else {
      setindexChoose(TIME_FROM_TO.START);

      setshow(true);
    }
  };

  const onPressEnd = () => {
    if (show && indexChoose !== TIME_FROM_TO.END) {
      setindexChoose(TIME_FROM_TO.END);

      setshow(false);

      setTimeout(() => {
        setshow(true);
      }, 100);
    } else {
      setindexChoose(TIME_FROM_TO.END);

      setshow(true);
    }
  };

  const onChange = (value: string) => {
    switch (indexChoose) {
      case TIME_FROM_TO.START:
        settimeStart(value);

        onChangeValue?.({ end: timeEnd, start: value });

        break;
      case TIME_FROM_TO.END:
        settimeEnd(value);

        onChangeValue?.({ end: value, start: timeStart });

        break;

      default:
        break;
    }
  };

  const onClose = () => {
    setshow(false);

    setindexChoose(undefined);
  };

  const currentTime: any =
    indexChoose === TIME_FROM_TO.START ? timeStart : timeEnd;

  const displayStart = timeStart
    ? moment(timeStart).format(format)
    : placeholder?.[0] || translate('slink:From');

  const displayEnd = timeEnd
    ? moment(timeEnd).format(format)
    : placeholder?.[0] || translate('slink:To');

  const hideDatePicker = () => {
    setshow(false);
  };

  const handleConfirm = (dateValue: Date) => {
    hideDatePicker();

    onChange(dateValue?.toISOString());
  };

  return (
    <Box flexDirection={'column'} w="full">
      <TextLabelQuyTrinh label={label} isRequired={isRequired} />
      <Box
        flexDirection={'row'}
        alignItems="center"
        mt={'1'}
        justifyContent={'space-between'}>
        <Box flex={1}>
          <ButtonPick label={displayStart} onPress={onPressStart} />
        </Box>
        <Icon size={WIDTH(18)} name="arrowright" color={R.colors.black0} />
        <Box flex={1}>
          <ButtonPick label={displayEnd} onPress={onPressEnd} />
        </Box>
      </Box>
      <HelperText
        visible={error !== undefined}
        msg={error ?? ''}
        type={'error'}
      />
      {show && type === 'month' && (
        <MonthYearPicker
          onClose={onClose}
          onMonthChange={onChange}
          min={minDate}
          max={maxDate}
          defaultValue={currentTime}
        />
      )}
      {show && type === 'year' && (
        <YearPicker
          onClose={onClose}
          onMonthChange={onChange}
          min={minDate}
          max={maxDate}
          defaultValue={currentTime}
        />
      )}
      {type === 'date' && (
        <DateTimePickerModal
          is24Hour
          date={currentTime ? new Date(currentTime) : undefined}
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

export default DateFromTo;
