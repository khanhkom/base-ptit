import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Picker } from 'react-native-wheel-pick';

import R from '@assets/R';
import { ARRAY_MONTH, LIST_VALUE_MONTH } from '@config/constant';
import { getFontSize, HEIGHT, WIDTH } from '@config/function';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Box, Pressable, Text } from 'native-base';

const MonthYearPicker = ({
  defaultValue,
  onClose,
  min,
  max,
  onMonthChange,
}: {
  defaultValue?: string;
  onClose: () => void;
  min?: number;
  max?: number;
  onMonthChange: (value: string) => void;
}) => {
  const [valueMonth, setvalueMonth] = useState(
    moment(defaultValue).format('MM'),
  );

  const [valueYear, setvalueYear] = useState(
    moment(defaultValue).format('YYYY'),
  );

  const years = getYearList(
    Number(min || Number(moment().format('YYYY')) - 100),
    Number(max || moment().format('YYYY')),
  );

  const onChangeMonth = (value: string) => {
    const indexCurrentMonth = ARRAY_MONTH.indexOf(value);

    setvalueMonth(LIST_VALUE_MONTH?.[indexCurrentMonth || 0] || '01');
  };

  const onChangeYear = (value: string) => {
    setvalueYear(value);
  };

  const onPress = () => {
    const valuePick = `${valueYear}-${valueMonth}-01T07:00:00.000Z`;

    onMonthChange && onMonthChange(valuePick);

    onClose();
  };

  const indexMonthValue = LIST_VALUE_MONTH.indexOf(valueMonth);

  return (
    <>
      <Box marginBottom={HEIGHT(8)} style={styles.modal}>
        <Picker
          selectedValue={ARRAY_MONTH?.[indexMonthValue]}
          pickerData={ARRAY_MONTH}
          onValueChange={onChangeMonth}
          style={styles.viewModal}
        />
        <Picker
          selectedValue={valueYear}
          pickerData={years}
          selectBackgroundColor="#8080801A"
          onValueChange={onChangeYear}
          style={styles.viewModal}
        />
      </Box>
      <Box style={styles.viewButton}>
        <Pressable
          onPress={onClose}
          backgroundColor={R.colors.white}
          style={[styles.button]}>
          <Text color={R.colors.primaryColor} style={[styles.textDongY]}>
            {translate('slink:Cancel')}
          </Text>
        </Pressable>
        <Pressable
          backgroundColor={R.colors.primaryColor}
          onPress={onPress}
          style={styles.button}>
          <Text color={R.colors.white} style={styles.textDongY}>
            {translate('slink:Agree')}
          </Text>
        </Pressable>
      </Box>
    </>
  );
};

const getYearList = (minYear: number, maxYear: number) => {
  const currentYear = new Date().getFullYear();

  const defaultMinYear = currentYear - 50;

  const defaultMaxYear = currentYear + 50;

  const startYear = minYear || defaultMinYear;

  const endYear = maxYear || defaultMaxYear;

  const yearList: number[] = [];

  for (let year = startYear; year <= endYear; year++) {
    yearList.push(year);
  }

  return yearList;
};

export default MonthYearPicker;

const styles = StyleSheet.create({
  textDongY: {
    fontSize: getFontSize(14),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  modal: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: WIDTH(8),
  },
  viewModal: {
    flex: 1,
    height: 150,
    backgroundColor: 'rgba(171, 171, 171, 0.4)',
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: WIDTH(8),
    padding: 4,
    paddingHorizontal: WIDTH(8),
    borderRadius: WIDTH(2),
    borderWidth: 0.5,
    borderColor: R.colors.primaryColor,
  },
});
