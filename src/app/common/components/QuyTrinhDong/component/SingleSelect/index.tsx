/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';

import R from '@assets/R';
import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import { getFontSize, WIDTH } from '@config/function';
import { HelperText } from '@libcomponents';
import { Box, IFormControlProps, Select, theme } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

export interface SingleSelectProps extends IFormControlProps {
  data: { value: boolean | string; label: string; isDisabled?: boolean }[];
  error?: any;
  label?: string;
  onChangeValue?: (e: string) => void;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  isDisabled?: boolean;
}

const SingleSelect = (props: SingleSelectProps) => {
  const {
    isDisabled,
    data,
    error,
    onChangeValue,
    label,
    defaultValue,
    placeholder,
    required,
    ...rest
  } = props;

  const [service, setService] = React.useState('');

  useEffect(() => {
    setService(defaultValue ?? '');
  }, [defaultValue]);

  const onChange = (value: string) => {
    setService(value);

    onChangeValue?.(value);
  };

  return (
    <Box w="full" {...rest}>
      <TextLabelQuyTrinh label={label} isRequired={required} />
      <Select
        defaultValue={defaultValue}
        selectedValue={service}
        borderWidth={1}
        borderColor={error ? 'red.600' : 'gray.300'}
        height={'12'}
        backgroundColor={isDisabled ? 'gray.200' : 'white'}
        placeholder={placeholder || 'Chọn'}
        _selectedItem={{
          bg: R.colors.primaryColor,
          _text: {
            color: R.colors.white100,
            fontFamily: R.fonts.BeVietnamProRegular,
          },
        }}
        onValueChange={onChange}
        // fontSize={'sm'}

        fontSize={getFontSize(14)}
        _item={{
          _text: {
            // color: R.colors.gray6B,
            fontFamily: R.fonts.BeVietnamProRegular,
          },
        }}
        color={R.colors.gray6B}
        fontFamily={R.fonts.BeVietnamProRegular}
        // _actionSheet={{
        //   animationPreset: 'fade',
        // }}
        dropdownIcon={
          <Entypo
            style={{ marginRight: WIDTH(8) }}
            size={WIDTH(22)}
            color={isDisabled ? theme.colors.gray[200] : theme.colors.black}
            name="chevron-down"
          />
        }
        dropdownOpenIcon={
          <Entypo
            style={{ marginRight: WIDTH(8) }}
            size={WIDTH(22)}
            color={isDisabled ? theme.colors.gray[200] : theme.colors.black}
            name="chevron-up"
          />
        }
        mt="1">
        {data?.map((item, index) => (
          <Select.Item
            disabled={isDisabled}
            color={'black'}
            isDisabled={item?.isDisabled}
            key={index}
            label={item?.label}
            value={item?.value}
          />
        ))}
      </Select>
      <HelperText
        visible={error !== undefined}
        msg={error ?? ''}
        type={'error'}
      />
    </Box>
  );
};

export default SingleSelect;
