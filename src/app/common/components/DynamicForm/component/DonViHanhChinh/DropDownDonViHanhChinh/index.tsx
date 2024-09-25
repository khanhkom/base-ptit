/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Text, View } from 'react-native';

import R from '@assets/R';
import { execFunc } from '@common';
import { DropDown } from '@libcomponents/drop-down';

import { styles } from './styles';

const DropdownV2 = (props: any) => {
  const {
    label,
    required,
    disabled,
    data,
    onChange,
    onFocus,
    hidden,
    onBlur,
    itemData,
    ...rest
  } = props;

  const handleFocus = (e: any) => {
    execFunc(onFocus, e);
  };

  const handleBlur = (e: any) => {
    execFunc(onBlur, e);
  };

  if (hidden) {
    return <></>;
  }

  const colorDisable = disabled ? R.colors.grayText : R.colors.black0;

  return (
    <>
      <View style={[styles.containerInput]}>
        {label && (
          <Text style={[styles.label]}>
            {`${label ?? ''}`}
            {required && <Text style={styles.dot}>{' * '}</Text>}
          </Text>
        )}
        <DropDown
          key={itemData?._id}
          placeholderStyle={[styles.placeholderStyle, { color: colorDisable }]}
          arrowColor={colorDisable}
          onBlur={handleBlur}
          containerStyle={styles.dropDown}
          disabled={disabled}
          onFocus={handleFocus}
          placeHolder={`${label}`}
          onChangeItem={value => {
            onChange?.(value);
          }}
          data={data}
          {...rest}
        />
      </View>
    </>
  );
};

export default DropdownV2;
