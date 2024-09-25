import React from 'react';

import {
  CauHoiProps,
  defaultValueGrid,
  HangCotProps,
} from '@components/ChiTietBieuMauDanhGia/type';
import RadioButtonNB from '@components/QuyTrinhDong/component/RadioButton';
import CauHoi from '../../CauHoiTitle/CauHoi';
import { useController, useFormContext } from 'react-hook-form';
import { VStack } from 'native-base';
import TextSub from '@libcomponents/helper-text/TextSub';
import { translate } from '@utils/i18n/translate';
interface Props {
  data: CauHoiProps;
  dataHang: HangCotProps;
  i: number;
  isRequired: boolean;
  defaultValue: defaultValueGrid[];
  disabled?: boolean;
}
const SubItemSingleGrid = (props: Props) => {
  const { data, dataHang, i, isRequired, defaultValue, disabled } = props;
  const { control } = useFormContext();
  const country = useController({
    name: dataHang?._id,
    control,
    rules: {
      validate: value => {
        if (isRequired && !value?.idHang && !value?.idCot) {
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
  const defaultValueInit = defaultValue?.find(
    item => item?.idHang === dataHang?._id,
  );

  const valueInit = defaultValueInit?.idCot;

  const onCheck = (idCot: string) => {
    const body = { idCauHoi: data?._id, idHang: dataHang?._id, idCot };
    onChange && onChange(body);
  };
  const error = errors?.[dataHang?._id]?.message;
  return (
    <VStack flex={1}>
      <CauHoi
        index={i}
        table
        required={isRequired}
        content={data?.luaChonHang[i ?? 0]?.noiDung}
      />
      <RadioButtonNB
        defaultValue={valueInit}
        isDisabled={disabled}
        data={data?.luaChonCot?.map(
          (item: { noiDung: string; _id: string }) => {
            return { label: item?.noiDung, value: item?._id };
          },
        )}
        onChangeValue={onCheck}
      />
      <TextSub msg={error?.toString() || ''} visible={!!error} />
    </VStack>
  );
};

export default React.memo(SubItemSingleGrid);
