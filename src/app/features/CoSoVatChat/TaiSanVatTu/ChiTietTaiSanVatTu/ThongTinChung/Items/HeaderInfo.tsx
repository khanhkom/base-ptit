/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import R from '@assets/R';
import { WIDTH } from '@common';
import ItemLabel from '@components/Item/ItemLabel';
import { getListTinhTrangSuDung } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { Box, FlatList } from 'native-base';

const HeaderInfo = ({ itemTaiSan }: any) => {
  const [listTinhTrang, setListTinhTrang] = useState<any[]>([]);

  const getData = async () => {
    try {
      const resTinhTrang = await getListTinhTrangSuDung();

      setListTinhTrang(resTinhTrang?.data ?? []);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const listData = [
    {
      label: 'Tên tài sản',
      value: itemTaiSan?.ten || translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Số hiệu TSCĐ',
      value: itemTaiSan?.soHieuTSCD || translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Loại tài sản',
      value: itemTaiSan?.loaiTaiSan?.ten || translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Trạng thái mượn',
      value: itemTaiSan?.trangThaiMuon || translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Tình trạng sử dụng',
      value:
        listTinhTrang?.find(
          itemTT => itemTT?.ma === itemTaiSan?.maTinhTrangSuDung,
        )?.tinhTrangSuDung || translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Phòng sử dụng',
      value: itemTaiSan?.maPhongDangSuDung || translate('slink:Chua_cap_nhat'),
    },
    {
      label: 'Ảnh minh họa',
      value: itemTaiSan?.anhMinhHoaUrl
        ? 'Xem chi tiết'
        : translate('slink:Chua_cap_nhat'),
      link: itemTaiSan?.anhMinhHoaUrl,
    },
  ];

  return (
    <Box
      paddingLeft={WIDTH(16)}
      paddingRight={WIDTH(16)}
      mb={'6'}
      mt={'2'}
      borderRadius={WIDTH(8)}
      width={WIDTH(343)}
      backgroundColor={R.colors.white}
      style={{ ...R.themes.shadowOffset }}
      alignSelf="center">
      <FlatList
        data={listData}
        key={'ghiChu'}
        renderItem={({ item, index }) => {
          return (
            <ItemLabel
              label={item?.label}
              value={item?.value}
              isLast={index === listData?.length - 1}
              link={item?.link}
              style={{ width: WIDTH(300) }}
            />
          );
        }}
      />
    </Box>
  );
};

export default HeaderInfo;
