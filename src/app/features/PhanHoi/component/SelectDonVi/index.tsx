import React, { useEffect, useState } from 'react';
import {
  Box,
  FlatList,
  HStack,
  Pressable,
  Text,
  useDisclose,
  useTheme,
  VStack,
} from 'native-base';
import { HEIGHT, WIDTH } from '@common';
import R from '@assets/R';
import Icon from 'react-native-vector-icons/Entypo';
import SelectActionSheet from '@components/SelectActionSheet';
import { translate } from '@utils/i18n/translate';
import { Controller } from 'react-hook-form';
import { HelperText } from '@libcomponents';

const SelectDonVi = props => {
  const { dataChuDe, dataDonVi, control, errors, watchValues } = props;
  const data = [
    {
      title: translate('slink:Chu_de'),
      placeHolder: translate('slink:Select_topic'),
      data: dataChuDe,
      isRequired: true,
      name: 'chuDe',
    },
    {
      title: translate('slink:Don_vi_nhan'),
      placeHolder:
        watchValues?.chuDe === translate('slink:Other')
          ? translate('slink:Select_unit')
          : '',
      data: dataDonVi,
      isRequired: true,
      name: 'donVi',
      defaultValue: watchValues?.chuDe?.split('-')?.[0],
    },
  ];
  return (
    <Box
      mb={HEIGHT(8)}
      px={WIDTH(16)}
      backgroundColor="white"
      borderRadius={WIDTH(8)}
      style={R.themes.shadowOffset}>
      <FlatList
        data={data}
        extraData={data}
        bounces={false}
        renderItem={({ item, index }) => {
          return (
            <Controller
              control={control}
              rules={{ required: item?.isRequired }}
              name={item?.name}
              render={({ field: { onChange } }) => (
                <RenderItem
                  isDisabled={
                    item?.title === 'Đơn vị nhận' &&
                    watchValues?.chuDe !== translate('slink:Other')
                  }
                  visibleError={errors?.[item?.name]}
                  defaultValue={item?.defaultValue}
                  placeHolder={item?.placeHolder}
                  onChange={onChange}
                  isRequired={item?.isRequired}
                  title={item?.title}
                  data={item?.data}
                  isLast={index === data?.length - 1}
                />
              )}
            />
          );
        }}
      />
    </Box>
  );
};

export default SelectDonVi;
interface ItemProps {
  visibleError: boolean;
  isLast?: boolean;
  isDisabled?: boolean;
  title?: string;
  data: { label: string; value: string }[];
  isRequired?: boolean;
  placeHolder?: string;
  defaultValue?: string;
  onChange: (e: string) => void;
}
const RenderItem = (props: ItemProps) => {
  const {
    isLast,
    title,
    data,
    isRequired,
    placeHolder,
    onChange,
    isDisabled,
    visibleError,
    defaultValue,
  } = props;
  useEffect(() => {
    if (!!defaultValue) {
      const objValue = data?.find(item => item?.value === defaultValue);
      setvalueCurrent(objValue?.label || '');
      onChange && onChange(defaultValue || '');
    }
  }, [defaultValue]);

  const [valueCurrent, setvalueCurrent] = useState('');
  const { isOpen, onOpen, onClose } = useDisclose();
  const borderBottomWidth = isLast ? 0 : 0.5;
  const onChangeVal = (val: string) => {
    const objValue = data?.find(item => item?.value === val);
    setvalueCurrent(objValue?.label || '');
    onChange && onChange(val);
    onClose();
  };
  const theme = useTheme();
  return (
    <>
      <Pressable
        onPress={onOpen}
        disabled={isDisabled}
        flexDir={'column'}
        _pressed={R.themes.pressed}
        borderColor="gray.200"
        hitSlop={R.themes.hitSlop}
        borderBottomWidth={borderBottomWidth}
        py={HEIGHT(16)}
        justifyContent={'space-between'}>
        <HStack alignItems="center">
          <Text
            flex={1}
            mr="1"
            color={'black'}
            fontFamily={R.fonts.BeVietnamProRegular}
            fontSize={'sm'}>
            {title}
            {isRequired && <Text color={'red.800'}>{'*'}</Text>}
          </Text>
          <HStack alignItems={'center'}>
            <Text
              maxWidth={WIDTH(180)}
              numberOfLines={1}
              color={!valueCurrent || isDisabled ? 'gray.400' : 'black'}
              fontFamily={R.fonts.BeVietnamProRegular}
              fontSize={'sm'}>
              {(valueCurrent || placeHolder) ?? translate('slink:Select')}
            </Text>
            <Icon
              name="chevron-right"
              size={WIDTH(24)}
              color={theme.colors.gray[400]}
            />
          </HStack>
        </HStack>
        <HelperText
          visible={!!visibleError}
          msg={translate('slink:Required')}
          type={'error'}
        />
      </Pressable>
      <SelectActionSheet
        value={valueCurrent}
        onChange={onChangeVal}
        data={data}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
