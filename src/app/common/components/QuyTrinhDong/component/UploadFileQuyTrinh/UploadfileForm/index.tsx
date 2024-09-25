/* eslint-disable @typescript-eslint/no-explicit-any */
import { translate } from '@utils/i18n/translate';
import React from 'react';

import { Control, Controller, FieldValues } from 'react-hook-form';

import UploadFileQuyTrinh from '..';
interface Props {
  name: string;
  control: Control<FieldValues, any> | undefined;
  required?: boolean;
}
const UploadFileForm = (props: Props & { [key: string]: any }) => {
  const { name, control, required, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value: any) => {
          if (required && (!value || value?.length === 0)) {
            return translate('slink:Required');
          }

          return true;
        },
      }}
      render={({ field }) => {
        return (
          <UploadFileQuyTrinh
            isRequired={required}
            changeListFile={field?.onChange}
            {...rest}
          />
        );
      }}
    />
  );
};

export default UploadFileForm;
