/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import R from '@assets/R';
import {
  ETrangThaiDanhGia,
  HEIGHT,
  MapKeyColorTrangThaiDanhGiaDonVi,
  MapKeyTextTrangThaiDanhGia,
  WIDTH,
} from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import SkeletonTable from '@components/HoSoNhanSu/SkeletonTable';
import MenuComponent from '@components/MenuNativeBase/MenuComponent';
import { SearchItem } from '@components/SearchAction/snack-bar-item';
import ViewFilterNB from '@components/ViewFilterNB';
import HeaderReal from '@libcomponents/header-real';
import ItemInfor from '@libcomponents/ItemTable';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  getDetailBieuMau,
  getManyDotDanhGia,
  getNhanSuKS,
} from '@networking/user/DanhGiaNhanSu';
import { translate } from '@utils/i18n/translate';
import { Badge, Box, HStack } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import { DotDanhGiaProps, NhanSuProps } from './type';

const DanhGiaDonVi = () => {
  const [dsDotDG, setdsDotDG] = useState<DotDanhGiaProps[]>([]);

  const [idDotCurrent, setidDotCurrent] = useState('');

  const [dsNhanSu, setdsNhanSu] = useState<NhanSuProps[]>([]);

  const [dsFilter, setDsFilter] = useState<NhanSuProps[]>([]);

  const [loading, setloading] = useState(true);

  const [keySearch, setkeySearch] = useState('');

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getInitAPI();
  }, []);

  const onChangeValueSearch = async (value: string) => {
    setkeySearch(value);

    if (value?.trim() === '') {
      setDsFilter(dsNhanSu);
    } else {
      const listFilterNhanSu = dsNhanSu?.filter(item =>
        item?.hoTen
          ?.trim()
          ?.toLowerCase()
          ?.includes(value?.trim()?.toLowerCase()),
      );

      setDsFilter(listFilterNhanSu);
    }
  };

  const getInitAPI = async () => {
    const responseDot: any = await getManyDotDanhGia();

    const listDot = responseDot?.data?.data || [];

    await getDSNhanSu(listDot?.[0]?._id);

    setidDotCurrent(listDot?.[0]?._id);

    setdsDotDG(listDot);

    listDot?.length === 0 && setloading(false);
  };

  const getDSNhanSu = async (id: string) => {
    const responseNS: any = await getNhanSuKS(id);

    setdsNhanSu(responseNS?.data?.data || []);

    setDsFilter(responseNS?.data?.data || []);

    setloading(false);
  };

  const onChangeDot = (idDot: string) => {
    getDSNhanSu(idDot);

    setidDotCurrent(idDot);
  };

  const tableHead = [
    translate('slink:No'),
    translate('slink:Fullname'),
    translate('slink:Status'),
  ];

  const widthArr = [WIDTH(60), WIDTH(130), WIDTH(185)];

  const tableData =
    dsFilter?.map((nhanSu, ind) => {
      const khongTheSuaDanhGia =
        nhanSu.trangThai !== ETrangThaiDanhGia.CHUA_DK_DG &&
        nhanSu.trangThai !== ETrangThaiDanhGia.CHUA_DANH_GIA &&
        nhanSu.trangThai !== ETrangThaiDanhGia.DA_DANH_GIA_CHUA_GUI;

      const disabled = nhanSu.trangThai === ETrangThaiDanhGia.CHUA_DANH_GIA;

      const onPress = () => onNavigate(nhanSu?.ssoId, khongTheSuaDanhGia);

      const dataRow = [
        <ItemInfor
          disabled={disabled}
          onPress={onPress}
          content={ind + 1 ?? '--'}
          key={ind}
        />,
        <ItemInfor
          disabled={disabled}
          onPress={onPress}
          content={nhanSu?.hoTen ?? '--'}
          key={ind}
        />,
        <Badge
          // mt={HEIGHT(20)}
          colorScheme={MapKeyColorTrangThaiDanhGiaDonVi?.[nhanSu?.trangThai]}>
          {MapKeyTextTrangThaiDanhGia?.[nhanSu?.trangThai]}
        </Badge>,
      ];

      return dataRow;
    }) ?? [];

  const onNavigate = async (ssoId: string, isDisabled: boolean) => {
    const responseData: any = await getDetailBieuMau(ssoId, idDotCurrent);

    const objDotCurrent = dsDotDG?.find(item => item?._id === idDotCurrent);

    navigateScreen(APP_SCREEN.DETAILDANHGIACANHAN, {
      dataDonVi: responseData?.data?.data,
      data: objDotCurrent,
      isDisabled,
      donVi: true,
      onRefresh: () => getDSNhanSu(idDotCurrent),
      thongTinNhanSu: responseData?.data?.data?.thongTinNhanSu,
    });
  };

  const onSeenReport = () => {
    navigateScreen(APP_SCREEN.PHIEUTONGHOPKETQUA, {
      dsNhanSu,
      idDot: idDotCurrent,
      onRefresh: () => getDSNhanSu(idDotCurrent),
    });
  };

  if (loading) {
    return (
      <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
        <HeaderReal
          title={translate('slink:Unit_review')}
          childrenRight={
            <RightComponent onSend={onSeenReport} setVisible={setVisible} />
          }
        />
        <Box flex={1} paddingTop={HEIGHT(24)}>
          <ViewFilterNB
            width={WIDTH(343)}
            alignSelf="center"
            data={dsDotDG?.map(item => {
              return { label: item?.tenDot, value: item?._id };
            })}
            onChange={onChangeDot}
          />
          <SkeletonTable />
        </Box>
      </Box>
    );
  }

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title={'Đánh giá đơn vị'}
        childrenRight={
          <RightComponent onSend={onSeenReport} setVisible={setVisible} />
        }
      />
      <Box flex={1} paddingTop={HEIGHT(24)}>
        <ViewFilterNB
          width={WIDTH(343)}
          alignSelf="center"
          data={dsDotDG?.map(item => {
            return { label: item?.tenDot, value: item?._id };
          })}
          onChange={onChangeDot}
        />
        <BaseTableComponent
          tableHead={tableHead}
          widthArr={widthArr}
          tableData={tableData}
          contentContainerStyle={styles.content}
        />
      </Box>
      <SearchItem
        defaultValue={keySearch}
        placeholder={translate('slink:Search')}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);

          onChangeValueSearch('');
        }}
        onChangeValue={onChangeValueSearch}
      />
    </Box>
  );
};

export default DanhGiaDonVi;

const styles = StyleSheet.create({
  content: { paddingBottom: HEIGHT(20) },
});

interface RightComponentProps {
  onSend?: () => void;
  setVisible: (val: boolean) => void;
}
const RightComponent = (props: RightComponentProps) => {
  const { onSend, setVisible } = props;

  const listFunction = [{ title: 'Xem phiếu tổng hợp', onPress: onSend }];

  return (
    <HStack alignItems={'center'}>
      <Box mr={'1'}>
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}>
          <Icon name="search" size={WIDTH(18)} color={'white'} />
        </TouchableOpacity>
      </Box>
      <MenuComponent listFunction={listFunction} />
    </HStack>
  );
};
