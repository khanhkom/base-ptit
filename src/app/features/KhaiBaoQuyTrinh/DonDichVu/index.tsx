/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';

import ItemKhaiBaoQuyTrinh from '@components/Item/ItemKhaiBaoQuyTrinh';
import ItemTrong from '@components/Item/ItemTrong';
import { showToast } from '@components/Toast';
import LoadingComponent from '@libcomponents/loading/loading-component';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  createQuyTrinh,
  dsKhaiBaoQuyTrinh,
  getMyAllDotById,
} from '@networking/user/KhaiBaoQuyTrinh';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import { Box, FlatList } from 'native-base';

import styles from './styles';

import ModalDotQuyTrinh from '../component/ModalDotQuyTrinh';
import { DSKhaiBaoProps } from '../type';

const DonDichVu = ({
  onIndexChange,
}: {
  onIndexChange: (e: number) => void;
}) => {
  const { account } = useSelector(selectAppConfig);

  const [loading, setloading] = useState(false);

  const [itemQuyTrinh, setitemQuyTrinh] = useState<DSKhaiBaoProps>();

  const [visible, setvisible] = useState(false);

  const [dsDotKB, setdsDotKB] = useState([]);

  const [loadMore, setLoadMore] = useState(false);

  const [loadingGoto, setLoadingGoto] = useState(false);

  const page = useRef(1);

  const maxData = useRef(false);

  const beginScroll = useRef<boolean>(false);

  const [listData, setlistData] = useState<DSKhaiBaoProps[]>([]);

  useEffect(() => {
    getDataAPI();
  }, []);

  const getDataAPI = async () => {
    setloading(true);

    try {
      const body = account?.isGiaoVien
        ? {
            page: 1,
            limit: 10,
            condition: {
              phanHe: { $not: { $in: ['QUAN_LY_KHOA_HOC'] } },
              active: true,
            },
          }
        : {
            page: 1,
            limit: 10,
            sort: { order: -1 },
            condition: { linhVuc: 'Dịch vụ hành chính', active: true },
          };

      maxData.current = false;

      page.current = 1;

      const responseAPI: any = await dsKhaiBaoQuyTrinh(
        body,
        account?.isGiaoVien,
      );

      setlistData(responseAPI?.data?.data?.result ?? []);

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
        const body = account?.isGiaoVien
          ? {
              page: page.current,
              limit: 10,
              condition: {
                phanHe: { $not: { $in: ['QUAN_LY_KHOA_HOC'] } },
                active: true,
              },
            }
          : {
              page: page.current,
              limit: 10,
              sort: { order: -1 },
              condition: { linhVuc: 'Dịch vụ hành chính', active: true },
            };

        const responseAPI: any = await dsKhaiBaoQuyTrinh(
          body,
          account?.isGiaoVien,
        );

        setlistData([...listData, ...(responseAPI?.data?.data?.result ?? [])]);

        maxData.current = responseAPI?.data?.data?.result?.length < 10;

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

  const navigateDetail = async (item: DSKhaiBaoProps) => {
    setLoadingGoto(true);

    if (item?.cauHinhDotQuyTrinh?.nguonDot === 'Không có đợt') {
      const responseCreateDon: any = await createQuyTrinh(item?._id, '');

      if (responseCreateDon?.status) {
        navigateScreen(APP_SCREEN.CACBUOCKHAIBAO, {
          data: item,
          onIndexChange,
          banGhiDon: responseCreateDon?.data?.data,
        });
      }
    } else {
      const responseDot = await getMyAllDotById(item?._id);

      const listDot = responseDot?.data?.data ?? [];

      if (listDot?.length > 1) {
        setdsDotKB(listDot);

        setitemQuyTrinh(item);

        setvisible(true);
      } else if (listDot?.length === 1) {
        const responseCreateDon: any = await createQuyTrinh(
          item?._id,
          listDot?.[0]?._id,
        );

        if (responseCreateDon?.status) {
          navigateScreen(APP_SCREEN.CACBUOCKHAIBAO, {
            data: item,
            onIndexChange,
            banGhiDon: responseCreateDon?.data?.data,
          });
        }
      } else {
        showToast({
          msg: translate('slink:No_batch'),
          interval: 2000,
          type: 'error',
        });
      }
    }

    setLoadingGoto(false);
  };

  return (
    <Box flex={1}>
      <FlatList
        data={listData}
        extraData={listData}
        onRefresh={getDataAPI}
        onEndReached={getMore}
        refreshing={loading}
        ListFooterComponent={loadMore ? <LoadMore /> : null}
        onEndReachedThreshold={0.01}
        onMomentumScrollBegin={() => {
          beginScroll.current = true;
        }}
        ListEmptyComponent={<ItemTrong />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ItemKhaiBaoQuyTrinh
            onRefresh={getDataAPI}
            data={item}
            khaiBao={true}
            key={index}
            title={item?.ten}
            index={index}
            onPress={() => navigateDetail(item)}
          />
        )}
      />
      {visible && (
        <ModalDotQuyTrinh
          listDotQTDong={dsDotKB}
          itemQuyTrinh={itemQuyTrinh}
          visible={visible}
          onClose={() => setvisible(false)}
        />
      )}
      <LoadingComponent loading={loadingGoto} />
    </Box>
  );
};

export default DonDichVu;
