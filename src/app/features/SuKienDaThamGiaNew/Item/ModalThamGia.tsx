import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import InputLabel from '@components/HoSoNhanSu/KeKhaiTaiSan/InputLabel';
import ItemLabel from '@components/Item/ItemLabel';
import ModalCustome from '@libcomponents/modal/modal-custome';
import { selectAppConfig } from '@redux-selector/app';
import { Box, FlatList, Text, VStack } from 'native-base';

interface Props {
  onDangKy: (ma) => void;
  isVisible: boolean;
  closeButton: () => void;
  isThamGia?: boolean;
}
const ModalThamGia = (props: Props) => {
  const { account } = useSelector(selectAppConfig);

  const isSinhVien = !account?.isGiaoVien;

  const maUser = isSinhVien ? account?.ma : account?.maCanBo;

  const data = [
    { label: isSinhVien ? 'Mã SV' : 'Mã cán bộ', value: maUser || '--' },
    {
      label: 'Họ và tên',
      value: account?.ten || '--',
    },
    {
      label: 'Số điện thoại',
      value: account?.soDienThoai || '--',
    },
  ];

  const { isVisible, closeButton, onDangKy, isThamGia } = props;

  const [ma, setMa] = useState('');

  return (
    <ModalCustome
      closeButton={closeButton}
      style={styles.modal}
      // isVisible={true}
      isVisible={isVisible}>
      <VStack w={WIDTH(300)} alignSelf={'center'}>
        {isThamGia && (
          <>
            <Text
              // textAlign="center"
              fontSize={getFontSize(14)}
              ml={WIDTH(12)}
              fontFamily={R.fonts.BeVietnamProSemiBold}
              color={R.colors.black0}>
              Thông tin đăng ký
            </Text>
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
          </>
        )}
        <Box ml={'3'} mr="2">
          <InputLabel
            label="Nhập mã sự kiện"
            onChangeText={setMa}
            w={WIDTH(140)}
            keyboardType="numeric"
          />
        </Box>
        <BaseButtonNB
          isLoading={false}
          isLoadingText={'Đang tải'}
          width={WIDTH(200)}
          onPress={() => onDangKy(ma)}
          title={isThamGia ? 'Đăng ký' : 'Tham gia'}
        />
      </VStack>
    </ModalCustome>
  );
};

export default ModalThamGia;

const styles = StyleSheet.create({
  modal: {
    paddingVertical: HEIGHT(40),
    paddingHorizontal: 0,
  },
});
