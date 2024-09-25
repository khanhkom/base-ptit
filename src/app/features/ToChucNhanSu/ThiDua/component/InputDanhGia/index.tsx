/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inline-comments */

import React, { useEffect, useRef, useState } from 'react';

import { Controller, useController } from 'react-hook-form';

import R from '@assets/R';
import { EKieuDuLieu } from '@common';
import InputLabel from '@components/HoSoNhanSu/KeKhaiTaiSan/InputLabel';
import { Text, VStack } from 'native-base';
import { translate } from '@utils/i18n/translate';

interface SubmitProps {
  caNhan: string | null;
  donVi: string | null;
}

const InputDanhGia = props => {
  const {
    isRequired,
    defaultValueCaNhan,
    defaultValueDonVi,
    label,
    control,
    name,
    minValue,
    maxValue,
    setValue,
    isDisabled,
    error,
    isDonVi,
  } = props;

  const objDefaultValue = {
    caNhan: defaultValueCaNhan,
    donVi: defaultValueDonVi,
  };

  const [valueChange, setvalueChange] = useState<SubmitProps>(objDefaultValue);

  useEffect(() => {
    if (defaultValueCaNhan || defaultValueDonVi) {
      setValue(name, objDefaultValue);
    }
  }, [defaultValueCaNhan, defaultValueDonVi]);

  const country = useController({
    name,
    control,
  });

  const {
    field: { onChange },
  } = country;

  const resultSubmit = useRef<SubmitProps>({
    caNhan: '',
    donVi: '',
  });

  const onChangeText = (val: string, index: number) => {
    const value = val;
    // if ([1, 2].includes(index)) {
    //   const regex = /[^0-9.]/g;

    //   value = value?.replace(regex, '');
    // }
    if (Number.isNaN(Number(val))) {
      return;
    }

    if (
      value !== '' &&
      (Number(value) < (minValue ?? 0) || Number(value) > (maxValue ?? 100))
    ) {
      return; // Không cập nhật giá trị nếu nằm ngoài phạm vi
    }

    switch (index) {
      case 1:
        resultSubmit.current = { ...resultSubmit.current, caNhan: val };

        break;
      case 2:
        resultSubmit.current = { ...resultSubmit.current, donVi: val };

        break;

      default:
        break;
    }

    setvalueChange(resultSubmit.current);

    const { caNhan, donVi } = resultSubmit.current;

    const valChange = {
      caNhan: caNhan || null,
      donVi: donVi || null,
    };

    onChange?.(valChange);
  };

  const required = !isDisabled && isRequired;

  const fieldCheck = isDonVi ? 'donVi' : 'caNhan';

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: value => {
          if (isDisabled) {
            return true;
          }

          if (required && !value?.[fieldCheck]) {
            return translate('slink:Required');
          }

          return true;
        },
      }}
      render={() => {
        return (
          <VStack>
            <Text
              fontFamily={R.fonts.BeVietnamProMedium}
              fontSize={'xs'}
              color={'black'}>
              {label}
              <Text color={'primary.500'}>
                {maxValue
                  ? ` (${translate('slink:Point', { point: maxValue })})`
                  : ''}
              </Text>
            </Text>
            <InputLabel
              isInvalid={!isDonVi && !!error}
              isDisabled={isDonVi || isDisabled}
              value={valueChange?.caNhan ? `${valueChange.caNhan}` : ''}
              label={translate('slink:Diem_tu_danh_gia')}
              onChangeText={val => onChangeText(val, 1)}
              keyboardType={keyboardType(EKieuDuLieu.NUMBER)}
            />
            <InputLabel
              isInvalid={isDonVi && !!error}
              isDisabled={!isDonVi || isDisabled}
              value={valueChange?.donVi ? `${valueChange.donVi}` : ''}
              label={translate('slink:Diem_don_vi_danh_gia')}
              onChangeText={val => onChangeText(val, 2)}
              keyboardType={keyboardType(EKieuDuLieu.NUMBER)}
            />
          </VStack>
        );
      }}
    />
  );
};

export default InputDanhGia;
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
