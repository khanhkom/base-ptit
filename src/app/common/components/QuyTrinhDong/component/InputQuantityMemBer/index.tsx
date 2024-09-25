/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

import { Control, Controller, FieldValues } from 'react-hook-form';

import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import { WIDTH } from '@config/function';
import { HelperText } from '@libcomponents';
import { Box, FormControl, Input, InputRightAddon } from 'native-base';
import { translate } from '@utils/i18n/translate';
interface Props {
  control?: Control<FieldValues, any> | undefined;
  error: string;
  defaultValue?: number | string;
  visible: boolean;
}
const InputQuantityMember = (props: Props) => {
  const { control, error, defaultValue, visible } = props;

  if (visible) {
    return (
      <Controller
        name={'soLuongThanhVien'}
        control={control}
        rules={{ required: translate('slink:Required') }}
        render={({ field }) => {
          return (
            <Box alignSelf={'center'} width={WIDTH(343)}>
              <TextLabelQuyTrinh label={'Số lượng thành viên'} isRequired />
              <FormControl isInvalid={!!error} flexDirection="row" w="full">
                <Input
                  defaultValue={defaultValue ? `${defaultValue}` : ''}
                  onChangeText={field?.onChange}
                  w={{ base: '75%' }}
                  backgroundColor="white"
                  keyboardType="numeric"
                  height={'12'}
                  mt="1"
                  placeholder="Số lượng thành viên"
                />
                <InputRightAddon
                  w={{ base: '25%' }}
                  height={'12'}
                  mt="1"
                  children={'thành viên'}
                />
              </FormControl>
              <HelperText
                visible={error !== undefined}
                msg={error ?? ''}
                type={'error'}
              />
            </Box>
          );
        }}
      />
    );
  }

  return null;
};

export default InputQuantityMember;
