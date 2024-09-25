import React from 'react';

import R from '@assets/R';
import {
  ELoaiTruongThongTinTinh,
  getLineHeight,
  HEIGHT,
  REGEX_FILE_NAME_URL,
  showLink,
} from '@common';
import {
  KetQuaKhaiBaoProps,
  LoaiHinhNCKHProps,
} from '@features/QuanLyKhoaHocV2/type';
import { translate } from '@utils/i18n/translate';
import { Box, FlatList, Link, Text } from 'native-base';

import RenderTableThanhVien from './RenderTableThanhVien';
interface Props {
  dataLoaiHinh?: LoaiHinhNCKHProps;
  data: KetQuaKhaiBaoProps;
}
const RenderFooter = (props: Props) => {
  const { data, dataLoaiHinh } = props;

  const visibleDSTV = !dataLoaiHinh?.danhSachCauHinhTruongThongTinTinh?.find(
    item =>
      item.loaiTruongThongTinTinh ===
      ELoaiTruongThongTinTinh.DANH_SACH_THANH_VIEN,
  )?.maTruongThongTinDungSau;

  const label =
    dataLoaiHinh?.danhSachCauHinhTruongThongTinTinh?.find(
      item =>
        item.loaiTruongThongTinTinh ===
        ELoaiTruongThongTinTinh.DANH_SACH_THANH_VIEN,
    )?.label ?? translate('slink:List_member');

  const visibleMinhChungChiaGio =
    data?.soLuongThanhVien &&
    data?.soLuongThanhVien > 1 &&
    dataLoaiHinh?.danhSachCauHinhTruongThongTinTinh?.find(
      item =>
        item.loaiTruongThongTinTinh ===
        ELoaiTruongThongTinTinh.MINH_CHUNG_CHIA_GIO,
    )?.display !== false;

  if (visibleDSTV) {
    return (
      <>
        <RenderTableThanhVien
          data={data}
          loaiHinh={dataLoaiHinh}
          label={label}
        />
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
              {translate('slink:Proof_time_division')}
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
  }

  return null;
};

export default RenderFooter;
