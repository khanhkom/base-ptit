/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import { Divider, DropDown, Icon } from '@libcomponents';
import HeaderReal from '@libcomponents/header-real';
import ItemIconSVG from '@libcomponents/icon-svg';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getHistoryThuVien } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

import ItemLichSu from './Item/ItemLichSu';
import styles from './styles';

const ThuVien = () => {
  const [buoi, setBuoi] = useState<any>('');

  const [loading, setLoading] = useState<any>(false);

  const [from, setFrom] = useState<any>(new Date());

  const [to, setTo] = useState<any>(new Date());

  const [data, setData] = useState<any>([]);

  const [loadMore, setLoadMore] = useState(false);

  const page = useRef(1);

  const maxData = useRef(false);

  const beginScroll = useRef<boolean>(false);

  const scrollRef = useRef<any>();

  const getData = async () => {
    setLoading(true);

    const timeBatDau = moment(from).startOf('day').toISOString();

    const timeKetThuc = moment(to).endOf('day').toISOString();

    const body = {
      page: 1,
      limit: 10,
      cond: {
        ...(buoi !== 'Cả ngày' && buoi !== '' && { buoi: buoi }),
        createdAt: {
          $lte: timeKetThuc,
          $gte: timeBatDau,
        },
      },
      sort: { createdAt: -1 },
    };

    try {
      const res: any = await getHistoryThuVien(body);

      setData(res?.data?.data?.result ?? []);

      maxData.current = res?.data?.data?.result?.length < 10;

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const loadMoreData = async () => {
    if (!maxData.current) {
      setLoadMore(true);

      page.current += 1;

      try {
        const timeBatDau = moment(from).startOf('day').toISOString();

        const timeKetThuc = moment(to).endOf('day').toISOString();

        const body = {
          page: page.current,
          limit: 10,
          cond: {
            ...(buoi !== 'Cả ngày' && buoi !== '' && { buoi: buoi }),
            createdAt: {
              $lte: timeKetThuc,
              $gte: timeBatDau,
            },
          },
          sort: { createdAt: -1 },
        };

        const res: any = await getHistoryThuVien(body);

        setData([...data, ...(res?.data?.data?.result ?? [])]);

        maxData.current = res?.data?.data?.result?.length < 10;

        setLoadMore(false);
      } catch (error) {
        setLoadMore(false);
      }
    }
  };

  const getMore = () => {
    if (beginScroll.current && !maxData.current) {
      loadMoreData();

      beginScroll.current = false;
    }
  };

  useEffect(() => {
    setData([]);

    page.current = 1;

    getData();
  }, [buoi, from, to]);

  return (
    <View style={styles.container} testID="TabDVu1Cua">
      <HeaderReal
        title={translate('slink:Library_history')}
        childrenRight={
          <TouchableOpacity
            style={{
              backgroundColor: R.colors.white100,
              padding: WIDTH(8),
              borderRadius: WIDTH(32),
            }}
            onPress={() =>
              navigateScreen(APP_SCREEN.QRSCANNER, { onRefresh: getData })
            }>
            <ItemIconSVG title="QRScanner" />
          </TouchableOpacity>
        }
      />
      <BoLoc
        buoi={buoi}
        setBuoi={setBuoi}
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
      />
      <FlatList
        data={data}
        extraData={data}
        onEndReached={getMore}
        ListFooterComponent={loadMore ? <LoadMore /> : <View />}
        onEndReachedThreshold={0.01}
        onMomentumScrollBegin={() => {
          beginScroll.current = true;
        }}
        onRefresh={getData}
        refreshing={loading}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }: any) => (
          <ItemLichSu key={index} item={item} />
        )}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        ListEmptyComponent={<ItemTrong />}
      />
    </View>
  );
};

export default ThuVien;
const BoLoc = ({ setBuoi, from, setFrom, to, setTo }: any) => {
  const [isDatePickerVisibleFrom, setDatePickerVisibilityFrom] =
    useState<boolean>(false);

  const showDatePickerFrom = () => {
    setDatePickerVisibilityFrom(true);
  };

  const hideDatePickerFrom = () => {
    setDatePickerVisibilityFrom(false);
  };

  const [isDatePickerVisibleTo, setDatePickerVisibilityTo] =
    useState<boolean>(false);

  const showDatePickerTo = () => {
    setDatePickerVisibilityTo(true);
  };

  const hideDatePickerTo = () => {
    setDatePickerVisibilityTo(false);
  };

  const onChangeFrom = (dateValue: Date) => {
    hideDatePickerFrom();

    setFrom(dateValue);
  };

  const onChangeTo = (dateValue: Date) => {
    hideDatePickerTo();

    setTo(dateValue);
  };

  return (
    <View
      style={{ width: WIDTH(343), alignSelf: 'center', marginTop: HEIGHT(32) }}>
      <View
        style={{
          backgroundColor: R.colors.white100,
          borderRadius: WIDTH(8),
          paddingHorizontal: WIDTH(16),
          marginTop: HEIGHT(8),
        }}>
        <TouchableOpacity
          style={styles.formShow}
          onPress={() => showDatePickerFrom()}>
          <Text style={styles.textInfoBoard}>{translate('slink:Start')}</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.dateTextContainer}>
              <Text style={styles.dateText}>
                {moment(from).format('DD/MM/YYYY')}
              </Text>
            </View>
            <Icon icon={'arrow_down'} color={R.colors.gray6B} />
          </View>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={styles.formShow}
          onPress={() => showDatePickerTo()}>
          <Text style={styles.textInfoBoard}>{translate('slink:End')}</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.dateTextContainer}>
              <Text style={styles.dateText}>
                {moment(to).format('DD/MM/YYYY')}
              </Text>
            </View>
            <Icon icon={'arrow_down'} color={R.colors.gray6B} />
          </View>
        </TouchableOpacity>

        <View style={styles.formShow}>
          <Text style={styles.textInfoBoard}>{translate('slink:Select')}</Text>
          <DropDown
            data={[
              { label: 'Cả ngày', value: 'Cả ngày' },
              { label: 'Sáng', value: 'Sáng' },
              { label: 'Chiều', value: 'Chiều' },
            ]}
            defaultValue={'Cả ngày'}
            style={{ alignItems: 'flex-end' }}
            placeholderStyle={styles.textInfo}
            arrowColor={R.colors.gray6B}
            containerStyle={{
              width: WIDTH(100),
              height: HEIGHT(36),
              paddingLeft: WIDTH(8),
              borderRadius: WIDTH(8),
            }}
            onChangeItem={setBuoi}
          />
        </View>
      </View>
      <DateTimePickerModal
        is24Hour
        date={from}
        isVisible={isDatePickerVisibleFrom}
        mode={'date'}
        maximumDate={to}
        locale="vi"
        confirmTextIOS={translate('slink:Confirm')}
        cancelTextIOS={translate('slink:Cancel')}
        onConfirm={onChangeFrom}
        onCancel={hideDatePickerFrom}
      />
      <DateTimePickerModal
        is24Hour
        date={to}
        minimumDate={from}
        isVisible={isDatePickerVisibleTo}
        mode={'date'}
        locale="vi"
        confirmTextIOS={translate('slink:Confirm')}
        cancelTextIOS={translate('slink:Cancel')}
        onConfirm={onChangeTo}
        onCancel={hideDatePickerTo}
      />
    </View>
  );
};
