import React from 'react';

import {
  CauHoiProps,
  defaultValueGrid,
  HangCotProps,
} from '@components/ChiTietBieuMauDanhGia/type';
import MultiChoicesNB from '@components/QuyTrinhDong/component/MultiChoices';

import CauHoi from '../../CauHoiTitle/CauHoi';
import { useController, useFormContext } from 'react-hook-form';
import { translate } from '@utils/i18n/translate';
import { VStack } from 'native-base';
import TextSub from '@libcomponents/helper-text/TextSub';
import _ from 'lodash';
import MultiChoicesV2 from '@components/QuyTrinhDong/component/MultiChoices/MultiChoiceNew';
interface Props {
  data: CauHoiProps;
  i: number;
  isRequired: boolean;
  dataHang: HangCotProps;
  disabled?: boolean;
  defaultValue: defaultValueGrid[];
}
const SubItemGrid = (props: Props) => {
  const { data, i, isRequired, dataHang, defaultValue, disabled } = props;
  const { control } = useFormContext();
  const defaultValueInit =
    defaultValue?.filter(item => item?.idHang === dataHang?._id) ?? [];

  const valueInit = defaultValueInit?.map(item => item?.idCot) ?? [];

  const country = useController({
    defaultValue: {
      idCauHoi: data?._id,
      idHang: dataHang?._id,
      listCot: valueInit,
    },
    name: dataHang?._id,
    control,
    rules: {
      validate: value => {
        if (isRequired && _.isEmpty(value?.listCot)) {
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

  const onCheck = (listCot: string[]) => {
    const body = { idCauHoi: data?._id, idHang: dataHang?._id, listCot };

    onChange && onChange(body);
  };
  const error = errors?.[dataHang?._id]?.message;

  return (
    <VStack flex={1}>
      <CauHoi
        table
        index={i}
        required={isRequired}
        content={dataHang?.noiDung}
      />
      <MultiChoicesV2
        isDisabled={disabled}
        data={data?.luaChonCot?.map(
          (item: { noiDung: string; _id: string }) => {
            return { label: item?.noiDung, value: item?._id };
          },
        )}
        onChangeValue={onCheck}
        defaultValue={valueInit}
      />
      <TextSub msg={error?.toString() || ''} visible={!!error} />
    </VStack>
  );
};

export default SubItemGrid;
