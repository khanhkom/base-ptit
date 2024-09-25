/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

import RenderHTML, { defaultSystemFonts } from 'react-native-render-html';
import WebView from 'react-native-webview';

import R from '@assets/R';
import {
  EKieuDuLieu,
  getFontSize,
  getLineHeight,
  MapModeTime,
  showLink,
  WIDTH,
} from '@common';
import table from '@native-html/table-plugin';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Box, Pressable, Text } from 'native-base';

import styles from './styles';

const ItemTableQTD = ({
  info,
  onPress,
}: {
  info: any;
  onPress?: () => void;
}) => {
  const handleSeeDocument = (link?: string) => {
    if (link) {
      showLink(link);
    } else {
      onPress && onPress();
    }
  };

  return (
    <Box style={[styles.containerInfo]}>
      <ViewContent
        kieuDuLieu={info?.kieuDuLieu}
        dangMang={info?.laDangMang}
        content={info?.value}
        onPress={handleSeeDocument}
        isHtml={info?.textDisplay === 'TEXT_EDITOR'}
      />
    </Box>
  );
};

export default ItemTableQTD;

export const ViewContent = ({
  kieuDuLieu,
  dangMang,
  content,
  onPress,
  isHtml,
}: {
  kieuDuLieu: EKieuDuLieu;
  content: any;
  dangMang: boolean;
  onPress: (e?: string) => void;
  isHtml?: boolean;
}) => {
  switch (kieuDuLieu) {
    case EKieuDuLieu.CAN_BO:
    case EKieuDuLieu.TEXT:
    case EKieuDuLieu.NUMBER:
    case EKieuDuLieu.DECIMAL:
      if (isHtml) {
        const html = `${content ?? translate('slink:Chua_cap_nhat')}`;

        const systemFonts = [
          ...defaultSystemFonts,
          R.fonts.BeVietnamProRegular,
        ];

        return (
          <Pressable onPress={() => onPress()}>
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
          </Pressable>
        );
      }

      return (
        <Text onPress={() => onPress()} style={[styles.textDiem]}>
          {content}
        </Text>
      );
    case EKieuDuLieu.BOOLEAN:
      return (
        <Text onPress={() => onPress()} style={[styles.textDiem]}>
          {content ? 'Có' : 'Không'}
        </Text>
      );
    case EKieuDuLieu.DATE:
    case EKieuDuLieu.HOUR:
    case EKieuDuLieu.MONTH:
      return (
        <Text onPress={() => onPress()} style={[styles.textDiem]}>
          {content ? moment(content)?.format(MapModeTime(kieuDuLieu)) : ''}
        </Text>
      );
    case EKieuDuLieu.FILE:
      return content?.length > 0 ? (
        <Box flexDirection={'column'}>
          {content?.map((item: string, index: number) => {
            return (
              <Text
                onPress={() => onPress(item)}
                style={[styles.textDiem, styles.textLink]}>
                {`${translate('slink:See_details')}${
                  content?.length === 1 ? '' : ` ${index}`
                }`}
              </Text>
            );
          })}
        </Box>
      ) : null;
    case EKieuDuLieu.DANHMUC:
      return (
        <Pressable _pressed={R.themes.pressed} onPress={() => onPress()}>
          {dangMang ? (
            <Text style={[styles.textDiem, { textAlign: 'left' }]}>
              {content?.join(', ')}
            </Text>
          ) : (
            <Text style={[styles.textDiem]}>{content}</Text>
          )}
        </Pressable>
      );

    default:
      return null;
  }
};

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
      // textAlign: 'center',
      fontSize: getFontSize(12),
      lineHeight: getLineHeight(18),
      fontFamily: R.fonts.BeVietnamProMedium,
      color: R.colors.black0,
    },
  },
  defaultWebViewProps: {},
};
