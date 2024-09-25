/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import R from '@assets/R';
import { HEIGHT } from '@common';
import { ItemCauHoiProps } from '@components/ChiTietBieuMauDanhGia/type';
import { TextInput } from '@libcomponents';
import CauHoi from '../CauHoiTitle/CauHoi';
import { translate } from '@utils/i18n/translate';
import { useController, useFormContext } from 'react-hook-form';
import { VStack } from 'native-base';
import _ from 'lodash';
import TextSub from '@libcomponents/helper-text/TextSub';

const TextQuestion = (props: ItemCauHoiProps) => {
  const { data, indexs, defaultValue, disabled } = props;
  const { control } = useFormContext();

  const country = useController({
    defaultValue: defaultValue || { traLoiText: '', idCauHoi: data?._id },
    name: data?._id,
    control,
    rules: {
      validate: value => {
        if (data?.batBuoc && !value?.traLoiText?.trim()) {
          return translate('slink:Required');
        }

        return true;
      },
    },
  });
  const {
    field: { onChange },
    formState: { errors },
  } = country;
  const error = errors?.[data?._id]?.message;

  const onChangeText = (text: string) => {
    const value = {
      traLoiText: text,
      idCauHoi: data?._id,
    };
    onChange(value);
  };

  return (
    <VStack flex={1}>
      <CauHoi
        index={indexs}
        required={data?.batBuoc}
        content={data?.noiDungCauHoi}
      />
      <TextInput
        editable={!disabled}
        onChangeText={onChangeText}
        placeholder={disabled ? '' : translate('slink:Enter_here')}
        multiline
        styleInput={{
          textAlignVertical: 'top',
          fontFamily: R.fonts.BeVietnamProRegular,
        }}
        placeholderTextColor={R.colors.grayba}
        maxLength={255}
        textAlignVertical="center"
        defaultValue={defaultValue?.traLoiText ?? ''}
        styleView={{ marginTop: HEIGHT(8), marginBottom: HEIGHT(4) }}
      />
      <TextSub msg={error?.toString() || ''} visible={!!error} />
    </VStack>
  );
};

export default TextQuestion;
