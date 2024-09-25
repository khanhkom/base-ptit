/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';

import R from '@assets/R';
import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import { getFontSize, HEIGHT, WIDTH } from '@config/function';
import { translate } from '@utils/i18n/translate';
import { Box, useTheme } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

export interface SelectWithSearchProps {
  isRequired?: boolean;
  placeholder?: string;
  data: { value: string; label: string }[];
  label?: string;
  onChange?: (e: string) => void;
  defaultValue?: string;
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const SelectWithSearch = (props: SelectWithSearchProps) => {
  const {
    placeholder,
    data,
    isRequired,
    label,
    onChange,
    isDisabled,
    style,
    defaultValue,
  } = props;

  const [value, setValue] = useState<string | null>(defaultValue || null);

  useEffect(() => {
    defaultValue && onChangeValue(defaultValue);
  }, [defaultValue]);

  const [isFocus, setIsFocus] = useState(false);

  const onChangeValue = (val: string) => {
    setValue(val);

    onChange?.(val);

    setIsFocus(false);
  };

  const marginTop = label ? HEIGHT(8) : 0;

  const theme = useTheme();

  return (
    <Box w="full">
      <TextLabelQuyTrinh label={label} isRequired={isRequired} />
      <Dropdown
        disable={isDisabled}
        style={[
          styles.dropdown,
          style,
          { marginTop },
          isFocus && { borderColor: theme.colors.primary[500] },
        ]}
        placeholderStyle={[
          styles.placeholderStyle,
          {
            color:
              isDisabled || !value
                ? theme.colors.gray[400]
                : theme.colors.black,
          },
        ]}
        itemTextStyle={[styles.selectedTextStyle]}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder={translate('slink:Search')}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={e => onChangeValue(e?.value)}
        renderRightIcon={() => (
          <Entypo
            color={isDisabled ? theme.colors.gray[400] : theme.colors.black}
            size={WIDTH(22)}
            name="chevron-down"
          />
        )}
      />
    </Box>
  );
};

export default SelectWithSearch;

const styles = StyleSheet.create({
  dropdown: {
    alignItems: 'center',
    backgroundColor: R.colors.white,
    paddingVertical: HEIGHT(6),
    paddingHorizontal: WIDTH(8),
    borderRadius: WIDTH(4),
    borderWidth: 0.5,
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
