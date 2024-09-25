import React, { useEffect } from 'react';
import { View } from 'react-native';

import { useSelector } from 'react-redux';

import {
  DEFAULT_MOST_USED_FUNCTION_LIST_NV,
  DEFAULT_MOST_USED_FUNCTION_LIST_SV,
} from '@config/module';
import { SUB_NAME_UPPERCASE } from '@env';
import HeaderReal from '@libcomponents/header-real';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import { MixPanelEvent, trackEvent } from '@utils/Mixpanel';

import styles from './styles';

import FlatlistItem from '../Item/FlatListItem';

const listFunctionGV = [
  { title: translate('slink:News') },
  { title: translate('slink:Administrative_service') },
  { title: translate('slink:Online_survey') },
  { title: translate('slink:Su_kien') },
  { title: translate('slink:Infrastructure') },
  {
    title: translate('slink:BirthDayCal'),
  },
  { title: translate('slink:Frequently_asked_questions') },
  { title: translate('slink:Guidelines_doc') },
  {
    title: translate('slink:Introduce_about', {
      name: SUB_NAME_UPPERCASE,
    }),
  },
];

const listFunctionSV = [
  { title: translate('slink:News') },
  { title: translate('slink:Administrative_service') },
  { title: translate('slink:Online_survey') },
  { title: translate('slink:Su_kien') },
  { title: translate('slink:Diem_ren_luyen') },
  { title: translate('slink:Feedback') },
  { title: translate('slink:Debt') },
  { title: translate('slink:Dormitory') },
  { title: translate('slink:Frequently_asked_questions') },
  { title: translate('slink:Guidelines_doc') },
  {
    title: translate('slink:Introduce_about', {
      name: SUB_NAME_UPPERCASE,
    }),
  },
];

const TabTienIch = () => {
  const { account } = useSelector(selectAppConfig);

  useEffect(() => {
    trackEvent(MixPanelEvent.BUTTON_TIEN_ICH);
  }, []);

  const listFunc = account?.isGiaoVien ? listFunctionGV : listFunctionSV;

  const source: string[] = account?.isGiaoVien
    ? DEFAULT_MOST_USED_FUNCTION_LIST_NV
    : DEFAULT_MOST_USED_FUNCTION_LIST_SV;

  const listFuncFinal = listFunc?.filter(item => source?.includes(item?.title));

  return (
    <View style={styles.container}>
      <HeaderReal hideBack title={translate('slink:Utilities')} />
      <FlatlistItem data={listFuncFinal} />
    </View>
  );
};

export default TabTienIch;
