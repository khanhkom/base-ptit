import React, { useState } from 'react';

import R from '@assets/R';
import {
  getFontSize,
  HEIGHT,
  MapColorTrangThaiTiepNhanDon,
  MapIconTrangThaiTiepNhanDon,
  TrangThaiTiepNhanDon,
  WIDTH,
} from '@common';
import ModalCustome from '@libcomponents/modal/modal-custome';
import { translate } from '@utils/i18n/translate';
import { Badge, Box, Divider, FlatList, Pressable, Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { DanhSachBuocXuLyProps } from '../type';

interface Props {
  turnOffModel: () => void;
  modalVisible: boolean;
  cacBuocXuLy: DanhSachBuocXuLyProps[];
  onChangeIndex: (e: number) => void;
  buocHienTai: number;
}
const ModalCacBuocXuLy = (props: Props) => {
  const {
    turnOffModel,
    modalVisible,
    cacBuocXuLy,
    onChangeIndex,
    buocHienTai,
  } = props;

  const [indexChoose, setindexChoose] = useState(buocHienTai);

  const onChange = (index: number) => {
    onChangeIndex(index);

    setindexChoose(index);

    setTimeout(turnOffModel, 500);
  };

  return (
    <ModalCustome closeButton={turnOffModel} isVisible={modalVisible}>
      <FlatList
        data={cacBuocXuLy}
        bounces={false}
        alignSelf="center"
        renderItem={({ item, index }) => (
          <ItemTrangThai
            buocHienTai={buocHienTai}
            onChangeIndex={() => onChange(index)}
            key={index}
            isChoose={indexChoose === index}
            index={index}
            data={item}
            isLast={cacBuocXuLy?.length - 1 === index}
          />
        )}
      />
    </ModalCustome>
  );
};

export default ModalCacBuocXuLy;
const ItemTrangThai = ({
  data,
  isLast,
  onChangeIndex,
  index,
  isChoose,
  buocHienTai,
}: {
  data: DanhSachBuocXuLyProps;
  buocHienTai: number;
  index: number;
  onChangeIndex: () => void;
  isLast: boolean;
  isChoose: boolean;
}) => {
  const status = data?.trangThaiTiepNhan || translate('slink:Chua_cap_nhat');

  const iconInfo = MapIconTrangThaiTiepNhanDon?.[status];

  const disabled = index > buocHienTai;

  return (
    <Pressable
      disabled={disabled}
      onPress={onChangeIndex}
      _pressed={R.themes.pressed}
      hitSlop={R.themes.hitSlop}
      marginBottom={HEIGHT(12)}
      flexDirection="row">
      <Box flexDirection="column" alignItems="center" marginRight={WIDTH(16)}>
        <Box
          height={WIDTH(28)}
          width={WIDTH(28)}
          justifyContent={'center'}
          alignItems={'center'}
          borderRadius={15}
          borderWidth={1}
          borderColor={iconInfo?.backgroundColor}
          backgroundColor={isChoose ? iconInfo?.backgroundColor : undefined}>
          <Icon
            name={iconInfo?.content}
            size={WIDTH(18)}
            color={isChoose ? R.colors.white : iconInfo?.backgroundColor}
          />
        </Box>
        {!isLast && <Divider flex={1} width={0.5} marginTop={HEIGHT(12)} />}
      </Box>
      <ViewTrangThai
        index={index}
        buocHienTai={buocHienTai}
        ten={data?.ten}
        trangThaiTiepNhan={data?.trangThaiTiepNhan}
        coKhaiBao={data?.coKhaiBao}
      />
    </Pressable>
  );
};

const ViewTrangThai = ({
  trangThaiTiepNhan,
  coKhaiBao,
  ten,
  index,
  buocHienTai,
}: {
  trangThaiTiepNhan: TrangThaiTiepNhanDon;
  coKhaiBao: boolean | undefined;
  ten: string;
  index: number;
  buocHienTai: number;
}) => {
  const disabled = index > buocHienTai;

  const colorDisable = disabled ? R.colors.grayText : R.colors.black0;

  return (
    <Box alignItems={'flex-start'}>
      <Text
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize={getFontSize(14)}
        maxWidth={WIDTH(250)}
        color={colorDisable}
        marginBottom={HEIGHT(8)}>
        {ten || ''}
      </Text>
      {trangThaiTiepNhan ? (
        <Badge
          marginBottom={HEIGHT(4)}
          colorScheme={MapColorTrangThaiTiepNhanDon?.[trangThaiTiepNhan]}>
          {trangThaiTiepNhan}
        </Badge>
      ) : (
        <Badge colorScheme={'info'}>Chưa đến bước xử lý</Badge>
      )}
      {typeof coKhaiBao === 'boolean' && (
        <Badge colorScheme={coKhaiBao ? 'success' : 'warning'}>
          {coKhaiBao ? 'Đã khai báo' : 'Chưa khai báo'}
        </Badge>
      )}
    </Box>
  );
};
