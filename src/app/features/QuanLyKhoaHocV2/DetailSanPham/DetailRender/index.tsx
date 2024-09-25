/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';

import R from '@assets/R';
import {
  EKieuDuLieu,
  ELoaiTruongThongTinTinh,
  getLineHeight,
  HEIGHT,
  MapKeyLoaiThoiGianThucHien,
  MapModeTime,
  WIDTH,
} from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import ItemLabel from '@components/Item/ItemLabel';
import ItemTableQTD from '@components/QuyTrinhDong/component/ItemTableQTD';
import { CauHinhLoaiHinhProps } from '@features/KhaiBaoQuyTrinh/type';
import {
  CauHinhTruongThongTinTinhProps,
  KetQuaKhaiBaoProps,
  LoaiHinhNCKHProps,
} from '@features/QuanLyKhoaHocV2/type';
import ItemInfor from '@libcomponents/ItemTable';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Box, ScrollView, Text } from 'native-base';

import RenderFooter from './RenderFooter';
import RenderHeader from './RenderHeader';
import RenderTableThanhVien from './RenderTableThanhVien';
interface Props {
  dataLoaiHinh?: LoaiHinhNCKHProps;
  data: KetQuaKhaiBaoProps;
}
const DetailRender = (props: Props) => {
  const { data, dataLoaiHinh } = props;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <RenderHeader {...props} />
      {dataLoaiHinh?.cauHinhLoaiHinh?.map(item => {
        return (
          <ItemRender
            dataLoaiHinh={dataLoaiHinh}
            data={data}
            cauHinhLoaiHinh={item}
          />
        );
      })}
      <RenderFooter {...props} />
    </ScrollView>
  );
};

export default DetailRender;
const ItemRender = ({
  data,
  cauHinhLoaiHinh,
  dataLoaiHinh,
}: {
  data: KetQuaKhaiBaoProps;
  dataLoaiHinh: LoaiHinhNCKHProps;
  cauHinhLoaiHinh: CauHinhLoaiHinhProps;
}) => {
  let value: any = data?.thongTinKhaiBao?.find(
    item => item?.ma === cauHinhLoaiHinh?.ma,
  )?.value;

  const label = cauHinhLoaiHinh?.ten ?? '';

  const renderThongTinhTinh =
    dataLoaiHinh?.danhSachCauHinhTruongThongTinTinh?.filter(
      e => e.maTruongThongTinDungSau === cauHinhLoaiHinh?.ma && e?.display,
    ) ?? [];

  const fieldLienQuan = cauHinhLoaiHinh?.truongThongTinLienQuan;

  const valueCha: any = data?.thongTinKhaiBao?.find(
    item => item?.ma === fieldLienQuan,
  )?.value;

  const checkTruongThongTinLienQuan = useMemo(() => {
    let check = false;
    if (!cauHinhLoaiHinh?.truongThongTinLienQuan) {
      return true;
    }

    if (valueCha === cauHinhLoaiHinh?.giaTriLienQuan) {
      return true;
    }

    if (cauHinhLoaiHinh.giaTriLienQuan.includes) {
      if (cauHinhLoaiHinh?.giaTriLienQuan?.includes(valueCha)) {
        return true;
      }

      if (valueCha?.map) {
        valueCha?.map((item: any) => {
          if (cauHinhLoaiHinh?.giaTriLienQuan?.includes(item)) {
            check = true;
          }
        });
      }
    }

    return check;
  }, [
    cauHinhLoaiHinh?.truongThongTinLienQuan,
    cauHinhLoaiHinh?.giaTriLienQuan,
    valueCha,
  ]);

  if (!checkTruongThongTinLienQuan) {
    return null;
  }

  if (cauHinhLoaiHinh?.kieuDuLieu === EKieuDuLieu.TABLE) {
    return <ItemTable value={value} cauHinhLoaiHinh={cauHinhLoaiHinh} />;
  }

  switch (cauHinhLoaiHinh?.kieuDuLieu) {
    case EKieuDuLieu.BOOLEAN:
      value = value ? 'Có' : 'Không';

      break;
    case EKieuDuLieu.DATE:
    case EKieuDuLieu.HOUR:
    case EKieuDuLieu.MONTH:
      value = value
        ? moment(value)?.format(MapModeTime?.(cauHinhLoaiHinh?.kieuDuLieu))
        : '';

      break;

    case EKieuDuLieu.DANHMUC:
      value =
        cauHinhLoaiHinh?.laDangMang && Array.isArray(value)
          ? value?.join(', ')
          : value;
      break;
    case EKieuDuLieu.MULTI_CHOICES:
      value = value?.join(', ');

      break;

    default:
      break;
  }

  const multiline = (value + label)?.length > 40;

  return (
    <>
      <ItemLabel
        value={value}
        label={label}
        multiLine={multiline}
        isLast={false}
      />
      {renderThongTinhTinh?.map(item => {
        return (
          <ItemTinh
            data={data}
            dataLoaiHinh={dataLoaiHinh}
            itemTinh={item}
            multiLine={multiline}
            isLast={false}
          />
        );
      })}
    </>
  );
};

const ItemTinh = (props: {
  data: KetQuaKhaiBaoProps;
  dataLoaiHinh: LoaiHinhNCKHProps;
  multiLine: boolean;
  itemTinh: CauHinhTruongThongTinTinhProps;
  isLast: boolean;
}) => {
  const { data, dataLoaiHinh, multiLine, isLast, itemTinh } = props;

  const visibleMinhChungChiaGio =
    data?.soLuongThanhVien &&
    data?.soLuongThanhVien > 1 &&
    dataLoaiHinh?.danhSachCauHinhTruongThongTinTinh?.find(
      item =>
        item.loaiTruongThongTinTinh ===
        ELoaiTruongThongTinTinh.MINH_CHUNG_CHIA_GIO,
    )?.display !== false;

  switch (itemTinh?.loaiTruongThongTinTinh) {
    case ELoaiTruongThongTinTinh.MOC_THOI_GIAN: {
      const valueTimeLine = data?.thongTinThoiGian?.timeline
        ? moment(data?.thongTinThoiGian?.timeline).format(
            MapKeyLoaiThoiGianThucHien?.[dataLoaiHinh?.loaiThoiGianThucHien],
          )
        : '';

      return (
        <ItemLabel
          value={valueTimeLine}
          label={itemTinh?.label}
          multiLine={multiLine}
          isLast={isLast}
        />
      );
    }

    case ELoaiTruongThongTinTinh.DANH_SACH_THANH_VIEN:
      return (
        <RenderTableThanhVien
          visibleMinhChungChiaGio={visibleMinhChungChiaGio}
          data={data}
          loaiHinh={dataLoaiHinh}
          label={itemTinh?.label}
        />
      );

    default:
      return null;
  }
};

const ItemTable = ({
  value,
  cauHinhLoaiHinh,
  isLast,
}: {
  cauHinhLoaiHinh: CauHinhLoaiHinhProps;
  value: any;
  isLast?: boolean;
}) => {
  const headerVisible = cauHinhLoaiHinh?.danhSachCot?.filter(
    e =>
      cauHinhLoaiHinh?.danhSachCotHienThi?.length === 0 ||
      cauHinhLoaiHinh?.danhSachCotHienThi?.includes(e?.ma),
  );

  const labelHeaderVisible = headerVisible?.map(e => e?.ten) ?? [];

  const tableahead = [translate('slink:No'), ...labelHeaderVisible];

  const widthArr = [
    WIDTH(43),
    ...Array(tableahead?.length - 1).fill(WIDTH(150)),
  ];

  const tableData = value?.map((item: any, index: number) => {
    const dataItem = headerVisible?.map(e => {
      return { ...e, value: item?.[e?.ma] };
    });

    const tableDataS =
      dataItem?.map(e => {
        return <ItemTableQTD key={index} info={e} />;
      }) ?? [];

    return [
      <ItemInfor key={index} content={String(index + 1)} />,
      ...tableDataS,
    ];
  });

  return (
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
        {cauHinhLoaiHinh?.ten}
      </Text>
      {tableData?.length > 0 && (
        <BaseTableComponent
          tableHead={tableahead}
          tableData={tableData}
          widthArr={widthArr}
        />
      )}
    </Box>
  );
};
