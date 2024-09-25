import React, { useEffect } from 'react';
import { View } from 'react-native';

import { useSelector } from 'react-redux';

import {
  DEFAULT_MOST_USED_FUNCTION_LIST_NV,
  DEFAULT_MOST_USED_FUNCTION_LIST_SV,
} from '@config/module';
import HeaderReal from '@libcomponents/header-real';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import { MixPanelEvent, trackEvent } from '@utils/Mixpanel';

import styles from './styles';

import FlatlistItem from '../Item/FlatListItem';

const listFunctionGV = [
  { title: translate('slink:Personnel_organization') },
  {
    title: translate('slink:Lop_hanh_chinh'),
  },
  {
    title: translate('slink:Lop_tin_chi'),
  },
  {
    title: translate('slink:Calendar'),
  },
  { title: translate('slink:Academy_weekly_calender') },
  {
    title: translate('slink:Scientific_and_technological_results'),
  },
  {
    title: translate('slink:Activity_plan'),
  },
  // {
  //   title: translate('slink:Attendance_sheet'),
  // },
  {
    title: translate('slink:Asset_inventory'),
  },
  {
    title: translate('slink:Job'),
  },
];

const listFunctionSV = [
  {
    title: translate('slink:Lop_tin_chi'),
  },
  {
    title: translate('slink:Lop_hanh_chinh'),
  },
  {
    title: translate('slink:Graduation'),
  },
  {
    title: translate('slink:Grade'),
  },
  {
    title: translate('slink:Learning_process'),
  },
  {
    title: translate('slink:TimeTable'),
  },
  {
    title: translate('slink:Lich_thi'),
  },
  {
    title: translate('slink:Course_registration_results'),
  },
  {
    title: translate('slink:Smart_computer'),
  },
  {
    title: translate('slink:Course_registration'),
  },
];

const GocHocTap = () => {
  const { account } = useSelector(selectAppConfig);

  useEffect(() => {
    trackEvent(MixPanelEvent.BUTTON_GOC_HOC_TAP);
  }, []);

  const title = account?.isGiaoVien
    ? translate('slink:Job')
    : translate('slink:Study_space');

  const listFunc = account?.isGiaoVien ? listFunctionGV : listFunctionSV;

  const source: string[] = account?.isGiaoVien
    ? DEFAULT_MOST_USED_FUNCTION_LIST_NV
    : DEFAULT_MOST_USED_FUNCTION_LIST_SV;

  const listFuncFinal = listFunc?.filter(item => source?.includes(item?.title));

  return (
    <View style={styles.container}>
      <HeaderReal hideBack title={title} />
      <FlatlistItem data={listFuncFinal} />
    </View>
  );
};

export default GocHocTap;
