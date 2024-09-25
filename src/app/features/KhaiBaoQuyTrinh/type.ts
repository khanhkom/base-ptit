/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EKieuDuLieu,
  ETrangThaiTT,
  LoaiDefaultValue,
  TrangThaiTiepNhanDon,
} from '@common';

export interface BoPhanProp {
  danhSachThanhVienXuLy: DanhSachThanhVienXuLyProps[];
  ma: string;
  phuongThucPhanCong: string;
  ten: string;
}

export interface DanhSachThanhVienXuLyProps {
  donVi: string;
  email: string;
  hocHam: string;
  hocVi: string;
  ma: string;
  maDonVi: string;
  soDienThoai: string;
  ssoId: string;
  ten: string;
}

export interface CauTrucThanhToanProps {
  idKhoanThu: string;
  idMucThu: string;
  idNguonThu: string;
  ten: string;
  thanhToanTheoSoLuong: boolean;
  yeuCauTraPhi: boolean;
}

export interface DanhSachBuocXuLyProps {
  callbackSetting: {
    callbackBodyMapList: {
      destinationField: string;
      sourceField: string;
    }[];
    callbackMethod: string;
    callbackUrl: string;
  };
  danhSachMaBoPhanXuLy: string[];
  doiTuongDieuPhoi: string;
  ma: string;
  maFormKhaiBao: string;
  soNgayXuLy: number;
  suDungCallback: boolean;
  ten: string;
  coKhaiBao: boolean;
  daDienThongTin: boolean;
  danhSachThanhVienXuLy: any[];
  hanCuoiTiepNhan: string;
  laBuocHienTai: boolean;
  maBoPhanXuLy: string;
  maDonVi: string;
  trangThaiTiepNhan: TrangThaiTiepNhanDon;
  vanBan: null;
  ghiChu?: string;
}

export interface DanhSachFormKhaiBaoProps {
  cauHinhLoaiHinh: CauHinhLoaiHinhProps[];
  ma: string;
  ten: string;
}

export interface CauHinhLoaiHinhProps {
  textDisplay: string;
  batBuoc: boolean;
  colspan: number;
  maDanhMuc: string;
  danhSachCot: any[];
  danhSachCotHienThi: any[];
  kichHoat: boolean;
  kieuDuLieu: EKieuDuLieu;
  customDefaultValue: any;
  laDangMang: boolean;
  ma: string;
  ten: string;
  loaiDefaultValue: LoaiDefaultValue;
  textarea: boolean;
  readonly: boolean;
  thamDinh: any[];
  truongThongTinLienQuan: string;
  giaTriLienQuan: any;
  value?: any;
}

export interface DSKhaiBaoProps {
  _id: string;
  phanHe: string[];
  cauHinhDotQuyTrinh: CauHinhDotQuyTrinh;
  cauHinhValidate: CauHinhValidate;
  ten: string;
  linhVuc: string;
  boPhanChiuTrachNhiem: BoPhanChiuTrachNhiem;
  danhSachCauHinhThongTinChung: any[];
  isTraKetQua: boolean;
  choPhepGuiNhieuLan: boolean;
  danhSachPhamViQuyTrinh: DanhSachPhamViQuyTrinh[];
  danhSachFormKhaiBao: DanhSachFormKhaiBao[];
  maFormHienThi: string;
  maTruongHienThi: string;
  cauTrucThanhToan: CauTrucThanhToan;
  danhSachBoPhanXuLy: BoPhanChiuTrachNhiem[];
  danhSachBuocXuLy: DanhSachBuocXuLy[];
  createdBySsoId: string;
  createdByName: string;
  active: boolean;
  soLuongSuDung: number;
  order: number;
  danhSachFormTiepNhan: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface BoPhanChiuTrachNhiem {
  ten: string;
  ma: string;
  phuongThucPhanCong: string;
  danhSachThanhVienXuLy: any[];
  maDonVi: string;
}

export interface CauHinhDotQuyTrinh {
  nguonDot: string;
  phanHeNguon: string;
  internalPath: string;
  internalPathMy: string;
}

export interface CauHinhValidate {
  isValidate: boolean;
  phanHeNguon: string;
  internalPath: string;
}

export interface CauTrucThanhToan {
  yeuCauTraPhi: boolean;
}

export interface DanhSachBuocXuLy {
  laBuocHienTai: unknown;
  ten: string;
  ma: string;
  maFormKhaiBao: string;
  danhSachMaBoPhanXuLy: string[];
  loaiThoiHanXuLy: string;
  soNgayXuLy: number;
  danhSachNgayXuLy: any[];
  doiTuongDieuPhoi: string;
  suDungCallback: boolean;
  danhSachVanBanLuuTru: any[];
  callbackSetting: CallbackSetting;
  trangThaiTiepNhan?: any;
}

export interface CallbackSetting {
  callbackUrl: string;
  callbackMethod: string;
  callbackBodyMapList: CallbackBodyMapList[];
}

export interface CallbackBodyMapList {
  loaiBodyCallback: string;
  sourceField: string;
  destinationField: string;
  maBuoc?: string;
}

export interface DanhSachFormKhaiBao {
  ten: string;
  ma: string;
  cauHinhLoaiHinh: CauHinhLoaiHinh[];
  fileId: string;
  file: File[];
}

export interface CauHinhLoaiHinh {
  colspan?: number;
  ten: string;
  ma: string;
  laDangMang: boolean;
  kieuDuLieu: string;
  readonly: boolean;
  loaiDefaultValue?: string;
  customAggregationArray: any[];
  arrayMapDanhMucDefaultValue: any[];
  thamDinh: any[];
  kichHoat: boolean;
  batBuoc: boolean;
  danhSachFileDinhKem: any[];
  danhSachCot?: CauHinhLoaiHinh[];
  danhSachCotHienThi?: any[];
  maDanhMuc?: string;
}

export interface File {
  _id: string;
  name: string;
  author: string;
  authorName: string;
  mimetype: string;
  size: number;
  scope: string;
  storageType: string;
  __v: number;
}

export interface DanhSachPhamViQuyTrinh {
  doiTuong: string;
  danhSachVaiTro: string[];
  danhSachMaThamChieu: any[];
  guiDenNguoiCuThe: boolean;
  danhSachNguoiNhanSv: any[];
  danhSachNguoiNhanGvCb: any[];
}

export type LichSuKhaiBaoProps = {
  identityCode: string;
  trangThaiThanhToan: ETrangThaiTT;
  quyTrinhId: string;
  quyTrinh: any;
  _id: string;
  phanHe?: string[];
  cauHinhDotQuyTrinh?: CauHinhDotQuyTrinh;
  ten?: string;
  linhVuc?: string;
  boPhanChiuTrachNhiem?: BoPhanChiuTrachNhiem;
  danhSachCauHinhThongTinChung?: DanhSachCauHinhThongTinChung[];
  isTraKetQua?: boolean;
  danhSachKhaiBao: any[];
  choPhepGuiNhieuLan?: boolean;
  danhSachPhamViQuyTrinh?: DanhSachPhamViQuyTrinh[];
  danhSachFormKhaiBao?: DanhSachFormKhaiBao[];
  danhSachFormTiepNhan?: DanhSachFormTiepNhan[];
  maFormHienThi?: string;
  maTruongHienThi?: string;
  cauTrucThanhToan?: CauTrucThanhToan;
  danhSachBoPhanXuLy?: BoPhanChiuTrachNhiem[];
  danhSachBuocXuLy: DanhSachBuocXuLy[];
  createdBySsoId?: string;
  createdByName?: string;
  active?: boolean;
  soLuongSuDung?: number;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  cauHinhValidate?: CauHinhValidate;
};

export type DanhSachCauHinhThongTinChung = {
  ten?: string;
  noiDung?: string;
  html?: boolean;
};

export type DanhSachFormKhaiBaoCauHinhLoaiHinh = {
  colspan?: number;
  ten?: string;
  ma?: string;
  laDangMang?: boolean;
  kieuDuLieu?: string;
  readonly?: boolean;
  loaiDefaultValue?: string;
  customAggregationArray?: any[];
  arrayMapDanhMucDefaultValue?: any[];
  thamDinh?: any[];
  kichHoat?: boolean;
  batBuoc?: boolean;
  danhSachFileDinhKem?: any[];
  danhSachCot?: any[];
  danhSachCotHienThi?: any[];
  maDanhMuc?: string;
  truongThongTinLienQuan?: string;
  giaTriLienQuan?: string[];
  textDisplay?: string;
};

export type DanhSachFormTiepNhan = {
  ten?: string;
  ma?: string;
  cauHinhLoaiHinh?: DanhSachFormTiepNhanCauHinhLoaiHinh[];
  file?: any[];
};

export type DanhSachFormTiepNhanCauHinhLoaiHinh = {
  ten?: string;
  ma?: string;
  laDangMang?: boolean;
  kieuDuLieu?: string;
  readonly?: boolean;
  customAggregationArray?: any[];
  arrayMapDanhMucDefaultValue?: any[];
  thamDinh?: any[];
  kichHoat?: boolean;
  batBuoc?: boolean;
  danhSachFileDinhKem?: any[];
  danhSachCot?: any[];
  danhSachCotHienThi?: any[];
};
