export interface KhoaNganhSVProp {
  khoaNganhChinh: KhoaNganhProp;
  khoaNganhPhu: KhoaNganhProp;
}

export interface KhoaNganhProp {
  _id: string;
  ten: string;
  ma: string;
  maKhoaSinhVien: string;
  maNganh: string;
  maChuongTrinhDaoTao: string;
  namBatDau: number;
  namKetThuc: number;
  ghiChu: string;
  createdAt: Date;
  updatedAt: Date;
  khoaSinhVien: KhoaSinhVien;
  nganh: Nganh;
}

export interface KhoaSinhVien {
  _id: string;
  ma: string;
  ten: string;
  namHocBatDau: number;
  createdAt: Date;
  updatedAt: Date;
  namHocId: null;
  maHinhThucDaoTao: string;
  maTrinhDoDaoTao: string;
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
