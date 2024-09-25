/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';

import R from '@assets/R';
import AddPlus from '@components/AddPlus';
import ItemTrong from '@components/Item/ItemTrong';
import { InfoClassProps } from '@features/LopTinChi/ChiTietLopTinChi/type';
import HeaderReal from '@libcomponents/header-real';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getListAssignment } from '@networking/user/BaiTapVeNha';
import { translate } from '@utils/i18n/translate';
import { FlatList, VStack } from 'native-base';

import ItemBaiTap from './Items/ItemBaiTap';
import styles from './styles';
import { BaiTapVeNhaProps } from './type';
interface Props {
  route: { params: { infoClass?: InfoClassProps } };
}

const BaiTapVeNha = (props: Props) => {
  const infoClass = props?.route?.params?.infoClass;

  const [danhSachBaiDang, setdanhSachBaiDang] = useState<BaiTapVeNhaProps[]>(
    [],
  );

  const page = useRef(1);

  const beginScroll = useRef<boolean>(false);

  const [loading, setloading] = useState(false);

  const [loadMore, setLoadMore] = useState(false);

  const maxData = useRef(false);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      setloading(true);

      const params = {
        page: 1,
        limit: 10,
        condition: { lopHocPhanId: infoClass?._id || '' },
      };

      const response: any = await getListAssignment(params);

      maxData.current = response?.data?.data?.result?.length < 10;

      page.current = 1;

      setdanhSachBaiDang(response?.data?.data?.result || []);

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
        const params = {
          page: page.current,
          limit: 10,
          condition: { lopHocPhanId: infoClass?._id || '' },
        };

        const response = await getListAssignment(params);

        maxData.current = response?.data?.data?.result?.length < 10;

        setdanhSachBaiDang([
          ...danhSachBaiDang,
          ...(response?.data?.data?.result ?? []),
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

  const onAdd = () => {
    navigateScreen(APP_SCREEN.THONGTINBAITAP, {
      onRefresh: () => initData(),
      lopTc: props?.route?.params?.infoClass,
    });
  };

  const onEdit = (item: BaiTapVeNhaProps) => {
    navigateScreen(APP_SCREEN.THONGTINBAITAP, {
      onRefresh: () => initData(),
      editValue: item,
      lopTc: props?.route?.params?.infoClass,
    });
  };

  return (
    <VStack flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Bai_tap')} />
      <FlatList
        data={danhSachBaiDang}
        extraData={danhSachBaiDang}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ItemBaiTap
            item={item}
            key={index}
            onEdit={() => onEdit(item)}
            onRefresh={initData}
          />
        )}
        showsVerticalScrollIndicator={false}
        onEndReached={getMore}
        ListEmptyComponent={<ItemTrong />}
        ListFooterComponent={loadMore ? <LoadMore /> : null}
        onEndReachedThreshold={0.01}
        onRefresh={initData}
        refreshing={loading}
        contentContainerStyle={styles.containerNews}
        removeClippedSubviews
        onMomentumScrollBegin={() => {
          beginScroll.current = true;
        }}
      />
      <AddPlus onAdd={onAdd} />
    </VStack>
  );
};

export default BaiTapVeNha;
