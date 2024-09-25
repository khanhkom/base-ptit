export interface DataCalendarProps {
  vanBan: any;
  _id: string;
  noiDungCongViec: string;
  thoiGianBatDau: Date;
  thoiGianKetThuc: Date;
  diaDiemKhac: string;
  chuTri: ChuTri[];
  tatCaCanBo: boolean;
  thanhPhanNguoiThamDu: ThanhPhanNguoiThamDu[];
  thanhPhanThamDu: any[];
  thanhPhanThamDuKhac: string;
  donViChuanBi: DonVi;
  donViPhoiHop: DonVi[];
  donViPhoiHopKhac: string;
  taiLieu: { public: boolean; url: string }[];
  loaiDoiTuong: string;
  thietBiCNC: boolean;
  tenThietBiCNC: string;
  ghiChu: string;
  chuaPhatHanh: boolean;
  info: Info;
  listThamGiaBiXoa: any[];
  trangThai: string;
  trangThaiSua: string;
  chiTietThayDoi: ChiTietThayDoi[];
  sucChua: number;
  dauMoiLienHe: any[];
  createdAt: Date;
  updatedAt: Date;
  nam: number;
  tuan: number;
  __v: number;
  diaDiem: DiaDiem;
  hoan: boolean;
  loaiSuKien: string;
}

export interface ChiTietThayDoi {
  array: ArrayElement[];
  nguoiSua: NguoiSua;
}

export interface ArrayElement {
  oldValue: null;
  newValue: string;
  field: string;
  value: string;
}

export interface NguoiSua {
  name: string;
  maDinhDanh: string;
  thoiGian: Date;
}

export interface ChuTri {
  ten: string;
  maDinhDanh: string;
  tenDonVi: string;
  ssoId: string;
  id: number;
  tenGoi: string;
  thamGia: string;
  maDonVi: string;
  loaiChuTri: string;
}

export interface DiaDiem {
  value: string;
  _id: string;
}

export interface DonVi {
  tenDonVi: string;
  tenVietTat: null | string;
  maDonVi: string;
  thamGia: string;
}

export interface Info {
  nguoiTao: NguoiTAO;
}

export interface NguoiTAO {
  ssoId: string;
  code: string;
  fullname: string;
}

export interface ThanhPhanNguoiThamDu {
  ten: string;
  ssoId: string;
  maDinhDanh: string;
  tenDonVi: string;
  maDonVi: string;
  thamGia: string;
}
