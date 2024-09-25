// @flow
import React, { useState } from 'react';

import { WebView } from 'react-native-webview';

// import R from '@assets/R';
import { PORTAL, SUB_NAME_UPPERCASE } from '@env';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';

import LoadingWithLogo from '@components/Loading/LoadingWithLogo';
import { Box } from 'native-base';

const GioiThieu = () => {
  const [loading, setloading] = useState(false);

  const source = { uri: PORTAL };

  return (
    <Box flex={1}>
      <HeaderReal
        title={translate('slink:Introduce_about', { name: SUB_NAME_UPPERCASE })}
      />
      <Box flex={1}>
        <WebView
          source={source}
          onLoad={() => setloading(false)}
          onLoadStart={() => setloading(true)}
        />
        <LoadingWithLogo loading={loading} />
      </Box>
    </Box>
  );
};

export default GioiThieu;
