/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ELoaiThoiGianThucHien,
  ELoaiTruongThongTinTinh,
  ETrangThaiYeuCauQuyDoiGio,
} from '@common';
import { CauHinhLoaiHinhProps } from '@features/KhaiBaoQuyTrinh/type';

export interface LoaiHinhNCKHProps {
  cauHinhLoaiHinh: CauHinhLoaiHinhProps[];
  danhSachCauHinhSanPhamLienQuan: any[];
  danhSachCauHinhTruongThongTinTinh: CauHinhTruongThongTinTinhProps[];
  danhSachCotHienThi: string[];
  danhSachCotHienThiLyLich: any[];
  danhSachDieuKienQuyDoi: DieuKienQuyDoiProps[];
  danhSachDieuKienQuyDoiDiem: any[];
  danhSachHeSo: any[];
  danhSachNguoiTiepNhan: NguoiTiepNhanProps[];
  danhSachVaiTroThanhVienKhaDung: string[];
  hienThiRieng: boolean;
  khaiBao1Lan: boolean;
  kichHoat: boolean;
  loai: string;
  loaiThoiGianThucHien: ELoaiThoiGianThucHien;
  searchKey1: string;
  ten: string;
  startLabel: string;
  endLabel: string;
  tinhTheoTungNam: boolean;
  timelineLabel: string;
  tinhDiem: boolean;
  tuDongDuyet: boolean;
  updatedAt: string;
  _id: string;
}

export interface CauHinhTruongThongTinTinhProps {
  display: boolean;
  label: string;
  loaiTruongThongTinTinh: ELoaiTruongThongTinTinh;
  maTruongThongTinDungSau: string;
}

export interface DieuKienQuyDoiProps {
  active: boolean;
  chiaDeuChoCacThanhVien: boolean;
  danhSachHeSo: any[];
  gioTong: number;
  heSoTheoNamHoc: boolean;
  loaiQuyDoiGio: string;
  moTa: string;
  quyDoiThanhVien: any[];
  tieuChi: {
    loaiPhepToan: string;
    maTruongThongTin: string;
    value: string;
  }[];
}

export interface NguoiTiepNhanProps {
  donVi: string;
  email: string;
  hoVaTen: string;
  hocHam: null;
  hocVi: string;
  maDinhDanh: string;
  maDonVi: string;
  soDienThoai: string;
  ssoId: string;
}

export interface DanhMucNCKHProps {
  _id: string;
  maDanhMuc: string;
  loaiDanhMucNckh: string;
  maModule: string;
  danhSachGiaTri: { value: string }[];
}

export interface NamHocProps {
  createdAt: string;
  loaiQueryDot: string;
  tenNamHoc: string;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
  updatedAt: string;
  _id: string;
}

export interface KetQuaKhaiBaoProps {
  createdAt: string;
  danhSachKetQuaQuyDoiDiem: any[];
  danhSachKetQuaQuyDoiGio: any[];
  danhSachMinhChung: string[];
  danhSachThanhVien: DanhSachThanhVienProps[];
  danhSachYeuCauQuyDoiDiem: QuyDoiGioProps[];
  danhSachYeuCauQuyDoiGio: QuyDoiGioProps[];
  finalEndDate: string;
  finalStartDate: string;
  loaiHinhNckh: LoaiHinhNCKHProps;
  dotId: string;
  loaiHinhNckhId: string;
  nguoiKhaiBao: NguoiKhaiBaoProps;
  searchValue1: string;
  soLuongThanhVien: 1;
  thongTinKhaiBao: { ma: string; value: string | any[] }[];
  thongTinThoiGian: ThongTinThoiGianProps;
  trangThaiSanPham: ETrangThaiYeuCauQuyDoiGio;
  updatedAt: string;
  _id: string;
}

export interface QuyDoiGioProps {
  danhSachKetQuaTinhGioThanhVien: {
    ssoId: string;
    tongGio: number;
  }[];
  namHocId: string;
  trangThaiTiepNhan: string;
}

export interface ThongTinThoiGianProps {
  danhSachGiaHan: any[];
  end: string;
  loaiThoiGianThucHien: string;
  start: string;
  timeline: string;
}

export interface NguoiKhaiBaoProps {
  danhSachVaiTro: any[];
  donVi: string;
  email: string;
  hoVaTen: string;
  maDinhDanh: string;
  maDonVi: string;
  ssoId: string;
}

export interface DanhSachThanhVienProps {
  danhSachVaiTro: string[];
  donVi: string;
  email: string;
  hoVaTen: string;
  hocHam: string;
  hocVi: string;
  maDinhDanh: string;
  maDonVi: string;
  soDienThoai: string;
  ssoId: string;
}
