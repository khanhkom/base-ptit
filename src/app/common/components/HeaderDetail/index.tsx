import React from 'react';

import { translate } from '@utils/i18n/translate';
import { Box, Divider, Text, VStack } from 'native-base';

import styles from './styles';
import R from '@assets/R';
export interface Props {
  title?: string;
  subTitle?: string;
  diff?: number;
  visible?: boolean;
  isTietHoc?: boolean;
}

const HeaderDetail = (props: Props) => {
  const { title, subTitle, visible = true, isTietHoc = false } = props;
  if (visible) {
    return (
      <Box style={styles.viewTitle}>
        <Text
          textAlign="center"
          fontFamily={R.fonts.BeVietnamProSemiBold}
          fontSize={'md'}
          color={'black'}>
          {title || translate('slink:Chua_cap_nhat')}
        </Text>
        {!isTietHoc && subTitle && (
          <VStack alignItems={'center'}>
            <Divider style={styles.line} />
            <Text style={styles.time}>
              {subTitle || translate('slink:Chua_cap_nhat')}
            </Text>
          </VStack>
        )}
      </Box>
    );
  }

  return null;
};

export default HeaderDetail;
