import React from 'react';

import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import { HStack, Input, TextArea, VStack } from 'native-base';
import { IInputProps } from 'native-base/lib/typescript/components/primitives/Input/types';
import { translate } from '@utils/i18n/translate';
interface InputLabelProps extends IInputProps {
  placeholder?: string;
  isDisabled?: boolean;
  label: string;
  textArea?: boolean;
}
const InputLabel = (props: InputLabelProps) => {
  const { isDisabled, placeholder, textArea = false, label, ...rest } = props;

  if (textArea) {
    return (
      <VStack mt="2">
        <TextLabelQuyTrinh flex={undefined} label={label} />
        <TextArea
          numberOfLines={4}
          disableFullscreenUI
          isReadOnly={isDisabled}
          backgroundColor={isDisabled ? 'gray.200' : 'white'}
          placeholder={isDisabled ? '' : placeholder || translate('slink:Nhap')}
          mt="1"
          autoCompleteType={undefined}
          {...rest}
        />
      </VStack>
    );
  }

  return (
    <HStack mt="2" justifyContent={'space-between'} alignItems="center">
      <TextLabelQuyTrinh label={label} />
      <Input
        isReadOnly={isDisabled}
        disableFullscreenUI
        backgroundColor={isDisabled ? 'gray.200' : 'white'}
        width="24"
        textAlign={'center'}
        placeholder={isDisabled ? '' : placeholder || translate('slink:Nhap')}
        {...rest}
      />
    </HStack>
  );
};

export default InputLabel;
