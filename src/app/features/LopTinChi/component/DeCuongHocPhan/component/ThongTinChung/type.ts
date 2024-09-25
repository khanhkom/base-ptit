export interface ThongTinDeCuongProps {
  _id: string;
  maHocPhan: string;
  ma: string;
  canCuId: null;
  maCanCu: string;
  isTinhDiem: boolean;
  active: boolean;
  chuanDauRa: null;
  mucTieuHocPhan: null;
  noiDungTomTat: null;
  noiDungChiTiet: null;
  nguoiBienSoan: null;
  ngayApDung: null;
  trongSo1: number;
  trongSo2: number;
  trongSo3: number;
  trongSo4: null;
  trongSo5: null;
  trongSo6: null;
  trongSo7: null;
  trongSo8: null;
  trongSo9: null;
  trongSo10: null;
  dacDiemDanhGia1: null;
  dacDiemDanhGia2: null;
  dacDiemDanhGia3: null;
  dacDiemDanhGia4: null;
  dacDiemDanhGia5: null;
  dacDiemDanhGia6: null;
  dacDiemDanhGia7: null;
  dacDiemDanhGia8: null;
  dacDiemDanhGia9: null;
  dacDiemDanhGia10: null;
  url: null;
  trangThaiDuyet: null;
  thoiDiemApDung: null;
  thongTinTrongSo: ThongTinTrongSo[];
  createdAt: Date;
  updatedAt: Date;
  hinhThucThi1Id: string;
  hinhThucThi2Id: string;
  hinhThucThi3Id: string;
  hinhThucThi4Id: string;
  hinhThucThi5Id: string;
  hinhThucThi6Id: string;
  hinhThucThi7Id: null;
  hinhThucThi8Id: null;
  hinhThucThi9Id: null;
  hinhThucThi10Id: null;
  hocPhan: HocPhan;
  canCu: CanCu;
}

export interface CanCu {
  _id: string;
  ma: string;
  ten: string;
  noiDung: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
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

export interface ThongTinTrongSo {
  moTa: string;
  trongSo: number;
  chuanDauRa: string;
  hinhThucDanhGia: string;
}
