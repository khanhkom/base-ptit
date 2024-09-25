/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import R from '@assets/R';
import QuyTrinhDong from '@components/QuyTrinhDong';
import { CauHinhLoaiHinhProps } from '@features/KhaiBaoQuyTrinh/type';
import HeaderReal from '@libcomponents/header-real';
import { goBack } from '@navigation/navigation-service';
import { uploadDocument } from '@networking/user';
import { Box, Text } from 'native-base';

import styles from './styles';
import { translate } from '@utils/i18n/translate';
interface Props {
  route: {
    params: {
      item: CauHinhLoaiHinhProps;
      getData: (e: any, i: number | undefined) => void;
      dataInit?: any;
      index?: number | undefined;
      delItem: (index: number) => void;
    };
  };
}
const AddTable = (props: Props) => {
  const item = props?.route?.params?.item;

  const listId = item?.danhSachCot?.map(e => e?.ma);

  const getData = props?.route?.params?.getData;

  const dataInit = props?.route?.params?.dataInit;

  const delItem = props?.route?.params?.delItem;

  const index = props?.route?.params?.index;

  const {
    control,
    handleSubmit,
    unregister,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: dataInit });

  const onSubmit = async (data: any) => {
    let value = data;

    const listValue = listId?.map(async (e: string) => {
      if (data?.[e]?.[0]?.uri || data?.[e]?.[0]?.url) {
        if (data?.[e]?.[0]?.type) {
          const res = await uploadDocument(data?.[e]);

          const listFile = res?.map((file: any) => file?.url);

          value = { ...value, [e]: listFile };
        } else {
          value = { ...value, [e]: [data?.[e]?.[0]?.uri] };
        }
      }

      return null;
    });

    await Promise.all(listValue);

    getData(value, index);

    goBack();
  };

  const onDel = () => {
    delItem?.(index ?? 0);

    goBack();
  };
  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        childrenRight={<ChildrenR index={index} onPress={onDel} />}
        title={
          index ? translate('slink:Edit') : item?.ten || translate('slink:Add')
        }
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <QuyTrinhDong
          invisible
          watch={watch}
          control={control}
          unregister={unregister}
          errors={errors}
          onPress={handleSubmit(onSubmit)}
          titleButton={
            index !== undefined
              ? translate('slink:Save')
              : translate('slink:Add')
          }
          formKhaiBao={item?.danhSachCot}
        />
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default AddTable;
const ChildrenR = ({
  onPress,
  index,
}: {
  onPress: () => void;
  index: number | undefined;
}) => {
  if (index !== undefined) {
    return (
      <Text color={R.colors.white} onPress={onPress}>
        {translate('slink:Delete')}
      </Text>
    );
  }

  return null;
};
