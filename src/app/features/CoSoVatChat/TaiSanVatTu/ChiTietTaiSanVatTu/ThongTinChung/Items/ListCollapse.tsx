/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';

import R from '@assets/R';
import { formatVND, getWidth, HEIGHT, WIDTH } from '@common';
import ItemLabel from '@components/Item/ItemLabel';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import {
  Box,
  Collapse,
  Divider,
  FlatList,
  Pressable,
  Text,
  useTheme,
} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

const ListCollapse = ({ itemTaiSan }) => {
  const data = [
    {
      title: 'Thuộc tính tài sản',
      fields: itemTaiSan?.loaiTaiSan?.danhSachThuocTinhLoaiTaiSan?.map(item => {
        return {
          label: item?.tenThuocTinh,
          value: itemTaiSan?.thongTinTaiSan?.[item?.keyThuocTinh]
            ? String(itemTaiSan?.thongTinTaiSan?.[item?.keyThuocTinh])
            : translate('slink:Chua_cap_nhat'),
        };
      }),
    },
    {
      title: 'Thông tin về số tiền và thời gian',
      fields: [
        {
          label: 'Ngày bắt đầu sử dụng',
          value: itemTaiSan?.ngayBatDauSuDung
            ? moment(itemTaiSan?.ngayBatDauSuDung)?.format('DD/MM/YYYY')
            : translate('slink:Chua_cap_nhat'),
        },
        {
          label: 'Ngày thanh lý',
          value: itemTaiSan?.ngayThanhLy
            ? moment(itemTaiSan?.ngayThanhLy)?.format('DD/MM/YYYY')
            : translate('slink:Chua_cap_nhat'),
        },
        {
          label: 'Năm đưa vào sử dụng',
          value: itemTaiSan?.namDuaVaoSuDung
            ? String(itemTaiSan?.namDuaVaoSuDung)
            : translate('slink:Chua_cap_nhat'),
        },
        {
          label: 'Số tiền mua tài sản',
          value: itemTaiSan?.soTienMuaTaiSan
            ? formatVND(itemTaiSan?.soTienMuaTaiSan)
            : translate('slink:Chua_cap_nhat'),
        },
        {
          label: 'Nguyên giá đầu kỳ',
          value: itemTaiSan?.nguyenGiaDauKy
            ? formatVND(itemTaiSan?.nguyenGiaDauKy)
            : translate('slink:Chua_cap_nhat'),
        },
        {
          label: 'Nguyên giá cuối kỳ',
          value: itemTaiSan?.nguyenGiaCuoiKy
            ? formatVND(itemTaiSan?.nguyenGiaCuoiKy)
            : translate('slink:Chua_cap_nhat'),
        },
        {
          label: 'Luỹ kế khấu hao đầu kỳ',
          value: itemTaiSan?.luyKeKhauHaoDauKy
            ? formatVND(itemTaiSan?.luyKeKhauHaoDauKy)
            : translate('slink:Chua_cap_nhat'),
        },
        {
          label: 'Luỹ kế khấu hao cuối kỳ',
          value: itemTaiSan?.luyKeKhauHaoCuoiKy
            ? formatVND(itemTaiSan?.luyKeKhauHaoCuoiKy)
            : translate('slink:Chua_cap_nhat'),
        },
        {
          label: 'Giá trị còn lại đầu kỳ',
          value: itemTaiSan?.phanTramDaHaoMon
            ? formatVND(itemTaiSan?.phanTramDaHaoMon)
            : translate('slink:Chua_cap_nhat'),
        },
        {
          label: 'Giá trị còn lại cuối kỳ',
          value: itemTaiSan?.giaTriConLaiCuoiKy
            ? formatVND(itemTaiSan?.giaTriConLaiCuoiKy)
            : translate('slink:Chua_cap_nhat'),
        },
      ],
    },
    {
      title: 'Thông tin hao mòn',
      fields: [
        {
          label: 'Phần trăm đã hao mòn',
          value: itemTaiSan?.phanTramDaHaoMon
            ? String(itemTaiSan?.phanTramDaHaoMon) + '%'
            : translate('slink:Chua_cap_nhat'),
        },
        {
          label: 'Đã hết hao mòn',
          value: itemTaiSan?.daHaoMonHet ? '✅' : '❌',
        },
      ],
    },
    {
      title: 'Thông tin khấu hao',
      fields: [
        {
          label: 'Phần trăm đã khấu hao',
          value: itemTaiSan?.phanTramDaKhauHao
            ? String(itemTaiSan?.phanTramDaKhauHao) + '%'
            : translate('slink:Chua_cap_nhat'),
        },
        {
          label: 'Đã hết khấu hao',
          value: itemTaiSan?.daKhauHaoHet ? '✅' : '❌',
        },
      ],
    },
  ];

  return (
    <Box
      backgroundColor={'white'}
      borderRadius={WIDTH(8)}
      width={WIDTH(343)}
      mb={'4'}
      style={{ ...R.themes.shadowOffset }}
      alignSelf={'center'}>
      {data?.map((itemfields, index) => {
        const [expand, setexpand] = useState(false);

        return (
          <Box>
            <TextTitle
              label={itemfields?.title}
              onPress={() => {
                setexpand(!expand);
              }}
              expand={expand}
            />
            {data.length - 1 === index || (
              <Divider w={WIDTH(312)} alignSelf={'center'} />
            )}
            <Collapse isOpen={expand} width={getWidth()}>
              <Box
                paddingLeft={WIDTH(16)}
                paddingRight={WIDTH(16)}
                width={getWidth()}
                alignSelf="center">
                <FlatList
                  data={itemfields?.fields}
                  key={'ghiChu'}
                  renderItem={({ item, index }: any) => {
                    return (
                      <ItemLabel
                        label={item?.label}
                        value={item?.value}
                        isLast={index === itemfields?.fields?.length - 1}
                        style={{ width: WIDTH(300) }}
                      />
                    );
                  }}
                />
              </Box>
            </Collapse>
          </Box>
        );
      })}
    </Box>
  );
};

export default ListCollapse;

const TextTitle = (props: any) => {
  const { label, expand, onPress } = props;

  const theme = useTheme();

  return (
    <Pressable
      _pressed={R.themes.pressed}
      disabled={!onPress}
      onPress={onPress}
      paddingX={WIDTH(16)}
      flexDirection={'row'}
      w="full"
      paddingY={HEIGHT(12)}>
      <Text
        fontFamily={R.fonts.BeVietnamProSemiBold}
        fontSize={'md'}
        lineHeight="lg"
        color={'black'}
        w={WIDTH(264)}>
        {label}
      </Text>
      {typeof expand === 'boolean' && (
        <Box alignSelf="center">
          <Entypo
            style={{ marginLeft: WIDTH(16) }}
            color={theme.colors.gray[400]}
            size={WIDTH(20)}
            name={expand ? 'chevron-up' : 'chevron-down'}
          />
        </Box>
      )}
    </Pressable>
  );
};
