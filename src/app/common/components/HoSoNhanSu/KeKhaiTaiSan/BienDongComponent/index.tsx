/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';

import { Controller, useController } from 'react-hook-form';

import R from '@assets/R';
import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import { EKieuDuLieu } from '@config/constant';
import { WIDTH } from '@config/function';
import {
  Collapse,
  HStack,
  Input,
  Pressable,
  Text,
  TextArea,
  useTheme,
  VStack,
} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

interface InputNBProps {
  control: any;
  setValue: any;
  error?: any;
  valueDefault?: SubmitProps | undefined;
  placeholder?: string;
  level?: number;
  label?: string;
  name: string;
  textArea?: boolean;
  isDisabled?: boolean;
  required?: boolean;
  type?: EKieuDuLieu;
}
interface SubmitProps {
  soLuong: number | string;
  giaTri: number | string;
  giaiTrinh: string;
}
const BienDongComponent = (props: InputNBProps) => {
  const {
    error,
    valueDefault,
    isDisabled,
    type,
    control,
    name,
    setValue,
    level = 1,
    label = 'Đất ở',
  } = props;

  const country = useController({
    name,
    control,
  });

  const {
    field: { onChange },
  } = country;

  const [expand, setexpand] = useState(false);

  const [valueChange, setvalueChange] = useState<SubmitProps>({
    soLuong: '',
    giaTri: '',
    giaiTrinh: '',
  });

  const resultSubmit = useRef<SubmitProps>({
    soLuong: '',
    giaTri: '',
    giaiTrinh: '',
  });

  useEffect(() => {
    if (valueDefault) {
      setvalueChange(valueDefault);

      resultSubmit.current = valueDefault;

      initValue();
    }
  }, [valueDefault]);

  const initValue = async () => {
    setValue(name, valueDefault);
  };

  const onChangeValue = (value: string, index: number) => {
    let val = value;
    if ([1, 2].includes(index)) {
      const regex = /[^0-9.]/g;

      val = val?.replace(regex, '');
    }

    switch (index) {
      case 1:
        resultSubmit.current = { ...resultSubmit.current, soLuong: val };

        break;
      case 2:
        resultSubmit.current = { ...resultSubmit.current, giaTri: val };

        break;
      case 3:
        resultSubmit.current = { ...resultSubmit.current, giaiTrinh: val };

        break;

      default:
        break;
    }

    setvalueChange(resultSubmit.current);

    const { soLuong, giaTri, giaiTrinh } = resultSubmit.current;

    const valChange = {
      soLuong: soLuong ? Number(soLuong) : null,
      giaTri: giaTri ? Number(giaTri) : null,
      giaiTrinh: giaiTrinh || null,
    };

    onChange?.(valChange);
  };

  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      render={() => {
        return (
          <VStack marginY={'2'}>
            <Pressable
              flexDirection={'row'}
              _pressed={R.themes.pressed}
              hitSlop={R.themes.hitSlop}
              alignItems={'center'}
              justifyContent="space-between"
              onPress={() => setexpand(!expand)}>
              <Text
                flex={1}
                fontFamily={
                  level === 0
                    ? R.fonts.BeVietnamProMedium
                    : R.fonts.BeVietnamProRegular
                }
                fontSize={'xs'}
                color={level === 0 ? 'black' : 'gray.500'}>
                {label}
              </Text>
              <Entypo
                style={{ marginLeft: WIDTH(16) }}
                color={theme.colors.gray[400]}
                size={WIDTH(20)}
                name={expand ? 'chevron-up' : 'chevron-down'}
              />
            </Pressable>
            <Collapse isOpen={expand}>
              <HStack
                mt="2"
                justifyContent={'space-between'}
                alignItems="center">
                <TextLabelQuyTrinh label={'Số lượng'} />
                <Input
                  value={valueChange?.soLuong ? `${valueChange?.soLuong}` : ''}
                  isReadOnly={isDisabled}
                  disableFullscreenUI
                  backgroundColor={isDisabled ? 'gray.200' : 'white'}
                  defaultValue={
                    valueDefault?.soLuong ? `${valueDefault?.soLuong}` : ''
                  }
                  width="24"
                  textAlign={'center'}
                  keyboardType="numeric"
                  placeholder={isDisabled ? '' : 'Số lượng'}
                  onChangeText={val => onChangeValue(val, 1)}
                />
              </HStack>
              <HStack
                mt="2"
                justifyContent={'space-between'}
                alignItems="center">
                <TextLabelQuyTrinh label={'Giá trị'} />
                <Input
                  value={valueChange?.giaTri ? `${valueChange?.giaTri}` : ''}
                  isReadOnly={isDisabled}
                  disableFullscreenUI
                  backgroundColor={isDisabled ? 'gray.200' : 'white'}
                  defaultValue={
                    valueDefault?.giaTri ? `${valueDefault?.giaTri}` : ''
                  }
                  width="24"
                  textAlign={'center'}
                  keyboardType="numeric"
                  placeholder={isDisabled ? '' : 'Giá trị'}
                  onChangeText={val => onChangeValue(val, 2)}
                />
              </HStack>
              <VStack mt="2">
                <TextLabelQuyTrinh
                  flex={undefined}
                  label={
                    'Nội dung giải trình nguồn gốc tài sản tăng thêm và tổng thu nhập'
                  }
                />
                <TextArea
                  value={
                    valueChange?.giaiTrinh ? `${valueChange?.giaiTrinh}` : ''
                  }
                  defaultValue={
                    valueDefault?.giaiTrinh ? `${valueDefault?.giaiTrinh}` : ''
                  }
                  numberOfLines={4}
                  disableFullscreenUI
                  isReadOnly={isDisabled}
                  backgroundColor={isDisabled ? 'gray.200' : 'white'}
                  isInvalid={!!error}
                  placeholder={
                    isDisabled
                      ? ''
                      : 'Nội dung giải trình nguồn gốc tài sản tăng thêm và tổng thu nhập'
                  }
                  mt="1"
                  keyboardType={keyboardType(type)}
                  onChangeText={val => onChangeValue(val, 3)}
                  autoCompleteType={undefined}
                />
              </VStack>
            </Collapse>
          </VStack>
        );
      }}
    />
  );
};

export default BienDongComponent;
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
