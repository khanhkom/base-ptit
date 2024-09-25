import React from 'react';

import BaseButtonNB from '@components/BaseButtonNB';
import ItemTrong from '@components/Item/ItemTrong';
import { khoiTaoThoiKhoaBieu } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';
interface Props {
  id?: string;
  onRefresh?: () => void;
}
const ViewChuaBatDau = (props: Props) => {
  const { id, onRefresh } = props;

  const onPress = async () => {
    try {
      const response = await khoiTaoThoiKhoaBieu(id || '');

      if (response?.status) {
        onRefresh && onRefresh();
      }
    } catch (error) {}
  };

  return (
    <Box>
      <ItemTrong
        content="Buổi học chưa được bắt đầu! Ấn nút bên dưới để bắt đầu buổi học:
- Đánh dấu giảng viên giảng dạy;
- Tải danh sách điểm danh lớp."
      />
      <BaseButtonNB
        isLoading={false}
        isLoadingText={translate('slink:Loading')}
        onPress={onPress}
        title={'Bắt đầu buổi học'}
      />
    </Box>
  );
};

export default ViewChuaBatDau;
