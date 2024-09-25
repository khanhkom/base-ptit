/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import RenderHTML, { defaultSystemFonts } from 'react-native-render-html';
import WebView from 'react-native-webview';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';
import { LightBox } from '@libcomponents/light-box';
import table from '@native-html/table-plugin';
import { translate } from '@utils/i18n/translate';
import { isString } from 'lodash';
import { Input, Skeleton } from 'native-base';

import styles from './styles';
import { ItemProps } from './type';

const ItemLabelCustom = (props: ItemProps) => {
  const {
    nullItem,
    style,
    label,
    value,
    isLast,
    textLabel,
    image,
    numberOfLines = 1,
    multiLine = false,
    typeHTML,
    loading,
    badge = false,
    onChangeText,
  } = props;

  useEffect(() => {
    onChangeText && onChangeText(Number(value) ? value : '0');
  }, [value]);

  const borderBottomWidth = isLast ? 0 : 0.5;

  const paddingBottom = image ? HEIGHT(8) : HEIGHT(16);

  const html = `${value ?? translate('slink:Chua_cap_nhat')}`;

  if (nullItem) {
    return <></>;
  }

  if (loading) {
    return (
      <View style={[styles.containerCover, { borderBottomWidth }]}>
        <View style={[styles.container]}>
          <Skeleton.Text lines={1} w="30%" />
          <Skeleton.Text lines={1} w="50%" />
        </View>
      </View>
    );
  }

  const systemFonts = [...defaultSystemFonts, R.fonts.BeVietnamProRegular];

  return (
    <View style={[styles.containerCover, { borderBottomWidth }]}>
      <View
        style={[
          styles.container,
          (typeHTML || multiLine) && {
            flexDirection: 'column',
            alignItems: 'flex-start',
          },
          { paddingBottom },
          style,
        ]}>
        <Text
          numberOfLines={numberOfLines}
          style={[
            styles.textLabel,
            (typeHTML || multiLine) && { marginBottom: HEIGHT(12) },
            textLabel,
          ]}>
          {label}
        </Text>
        <View
          style={[
            styles.viewValue,
            !(typeHTML || multiLine) && { marginLeft: WIDTH(16) },
          ]}>
          {typeHTML && isHTML(value) ? (
            <RenderHTML
              baseStyle={{
                textAlign: 'left',
                maxWidth: WIDTH(300),
                fontFamily: R.fonts.BeVietnamProRegular,
                fontSize: getFontSize(16),
                color: R.colors.grayText,
                // maxHeight: HEIGHT(100),
              }}
              // defaultTextProps={{ selectable: true }}// Để hiển thị tooltip
              systemFonts={systemFonts}
              {...htmlConfig}
              renderersProps={{
                // a: { onPress: () => {} },
                ...htmlConfig.renderersProps,
              }}
              debug={false}
              contentWidth={WIDTH(343)}
              source={{ html }}
            />
          ) : (
            <>
              {badge ? (
                value
              ) : (
                <Input
                  onChangeText={onChangeText}
                  maxW={WIDTH(60)}
                  variant="outline"
                  textAlign={'center'}
                  textAlignVertical="center"
                  keyboardType="numeric"
                  style={styles.textValue}
                  defaultValue={isString(value) ? value : '0'}
                />
              )}
            </>
          )}
        </View>
      </View>
      {image && (
        <View style={styles.img}>
          <LightBox source={image} />
        </View>
      )}
    </View>
  );
};

export default ItemLabelCustom;

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
    },
  },
  defaultWebViewProps: {},
};

function isHTML(str) {
  const htmlRegex = /<[^>]*>/;

  return htmlRegex.test(str);
}
