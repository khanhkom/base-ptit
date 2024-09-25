/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import R from '@assets/R';
import { renderAvaGV, showImage } from '@common';
import ItemLabel from '@components/Item/ItemLabel';
import BaseButton from '@components/Popup/BaseButton';
import ModalCustome from '@libcomponents/modal/modal-custome';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getChiTietNhomLopTinChi } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { Pressable } from 'native-base';

import styles from './styles';
import { ModalProps } from './type';

const ModalInfoGiangVien = (props: ModalProps) => {
  const { data, isVisible, closeButton } = props;

  const onNavigate = () => {
    closeButton();

    setTimeout(() => {
      navigateScreen(APP_SCREEN.THONGTINCHUNGLTC, {
        nhomTH: true,
        infoClass: infoLopTH,
      });
    }, 500);
  };

  const [infoLopTH, setinfoLopTH] = useState<any>();

  useEffect(() => {
    getData();
  }, [data]);

  const getData = async () => {
    try {
      const res: any = await getChiTietNhomLopTinChi(data?.id);

      setinfoLopTH(res?.data?.data);
    } catch (error) {}
  };

  const listInfo = [
    {
      label: translate('slink:Fullname'),
      value:
        infoLopTH?.giangVienList?.[0]?.name || translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Email',
      value:
        infoLopTH?.giangVienList?.[0]?.email ||
        translate('slink:Chua_cap_nhat'),
    },
    {
      label: translate('slink:Phone_number'),
      value:
        infoLopTH?.giangVienList?.[0]?.so_dien_thoai ||
        translate('slink:Chua_cap_nhat'),
    },
  ];

  const anhDaiDien = renderAvaGV(infoLopTH?.giangVienList?.[0]);

  return (
    <ModalCustome
      closeButton={closeButton}
      style={styles.modal}
      isVisible={isVisible}>
      <View>
        <View>
          <Text style={styles.title}>
            {translate('slink:Infomation_lecturer')}
          </Text>
        </View>
        <Pressable
          _pressed={R.themes.pressed}
          onPress={() =>
            showImage([
              {
                source: anhDaiDien,
                title: infoLopTH?.giangVienList?.[0]?.name,
              },
            ])
          }
          style={styles.viewAVA}>
          <FastImage
            source={anhDaiDien}
            resizeMode="cover"
            style={styles.ava}
          />
        </Pressable>
        <FlatList
          data={listInfo}
          nestedScrollEnabled={false}
          renderItem={({ item, index }) => (
            <ItemLabel
              label={item?.label}
              value={item?.value}
              isLast={index === listInfo?.length - 1}
            />
          )}
        />
        <BaseButton
          onPress={onNavigate}
          style={styles.button}
          text={styles.textButton}
          title={translate('slink:Detail_t')}
        />
      </View>
    </ModalCustome>
  );
};

export default ModalInfoGiangVien;
