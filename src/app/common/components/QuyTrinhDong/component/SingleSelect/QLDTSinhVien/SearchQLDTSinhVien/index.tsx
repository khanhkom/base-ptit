/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';

import R from '@assets/R';
import { renderAvaSV, showImage, tenGiangVien, WIDTH } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import { SearchItem } from '@components/SearchAction/snack-bar-item';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { goBack } from '@navigation/navigation-service';
import { getDSSinhVien } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { Box, Pressable } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import { styles } from './styles';

const SearchQLDTSinhVien = (props: any) => {
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
      // condition: { trangThaiChinhSua: 'Duyệt - đang áp dụng' },
      filters: [{ field: 'ten', values: [keySearch], operator: 'contain' }],
    };

    const responseDS = await getDSSinhVien(body);

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
          // condition: { trangThaiChinhSua: 'Duyệt - đang áp dụng' },
          filters: [{ field: 'ten', values: [keySearch], operator: 'contain' }],
        };

        const responseDS = await getDSSinhVien(body);

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

export default SearchQLDTSinhVien;
const ChildrenRight = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="search" size={WIDTH(24)} color={'white'} />
    </TouchableOpacity>
  );
};

const ItemUser = ({ item, index, onPress }: any) => {
  const anhDaiDien = renderAvaSV(item);

  return (
    <TouchableOpacity
      key={index}
      onPress={onPress}
      style={styles.containerItem}>
      <Pressable
        _pressed={R.themes.pressed}
        onPress={() =>
          showImage([{ source: anhDaiDien, title: tenGiangVien(item) }])
        }
        style={styles.img}>
        <FastImage
          style={styles.ava}
          resizeMode="contain"
          source={anhDaiDien}
        />
      </Pressable>
      <View style={styles.viewInfo}>
        <Text style={styles.tenGV}>{tenGiangVien(item)}</Text>
        <Text style={styles.maCanBo}>{item?.ma ?? '--'}</Text>
      </View>
    </TouchableOpacity>
  );
};
