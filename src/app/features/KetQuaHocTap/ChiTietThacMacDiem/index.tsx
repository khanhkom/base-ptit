/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FlatList, Text, View } from 'react-native';

import R from '@assets/R';
import {
  getFontSize,
  HEIGHT,
  REGEX_FILE_NAME_URL,
  showLink,
  WIDTH,
} from '@common';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

import styles from './styles';

const ChiTietThacMacDiem = (props: any) => {
  const chiTiet = props.route.params?.chiTiet;

  return (
    <View style={styles.container}>
      <HeaderReal title={translate('slink:Detail_t')} />
      <View style={styles.scrollView}>
        <TextView
          title={translate('slink:Question_detail')}
          content={chiTiet?.noiDung ?? ''}
          thoiGian={chiTiet?.createdAt}
        />
        <TepDinhKem data={chiTiet?.urlDinhKem} />
        {chiTiet?.daDuyet && (
          <TextView
            title={translate('slink:Answer')}
            minHeight={HEIGHT(0)}
            thoiGian={chiTiet?.thoiGianDuyet}
            content={chiTiet?.noiDungDuyet ?? ''}
          />
        )}
        {chiTiet?.hoTenNguoiDuyet && (
          <View style={{ paddingHorizontal: WIDTH(16), marginTop: HEIGHT(8) }}>
            <Text
              style={{
                textAlign: 'right',
                color: R.colors.textBule,
                fontFamily: R.fonts.BeVietnamProLightItalic,
                fontSize: getFontSize(12),
              }}>
              {translate('slink:Respondent', {
                user: chiTiet?.hoTenNguoiDuyet || '',
              })}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ChiTietThacMacDiem;
const TextView = ({ title, content, thoiGian, minHeight }: any) => {
  return (
    <View style={styles.ansContainer}>
      <Text
        style={[
          styles.textInfo,
          {
            textTransform: 'uppercase',
            fontFamily: R.fonts.BeVietnamProMedium,
          },
        ]}>
        {title}
      </Text>
      <View style={styles.ansTxtContainer}>
        <Text
          style={[
            styles.textInfo,
            {
              minHeight: minHeight ?? HEIGHT(162),
              marginBottom: HEIGHT(4),
              color: R.colors.black0,
            },
          ]}>
          {content}
        </Text>
        <Text style={[styles.textInfo, { alignSelf: 'flex-end' }]}>
          {moment(thoiGian).format('HH:mm DD/MM/YYYY')}
        </Text>
      </View>
    </View>
  );
};

const TepDinhKem = ({ data }: { data: any }) => {
  const handleSeeDocument = (item: string) => {
    showLink(item);
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        marginTop: HEIGHT(16),
        alignSelf: 'center',
        width: WIDTH(343),
        paddingHorizontal: WIDTH(16),
        paddingVertical: HEIGHT(16),
        backgroundColor: R.colors.white,
        borderRadius: WIDTH(8),
      }}>
      <View style={styles.uploadContainer}>
        <Text style={[styles.textInfo, { color: R.colors.black0 }]}>
          {translate('slink:Attachments')}
        </Text>
        {/* <Text style={styles.upload}>Tải lên</Text> */}
      </View>
      <FlatList
        data={data}
        style={{ marginTop: data?.length > 0 ? HEIGHT(8) : 0 }}
        renderItem={({ item, index }) => {
          const name = item?.replace(REGEX_FILE_NAME_URL, '') ?? '';

          return (
            <Text
              key={index}
              onPress={() => handleSeeDocument(item)}
              numberOfLines={1}
              style={{
                marginTop: HEIGHT(8),
                textDecorationLine: 'underline',
                color: R.colors.blueLight,
                fontFamily: R.fonts.BeVietnamProRegular,
                fontSize: getFontSize(14),
              }}>
              {name}
            </Text>
          );
        }}
      />
    </View>
  );
};
