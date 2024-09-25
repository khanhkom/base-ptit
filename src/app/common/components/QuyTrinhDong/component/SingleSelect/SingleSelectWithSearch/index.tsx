/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Control, Controller, FieldValues } from 'react-hook-form';

import SelectWithSearch, {
  SelectWithSearchProps,
} from './Item/SelectWithSearch';
import { translate } from '@utils/i18n/translate';

interface SingleSelectFormProps extends SelectWithSearchProps {
  name: string;
  control: Control<FieldValues, any>;
}
const SingleSelectWithSearch = (props: SingleSelectFormProps) => {
  const {
    name,
    control,
    data,
    isRequired,
    label,
    placeholder,
    defaultValue,
    isDisabled,
    style,
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value: any) => {
          if (isRequired && !value) {
            return translate('slink:Required');
          }

          return true;
        },
      }}
      render={({ field }) => {
        return (
          <SelectWithSearch
            placeholder={placeholder}
            label={label}
            data={data}
            style={style}
            onChange={field?.onChange}
            isRequired={isRequired}
            isDisabled={isDisabled}
            defaultValue={defaultValue}
          />
        );
      }}
    />
  );
};

export default SingleSelectWithSearch;
