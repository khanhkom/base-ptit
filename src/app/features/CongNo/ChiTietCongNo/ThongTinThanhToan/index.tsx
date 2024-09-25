import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import R from '@assets/R';
import {
  ETrangThaiTT,
  formatVND,
  HEIGHT,
  popupCancel,
  showToastError,
  showToastSuccess,
  WIDTH,
} from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import ItemLabel from '@components/Item/ItemLabel';
import { CongNoProps } from '@features/CongNo/type';
import { goBack, navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { createTransaction, getFromWallet } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Box, FlatList, useTheme } from 'native-base';

import { BillItemProps, TransactionProps } from '../type';
interface WalletMeProps {
  totalIn: number;
  totalOut: number;
}
interface Props {
  itemInfo: CongNoProps;
  transactionInfo: TransactionProps | undefined;
  onRefresh: () => void;
  listBillItems: BillItemProps[];
}
const ThongTinThanhToan = (props: Props) => {
  const { itemInfo, transactionInfo, onRefresh, listBillItems } = props;

  const totalAmount = listBillItems.reduce(
    (acc, currentValue) => acc + currentValue.amountDiscount,
    0,
  );

  const [loading, setloading] = useState(false);

  const [walletMe, setwalletMe] = useState<WalletMeProps>();

  useEffect(() => {
    getWalletMe();
  }, []);

  const getWalletMe = async () => {
    const responseWallet = await getFromWallet();

    setwalletMe(responseWallet?.data?.data);
  };

  const theme = useTheme();

  const soTienConLaiTrongVi =
    (walletMe?.totalIn || 0) - (walletMe?.totalOut || 0);

  const soTienPhaiNopThem = (itemInfo?.soTienConLai || 0) - soTienConLaiTrongVi;

  // const total = formatVND(soTienPhaiNopThem > 0 ? soTienPhaiNopThem : 0);
  const topupAmount = soTienPhaiNopThem > 0 ? soTienPhaiNopThem : 0;

  const dataList = [
    {
      title: translate('slink:So_du_hien_tai'),
      content: `${formatVND(soTienConLaiTrongVi)}`,
    },
    {
      title: translate('slink:So_tien_thanh_toan'),
      content: `${formatVND(itemInfo?.soTienPhaiThu || 0)}`,
    },
    {
      title: translate('slink:So_tien_uu_dai'),
      content: `${formatVND(totalAmount)}`,
    },
    {
      title: translate('slink:So_tien_da_nop'),
      content: `${formatVND(itemInfo?.soTienDaThu || 0)}`,
    },
    {
      title: translate('slink:So_tien_con_lai_phai_nop'),
      content: `${formatVND(itemInfo?.soTienConLai || 0)}`,
      styles: { ...styles.numberTotal, color: theme.colors.primary[500] },
    },
    // {
    //   title: translate('slink:So_tien_can_nop_them'),
    //   content: total,
    //   styles: { ...styles.numberTotal, color: theme.colors.primary[500] },
    // },
  ];

  const thoiGianHienTai = new Date();

  const thoiGianBatDau = new Date(itemInfo?.dotThu?.thoiGianBatDau);

  const thoiGianKetThuc = new Date(itemInfo?.dotThu?.thoiGianKetThuc);

  const ngoaiThoiGianThanhToan =
    !itemInfo?.dotThu?._id ||
    !itemInfo?.dotThu?.thoiGianBatDau ||
    !itemInfo?.dotThu?.thoiGianKetThuc ||
    moment().isBefore(itemInfo.dotThu.thoiGianBatDau) ||
    moment().isAfter(itemInfo.dotThu.thoiGianKetThuc);

  const thanhToanCongNo = async () => {
    if (ngoaiThoiGianThanhToan) {
      showToastError(translate('slink:Ngoai_thoi_gian_thanh_toan'));

      return;
    }

    if (transactionInfo) {
      navigateScreen(APP_SCREEN.THANHTOANCONGNO, { infoDot: itemInfo });

      return;
    }

    popupCancel(
      translate('slink:Notice_t'),
      translate('slink:Confirm_pay'),
      createDotThu,
    );
  };

  const createDotThu = async () => {
    setloading(true);

    const body = {
      billIdentityCode: itemInfo?.identityCode,
      topupAmount,
      fullBill: true,
      paymentType: soTienPhaiNopThem > 0 ? 'bank' : 'manual',
    };

    const responseCreateTransaction = await createTransaction(body);

    setloading(false);

    if (responseCreateTransaction?.status) {
      onRefresh && onRefresh();

      if (soTienPhaiNopThem > 0) {
        navigateScreen(APP_SCREEN.THANHTOANCONGNO, { infoDot: itemInfo });
      } else {
        goBack();

        showToastSuccess(translate('slink:Tao_lenh_thanh_toan_thanh_cong'));
      }
    }
  };

  if ([ETrangThaiTT.PAID, ETrangThaiTT.CLOSED]?.includes(itemInfo?.status)) {
    return null;
  }

  return (
    <Box mt={HEIGHT(8)} px={WIDTH(16)}>
      <FlatList
        data={dataList}
        renderItem={({ item, index }) => {
          return (
            <ItemLabel
              label={item?.title}
              value={item?.content}
              textValue={item?.styles}
              isLast={dataList?.length - 1 === index}
            />
          );
        }}
      />
      <BaseButtonNB
        // disabled={isHetHan()}
        marginTop={HEIGHT(16)}
        w="full"
        isLoading={loading}
        isLoadingText={translate('slink:Loading')}
        title={`${translate('slink:Pay')}`}
        onPress={thanhToanCongNo}
      />
    </Box>
  );
};

export default ThongTinThanhToan;

const styles = StyleSheet.create({
  numberTotal: {
    fontFamily: R.fonts.BeVietnamProSemiBold,
  },
});
