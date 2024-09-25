/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { removeAccents } from '@common';
import ListStudent from '@components/Item/ItemStudents/ListStudent';
import { SearchItem } from '@components/SearchAction/snack-bar-item';
import ModalInfoSinhVienLHC from '@features/LopHanhChinhSV/component/ThongTinSinhVien/ModalInfoSinhVien';
import { SinhVienLHCProps } from '@features/LopHanhChinhSV/ThongTinChungSV/type';
import { getListSVByLopHanhChinh } from '@networking/user';
import { translate } from '@utils/i18n/translate';

import styles from './styles';

const ThongTinChungLopHC = (props: any) => {
  const { dataLop } = props;

  const [dataSinhVien, setdataSinhVien] = useState<SinhVienLHCProps | null>(
    null,
  );

  const [visibleModal, setvisibleModal] = useState(false);

  const [visible, setVisible] = useState(false);

  const [keySearch, setkeySearch] = useState('');

  const [listSearch, setlistSearch] = useState([]);

  const [loading, setLoading] = useState(false);

  const [listSV, setlistSV] = useState([]);

  const getInitData = async () => {
    setLoading(true);

    try {
      const result: any = await getListSVByLopHanhChinh(dataLop?._id);

      setlistSV(result?.data?.data?.sinhVienList ?? []);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInitData();
  }, []);

  const onPress = (item: SinhVienLHCProps) => {
    setdataSinhVien(item);

    setvisibleModal(true);
  };

  const onSearch = (value: string) => {
    setkeySearch(value);

    if (value !== '') {
      const listFilter =
        listSV?.filter((item: any) =>
          removeAccents(item?.name)
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
    listSearch?.length === 0 && keySearch === '' ? listSV : listSearch;

  return (
    <View style={styles.container}>
      <ListStudent
        loading={loading}
        onRefresh={getInitData}
        onPress={onPress}
        danhSachSV={listHSResult}
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
      <ModalInfoSinhVienLHC
        closeButton={() => setvisibleModal(false)}
        isVisible={visibleModal}
        dataSinhVien={dataSinhVien}
      />
    </View>
  );
};

export default ThongTinChungLopHC;
