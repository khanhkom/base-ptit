/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ScrollView, View } from 'react-native';

import RenderHTMLCustome from '@components/Item/RenderHTML';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';

import styles from './styles';

const DetailNoti = (props: any) => {
  const item = props?.route?.params?.item;
  console.log('===>item', item);
  return (
    <View style={styles.container}>
      <HeaderReal title={translate('slink:Detail_t')} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.content}>
        <RenderHTMLCustome
          content={item?.htmlContent}
          title={item?.title}
          time={item?.createdAt}
          nguoiGui={item?.senderName}
        />
      </ScrollView>
    </View>
  );
};

export default DetailNoti;
