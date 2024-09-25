/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Controller, useController } from 'react-hook-form';
import { MultiSelect } from 'react-native-element-dropdown';

import R from '@assets/R';
import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import { getFontSize, HEIGHT, WIDTH } from '@config/function';
import { HelperText, Icon } from '@libcomponents';
import { AccountProps } from '@model/app';
import { getDSCanBo } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { Box, Text, useTheme } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
interface Props {
  name: string;
  control: any;
  required?: boolean;
  label?: string;
  placeholder?: string;
  maDonViFilter?: string;
  defaultValue?: any[];
  error?: any;
  maxSelect?: number;
}
const NhanSuMultiSelect = (props: Props) => {
  const {
    name,
    control,
    required,
    defaultValue,
    label,
    placeholder,
    maDonViFilter,
    error,
    maxSelect,
  } = props;

  const transformDefaulValue =
    defaultValue?.map(item => {
      return { ...item, maCanBo: item?.maDinhDanh, hoTen: item?.ten };
    }) || [];

  const [selected, setSelected] = useState<string[]>([]);

  const [keySearch, setkeySearch] = useState('');

  const [listNhanSu, setlistNhanSu] = useState<AccountProps[]>(
    transformDefaulValue || [],
  );

  useEffect(() => {
    if (defaultValue) {
      const init =
        transformDefaulValue?.map(item => `${item?.maCanBo}-${item?.ten}`) ||
        [];

      onChangeValue(init);
    }
  }, [defaultValue]);

  useEffect(() => {
    initAPI();
  }, [keySearch, maDonViFilter]);

  const theme = useTheme();

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

  const placeHolder =
    selected?.length === 0
      ? placeholder || 'Chọn'
      : `${selected?.length} - Đã chọn`;

  const initAPI = async () => {
    const body = {
      page: 1,
      limit: 20,
      condition: { trangThaiChinhSua: 'Duyệt - đang áp dụng' },
      filters: [
        { field: 'ten', values: [keySearch], operator: 'contain' },
        {
          active: true,
          field: 'maDonVi',
          values: [maDonViFilter || ''],
          operator: 'in',
        },
      ],
    };

    const response = await getDSCanBo(body);

    let nhanSu =
      response?.data?.data?.result?.filter((item: AccountProps) => {
        const listssoIdDefault = transformDefaulValue?.map(e => e?.maCanBo);

        return !listssoIdDefault?.includes(item?.maCanBo);
      }) || [];
    if (maDonViFilter) {
      nhanSu =
        nhanSu?.filter((item: AccountProps) => {
          return item?.donViChinh?.maDonVi === maDonViFilter;
        }) || [];
    }

    setlistNhanSu([...nhanSu, ...(transformDefaulValue || [])]);
  };

  const country = useController({
    name,
    control,
  });

  const {
    field: { onChange },
  } = country;

  const onChangeValue = (val: string[]) => {
    setSelected(val);

    const nsSelect =
      listNhanSu
        ?.filter(item => val?.includes(`${item?.maCanBo}-${item?.hoTen}`))
        ?.map((item: any) => {
          return {
            maDinhDanh: item?.maCanBo || '',
            maDonVi: item?.donViChinh?.maDonVi || item?.maDonVi || '',
            ssoId: item?.ssoId || '',
            ten: item?.hoTen || '',
            tenDonVi: item?.donViChinh?.ten || item?.tenDonVi || '',
            tenVietTat: item?.ten || '',
          };
        }) || [];

    // label === 'Đối tượng chủ trì' &&
    onChange(nsSelect);
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
              maxSelect={maxSelect}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={[styles.selectedTextStyle]}
              iconStyle={styles.iconStyle}
              data={listNhanSu?.map(item => {
                return {
                  label: `${item?.hoTen} (${item?.maCanBo || ''})`,
                  value: `${item?.maCanBo}-${item?.hoTen}`,
                };
              })}
              labelField="label"
              valueField="value"
              placeholder={placeHolder}
              value={selected}
              search
              renderRightIcon={() => (
                <Entypo color={'black'} size={WIDTH(22)} name="chevron-down" />
              )}
              onChangeText={setkeySearch}
              searchPlaceholder={translate('slink:Search')}
              onChange={onChangeValue}
              renderItem={renderItem}
              // renderSelectedItem={(item, unSelect) => {
              //   return (
              //     <Pressable
              //       flexDirection="row"
              //       justifyContent="center"
              //       alignItems="center"
              //       backgroundColor="white"
              //       marginTop={'2'}
              //       marginRight={'3'}
              //       px={'2'}
              //       py={'2'}
              //       borderColor="gray.300"
              //       borderRadius={2}
              //       borderWidth={0.5}
              //       onPress={() => unSelect && unSelect(item)}>
              //       <Text
              //         maxW={'20'}
              //         mr="1"
              //         numberOfLines={1}
              //         fontSize={'xs'}
              //         fontFamily={R.fonts.BeVietnamProRegular}>
              //         {item?.label}
              //       </Text>
              //       <AntDesign
              //         size={WIDTH(10)}
              //         name="close"
              //         color={'#ABABAB'}
              //       />
              //     </Pressable>
              //   );
              // }}
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

export default NhanSuMultiSelect;

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
