/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @flow
import React from 'react';

import FastImage from 'react-native-fast-image';

import R from '@assets/R';
import { HEIGHT, showImage } from '@common';
import ItemLabel from '@components/Item/ItemLabel';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import {
  Center,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';

import styles from './styles';

const HoSo = ({ infoUser, getColor }: any) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <VStack space={HEIGHT(10)}>
        <AnhDaiDien
          url={infoUser?.urlAnhDaiDien}
          gioiTinh={infoUser?.gioiTinh}
        />
        <Center>
          <Text style={styles.textLabel}>
            Trạng thái hồ sơ:{' '}
            <Text color={getColor(infoUser?.trangThaiChinhSua)}>
              {infoUser?.trangThaiChinhSua}
            </Text>
          </Text>
        </Center>
        <InfoUser infoUser={infoUser} />
      </VStack>
    </ScrollView>
  );
};

export default HoSo;

const AnhDaiDien = ({
  url,
  gioiTinh,
}: {
  url?: string;
  gioiTinh?: 'Nam' | 'Nữ';
}) => {
  const sourceImg = url
    ? { uri: url }
    : gioiTinh === 'Nam'
    ? R.images.giangVienNam
    : R.images.giangVienNu;

  return (
    <Pressable
      _pressed={R.themes.pressed}
      onPress={() => showImage([{ source: sourceImg, title: '' }])}
      style={styles.img}>
      <FastImage style={styles.ava} source={sourceImg} resizeMode="contain" />
    </Pressable>
  );
};

const InfoUser = ({ infoUser }: any) => {
  const listData = [
    {
      label: translate('hoSoNhanSu:maCanBo'),
      value: infoUser?.maCanBo || '--',
    },
    {
      label: translate('hoSoNhanSu:donViQuanLy'),
      value: infoUser?.donViChinh?.ten || '--',
    },
    {
      label: translate('hoSoNhanSu:viTriChucDanh'),
      value: infoUser?.donViViTri?.tenChucVu || '--',
    },
    {
      label: translate('hoSoNhanSu:hoDem'),
      required: true,
      value: infoUser?.hoDem || '--',
    },
    {
      label: translate('hoSoNhanSu:ten'),
      required: true,
      value: infoUser?.ten || '--',
    },
    {
      label: translate('hoSoNhanSu:tenGoiKhac'),
      value: infoUser?.tenGoiKhac || '--',
    },
    {
      label: translate('slink:Date_of_birth'),
      value: infoUser?.ngaySinh
        ? moment(infoUser?.ngaySinh).format('DD-MM-YYYY')
        : '--',
    },
    {
      label: translate('hoSoNhanSu:cccdCMND'),
      required: true,
      value: infoUser?.cccdCMND || '--',
    },
    {
      label: translate('hoSoNhanSu:ngayCap'),
      value: infoUser?.ngayCap
        ? moment(infoUser?.ngayCap).format('DD-MM-YYYY')
        : '--',
    },
    {
      label: translate('hoSoNhanSu:noiCap'),
      value: infoUser?.noiCap || '--',
    },

    {
      label: translate('slink:Gender'),
      required: true,
      value: infoUser?.gioiTinh || '--',
    },
    {
      label: translate('hoSoNhanSu:quocTichId'),
      value: infoUser?.tenQuocTich || '--',
    },
    {
      label: translate('hoSoNhanSu:tonGiaoId'),
      value: infoUser?.tenDanToc || '--',
    },
    {
      label: translate('hoSoNhanSu:maTonGiao'),
      value: infoUser?.tenTonGiao || '--',
    },
    {
      label: `${translate('hoSoNhanSu:hocHam')} (${translate(
        'hoSoNhanSu:caoNhat',
      )})`,
      required: true,
      value: infoUser?.hocHam || '--',
    },
    {
      label: `${translate('hoSoNhanSu:trinhDoDaoTao')} (${translate(
        'hoSoNhanSu:caoNhat',
      )})`,
      required: true,
      value: infoUser?.trinhDoDaoTao || '--',
      numberOfLines: 2,
    },
    {
      label: `${translate('hoSoNhanSu:nganhDaoTao')}`,
      required: true,
      value: infoUser?.nganh || '--',
    },
    {
      label: translate('hoSoNhanSu:emailCanBo'),
      required: true,
      value: infoUser?.emailCanBo || '--',
    },
    {
      label: translate('hoSoNhanSu:email'),
      required: true,
      value: infoUser?.email || '--',
    },
    {
      label: translate('slink:Phone_number'),
      value: infoUser?.sdtCaNhan || '--',
    },
    {
      label: translate('hoSoNhanSu:trangThai'),
      value: infoUser?.trangThai || '--',
    },

    {
      label: translate('hoSoNhanSu:loaiCanBoGiangVien'),
      value: infoUser?.loaiCanBoGiangVien || '--',
      numberOfLines: 2,
    },
    {
      label: translate('hoSoNhanSu:nghiPhepTheoLuatLaoDong'),
      value:
        typeof infoUser?.tinhNghiPhep === 'boolean'
          ? infoUser?.tinhNghiPhep
            ? translate('hoSoNhanSu:duocNghiPhep')
            : translate('hoSoNhanSu:khongDuocNghiPhep')
          : '--',
      numberOfLines: 2,
    },
    ...(infoUser?.loaiCanBoGiangVien === 'Viên chức'
      ? [
          {
            label: translate('hoSoNhanSu:soHieuVienChuc'),
            value: infoUser?.soHieuVienChuc || '--',
          },
        ]
      : []),
    {
      label: translate('hoSoNhanSu:ngayTuyenDung'),
      value: infoUser?.ngayTuyenDung
        ? moment(infoUser?.ngayTuyenDung).format('DD-MM-YYYY')
        : '--' || '--',
      numberOfLines: 2,
    },
    {
      label: translate('hoSoNhanSu:soSoBHXH'),
      value: infoUser?.soSoBHXH || '--',
      numberOfLines: 2,
    },
    {
      label: translate('hoSoNhanSu:isNganSach'),
      value: infoUser?.isNganSach
        ? 'Tính theo ngân sách'
        : 'Không tính theo ngân sách',
      numberOfLines: 2,
    },
    {
      label: translate('hoSoNhanSu:isThuocDienKeKhaiHangNam'),
      value: infoUser?.isThuocDienKeKhaiHangNam
        ? 'Thuộc diện kê khai'
        : 'Không thuộc diện kê khai',
      numberOfLines: 2,
    },
  ];

  return (
    <FlatList
      style={styles.contentBox}
      data={listData}
      scrollEnabled={false}
      bounces={false}
      nestedScrollEnabled={false}
      renderItem={({ item, index }) => (
        <ItemLabel
          label={item?.label}
          value={item?.value}
          textLabel={styles.textLabel2}
          isLast={index === listData?.length - 1}
          numberOfLines={item?.numberOfLines ?? 1}
        />
      )}
    />
  );
};
