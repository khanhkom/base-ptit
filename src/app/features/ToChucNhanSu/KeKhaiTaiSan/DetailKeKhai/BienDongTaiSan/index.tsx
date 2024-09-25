/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import R from '@assets/R';
import { WIDTH } from '@common';
import BienDongComponent from '@components/HoSoNhanSu/KeKhaiTaiSan/BienDongComponent';
import { Box, ScrollView, Text, VStack } from 'native-base';

import { KeKhaiTaiSanProps } from '../type';
interface Props {
  detailKeKhai: KeKhaiTaiSanProps | undefined;
  control: any;
  setValue: any;
  stt: string;
  isDisabled: boolean;
}
const BienDongTaiSan = (props: Props) => {
  const { detailKeKhai, control, setValue, isDisabled } = props;

  const listForm = [
    {
      title: 'Quyền sử dụng thực tế đối với đất',
      listFormLV2: [
        { title: 'Đất ở', form: true, name: 'bienDong_datO' },
        {
          title: 'Các loại đất khác',
          form: true,
          name: 'bienDong_cacLoaiDatKhac',
        },
      ],
    },
    {
      title: 'Nhà ở, công trình xây dựng khác',
      listFormLV2: [
        { title: 'Nhà ở', form: true, name: 'bienDong_nhaO' },
        {
          title: 'Công trình xây dựng khác',
          form: true,
          name: 'bienDong_cacLoaiCongTrinhXayDungKhac',
        },
      ],
    },
    {
      title: 'Tài sản khác gắn liền với đất',
      listFormLV2: [
        {
          title: 'Cây lâu lăm, rừng sản xuất',
          form: true,
          name: 'bienDong_cayLauNam',
        },
        {
          title: 'Vật kiến trúc gắn liền với đất',
          form: true,
          name: 'bienDong_vatKienTrucGanLienVoiDat',
        },
      ],
    },
    {
      title:
        'Vàng, kim cương, bạch kim và các kim loại quý, đá quý khác có tổng giá trị từ 50 triệu đồng trở lên',
      form: true,
      name: 'bienDong_kimLoaiDaQuy',
    },
    {
      title:
        'Tiền (tiền Việt Nam, ngoại tệ) gồm tiền mặt, tiền cho vay, tiền trả trước, tiền gửi cá nhân, tổ chức trong nước, tổ chức nước ngoài tại Việt Nam mà tổng giá trị quy đổi từ 50 triệu đồng trở lên',
      form: true,
      name: 'bienDong_tien',
    },
    {
      title:
        'Cổ phiếu, trái phiếu, vốn góp, các loại giấy tờ có giá khác mà tổng giá trị từ 50 triệu đồng trở lên (khai theo từng loại)',
      listFormLV2: [
        { title: 'Cổ phiếu', form: true, name: 'bienDong_coPhieu' },
        { title: 'Trái phiếu', form: true, name: 'bienDong_traiPhieu' },
        { title: 'Vốn góp', form: true, name: 'bienDong_vonGop' },
        {
          title: 'Các loại giấy tờ có giá khác',
          form: true,
          name: 'bienDong_cacLoaiGiayToKhac',
        },
      ],
    },
    {
      title: 'Tài sản khác có giá trị từ 50 triệu đồng trở lên',
      listFormLV2: [
        {
          title:
            'Tài sản theo quy định của pháp luật phải đăng ký sử dụng và được cấp giấy đăng ký (tầu bay, tàu thủy, thuyền, máy ủi, máy xúc, ô tô, mô tô, xe gắn máy...)',
          form: true,
          name: 'bienDong_taiSanTheoQuyDinh',
        },
        {
          title:
            ' Tài sản khác (đồ mỹ nghệ, đồ thờ cúng, bàn ghế, cây cảnh, tranh ảnh, các loại tài sản khác)',
          form: true,
          name: 'bienDong_taiSanKhac',
        },
      ],
    },
    {
      title: 'Tài sản ở nước ngoài',
      form: true,
      name: 'bienDong_taiSanONuocNgoai',
    },
    {
      title: ' Tổng thu nhập giữa 02 lần kê khai',
      form: true,
      name: 'bienDong_tongThuNhapGiuaHaiLanKeKhai',
    },
  ];

  return (
    <ScrollView>
      {/* <TextTitleTCNS
        label={`${stt}. BIẾN ĐỘNG TÀI SẢN, THU NHẬP, GIẢI TRÌNH NGUỒN GỐC CỦA TÀI SẢN, THU NHẬP TĂNG THÊM`}
        onPress={() => {
          setexpand(!expand);
        }}
        expand={expand}
      />
      <Collapse isOpen={expand} width={getWidth()}> */}
      <Box width={WIDTH(343)} alignSelf={'center'}>
        {listForm?.map((item, index) => {
          if (item?.form) {
            return (
              <BienDongComponent
                isDisabled={isDisabled}
                setValue={setValue}
                valueDefault={
                  detailKeKhai?.bienDong?.[
                    item?.name?.replace(/^bienDong_/, '')
                  ]
                }
                key={index}
                control={control}
                level={0}
                name={item?.name}
                label={`${index + 1}. ${item?.title}`}
              />
            );
          }

          return (
            <VStack key={index}>
              <Text
                my={'2'}
                fontFamily={R.fonts.BeVietnamProMedium}
                fontSize={'xs'}
                color={'black'}>
                {`${index + 1}. ${item?.title}`}
              </Text>
              {item?.listFormLV2?.map((e, ind) => {
                return (
                  <BienDongComponent
                    isDisabled={isDisabled}
                    setValue={setValue}
                    valueDefault={
                      detailKeKhai?.bienDong?.[
                        e?.name?.replace(/^bienDong_/, '')
                      ]
                    }
                    key={`${index + 1}-${ind + 1}`}
                    name={e?.name}
                    control={control}
                    label={`${index + 1}.${ind + 1}. ${e?.title}`}
                  />
                );
              })}
            </VStack>
          );
        })}
      </Box>
      {/* </Collapse> */}
    </ScrollView>
  );
};

export default BienDongTaiSan;
