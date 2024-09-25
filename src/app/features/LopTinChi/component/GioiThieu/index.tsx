import React from 'react';

import RenderHTML, {
  CustomBlockRenderer,
  TNodeChildrenRenderer,
} from 'react-native-render-html';

import R from '@assets/R';
import { HEIGHT, removeStyles, WIDTH } from '@common';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';
import { ScrollView, Text, VStack } from 'native-base';

const GioiThieuLopTinChi = props => {
  const infoClass = props?.route.params.infoClass;

  const renderHtmlProps = {
    source: { html: removeStyles(infoClass?.gioiThieuChung?.trim()) },
    renderers: {
      p: ParagraphRenderer,
    },
  };

  return (
    <VStack flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:General_information')} />
      <ScrollView
        flex={1}
        contentContainerStyle={{
          paddingTop: HEIGHT(24),
          paddingBottom: HEIGHT(30),
          paddingHorizontal: WIDTH(16),
        }}>
        <RenderHTML {...renderHtmlProps} />
      </ScrollView>
    </VStack>
  );
};

export default GioiThieuLopTinChi;

const ParagraphRenderer: CustomBlockRenderer = function ParagraphRenderer({
  TDefaultRenderer,
  tnode,
  type,
  ...props
}) {
  return (
    <TDefaultRenderer type={'block'} tnode={tnode} {...props}>
      <TNodeChildrenRenderer
        tnode={tnode}
        renderChild={({ childElement }) => {
          return type === 'block' ? (
            <Text numberOfLines={2}>{childElement}</Text>
          ) : (
            <Text numberOfLines={2}>{childElement}</Text>
          );
        }}
      />
    </TDefaultRenderer>
  );
};
