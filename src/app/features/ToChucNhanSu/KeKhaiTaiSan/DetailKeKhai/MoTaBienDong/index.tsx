/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

import { WIDTH } from '@common';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import { ScrollView } from 'native-base';

const MoTaBienDong = ({
  isDisabled,
  control,
  defaultValue,
  visible,
  setValue,
}) => {
  useEffect(() => {
    !!defaultValue && setValue('moTaBienDong', defaultValue);
  }, []);

  if (visible) {
    return (
      <ScrollView>
        {/* <TextTitleTCNS
          label={'III. THÔNG TIN MÔ TẢ VỀ TÀI SẢN, THU NHẬP TĂNG THÊM'}
        /> */}
        <InputNBForm
          width={WIDTH(343)}
          textArea
          isDisabled={isDisabled}
          defaultValue={defaultValue}
          name={'moTaBienDong'}
          control={control}
          error={undefined}
        />
      </ScrollView>
    );
  }

  return null;
};

export default MoTaBienDong;
