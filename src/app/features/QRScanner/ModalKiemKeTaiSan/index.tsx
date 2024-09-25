import R from '@assets/R';
import { HEIGHT, WIDTH, getFontSize, showImage } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import ItemLabel from '@components/Item/ItemLabel';
import SingleSelect from '@components/QuyTrinhDong/component/SingleSelect';
import ModalCustome from '@libcomponents/modal/modal-custome';
import {
  capNhatKiemKe,
  getTinhTrangSuDung,
} from '@networking/user/CoSoVatChat';
import { translate } from '@utils/i18n/translate';
import { FlatList, Pressable, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
interface Props {
  infoTaiSanKiemKe: any;
  isVisible: boolean;
  closeButton: () => void;
}
const ModalKiemKeTaiSan = (props: Props) => {
  const { isVisible, closeButton, infoTaiSanKiemKe } = props;
  const source = infoTaiSanKiemKe?.taiSan?.anhMinhHoaUrl;
  const ten = infoTaiSanKiemKe?.taiSan?.ten;
  const maTTSDDefault = infoTaiSanKiemKe?.taiSan?.maTinhTrangSuDung;
  const data = [
    { label: 'Mã tài sản', value: infoTaiSanKiemKe?.taiSan?.ma || '' },
    {
      label: 'Đơn vị sử dụng',
      value: infoTaiSanKiemKe?.taiSan?.tenDonViSuDung || '',
    },
    {
      label: 'Cá nhân sử dụng',
      value: infoTaiSanKiemKe?.taiSan?.tenNguoiSuDung || '',
    },
  ];
  const [tinhTrangSDCurrent, settinhTrangSDCurrent] = useState(maTTSDDefault);

  const [listTT, setlistTT] = useState([]);
  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const responseTT = await getTinhTrangSuDung();
      setlistTT(responseTT?.data?.data || []);
    } catch (error) { }
  };
  const updateKiemKe = async () => {
    try {
      const body = { maTinhTrangSuDung: tinhTrangSDCurrent };
      const responseUpdate = await capNhatKiemKe(infoTaiSanKiemKe?._id, body);
      if (responseUpdate?.status) {
        closeButton && closeButton();
      }
    } catch (error) { }
  };
  return (
    <ModalCustome
      closeButton={closeButton}
      style={styles.modal}
      // isVisible={true}
      isVisible={isVisible}
    >
      <Text
        textAlign="center"
        fontSize={getFontSize(18)}
        fontFamily={R.fonts.BeVietnamProSemiBold}
        color={R.colors.primaryColor}>
        {infoTaiSanKiemKe?.taiSan?.ten || translate('slink:Detail_t')}
      </Text>
      <VStack marginTop={HEIGHT(32)}>
        {!!source && (
          <Pressable
            onPress={() =>
              showImage([{ source: { uri: source }, title: ten || '' }])
            }
            _pressed={R.themes.pressed}
            alignItems={'center'}>
            <FastImage
              source={{ uri: source }}
              resizeMode="contain"
              style={styles.ava}
            />
          </Pressable>
        )}
        <FlatList
          contentContainerStyle={{ paddingHorizontal: WIDTH(12) }}
          showsVerticalScrollIndicator={true}
          bounces={false}
          data={data}
          renderItem={({ item, index }) => {
            if (item) {
              return (
                <ItemLabel
                  label={item?.label}
                  value={item?.value}
                  numberOfLines={2}
                  isLast={data?.length - 1 === index}
                />
              );
            } else {
              return null;
            }
          }}
        />

        <SingleSelect
          width={WIDTH(319)}
          alignSelf="center"
          placeholder={'Tình trạng sử dụng'}
          onChangeValue={settinhTrangSDCurrent}
          defaultValue={maTTSDDefault}
          data={listTT?.map((item: any) => {
            return { label: item?.tinhTrangSuDung || '', value: item?.ma };
          })}
        />
        <BaseButtonNB
          isLoading={false}
          isLoadingText={'Đang tải'}
          width={WIDTH(140)}
          onPress={updateKiemKe}
          title={translate('slink:Continue')}
        />
      </VStack>
    </ModalCustome>
  );
};

export default ModalKiemKeTaiSan;

const styles = StyleSheet.create({
  modal: {
    paddingVertical: HEIGHT(40),
    paddingHorizontal: 0,
  },
  ava: {
    height: WIDTH(100),
    width: WIDTH(100),
  },
});
