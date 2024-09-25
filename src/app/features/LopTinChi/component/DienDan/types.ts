/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BaiDangProps {
  soDaXem: number;
  _id: string;
  ssoId: string;
  tieuDe: string;
  noiDung: string;
  ghiChu: any;
  ngayDang: Date;
  danhSachDaXem: ThongTinNguoiDangProps[];
  thongTinNguoiDang: ThongTinNguoiDangProps;
  isPublic: any;
  ghimBaiViet: any;
  fileDinhKem: any;
  createdAt: Date;
  updatedAt: Date;
  lopHanhChinhId: any;
  lopHocPhanId: string;
  lopHanhChinh: any;
  lopHocPhan: LopHocPhanProps;
  danhSachBinhLuan: any[];
}

export interface ThongTinNguoiDangProps {
  ma: string;
  hoTen: string;
  ssoId: string;
  thoiGian?: Date;
  isGiaoVien: boolean;
  avatar?: any;
}

export interface LopHocPhanProps {
  thoiKhoaBieuList: any;
  _id: string;
  trangThaiDiemLop: string;
  ten: string;
  tenCha: any;
  maLop: string;
  dotThiId: any;
  maLopCha: any;
  thoiGianNopDiem: any;
  isNopDiemMuon: boolean;
  soTietTrongTuan: any;
  nopDiem: boolean;
  khoaDiemTp: boolean;
  khoaDiemThi: boolean;
  maHocKy: string;
  maHocPhan: string;
  soThuTuNhom: any;
  soThuTuLop: number;
  siSo: number;
  siSoKeHoach: any;
  siSoToiDa: number;
  trangThaiDuyetGiangDay: string;
  maHocPhanHocKy: string;
  chotKeHoach: boolean;
  chotTkb: boolean;
  xepTkb: boolean;
  trangThaiLop: string;
  lmsUrl: any;
  lopNhuCau: any;
  moodleShortname: any;
  cauHinhTkb: any;
  doiTuongLopHanhChinh: string;
  maCSDT: string;
  maNhuCau: any;
  tenLopGhepTkb: any;
  loai: string;
  hinhThucGiangDay: string;
  maHinhThuc: string;
  maTinhChat: string;
  gioiThieuChung: any;
  createdAt: Date;
  updatedAt: Date;
  lopHanhChinhId: any;
  dotHuyId: any;
  dotDangKyNhuCauId: any;
}
