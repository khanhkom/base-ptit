import { ELoaiHocPhanDangKyTinChi } from '@common';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PhieuDangKyTinChiProps {
  _id: string;
  idDotDangKyTinChi: string;
  sinhVienSsoId: string;
  maHocKy: string;
  soTinChiDaDk: number;
  soTinChiToiThieu: number;
  soTinChiToiDa: number;
  maSvHk: string;
  ghiChu: any;
  kichHoat: boolean;
  maSinhVien: string;
  hoTen: string;
  identityCode: any;
  billId: any;
  createdAt: Date;
  updatedAt: Date;
  lopHpSvList: LopHPSvList[];
}

export interface LopHPSvList {
  _id: string;
  sinhVienSsoId: string;
  maKhoaNganh: string;
  diemThanhPhan1: any;
  diemThanhPhan2: any;
  diemThanhPhan3: any;
  diemThanhPhan4: any;
  diemThanhPhan5: any;
  diemThanhPhan6: any;
  diemThanhPhan7: any;
  diemThanhPhan8: any;
  diemThanhPhan9: any;
  diemThanhPhan10: any;
  khoa: boolean;
  diemThi1: any;
  diemPhucKhao: any;
  diemThamDinh: any;
  diemKthp: any;
  diemThi2: any;
  diemTongKet: any;
  diemThang4: any;
  diemChu: string;
  khoaDiemThi: boolean;
  idLopHpLopHc: any;
  trangThaiThi: string;
  public: boolean;
  trangThaiDuyet: string;
  trangThaiDuyetDiemThanhPhan: string;
  idPhieuDktc: string;
  loai: ELoaiHocPhanDangKyTinChi;
  billItemId: any;
  trangThaiThanhToan: string;
  createdAt: Date;
  updatedAt: Date;
  lopHocPhanId: string;
  maSvHk: string;
  maSvHp: string;
  lopHocPhan: LopHocPhanDKTCProps;
}

export interface LopHocPhanDKTCProps {
  maHoaLichHoc: MaHoaLichHoc[];
  thoiGianNhapDiem: ThoiGianNhapDiem;
  _id: string;
  trangThaiDiemLop: string;
  ten: string;
  maLop: string;
  maLopCha: any;
  nopDiem: boolean;
  khoaDiemTp: boolean;
  khoaDiemThi: boolean;
  maHocKy: string;
  maHocPhan: string;
  soThuTuNhom: any;
  soThuTuLop: number;
  siSo: number;
  siSoToiDa: number;
  trangThaiDuyetGiangDay: string;
  maHocPhanHocKy: string;
  trangThaiLop: string;
  lmsUrl: any;
  moodleShortname: string;
  cauHinhTkb: CauHinhTkb[] | any;
  loai: string;
  hinhThucGiangDay: string;
  createdAt: Date;
  updatedAt: Date;
  lopHanhChinhId: any;
  tenCha: any;
  dotHuyId: any;
  hocPhan: HocPhan;
  thoiKhoaBieuList: ThoiKhoaBieuList[];
  hocKy: HocKy;
}

export interface CauHinhTkb {
  tuan: number;
  soTiet: number;
}

export interface HocKy {
  _id: string;
  ma: string;
  ten: string;
  soThuTu: number;
  namHocId: string;
  thoiGianBatDau: Date;
  soTuan: number;
  isKyChinh: boolean;
  isToChucDangKyNhuCau: boolean;
  loaiThoiGianNhapDiemHocKy: string;
  thoiGianNhapDiemBatDau: Date;
  thoiGianNhapDiemKetThuc: Date;
  soNgayNhapDiem: number;
  sySoDuKienBatBuoc: any;
  tgXetHvuSb: Date;
  tgTbKqXetHvuSb: Date;
  tgBdLayYKienHvu: Date;
  tgKtLayYKienHvu: Date;
  tgBdLayYKienKhgd: Date;
  tgKtLayYKienKhgd: Date;
  tgHopHoiDongHvu: Date;
  tgTbKqHvu: Date;
  tgBdPhanCongGiangDay: Date;
  tgKtPhanCongGiangDay: Date;
  daChotKqCanhBao: boolean;
  daChotKqThoiHoc: boolean;
  active: boolean;
  namBatDau: number;
  validateCanhBao: ValidateCanhBao[];
  validateBuocThoiHoc: ValidateBuocThoiHoc[];
  daGuiTBDanhSachCanhBaoSoBo: boolean;
  daGuiTBDanhSachThoiHocSoBo: boolean;
  createdAt: Date;
  updatedAt: Date;
  maNhomTietHoc: any;
}

export interface ValidateBuocThoiHoc {
  thamSo: ValidateBuocThoiHocThamSo;
  functionValidate: string;
}

export interface ValidateBuocThoiHocThamSo {
  soLan?: number;
  maDonVi: string;
  isCoVanHocTap: boolean;
  soLanCanhBaoLienTiep?: number;
}

export interface ValidateCanhBao {
  thamSo: ValidateCanhBaoThamSo;
  functionValidate: string;
}

export interface ValidateCanhBaoThamSo {
  maDonVi: string;
  isCoVanHocTap: boolean;
  phanTramTinChiKhongDat: number;
  soTinChiNo?: number;
  diemTbHocKy1?: number;
  diemTbHocKyKhacKy1?: number;
  diemTrungBinhTichLuyNam1?: number;
  diemTrungBinhTichLuyNam2?: number;
  diemTrungBinhTichLuyNam3?: number;
  diemTrungBinhTichLuyNamTiepTheo?: number;
}

export interface HocPhan {
  _id: string;
  ma: string;
  ten: string;
  soTinChi: number;
  maDonVi: string;
  tenVietTatDonVi: any;
  tenTiengAnh: any;
  maLoaiHocPhan: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  maTrinhDoDaoTao: string;
  deCuongHienTaiId: null | string;
  loaiHocPhan: LoaiHocPhan;
}

export interface LoaiHocPhan {
  _id: string;
  ma: string;
  ten: string;
  isTinhDiem: boolean;
  isTinhSoTinChiDangKy: boolean;
  isTinhSoTinChiTichLuy: boolean;
  khoiTuChon: boolean;
  khoiTotNghiep: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MaHoaLichHoc {
  danhSachTuan: DanhSachTuan[];
  loaiHinhHocTap: LoaiHinhHocTap;
  nhanSuSsoId: null | string;
  maNhomTietHoc: MaNhomTietHoc;
  phongHoc: string;
  tietBatDau: number;
  soTiet: number;
  thu: number;
  id: string;
}

export interface DanhSachTuan {
  tuan: number;
  tkbId: string;
}

export enum LoaiHinhHocTap {
  LýThuyết = 'Lý thuyết',
}

export enum MaNhomTietHoc {
  G = 'G',
}

export interface ThoiGianNhapDiem {
  start: Date;
  end: Date;
}

export interface ExtraThoiKhoaBieuList {
  monHoc: string;
  maMonHoc: string;
  nhanSuSsoId: null | string;
  tietBatDau: number;
  tietKetThuc: number;
  loaiHinhHocTap: LoaiHinhHocTap;
  maNhomTietHoc: MaNhomTietHoc;
  thoiGianBatDau: Date;
  thoiGianKetThuc: Date;
  phongHoc: string;
  ngay: Date;
  _id: string;
}

export interface ThoiKhoaBieuList {
  nhanSuSsoId: null | string;
  tietBatDau: number;
  tietKetThuc: number;
  loaiHinhHocTap: LoaiHinhHocTap;
  maNhomTietHoc: MaNhomTietHoc;
  thoiGianBatDau: Date;
  thoiGianKetThuc: Date;
  phongHoc: string;
  ngay: Date;
  _id: string;
}

export interface HocKyProps {
  _id: string;
  ma: string;
  ten: string;
  soThuTu: number;
  namHocId: string;
  thoiGianBatDau: Date;
  soTuan: number;
  isKyChinh: boolean;
  isToChucDangKyNhuCau: boolean;
  loaiThoiGianNhapDiemHocKy: string;
  thoiGianNhapDiemBatDau: Date;
  thoiGianNhapDiemKetThuc: Date;
  soNgayNhapDiem: number;
  sySoDuKienBatBuoc: any;
  tgXetHvuSb: Date;
  tgTbKqXetHvuSb: Date;
  tgBdLayYKienHvu: Date;
  tgKtLayYKienHvu: Date;
  tgBdLayYKienKhgd: Date;
  tgKtLayYKienKhgd: Date;
  tgHopHoiDongHvu: Date;
  tgTbKqHvu: Date;
  tgBdPhanCongGiangDay: Date;
  tgKtPhanCongGiangDay: Date;
  daChotKqCanhBao: boolean;
  daChotKqThoiHoc: boolean;
  active: boolean;
  namBatDau: number;
  validateCanhBao: ValidateCanhBao[];
  validateBuocThoiHoc: ValidateBuocThoiHoc[];
  daGuiTBDanhSachCanhBaoSoBo: boolean;
  daGuiTBDanhSachThoiHocSoBo: boolean;
  createdAt: Date;
  updatedAt: Date;
  maNhomTietHoc: any;
  namHoc: NamHoc;
}

export interface TinChiValidateProps {
  _id: string;
  ten: string;
  kichHoat: boolean;
  allowNhuCau: boolean;
  allowTienTrinh: boolean;
  allowHocLai: boolean;
  allowHocCaiThien: boolean;
  allowHocVuot: boolean;
  allowChuaTheoTienTrinh: boolean;
  allowNgoaiChuongTrinh: boolean;
  thoiGianBatDau: Date;
  thoiGianKetThuc: Date;
  tinhChatDangKy: string;
  idDotThanhToanHocPhi: string;
  createdAt: Date;
  updatedAt: Date;
  maHocKy: string;
}

export interface NamHoc {
  namBatDau: number;
  namKetThuc: number;
  _id: string;
  ma: string;
  ten: string;
  thoiGianBatDau: Date;
  soTuan: number;
  soKyChinh: number;
  soKyPhu: number;
  isKhoiTaoKeHoach: boolean;
  thoiGianXinYKien: any;
  url: any;
  ngayBdLayYKien: Date;
  ngayKtLayYKien: Date;
  daChotKeHoachNamHoc: boolean;
  trangThaiDuyetMucHocPhi: string;
  createdAt: Date;
  updatedAt: Date;
  hinhThucDaoTaoId: any;
  trinhDoDaoTaoId: any;
  phienBanKhnhId: string;
}

export interface ValidateBuocThoiHoc {
  thamSo: ValidateBuocThoiHocThamSo;
  functionValidate: string;
}

export interface ValidateBuocThoiHocThamSo {
  soLan?: number;
  maDonVi: string;
  isCoVanHocTap: boolean;
  soLanCanhBaoLienTiep?: number;
}

export interface ValidateCanhBao {
  thamSo: ValidateCanhBaoThamSo;
  functionValidate: string;
}

export interface ValidateCanhBaoThamSo {
  maDonVi: string;
  isCoVanHocTap: boolean;
  phanTramTinChiKhongDat: number;
  soTinChiNo?: number;
  diemTbHocKy1?: number;
  diemTbHocKyKhacKy1?: number;
  diemTrungBinhTichLuyNam1?: number;
  diemTrungBinhTichLuyNam2?: number;
  diemTrungBinhTichLuyNam3?: number;
  diemTrungBinhTichLuyNamTiepTheo?: number;
}
