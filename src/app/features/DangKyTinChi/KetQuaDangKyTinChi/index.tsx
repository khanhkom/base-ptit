/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import HeaderReal from '@libcomponents/header-real';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getDSMonHocByHK } from '@networking/user/DangKyTinChi';
import { translate } from '@utils/i18n/translate';
import { Box, FlatList, Pressable, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemMonHoc from './component/ItemMonHoc';
import { LopHPSvList } from './type';
import SelectHocKy from '@components/SelectHocKy';

const DangKyTinChi = () => {
  const [maKyHoc, setmaKyHoc] = useState<string>('');
  const [loading, setloading] = useState(false);
  const [listMonHoc, setlistMonHoc] = useState<LopHPSvList[]>([]);
  const getTinChiValidate = async (maKy: string) => {
    try {
      setloading(true);
      const responseDSMonHoc: any = await getDSMonHocByHK(maKy);
      const phieuDangKy = responseDSMonHoc?.data?.data;
      setlistMonHoc(phieuDangKy ?? []);
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const onChange = (value: string) => {
    getTinChiValidate(value);
    setmaKyHoc(value);
  };

  const navigateCalendar = () => {
    navigateScreen(APP_SCREEN.LICHHOCTINCHI, { listMonHoc });
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title={translate('slink:Course_registration_results')}
        childrenRight={<RightChildren onPress={navigateCalendar} />}
      />
      <Box flex={1} paddingTop={HEIGHT(24)}>
        <SelectHocKy onChange={onChange} />
        <FlatList
          data={listMonHoc}
          extraData={listMonHoc}
          refreshing={loading}
          onRefresh={() => getTinChiValidate(maKyHoc)}
          contentContainerStyle={{ paddingBottom: HEIGHT(30) }}
          ListEmptyComponent={<ItemTrong />}
          renderItem={({ item, index }) => {
            return <ItemMonHoc key={index} data={item} />;
          }}
        />
      </Box>
    </Box>
  );
};

export default DangKyTinChi;
const RightChildren = ({ onPress }: { onPress: () => void }) => {
  const theme = useTheme();

  return (
    <Pressable onPress={onPress} _pressed={R.themes.pressed}>
      <Icon name={'calendar'} size={WIDTH(20)} color={theme.colors.white} />
    </Pressable>
  );
};
