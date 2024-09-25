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
