/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import { getFontSize, WIDTH } from '@config/function';
import { HelperText } from '@libcomponents';
import { Checkbox, FormControl, IFormControlProps, Text } from 'native-base';

export interface MultiChoicesNBProps extends IFormControlProps {
  data: { value: string; label: string }[];
  error?: any;
  label?: string;
  required?: boolean;
  isDisabled?: boolean;
  onChangeValue?: (e: string[]) => void;
  defaultValue?: string[];
}
const MultiChoicesV2 = (props: MultiChoicesNBProps) => {
  const {
    data,
    required,
    isDisabled,
    error,
    onChangeValue,
    label,
    defaultValue,
    ...rest
  } = props;

  const onChange = (value: string[]) => {
    onChangeValue?.(value);
  };

  return (
    <FormControl isInvalid={!!error} w="full" {...rest}>
      <TextLabelQuyTrinh label={label} isRequired={required} />
      <Checkbox.Group defaultValue={defaultValue} onChange={onChange}>
        {data?.map((item, index) => (
          <Checkbox
            w={'full'}
            isChecked={defaultValue?.includes(item?.value)}
            isDisabled={isDisabled}
            key={index}
            size="sm"
            value={item.value}
            my="1">
            <Text maxWidth={WIDTH(300)} fontSize={getFontSize(12)}>
              {item?.label}
            </Text>
          </Checkbox>
        ))}
      </Checkbox.Group>
      <HelperText
        visible={error !== undefined}
        msg={error ?? ''}
        type={'error'}
      />
    </FormControl>
  );
};

export default MultiChoicesV2;
