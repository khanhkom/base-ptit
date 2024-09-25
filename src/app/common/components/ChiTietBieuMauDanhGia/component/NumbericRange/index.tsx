/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

import { EQUESTION_TYPE, getFontSize, HEIGHT } from '@common';
import { ItemCauHoiProps } from '@components/ChiTietBieuMauDanhGia/type';
import { Box, Radio, Text, VStack } from 'native-base';

import CauHoi from '../CauHoiTitle/CauHoi';
import { useController, useFormContext } from 'react-hook-form';
import { translate } from '@utils/i18n/translate';
import TextSub from '@libcomponents/helper-text/TextSub';

const NumbericRange = (props: ItemCauHoiProps) => {
  const { data, indexs, defaultValue, disabled } = props;
  const { control } = useFormContext();
  const country = useController({
    defaultValue: defaultValue || {
      luaChonTuyenTinh: null,
      idCauHoi: data?._id,
    },
    name: data?._id,
    control,
    rules: {
      validate: value => {
        if (data?.batBuoc && typeof value?.luaChonTuyenTinh !== 'number') {
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

  const onAnswerQuestion = (cauTraLoi: string) => {
    const value = {
      luaChonTuyenTinh: Number(cauTraLoi || 0),
      idCauHoi: data?._id,
    };

    onChange(value);
  };
  const error = errors?.[data?._id]?.message;

  const arrLength = data?.gioiHanTrenTuyenTinh - data?.gioiHanDuoiTuyenTinh + 1;

  return (
    <VStack flex={1}>
      <CauHoi
        index={indexs}
        required={data?.batBuoc}
        content={data?.noiDungCauHoi}
      />
      <Radio.Group
        name={data?._id}
        isDisabled={disabled}
        marginTop={HEIGHT(4)}
        accessibilityLabel="select prize"
        defaultValue={defaultValue?.luaChonTuyenTinh?.toString()}
        onChange={onAnswerQuestion}>
        <Box flexDirection={'row'} justifyContent="space-between" w={'full'}>
          {new Array(arrLength).fill(0)?.map((item, index) => (
            <Box flexDirection={'column'} alignItems="center">
              <Radio
                isDisabled={disabled}
                key={index}
                size="sm"
                value={(index + data?.gioiHanDuoiTuyenTinh).toString()}
              />
              <Text fontSize={getFontSize(12)}>
                {index + data?.gioiHanDuoiTuyenTinh}
              </Text>
            </Box>
          ))}
        </Box>
      </Radio.Group>
      <TextSub msg={error?.toString() || ''} visible={!!error} />
    </VStack>
  );
};

export default NumbericRange;
