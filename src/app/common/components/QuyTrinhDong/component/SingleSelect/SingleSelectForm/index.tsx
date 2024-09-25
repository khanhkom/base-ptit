/* eslint-disable @typescript-eslint/no-explicit-any */
import { translate } from '@utils/i18n/translate';
import React from 'react';

import { Control, Controller, FieldValues } from 'react-hook-form';

import SingleSelect, { SingleSelectProps } from '..';
interface SingleSelectFormProps extends SingleSelectProps {
  name: string;
  control: Control<FieldValues, any>;
}
const SingleSelectForm = (props: SingleSelectFormProps) => {
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
          <SingleSelect
            required={required}
            onChangeValue={field?.onChange}
            {...rest}
          />
        );
      }}
    />
  );
};

export default SingleSelectForm;
