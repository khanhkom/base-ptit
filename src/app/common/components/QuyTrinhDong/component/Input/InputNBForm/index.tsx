/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Control, Controller, FieldValues } from 'react-hook-form';

import { translate } from '@utils/i18n/translate';

import InputNB, { InputNBProps } from '..';

interface InputNBFormProps extends InputNBProps {
  name: string;
  control?: Control<FieldValues, any>;
  min?: number;
  max?: number;
}
const InputNBForm = (props: InputNBFormProps) => {
  const { name, min, max, control, required, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value: any) => {
          if (required && !value) {
            return translate('slink:Required');
          }

          if (min && Number(value) < min) {
            return `${translate('slink:Min', { min })}`;
          }

          if (max && Number(value) > max) {
            return `${translate('slink:Max', { max })}`;
          }

          return true;
        },
      }}
      render={({ field }) => {
        return (
          <InputNB
            required={required}
            onChangeValue={field?.onChange}
            {...rest}
          />
        );
      }}
    />
  );
};

export default InputNBForm;
