/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';

import R from '@assets/R';
import { getWidth, HEIGHT, WIDTH } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import { InfoClassProps } from '@features/LopTinChi/ChiTietLopTinChi/type';
import HeaderReal from '@libcomponents/header-real';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getDanhSachBaiDang } from '@networking/user/DienDanBinhLuan';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import {
  Avatar,
  Box,
  FlatList,
  HStack,
  Pressable,
  Text,
  VStack,
} from 'native-base';

import ItemBaiDang from './component/ItemBaiDang';
import styles from './styles';
import { BaiDangProps } from './types';

interface Props {
  route: { params: { infoClass?: InfoClassProps } };
}

const DienDanLopTinChi = (props: Props) => {
  const { account } = useSelector(selectAppConfig);

  const [danhSachBaiDang, setdanhSachBaiDang] = useState<BaiDangProps[]>([]);

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
      //   const params = {
      //     page: 1,
      //     limit: 10,
      //     condition: { baiDangId: '66cfff2089420f5dddda3803' },
      //   };
      setloading(true);

      const params = {
        page: 1,
        limit: 10,
        sort: { ghimBaiViet: -1 },
        condition: { lopHocPhanId: props?.route?.params?.infoClass?._id },
      };

      const response = await getDanhSachBaiDang(params);

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
          sort: { ghimBaiViet: -1 },
          condition: { lopHocPhanId: props?.route?.params?.infoClass?._id },
        };

        const response = await getDanhSachBaiDang(params);

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

  return (
    <VStack flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Dien_dan')} />
      <FlatList
        data={danhSachBaiDang}
        extraData={danhSachBaiDang}
        ListHeaderComponent={
          <Pressable
            onPress={() =>
              navigateScreen(APP_SCREEN.CHITIETBAIDANG, {
                idLopTc: props?.route?.params?.infoClass?._id,
                onRefresh: () => initData(),
              })
            }
            _pressed={R.themes.pressed}
            style={R.themes.shadowOffset}>
            <HStack
              w={getWidth()}
              paddingX={WIDTH(16)}
              paddingY={HEIGHT(12)}
              backgroundColor={'white'}>
              <Avatar source={{ uri: account?.urlAnhDaiDien }}>
                {account?.firstname?.[0]?.toUpperCase() ?? ''}
              </Avatar>
              <Box
                flex={1}
                ml={WIDTH(8)}
                bgColor={R.colors.borderD}
                borderRadius={'full'}
                justifyContent={'center'}
                paddingX={WIDTH(16)}>
                <Text>Bạn có muốn chia sẻ điều gì không ?</Text>
              </Box>
            </HStack>
          </Pressable>
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ItemBaiDang
            item={item}
            key={index}
            onEdit={() =>
              navigateScreen(APP_SCREEN.CHITIETBAIDANG, {
                idLopTc: props?.route?.params?.infoClass?._id,
                onRefresh: () => initData(),
                editValue: item,
              })
            }
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
      {/* <ModalBaiDang
        idLopTc={props?.route?.params?.infoClass?._id}
        visible={visible}
        onClose={() => {
          setVisible(false);

          setCurItem(undefined);
        }}
        editValue={curItem}
        onRefresh={() => initData()}
      /> */}
      {/* <AddPlus onAdd={() => setVisible(true)} /> */}
    </VStack>
  );
};

export default DienDanLopTinChi;
