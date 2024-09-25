/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react';

import R from '@assets/R';
import {
  EKieuDuLieu,
  getLineHeight,
  HEIGHT,
  MapModeTime,
  tenGiangVien,
  WIDTH,
} from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import ItemLabel from '@components/Item/ItemLabel';
import ItemTableQTD from '@components/QuyTrinhDong/component/ItemTableQTD';
import {
  CauHinhLoaiHinhProps,
  DanhSachBuocXuLyProps,
  LichSuKhaiBaoProps,
} from '@features/KhaiBaoQuyTrinh/type';
import ItemInfor from '@libcomponents/ItemTable';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getDSCanBo } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Box, FlatList, Text } from 'native-base';

interface Props {
  data?: LichSuKhaiBaoProps;
  buocHienTai?: DanhSachBuocXuLyProps;
  dataNew?: Array<any>;
}
const PreviewQuyTrinh = (props: Props) => {
  const { data, buocHienTai, dataNew } = props;

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
        data={dataNew ?? formKhaiBaoWithValue}
        // extraData={buocHienTai}
        key={'ghiChu'}
        renderItem={({ item, index }) => (
          <RenderItem
            item={item}
            index={index}
            formKhaiBaoWithValue={dataNew ?? formKhaiBaoWithValue}
            //chỉ dùng cho phiếu khai báo
          />
        )}
      />
    </Box>
  );
};

export default PreviewQuyTrinh;
const RenderItem = ({ item, index, formKhaiBaoWithValue }: any) => {
  const fieldLienQuan = item?.truongThongTinLienQuan;

  const [valueCanBo, setvalueCanBo] = useState('');

  useEffect(() => {
    item?.kieuDuLieu === EKieuDuLieu.CAN_BO && getInitDSCanBo();
  }, [index]);

  const getInitDSCanBo = async () => {
    try {
      const body = {
        page: 1,
        limit: 20,
        condition: { trangThaiChinhSua: 'Duyệt - đang áp dụng' },
        filters: [
          {
            active: true,
            field: 'ssoId',
            values: [item?.value?.value],
            operator: 'in',
          },
        ],
      };

      const responseDS = await getDSCanBo(body);

      const userInfo = responseDS?.data?.data?.result?.[0];

      userInfo && setvalueCanBo(tenGiangVien(userInfo));
    } catch (error) {}
  };

  const initVal = item?.value ?? item?.value?.value;

  const value =
    item?.kieuDuLieu === EKieuDuLieu.FILE
      ? translate('slink:See_details')
      : item?.kieuDuLieu === EKieuDuLieu.CAN_BO
      ? valueCanBo
      : initVal;

  const valueCha: any = formKhaiBaoWithValue?.find(
    (e: { ma: string }) => e?.ma === fieldLienQuan,
  )?.value;

  const checkTruongThongTinLienQuan = useMemo(() => {
    let check = false;
    if (!item?.truongThongTinLienQuan) {
      return true;
    }

    if (valueCha === item?.giaTriLienQuan) {
      return true;
    }

    if (item.giaTriLienQuan.includes) {
      if (item?.giaTriLienQuan?.includes(valueCha)) {
        return true;
      }

      if (valueCha?.map) {
        valueCha?.map((e: any) => {
          if (item?.giaTriLienQuan?.includes(e)) {
            check = true;
          }
        });
      }
    }

    return check;
  }, [item?.truongThongTinLienQuan, item?.giaTriLienQuan, valueCha]);

  const multiLine =
    item?.label?.length > 28 ||
    value?.length > 28 ||
    value?.length + item?.ten?.length > 50;

  const isLast = formKhaiBaoWithValue?.length - 1 === index;

  if (!checkTruongThongTinLienQuan) {
    return null;
  }

  return item?.kieuDuLieu === EKieuDuLieu.TABLE ? (
    <ItemTable data={item} isLast={isLast} />
  ) : (
    <ItemLabel
      label={item?.ten}
      value={
        item?.kieuDuLieu === EKieuDuLieu.CAN_BO ? valueCanBo : getValue(item)
      }
      link={
        item?.kieuDuLieu === EKieuDuLieu.FILE &&
        (item?.value?.value?.[0] || item?.value?.[0])
      }
      numberOfLines={10}
      multiLine={multiLine}
      isLast={isLast}
    />
  );
};

const ItemTable = ({
  data,
  isLast,
}: {
  data: CauHinhLoaiHinhProps;
  isLast: boolean;
}) => {
  const headerVisible = data?.danhSachCot?.filter(e => {
    if (data?.danhSachCotHienThi?.length === 0) {
      return true;
    }

    return data?.danhSachCotHienThi?.includes(e?.ma);
  });

  const labelHeaderVisible = headerVisible?.map(e => e?.ten) ?? [];

  const tableahead = [translate('slink:No'), ...labelHeaderVisible];

  const widthArr = [
    WIDTH(43),
    ...Array(tableahead?.length - 1).fill(
      tableahead?.length === 2 ? WIDTH(300) : WIDTH(150),
    ),
  ];

  const gotoChiTiet = (index: number) => {
    navigateScreen(APP_SCREEN.VIEWTABLE, {
      item: data,
      dataInit: data?.value?.value?.[index],
    });
  };

  const tableData = data?.value?.value?.map((ite: any, index: number) => {
    const dataItem = headerVisible?.map(e => {
      return { ...e, value: ite?.[e?.ma] };
    });

    const tableDataS =
      dataItem?.map(e => {
        return (
          <ItemTableQTD
            key={index}
            info={e}
            onPress={() => gotoChiTiet(index)}
          />
        );
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
        {data?.ten}
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

const getValue = (item: any) => {
  switch (item?.kieuDuLieu) {
    case EKieuDuLieu.BOOLEAN:
      return item?.value?.value
        ? translate('slink:Yes')
        : translate('slink:Deny');
    case EKieuDuLieu.FILE:
      return translate('slink:See_details');
    case EKieuDuLieu.HOUR:
    case EKieuDuLieu.DATE:
    case EKieuDuLieu.MONTH:
      return moment(item?.value?.value ?? item?.value).format(
        MapModeTime(item?.kieuDuLieu),
      );

    default:
      if (item?.value?.value === null) {
        return '--';
      }

      return item?.value?.value
        ? `${item?.value?.value}`
        : item?.value
        ? `${item?.value}`
        : '--';
  }
};
