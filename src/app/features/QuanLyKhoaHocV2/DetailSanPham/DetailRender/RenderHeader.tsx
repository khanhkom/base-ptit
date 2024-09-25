/* eslint-disable no-nested-ternary */
import React from 'react';

import { ELoaiThoiGianThucHien, ELoaiTruongThongTinTinh } from '@common';
import ItemLabel from '@components/Item/ItemLabel';
import {
  KetQuaKhaiBaoProps,
  LoaiHinhNCKHProps,
} from '@features/QuanLyKhoaHocV2/type';
import moment from 'moment';
import { Box } from 'native-base';
interface Props {
  dataLoaiHinh?: LoaiHinhNCKHProps;
  data: KetQuaKhaiBaoProps;
}
const RenderHeader = (props: Props) => {
  const { dataLoaiHinh, data } = props;

  const visibleFromTo =
    !dataLoaiHinh?.danhSachCauHinhTruongThongTinTinh?.find(
      item =>
        item.loaiTruongThongTinTinh ===
          ELoaiTruongThongTinTinh.THOI_GIAN_BAT_DAU ||
        item.loaiTruongThongTinTinh ===
          ELoaiTruongThongTinTinh.THOI_GIAN_KET_THUC,
    )?.maTruongThongTinDungSau &&
    dataLoaiHinh &&
    [
      ELoaiThoiGianThucHien.NAM,
      ELoaiThoiGianThucHien.NGAYTHANGNAM,
      ELoaiThoiGianThucHien.THANGNAM,
    ].includes(dataLoaiHinh?.loaiThoiGianThucHien);

  const visibleTime =
    !dataLoaiHinh?.danhSachCauHinhTruongThongTinTinh?.find(
      item =>
        item.loaiTruongThongTinTinh === ELoaiTruongThongTinTinh.MOC_THOI_GIAN,
    )?.maTruongThongTinDungSau &&
    dataLoaiHinh &&
    [
      ELoaiThoiGianThucHien.THOIGIANCUTHE_DDMMYYYY,
      ELoaiThoiGianThucHien.THOIGIANCUTHE_MMYYYY,
      ELoaiThoiGianThucHien.THOIGIANCUTHE_YYYY,
    ].includes(dataLoaiHinh?.loaiThoiGianThucHien);

  const formatTimeFrT =
    dataLoaiHinh?.loaiThoiGianThucHien === ELoaiThoiGianThucHien.NAM
      ? 'YYYY'
      : dataLoaiHinh?.loaiThoiGianThucHien === ELoaiThoiGianThucHien.THANGNAM
      ? 'MM/YYYY'
      : 'DD/MM/YYYY';

  const valueTimeFrT = `${
    data?.thongTinThoiGian?.start
      ? moment(data?.thongTinThoiGian?.start).format(formatTimeFrT)
      : '--'
  } - ${
    data?.thongTinThoiGian?.end
      ? moment(data?.thongTinThoiGian?.end).format(formatTimeFrT)
      : '--'
  }`;

  const formatTime =
    dataLoaiHinh?.loaiThoiGianThucHien ===
    ELoaiThoiGianThucHien.THOIGIANCUTHE_YYYY
      ? 'YYYY'
      : dataLoaiHinh?.loaiThoiGianThucHien ===
        ELoaiThoiGianThucHien.THOIGIANCUTHE_MMYYYY
      ? 'MM/YYYY'
      : 'DD/MM/YYYY';

  const valueTime = `${
    data?.thongTinThoiGian?.timeline
      ? moment(data?.thongTinThoiGian?.timeline).format(formatTime)
      : '--'
  }`;

  return (
    <Box>
      {visibleFromTo && (
        <ItemLabel
          label={`${dataLoaiHinh.startLabel} - ${dataLoaiHinh.endLabel}`}
          value={valueTimeFrT}
          multiLine
          isLast={false}
        />
      )}
      {visibleTime && (
        <ItemLabel
          label={dataLoaiHinh?.timelineLabel}
          value={valueTime}
          multiLine
          isLast={false}
        />
      )}
    </Box>
  );
};

export default RenderHeader;
