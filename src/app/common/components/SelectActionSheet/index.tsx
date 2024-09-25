import { StyleSheet } from 'react-native';
import React from 'react';
import { Actionsheet, ScrollView, Text } from 'native-base';
import { HEIGHT, WIDTH } from '@config/function';
import R from '@assets/R';
import ItemTrong from '@components/Item/ItemTrong';
import { translate } from '@utils/i18n/translate';
interface Props {
  onChange: (e: string) => void;
  data: { label: string; value: string }[];
  isOpen: boolean;
  isEmpty?: boolean;
  onClose: () => void;
  value?: string;
}
const SelectActionSheet = (props: Props) => {
  const { data, onChange, isOpen, onClose, value, isEmpty = false } = props;
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
      <Actionsheet.Content
        _dragIndicatorWrapperOffSet={{
          py: '10',
        }}>
        <ScrollView>
          {isEmpty ? (
            <ItemTrong
              customStyle={{ marginTop: HEIGHT(16) }}
              content={translate('slink:No_info_giang_vien')}
            />
          ) : (
            data?.map((item, index) => (
              <Actionsheet.Item
                key={index}
                onPress={() => onChange(item?.value)}
                alignSelf={'flex-start'}
                backgroundColor={value === item?.label ? 'gray.200' : undefined}
                width={WIDTH(343)}>
                <Text color={'black'} fontFamily={R.fonts.BeVietnamProMedium}>
                  {item?.label}
                </Text>
              </Actionsheet.Item>
            ))
          )}
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default SelectActionSheet;
