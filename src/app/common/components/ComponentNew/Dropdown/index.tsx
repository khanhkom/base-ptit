import React from 'react';
import { StyleSheet } from 'react-native';

import { HEIGHT, WIDTH } from '@config/function';
import { Box, CheckIcon, Select } from 'native-base';
interface ItemProp {
  value: string;
  label: string;
}
interface Props {
  data: ItemProp[];
  onChangeValue: (e: string) => void;
  placeHolder?: string;
  defaultValue?: string;
}
const DropdownNB = (props: Props) => {
  const { data, onChangeValue, placeHolder, defaultValue } = props;

  const [service, setService] = React.useState('');

  const onChangeItem = (value: string) => {
    setService(value);

    onChangeValue?.(value);
  };

  return (
    <Box style={{ width: WIDTH(120) }}>
      <Select
        selectedValue={service}
        placeholder={placeHolder}
        _selectedItem={{
          bg: 'teal.600',
          endIcon: <CheckIcon size="5" />,
        }}
        mt={0}
        height={HEIGHT(40)}
        justifyContent={'flex-start'}
        defaultValue={defaultValue}
        onValueChange={onChangeItem}>
        {data?.map(item => {
          return (
            <Select.Item
              fontSize={16}
              label={item?.label}
              value={item?.value}
            />
          );
        })}
      </Select>
    </Box>
  );
};

export default DropdownNB;
