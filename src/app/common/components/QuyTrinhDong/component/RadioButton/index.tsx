/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';

import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import { getFontSize, WIDTH } from '@config/function';
import { HelperText } from '@libcomponents';
import { FormControl, IFormControlProps, Radio, Text } from 'native-base';
interface Props extends IFormControlProps {
  data: { value: any; label: string }[];
  error?: string;
  label?: string;
  required?: boolean;
  isDisabled?: boolean;
  onChangeValue?: (e: any) => void;
  defaultValue?: string;
}
const RadioButtonNB = (props: Props) => {
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

  const indexInit = data?.findIndex(item => item?.value === defaultValue);

  useEffect(() => {
    if (defaultValue) {
      onChange(indexInit.toString() ?? '');
    }
  }, []);

  const onChange = (value: string) => {
    onChangeValue?.(data?.[Number(value)]?.value);
  };

  return (
    <FormControl isInvalid={!!error} w="full" {...rest}>
      <TextLabelQuyTrinh label={label} isRequired={required} />
      <Radio.Group
        isReadOnly={isDisabled}
        name="Radio"
        defaultValue={indexInit.toString()}
        onChange={onChange}>
        {data?.map((item, index) => (
          <Radio
            isDisabled={isDisabled}
            key={index}
            size="sm"
            value={index.toString()}
            my="1">
            <Text maxWidth={WIDTH(300)} fontSize={getFontSize(12)}>
              {item?.label}
            </Text>
          </Radio>
        ))}
      </Radio.Group>
      <HelperText
        visible={error !== undefined}
        msg={error ?? ''}
        type={'error'}
      />
    </FormControl>
  );
};

export default RadioButtonNB;
