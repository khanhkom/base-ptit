import React from 'react';
import { Text, View } from 'react-native';

import RenderHTML from 'react-native-render-html';

import { decodeHTMLEntities, htmlProps, WIDTH } from '@common';
import HeaderDetail from '@components/HeaderDetail';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

import styles from './styles';
import { ItemTrongProps } from './type';

const RenderHTMLCustome = (props: ItemTrongProps) => {
  const { title, time, content, nguoiGui } = props;

  const source = { html: content?.trim() || translate('slink:Chua_cap_nhat') };

  return (
    <>
      <HeaderDetail
        title={decodeHTMLEntities(title || translate('slink:Chua_cap_nhat'))}
        subTitle={
          time
            ? moment(time).format('HH:mm DD/MM/YYYY')
            : translate('slink:Chua_cap_nhat')
        }
      />
      <View style={styles.viewHTML}>
        <RenderHTML
          {...htmlProps}
          renderersProps={{
            iframe: {
              scalesPageToFit: true,
              webViewProps: {
                /* Any prop you want to pass to iframe WebViews */
              },
            },
          }}
          contentWidth={WIDTH(343)}
          source={source}
        />
        {nguoiGui && (
          <Text style={styles.nguoiGui}>{`Người gửi: ${
            nguoiGui || translate('slink:Chua_cap_nhat')
          }`}</Text>
        )}
      </View>
    </>
  );
};

export default RenderHTMLCustome;
