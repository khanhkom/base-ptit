/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import ItemIconTitle from '@components/Item/ItemIconTitle';
import ItemIconSVG from '@libcomponents/icon-svg';
import { translate } from '@utils/i18n/translate';
import { Box, FlatList, Pressable } from 'native-base';

const ItemThongTinLopHC = (props: {
  data: any;
  isLoaded: boolean;
  sySo: string | number;
  onPress?: () => void;
}) => {
  const { data, sySo, onPress, isLoaded } = props;

  const listData = [
    { icon: translate('slink:Class'), value: `${data?.ten ?? '--'}` },
    { icon: translate('slink:Majors'), value: `${data?.nganh?.ten || '--'}` },
    {
      icon: translate('slink:Number_of_students'),
      value: `${sySo} ${translate('slink:Student').toLowerCase()}`,
    },
  ];

  const giangVienArr = [data?.giangVien?.hoDem, data?.giangVien?.ten]?.filter(
    e => e !== undefined,
  );

  const giangVien =
    giangVienArr?.length === 0
      ? translate('slink:No_information_found')
      : giangVienArr?.join(' ');

  return (
    <Box style={styles.container}>
      <FlatList
        data={listData}
        renderItem={({ item, index }) => (
          <ItemIconTitle
            isLoaded={isLoaded}
            key={index}
            marginBottom={HEIGHT(16)}
            label={item?.icon}
            content={item?.value}
          />
        )}
      />
      <GiangVienHC
        isLoaded={isLoaded}
        invalid={giangVienArr?.length === 0}
        onPress={onPress}
        giangVien={giangVien}
      />
    </Box>
  );
};

export default ItemThongTinLopHC;
const GiangVienHC = ({
  giangVien,
  onPress,
  isLoaded,
  invalid,
}: {
  giangVien: string;
  isLoaded: boolean;
  onPress?: () => void;
  invalid: boolean;
}) => {
  if (isLoaded) {
    return (
      <Box style={styles.itemGV}>
        <ItemIconTitle label={translate('slink:Teacher')} content={giangVien} />
        {!invalid && (
          <Pressable _pressed={R.themes.pressed} onPress={onPress}>
            <ItemIconSVG
              title={translate('slink:See')}
              color={R.colors.colorMain}
              width={WIDTH(24)}
              height={WIDTH(24)}
            />
          </Pressable>
        )}
      </Box>
    );
  }

  return (
    <Box style={styles.itemGV}>
      <ItemIconTitle
        content=""
        isLoaded={false}
        label={translate('slink:Teacher')}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH(343),
    backgroundColor: R.colors.white,
    paddingHorizontal: WIDTH(16),
    paddingTop: HEIGHT(16),
    marginBottom: HEIGHT(24),
    alignSelf: 'center',
    borderRadius: WIDTH(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 20,
  },
  itemGV: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: HEIGHT(16),
    justifyContent: 'space-between',
  },
});
