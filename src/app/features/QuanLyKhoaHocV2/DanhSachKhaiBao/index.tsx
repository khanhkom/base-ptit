/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import ViewFilterNB from '@components/ViewFilterNB';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getDanhSachNamHoc } from '@networking/user/KhaiBaoQuyTrinh';
import { getSanPhamNCKH } from '@networking/user/QuanLyKhoaHoc';
import { translate } from '@utils/i18n/translate';
import { Box, FlatList, Pressable } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ItemKhaiBao from './ItemKhaiBao';

import { LoaiHinhNCKHProps, NamHocProps } from '../type';
interface Props {
  route: { params: { dataLoaiHinh: LoaiHinhNCKHProps } };
}
const DanhSachKhaiBaoNCKH = (props: Props) => {
  const dataLoaiHinh = props?.route?.params?.dataLoaiHinh;

  const [loadingHocKi, setloadingHocKi] = useState(false);

  const [loading, setloading] = useState(false);

  const [listSanPhamNCKH, setlistSanPhamNCKH] = useState([]);

  const [dotId, setdotId] = useState('');

  const [listDataNamHoc, setlistDataNamHoc] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  useEffect(() => {
    getNamHoc();
  }, []);

  const getNamHoc = async () => {
    setloadingHocKi(true);

    const responseNamHoc: any = await getDanhSachNamHoc();

    setloadingHocKi(false);

    const dataMap =
      responseNamHoc?.data?.data?.map((item: NamHocProps) => {
        return { label: item?.tenNamHoc || '', value: item?._id };
      }) ?? [];

    setdotId(dataMap?.[0]?.value);

    setlistDataNamHoc(dataMap);
  };

  useEffect(() => {
    if (dotId) {
      getDetail();
    }
  }, [dotId]);

  const getDetail = async () => {
    setloading(true);

    const body = {
      page: 1,
      limit: 10,
      condition: {
        loaiHinhNckhId: dataLoaiHinh?._id,
        ...(dotId && { dotId }),
      },
    };

    const responselistSP: any = await getSanPhamNCKH(body);

    setloading(false);

    setlistSanPhamNCKH(responselistSP?.data?.data?.result ?? []);
  };

  const navigateViewRender = () => {
    navigateScreen(APP_SCREEN.VIEWRENDERNCKH, {
      dataLoaiHinh,
      dotId,
      onRefresh: () => getDetail(),
    });
  };

  const onChange = (value: string) => {
    setdotId(value);
  };

  if (loadingHocKi) {
    return (
      <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
        <HeaderReal
          childrenRight={<ChildrenRight onPress={navigateViewRender} />}
          title={
            dataLoaiHinh?.ten ||
            translate('slink:Scientific_and_technological_results')
          }
        />
        <Box flex={1}>
          <LoadingComponent />
        </Box>
      </Box>
    );
  }

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        childrenRight={<ChildrenRight onPress={navigateViewRender} />}
        title={
          dataLoaiHinh?.ten ||
          translate('slink:Scientific_and_technological_results')
        }
      />
      <Box
        flex={1}
        paddingTop={HEIGHT(24)}
        width={WIDTH(343)}
        alignSelf="center">
        <ViewFilterNB data={listDataNamHoc} onChange={onChange} />
        <FlatList
          data={listSanPhamNCKH}
          extraData={listSanPhamNCKH}
          refreshing={loading}
          onRefresh={getDetail}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: HEIGHT(30) }}
          ListEmptyComponent={<ItemTrong />}
          renderItem={({ item, index }) => {
            return (
              <ItemKhaiBao
                dotId={dotId}
                onRefresh={getDetail}
                dataLoaiHinh={dataLoaiHinh}
                key={index}
                data={item}
              />
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default DanhSachKhaiBaoNCKH;
const ChildrenRight = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable
      _pressed={R.themes.pressed}
      hitSlop={R.themes.hitSlop}
      onPress={onPress}>
      <Icon name="plus" size={WIDTH(24)} color={'white'} />
    </Pressable>
  );
};
