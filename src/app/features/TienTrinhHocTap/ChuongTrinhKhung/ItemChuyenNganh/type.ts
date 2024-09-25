export interface ChuyenNganhProps {
  _id: string;
  ma: string;
  loaiHocPhanCtdt: string;
  maHocPhan: string;
  maChuyenNganh: string;
  isTinhSoTinChiTichLuy: boolean;
  ten: null;
  soThuTuKy: number;
  soThuTuKyKeHoach: null;
  soTinChiTuChonPhaiHoc: string;
  maChuongTrinhDaoTao: string;
  dsHocPhanTienQuyet: DsHocPhanTienQuyet[];
  dsHocPhanTruoc: any[];
  dsHocPhanSongHanh: any[];
  tinhChuanDauRa: null;
  idThaoTacRaSoatCtdt: null;
  ghiChu: null;
  createdAt: Date;
  updatedAt: Date;
  maHocPhanTienQuyet: null;
  maHocPhanTruoc: null;
  maHocPhanSongHanh: null;
  maKhoiKienThuc: string;
  hocPhan: HocPhan;
  chuyenNganh: ChuyenNganh;
  hocPhanCtdtList: any[];
  hoc: string;
  lichSuDiem: any[];
  soTinChi: number | string;
}

export interface ChuyenNganh {
  tenVietTat: null;
  _id: string;
  dmNganhId: null;
  ma: string;
  ten: string;
  tenTiengAnh: null;
  canCuId: null;
  maDonVi: null;
  createdAt: Date;
  updatedAt: Date;
  maDmNganh: null;
  maTrinhDo: null;
  maNganhGoc: string;
  maCanCuPhapLy: null;
}

export interface DsHocPhanTienQuyet {
  ma: string;
  ten: string;
  soTinChi: number;
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
  hocNgoaiGio: boolean;
  createdAt: Date;
  updatedAt: Date;
}
