/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import R from '@assets/R';
import { HEIGHT, MOI_QUAN_HE_BAN_THAN, WIDTH } from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import ItemLabel from '@components/Item/ItemLabel';
import ItemInfor from '@libcomponents/ItemTable';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { FlatList, ScrollView, Text, useTheme } from 'native-base';

import { KeKhaiTaiSanProps } from '../type';

const ThongTinChung = ({
  detailKeKhai,
}: {
  detailKeKhai: KeKhaiTaiSanProps | any;
}) => {
  const theme = useTheme();

  const thongTinNhanSu = detailKeKhai?.thongTinNhanSu ?? detailKeKhai;

  const namSinh = thongTinNhanSu?.ngaySinh
    ? moment(thongTinNhanSu?.ngaySinh, 'YYYY-MM-DD').format('DD/MM/YYYY')
    : '';

  const thongTinVoChong = thongTinNhanSu?.danhSachQuanHeGiaDinhVeBanThan?.find(
    item => {
      return (
        item?.moiQuanHe === MOI_QUAN_HE_BAN_THAN[5] ||
        item?.moiQuanHe === MOI_QUAN_HE_BAN_THAN[6]
      );
    },
  );

  const thongTinConCai = thongTinNhanSu?.danhSachQuanHeGiaDinhVeBanThan?.filter(
    item => {
      return (
        item?.moiQuanHe === MOI_QUAN_HE_BAN_THAN[7] ||
        item?.moiQuanHe === MOI_QUAN_HE_BAN_THAN[8]
      );
    },
  );

  const diaChi = [
    thongTinNhanSu?.hoKhauSoNha,
    thongTinNhanSu?.hoKhauXaTen,
    thongTinNhanSu?.hoKhauQuanTen,
    thongTinNhanSu?.hoKhauThanhPhoTen,
  ]?.filter(item => !!item);

  const listInfoTop = [
    {
      label: translate('slink:Fullname'),
      value: thongTinNhanSu?.hoTen || '',
    },
    { label: 'Năm sinh', value: namSinh },
    {
      label: 'Chức vụ/ Chức danh công tác',
      value: detailKeKhai?.tenChucVu ?? (detailKeKhai?.chucVuChinh?.ten || ''),
      multiLine:
        detailKeKhai?.tenChucVu ?? detailKeKhai?.chucVuChinh?.ten
          ? true
          : false,
    },
    {
      label: 'Cơ quan/ đơn vị công tác',
      value: detailKeKhai?.tenDonVi ?? (detailKeKhai?.tenDonViTuyenDung || ''),
    },
    {
      label: 'Nơi thường trú',
      value: diaChi?.join(' - '),
      multiLine: diaChi?.length === 0 ? false : true,
    },
    { label: 'CCCD/CMND', value: thongTinNhanSu?.cccdCMND || '' },
    {
      label: 'Ngày cấp',
      value: thongTinNhanSu?.ngayCap
        ? moment(thongTinNhanSu?.ngayCap).format('DD/MM/YYYY')
        : '',
    },
    { label: 'Nơi cấp', value: thongTinNhanSu?.noiCap || '' },
  ];

  const listInfoBottom = [
    { label: translate('slink:Ho_ten'), value: thongTinVoChong?.hoVaTen || '' },
    {
      label: 'Năm sinh',
      value: `${thongTinVoChong?.ngaySinh || ''}/${
        thongTinVoChong?.thangSinh || ''
      }/${thongTinVoChong?.namSinh || ''}`,
    },
    { label: 'Nghề nghiệp', value: thongTinVoChong?.ngheNghiep || '' },
    { label: 'Nơi làm việc', value: thongTinVoChong?.noiCongTac || '' },
    { label: 'Nơi thường trú', value: thongTinVoChong?.noiThuongTru || '' },
    { label: 'CCCD/CMND', value: thongTinVoChong?.cccdCMND || '' },
    {
      label: 'Ngày cấp',
      value: thongTinVoChong?.ngayCap
        ? moment(thongTinVoChong?.ngayCap).format('DD/MM/YYYY')
        : '',
    },
    { label: 'Nơi cấp', value: thongTinVoChong?.noiCap || '' },
  ];

  const tableHead = [
    translate('slink:No'),
    translate('slink:Fullname'),
    translate('slink:Date_of_birth'),
    'Nơi thường trú',
    'Số CCCD',
  ];

  const widthArr = [WIDTH(61), WIDTH(105), WIDTH(107), WIDTH(207), WIDTH(107)];

  const tableData =
    thongTinConCai?.map((item: any, index: number) => {
      const dataRow = [
        <ItemInfor content={index + 1} key={index} />,
        <ItemInfor content={item?.hoVaTen || '--'} key={index} />,
        <ItemInfor
          content={`${item?.ngaySinh || '--'}/${item?.thangSinh || '--'}/${
            item?.namSinh || '--'
          }`}
          key={index}
        />,
        <ItemInfor content={item?.noiThuongTru || '--'} key={index} />,
        <ItemInfor content={item?.cccdCMND || '--'} key={index} />,
      ];

      return dataRow;
    }) ?? [];

  return (
    <ScrollView>
      {/* <TextTitleTCNS
        label={`I. ${translate('slink:General_information').toUpperCase()}`}
        onPress={() => {
          setexpand(!expand);
        }}
        expand={expand}
      /> */}
      {/* <Collapse isOpen={expand} width={getWidth()}> */}
      <FlatList
        w={'full'}
        scrollEnabled={false}
        ListHeaderComponent={
          <Text
            marginY={'2'}
            flex={1}
            fontFamily={R.fonts.BeVietnamProMedium}
            fontSize={'xs'}
            color={'black'}>
            {'1. Người kê khai tài sản, thu nhập'}
          </Text>
        }
        contentContainerStyle={{
          paddingHorizontal: WIDTH(16),
        }}
        data={listInfoTop}
        nestedScrollEnabled={false}
        renderItem={({ item, index }) => (
          <ItemLabel
            style={{ paddingTop: HEIGHT(12), paddingBottom: HEIGHT(12) }}
            textLabel={{ fontSize: theme.fontSizes.xs }}
            textValue={{ fontSize: theme.fontSizes.xs }}
            label={item?.label}
            value={item?.value}
            multiLine={item?.multiLine}
            isLast={index === listInfoTop?.length - 1}
          />
        )}
      />
      <FlatList
        w={'full'}
        scrollEnabled={false}
        data={listInfoBottom}
        ListHeaderComponent={
          <Text
            marginY={'2'}
            flex={1}
            fontFamily={R.fonts.BeVietnamProMedium}
            fontSize={'xs'}
            color={'black'}>
            {'2. Vợ hoặc chồng của người kê khai tài sản, thu nhập'}
          </Text>
        }
        contentContainerStyle={{ paddingHorizontal: WIDTH(16) }}
        nestedScrollEnabled={false}
        renderItem={({ item, index }) => (
          <ItemLabel
            style={{ paddingTop: HEIGHT(12), paddingBottom: HEIGHT(12) }}
            textLabel={{ fontSize: theme.fontSizes.xs }}
            textValue={{ fontSize: theme.fontSizes.xs }}
            label={item?.label}
            value={item?.value}
            isLast={index === listInfoBottom?.length - 1}
          />
        )}
      />
      <Text
        marginY={'2'}
        ml={'4'}
        flex={1}
        fontFamily={R.fonts.BeVietnamProMedium}
        fontSize={'xs'}
        color={'black'}>
        {
          '3. Con chưa thành niên (con đẻ, con nuôi theo quy định của pháp luật)'
        }
      </Text>
      <BaseTableComponent
        tableHead={tableHead}
        widthArr={widthArr}
        tableData={tableData}
      />
      {/* </Collapse> */}
    </ScrollView>
  );
};

export default ThongTinChung;
