export interface SuKienMeProps {
  _id: string;
  hoatDongCtsvId: string;
  ma: string;
  maNganh: string;
  ssoId: string;
  ten: string;
  tenNganh: string;
  trangThaiThamGia: string;
  hoatDongCtsv: HoatDongCtsv;
}

export interface HoatDongCtsv {
  _id: string;
  phanLoaiCap1: string;
  phanLoaiCap2: string;
  ten: string;
  maHocKy: string;
  loai: string;
  soLuongThamGia: number;
  thoiGianBatDau: Date;
  thoiGianKetThuc: Date;
  danhSachPhamVi: DanhSachPhamVi[];
  loaiDonViPhoiHop: string;
  loaidonViChuTri: string;
  danhSachDuToanKinhPhi: any[];
  thongTinPhanBoNguonKinhPhi: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  diaDiem: string;
  info: Info;
}

export interface DanhSachPhamVi {
  loaiDoiTuong: string;
  danhSachLoaiVaiTro: string[];
  danhSachMaThamChieu: any[];
}

export interface Info {}
