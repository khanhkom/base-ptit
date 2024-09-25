/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import R from '@assets/R';
import { EKieuDuLieu, WIDTH } from '@common';
import { translate } from '@utils/i18n/translate';
import { ScrollView, Text, VStack } from 'native-base';

import InputKhaiBao from './component/Input';
import TongThuNhapComponent from './component/ListInput';
import TableKeKhai from './component/Table';

import { KeKhaiTaiSanProps } from '../type';
interface Props {
  setValue: any;
  control: any;
  detailKeKhai: KeKhaiTaiSanProps | undefined;
  isDisabled: boolean;
  isHidden: boolean;
}
const MoTaVeTaiSan = (props: Props) => {
  const { control, detailKeKhai, setValue, isDisabled, isHidden } = props;

  const listForm = [
    {
      title: 'Quyền sử dụng thực tế đối với đất',
      name: 'quyenSuDungDat',
      table: [
        {
          label: translate('slink:Loai'),
          data: ['Đất ở', 'Loại đất khác'],
          type: EKieuDuLieu.DANHMUC,
          required: true,
          name: 'loai',
        },
        {
          label: 'Loại đất',
          fieldRelated: 'loai',
          valueRelated: ['Loại đất khác'],
          type: EKieuDuLieu.TEXT,
          required: true,
          name: 'loaiDat',
        },
        {
          label: translate('slink:Address'),
          type: EKieuDuLieu.TEXT,
          required: true,
          name: 'diaChi',
        },
        {
          label: 'Diện tích (m2)',
          type: EKieuDuLieu.NUMBER,
          required: true,
          name: 'dienTich',
        },
        {
          label: 'Giá trị',
          type: EKieuDuLieu.NUMBER,
          required: true,
          name: 'giaTri',
        },
        {
          label: 'Giấy chứng nhận quyền sử dụng',
          type: EKieuDuLieu.TEXT,
          required: true,
          name: 'giayChungNhanQuyenSuDung',
        },
        {
          label: 'Thông tin khác',
          type: EKieuDuLieu.TEXT,
          isArea: true,
          name: 'thongTinKhac',
        },
      ],
    },
    {
      title: 'Nhà ở, công trình xây dựng',
      listFormV2: [
        {
          title: 'Nhà ở',
          name: 'nhaO',
          table: [
            {
              label: translate('slink:Address'),
              type: EKieuDuLieu.TEXT,
              required: true,
              name: 'diaChi',
            },
            {
              label: 'Loại nhà',
              type: EKieuDuLieu.TEXT,
              required: true,
              name: 'loaiNha',
            },
            {
              label: 'Diện tích sử dụng (m2)',
              type: EKieuDuLieu.NUMBER,
              required: true,
              name: 'dienTichSuDung',
            },
            {
              label: 'Giá trị',
              type: EKieuDuLieu.NUMBER,
              required: true,
              name: 'giaTri',
            },
            {
              label: 'Giấy chứng nhận quyền sở hữu',
              type: EKieuDuLieu.TEXT,
              required: true,
              name: 'giayChungNhanQuyenSoHuu',
            },
            {
              label: 'Thông tin khác',
              type: EKieuDuLieu.TEXT,
              isArea: true,
              name: 'thongTinKhac',
            },
          ],
        },
        {
          title: 'Công trình xây dựng khác',
          name: 'congTrinhXayDungKhac',
          table: [
            {
              label: 'Tên công trình',
              type: EKieuDuLieu.TEXT,
              required: true,
              name: 'tenCongTrinh',
            },
            {
              label: translate('slink:Address'),
              type: EKieuDuLieu.TEXT,
              required: true,
              name: 'diaChi',
            },
            {
              label: 'Loại công trình',
              type: EKieuDuLieu.TEXT,
              required: true,
              name: 'loaiCongTrinh',
            },
            {
              label: 'Cấp công trình',
              type: EKieuDuLieu.TEXT,
              required: true,
              name: 'capCongTrinh',
            },
            {
              label: 'Diện tích (m2)',
              type: EKieuDuLieu.NUMBER,
              required: true,
              name: 'dienTich',
            },
            {
              label: 'Giá trị',
              type: EKieuDuLieu.NUMBER,
              required: true,
              name: 'giaTri',
            },
            {
              label: 'Giấy chứng nhận quyền sở hữu',
              type: EKieuDuLieu.TEXT,
              required: true,
              name: 'giayChungNhanQuyenSoHuu',
            },
            {
              label: 'Thông tin khác',
              type: EKieuDuLieu.TEXT,
              isArea: true,
              name: 'thongTinKhac',
            },
          ],
        },
      ],
    },
    {
      title: 'Tài sản khác gắn liền với đất',
      name: 'taiSanKhacGanLienVoiDat',
      table: [
        {
          label: 'Tài sản',
          type: EKieuDuLieu.DANHMUC,
          data: [
            'Cây lâu năm',
            'Rừng sản xuất',
            'Vật kiến trúc khác gắn liền với đất',
          ],
          required: true,
          name: 'taiSan',
        },
        {
          label: 'Tên gọi',
          type: EKieuDuLieu.TEXT,
          fieldRelated: 'taiSan',
          valueRelated: ['Vật kiến trúc khác gắn liền với đất'],
          required: true,
          name: 'tenGoi',
        },
        {
          label: 'Số lượng',
          type: EKieuDuLieu.NUMBER,
          required: true,
          name: 'soLuong',
        },
        {
          label: 'Diện tích (m2)',
          type: EKieuDuLieu.NUMBER,
          required: true,
          name: 'dienTich',
        },
        {
          label: 'Giá trị',
          type: EKieuDuLieu.NUMBER,
          required: true,
          name: 'giaTri',
        },
      ],
    },
    {
      title: 'Vàng, kim cương, bạch kim và các loại kim loại quý, đá quý khác',
      name: 'kimLoaiDaQuy',
      table: [
        {
          label: 'Tên',
          type: EKieuDuLieu.TEXT,
          required: true,
          name: 'ten',
        },
        {
          label: 'Giá trị',
          type: EKieuDuLieu.NUMBER,
          required: true,
          name: 'giaTri',
        },
      ],
    },
    {
      title: 'Tiền (tiền Việt Nam, ngoại tệ)',
      name: 'tien',
      table: [
        {
          label: 'Tên',
          type: EKieuDuLieu.TEXT,
          required: true,
          name: 'ten',
        },
        {
          label: 'Giá trị',
          type: EKieuDuLieu.NUMBER,
          required: true,
          name: 'giaTri',
        },
      ],
    },
    {
      title: 'Cổ phiếu, trái phiếu, góp vốn, các loại giấy tờ có giá',
      name: 'cacLoaiGiayToCoGiaTri',
      table: [
        {
          label: translate('slink:Loai'),
          type: EKieuDuLieu.DANHMUC,
          data: [
            'Cổ phiếu',
            'Trái phiếu',
            'Vốn góp',
            'Các loại giấy tờ có giá khác',
          ],
          required: true,
          name: 'loai',
        },
        {
          label: 'Tên tài sản',
          type: EKieuDuLieu.TEXT,
          required: true,
          name: 'tenTaiSan',
        },
        {
          label: 'Hình thức góp vốn',
          fieldRelated: 'loai',
          valueRelated: ['Vốn góp'],
          type: EKieuDuLieu.TEXT,
          required: true,
          name: 'hinhThucGopVon',
        },
        {
          label: 'Số lượng',
          type: EKieuDuLieu.NUMBER,
          required: true,
          name: 'soLuong',
        },
        {
          label: 'Giá trị',
          type: EKieuDuLieu.NUMBER,
          required: true,
          name: 'giaTri',
        },
      ],
    },
    {
      title: 'Tài sản khác',
      name: 'taiSanKhac',
      table: [
        {
          label: translate('slink:Loai'),
          data: ['Tài sản theo quy định', 'Tài sản khác'],
          type: EKieuDuLieu.DANHMUC,
          required: true,
          name: 'loai',
        },
        {
          label: 'Tên tài sản',
          type: EKieuDuLieu.TEXT,
          required: true,
          name: 'tenTaiSan',
        },
        {
          label: 'Số đăng ký',
          type: EKieuDuLieu.TEXT,
          required: true,
          name: 'soDangKy',
        },
        {
          label: 'Năm bắt đầu sở hữu',
          type: EKieuDuLieu.NUMBER,
          required: true,
          name: 'namBatDauSoHuu',
        },
        {
          label: 'Giá trị',
          type: EKieuDuLieu.NUMBER,
          required: true,
          name: 'giaTri',
        },
      ],
    },
    // 8.
    {
      title: 'Tài sản ở nước ngoài',
      input: {
        value: detailKeKhai?.taiSanONuocNgoai,
        type: EKieuDuLieu.TEXT,
        name: 'taiSanONuocNgoai',
      },
    },
    {
      title: 'Tài khoản ở nước ngoài',
      name: 'taiKhoanONuocNgoai',
      table: [
        {
          label: 'Tên chủ tài khoản',
          type: EKieuDuLieu.TEXT,
          required: true,
          name: 'tenChuTaiKhoan',
        },
        {
          label: 'Số tài khoản',
          type: EKieuDuLieu.TEXT,
          required: true,
          name: 'soTaiKhoan',
        },
        {
          label: 'Tên ngân hàng, chi nhánh, tổ chức',
          type: EKieuDuLieu.TEXT,
          required: true,
          name: 'tenNganHangChiNhanhToChuc',
        },
      ],
    },
    {
      title: 'Tổng thu nhập giữa 2 lần kê khai',
      name: 'tongThuNhapGiuaHaiLanKeKhai',
      listInput: [
        {
          label: 'Tổng thu nhập của người kê khai',
          name: 'tongThuNhapNguoiKeKhai',
          type: EKieuDuLieu.NUMBER,
        },
        {
          label: 'Tổng thu nhập của vợ (hoặc chồng)',
          name: 'tongThuNhapCuaVo',
          type: EKieuDuLieu.NUMBER,
        },
        {
          label: 'Tổng thu nhập của con chưa thành niên',
          name: 'tongThuNhapConChuaThanhNien',
          type: EKieuDuLieu.NUMBER,
        },
        {
          label: 'Tổng các khoản thu nhập chung',
          name: 'tongThuNhapChung',
          type: EKieuDuLieu.NUMBER,
        },
      ],
    },
  ];

  if (isHidden) {
    return null;
  }

  return (
    <ScrollView w="full">
      {/* <TextTitleTCNS
        label={'II. THÔNG TIN MÔ TẢ VỀ TÀI SẢN'}
        onPress={() => {
          setexpand(!expand);
        }}
        expand={expand}
      />
      <Collapse isOpen={expand} width={getWidth()}> */}
      {listForm?.map((item, index) => {
        if (item?.table) {
          return (
            <TableKeKhai
              isDisabled={isDisabled}
              setValue={setValue}
              control={control}
              name={item?.name}
              defaultValue={detailKeKhai?.[item?.name || '']}
              key={`MoTaVeTaiSan${index}`}
              level={0}
              label={`${index + 1}. ${item?.title}`}
              form={item?.table}
            />
          );
        }

        if (item?.listFormV2) {
          return (
            <VStack key={index}>
              <Text
                marginY={'2'}
                marginLeft={WIDTH(16)}
                fontFamily={R.fonts.BeVietnamProMedium}
                fontSize={'xs'}
                color={'black'}>
                {`${index + 1}. ${item?.title}`}
              </Text>
              {item?.listFormV2?.map((e, ind) => {
                return (
                  <TableKeKhai
                    isDisabled={isDisabled}
                    setValue={setValue}
                    name={e?.name}
                    control={control}
                    defaultValue={detailKeKhai?.[e?.name || '']}
                    key={`${index + 1}.${e?.title}`}
                    label={`${index + 1}.${ind + 1}. ${e?.title}`}
                    form={e?.table}
                  />
                );
              })}
            </VStack>
          );
        }

        if (item?.input) {
          return (
            <InputKhaiBao
              isDisabled={isDisabled}
              setValue={setValue}
              key={index}
              index={index}
              item={item}
              control={control}
            />
          );
        }

        if (item?.listInput) {
          return (
            <TongThuNhapComponent
              isDisabled={isDisabled}
              item={item}
              index={index}
              control={control}
              detailKeKhai={detailKeKhai}
            />
          );
        }

        return null;
      })}
      {/* </Collapse> */}
    </ScrollView>
  );
};

export default MoTaVeTaiSan;
