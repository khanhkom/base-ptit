/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { WIDTH } from '@common';
import TextTitleTCNS from '@components/HoSoNhanSu/component/TextLabelTCNS';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import { Collapse, VStack } from 'native-base';

const InputNhanXet = ({
  setValue,
  isDisabled,
  control,
  defaultValue,
  label,
  name,
}) => {
  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    }
  }, [defaultValue]);

  const [expand, setexpand] = useState(false);

  return (
    <VStack alignItems={'center'}>
      <TextTitleTCNS
        label={label}
        expand={expand}
        onPress={() => {
          setexpand(!expand);
        }}
      />
      <Collapse isOpen={expand}>
        <InputNBForm
          width={WIDTH(343)}
          textArea
          placeholder={label}
          isDisabled={isDisabled}
          defaultValue={defaultValue}
          name={name}
          control={control}
          error={undefined}
        />
      </Collapse>
    </VStack>
  );
};

export default InputNhanXet;
