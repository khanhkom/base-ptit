/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';

import R from '@assets/R';
import { HEIGHT } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import { HocKyProps } from '@features/DangKyTinChi/type';
import HeaderReal from '@libcomponents/header-real';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { getPhieuDrlMe } from '@networking/user';
import { getDSKyHoc } from '@networking/user/DangKyTinChi';
import { translate } from '@utils/i18n/translate';
import { Box, FlatList } from 'native-base';

import ItemPhieuDrl from './ItemPhieuDrl';
import { PhieuDrlProps } from './type';

const DiemRenLuyen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const [listPhieuDRL, setlistPhieuDRL] = useState<PhieuDrlProps[]>([]);

  const [listHocKy, setlistHocKy] = useState<HocKyProps[]>([]);

  const page = useRef(1);

  const maxData = useRef(false);

  const [loadMore, setLoadMore] = useState(false);

  const beginScroll = useRef<boolean>(false);

  useEffect(() => {
    getListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getHocKy = async () => {
    try {
      const bodyKyHoc = { condition: { active: true }, sort: { ma: -1 } };

      const responseKyHoc: any = await getDSKyHoc(bodyKyHoc);

      const listKyHoc = responseKyHoc?.data?.data;

      setlistHocKy(listKyHoc);
    } catch (error) {}
  };

  const getListData = async () => {
    page.current = 1;

    setRefreshing(true);

    try {
      await getHocKy();

      const body = {
        page: page.current,
        limit: 10,
        condition: {},
      };

      const responsePhieuDRL: any = await getPhieuDrlMe(body);

      maxData.current = responsePhieuDRL?.data?.result?.length < 10;

      setlistPhieuDRL(responsePhieuDRL?.data?.result || []);

      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
    }
  };

  const loadMoreData = async () => {
    if (!maxData.current) {
      setLoadMore(true);

      page.current = 1;

      try {
        const body = {
          page: page.current,
          limit: 10,
          condition: {},
        };

        const responsePhieuDRL: any = await getPhieuDrlMe(body);

        maxData.current = responsePhieuDRL?.data?.result?.length < 10;

        setlistPhieuDRL([
          ...listPhieuDRL,
          ...(responsePhieuDRL?.data?.result ?? []),
        ]);

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

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Diem_ren_luyen')} />
      <FlatList
        data={listPhieuDRL}
        extraData={listPhieuDRL}
        mt="6"
        onRefresh={getListData}
        onEndReached={getMore}
        refreshing={refreshing}
        ListFooterComponent={loadMore ? <LoadMore /> : null}
        onEndReachedThreshold={0.01}
        onMomentumScrollBegin={() => {
          beginScroll.current = true;
        }}
        ListEmptyComponent={<ItemTrong />}
        contentContainerStyle={{
          paddingBottom: HEIGHT(30),
        }}
        renderItem={({ item, index }) => {
          return <ItemPhieuDrl listHocKy={listHocKy} key={index} data={item} />;
        }}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};

export default DiemRenLuyen;
