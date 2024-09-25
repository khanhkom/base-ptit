/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { useForm } from 'react-hook-form';

import { DVMC_TYPE } from '@common';
import DynamicForm from '@components/DynamicForm';
import BaseButton from '@components/Popup/BaseButton';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { goBack } from '@navigation/navigation-service';
import { uploadDocument } from '@networking/user';

import { styles } from './styles';
import { translate } from '@utils/i18n/translate';

const ThemMoiMinhChung = (props: any) => {
  const onAddItem = props?.route?.params?.onAddItem;

  const disabled = props?.route?.params?.disabled;

  const item = props?.route?.params?.item;

  const index = props?.route?.params?.index;

  const [loading, setloading] = useState(false);

  const [formDynamic, setformDynamic] = useState<any[]>([]);

  useEffect(() => {
    setformDynamic(formMinhChung(item));
  }, []);

  const onSubmit = async (data: any) => {
    setloading(true);

    const isFile = data?.loai === 'File';

    let url = item?.url ?? '';

    if (isFile && !data?.fileDinhKem?.[0]?.isFromSever) {
      const listFile: any[] = await uploadDocument(data?.fileDinhKem);

      url = listFile?.[0]?.url;
    }

    if (data?.linkDinhKem) {
      url = data?.linkDinhKem;
    }

    setloading(false);

    const body = {
      tenMinhChung: data?.tenMinhChung,
      ...(!isFile && {
        link: data?.linkDinhKem,
      }),
      url,
      isFile,
    };

    onAddItem(body, index);

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
      <LoadingComponent loading={loading} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <DynamicForm
          errors={errors}
          unregister={unregister}
          disabled={disabled}
          control={control}
          formInput={formDynamic}
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

export default ThemMoiMinhChung;

const formMinhChung = (data?: any) => {
  const valueDefault =
    data?.url && data?.isFile
      ? [
          {
            uri: data?.url,
            isFromSever: true,
          },
        ]
      : [];

  return [
    {
      type: 'TEXT_INPUT',
      label: 'Tên minh chứng',
      isRequired: true,
      value: data?.tenMinhChung ?? '',
      relatedElement: [],
      _id: 'tenMinhChung',
    },
    {
      type: DVMC_TYPE.RADIO_BUTTON,
      dataSource: [
        {
          label: 'File',
          relatedElement: [
            {
              type: 'UPLOAD_SINGLE',
              value: valueDefault,
              label: translate('hoSoNhanSu:fileDinhKem'),
              isRequired: true,
              relatedElement: [],
              _id: 'fileDinhKem',
            },
          ],
        },
        {
          label: 'Link',
          relatedElement: [
            {
              type: 'TEXT_INPUT',
              label: 'Link đính kèm',
              isRequired: true,
              value: data && !data?.isFile ? data?.url : '',
              relatedElement: [],
              _id: 'linkDinhKem',
            },
          ],
        },
      ],
      isRequired: true,
      label: translate('slink:Loai'),
      value: data ? (data?.isFile ? 'File' : 'Link') : '',
      relatedElement: [],
      _id: 'loai',
    },
  ];
};
