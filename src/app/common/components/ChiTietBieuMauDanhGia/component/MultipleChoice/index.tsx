/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { ItemCauHoiProps } from '@components/ChiTietBieuMauDanhGia/type';
import MultiChoicesNB from '@components/QuyTrinhDong/component/MultiChoices';

import CauHoi from '../CauHoiTitle/CauHoi';
import { useController, useFormContext } from 'react-hook-form';
import { translate } from '@utils/i18n/translate';
import TextSub from '@libcomponents/helper-text/TextSub';
import { VStack } from 'native-base';
import _ from 'lodash';
import MultiChoicesV2 from '@components/QuyTrinhDong/component/MultiChoices/MultiChoiceNew';

const MultipleChoice = (props: ItemCauHoiProps) => {
  const { data, indexs, defaultValue, disabled } = props;
  const valueInit =
    defaultValue?.map((item: string) => {
      const objValue = data?.luaChon?.find(e => e?.noiDung === item);

      return objValue?._id;
    }) ?? [];
  const { control } = useFormContext();
  const country = useController({
    defaultValue: { idCauHoi: data?._id, listLuaChon: valueInit },
    name: data?._id,
    control,
    rules: {
      validate: value => {
        if (data?.batBuoc && _.isEmpty(value?.listLuaChon)) {
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
  const onSelectAnswer = (result: string[]) => {
    onChange({
      listLuaChon: result,
      idCauHoi: data?._id,
    });
  };

  return (
    <VStack flex={1}>
      <CauHoi
        index={indexs}
        required={data?.batBuoc}
        content={data?.noiDungCauHoi}
      />
      <MultiChoicesV2
        isDisabled={disabled}
        data={data?.luaChon?.map((item: { noiDung: string; _id: string }) => {
          return { label: item?.noiDung, value: item?._id };
        })}
        onChangeValue={onSelectAnswer}
        defaultValue={valueInit}
      />
      <TextSub msg={error?.toString() || ''} visible={!!error} />
    </VStack>
  );
};

export default MultipleChoice;
