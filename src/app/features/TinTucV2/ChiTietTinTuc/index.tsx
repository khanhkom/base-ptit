/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import RenderHTMLCustome from '@components/Item/RenderHTML';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';
import { MixPanelEvent, trackEvent } from '@utils/Mixpanel';

import styles from './styles';

const ChiTietTinTucV2 = (props: any) => {
  const data = props.route.params?.content;

  useEffect(() => {
    trackEvent(MixPanelEvent.XEM_TIN_TUC);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <HeaderReal title={translate('slink:Detail_t')} />
      <ScrollView
        bounces={false}
        testID="ScrollViewDetailNews"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <RenderHTMLCustome
          content={data?.content?.rendered}
          title={data?.title?.rendered}
          time={data?.date}
          nguoiGui={data?.nguoiDang?.hoTen ?? ''}
        />
      </ScrollView>
    </View>
  );
};

export default ChiTietTinTucV2;
