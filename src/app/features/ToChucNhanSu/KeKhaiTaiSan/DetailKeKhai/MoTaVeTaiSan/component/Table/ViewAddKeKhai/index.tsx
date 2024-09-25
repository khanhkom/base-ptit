import React from 'react';
import { StyleSheet } from 'react-native';

import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import R from '@assets/R';
import { EKieuDuLieu, HEIGHT, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import BtnXoa from '@components/HoSoNhanSu/Table/BtnXoa/BtnXoa';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import SingleSelectForm from '@components/QuyTrinhDong/component/SingleSelect/SingleSelectForm';
import HeaderReal from '@libcomponents/header-real';
import { goBack } from '@navigation/navigation-service';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

const ViewAddKeKhai = props => {
  const form = props.route?.params?.form;

  const onAddItem = props.route?.params?.onAddItem;

  const itemSV = props.route?.params?.itemSV;

  const indexSV = props.route?.params?.indexSV;

  const handleDelete = props.route?.params?.handleDelete;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: itemSV });

  const onPress = data => {
    const newData = convertValues(data, form);

    onAddItem(newData, indexSV);

    goBack();
  };

  const onDel = () => {
    handleDelete(indexSV);

    goBack();
  };

  const watchValues = watch();

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title={translate('slink:Asset_declaration')}
        childrenRight={
          indexSV !== undefined ? <BtnXoa onPress={onDel} /> : null
        }
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        {form?.map((item, index) => {
          const visible = item?.fieldRelated
            ? item?.fieldRelated &&
              item?.valueRelated?.includes(watchValues?.[item?.fieldRelated])
            : true;

          if (visible) {
            return (
              <ItemInput
                itemSV={itemSV}
                errors={errors}
                key={index}
                item={item}
                control={control}
              />
            );
          }

          return null;
        })}
        <BaseButtonNB
          width={WIDTH(140)}
          title={translate('slink:Save')}
          onPress={handleSubmit(onPress)}
        />
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default ViewAddKeKhai;

const ItemInput = ({ item, control, errors, itemSV }) => {
  const defaultValue = itemSV?.[item?.name];

  switch (item?.type) {
    case EKieuDuLieu.TEXT:
    case EKieuDuLieu.NUMBER:
      return (
        <InputNBForm
          type={item?.type}
          label={item?.label}
          name={item?.name}
          error={errors?.[item?.name]?.message}
          defaultValue={defaultValue ? `${defaultValue}` : ''}
          required={item?.required}
          control={control}
          textArea={item?.isArea}
        />
      );
    case EKieuDuLieu.DANHMUC:
      return (
        <SingleSelectForm
          label={item?.label}
          data={item?.data?.map(e => {
            return { label: e, value: e };
          })}
          required={item?.required}
          name={item?.name}
          error={errors?.[item?.name]?.message}
          defaultValue={defaultValue ? `${defaultValue}` : ''}
          control={control}
        />
      );

    default:
      return null;
  }
};

const styles = StyleSheet.create({
  content: {
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
    paddingHorizontal: WIDTH(16),
  },
});

function convertValues(originalObject, keyTypeArray) {
  const convertedObject = {};

  for (const [key, value] of Object.entries(originalObject)) {
    const type = keyTypeArray.find(item => item.name === key);

    if (type) {
      // Nếu type là "number" và giá trị không phải là NaN, chuyển đổi thành number
      if (type.type === EKieuDuLieu.NUMBER && !isNaN(Number(value))) {
        convertedObject[key] = Number(value);
      } else {
        // Nếu không, giữ nguyên giá trị là string
        convertedObject[key] = value?.toString();
      }
    } else {
      // Nếu key không có trong mảng keyTypeArray, giữ nguyên giá trị
      convertedObject[key] = value;
    }
  }

  return convertedObject;
}
