export interface LopHanhChinhProps {
  _id: string;
  createdAt: Date;
  doiTuong: string;
  khoaSinhVien: KhoaSinhVien;
  ma: null;
  maKhoaSinhVien: string;
  maNganh: string;
  nganh: Nganh;
  nhanSuSsoId: null;
  siSo: null;
  ten: string;
  updatedAt: Date;
}

export interface KhoaSinhVien {
  _id: string;
  createdAt: Date;
  ma: string;
  maHinhThucDaoTao: string;
  maTrinhDoDaoTao: string;
  namHocBatDau: number;
  namHocId: null;
  ten: string;
  updatedAt: Date;
}

export interface Nganh {
  _id: string;
  canCuId: null;
  createdAt: Date;
  dmNganh: DmNganh;
  dmNganhId: null;
  ma: string;
  maCanCuPhapLy: null;
  maDmNganh: string;
  maDonVi: string;
  maNganhGoc: null;
  maTrinhDo: string;
  ten: string;
  tenTiengAnh: null;
  updatedAt: Date;
}

export interface DmNganh {
  _id: string;
  createdAt: Date;
  dmNhomNganhId: null;
  dmTrinhDoId: null;
  ma: string;
  maDmNhomNganh: string;
  maDmTrinhDo: string;
  ten: string;
  updatedAt: Date;
}
