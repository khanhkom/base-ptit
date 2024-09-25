/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import { EKieuDuLieu } from '@config/constant';
import { HelperText } from '@libcomponents';
import { translate } from '@utils/i18n/translate';
import { FormControl, IFormControlProps, Input, TextArea } from 'native-base';

export interface InputNBProps extends IFormControlProps {
  error?: any;
  label?: string;
  onChangeValue?: (e: string) => void;
  defaultValue?: string | undefined;
  placeholder?: string;
  textArea?: boolean;
  isDisabled?: boolean;
  required?: boolean;
  type?: EKieuDuLieu;
}
const InputNB = (props: InputNBProps) => {
  const {
    error,
    onChangeValue,
    label,
    defaultValue,
    placeholder,
    textArea,
    isDisabled,
    type,
    required,
    ...rest
  } = props;

  const [valueChange, setvalueChange] = useState('');

  useEffect(() => {
    defaultValue && setvalueChange(defaultValue);
  }, [defaultValue]);

  const onChange = (value: string) => {
    let val = value;
    if (type === EKieuDuLieu.NUMBER) {
      const regex = /[^0-9.]/g;

      val = val?.replace(regex, '');
    }

    setvalueChange(val);

    onChangeValue?.(val);
  };

  return (
    <FormControl isInvalid={!!error} w="full" {...rest}>
      <TextLabelQuyTrinh label={label} isRequired={required} />
      {textArea ? (
        <TextArea
          value={valueChange}
          defaultValue={defaultValue}
          numberOfLines={4}
          disableFullscreenUI
          isReadOnly={isDisabled}
          backgroundColor={isDisabled ? 'gray.200' : 'white'}
          isInvalid={!!error}
          placeholder={
            isDisabled ? '' : placeholder || translate('slink:Enter_here')
          }
          mt="1"
          keyboardType={keyboardType(type)}
          onChangeText={onChange}
          autoCompleteType={undefined}
        />
      ) : (
        <Input
          value={valueChange}
          isReadOnly={isDisabled}
          disableFullscreenUI
          backgroundColor={isDisabled ? 'gray.200' : 'white'}
          defaultValue={defaultValue}
          height={'12'}
          keyboardType={keyboardType(type)}
          placeholder={
            isDisabled ? '' : placeholder || translate('slink:Enter_here')
          }
          onChangeText={onChange}
          mt="1"
        />
      )}
      <HelperText
        visible={error !== undefined}
        msg={error ?? ''}
        type={'error'}
      />
    </FormControl>
  );
};

export default InputNB;
const keyboardType = (type: EKieuDuLieu | undefined) => {
  switch (type) {
    case EKieuDuLieu.NUMBER:
      return 'numeric';

    case EKieuDuLieu.DECIMAL:
      return 'decimal-pad';

    default:
      return undefined;
  }
};
