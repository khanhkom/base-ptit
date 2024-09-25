import { EQUESTION_TYPE } from '@common';
import { KhoiProps } from '@components/ChiTietBieuMauDanhGia/type';

export interface GiangVienProps {
  _id: string;
  idKhaoSat: string;
  tenNhanSu: string;
  maNhanSu: string;
  nhanSuSsoId: string;
  idDot: string;
  hoTen: string;
  userCode: string;
  userSsoId: string;
  answered: boolean;
  danhSachTraLoi: DanhSachTraLoi[];
  vaiTro: string;
  maLop: string;
  lopHocPhanId: string;
  giangVienSsoId: string;
  maGiangVien: string;
  hoTenGiangVien: string;
  startedAt: Date;
  saved: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface DanhSachTraLoi {
  idCauHoi: string;
  listLuaChon: string[];
  listLuaChonBang: ListLuaChonBang[];
  traLoiKhac?: string;
  listUrlFile: string[];
  correct?: boolean;
  _id: string;
  luaChonTuyenTinh?: number;
  traLoiText?: string;
}

export interface ListLuaChonBang {
  idCot: string;
  textCot: string;
  idHang: string;
  textHang: string;
  _id: string;
}

export interface BieuMauKhaoSatProps {
  _id: string;
  loai: string;
  tieuDe: string;
  noiDungCamKet: string;
  moTa: string;
  danhSachKhoi: KhoiProps[];
  loaiDoiTuongSuDung: any[];
  danhSachVaiTro: any[];
  danhSachLopTinChi: any[];
  danhSachLopHanhChinh: any[];
  danhSachNguoiDung: any[];
  danhSachDonVi: any[];
  danhSachKhoaHoc: any[];
  danhSachNganhHoc: any[];
  kichHoat: boolean;
  soLuotTraLoiToiDa: number;
  coCamKet: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface DanhSachCauHoi {
  _id: string;
  loai: EQUESTION_TYPE;
  batBuoc: boolean;
  noiDungCauHoi: string;
  cauTraLoiKhac: boolean;
  luaChon: LuaChon[];
  luaChonCot: LuaChon[];
  luaChonHang: LuaChon[];
  gioiHanDuoiTuyenTinh?: number;
  gioiHanTrenTuyenTinh?: number;
}

export interface LuaChon {
  _id: string;
  noiDung: string;
}

export interface DotDGGVProps {
  _id: string;
  ten: string;
  loai: string;
  maHocKy: string;
  thoiGianBatDau: Date;
  thoiGianKetThuc: Date;
  kichHoat: boolean;
  idKhaoSat: string;
  receiverType: string;
  loaiNguoiDung: string;
  filter: Filter;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  khaoSat: KhaoSat;
  daLam: boolean;
  totalAttempt: number;
}

export interface Filter {
  roles: string[];
  idKhoaSinhVien: any[];
  idKhoa: any[];
  idNganh: any[];
  idLopHanhChinh: any[];
  idLopHocPhan: any[];
}

export interface KhaoSat {
  _id: string;
  loai: string;
  tieuDe: string;
  danhSachKhoi: DanhSachKhoi[];
  loaiDoiTuongSuDung: any[];
  danhSachVaiTro: any[];
  danhSachLopTinChi: any[];
  danhSachLopHanhChinh: any[];
  danhSachNguoiDung: any[];
  danhSachDonVi: any[];
  danhSachKhoaHoc: any[];
  danhSachNganhHoc: any[];
  kichHoat: boolean;
  soLuotTraLoiToiDa: number;
  coCamKet: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface DanhSachKhoi {
  _id: string;
  tieuDe: string;
  danhSachCauHoi: DanhSachCauHoi[];
}

export interface LuaChon {
  _id: string;
  noiDung: string;
}

export interface InfoClassProps {
  phongHoc: PhongHoc;
  stc?: number;
  gioiThieuChung?: string;
  maLopHanhChinh: string;
  maHoaLichHoc: MaHoaLichHoc[];
  thoiGianNhapDiem: ThoiGianNhapDiem;
  _id: string;
  trangThaiDiemLop: string;
  ten: string;
  tenCha: null;
  maLop: string;
  maLopCha: null;
  thoiGianNopDiem: null;
  isNopDiemMuon: boolean;
  soTietTrongTuan: null;
  nopDiem: boolean;
  khoaDiemTp: boolean;
  khoaDiemThi: boolean;
  maHocKy: string;
  maHocPhan: string;
  soThuTuNhom: null;
  soThuTuLop: number;
  siSo: number;
  siSoToiDa: number;
  trangThaiDuyetGiangDay: string;
  maHocPhanHocKy: string;
  chotKeHoach: boolean;
  trangThaiLop: string;
  lmsUrl: null;
  lopNhuCau: null;
  moodleShortname: null;
  cauHinhTkb: null;
  doiTuongLopHanhChinh: string;
  maCSDT: null;
  loai: string;
  hinhThucGiangDay: string;
  maKhoaNganh: null;
  createdAt: Date;
  updatedAt: Date;
  lopHanhChinhId: null;
  dotHuyId: null;
  dotDangKyNhuCauId: null;
  mucTieuHocPhan: string;
  chuanDauRa: string;
  hocPhan: HocPhan;
  sinhVienList: SinhVienList[];
  deCuong: DeCuong;
  hocKy: HocKy;
  nhanSuList: NhanSuList[];
  children: any[];
  thoiKhoaBieuList: ThoiKhoaBieuList[];
  lopHpHcList: any[];
}

export interface DeCuong {
  deCuongId: string;
  deCuong: { [key: string]: string | undefined };
}

export interface HocKy {
  daKhoiTaoQuyDoiGioGiangDay: boolean;
  soTinChiDangKyHocTuNguyen: null;
  soHocPhanDangKyHocTuNguyen: null;
  _id: string;
  ma: string;
  ten: string;
  soThuTu: number;
  namHocId: string;
  idDotKhaoSatTietHoc: null;
  thoiGianBatDau: Date;
  soTuan: number;
  isKyChinh: boolean;
  isToChucDangKyNhuCau: null;
  loaiThoiGianNhapDiemHocKy: string;
  thoiGianNhapDiemBatDau: Date;
  thoiGianNhapDiemKetThuc: Date;
  soNgayNhapDiem: null;
  sySoDuKienBatBuoc: null;
  tgBdLayYKienKhgd: Date;
  tgKtLayYKienKhgd: Date;
  tgBdPhanCongGiangDay: Date;
  tgKtPhanCongGiangDay: Date;
  active: boolean;
  namBatDau: number;
  createdAt: Date;
  updatedAt: Date;
  maNhomTietHoc: MaNhomTietHoc;
}

export enum MaNhomTietHoc {
  G = 'G',
}

export interface HocPhan {
  _id: string;
  ma: string;
  ten: string;
  soTinChi: number;
  maDonVi: string;
  tenVietTatDonVi: null;
  tenTiengAnh: null;
  maLoaiHocPhan: string;
  active: boolean;
  loaiHocPhi: string;
  createdAt: Date;
  updatedAt: Date;
  maTrinhDoDaoTao: string;
  deCuongHienTaiId: string;
}

export interface MaHoaLichHoc {
  danhSachTuan: DanhSachTuan[];
  loaiHinhHocTap: null;
  nhanSuSsoId: string;
  maNhanSu: string;
  tenNhanSu: string;
  maNhomTietHoc: MaNhomTietHoc;
  phongHoc: PhongHoc;
  tietBatDau: number;
  maNhanSuHienThi: string;
  tenNhanSuHienThi: string;
  soTiet: number;
  thu: number;
  id: string;
  nhanSu: null;
}

export interface DanhSachTuan {
  tuan: number;
  tkbId: string;
}

export enum PhongHoc {
  The402Ph = '402PH',
}

export interface NhanSuList {
  _id: string;
  lopHocPhanId: string;
  nhanSuSsoId: string;
  maNhanSu: string;
  tenNhanSu: string;
  loai: string;
  trangThai: string;
  ghiChuThinhGiang: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SinhVienList {
  ma: string;
  ten: string;
  namNhapHoc: null;
  firstName: null;
  lastName: null;
  gioiTinh: string;
  ssoId: string;
  maKhoaNganh: string;
  LopHpSvModel: LopHPSvModel;
}

export interface LopHPSvModel {
  _id: string;
  sinhVienSsoId: string;
  idLopHpLopHc: null;
  public: boolean;
  maSvHp: null;
  idPhieuDktc: null;
  loai: string;
  billItemId: null;
  loaiLop: string;
  maKhoaNganh: string;
  trangThaiThanhToan: string;
  daDanhGiaGiangVien: boolean;
  createdAt: Date;
  updatedAt: Date;
  lopHocPhanId: string;
  maSvHk: string;
}

export interface ThoiGianNhapDiem {
  start: Date;
  end: Date;
}

export interface ThoiKhoaBieuList {
  nhanSuSsoId: null;
  tietBatDau: number;
  tietKetThuc: number;
  thoiGianBatDau: Date;
  thoiGianKetThuc: Date;
  loaiHinhHocTap: null;
  maNhomTietHoc: MaNhomTietHoc;
  phongHoc: PhongHoc;
  ngay: Date;
  _id: string;
}
