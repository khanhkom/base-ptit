/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';

import { useSelector } from 'react-redux';

import HeaderSongNganh from '@components/HeaderSongNganh';
import ItemSubject from '@components/Item/ItemSubject';
import ItemTrong from '@components/Item/ItemTrong';
import SelectHocKy from '@components/SelectHocKy';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  getLopTinChiGVTheoKyHoc,
  getLopTinChiSVTheoKyHoc,
} from '@networking/user';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';

import styles from './styles';

const LopTinChi = () => {
  const { account } = useSelector(selectAppConfig);

  const [kyHocVal, setkyHocVal] = useState('');

  const [listClass, setlistClass] = useState<Array<any>>([]);

  const [khoaNganh, setkhoaNganh] = useState<string | undefined>('');

  const [loading, setloading] = useState(false);

  const [loadMore, setLoadMore] = useState(false);

  const page = useRef(1);

  const maxData = useRef(false);

  const beginScroll = useRef<boolean>(false);

  useEffect(() => {
    !!kyHocVal && getData();
  }, [kyHocVal, khoaNganh]);

  const getMore = () => {
    if (beginScroll.current && !maxData.current) {
      !!kyHocVal && loadMoreData();

      beginScroll.current = false;
    }
  };

  const getData = async () => {
    try {
      setloading(true);

      let res: any;
      const body = {
        page: 1,
        limit: 10,
        condition: {
          loai: 'C',
          maHocKy: kyHocVal,
          ...(!account?.isGiaoVien && { maKhoaNganh: khoaNganh }),
        },
      };

      if (account?.isGiaoVien) {
        res = await getLopTinChiGVTheoKyHoc(body);
      } else {
        res = await getLopTinChiSVTheoKyHoc(body);
      }

      setlistClass(res?.data?.data?.result || []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const loadMoreData = async () => {
    if (!maxData.current) {
      setLoadMore(true);

      page.current += 1;

      try {
        let res: any;
        const body = {
          page: 1,
          limit: page.current,
          condition: {
            loai: 'C',
            maHocKy: kyHocVal,
            ...(!account?.isGiaoVien && { maKhoaNganh: khoaNganh }),
          },
        };

        if (account?.isGiaoVien) {
          res = await getLopTinChiGVTheoKyHoc(body);
        } else {
          res = await getLopTinChiSVTheoKyHoc(body);
        }

        setlistClass([...listClass, ...(res?.data?.data?.result ?? [])]);

        maxData.current = res?.data?.data?.result?.length < 10;

        setLoadMore(false);
      } catch (error) {
        setLoadMore(false);
      }
    }
  };

  const onChangeKyHoc = (value: string) => {
    setkyHocVal(value);
  };

  return (
    <View style={styles.container}>
      <HeaderSongNganh
        onChangeKhoaNganh={val => {
          !!val?.ma && setkhoaNganh(val?.ma);
        }}
        title={translate('slink:Lop_tin_chi')}
      />
      <View style={styles.content}>
        <SelectHocKy onChange={onChangeKyHoc} />
        <FlatList
          data={listClass}
          showsVerticalScrollIndicator={false}
          onRefresh={getData}
          refreshing={loading}
          numColumns={2}
          ListEmptyComponent={<ItemTrong />}
          onEndReached={getMore}
          ListFooterComponent={loadMore ? <LoadMore /> : null}
          columnWrapperStyle={styles.wrap}
          contentContainerStyle={styles.contentContainer}
          renderItem={({ item, index }) => {
            const visiblePoint = !!item?.diem?.diemChu;

            const listPoint = visiblePoint ? [item?.diem?.diemChu] : [];

            return (
              <ItemSubject
                key={index}
                listPoint={listPoint}
                visiblePoint={visiblePoint}
                account={account}
                soTinChi={item?.stc || item?.stc?.soTinChi}
                tenMon={item?.hocPhan?.ten}
                maLop={item?.maLop}
                onPress={() =>
                  navigateScreen(APP_SCREEN.CHITIETLOPTINCHI, {
                    item,
                    idKyHoc: kyHocVal,
                  })
                }
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default LopTinChi;
