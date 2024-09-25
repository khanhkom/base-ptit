/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { View } from 'react-native';

import R from '@assets/R';
import {
  ELoaiPhanHoi,
  HEIGHT,
  popupOk,
  REGEX_FILE_NAME_URL,
  showLink,
  WIDTH,
} from '@common';
import HeaderReal from '@libcomponents/header-real';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

import styles from './styles';
import { ScrollView, Box, Text } from 'native-base';
import BoxHSNS from '@components/BoxHSNS';

const ThongTinPhanHoi = (props: any) => {
  const data = props?.route?.params?.item;
  const donKhac = data?.loaiPhanHoi === ELoaiPhanHoi.KHAC;
  const daTraLoi = data?.daTraLoiPhanHoi;

  const goToDetail = () => {
    if (data?.idDonDVMC) {
      navigateScreen(APP_SCREEN.CHITIETDONDV1C, {
        itemDon: data?.idDonDVMC,
      });
    } else {
      popupOk(translate('slink:Notice_t'), translate('slink:Doc_not_found'));
    }
  };

  return (
    <View style={styles.container} testID="TabDVu1Cua">
      <HeaderReal title={translate('slink:Info_feedback')} />
      <ScrollView contentContainerStyle={styles.content}>
        <TextView
          content={`${data?.noiDungPhanHoi?.trim() ?? ''}`}
          title={translate('slink:Question_val')?.toUpperCase()}
          thoiGian={data?.thoiGianHoi}
        />
        {!donKhac && (
          <Text
            onPress={goToDetail}
            color="rgba(129, 153, 215, 1)"
            fontFamily={R.fonts.BeVietnamProRegular}
            fontSize="md"
            textAlign="right"
            textDecorationLine="underline"
            marginTop={HEIGHT(8)}>
            {translate('slink:See_details')}
          </Text>
        )}
        {donKhac && !!data?.urlPhanAnh && <TepDinhKem url={data?.urlPhanAnh} />}
        {daTraLoi && (
          <TextView
            title={translate('slink:Answer').toUpperCase()}
            content={data?.noiDungTraLoiPhanHoi ?? ''}
            thoiGian={data?.thoiGianTraLoi}
          />
        )}
        {!!data?.tenChuyenVien && (
          <Text
            alignSelf="flex-end"
            marginTop={HEIGHT(8)}
            color={R.colors.textBule}
            fontFamily={R.fonts.BeVietnamProLightItalic}
            fontSize="xs">
            {translate('slink:Respondent', {
              user: data?.tenChuyenVien || '--',
            })}
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ThongTinPhanHoi;
const TepDinhKem = ({ url }: { url: string }) => {
  const name = url?.replace(REGEX_FILE_NAME_URL, '') ?? '';

  return (
    <Box
      justifyContent="space-between"
      backgroundColor={'white'}
      borderRadius={WIDTH(8)}
      px={WIDTH(16)}
      py={HEIGHT(16)}
      mb="4"
      style={R.themes.shadowOffset}>
      <Text
        fontSize={'sm'}
        color="black"
        fontFamily={R.fonts.BeVietnamProRegular}>
        {translate('slink:Attachments')}
      </Text>
      <Text
        onPress={() => showLink(url)}
        numberOfLines={1}
        marginTop={HEIGHT(8)}
        textDecorationLine="underline"
        color={R.colors.blueLight}
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize={'xs'}>
        {name}
      </Text>
    </Box>
  );
};
interface TextViewProps {
  title: string;
  content: string;
  thoiGian: string;
}
const TextView = (props: TextViewProps) => {
  const { title, content, thoiGian } = props;
  return (
    <BoxHSNS title={title} visibleAdd={false}>
      <Box
        justifyContent="space-between"
        backgroundColor={'white'}
        borderRadius={WIDTH(8)}
        minHeight={HEIGHT(100)}
        px={WIDTH(16)}
        py={HEIGHT(16)}
        style={R.themes.shadowOffset}>
        <Text
          fontSize={'sm'}
          color="black"
          fontFamily={R.fonts.BeVietnamProRegular}>
          {content}
        </Text>
        {!!thoiGian && (
          <Text
            fontSize={'xs'}
            color="gray.500"
            fontFamily={R.fonts.BeVietnamProRegular}
            alignSelf="flex-end">
            {moment(thoiGian).format('HH:mm DD/MM/YYYY')}
          </Text>
        )}
      </Box>
    </BoxHSNS>
  );
};
