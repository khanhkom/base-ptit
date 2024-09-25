/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PhieuDrlProps {
  _id: string;
  dotDrlId: string;
  thongTinNguoiTao: ThongTinNguoiTAO;
  maLopHanhChinh: string;
  donVi: DonVi;
  nganh: Nganh;
  trangThai: string;
  diemSo: number;
  xepLoai: string;
  danhSachChamDiem: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  dotDrl: DotDrl;
}

export interface DonVi {
  _id: string;
  ten: string;
  maDonVi: string;
  donViChaId: string;
  loaiPhongBanId: string;
  loaiHinhDonVi: string;
  laDonViThucTe: boolean;
  soQuyetDinhThanhLap: null;
  tenVietTat: null;
  ngayRaQuyetDinh: null;
  diaChiDonVi: null;
  sdtDonVi: null;
  isBanGiamDoc: null;
  emailDonVi: null;
  loaiTrucThuoc: null;
  urlFileUpload: null;
  moTa: null;
  chucDanhKiemNhiem: null;
  hienThi: boolean;
  loaiTuChuTaiChinh: null;
  createdAt: Date;
  updatedAt: Date;
  loaiPhongBan: LoaiPhongBan;
  donViCha: DonViChaClass;
  danhSachDonViCon: any[];
  danhSachDonViViTri: DanhSachDonViViTri[];
  danhSachNhanSuDonViChinh: DanhSachNhanSuDonViChinh[];
}

export interface DanhSachDonViViTri {
  _id: string;
  tenChucVu: string;
  loai: string;
  soLuong: number | null;
  capChucVu: string;
  donViId: string;
  chucVu: LoaiPhongBan;
  donVi: DonViChaClass;
}

export interface LoaiPhongBan {
  ma: string;
  ten: string;
}

export interface DonViChaClass {
  maDonVi: string;
  ten: string;
}

export interface DanhSachNhanSuDonViChinh {
  _id: string;
  maCanBo: string;
  hoDem: string;
  ten: string;
  trangThai: any;
  loaiHoSo: any;
  cccdCMND: string;
  trangThaiChinhSua: any;
  loaiCanBoGiangVien: any;
  ssoId: string;
  donViChinh: DonViChinh;
  donViViTri: DonViViTri;
}

export interface DonViChinh {
  maDonVi: string;
  ten: string;
  _id: string;
}

export interface DonViViTri {
  capChucVu: any;
  tenChucVu: any;
  _id: string;
}

export interface DotDrl {
  _id: string;
  maHocKy: string;
  thoiGianBatDau: Date;
  thoiGianKetThuc: Date;
  danhSachDoiTuongChamDiem: DanhSachDoiTuongChamDiem[];
  mauDrlId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface DanhSachDoiTuongChamDiem {
  loaiDoiTuongChamDiem: string;
  thoiGianBatDauCham: Date;
  thoiGianKetThucCham: Date;
}

export interface Nganh {
  _id: string;
  dmNganhId: null;
  ma: string;
  ten: string;
  tenTiengAnh: null;
  canCuId: null;
  maDonVi: string;
  createdAt: Date;
  updatedAt: Date;
  maDmNganh: string;
  maTrinhDo: string;
  maNganhGoc: null;
  maCanCuPhapLy: null;
}

export interface ThongTinNguoiTAO {
  ssoId: string;
  ten: string;
  ma: string;
  donVi: string;
  muteThongBao: boolean;
}
