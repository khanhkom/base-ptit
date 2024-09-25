/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @flow
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import R from '@assets/R';
import Icon from 'react-native-vector-icons/Feather';

import { HEIGHT, WIDTH } from '@common';
import HeaderReal from '@libcomponents/header-real';
import ItemTrong from '@components/Item/ItemTrong';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getDsVanBan } from '@networking/user';

import styles from './styles';
import { SearchItem } from '@components/SearchAction/snack-bar-item';
import FastImage from 'react-native-fast-image';
import { MixPanelEvent, trackEvent } from '@utils/Mixpanel';
import { translate } from '@utils/i18n/translate';
import { useSelector } from 'react-redux';
import { selectAppConfig } from '@redux-selector/app';

const VanBanHuongDan = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { account } = useSelector(selectAppConfig);

  const page = useRef(1);

  const maxData = useRef(false);

  const [showfooter, setShowfooter] = useState(false);

  const [listVanBan, setlistVanBan] = useState<any[]>([]);

  const [visible, setVisible] = useState(false);

  const [keySearch, setkeySearch] = useState('');

  const beginScroll = useRef(false);

  useEffect(() => {
    trackEvent(MixPanelEvent.XEM_VAN_BAN_HUONG_DAN);
  }, []);

  useEffect(() => {
    refreshData();
  }, [keySearch]);

  const refreshData = async () => {
    page.current = 1;

    setRefreshing(true);

    const body = {
      limit: 10,
      page: 1,
      filters: [
        ...(keySearch
          ? [
              {
                values: [keySearch],
                field: 'ten',
                operator: 'contain',
              },
            ]
          : []),
        {
          active: true,
          field: 'doiTuong',
          values: ['Tất cả', ...[account?.isGiaoVien ? 'Cán bộ' : 'Sinh viên']],
          operator: 'in',
        },
      ],
    };

    try {
      const res = await getDsVanBan(body);

      setlistVanBan(res?.data?.result ?? []);

      setRefreshing(false);

      maxData.current = res?.data?.data?.result?.length < 10;
    } catch (error) {
      setRefreshing(false);
    }
  };

  const loadMoreData = async () => {
    page.current += 1;

    if (!maxData.current) {
      setShowfooter(true);

      const body = {
        limit: 10,
        page: page.current,
        filters: [
          ...(keySearch
            ? [
                {
                  values: [keySearch],
                  field: 'ten',
                  operator: 'contain',
                },
              ]
            : []),
          {
            active: true,
            field: 'doiTuong',
            values: [
              'Tất cả',
              ...[account?.isGiaoVien ? 'Cán bộ' : 'Sinh viên'],
            ],
            operator: 'in',
          },
        ],
      };

      try {
        const res = await getDsVanBan(body);

        setlistVanBan([...listVanBan, ...(res?.data?.result ?? [])]);

        setShowfooter(false);
      } catch (error) {
        setShowfooter(false);
      }
    }
  };

  const getMore = () => {
    if (beginScroll.current && !maxData.current) {
      loadMoreData();

      beginScroll.current = false;
    }
  };

  const onSearch = (value: string) => {
    setkeySearch(value);
  };

  const renderFooter = () =>
    showfooter ? (
      <View style={{ height: HEIGHT(30) }}>
        <ActivityIndicator animating color={R.colors.grey1000} size="large" />
      </View>
    ) : (
      <View style={{ height: HEIGHT(30) }} />
    );

  const renderItem = ({ item, index }: any) => {
    const soLuongVanBan = item?.danhSachTep?.length ?? 0;

    const color = soLuongVanBan === 0 ? R.colors.black0 : R.colors.colorMain;

    return (
      <TouchableOpacity
        testID={`ItemListVanBan ${index}`}
        style={styles.viewItem}
        activeOpacity={0.6}
        key={index}
        onPress={() => {
          navigateScreen(APP_SCREEN.DSCHITIETVANBANHUONGDAN, { item });
        }}>
        <View>
          <FastImage
            source={R.images.bgLogo}
            resizeMode="stretch"
            style={[styles.img]}
          />
        </View>
        <View style={styles.viewTextLeft}>
          <Text style={styles.textNameFolder}>
            {item?.ten ?? translate('slink:No_title_doc')}
          </Text>
          <Text style={styles.textNote}>
            {translate('slink:Num_of_doc')}:{' '}
            <Text style={[styles.soLuong, { color }]}>{soLuongVanBan}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <HeaderReal
        title={translate('slink:Guidelines_doc')}
        childrenRight={
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}>
            <Icon name="search" size={WIDTH(24)} color={'white'} />
          </TouchableOpacity>
        }
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={listVanBan}
        extraData={listVanBan}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onEndReached={getMore}
        ListFooterComponent={renderFooter}
        onRefresh={refreshData}
        contentContainerStyle={styles.containerContent}
        onEndReachedThreshold={0.01}
        ListEmptyComponent={<ItemTrong />}
        onScroll={() => {
          beginScroll.current = true;
        }}
        refreshing={refreshing}
      />
      <SearchItem
        defaultValue={keySearch}
        placeholder={translate('slink:Title_of_doc')}
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

export default VanBanHuongDan;
