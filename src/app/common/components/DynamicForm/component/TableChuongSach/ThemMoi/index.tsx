/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ScrollView, View } from 'react-native';

import { useForm } from 'react-hook-form';

import { findObject, objectToArray } from '@common';
import DynamicForm from '@components/DynamicForm';
import BaseButton from '@components/Popup/BaseButton';
import HeaderReal from '@libcomponents/header-real';
import { goBack } from '@navigation/navigation-service';

import { styles } from './styles';
import { translate } from '@utils/i18n/translate';

const ThemMoiTable = (props: any) => {
  const onAddItem = props?.route?.params?.onAddItem;

  const disabled = props?.route?.params?.disabled;

  const index = props?.route?.params?.index;

  const relatedElement = props?.route?.params?.relatedElement;

  const onSubmit = (data: any) => {
    const objToVal = objectToArray(data);

    let initData: any = relatedElement;

    objToVal?.forEach(item => {
      const objFind: any = findObject(relatedElement, '_id', item?.key);

      const newObject = { ...objFind, value: item?.value ?? '' };

      if (JSON.stringify(objFind?.value) !== JSON.stringify(newObject?.value)) {
        const currentData = JSON.stringify(initData);

        const newArr = currentData.replace(
          JSON.stringify(objFind),
          JSON.stringify(newObject),
        );

        initData = JSON.parse(newArr);
      }
    });

    onAddItem(initData, index);

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
