/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ScrollView, View } from 'react-native';

import { useForm } from 'react-hook-form';

import {
  DVMC_TYPE,
  findArraryObject,
  findObject,
  objectToArray,
} from '@common';
import DynamicForm from '@components/DynamicForm';
import BaseButton from '@components/Popup/BaseButton';
import HeaderReal from '@libcomponents/header-real';
import { goBack } from '@navigation/navigation-service';
import { uploadDocument } from '@networking/user';

import { styles } from './styles';
import { translate } from '@utils/i18n/translate';

const ThemMoiTable = (props: any) => {
  const onAddItem = props?.route?.params?.onAddItem;

  const disabled = props?.route?.params?.disabled;

  const index = props?.route?.params?.index;

  const relatedElement = props?.route?.params?.relatedElement;

  const onUploadFile = async (listData: any) => {
    const listFileLocal = [
      ...findArraryObject(listData, 'type', DVMC_TYPE.UPLOAD_SINGLE),
      ...findArraryObject(listData, 'type', DVMC_TYPE.UPLOAD_MULTI),
    ]?.filter(file => file && file?.value?.length > 0);

    try {
      const result = listFileLocal.map(async files => {
        const listFile = await uploadDocument(files?.value);

        const value = listFile.map((item: any) => ({
          url: item?.url,
          type: item?.file?.mimetype,
        }));

        const newFile = { ...files, value };

        const currentBody = JSON.stringify(listData);

        const newFormSubmit = currentBody.replace(
          JSON.stringify(files),
          JSON.stringify(newFile),
        );

        listData = JSON.parse(newFormSubmit);
      });

      await Promise.all(result);
    } catch (error) {}

    return listData;
  };

  const onSubmit = async (data: any) => {
    const objToVal = objectToArray(data);

    const arrWithValue = objToVal?.map(item => {
      const objFind: any = findObject(relatedElement, '_id', item?.key);

      return { ...objFind, value: item?.value ?? '' };
    });

    const transformData = await onUploadFile(arrWithValue);

    onAddItem(transformData, index);

    goBack();
  };

  const {
    control,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm();

  return (
    <View style={styles.container}>
      <HeaderReal title={translate('slink:Add')} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <DynamicForm
          errors={errors}
          unregister={unregister}
          disabled={disabled}
          control={control}
          formInput={relatedElement}
        />
        {!disabled && (
          <BaseButton
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
            text={styles.textButton}
            title="Lưu"
          />
        )}
      </ScrollView>
    </View>
  );
};

export default ThemMoiTable;
