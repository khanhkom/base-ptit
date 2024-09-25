import React from 'react';
import { View } from 'react-native';

import { HEIGHT, WIDTH } from '@common';
import ItemLabel from '@components/Item/ItemLabel';
import { AccountProps } from '@model/app';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { FlatList, useTheme } from 'native-base';

const ThongTinChung = ({ nhanSu }: { nhanSu: AccountProps | null }) => {
  const namSinh = nhanSu?.ngaySinh
    ? moment(nhanSu?.ngaySinh, 'YYYY-MM-DD').format('DD/MM/YYYY')
    : '';

  const listInfoTop = [
    { label: translate('slink:Fullname'), value: nhanSu?.hoTen || '' },
    { label: translate('slink:Date_of_birth'), value: namSinh },
    {
      label: 'Chức danh nghề nghiệp, chức vụ quản lý',
      value: nhanSu?.chucDanhNgheNghiep || '',
      multiLine: nhanSu?.chucDanhNgheNghiep ? true : false,
    },
    {
      label: 'Đơn vị / bộ phận công tác',
      value: nhanSu?.donViChinh?.ten || '',
    },
  ];

  const theme = useTheme();

  return (
    <View>
      <FlatList
        w={'full'}
        scrollEnabled={false}
        data={listInfoTop}
        contentContainerStyle={{ paddingHorizontal: WIDTH(16) }}
        nestedScrollEnabled={false}
        renderItem={({ item, index }) => (
          <ItemLabel
            style={{ paddingTop: HEIGHT(12), paddingBottom: HEIGHT(12) }}
            textLabel={{ fontSize: theme.fontSizes.xs }}
            textValue={{ fontSize: theme.fontSizes.xs }}
            label={item?.label}
            value={item?.value}
            multiLine={item?.multiLine}
            isLast={index === listInfoTop?.length - 1}
          />
        )}
      />
    </View>
  );
};

export default ThongTinChung;
