export interface BuoiHocProp {
  _id: string;
  ngay: Date;
  tenLopHocPhan: string;
  nhanSuSsoId: string;
  maNhanSu: null;
  tenNhanSu: null;
  nhanSuPhuSsoId: null;
  maNhanSuPhu: null;
  tenNhanSuPhu: null;
  tietBatDau: number;
  tietKetThuc: number;
  phongHoc: string;
  tieuDeBaiHoc: null;
  noiDungBaiHoc: null;
  urlBaiHoc: null;
  thoiGianBatDau: Date;
  thoiGianKetThuc: Date;
  loaiHinhHocTap: string;
  maNhomDiemDanh: string;
  ghiChuGiamSat: null;
  trangThaiGiamSat: string;
  chuyenVienGiamSatSsoId: null;
  maChuyenVienGiamSat: null;
  hoTenNguoiGiamSat: null;
  trangThaiDiemDanh: string;
  createdAt: Date;
  updatedAt: Date;
  maNhomTietHoc: string;
  maTietHocBd: string;
  maTietHocKt: string;
  lopHocPhan: LopHocPhan;
  nhomTietHoc: NhomTietHoc;
  tietHocBd: TietHoc;
  tietHocKt: TietHoc;
  nhomDiemDanh: NhomDiemDanh;
  giangVien: GiangVien;
  loaiSuKien: string;
}

export interface GiangVien {
  ssoId: string;
  maCanBo: string;
  hoDem: string;
  ten: string;
  email: string;
  trangThai: string;
  gioiTinh: string;
  ngaySinh: Date;
  sdtCaNhan: string;
  maDonViChinh: string;
  emailCanBo: string;
}

export interface LopHocPhan {
  _id: string;
  trangThaiDiemLop: string;
  ten: string;
  tenCha: null;
  maLop: string;
  maLopCha: null;
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
  trangThaiLop: string;
  lmsUrl: null;
  moodleShortname: null;
  cauHinhTkb: null;
  doiTuongLopHanhChinh: string;
  loai: string;
  hinhThucGiangDay: string;
  createdAt: Date;
  updatedAt: Date;
  lopHanhChinhId: null;
  dotHuyId: null;
  hocPhan: HocPhan;
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
  createdAt: Date;
  updatedAt: Date;
  maTrinhDoDaoTao: string;
  deCuongHienTaiId: string;
}

export interface NhomDiemDanh {
  tongDiemDanh: number;
  tongDiemDanhCoMat: number;
  tongDiemDanhVangCoPhep: number;
  tongDiemDanhVangKhongPhep: number;
  _id: string;
  ten: string;
  ma: string;
  diaDiem: string;
  loai: string;
  kichHoat: boolean;
  thoiGianBatDau: Date;
  thoiGianKetThuc: null;
  maDoiTuong: string;
  createdAt: Date;
  updatedAt: Date;
  danhSachDiemDanh: any[];
}

export interface NhomTietHoc {
  _id: string;
  ma: string;
  ten: string;
  maTrinhDoDaoTao: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  maHinhThucDaoTao: string;
}

export interface TietHoc {
  _id: string;
  tietHoc: number;
  timeBatDau: string;
  timeKetThuc: string;
  nhomTietHocId: null;
  maNhomTietHoc: string;
  maTietHoc: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NhanSuGiangVienProp {
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
  lopHocPhan: LopHocPhan;
  nhanSu: NhanSu;
}

export interface NhanSu {
  ssoId: string;
  maCanBo: string;
  hoDem: string;
  ten: string;
  email: string;
  trangThai: string;
  gioiTinh: string;
  ngaySinh: Date;
  sdtCaNhan: string;
  maDonViChinh: string;
  emailCanBo: string;
}
