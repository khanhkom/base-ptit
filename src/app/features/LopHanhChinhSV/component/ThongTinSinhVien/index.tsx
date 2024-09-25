/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { WIDTH } from '@common';
import { SearchItem } from '@components/SearchAction/snack-bar-item';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';
import Icon from 'react-native-vector-icons/Feather';

import ModalInfoSinhVienLHC from './ModalInfoSinhVien';
import styles from './styles';
import ListStudent from '@components/Item/ItemStudents/ListStudent';
import { SinhVienLHCProps } from '@features/LopHanhChinhSV/ThongTinChungSV/type';
interface Props {
  route: { params: { listHS: SinhVienLHCProps[] } };
}
const ThongTinSinhVienLHC = (props: Props) => {
  const { listHS } = props?.route?.params;
  const [visible, setVisible] = useState(false);

  const [keySearch, setkeySearch] = useState('');

  const [listSearch, setlistSearch] = useState<SinhVienLHCProps[]>([]);

  const [isVisible, setisVisible] = useState(false);

  const [dataSinhVien, setdataSinhVien] = useState(null);

  const onSearch = (value: string) => {
    setkeySearch(value);

    if (value !== '') {
      const listFilter =
        listHS?.filter(item =>
          item?.ten
            ?.trim()
            ?.toLowerCase()
            ?.includes(value?.trim()?.toLowerCase()),
        ) ?? [];

      setlistSearch(listFilter);
    } else {
      setlistSearch([]);
    }
  };

  const listHSResult =
    listSearch?.length === 0 && keySearch === '' ? listHS : listSearch;

  const goToDetail = (item: any) => {
    setisVisible(true);

    setdataSinhVien(item);
  };

  return (
    <View style={styles.container}>
      <HeaderReal
        title={translate('slink:Student_info')}
        childrenRight={
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}>
            <Icon name="search" size={WIDTH(24)} color={'white'} />
          </TouchableOpacity>
        }
      />
      <ListStudent danhSachSV={listHSResult} onPress={goToDetail} />
      <ModalInfoSinhVienLHC
        closeButton={() => setisVisible(false)}
        isVisible={isVisible}
        dataSinhVien={dataSinhVien}
      />
      <SearchItem
        defaultValue={keySearch}
        placeholder={translate('slink:Enter_student_name')}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);

          onSearch('');
        }}
        onChangeValue={onSearch}
      />
    </View>
  );
};

export default ThongTinSinhVienLHC;
