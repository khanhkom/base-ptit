/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import R from '@assets/R';
import DynamicForm from '@components/DynamicForm';
import { CheckBox } from '@libcomponents/check-box';
import { HelperText } from '@libcomponents/helper-text';

import { styles } from './styles';

const CheckBoxDynamicForm = (props: any) => {
  const {
    label,
    control,
    error,
    unregister,
    onChange,
    errors,
    disabled,
    defaultValue,
    dataSourceElement,
    style,
  } = props;

  const [checked, setchecked] = useState(defaultValue ?? false);

  useEffect(() => {
    if (defaultValue) {
      onChange(defaultValue);
    }
  }, [defaultValue]);

  const onCheck = () => {
    onChange(!checked);

    setchecked(!checked);
  };

  const colorDisabled = disabled ? R.colors.grayText : R.colors.colorPink;

  return (
    <>
      <View style={[styles.containerInput, style]}>
        <CheckBox
          fillStyle={{ backgroundColor: colorDisabled }}
          onToggle={onCheck}
          value={checked}
          disable={disabled}
          textStyle={styles.label}
          style={[styles.checkBox]}
          text={label || '--'}
        />
        <HelperText
          visible={error !== undefined}
          msg={error ?? ''}
          type={'error'}
        />
      </View>
      <DynamicForm
        control={control}
        errors={errors}
        show={checked}
        disabled={disabled}
        formContainer={styles.formContainer}
        unregister={unregister}
        formInput={
          checked ? dataSourceElement?.checked : dataSourceElement?.notChecked
        }
      />
    </>
  );
};

export default CheckBoxDynamicForm;
