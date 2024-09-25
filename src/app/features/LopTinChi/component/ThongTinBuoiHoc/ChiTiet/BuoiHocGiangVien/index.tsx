import React, { useEffect, useState } from 'react';

import R from '@assets/R';
import {
  deepCloneObject,
  ETrangThaiGiangDay,
  removeAccents,
  showToastWarn,
  WIDTH,
} from '@common';
import MenuComponent from '@components/MenuNativeBase/MenuComponent';
import { SearchItem } from '@components/SearchAction/snack-bar-item';
import HeaderReal from '@libcomponents/header-real';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getChiTietDSDiemDanh } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { Box, HStack, Pressable } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import DiemDanh from '../component/DiemDanh';
import { SinhVienDiemDanhProps } from '../component/DiemDanh/type';

const BuoiHocGiangVien = props => {
  const [loading, setloading] = useState(false);

  const title = props?.route?.params?.title;

  const funGoBack = props?.route?.params?.funGoBack;

  const [listResult, setlistResult] = useState<SinhVienDiemDanhProps[]>([]);

  const [dataBuoiHoc, setdataBuoiHoc] = useState(
    props?.route?.params?.infoCard,
  );

  const [chuaKhoiTao, setchuaKhoiTao] = useState(
    props?.route?.params?.infoCard?.trangThaiGiangDay ===
      ETrangThaiGiangDay.CHUA_BAT_DAU,
  );

  const [keySearch, setkeySearch] = useState('');

  const [listSearch, setlistSearch] = useState<SinhVienDiemDanhProps[]>([]);

  const [visibleSearch, setvisibleSearch] = useState(false);

  const id = dataBuoiHoc?._id;

  useEffect(() => {
    getData();
  }, []);

  const getData = async (isNotLoading = false) => {
    !isNotLoading && setloading(true);

    try {
      const res: SinhVienDiemDanhProps[] = await getChiTietDSDiemDanh(id);

      const sortList = res?.sort((a, b) => {
        if (a?.hoTenUser === b?.hoTenUser) {
          return a?.maUser < b?.maUser ? 1 : -1;
        } else {
          return 0;
        }
      });

      const allStudents = deepCloneObject(sortList ?? []);

      setlistResult(allStudents);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const isDisabled = new Date(dataBuoiHoc?.thoiGianBatDau) < new Date();

  const navigateDangKy = () => {
    if (isDisabled) {
      showToastWarn(translate('slink:Khong_the_dang_ky_day_bu'));
    } else {
      navigateScreen(APP_SCREEN.DANGKYDAYBU, {
        dataBuoiHoc,
        title,
      });
    }
  };

  const navigateContent = () => {
    navigateScreen(APP_SCREEN.NOIDUNGBUOIHOC, {
      dataBuoiHoc,
      title,
      funGoBack,
      onEdit,
    });
  };

  const onEdit = (data: {
    urlBaiHoc: string;
    noiDungBaiHoc: string;
    tieuDeBaiHoc: string;
  }) => {
    setdataBuoiHoc({ ...dataBuoiHoc, ...data });
  };

  const onSearch = (value: string) => {
    setkeySearch(value);

    if (value !== '') {
      const listFilter =
        listResult?.filter(item =>
          removeAccents(item?.hoTenUser?.trim()?.toLowerCase())?.includes(
            value?.trim()?.toLowerCase(),
          ),
        ) ?? [];

      setlistSearch(listFilter);
    } else {
      setlistSearch([]);
    }
  };

  const listHSResult =
    listSearch?.length === 0 && keySearch === '' ? listResult : listSearch;

  const onRefreshKhoiTao = (val: boolean) => {
    setchuaKhoiTao(val);
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title={translate('slink:Detail_t')}
        childrenRight={
          <RightComponent
            goToRegister={navigateDangKy}
            goToContent={navigateContent}
            onPress={() => setvisibleSearch(true)}
          />
        }
      />
      <DiemDanh
        title={title}
        loading={loading}
        id={id}
        funGoBack={funGoBack}
        onRefreshKhoiTao={onRefreshKhoiTao}
        chuaKhoiTao={chuaKhoiTao}
        onRefresh={getData}
        listResult={listHSResult}
        dataBuoiHoc={dataBuoiHoc}
      />
      <SearchItem
        defaultValue={keySearch}
        placeholder={translate('slink:Enter_student_name')}
        visible={visibleSearch}
        onClose={() => {
          setvisibleSearch(false);
        }}
        onCancel={() => {
          setvisibleSearch(false);

          onSearch('');
        }}
        onChangeValue={onSearch}
      />
    </Box>
  );
};

export default BuoiHocGiangVien;

interface RightChildProps {
  goToRegister: () => void;
  goToContent: () => void;
  onPress: () => void;
}
const RightComponent = (props: RightChildProps) => {
  const { goToRegister, goToContent, onPress } = props;

  const listFunction = [
    { title: translate('slink:Dang_ky_day_bu'), onPress: goToRegister },
    { title: translate('slink:Noi_dung_chuan_bi'), onPress: goToContent },
  ];

  return (
    <HStack alignItems={'center'}>
      <Pressable mr="1" _pressed={R.themes.pressed} onPress={onPress}>
        <Icon name="search" size={WIDTH(24)} color={'white'} />
      </Pressable>
      <MenuComponent listFunction={listFunction} />
    </HStack>
  );
};
