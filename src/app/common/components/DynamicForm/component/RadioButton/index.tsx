/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import R from '@assets/R';
import { HEIGHT } from '@common';
import DynamicForm from '@components/DynamicForm';
import { HelperText } from '@libcomponents/helper-text';
import { RadioButton } from '@libcomponents/radio-button';

import { styles } from './styles';

const RadioButtonDynamicForm = (props: any) => {
  const {
    label,
    required,
    control,
    pickerData,
    defaultValue,
    unregister,
    onChange,
    disabled,
    error,
    errors,
    dataSourceElement,
  } = props;

  const [show, setshow] = useState(false);

  const [indexPicker, setindexPicker] = useState<number | null>(null);

  useEffect(() => {
    onChange(defaultValue || pickerData?.[0]?.label || '');

    if (defaultValue) {
      const defaultIndex = pickerData?.findIndex(
        (e: any) => e?.value === defaultValue,
      );

      setindexPicker(defaultIndex >= 0 ? defaultIndex : 0);
    } else {
      setindexPicker(0);
    }
  }, []);

  useEffect(() => {
    if (dataSourceElement?.[indexPicker ?? 0]?.length > 0) {
      setshow(true);
    } else {
      setshow(false);
    }
  }, [indexPicker]);

  const colorDisabled = disabled ? R.colors.grayText : R.colors.colorPink;

  return (
    <>
      <View style={[styles.containerInput]}>
        <Text style={styles.label}>
          {`${label ?? ''}`}
          {required && <Text style={styles.dot}>{' * '}</Text>}
        </Text>
        <FlatList
          data={pickerData}
          extraData={[indexPicker, pickerData]}
          scrollEnabled={false}
          keyExtractor={(item, index) => `${label}${index}`}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const marginBottom =
              index === pickerData?.length - 1 ? HEIGHT(0) : HEIGHT(8);

            return (
              <TouchableOpacity
                disabled={disabled}
                style={[styles.item, { marginBottom }]}
                testID={`${label}_${item}`}
                onPress={() => {
                  setindexPicker(index);

                  onChange(item?.label);
                }}
                key={`${label}_${item}`}>
                <RadioButton
                  sizeDot={10}
                  activeColor={colorDisabled}
                  value={indexPicker === index}
                />
                <Text style={styles.textLabel}>{item?.label ?? '--'}</Text>
              </TouchableOpacity>
            );
          }}
        />
        <HelperText
          visible={error !== undefined}
          msg={error ?? ''}
          type={'error'}
        />
      </View>
      {show && (
        <DynamicForm
          control={control}
          errors={errors}
          show={show}
          unregister={unregister}
          formInput={dataSourceElement?.[indexPicker ?? 0]}
        />
      )}
    </>
  );
};

export default RadioButtonDynamicForm;
