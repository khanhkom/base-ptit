/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { useSelector } from 'react-redux';

import R from '@assets/R';
import { WIDTH } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import { SearchItem } from '@components/SearchAction/snack-bar-item';
import {
  DEFAULT_MOST_USED_FUNCTION_LIST_NV,
  DEFAULT_MOST_USED_FUNCTION_LIST_SV,
} from '@config/module';
import ItemChucNangApp from '@features/TabMain/Item/FlatListItem/ItemChucNangApp';
import HeaderReal from '@libcomponents/header-real';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getDsVanBan } from '@networking/user';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// apis
import styles from './styles';

const MoTa = ({ item }: { item: { moTa: string } }) => {
  if (item?.moTa && item?.moTa !== '') {
    return <Text style={styles.textNote}>{item?.moTa ?? ''}</Text>;
  }

  return null;
};

const ItemDisplay = ({ item, account, onPress }: any) => {
  if (item?.isDoc) {
    return (
      <TouchableOpacity
        style={styles.viewItem}
        onPress={onPress}
        activeOpacity={0.8}>
        <View style={styles.iconChucNang}>
          <FontAwesome
            name="folder-open"
            color={R.colors.colorPink}
            size={WIDTH(21)}
          />
        </View>
        <View style={styles.viewTextLeft}>
          <Text style={styles.textNameFolder}>
            {item?.ten ?? translate('slink:No_title_doc')}
          </Text>
          <MoTa item={item} />
        </View>
        <View style={styles.iconChucNang}>
          <Entypo name="chevron-right" size={WIDTH(24)} color={'#848A95'} />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <ItemChucNangApp
        customStyle={styles.itemChucNang}
        account={account}
        content={item}
        icon={item}
      />
    );
  }
};

const SearchScreen = () => {
  const { account } = useSelector(selectAppConfig);

  const [keySearch, setkeySearch] = useState('');

  const [visible, setVisible] = useState(true);

  const [listResult, setListResult] = useState<any>([]);

  const onChangeValueSearch = async (value: string) => {
    setkeySearch(value);

    if (value?.trim() === '') {
      setListResult([]);
    } else {
      const source: any = account?.isGiaoVien
        ? DEFAULT_MOST_USED_FUNCTION_LIST_NV
        : DEFAULT_MOST_USED_FUNCTION_LIST_SV;

      const result: any = source.filter((item: string) => {
        return item?.toLowerCase().includes(value?.trim()?.toLowerCase());
      });

      const body = {
        limit: 10,
        page: 1,
        condition: {
          ten: {
            $regex: value,
            $options: 'i',
          },
        },
      };

      let resultFromAPI = [];
      try {
        const responseTaiLeu = await getDsVanBan(body);

        resultFromAPI = responseTaiLeu?.data?.result ?? [];
      } catch (error) {}

      setListResult([
        ...(result ?? []),
        ...(resultFromAPI?.map((item: any) => ({
          ...item,
          isDoc: true,
        })) ?? []),
      ]);
    }
  };

  const goToDetailDoc = (item: any) => {
    navigateScreen(APP_SCREEN.DSCHITIETVANBANHUONGDAN, { item });
  };

  return (
    <View style={styles.container}>
      <HeaderReal
        title={translate('slink:Search_func')}
        childrenRight={
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}>
            <Icon name="search" size={WIDTH(24)} color={'white'} />
          </TouchableOpacity>
        }
      />
      <SearchItem
        defaultValue={keySearch}
        placeholder={translate('slink:Search')}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);

          onChangeValueSearch('');
        }}
        onChangeValue={onChangeValueSearch}
      />
      <FlatList
        data={listResult}
        extraData={listResult}
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{ zIndex: 1 }}
        keyExtractor={(_item, index) => String(index)}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item }) => (
          <ItemDisplay
            item={item}
            account={account}
            onPress={() => goToDetailDoc(item)}
          />
        )}
        ListEmptyComponent={<ItemTrong />}
      />
    </View>
  );
};

export default SearchScreen;
