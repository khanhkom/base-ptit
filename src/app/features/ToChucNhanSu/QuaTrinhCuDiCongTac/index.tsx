/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';

import R from '@assets/R';
import { formatVND, WIDTH } from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import SkeletonTable from '@components/HoSoNhanSu/SkeletonTable';
import ItemTrong from '@components/Item/ItemTrong';
import ModalChiTietNhanSu from '@features/HoSoNhanSu/componentTab/ModalChiTiet';
import HeaderReal from '@libcomponents/header-real';
import ItemInfor from '@libcomponents/ItemTable';
import { getQuaTrinhCuDiCongTac, getQuocGia } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Box } from 'native-base';

import styles from './styles';

const QuaTrinhCuDiCongTac = () => {
  const [loading, setloading] = useState(false);

  const [listData, setlistData] = useState<any[]>([]);

  const [isVisible, setisVisible] = useState(false);

  const [listQuocGia, setlistQuocGia] = useState<any[]>([]);

  const [dataShow, setdataShow] = useState<any>([]);

  const tableHead = [
    // translate('slink:No'),
    translate('slink:Type_of_work'),
    translate('slink:Place_of_work'),
    translate('slink:FromDate'),
    // translate('slink:ToDate'),
    // translate('slink:Decision_number'),
  ];

  const widthArr = [
    // WIDTH(60),
    WIDTH(105),
    WIDTH(140),
    WIDTH(130),
    // WIDTH(100),
    // WIDTH(100),
  ];

  useEffect(() => {
    initExtraData();

    getData();
  }, []);

  const initExtraData = async () => {
    try {
      setloading(true);

      const res: any = await getQuocGia();

      setlistQuocGia(res?.data?.data ?? []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const getData = async () => {
    try {
      setloading(true);

      const body = {
        page: 1,
        limit: 10,
      };

      const res = await getQuaTrinhCuDiCongTac(body);

      setlistData(res?.data?.result ?? []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const tableData =
    listData?.map((itemSV: any, indexSV: number) => {
      const dataRow = [
        // <ItemInfor
        //   onPress={() => handleShow(itemSV)}
        //   content={indexSV + 1 ?? '--'}
        //   key={indexSV + 1}
        // />,
        <ItemInfor
          onPress={() => handleShow(itemSV)}
          content={itemSV?.loaiCongTac ?? '--'}
          key={indexSV + 1}
        />,
        <ItemInfor
          onPress={() => handleShow(itemSV)}
          content={itemSV?.donViCongTac ?? '--'}
          key={indexSV + 1}
        />,
        <ItemInfor
          onPress={() => handleShow(itemSV)}
          content={moment(itemSV?.tuNgay).format('DD/MM/YYYY') ?? '--'}
          key={indexSV + 1}
        />,
        // <ItemInfor
        //   onPress={() => handleShow(itemSV)}
        //   content={itemSV?.denNgayFormat ?? '--'}
        //   key={indexSV + 1}
        // />,
        // <ItemInfor
        //   onPress={() => handleShow(itemSV)}
        //   content={itemSV?.soQuyetDinh ?? '--'}
        //   key={indexSV + 1}
        // />,
      ];

      return dataRow;
    }) ?? [];

  const handleShow = (item: any) => {
    setdataShow(modalFormat(item));

    setisVisible(true);
  };

  const modalFormat = (item: any) => [
    { value: item?.hoTen ?? '--', label: translate('slink:Ho_ten') },
    {
      value: item?.thongTinNhanSu?.donViChinh?.ten ?? '--',
      label: translate('slink:Unit'),
    },
    {
      value: item?.thongTinNhanSu?.donViViTri?.tenChucVu ?? '--',
      label: 'Vị trí việc làm',
    },
    {
      value: item?.chucVuCongTac ?? '--',
      label: translate('slink:Position_of_work'),
    },
    {
      value: item?.noiDungCongTac ?? '--',
      label: 'Chủ đề công tác',
      mutiline: true,
    },
    {
      value: item?.soQuyetDinh ?? '--',
      label: translate('slink:Decision_number'),
    },
    {
      value: item?.loaiQuyetDinh ?? '--',
      label: translate('slink:Type_of_decision'),
    },
    {
      value: item?.ngayQuyetDinhFormat ?? '--',
      label: translate('slink:Decision_date'),
    },
    {
      value: item?.loaiCongTac ?? '--',
      label: 'Địa điểm công tác',
    },
    item?.loaiCongTac === 'Nước ngoài'
      ? {
          value: item?.quocGiaCongTacId
            ? listQuocGia?.find(
                quocGia => item?.quocGiaCongTacId === quocGia?._id,
              )?.tenQuocTich ?? '--'
            : '--',
          label: translate('slink:Country'),
        }
      : null,
    {
      value: item?.donViCongTac ?? '--',
      label: translate('slink:Place_of_work'),
    },

    { value: item?.diaChi ?? '--', label: translate('slink:Address') },

    {
      value: item?.tuNgayFormat ?? '--',
      label: translate('slink:FromDate'),
    },
    {
      value: item?.denNgayFormat ?? '--',
      label: translate('slink:FromDate'),
    },
    {
      value: item?.giaHanDenNgayFormat ?? '--',
      label: translate('slink:Extended_to'),
    },
    {
      value: item?.nguonKinhPhi ?? '--',
      label: translate('slink:Expense_source'),
    },
    {
      value: item?.kinhPhi ? formatVND(item?.kinhPhi) : '--',
      label: translate('slink:Expense'),
    },
    {
      value: item?.canCu ?? '--',
      label: 'Căn cứ',
      isHtml: true,
    },
    {
      value: item?.fileDinhKemSoQuyetDinh ?? '--',
      label: translate('slink:Attach_decision_num'),
      isLink: true,
    },
    {
      value: item?.ketQuaCongTac ? '✅' : '❌',
      label: translate('slink:Results_business_trips'),
    },
    item?.ketQuaCongTac
      ? {
          value: item?.fileDinhKemKetQuaCongTac ?? '--',

          label: translate('slink:Attach_work_result'),
          isLink: true,
        }
      : null,
  ];

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title={translate('slink:Process_sending_for_business_trip')}
      />
      <Box pt={'6'}>
        {loading ? (
          <SkeletonTable />
        ) : listData?.length > 0 ? (
          <BaseTableComponent
            tableHead={tableHead}
            widthArr={widthArr}
            tableData={tableData}
            contentContainerStyle={styles.content}
          />
        ) : (
          <ItemTrong />
        )}
      </Box>
      <ModalChiTietNhanSu
        isVisible={isVisible}
        data={dataShow}
        closeButton={() => {
          setisVisible(false);
        }}
      />
    </Box>
  );
};

export default QuaTrinhCuDiCongTac;
