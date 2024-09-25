/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Controller, useController } from 'react-hook-form';
import { MultiSelect } from 'react-native-element-dropdown';

import R from '@assets/R';
import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import { getFontSize, HEIGHT, WIDTH } from '@config/function';
import { HelperText, Icon } from '@libcomponents';
import { translate } from '@utils/i18n/translate';
import { Box, Text, useTheme } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

interface Props {
  name: string;
  control: any;
  required?: boolean;
  placeHolder?: string;
  label?: string;
  data: { label: string; value: string }[];
  defaultValue?: string[];
  error?: any;
}
const MultiSelectForm = (props: Props) => {
  const {
    name,
    control,
    defaultValue,
    required,
    label,
    data,
    placeHolder,
    error,
  } = props;

  const [selected, setSelected] = useState<string[]>(defaultValue || []);

  const theme = useTheme();

  const country = useController({
    name,
    control,
  });

  const {
    field: { onChange },
  } = country;

  useEffect(() => {
    if (defaultValue) {
      onChange(defaultValue);
    }
  }, []);

  const placeholder =
    selected?.length === 0
      ? placeHolder || 'Chọn'
      : `${selected?.length} - Đã chọn`;

  const onChangeValue = (val: string[]) => {
    setSelected(val);

    onChange(val);
  };

  const renderItem = (item: { label: string; value: string }) => {
    return (
      <Box
        padding={HEIGHT(8)}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text flex={1} numberOfLines={1} style={styles.selectedTextStyle}>
          {item.label}
        </Text>
        {selected?.includes(item?.value) && <Icon size={15} icon={'check'} />}
      </Box>
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value: any) => {
          if (required && (!value || value?.length === 0)) {
            return translate('slink:Required');
          }

          return true;
        },
      }}
      render={() => {
        return (
          <Box w="full">
            <TextLabelQuyTrinh label={label} isRequired={required} />
            <MultiSelect
              style={[
                styles.dropdown,
                { borderColor: error ? 'rgb(255, 59, 48)' : '#ABABAB66' },
              ]}
              placeholderStyle={[
                styles.placeholderStyle,
                {
                  color:
                    selected?.length === 0
                      ? theme.colors.gray[400]
                      : theme.colors.black,
                },
              ]}
              itemTextStyle={[styles.selectedTextStyle]}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              labelField="label"
              valueField="value"
              placeholder={placeholder || 'Chọn'}
              value={selected}
              renderRightIcon={() => (
                <Entypo color={'black'} size={WIDTH(22)} name="chevron-down" />
              )}
              searchPlaceholder={translate('slink:Search')}
              onChange={onChangeValue}
              renderItem={renderItem}
            />
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
};

export default MultiSelectForm;

const styles = StyleSheet.create({
  dropdown: {
    alignItems: 'center',
    backgroundColor: R.colors.white,
    paddingVertical: HEIGHT(6),
    paddingHorizontal: WIDTH(8),
    borderRadius: WIDTH(4),
    marginTop: HEIGHT(8),
    borderWidth: 1,
    borderColor: '#ABABAB66',
  },
  placeholderStyle: {
    fontSize: getFontSize(12),
  },
  selectedTextStyle: {
    fontSize: getFontSize(12),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: getFontSize(12),
  },
});
