export interface HTDGProps {
  _id: string;
  ten: string;
  field: number;
  createdAt: Date;
  updatedAt: Date;
  trongSo: number;
}

export interface DSDiemProps {
  _id: string;
  ten: string;
  field: number;
  createdAt: Date;
  updatedAt: Date;
  trongSo: number;
}

export interface SinhVienProps {
  ten: string;
  ma: string;
  _id: string;
  sinhVienSsoId: string;
  diemThanhPhan1: number;
  diemThanhPhan2: number;
  diemThanhPhan3: number;
  diemThanhPhan4: null;
  diemThanhPhan5: null;
  diemThanhPhan6: null;
  diemThanhPhan7: null;
  diemThanhPhan8: null;
  diemThanhPhan9: null;
  diemThanhPhan10: null;
  khoa: boolean;
  diemThi1: null;
  diemPhucKhao: null;
  diemThamDinh: null;
  diemKthp: null;
  diemThi2: null;
  diemTongKet: null;
  diemThang4: null;
  diemChu: string;
  khoaDiemThi: boolean;
  idLopHpLopHc: null;
  trangThaiThi: string;
  public: boolean;
  trangThaiDuyet: string;
  trangThaiDuyetDiemThanhPhan: string;
  idPhieuDktc: null;
  loai: string;
  billItemId: null;
  maKhoaNganh: null;
  trangThaiThanhToan: string;
  createdAt: Date;
  updatedAt: Date;
  lopHocPhanId: string;
  maSvHk: string;
  maSvHp: string;
  lopHocPhan: LopHocPhan;
  sinhVien: SinhVien;
  diemCongTong: number;
  diemCongTrungBinh: number;
  vangCoPhep: number;
  vangKhongPhep: number;
  muonVeSom: number;
}

export interface LopHocPhan {
  _id: string;
  ten: string;
  maHocKy: string;
  maHocPhan: string;
  trangThaiLop: string;
  trangThaiDiemLop: string;
  trangThaiDuyetGiangDay: string;
  hinhThucGiangDay: string;
  maLopCha: null;
  maLop: string;
  loai: string;
  soThuTuLop: number;
  soThuTuNhom: null;
  hocPhan: HocPhan;
  hocKy: HocKy;
  deCuong: LopHocPhanDeCuong;
}

export interface LopHocPhanDeCuong {
  deCuongId: string;
  deCuong: DeCuongDeCuong;
}

export interface DeCuongDeCuong {
  trongSo1: number;
  trongSo2: number;
  trongSo3: number;
  trongSo4: number;
  trongSo5: number;
  trongSo6: number;
  trongSo7: number;
  trongSo8: number;
  trongSo9: number;
  trongSo10: number;
  isTinhDiem: boolean;
}

export interface HocKy {
  ten: string;
  ma: string;
}

export interface HocPhan {
  ten: string;
  ma: string;
  deCuongHienTaiId: null;
  soTinChi: number;
}

export interface SinhVien {
  ma: string;
  ten: string;
  firstName: string;
  anhDaiDienUrl: null;
  lastName: string;
  ssoId: string;
  soDienThoai: null;
  email: string;
}
