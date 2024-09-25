/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import R from '@assets/R';
import { execFunc } from '@common';
import DynamicForm from '@components/DynamicForm';
import { DropDown } from '@libcomponents/drop-down';
import { HelperText } from '@libcomponents/helper-text';

import { styles } from './styles';

const DropdownV2 = (props: any) => {
  const {
    label,
    required,
    control,
    isLast,
    error,
    data,
    unregister,
    disabled,
    onChange,
    onFocus,
    onBlur,
    errors,
    itemData,
    placeHolder = 'Chọn',
    dataSourceElement,
    placeholderStyle,
    style,
    ...rest
  } = props;

  const [show, setshow] = useState(false);

  // const [focusPicker, setfocusPicker] = useState(false);

  const [indexPicker, setindexPicker] = useState<number>(0);

  useEffect(() => {
    if (dataSourceElement?.[indexPicker]?.length > 0) {
      setshow(true);
    } else {
      setshow(false);
    }
  }, [indexPicker]);

  const listvalue =
    data?.map((item: { label: string }) => {
      return item?.label;
    }) ?? [];

  const handleFocus = (e: any) => {
    // setfocusPicker(true);

    execFunc(onFocus, e);
  };

  const handleBlur = (e: any) => {
    // setfocusPicker(false);

    execFunc(onBlur, e);
  };

  const colorDisable = disabled ? R.colors.grayText : R.colors.black0;

  return (
    <>
      <View
        style={[
          styles.containerInput,
          style,
          isLast && { borderBottomWidth: 0 },
        ]}>
        {label && (
          <Text style={[styles.label]}>
            {`${label ?? ''}`}
            {required && <Text style={styles.dot}>{' * '}</Text>}
          </Text>
        )}
        <DropDown
          key={itemData?._id}
          placeholderStyle={[
            styles.placeholderStyle,
            placeholderStyle,
            { color: colorDisable },
          ]}
          containerStyle={styles.dropDown}
          arrowColor={colorDisable}
          disabled={disabled}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeHolder={disabled ? '' : placeHolder}
          onChangeItem={value => {
            setindexPicker(listvalue?.indexOf(value));

            onChange?.(value);
          }}
          data={data}
          {...rest}
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
          disabled={disabled}
          unregister={unregister}
          formInput={dataSourceElement?.[indexPicker]}
        />
      )}
    </>
  );
};

export default DropdownV2;
