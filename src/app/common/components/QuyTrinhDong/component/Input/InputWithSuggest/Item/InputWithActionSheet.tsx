/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import { EKieuDuLieu } from '@config/constant';
import { WIDTH } from '@config/function';
import { HelperText } from '@libcomponents';
import { translate } from '@utils/i18n/translate';
import {
  Actionsheet,
  Box,
  IFormControlProps,
  Input,
  Pressable,
  ScrollView,
  theme,
  useDisclose,
} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

export interface SingleSelectProps extends IFormControlProps {
  data?: { label: string }[];
  error?: any;
  label?: string;
  onChangeValue?: (e: string) => void;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  isDisabled?: boolean;
  type?: EKieuDuLieu;
}

const InputWihActionSheet = (props: SingleSelectProps) => {
  const {
    isDisabled,
    data = [],
    error,
    onChangeValue,
    label,
    defaultValue,
    placeholder,
    required,
    type = EKieuDuLieu.TEXT,
    ...rest
  } = props;

  const [valueChange, setvalueChange] = useState('');

  const onChange = (value: any) => {
    if (value?.label) {
      onClose();

      onChangeValue?.(value?.label);

      setvalueChange(value?.label);
    } else {
      let val = value;
      if (type === EKieuDuLieu.NUMBER) {
        const regex = /[^0-9.]/g;

        val = val?.replace(regex, '');
      }

      setvalueChange(val);

      onChangeValue?.(val);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <Box w="full" {...rest}>
      <TextLabelQuyTrinh label={label} isRequired={required} />
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
        rightElement={
          <Pressable disabled={isDisabled} onPress={onOpen}>
            <Entypo
              style={{ marginRight: WIDTH(8) }}
              size={WIDTH(22)}
              color={isDisabled ? theme.colors.gray[200] : theme.colors.black}
              name="chevron-down"
            />
          </Pressable>
        }
      />

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content
          _dragIndicatorWrapperOffSet={{
            py: '10',
          }}>
          <ScrollView>
            {data?.map((item, index) => (
              <Actionsheet.Item
                key={index}
                onPress={() => onChange(item)}
                alignSelf={'flex-start'}
                width={WIDTH(343)}>
                {item?.label}
              </Actionsheet.Item>
            ))}
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
      <HelperText
        visible={error !== undefined}
        msg={error ?? ''}
        type={'error'}
      />
    </Box>
  );
};

export default InputWihActionSheet;
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
