import { ETrangThaiDuyetKeKhaiTaiSan } from '@common';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ItemProps {
  item: DotKhaiBaoProps;
  refreshData: () => void;
}

export interface DotKhaiBaoProps {
  _id: string;
  tenDot: string;
  urlVanBanDaDongDau: any;
  thoiGianBatDau: Date;
  daGui: any;
  urlQuyetDinhCongVan: any;
  thoiGianKetThuc: Date;
  ghiChu: string;
  vanBanLienQuan: any;
  danhSachKeKhai: DanhSachKeKhai[];
  trangThaiDuyetDot: string;
  soQuyetDinh: any;
  ngayRaQuyetDinh: any;
  nguoiKy: any;
  chucVuNguoiKy: any;
  fileQuyetDinh: any;
  noiDungYeuCauChinhSua: string;
  createdAt: Date;
  updatedAt: Date;
  chinhSua: boolean;
  loai: string;
  hetThoiHan: boolean;
  ghiChuPheDuyet: any;
  keKhai: boolean;
  trangThaiDuyet: ETrangThaiDuyetKeKhaiTaiSan;
}

export interface DanhSachKeKhai {
  loai: string;
  viTriChucDanhId: string;
  thongTinNhanSuId: string;
  ssoId: string;
}
