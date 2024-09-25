/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import R from '@assets/R';
import { REGEX_FILE_NAME_URL } from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import ItemTrong from '@components/Item/ItemTrong';
import { getLineHeight, HEIGHT, showLink, WIDTH } from '@config/function';
import {
  KetQuaKhaiBaoProps,
  LoaiHinhNCKHProps,
} from '@features/QuanLyKhoaHocV2/type';
import ItemInfor from '@libcomponents/ItemTable';
import { translate } from '@utils/i18n/translate';
import { Box, FlatList, Link, Text } from 'native-base';

interface Props {
  label?: string;
  data: KetQuaKhaiBaoProps;
  isLast?: boolean;
  visibleMinhChungChiaGio?: boolean;
  loaiHinh?: LoaiHinhNCKHProps;
}
const RenderTableThanhVien = (props: Props) => {
  const { label, loaiHinh, data, isLast, visibleMinhChungChiaGio } = props;

  const value = data?.danhSachThanhVien;

  const tinhDiem = loaiHinh?.tinhDiem;

  const tinhTheoTungNam = loaiHinh?.tinhTheoTungNam;

  const widthArr = [
    WIDTH(43),
    WIDTH(150),
    WIDTH(150),
    WIDTH(150),
    ...(tinhDiem ? [WIDTH(150)] : []),
    ...(!tinhTheoTungNam ? [WIDTH(150)] : []),
  ];

  const tableahead = [
    translate('slink:No'),
    translate('slink:Fullname'),
    translate('slink:Place_of_work'),
    translate('slink:Role'),
    ...(tinhDiem ? [translate('slink:Diem_san_pham_NCKH')] : []),
    ...(!tinhTheoTungNam ? [translate('slink:Gio_chuan_NCKH')] : []),
  ];

  const tableData =
    value?.map((e: any, index: number) => {
      const gioQD =
        data?.danhSachYeuCauQuyDoiGio?.[0]?.danhSachKetQuaTinhGioThanhVien?.find(
          i => i?.ssoId === e?.ssoId,
        )?.tongGio;

      const diemQD =
        data?.danhSachYeuCauQuyDoiDiem?.[0]?.danhSachKetQuaTinhGioThanhVien?.find(
          i => i?.ssoId === e?.ssoId,
        )?.tongGio;

      return [
        <ItemInfor key={index} content={index + 1} />,
        <ItemInfor key={index} content={e?.hoVaTen} />,
        <ItemInfor key={index} content={e?.donVi} />,
        <ItemInfor key={index} content={e?.danhSachVaiTro?.join(', ')} />,
        ...(tinhDiem
          ? [<ItemInfor key={index} content={diemQD ? `${diemQD} điểm` : ''} />]
          : []),
        ...(!tinhTheoTungNam
          ? [<ItemInfor key={index} content={gioQD ? `${gioQD} giờ` : ''} />]
          : []),
      ];
    }) ?? [];

  return (
    <>
      <Box
        borderColor="rgba(171, 171, 171, 0.4)"
        borderBottomWidth={isLast ? 0 : 0.5}
        justifyContent="space-between"
        flexDirection="column"
        alignItems="flex-start"
        paddingTop={HEIGHT(16)}
        paddingBottom={HEIGHT(16)}>
        <Text
          color={'#161616'}
          fontFamily={R.fonts.BeVietnamProRegular}
          lineHeight={getLineHeight(18)}
          marginBottom={HEIGHT(12)}>
          {label}
        </Text>
        {value?.length > 0 ? (
          <BaseTableComponent
            tableHead={tableahead}
            tableData={tableData}
            widthArr={widthArr}
          />
        ) : (
          <ItemTrong customStyle={{ marginBottom: 0, marginTop: 0 }} />
        )}
      </Box>
      {visibleMinhChungChiaGio && (
        <Box
          borderColor="rgba(171, 171, 171, 0.4)"
          justifyContent="space-between"
          flexDirection="column"
          alignItems="flex-start"
          paddingTop={HEIGHT(16)}
          paddingBottom={HEIGHT(16)}>
          <Text
            color={'#161616'}
            fontFamily={R.fonts.BeVietnamProRegular}
            lineHeight={getLineHeight(18)}>
            Minh chứng chia giờ
          </Text>
          <FlatList
            data={data?.danhSachMinhChung}
            extraData={data}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={({ item, index }) => {
              const nameFile = item?.replace(REGEX_FILE_NAME_URL, '');

              return (
                <Link
                  marginTop={HEIGHT(12)}
                  key={index}
                  _text={{
                    fontSize: 'xs',
                    fontFamily: R.fonts.BeVietnamProMedium,
                    color: 'blue.400',
                  }}
                  isUnderlined
                  onPress={() => showLink(item)}>
                  {nameFile}
                </Link>
              );
            }}
          />
        </Box>
      )}
    </>
  );
};

export default RenderTableThanhVien;
