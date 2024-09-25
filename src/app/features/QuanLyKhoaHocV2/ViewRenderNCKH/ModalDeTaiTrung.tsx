import React from 'react';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import ItemKhaiBao from '@features/QuanLyKhoaHocV2/DanhSachKhaiBao/ItemKhaiBao';
import { KetQuaKhaiBaoProps } from '@features/QuanLyKhoaHocV2/type';
import ModalCustome from '@libcomponents/modal/modal-custome';
import { translate } from '@utils/i18n/translate';
import { FlatList, Text } from 'native-base';
interface Props {
  modalVisible: boolean;
  turnOffModel: () => void;
  listData: KetQuaKhaiBaoProps[];
  onPress: () => void;
  loading: boolean;
  textLoading: string;
}
const ModalDeTaiTrung = (props: Props) => {
  const {
    modalVisible,
    turnOffModel,
    listData,
    onPress,
    loading,
    textLoading,
  } = props;

  return (
    <ModalCustome
      style={{ paddingHorizontal: 0 }}
      isVisible={modalVisible}
      closeButton={turnOffModel}>
      <Text
        textAlign={'center'}
        width={WIDTH(311)}
        alignSelf="center"
        fontSize={getFontSize(18)}
        fontFamily={R.fonts.BeVietnamProMedium}
        color={R.colors.primaryColor}>
        {translate('slink:Similar_scientific_research')}
      </Text>
      <FlatList
        marginTop={HEIGHT(32)}
        showsVerticalScrollIndicator={false}
        bounces={false}
        data={listData}
        renderItem={({ item, index }) => (
          <ItemKhaiBao width={WIDTH(311)} onlySee key={index} data={item} />
        )}
      />
      <BaseButtonNB
        isLoading={loading}
        isLoadingText={textLoading}
        width={WIDTH(140)}
        onPress={onPress}
        title={translate('slink:Continue')}
      />
    </ModalCustome>
  );
};

export default ModalDeTaiTrung;
