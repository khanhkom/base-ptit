/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { TouchableOpacity } from 'react-native';

import R from '@assets/R';
import { WIDTH } from '@common';
import ItemIconTitle from '@components/Item/ItemIconTitle';
import { getFontSize, HEIGHT, tenGiangVien } from '@config/function';
import ItemIconSVG from '@libcomponents/icon-svg';
import { translate } from '@utils/i18n/translate';
import { Box, Divider, FlatList, Skeleton, Text } from 'native-base';

import styles from './styles';
interface Props {
  title: string;
  soTinChi?: string | number;
  maLop: string;
  listGV: any[];
  loading?: boolean;
  onPress: (e: void) => void;
}
const HeaderQLDT = (props: Props) => {
  const { title, soTinChi, maLop, listGV, onPress, loading = true } = props;

  return (
    <Box
      backgroundColor={R.colors.white}
      px={WIDTH(16)}
      pb={HEIGHT(16)}
      pt={HEIGHT(24)}
      style={R.themes.shadowOffset}>
      <Skeleton.Text isLoaded={!loading} lines={2} alignItems="center" px="12">
        <Text
          fontSize={getFontSize(16)}
          textAlign={'center'}
          fontFamily={R.fonts.BeVietnamProMedium}>
          {`${title}${maLop ? ` (${maLop})` : null}`}
        </Text>
        {!!soTinChi && (
          <Text style={styles.tinChi}>{`(${soTinChi} ${translate(
            'slink:Credits',
          )?.toLowerCase()})`}</Text>
        )}
      </Skeleton.Text>
      <Divider style={styles.line} />
      <ListGiangVien onPress={onPress} listGV={listGV} />
    </Box>
  );
};

export default HeaderQLDT;
const ListGiangVien = ({
  listGV,
  onPress,
}: {
  listGV: any[];
  onPress: (e: any) => void;
}) => {
  return (
    <FlatList
      data={listGV}
      renderItem={({ item, index }) => {
        const ten = item?.tenNhanSu || tenGiangVien(item?.nhanSu);

        return (
          <Box
            key={index}
            marginTop={index === 0 ? 0 : HEIGHT(16)}
            justifyContent="space-between"
            flexDirection="row"
            alignItems="center"
            flex={1}>
            <ItemIconTitle label={translate('slink:Teacher')} content={ten} />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onPress(item)}
              style={styles.viewMess}>
              <ItemIconSVG
                title={translate('slink:See')}
                color={R.colors.colorMain}
                width={WIDTH(24)}
                height={WIDTH(24)}
              />
            </TouchableOpacity>
          </Box>
        );
      }}
    />
  );
};
