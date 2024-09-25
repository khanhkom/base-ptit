/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { View } from 'react-native';

import RenderHTML, { defaultSystemFonts } from 'react-native-render-html';
import WebView from 'react-native-webview';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';
import { Divider } from '@libcomponents/divider';
import table from '@native-html/table-plugin';
import { Collapse, Pressable, ScrollView, Text, useTheme } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';
import { ItemTrongProps } from './type';

const ItemChucNangExpand = (props: ItemTrongProps) => {
  const { customStyle, content, value, html = true } = props;

  const [expand, setexpand] = useState(false);

  let source: any;
  if (html) {
    source = { html: value?.trim() ?? '' };
  }

  const theme = useTheme();

  const systemFonts = [...defaultSystemFonts, R.fonts.BeVietnamProRegular];

  return (
    <View style={styles.box}>
      <Pressable
        flexDirection="row"
        alignItems="center"
        py={HEIGHT(16)}
        onPress={() => {
          setexpand(!expand);
        }}
        style={customStyle}>
        <Text fontSize={'sm'} fontFamily={R.fonts.BeVietnamProMedium} flex={1}>
          {content}
        </Text>
        <Entypo
          color={theme.colors.gray[400]}
          size={WIDTH(24)}
          name={expand ? 'chevron-up' : 'chevron-down'}
        />
      </Pressable>
      <Collapse isOpen={expand}>
        {expand && <Divider />}
        <View style={styles.container}>
          {html ? (
            <ScrollView horizontal>
              <RenderHTML
                systemFonts={systemFonts}
                {...htmlConfig}
                contentWidth={WIDTH(343)}
                source={source}
              />
            </ScrollView>
          ) : typeof value === 'string' ? (
            <Text>{value}</Text>
          ) : (
            value
          )}
        </View>
      </Collapse>
    </View>
  );
};

export default ItemChucNangExpand;

const renderers = {
  table,
};

const htmlConfig = {
  renderers,
  WebView,
  renderersProps: {
    table: {
      animationType: 'animated',
      tableStyleSpecs: {
        outerBorderWidthPx: 0,
        rowsBorderWidthPx: 0,
        columnsBorderWidthPx: 0,
        trOddBackground: R.colors.white100,
        thOddColor: R.colors.white0,
      },
    },
    body: { fontSize: '2rem', textAlign: 'left' },
  },
  tagsStyles: {
    table: {
      width: WIDTH(343),
    },
    p: {
      fontFamily: R.fonts.BeVietnamProRegular,
      fontSize: getFontSize(14),
      lineHeight: getLineHeight(24),
      color: R.colors.grayText,
      width: WIDTH(270),
      // backgroundColor: 'red',
    },
  },
  defaultWebViewProps: {},
};
