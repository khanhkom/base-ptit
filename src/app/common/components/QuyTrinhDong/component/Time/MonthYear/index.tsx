/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  Text,
  TouchableOpacity,
  UIManager,
} from 'react-native';

import R from '@assets/R';
import { WIDTH } from '@common';
import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import { HelperText } from '@libcomponents';
import moment from 'moment';
import { Box, theme } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

import { styles } from './styles';

import MonthYearPicker from '../component/MonthYearPicker';

const MonthYearQuyTrinhDong = (props: any) => {
  const {
    error,
    defaultValue,
    minDate,
    maxDate,
    onMonthChange,
    isDisabled,
    isRequired,
    label,
  } = props;

  const [currentMonth, setcurrentMonth] = useState<string | undefined>();

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      setcurrentMonth(defaultValue);

      onMonthChange(defaultValue);
    }
  }, [defaultValue]);

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

  const colorDisabled = isDisabled
    ? theme.colors.gray[200]
    : theme.colors.black;

  const displayMonth = currentMonth
    ? moment(currentMonth).format('MM/YYYY')
    : 'Chọn';

  useEffect(() => {
    onMonthChange(defaultValue || new Date());
  }, []);

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const borderWidth = error ? 1 : 0;

  return (
    <>
      <Box style={styles.container}>
        <Box style={[styles.buttoncontainer]}>
          <TextLabelQuyTrinh label={label} isRequired={isRequired} />
          <TouchableOpacity
            onPress={showDatePicker}
            disabled={isDisabled}
            activeOpacity={0.6}
            style={styles.viewDisplay}>
            <Box
              backgroundColor={isDisabled ? 'gray.200' : '#ABABAB66'}
              style={[styles.date, { borderWidth }]}>
              <Text style={[styles.textTime]}>{displayMonth}</Text>
            </Box>
            <Entypo
              style={styles.iconDown}
              color={colorDisabled}
              size={WIDTH(22)}
              name="chevron-down"
            />
          </TouchableOpacity>
        </Box>
        <HelperText
          visible={error !== undefined}
          msg={error ?? ''}
          type={'error'}
        />
      </Box>
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

export default MonthYearQuyTrinhDong;
