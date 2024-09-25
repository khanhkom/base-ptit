/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { ScrollView } from 'react-native-gesture-handler';

import R from '@assets/R';
import {
  ETrangThaiTT,
  formatVND,
  getStatusPaymentColorByValue,
  HEIGHT,
  TrangThaiTT,
  WIDTH,
} from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import SkeletonTable from '@components/HoSoNhanSu/SkeletonTable';
import TextChuaCapNhat from '@components/Item/TextChuaCapNhat';
import HeaderReal from '@libcomponents/header-real';
import ItemInfor from '@libcomponents/ItemTable';
import { getListBillItemV2, getTransactionV2 } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Badge, Box, HStack, Skeleton, Text, VStack } from 'native-base';

import PaidHistory from './PaidHistory';
import styles from './styles';
import ThongTinThanhToan from './ThongTinThanhToan';
import { BillItemProps, TransactionProps } from './type';

import { CongNoProps } from '../type';
interface Props {
  route: { params: { itemInfo: CongNoProps; onRefreshList: () => void } };
}

const ChiTietCongNo = (props: Props) => {
  const { itemInfo, onRefreshList } = props.route.params;

  const [transactionInfo, settransactionInfo] = useState<TransactionProps>();

  const [listBillItems, setlistBillItems] = useState<BillItemProps[]>([]);

  const [loading, setloading] = useState(false);

  const [transactionHistory, settransactionHistory] = useState<
    TransactionProps[]
  >([]);

  useEffect(() => {
    getInitAPI();
  }, []);

  const getInitAPI = async () => {
    setloading(true);

    const body = {
      condition: {
        status: 'pending',
        billIdentityCode: itemInfo?.identityCode,
        fromAccount: 'external',
      },
    };

    const bodyHistory = {
      condition: {
        billIdentityCode: itemInfo?.identityCode,
      },
    };

    const responseBillItems = await getListBillItemV2(bodyHistory);

    setlistBillItems(responseBillItems?.data?.data || []);

    const responseTranSaction = await getTransactionV2(body);

    settransactionInfo(responseTranSaction?.data?.data?.[0]);

    const responseTranSactionHistory = await getTransactionV2(bodyHistory);

    settransactionHistory(responseTranSactionHistory?.data?.data || []);

    setloading(false);
  };

  const onRefresh = () => {
    getInitAPI();

    onRefreshList();
  };

  return (
    <Box style={styles.container} testID="TabDVu1Cua">
      <HeaderReal title={translate('slink:Debt_Detail')} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ paddingBottom: HEIGHT(30) }}>
        <Title itemInfo={itemInfo} />
        <ThongTinThanhToan
          listBillItems={listBillItems}
          transactionInfo={transactionInfo}
          itemInfo={itemInfo}
          onRefresh={onRefresh}
        />
        <ThongKe loading={loading} listBillItems={listBillItems} />
        {transactionHistory?.length > 0 && (
          <PaidHistory transactionHistory={transactionHistory} />
        )}
      </ScrollView>
    </Box>
  );
};

export default ChiTietCongNo;

const ThongKe = ({
  listBillItems,
  loading,
}: {
  loading: boolean;
  listBillItems: BillItemProps[];
}) => {
  const tableHead = [
    translate('slink:No'),
    translate('slink:Category'),
    translate('slink:Amount_of_money'),
  ];

  const widthArr = [WIDTH(60), WIDTH(180), WIDTH(103)];

  const tongBill =
    listBillItems?.reduce(
      (total: number, item) =>
        total +
        item?.quantity *
          (item?.status === ETrangThaiTT.CLOSED ? 0 : item?.unitAmount || 0),
      0,
    ) ?? 0;

  const tableData =
    listBillItems?.map((itemSV, indexSV) => {
      const productName = itemSV?.ten
        ? itemSV?.ten
        : translate('slink:Chua_cap_nhat');

      const giaTien = `${
        itemSV?.quantity ? `${itemSV?.quantity} x ` : ''
      }${formatVND(itemSV?.unitAmount || 0)}`;

      const styleColor = {
        color: getStatusPaymentColorByValue(TrangThaiTT?.[itemSV?.status]),
      };

      const dataRow = [
        <ItemInfor content={indexSV + 1} key={indexSV} />,
        <Box flex={1} alignSelf="flex-start">
          <ItemInfor
            textStyle={[
              {
                textAlign: 'left',
                textDecorationLine:
                  itemSV?.status === ETrangThaiTT.CLOSED
                    ? 'line-through'
                    : 'none',
              },
              styleColor,
            ]}
            content={productName}
            key={indexSV}
          />
        </Box>,
        <ItemInfor
          content={giaTien}
          key={indexSV}
          textStyle={[
            {
              textDecorationLine:
                itemSV?.status === ETrangThaiTT.CLOSED
                  ? 'line-through'
                  : 'none',
            },
            styleColor,
          ]}
        />,
      ];

      return dataRow;
    }) || [];

  return (
    <Box marginTop={HEIGHT(24)} width={WIDTH(343)} alignSelf="center">
      <Text
        fontFamily={R.fonts.BeVietnamProMedium}
        fontSize={'sm'}
        color="gray.500"
        textTransform="uppercase">
        {translate('slink:Payment_Detail')}
      </Text>
      <Box marginTop={HEIGHT(16)}>
        {loading ? (
          <SkeletonTable />
        ) : (
          <BaseTableComponent
            tableHead={tableHead}
            widthArr={widthArr}
            tableData={tableData}
          />
        )}
        <HStack
          marginTop={HEIGHT(20)}
          alignItems={'center'}
          justifyContent="space-between">
          <Skeleton.Text isLoaded={!loading} lines={1} w={WIDTH(100)}>
            <Text
              fontSize={'sm'}
              width={WIDTH(60)}
              textAlign="center"
              color="black"
              fontFamily={R.fonts.BeVietnamProRegular}>
              {translate('slink:Sum')}
            </Text>
          </Skeleton.Text>
          <Skeleton.Text
            startColor={'primary.100'}
            isLoaded={!loading}
            lines={1}
            w={WIDTH(100)}>
            <Text
              fontSize={'md'}
              color="primary.500"
              fontFamily={R.fonts.BeVietnamProBold}>
              {formatVND(tongBill)}
            </Text>
          </Skeleton.Text>
        </HStack>
      </Box>
    </Box>
  );
};

const Title = ({ itemInfo }: { itemInfo: CongNoProps }) => {
  const name = itemInfo?.dotThu?.tenDot || itemInfo?.name;

  return (
    <Box
      paddingTop={HEIGHT(24)}
      px={WIDTH(16)}
      alignItems="center"
      backgroundColor="white"
      paddingBottom={HEIGHT(16)}>
      <Text style={styles?.header}>{name || <TextChuaCapNhat />}</Text>
      <Box style={styles.line} />
      {!!itemInfo?.dotThu?.thoiGianBatDau &&
        !!itemInfo?.dotThu?.thoiGianKetThuc && (
          <VStack
            mt={'4'}
            w="full"
            flexDirection="row"
            justifyContent="space-between">
            <Text
              fontSize="xs"
              color="gray.500"
              fontFamily={R.fonts.BeVietnamProRegular}>
              {translate('slink:From')}:{' '}
              {moment(itemInfo?.dotThu?.thoiGianBatDau).format(
                'HH:mm DD/MM/YYYY',
              )}
            </Text>
            <Text
              fontSize="xs"
              color="gray.500"
              fontFamily={R.fonts.BeVietnamProRegular}>
              {translate('slink:To')}:{' '}
              {moment(itemInfo?.dotThu?.thoiGianKetThuc).format(
                'HH:mm DD/MM/YYYY',
              )}
            </Text>
          </VStack>
        )}
      <Badge
        mt="4"
        alignSelf={'center'}
        colorScheme={getStatusPaymentColorByValue(
          TrangThaiTT?.[itemInfo?.status],
        )}>
        {TrangThaiTT?.[itemInfo?.status]}
      </Badge>
    </Box>
  );
};
