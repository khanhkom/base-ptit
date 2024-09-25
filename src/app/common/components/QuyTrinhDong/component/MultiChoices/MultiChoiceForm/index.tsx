/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Control, Controller, FieldValues } from 'react-hook-form';

import { translate } from '@utils/i18n/translate';

import MultiChoicesNB, { MultiChoicesNBProps } from '..';
interface SingleSelectFormProps extends MultiChoicesNBProps {
  name: string;
  control: Control<FieldValues, any>;
  numOfRow?: number;
}
const MultiChoiceForm = (props: SingleSelectFormProps) => {
  const { name, control, required, numOfRow = 1, ...rest } = props;

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
          <MultiChoicesNB
            required={required}
            onChangeValue={field?.onChange}
            numOfRow={numOfRow}
            {...rest}
          />
        );
      }}
    />
  );
};

export default MultiChoiceForm;
