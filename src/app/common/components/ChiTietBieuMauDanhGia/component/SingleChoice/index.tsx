/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react';

import R from '@assets/R';
import { HEIGHT } from '@common';
import { ItemCauHoiProps } from '@components/ChiTietBieuMauDanhGia/type';
import RadioButtonNB from '@components/QuyTrinhDong/component/RadioButton';
import { TextInput } from '@libcomponents';
import { VStack } from 'native-base';

import CauHoi from '../CauHoiTitle/CauHoi';
import { translate } from '@utils/i18n/translate';
import { useController, useFormContext } from 'react-hook-form';
import TextSub from '@libcomponents/helper-text/TextSub';

const SingleChoice = (props: ItemCauHoiProps) => {
  const { data, indexs, defaultValue, disabled } = props;
  const traLoiKhac = defaultValue?.traLoiKhac || '';
  const [isOther, setisOther] = useState<boolean>(!!traLoiKhac || false);
  const [ghiChu, setghiChu] = useState(traLoiKhac);
  const cauTraLoiKhac = data?.cauTraLoiKhac;
  const dataLuaChon = cauTraLoiKhac
    ? [...data?.luaChon, { noiDung: translate('slink:Other'), _id: 'other' }]
    : data?.luaChon ?? [];

  const defaultValueIndex = dataLuaChon?.findIndex(e =>
    defaultValue?.listLuaChon?.includes(e?.noiDung),
  );
  const valueInit = !!traLoiKhac
    ? 'other'
    : dataLuaChon?.[defaultValueIndex]?._id;

  const { control } = useFormContext();
  const country = useController({
    defaultValue: defaultValue || {
      listLuaChonBang: [],
      listLuaChon: [],
      idCauHoi: data?._id,
      traLoiKhac: '',
    },
    name: data?._id,
    control,
    rules: {
      validate: value => {
        if (
          !data?.batBuoc ||
          value?.listLuaChon?.length > 0 ||
          !!value?.traLoiKhac?.trim()
        ) {
          return true;
        }
        return translate('slink:Required');
      },
    },
  });
  const {
    field: { onChange },
    formState: { errors },
  } = country;
  const error = errors?.[data?._id]?.message;

  const onSelectAnswer = (id: string) => {
    const other = id === 'other';
    setisOther(other);
    setghiChu('');
    onChange({
      listLuaChonBang: [],
      listLuaChon: other ? [] : [id],
      idCauHoi: data?._id,
      traLoiKhac: other ? ghiChu : '',
    });
  };

  const onChangeCauTraLoiKhac = (text: string) => {
    setghiChu(text);
    onChange({
      listLuaChonBang: [],
      listLuaChon: [],
      idCauHoi: data?._id,
      traLoiKhac: text,
    });
  };

  return (
    <VStack flex={1}>
      <CauHoi
        index={indexs}
        required={data?.batBuoc}
        content={data?.noiDungCauHoi}
      />
      <RadioButtonNB
        defaultValue={valueInit}
        isDisabled={disabled}
        data={dataLuaChon?.map(item => {
          return { label: item?.noiDung, value: item?._id };
        })}
        onChangeValue={onSelectAnswer}
      />
      {data?.cauTraLoiKhac && isOther && (
        <TextInput
          defaultValue={traLoiKhac}
          multiline
          styleView={{ marginTop: HEIGHT(8), marginBottom: HEIGHT(4) }}
          placeholder={translate('slink:Enter_here')}
          styleInput={{ fontFamily: R.fonts.BeVietnamProRegular }}
          onChangeText={text => onChangeCauTraLoiKhac(text)}
        />
      )}
      <TextSub msg={error?.toString() || ''} visible={!!error} />
    </VStack>
  );
};

export default SingleChoice;
