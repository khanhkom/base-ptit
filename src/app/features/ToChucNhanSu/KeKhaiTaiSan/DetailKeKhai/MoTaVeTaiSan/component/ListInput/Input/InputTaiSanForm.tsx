/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Controller } from 'react-hook-form';

import InputNB from '@components/QuyTrinhDong/component/Input';
import { translate } from '@utils/i18n/translate';

const InputTaiSanForm = (props: any) => {
  const { name, control, required, ...rest } = props;

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
          <InputNB
            required={required}
            onChangeValue={values => {
              field?.onChange(Number(values));
            }}
            {...rest}
          />
        );
      }}
    />
  );
};

export default InputTaiSanForm;
