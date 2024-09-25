/* eslint-disable react-hooks/exhaustive-deps */
import React, { ForwardedRef, forwardRef, useEffect } from 'react';
import {
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  Text,
  TextInputFocusEventData,
  View,
} from 'react-native';

import R from '@assets/R';
import { execFunc } from '@common';
import { HelperText } from '@libcomponents/helper-text';
import { useTheme } from '@theme';

import { styles } from './styles';
import { TextInputProps } from './type';

export const TextInputV2 = forwardRef(
  (
    {
      label,
      required,
      editable,
      rxFormat,
      multiline,
      placeholder,
      nameTrigger,
      onBlur,
      trigger,
      onFocus,
      onChangeText,
      styleView,
      defaultValue,
      error,
      ...rest
    }: TextInputProps,
    ref: ForwardedRef<RNTextInput>,
  ) => {
    const { colors } = useTheme();

    useEffect(() => {
      handleTextChange(defaultValue);
    }, [defaultValue]);

    const handleTextChange = (text: string) => {
      const actualText =
        rxFormat !== undefined ? text.replace(rxFormat, '') : text;

      execFunc(onChangeText, actualText);

      if (nameTrigger) {
        execFunc(trigger, nameTrigger);
      }
    };

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      execFunc(onFocus, e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      execFunc(onBlur, e);
    };

    // render
    return (
      <>
        <View
          style={[
            styles.containerInput,
            styleView,
            multiline && {
              alignItems: 'flex-start',
              flexDirection: 'column',
            },
          ]}>
          {label && (
            <Text style={[styles.label]}>
              {`${label}`}
              {required && <Text style={styles.dot}>{' * '}</Text>}
            </Text>
          )}
          <View style={styles.viewInput}>
            <RNTextInput
              {...rest}
              ref={ref}
              editable={editable}
              autoCorrect={false}
              defaultValue={defaultValue?.toString()}
              clearButtonMode={'never'}
              underlineColorAndroid={'transparent'}
              placeholder={placeholder}
              selectionColor={colors.primary}
              style={[
                styles.input,
                multiline && styles.multiline,
                {
                  color:
                    editable === false ? R.colors.grayText : R.colors.black0,
                },
              ]}
              multiline={multiline}
              onChangeText={handleTextChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </View>
          <HelperText
            visible={error !== undefined}
            msg={error ?? ''}
            type={'error'}
          />
        </View>
      </>
    );
  },
);
