import React from 'react';

import { WIDTH } from '@common';
import { Box, FlatList } from 'native-base';

import RenderItemValue from './RenderItemValue';

import { DanhSachBuocXuLyProps, LichSuKhaiBaoProps } from '../type';
interface Props {
  data: LichSuKhaiBaoProps;
  buocHienTai: DanhSachBuocXuLyProps;
}
const PreviewQuyTrinh = (props: Props) => {
  const { data, buocHienTai } = props;

  const infoKhaiBao = data?.danhSachKhaiBao?.find(
    item => item?.ma === buocHienTai?.maFormKhaiBao,
  );

  const chiTietInfoKhaiBao =
    infoKhaiBao?.danhSachKhaiBaoArchive?.find(
      item => item?.maBuoc === buocHienTai?.ma,
    ) ?? infoKhaiBao;

  const formKhaiBao = data?.quyTrinh?.danhSachFormKhaiBao?.find(
    item => item?.ma === buocHienTai?.maFormKhaiBao,
  );

  const formKhaiBaoWithValue =
    formKhaiBao?.cauHinhLoaiHinh?.map(item => {
      const value = chiTietInfoKhaiBao?.thongTinKhaiBao?.[item?.ma];

      return { ...item, value };
    }) ?? [];

  return (
    <Box width={WIDTH(343)} alignSelf="center">
      <FlatList
        data={formKhaiBaoWithValue}
        extraData={buocHienTai}
        key={'ghiChu'}
        renderItem={({ item, index }) => (
          <RenderItemValue
            item={item}
            index={index}
            formKhaiBaoWithValue={formKhaiBaoWithValue}
          />
        )}
      />
    </Box>
  );
};

export default PreviewQuyTrinh;
