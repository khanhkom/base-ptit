import React from 'react';
import { FlatList } from 'react-native';

import { useSelector } from 'react-redux';

import { TAB_MAIN } from '@common';
import {
  DEFAULT_MOST_USED_FUNCTION_LIST_NV,
  DEFAULT_MOST_USED_FUNCTION_LIST_SV,
} from '@config/module';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import { VStack } from 'native-base';

import ItemChucNangPB from './ItemChucNangPB';
import styles from './styles';

import ItemTextBlue from '../ItemTextBlue';

const listFunctionGV = [
  { title: translate('slink:Personnel_organization') },
  {
    title: translate('slink:Lop_tin_chi'),
    code: 'LOP_HOC_PHAN',
  },
  {
    title: translate('slink:Lop_hanh_chinh'),
    code: 'LOP_HANH_CHINH',
  },
  {
    title: translate('slink:Administrative_service'),
  },
  {
    title: translate('slink:Calendar'),
  },
  { title: translate('slink:Academy_weekly_calender') },
  { title: translate('slink:News') },
];

const listFunctionSV = [
  {
    title: translate('slink:Lop_tin_chi'),
  },
  {
    title: translate('slink:Lop_hanh_chinh'),
  },
  {
    title: translate('slink:Administrative_service'),
  },
  {
    title: translate('slink:Debt'),
  },
  {
    title: translate('slink:Grade'),
  },
  {
    title: translate('slink:Guidelines_doc'),
  },
  {
    title: translate('slink:Course_registration_results'),
  },
];

const ChucNangPB = (props: { onChangeIndex: (e: number) => void }) => {
  const { onChangeIndex } = props;

  const { account } = useSelector(selectAppConfig);

  const source: string[] = account?.isGiaoVien
    ? DEFAULT_MOST_USED_FUNCTION_LIST_NV
    : DEFAULT_MOST_USED_FUNCTION_LIST_SV;

  const listFunc = account?.isGiaoVien ? listFunctionGV : listFunctionSV;

  const listFuncFinal = listFunc
    ?.filter(item => source?.includes(item?.title))
    ?.filter((item, index) => index < 6);

  return (
    <VStack>
      <ItemTextBlue
        label={translate('slink:Func')}
        onPress={() => {
          onChangeIndex?.(TAB_MAIN.TIEN_ICH);
        }}
      />
      <FlatList
        data={listFuncFinal}
        extraData={listFuncFinal}
        scrollEnabled={false}
        style={styles.listDefault}
        numColumns={3}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item }) => (
          <ItemChucNangPB account={account} title={item?.title} />
        )}
      />
    </VStack>
  );
};

export default ChucNangPB;
