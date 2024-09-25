import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import R from '@assets/R';
import { CheckBox } from '@libcomponents/check-box';
import HeaderReal from '@libcomponents/header-real';

import styles from './styles';
interface Props {
  route: {
    params: {
      onChangeFilter: (e: string[]) => void;
      defaultValue: string[];
      listLoc: { title: string; code: string }[];
    };
  };
}

const FilterTKB = (props: Props) => {
  const onChangeFilter = props?.route?.params?.onChangeFilter;

  const defaultValue = props?.route?.params?.defaultValue;

  const listLoc = props?.route?.params?.listLoc;

  const [listValue, setlistValue] = useState<string[]>(defaultValue ?? []);

  const onChange = (value: string) => {
    let listGiaTri = [...listValue];
    if (listGiaTri?.includes(value)) {
      const index = listGiaTri.indexOf(value);

      if (index !== -1) {
        listGiaTri.splice(index, 1);
      }
    } else {
      listGiaTri = [...listGiaTri, value];
    }

    onChangeFilter(listGiaTri?.sort());

    setlistValue(listGiaTri);
  };

  return (
    <View style={[styles.container]}>
      <HeaderReal title="Lọc" />
      <View style={[styles.viewFilter]}>
        {listLoc?.map((item, index) => {
          return (
            <ItemFilter
              defaultValue={listValue?.includes(item?.code)}
              onChange={onChange}
              item={item}
              key={index}
            />
          );
        })}
      </View>
    </View>
  );
};

export default FilterTKB;
const ItemFilter = (props: {
  item: { title: string; code: string };
  onChange: (e: string) => void;
  defaultValue: boolean;
}) => {
  const { item, onChange, defaultValue } = props;

  const [check, setcheck] = useState(defaultValue);

  const handleCheck = () => {
    onChange?.(item?.code);

    setcheck(!check);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleCheck}
      style={styles.button}>
      <CheckBox
        fillStyle={{ backgroundColor: R.colors.primaryColor }}
        onToggle={handleCheck}
        value={check}
      />
      <Text style={styles.textCheckboxStyle}>{item?.title}</Text>
    </TouchableOpacity>
  );
};
