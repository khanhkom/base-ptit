export interface KeHoachNamProps {
  _id: string;
  idDotXayDungKeHoachNam: string;
  phongKeToanDuyet: boolean;
  maHoatDong: string;
  thuTuHoatDong: number;
  noiDung: string;
  maLinhVucChung: string;
  maLinhVucChiTiet: string;
  nam: number;
  tuThang: number;
  denThang: number;
  donViDauMoi: DonVi;
  donViPhoiHop: DonVi[];
  maNguonKinhPhi: string[];
  __v: number;
  donViDaRaSoat: boolean;
  lanhDaoDuyetLan2: boolean;
  linhVucChiTiet: LinhVucChiTiet;
  linhVucChung: LinhVucChiTiet;
  nguonKinhPhi: LinhVucChiTiet[];
  danhSachYeuCau: DanhSachYeuCau[];
}

export interface DanhSachYeuCau {
  _id: string;
  noiDung: string;
  idKeHoachNam: string;
  __v: number;
}

export interface DonVi {
  maDonVi: string;
  tenDonVi: string;
  _id: string;
}

export interface LinhVucChiTiet {
  _id: string;
  ma: string;
  maLinhVucCha?: string;
  ten: string;
  __v: number;
}
