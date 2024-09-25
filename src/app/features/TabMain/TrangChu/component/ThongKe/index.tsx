/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';

import Swiper from 'react-native-swiper';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import SingleSelect from '@components/QuyTrinhDong/component/SingleSelect';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { getThongKeDon } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { Box, HStack, Text } from 'native-base';

import DonXinNghiNgoaiGio from './DonXinNghiNgoaiGio';
import DonXinNghiPhep from './DonXinNghiPhep';

import ItemTextBlue from '../ItemTextBlue';
enum TypeDon {
  TypeDonPhep = 'PHEP',
  TypeDonNgoaiGio = 'OT',
}
const ThongKe = () => {
  const [loaiDon, setLoaiDon] = useState<TypeDon>(TypeDon.TypeDonPhep);

  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<any>({});

  useEffect(() => {
    getData(dataPickerThang?.[new Date().getMonth()]?.value);
  }, []);

  const getData = async (thang: string) => {
    try {
      setLoading(true);

      const res: any = await getThongKeDon(Number(thang));

      setData(res?.data?.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Box alignSelf="center">
      <ItemTextBlue label="Thống kê đơn" />
      <Filter onChangeLoaiDon={setLoaiDon} onChangeThang={getData} />
      {loading ? (
        <LoadingComponent loading={loading} />
      ) : (
        <>
          {loaiDon === TypeDon.TypeDonPhep ? (
            <DonXinNghiPhep data={data} />
          ) : (
            <DonXinNghiNgoaiGio data={data} />
          )}
          <ThongKeExtra data={data} />
        </>
      )}
    </Box>
  );
};

export default ThongKe;
const ThongKeExtra = ({ data }: any) => {
  const formData = [
    {
      title: translate('slink:Unpaid_Form'),
      child: [
        {
          title: translate('slink:Number_breaks'),
          value: data?.soLanNghiKhongLuong,
        },
        {
          title: translate('slink:Time_breaks'),
          value: data?.thoiGianNghiKhongLuong,
        },
      ],
    },
    {
      title: translate('slink:Birth_Form'),
      child: [
        {
          title: translate('slink:Number_breaks_birth'),
          value: data?.soLanNghiThaiSan,
        },
      ],
    },
    {
      title: translate('slink:Aspend_Form'),
      child: [
        {
          title: translate('slink:Number_breaks'),
          value: data?.soLanNghiViecRieng,
        },
        {
          title: translate('slink:Time_breaks'),
          value: data?.soNgayDaNghiViecRieng,
        },
      ],
    },
  ];

  return (
    <Box width={WIDTH(350)} alignSelf="center" overflow="hidden" mt="2">
      <Swiper autoplay style={{ height: HEIGHT(152) }}>
        {formData.map(item => {
          return (
            <Box
              width={WIDTH(343)}
              paddingLeft={WIDTH(16)}
              paddingRight={WIDTH(16)}
              borderRadius={WIDTH(8)}
              alignSelf="center"
              overflow="hidden"
              height={HEIGHT(100)}
              backgroundColor="white"
              style={{ ...R.themes.shadowOffset }}>
              <HStack w={WIDTH(343)} justifyContent={'space-between'}>
                <Text
                  fontSize={'sm'}
                  color={R.colors.colorPink}
                  fontFamily={R.fonts.BeVietnamProRegular}
                  m={'2'}>
                  {item.title}
                </Text>
              </HStack>

              {item.child?.map(child => {
                return (
                  <Text
                    fontSize={'xs'}
                    color={'black'}
                    fontFamily={R.fonts.BeVietnamProRegular}
                    mb={'1'}
                    mx="2">
                    • {child.title}: {child?.value ?? 0}
                  </Text>
                );
              })}
            </Box>
          );
        })}
      </Swiper>
    </Box>
  );
};

const Filter = (props: any) => {
  const { onChangeThang, onChangeLoaiDon } = props;

  return (
    <Box
      mt={'4'}
      // backgroundColor="white"
      width={WIDTH(343)}
      paddingLeft={WIDTH(16)}
      paddingRight={WIDTH(16)}
      borderRadius={WIDTH(8)}
      alignSelf="center"
      overflow="hidden">
      <HStack
        width={WIDTH(343)}
        // my={HEIGHT(16)}
        alignSelf="center"
        justifyContent="space-between">
        <SingleSelect
          width={WIDTH(160)}
          alignSelf="center"
          placeholder={translate('slink:Select_semester')}
          onChangeValue={onChangeLoaiDon}
          defaultValue={dataPickerLoaiKi?.[0]?.value}
          data={dataPickerLoaiKi}
        />
        <SingleSelect
          width={WIDTH(160)}
          alignSelf="center"
          placeholder={translate('slink:Select_semester')}
          onChangeValue={onChangeThang}
          defaultValue={dataPickerThang?.[new Date().getMonth()]?.value}
          data={dataPickerThang}
        />
      </HStack>
    </Box>
  );
};

const dataPickerThang = [
  { label: 'Tháng 1', value: '1' },
  { label: 'Tháng 2', value: '2' },
  { label: 'Tháng 3', value: '3' },
  { label: 'Tháng 4', value: '4' },
  { label: 'Tháng 5', value: '5' },
  { label: 'Tháng 6', value: '6' },
  { label: 'Tháng 7', value: '7' },
  { label: 'Tháng 8', value: '8' },
  { label: 'Tháng 9', value: '9' },
  { label: 'Tháng 10', value: '10' },
  { label: 'Tháng 11', value: '11' },
  { label: 'Tháng 12', value: '12' },
];

const dataPickerLoaiKi = [
  { label: 'Đơn xin nghỉ phép', value: TypeDon.TypeDonPhep },
  { label: 'Đơn xin nghỉ ngoài giờ', value: TypeDon.TypeDonNgoaiGio },
];
