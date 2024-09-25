/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { dispatch, HEIGHT, WIDTH } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import { SearchItem } from '@components/SearchAction/snack-bar-item';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { getDanhSachMinhChung } from '@networking/user';
import { getDanhMucNCKH } from '@networking/user/QuanLyKhoaHoc';
import { appActions } from '@redux-slice';
import { translate } from '@utils/i18n/translate';
import { FlatList } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import ItemMinhChung from './Items/ItemMinhChung';
import styles from './styles';

const KhaiBaoMinhChung = () => {
  const [listMinhChung, setListMinhChung] = useState([]);

  const [visible, setVisible] = useState(false);

  const [keySearch, setkeySearch] = useState('');

  const [loading, setloading] = useState(false);

  useEffect(() => {
    getDanhMuc();
  }, []);

  const getDanhMuc = async () => {
    const responseDanhMuc: any = await getDanhMucNCKH();

    dispatch(appActions.setdanhMucNCKH(responseDanhMuc?.data?.data ?? []));
  };

  const getData = async () => {
    try {
      setloading(true);

      const res = await getDanhSachMinhChung();

      const listMinhChungForSv = res?.data?.filter(item =>
        item?.doiTuongNhap?.includes('SINH_VIEN'),
      );

      setListMinhChung(listMinhChungForSv ?? []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderReal
        title={translate('slink:Khai_minh_chung')}
        childrenRight={
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}>
            <Icon name="search" size={WIDTH(24)} color={'white'} />
          </TouchableOpacity>
        }
      />
      {/* <ScrollView paddingTop={HEIGHT(8)}> */}
      {/* {listMinhChung?.map(item => {
          return <ItemMinhChung item={item} />;
        })} */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={
          keySearch === ''
            ? listMinhChung
            : listMinhChung?.filter((i: { tenMinhChung: string }) =>
                i?.tenMinhChung
                  ?.toLocaleLowerCase()
                  ?.includes(keySearch?.toLocaleLowerCase()),
              )
        }
        extraData={[listMinhChung, keySearch]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return <ItemMinhChung item={item} />;
        }}
        onEndReachedThreshold={0.01}
        ListEmptyComponent={<ItemTrong />}
        contentContainerStyle={{ paddingTop: HEIGHT(16) }}
      />
      {/* </ScrollView> */}
      <LoadingComponent loading={loading} />
      <SearchItem
        defaultValue={keySearch}
        placeholder={translate('slink:Title_of_doc')}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);

          setkeySearch('');
        }}
        onChangeValue={setkeySearch}
      />
    </View>
  );
};

export default KhaiBaoMinhChung;
