/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';

import R from '@assets/R';
import {
  colorTransactionStatus,
  ETransactionSourceType,
  formatVND,
  HEIGHT,
  transactionPaymentLabel,
  transactionStatus,
  WIDTH,
} from '@common';
import ItemLabel from '@components/Item/ItemLabel';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Badge, Box, Collapse, FlatList, Pressable, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import { TransactionProps } from '../type';

const PaidHistory = ({
  transactionHistory,
}: {
  transactionHistory: TransactionProps[];
}) => {
  const listThanhToan = transactionHistory?.map((item, index) => {
    return {
      title: `Lần ${index + 1}`,
      data: [
        {
          title: 'Mã thanh toán',
          content: item?.identityCode || '',
        },
        { badge: true, title: 'Loại giao dịch', content: LoaiGiaoDich(item) },
        {
          title: translate('slink:Amount_of_money'),
          content: formatVND(item?.amount || 0),
        },
        {
          title: 'Hình thức',
          content: transactionPaymentLabel?.[item?.paymentType] || '',
        },
        {
          badge: true,
          title: translate('slink:Status'),
          content: (
            <Badge colorScheme={colorTransactionStatus?.[item?.status]}>
              {transactionStatus?.[item?.status]}
            </Badge>
          ),
        },
        {
          title: 'Người thực hiện',
          content: item?.userFullname || '',
        },
        {
          title: 'Thời gian thực hiện',
          content: item?.createdAt
            ? moment(item?.createdAt).format('HH:mm DD/MM/YYYY')
            : '',
        },
      ],
    };
  });

  return (
    <Box
      marginTop={HEIGHT(24)}
      width={WIDTH(343)}
      alignSelf="center"
      style={R.themes.shadowOffset}>
      <Text
        fontFamily={R.fonts.BeVietnamProMedium}
        fontSize={'sm'}
        color="gray.500"
        textTransform="uppercase">
        Lịch sử thanh toán
      </Text>
      <FlatList
        data={listThanhToan}
        backgroundColor="white"
        scrollEnabled={false}
        nestedScrollEnabled
        marginTop={HEIGHT(16)}
        borderRadius={WIDTH(8)}
        paddingLeft={WIDTH(16)}
        paddingRight={WIDTH(16)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }: any) => {
          return (
            <ItemLichSu
              isLast={listThanhToan?.length - 1 === index}
              data={item}
              indexData={index}
            />
          );
        }}
      />
    </Box>
  );
};

export default PaidHistory;
const ItemLichSu = ({
  data,
  indexData,
  isLast,
}: {
  data: {
    title: string;
    data: {
      badge: boolean | undefined;
      title: string;
      content: string;
      color?: string;
    }[];
  };
  indexData: number;
  isLast: boolean;
}) => {
  const [expand, setexpand] = useState(false);

  return (
    <Box
      borderBottomWidth={isLast ? 0 : 0.5}
      borderColor="rgba(171, 171, 171, 0.4)">
      <Pressable
        onPress={() => setexpand(!expand)}
        _pressed={R.themes.pressed}
        borderBottomWidth={expand ? 0.5 : 0}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingTop={HEIGHT(16)}
        paddingBottom={HEIGHT(16)}
        borderColor="rgba(171, 171, 171, 0.4)">
        <Text
          color="black"
          fontFamily={R.fonts.BeVietnamProMedium}
          fontSize="sm"
          lineHeight="xl">
          {data?.title}
        </Text>
        <Icon
          name={expand ? 'chevron-up' : 'chevron-down'}
          size={WIDTH(24)}
          color={R.colors.grayText}
        />
      </Pressable>
      <Collapse isOpen={expand}>
        <FlatList
          data={data?.data}
          key={indexData}
          renderItem={({ item, index }) => {
            return (
              <ItemLabel
                label={item?.title}
                badge={item?.badge}
                value={item?.content}
                isLast={data?.data?.length - 1 === index}
              />
            );
          }}
        />
      </Collapse>
    </Box>
  );
};

const LoaiGiaoDich = (rec: TransactionProps) => {
  switch ((rec.fromAccount, rec.toAccount)) {
    case (ETransactionSourceType.EXTERNAL, ETransactionSourceType.WALLET):
      return <Badge colorScheme="green">{translate('slink:Payment')}</Badge>;
    case (ETransactionSourceType.WALLET, ETransactionSourceType.SYSTEM):
      return <Badge colorScheme="orange">{translate('slink:Pay')}</Badge>;
    case (ETransactionSourceType.SYSTEM, ETransactionSourceType.WALLET):
      return <Badge colorScheme="purple">{translate('slink:Return')}</Badge>;

    default:
      return null;
  }
};
