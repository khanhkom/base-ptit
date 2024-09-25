/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';

import { useSelector } from 'react-redux';

import R from '@assets/R';
import ViewSwiperTinTuc from '@components/ViewGroup/ViewSwiperTinTuc';
import { DEFAULT_MOST_USED_FUNCTION_LIST_SV } from '@config/module';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import { KEY_STORAGE, load, save } from '@utils/storage';
import moment from 'moment';
import { ScrollView } from 'native-base';

import ChucNangPB from './component/ChucNangPB';
import CongNoTabMain from './component/CongNo';
import HeaderHome from './component/HeaderHome';
import LichV2 from './component/LichV2';
import ModalBirthday from './component/ModalBirthday';
import ThongKe from './component/ThongKe';
import TimKiem from './component/TimKiem';
import styles from './styles';

const TrangChu = (props: any) => {
  const {
    dataTinTuc,
    onChangeIndex,
    onRefreshCongNo,
    loading,
    listInvoice,
    onScroll,
  } = props;

  const { account } = useSelector(selectAppConfig);

  const [modalVisible, setmodalVisible] = useState(false);

  const isBirthDay = account?.ngaySinh
    ? moment(account?.ngaySinh).format('DD/MM') === moment().format('DD/MM')
    : false;

  useEffect(() => {
    !loading && isBirthDay && initBirthday();
  }, [loading]);

  const initBirthday = () => {
    const year = load(KEY_STORAGE.BIRTH_DAY);

    const currentYear = new Date().getFullYear();

    if (year?.includes(currentYear)) {
    } else {
      setTimeout(() => {
        setmodalVisible(true);
      }, 500);

      const listYearNew = [...(year || []), currentYear];

      save(KEY_STORAGE.BIRTH_DAY, listYearNew);
    }
  };

  const visibleCongNo =
    !account?.isGiaoVien &&
    DEFAULT_MOST_USED_FUNCTION_LIST_SV?.includes(translate('slink:Debt')) &&
    listInvoice?.length > 0;

  return (
    <ScrollView
      backgroundColor={R.colors.backgroundColorNew}
      onScroll={onScroll}
      bounces={false}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}>
      <ModalBirthday
        onClose={() => setmodalVisible(false)}
        account={account}
        modalVisible={modalVisible}
      />
      <HeaderHome loading={loading} account={account} />
      <TimKiem account={account} />
      {/* {account?.isGiaoVien && <LichSinhNhat />} */}
      {visibleCongNo && (
        <CongNoTabMain
          listInvoice={listInvoice}
          onRefreshCongNo={onRefreshCongNo}
        />
      )}
      <LichV2 />
      <ChucNangPB onChangeIndex={onChangeIndex} />
      <ViewSwiperTinTuc loading={loading} data={dataTinTuc} />
      {/* {account?.isGiaoVien && <DashBardHome />} */}
      {account?.isGiaoVien && <ThongKe />}
    </ScrollView>
  );
};

export default TrangChu;
