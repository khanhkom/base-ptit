/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

import R from '@assets/R';
import { WIDTH } from '@common';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import { Text, VStack } from 'native-base';

const InputKhaiBao = ({ index, item, control, setValue, isDisabled }) => {
  useEffect(() => {
    item?.input?.value && setValue(item?.input?.name, item?.input?.value);
  }, []);

  return (
    <VStack paddingX={WIDTH(16)}>
      <Text
        fontFamily={R.fonts.BeVietnamProMedium}
        fontSize={'xs'}
        color={'black'}>
        {`${index + 1}. ${item?.title}`}
      </Text>
      <InputNBForm
        isDisabled={isDisabled}
        defaultValue={item?.input?.value}
        name={item?.input?.name}
        control={control}
        error={undefined}
      />
    </VStack>
  );
};

export default InputKhaiBao;
