import { Box, FlatList } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import R from '@assets/R';
import HeaderReal from '@libcomponents/header-real';
import { HocPhanProps, LopHocPhanDKTCProps } from '../type';
import { getDSChiTietHocPhan } from '@networking/user/DangKyTinChi';
import ItemTrong from '@components/Item/ItemTrong';
import LoadMore from '@libcomponents/loading/loadmore-component';
import ItemChiTietHocPhan from '../component/ItemChiTietHocPhan';
import { HEIGHT, WIDTH } from '@common';
interface Props {
  route: {
    params: {
      data: HocPhanProps;
      maHocKy: string;
      maChuongTrinh: string;
      onChangeLHP: (e: LopHocPhanDKTCProps) => void;
      listLHPRegistered: LopHocPhanDKTCProps[];
    };
  };
}
const ChiTietHocPhan = (props: Props) => {
  const data = props?.route?.params?.data;
  const maHocKy = props?.route?.params?.maHocKy;
  const maChuongTrinh = props?.route?.params?.maChuongTrinh;
  const onChangeLHP = props?.route?.params?.onChangeLHP;
  const listLHPRegistered = props?.route?.params?.listLHPRegistered;
  const lhptheoMaHP = listLHPRegistered?.find(item => {
    return item?.maHocPhan === data?.ma && item?.maHocKy === maHocKy;
  });
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setloading] = useState(false);
  const beginScroll = useRef<boolean>(false);
  const page = useRef(1);
  const maxData = useRef(false);
  const [selectedLHP, setselectedLHP] = useState<LopHocPhanDKTCProps>();
  const [dsHocPhan, setdsHocPhan] = useState<LopHocPhanDKTCProps[]>([]);
  useEffect(() => {
    setselectedLHP(lhptheoMaHP);
    getInit();
  }, []);
  const getInit = async () => {
    setloading(true);
    try {
      const body = {
        page: 1,
        limit: 10,
        sort: { soThuTuLop: 1 },
        condition: { maHocPhan: data?.ma, loai: 'C', trangThaiLop: 'Mở' },
      };
      const resHocPhan = await getDSChiTietHocPhan(
        maHocKy,
        maChuongTrinh,
        body,
      );
      setdsHocPhan(resHocPhan?.data?.data?.result || []);
      maxData.current = resHocPhan?.data?.data?.result?.length < 10;
      page.current = 1;
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
        const body = {
          page: page.current,
          limit: 10,
          sort: { soThuTuLop: 1 },
          condition: { maHocPhan: data?.ma, loai: 'C', trangThaiLop: 'Mở' },
        };
        const resHocPhan = await getDSChiTietHocPhan(
          maHocKy,
          maChuongTrinh,
          body,
        );
        maxData.current = resHocPhan?.data?.data?.result?.length < 10;
        setdsHocPhan([...dsHocPhan, ...(resHocPhan?.data?.data?.result ?? [])]);
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
      <HeaderReal title={`${data?.ten || '--'}\n${data?.ma || '--'}`} />
      <FlatList
        data={dsHocPhan}
        extraData={dsHocPhan}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const exists = selectedLHP?._id === item?._id;
          return (
            <ItemChiTietHocPhan
              listLHPRegistered={listLHPRegistered}
              isCheck={exists}
              key={index}
              onPress={() => {
                setselectedLHP(item);
                onChangeLHP(item);
              }}
              dataHocPhan={data}
              data={item}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        onEndReached={getMore}
        ListEmptyComponent={<ItemTrong />}
        ListFooterComponent={loadMore ? <LoadMore /> : null}
        onEndReachedThreshold={0.01}
        contentContainerStyle={{
          paddingTop: HEIGHT(24),
          paddingHorizontal: WIDTH(16),
          paddingBottom: HEIGHT(30),
        }}
        onRefresh={getInit}
        refreshing={loading}
        onMomentumScrollBegin={() => {
          beginScroll.current = true;
        }}
      />
    </Box>
  );
};

export default ChiTietHocPhan;
