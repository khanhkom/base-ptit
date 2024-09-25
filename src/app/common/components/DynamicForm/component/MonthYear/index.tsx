/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';

import { Picker } from 'react-native-wheel-pick';

import R from '@assets/R';
import { ARRAY_MONTH, LIST_VALUE_MONTH, WIDTH } from '@common';
import { HelperText } from '@libcomponents/helper-text';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';

import { styles } from './styles';

const MonthYear = (props: any) => {
  const {
    defaultValue,
    error,
    minDate,
    maxDate,
    onMonthChange,
    isDisabled,
    isRequired,
    label,
  } = props;

  const [currentMonth, setcurrentMonth] = useState(defaultValue || new Date());

  const [show, setShow] = useState(false);

  const showDatePicker = () => {
    LayoutAnimation.configureNext({
      duration: 500,
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleY,
        springDamping: 1.7,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 1.7,
      },
    });

    setShow(!show);
  };

  const onChange = (value: string) => {
    setcurrentMonth(value);

    onMonthChange(value);
  };

  const colorDisabled = isDisabled ? R.colors.grayText : R.colors.black0;

  const displayMonth = moment(currentMonth).format('MM/YYYY');

  useEffect(() => {
    onMonthChange(defaultValue || new Date());
  }, []);

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          disabled={isDisabled}
          onPress={showDatePicker}
          style={[styles.buttoncontainer]}
          activeOpacity={0.6}>
          <Text style={styles.label}>
            {`${label ?? ''}`}
            {isRequired && <Text style={styles.dot}>{' * '}</Text>}
          </Text>
          <View style={styles.viewDisplay}>
            <View style={styles.date}>
              <Text style={[styles.textTime, { color: colorDisabled }]}>
                {displayMonth}
              </Text>
            </View>
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
      {show && (
        <MonthYearPicker
          onClose={() => setShow(false)}
          onMonthChange={onChange}
          min={minDate}
          max={maxDate}
          defaultValue={currentMonth}
        />
      )}
    </>
  );
};

export default MonthYear;
const MonthYearPicker = ({
  defaultValue,
  onClose,
  min,
  max,
  onMonthChange,
}: {
  defaultValue?: string;
  onClose: () => void;
  min: number;
  max: number;
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
      <View style={styles.modal}>
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
      </View>
      <View style={styles.viewButton}>
        <TouchableOpacity
          onPress={onClose}
          style={[styles.button, { backgroundColor: R.colors.white }]}>
          <Text style={[styles.textDongY, { color: R.colors.primaryColor }]}>
            {translate('slink:Cancel')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.textDongY}>{translate('slink:Agree')}</Text>
        </TouchableOpacity>
      </View>
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
