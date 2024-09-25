/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';

import R from '@assets/R';
import { tenGiangVien, WIDTH } from '@common';
import ItemInfoStudents from '@components/Item/ItemStudents/ItemInfoStudent';
import ItemTrong from '@components/Item/ItemTrong';
import { SearchItem } from '@components/SearchAction/snack-bar-item';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { goBack } from '@navigation/navigation-service';
import { getDSCanBo } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { Box, Pressable } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import { styles } from './styles';

const SearchTCNSCanBo = (props: any) => {
  const getNhanSu = props?.route?.params?.getNhanSu;

  const [visible, setVisible] = useState(true);

  const [loading, setloading] = useState(false);

  const [loadMore, setLoadMore] = useState(false);

  const page = useRef(1);

  const maxData = useRef(false);

  const beginScroll = useRef<boolean>(false);

  const [keySearch, setkeySearch] = useState('');

  const [listDS, setlistDS] = useState<any[]>([]);

  useEffect(() => {
    getData();
  }, [keySearch]);

  const getData = async () => {
    setloading(true);

    const body = {
      page: 1,
      limit: 20,
      condition: { trangThaiChinhSua: 'Duyệt - đang áp dụng' },
      filters: [{ field: 'hoTen', values: [keySearch], operator: 'contain' }],
    };

    const responseDS = await getDSCanBo(body);

    setloading(false);

    setlistDS(responseDS?.data?.data?.result ?? []);
  };

  const loadMoreData = async () => {
    if (!maxData.current) {
      setLoadMore(true);

      page.current += 1;

      try {
        const body = {
          page: page.current,
          limit: 20,
          condition: { trangThaiChinhSua: 'Duyệt - đang áp dụng' },
          filters: [
            { field: 'hoTen', values: [keySearch], operator: 'contain' },
          ],
        };

        const responseDS = await getDSCanBo(body);

        setlistDS([...listDS, ...(responseDS?.data?.data?.result ?? [])]);

        maxData.current = responseDS?.data?.data?.result?.length < 20;

        setLoadMore(false);
      } catch (error) {
        setLoadMore(false);
      }
    }
  };

  const onSearch = (value: string) => {
    setkeySearch(value);
  };

  const getMore = () => {
    if (beginScroll.current && !maxData.current) {
      loadMoreData();

      beginScroll.current = false;
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <HeaderReal
          title={translate('slink:Fullname')}
          childrenRight={<ChildrenRight onPress={() => setVisible(true)} />}
        />
        <Box flex={1}>
          <LoadingComponent />
        </Box>
        <SearchItem
          defaultValue={keySearch}
          placeholder={translate('slink:Enter_Fullname')}
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
  }

  return (
    <View style={styles.container}>
      <HeaderReal
        title={translate('slink:Fullname')}
        childrenRight={<ChildrenRight onPress={() => setVisible(true)} />}
      />
      <FlatList
        data={listDS}
        extraData={listDS}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item?.ssoId}
        renderItem={({ item }) => (
          <ItemUser
            key={item?.ssoId}
            item={item}
            index={item?.ssoId}
            onPress={() => {
              getNhanSu(item);

              goBack();
            }}
          />
        )}
        onRefresh={getData}
        refreshing={loading}
        contentContainerStyle={styles.viewContent}
        onEndReached={getMore}
        onEndReachedThreshold={0.01}
        ListFooterComponent={loadMore ? <LoadMore /> : <View />}
        ListEmptyComponent={<ItemTrong />}
        onMomentumScrollBegin={() => {
          beginScroll.current = true;
        }}
      />
      <SearchItem
        defaultValue={keySearch}
        placeholder={translate('slink:Enter_Fullname')}
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

export default SearchTCNSCanBo;
const ChildrenRight = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="search" size={WIDTH(24)} color={'white'} />
    </TouchableOpacity>
  );
};

const ItemUser = ({ item, onPress }: any) => {
  return (
    <Pressable
      onPress={onPress}
      _pressed={R.themes.pressed}
      flexDirection="row"
      mb={'4'}>
      <ItemInfoStudents
        url={item?.urlAnhDaiDien}
        hoVaTen={tenGiangVien(item)}
        maSinhVien={item?.maCanBo}
      />
    </Pressable>
  );
};
