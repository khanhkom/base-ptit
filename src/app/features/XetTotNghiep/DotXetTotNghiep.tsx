import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import { getDotXetTN } from '@networking/user';
import moment from 'moment';
import { Badge, Box, FlatList, ScrollView, Text } from 'native-base';

import { DotXetTNProps } from './type';
import { translate } from '@utils/i18n/translate';

const DotXetTotNghiep = () => {
  const [dotXetTN, setdotXetTN] = useState<DotXetTNProps>();

  useEffect(() => {
    getInit();
  }, []);

  const getInit = async () => {
    const response = await getDotXetTN();

    setdotXetTN(response);
  };

  return (
    <ScrollView style={styles.container}>
      <ViewDot
        name={dotXetTN?.ten ?? ''}
        ngayChot={dotXetTN?.ngayChotDanhSach}
      />
      <TextSub dotXetTN={dotXetTN} />
    </ScrollView>
  );
};

export default DotXetTotNghiep;
const TextSub = ({ dotXetTN }: { dotXetTN?: DotXetTNProps }) => {
  const isTrongDot = dotXetTN?.ketQuaXetTotNghiep ? true : false;

  const label = isTrongDot
    ? 'Bạn có trong danh sách xét tốt nghiệp đợt này.'
    : 'Bạn không có trong đợt xét tốt nghiệp này.';

  const listInfo = [
    {
      label: 'Kết quả rà soát sơ bộ',
      value: (
        <Badge
          colorScheme={
            MappingColorSchemeKQ?.[
              dotXetTN?.ketQuaXetTotNghiep?.ketQua ||
                KetQuaXetTotNghiep.KHONG_DU_DK
            ]
          }>
          {dotXetTN?.ketQuaXetTotNghiep?.ketQua ?? ''}
        </Badge>
      ),
    },
    {
      label: 'Ý kiến phản hồi',
      value: (
        <Text fontFamily={R.fonts.BeVietnamProRegular}>
          {dotXetTN?.ketQuaXetTotNghiep?.yKienSinhVien ?? ''}
        </Text>
      ),
    },
    {
      label: translate('slink:Status'),
      value: (
        <Badge
          colorScheme={
            MappingColorSchemeTrangThaiDuyet?.[
              dotXetTN?.ketQuaXetTotNghiep?.trangThaiDuyet ||
                TrangThaiDuyetXetTotNghiep?.KHONG_DUYET
            ]
          }>
          {dotXetTN?.ketQuaXetTotNghiep?.trangThaiDuyet ?? ''}
        </Badge>
      ),
    },
  ];

  const isHoan = dotXetTN?.ketQuaXetTotNghiep?.loaiDoiTuong === 'Hoãn';

  return (
    <Box style={styles.viewTextSub}>
      <Text
        fontSize={'sm'}
        color={'black'}
        fontFamily={R.fonts.BeVietnamProRegular}>
        {label}
      </Text>
      {isTrongDot && (
        <FlatList
          data={listInfo}
          scrollEnabled={false}
          renderItem={({ item, index }) => {
            return (
              <Text
                mt="4"
                key={index}
                color="black"
                fontSize="sm"
                lineHeight="lg"
                fontFamily={R.fonts.BeVietnamProSemiBold}>
                {`${item?.label}: `}
                {item?.value}
              </Text>
            );
          }}
        />
      )}
      {isHoan && (
        <Text
          mt="4"
          fontSize={'sm'}
          color={'black'}
          fontFamily={R.fonts.BeVietnamProRegular}>
          Bạn đã đăng ký hoãn xét tốt nghiệp đợt này
        </Text>
      )}
    </Box>
  );
};

const ViewDot = ({
  name,
  ngayChot,
}: {
  name: string;
  ngayChot: string | undefined;
}) => {
  const textNgayChot = ngayChot ? (
    <Text fontSize={'sm'}>
      {' , ngày chốt danh sách sinh viên '}
      <Text fontFamily={R.fonts.BeVietnamProSemiBold}>
        {moment(ngayChot, 'YYYY-MM-DD').format('DD/MM/YYYY')}
      </Text>
    </Text>
  ) : (
    ''
  );

  return (
    <Box style={styles.viewDot}>
      <Text
        color="primary.900"
        fontSize="sm"
        lineHeight="lg"
        fontFamily={R.fonts.BeVietnamProRegular}>
        Đợt xét tốt nghiệp{' '}
        <Text fontFamily={R.fonts.BeVietnamProSemiBold}>{name ?? '--'}</Text>{' '}
        đang diễn ra{textNgayChot}
      </Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: WIDTH(16) },
  viewDot: {
    paddingVertical: HEIGHT(8),
    paddingHorizontal: WIDTH(12),
    borderRadius: WIDTH(8),
    backgroundColor: '#d9e3fe',
    marginBottom: HEIGHT(12),
  },
  viewTextSub: {},
});

export enum KetQuaXetTotNghiep {
  DU_DK = 'Đủ điều kiện',
  KHONG_DU_DK = 'Không đủ điều kiện',
}
const MappingColorSchemeKQ = {
  [KetQuaXetTotNghiep.DU_DK]: 'success',
  [KetQuaXetTotNghiep.KHONG_DU_DK]: 'error',
};

export enum TrangThaiDuyetXetTotNghiep {
  DUYET = 'Duyệt',
  CHO_DUYET = 'Chờ duyệt',
  KHONG_DUYET = 'Không duyệt',
}
const MappingColorSchemeTrangThaiDuyet = {
  [TrangThaiDuyetXetTotNghiep.DUYET]: 'success',
  [TrangThaiDuyetXetTotNghiep.CHO_DUYET]: 'warning',
  [TrangThaiDuyetXetTotNghiep.KHONG_DUYET]: 'error',
};
