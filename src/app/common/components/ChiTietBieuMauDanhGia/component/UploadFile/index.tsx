/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StyleSheet } from 'react-native';

import { ItemCauHoiProps } from '@components/ChiTietBieuMauDanhGia/type';
import UploadFileV2 from '@components/DynamicForm/component/UploadFileV2';
import { EQUESTION_TYPE } from '@config/constant';
import { HEIGHT } from '@config/function';
import { Box } from 'native-base';

import CauHoi from '../CauHoiTitle/CauHoi';
import { useController, useFormContext } from 'react-hook-form';
import { translate } from '@utils/i18n/translate';
import TextSub from '@libcomponents/helper-text/TextSub';
import _ from 'lodash';

const UploadFileKS = ({
  indexs,
  data,
  defaultValue,
  disabled,
}: ItemCauHoiProps) => {
  const { control } = useFormContext();
  const country = useController({
    name: data?._id,
    control,
    rules: {
      validate: value => {
        if (data?.batBuoc && _.isEmpty(value?.listUrlFile)) {
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
  const onChangeValue = (value: any) => {
    onChange({
      listUrlFile: value,
      idCauHoi: data?._id,
    });
  };
  const error = errors?.[data?._id]?.message;

  return (
    <Box flex={1} mt={HEIGHT(8)}>
      <CauHoi
        index={indexs}
        required={data?.batBuoc}
        content={data?.noiDungCauHoi}
      />
      <UploadFileV2
        disableDelete={disabled}
        arrayFile={
          defaultValue?.map((e: string) => {
            return { uri: e };
          }) ?? []
        }
        style={styles.upload}
        labelLong={true}
        maxFilesAllow={5}
        changeListFile={onChangeValue}
      />
      <TextSub msg={error?.toString() || ''} visible={!!error} />
    </Box>
  );
};

export default UploadFileKS;

const styles = StyleSheet.create({
  upload: {
    paddingVertical: HEIGHT(8),
  },
});
