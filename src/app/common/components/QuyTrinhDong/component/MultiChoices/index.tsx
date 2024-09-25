/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import { getFontSize, WIDTH } from '@config/function';
import { HelperText } from '@libcomponents';
import {
  Checkbox,
  FlatList,
  FormControl,
  IFormControlProps,
  Text,
} from 'native-base';

export interface MultiChoicesNBProps extends IFormControlProps {
  data: { value: string; label: string }[];
  error?: any;
  label?: string;
  required?: boolean;
  isDisabled?: boolean;
  onChangeValue?: (e: string[]) => void;
  defaultValue?: string[];
  numOfRow?: number;
}
const MultiChoicesNB = (props: MultiChoicesNBProps) => {
  const {
    data,
    required,
    isDisabled,
    error,
    onChangeValue,
    label,
    defaultValue,
    numOfRow = 1,
    ...rest
  } = props;

  const [loading, setloading] = useState(true);

  const onChange = (value: string[]) => {
    onChangeValue?.(value);
  };

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 300);
  }, []);

  if (loading) {
    return (
      <FormControl isInvalid={!!error} w="full" {...rest}>
        <TextLabelQuyTrinh label={label} isRequired={required} />
        <HelperText
          visible={error !== undefined}
          msg={error ?? ''}
          type={'error'}
        />
      </FormControl>
    );
  }

  return (
    <FormControl isInvalid={!!error} w="full" {...rest}>
      <TextLabelQuyTrinh label={label} isRequired={required} />
      <Checkbox.Group defaultValue={defaultValue} onChange={onChange}>
        {/* {data?.map((item, index) => (

        ))} */}
        <FlatList
          data={data}
          numColumns={numOfRow}
          renderItem={({ item, index }) => (
            <Checkbox
              w={'full'}
              isChecked={defaultValue?.includes(item?.value)}
              isDisabled={isDisabled}
              key={index}
              size="sm"
              value={item.value}
              my="1">
              <Text
                minW={WIDTH(300 / numOfRow)}
                // mr={'3'}
                maxWidth={WIDTH(300)}
                fontSize={getFontSize(12)}>
                {item?.label}
              </Text>
            </Checkbox>
          )}
        />
      </Checkbox.Group>
      <HelperText
        visible={error !== undefined}
        msg={error ?? ''}
        type={'error'}
      />
    </FormControl>
  );
};

export default MultiChoicesNB;
