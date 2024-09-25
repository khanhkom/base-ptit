/* eslint-disable react-hooks/exhaustive-deps */
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

import R from '@assets/R';
import { WIDTH } from '@common';
import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import { HelperText } from '@libcomponents/helper-text';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';

import { styles } from './styles';

import YearPicker from '../component/YearPicker';

const YearPickerQuyTrinhDong = (props: any) => {
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

  const [currentMonth, setcurrentMonth] = useState<string | undefined>();

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

  useEffect(() => {
    if (defaultValue) {
      setcurrentMonth(defaultValue);

      onMonthChange(defaultValue);
    }
  }, [defaultValue]);

  const onChange = (value: string) => {
    setcurrentMonth(value);

    onMonthChange(value);
  };

  const colorDisabled = isDisabled ? R.colors.grayText : R.colors.black0;

  const displayMonth = currentMonth
    ? moment(currentMonth).format('YYYY')
    : 'Chọn';

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const borderWidth = error ? 1 : 0;

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          disabled={isDisabled}
          onPress={showDatePicker}
          style={[styles.buttoncontainer]}
          activeOpacity={0.6}>
          <TextLabelQuyTrinh label={label} isRequired={isRequired} />
          <View style={styles.viewDisplay}>
            <View style={[styles.date, { borderWidth }]}>
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
        <YearPicker
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

export default YearPickerQuyTrinhDong;
