/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import ItemKeHoachNam from '@components/Item/ItemKeHoachNam';
import ItemTrong from '@components/Item/ItemTrong';
import ModalThongTinKeHoachNam from '@components/Item/ModalThongTinKeHoachNam';
import SingleSelect from '@components/QuyTrinhDong/component/SingleSelect';
import { SearchItem } from '@components/SearchAction/snack-bar-item';
import HeaderReal from '@libcomponents/header-real';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { getDSDotXayDungKeHoach, getDSKeHoachNam } from '@networking/user';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import {
  Actionsheet,
  Box,
  Center,
  FlatList,
  HStack,
  Pressable,
  Text,
  useDisclose,
  View,
} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import { KeHoachNamProps } from './type';

const KeHoachNam = () => {
  const { account } = useSelector(selectAppConfig);

  const maDonVi = account?.maDonViChinh;

  const [loading, setloading] = useState(false);

  const [thongTinKeHoach, setthongTinKeHoach] = useState<KeHoachNamProps>();

  const [visibleModal, setvisibleModal] = useState(false);

  const [listKeHoach, setlistKeHoach] = useState<KeHoachNamProps[]>([]);

  const [loadMore, setLoadMore] = useState(false);

  const [filter, setFilter] = useState<any[]>([]);

  const [pickVal, setPickVal] = useState('');

  const [keySearch, setkeySearch] = useState('');

  const [visible, setVisible] = useState(false);

  const page = useRef(1);

  const maxData = useRef(false);

  const beginScroll = useRef<boolean>(false);

  const [type, settype] = useState(LoaiKeHoachNam.TAT_CA);

  useEffect(() => {
    getDataFilter();
  }, []);

  useEffect(() => {
    getData(pickVal, type);
  }, [keySearch, type]);

  const getDataFilter = async () => {
    setloading(true);

    const res: any = await getDSDotXayDungKeHoach();

    const listDot =
      _.map(res, (value, key) => ({
        label: value?.ten,
        value: value?._id,
      })) ?? [];

    setFilter(listDot ?? []);

    setPickVal(listDot[0]?.value);

    await getData(listDot[0]?.value, type);
  };

  const getData = async (dataID: string, typeLoaiDon: LoaiKeHoachNam) => {
    try {
      setloading(true);

      page.current = 1;

      let typeDon;
      if (typeLoaiDon === LoaiKeHoachNam.DAU_MOI) {
        typeDon = {
          active: true,
          field: 'donViDauMoi.maDonVi',
          values: [maDonVi],
          operator: 'in',
        };
      } else if (typeLoaiDon === LoaiKeHoachNam.PHOI_HOP) {
        typeDon = {
          active: true,
          field: 'donViPhoiHop.maDonVi',
          values: [maDonVi],
          operator: 'in',
        };
      }

      const filters = typeDon ? typeDon : {};

      const body = {
        page: 1,
        limit: 10,
        sort: { thuTuHoatDong: 1 },
        condition: { idDotXayDungKeHoachNam: dataID },
        filters: [
          { field: 'noiDung', values: [keySearch], operator: 'contain' },
          {
            active: true,
            field: 'keHoachNamPhongBan',
            values: [true],
            operator: 'ne',
          },
          filters,
        ],
      };

      const res = await getDSKeHoachNam(body);

      setlistKeHoach(res?.result ?? []);

      maxData.current = res?.result?.length < 10;

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const loadMoreData = async () => {
    if (!maxData.current && listKeHoach.length !== 0) {
      setLoadMore(true);

      page.current += 1;

      let typeDon;
      if (type === LoaiKeHoachNam.DAU_MOI) {
        typeDon = {
          active: true,
          field: 'donViDauMoi.maDonVi',
          values: [maDonVi],
          operator: 'in',
        };
      } else if (type === LoaiKeHoachNam.PHOI_HOP) {
        typeDon = {
          active: true,
          field: 'donViPhoiHop.maDonVi',
          values: [maDonVi],
          operator: 'in',
        };
      }

      const filters = typeDon ? typeDon : {};

      try {
        const body = {
          page: page.current,
          limit: 10,
          sort: { thuTuHoatDong: 1 },
          condition: { idDotXayDungKeHoachNam: pickVal },
          filters: [
            { field: 'noiDung', values: [keySearch], operator: 'contain' },
            {
              active: true,
              field: 'keHoachNamPhongBan',
              values: [true],
              operator: 'ne',
            },
            filters,
          ],
        };

        const res: any = await getDSKeHoachNam(body);

        maxData.current = res?.result?.length < 10;

        setlistKeHoach([...listKeHoach, ...(res?.result ?? [])]);

        setLoadMore(false);
      } catch (error) {
        setLoadMore(false);
      }
    }
  };

  const showModal = (item: any) => {
    setthongTinKeHoach(item);

    setvisibleModal(true);
  };

  const onChangeValue = (value: string) => {
    getData(value, type);

    setPickVal(value);
  };

  const onSearch = (value: string) => {
    setkeySearch(value);
  };

  const onChangeType = (item: LoaiKeHoachNam) => {
    settype(item);
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        childrenRight={
          <HStack>
            <ChildrenRight onPress={() => setVisible(true)} />
            <ViewFilter onChangeType={onChangeType} />
          </HStack>
        }
        title={translate('slink:Year_work_plan')}
      />
      <Box flex={1} paddingTop={'6'}>
        <SingleSelect
          width={WIDTH(343)}
          alignSelf="center"
          placeholder={translate('slink:Select_month')}
          onChangeValue={onChangeValue}
          defaultValue={filter[0]?.value ?? ''}
          data={filter}
        />
        <Box flex={1} mt={'4'}>
          <FlatList
            data={listKeHoach}
            extraData={listKeHoach}
            onEndReached={loadMoreData}
            contentContainerStyle={{ paddingBottom: HEIGHT(30) }}
            ListFooterComponent={loadMore ? <LoadMore /> : <View />}
            onEndReachedThreshold={0.01}
            onRefresh={() => getData(pickVal, type)}
            onMomentumScrollBegin={() => {
              beginScroll.current = true;
            }}
            refreshing={loading}
            renderItem={({ item, index }: any) => (
              <ItemKeHoachNam
                showDetail={showModal}
                itemKeys={item}
                key={index}
              />
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<ItemTrong />}
          />
        </Box>
      </Box>
      <ModalThongTinKeHoachNam
        idDot={pickVal}
        data={thongTinKeHoach}
        isVisible={visibleModal}
        closeButton={() => setvisibleModal(false)}
      />
      <SearchItem
        defaultValue={keySearch}
        placeholder="Nhập tên hoạt động"
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
    </Box>
  );
};

export default KeHoachNam;
const ChildrenRight = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable _pressed={R.themes.pressed} onPress={onPress}>
      <Icon name="search" size={WIDTH(24)} color={'white'} />
    </Pressable>
  );
};

enum LoaiKeHoachNam {
  TAT_CA = 'Tất cả',
  DAU_MOI = 'Đơn vị đầu mối',
  PHOI_HOP = 'Đơn vị phối hợp',
}

const ViewFilter = (props: { onChangeType: (e: LoaiKeHoachNam) => void }) => {
  const { onChangeType } = props;

  const { isOpen, onOpen, onClose } = useDisclose();

  const LIST_FILTER = _.values(LoaiKeHoachNam);

  const [value, setvalue] = useState(LIST_FILTER[0]);

  const onSelect = (item: LoaiKeHoachNam) => {
    setvalue(item);

    onChangeType(item);

    onClose();
  };

  return (
    <Center>
      <Pressable ml={'4'} _pressed={R.themes.pressed} onPress={onOpen}>
        <Icon name="filter" size={WIDTH(24)} color={'white'} />
      </Pressable>
      <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Content>
          {LIST_FILTER?.map(item => (
            <Actionsheet.Item
              key={item}
              backgroundColor={value === item ? 'primary.500' : undefined}
              onPress={() => onSelect(item)}>
              <HStack alignItems={'center'}>
                <Text
                  fontSize={'sm'}
                  color={item === value ? 'white' : 'black'}
                  fontFamily={R.fonts.BeVietnamProMedium}
                  ml={'4'}>
                  {item}
                </Text>
              </HStack>
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
};
