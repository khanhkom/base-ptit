/* eslint-disable @typescript-eslint/no-explicit-any */
import { translate } from '@utils/i18n/translate';
import React from 'react';

import { Control, Controller, FieldValues } from 'react-hook-form';

import InputNB, { InputNBProps } from '..';
import InputWihActionSheet from './Item/InputWithActionSheet';

interface InputNBFormProps extends InputNBProps {
  name: string;
  control?: Control<FieldValues, any>;
  data?: { label: string }[];
}
const InputWithSuggest = (props: InputNBFormProps) => {
  const { name, control, required, data, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value: any) => {
          if (required && !value) {
            return translate('slink:Required');
          }

          return true;
        },
      }}
      render={({ field }) => {
        return (
          <InputWihActionSheet
            data={data}
            required={required}
            onChangeValue={field?.onChange}
            {...rest}
          />
        );
      }}
    />
  );
};

export default InputWithSuggest;
