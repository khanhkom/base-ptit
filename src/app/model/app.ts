/* eslint-disable @typescript-eslint/no-explicit-any */
import { DanhMucNCKHProps } from '@features/QuanLyKhoaHocV2/type';
import { ThemeType } from '@theme';

export interface AppState {
  internetState: boolean;

  profile: any;

  token: string | undefined;

  loadingApp: boolean;

  showDialog: boolean;

  theme: ThemeType;

  account: AccountProps | null;

  loaiTinTuc: Array<any>;

  danhMucNCKH: Array<DanhMucNCKHProps>;

  codePhanQuyen: string[];

  colorCalendar: { loaiLich: string; maMau: string; _id?: string }[];
}

export interface AccountProps {
  anhDaiDienUrl?: string;
  soNhaTenDuongThuongTru?: string;
  xaPhuongThuongTru?: string;
  quanHuyenThuongTru?: string;
  tinhTpThuongTru?: string;
  trangThaiHoc?: string;
  danToc?: string;
  choPhepSua?: boolean;
  _id: string;
  diaChiGiamHo: any;
  ngayCapCccd?: any;
  noiCapCccd?: any;
  hoKhauThuongTru?: any;
  khoaSinhVien?: any;
  soDienThoai?: any;
  mail?: any;
  maDinhDanh?: string;
  khoaNganh: any;
  lopHanhChinhList: any;
  HoVaTen: string;
  hoTen: string;
  token: string;
  vai_tro: string;
  ChucVu: string;
  vaiTro: string;
  cccd: any;
  soTaiKhoanNganHang: string | null;
  role: string;
  isCanBo: boolean;
  isGiaoVien: boolean;
  language: string;
  username: string;
  accessToken: string;
  success: boolean;
  data: Data;
  email: string;
  ma: string;
  ssoId: string;
  firstname: string;
  lastname: string;
  fullname: string;
  hoDem: string;
  ten: string;
  ngaySinh: Date;
  queQuan: any;
  maCanBo: string;
  tenGoiKhac: any;
  biDanh: any;
  trangThai: string;
  gioiTinh: string;
  noiSinhThanhPhoMa: any;
  noiSinhThanhPhoTen: any;
  noiSinhQuanMa: any;
  noiSinhQuanTen: any;
  noiSinhXaMa: any;
  noiSinhXaTen: any;
  queQuanThanhPhoMa: any;
  queQuanThanhPhoTen: any;
  queQuanQuanMa: any;
  queQuanQuanTen: any;
  queQuanXaMa: any;
  queQuanXaTen: any;
  hoKhauSoNha: any;
  hoKhauThanhPhoMa: any;
  hoKhauThanhPhoTen: any;
  hoKhauQuanMa: any;
  hoKhauQuanTen: any;
  hoKhauXaMa: any;
  hoKhauXaTen: any;
  noiOSoNha: any;
  noiOThanhPhoMa: string;
  noiOThanhPhoTen: string;
  noiOQuanMa: string;
  noiOQuanTen: string;
  noiOXaMa: string;
  noiOXaTen: string;
  sdtCaNhan: string;
  sdtNhaRieng: any;
  sdtCoQuan: any;
  ghiChu: any;
  fullName: any;
  quocTichId: any;
  danTocId: any;
  tonGiaoId: any;
  ngayVaoNganhYTe: any;
  cccdCMND: string;
  ngayCap: any;
  noiCap: any;
  tinhTrangHonNhanId: any;
  tenNganHang: any;
  chiNhanh: any;
  soTaiKhoan: any;
  soSoBHXH: string;
  noiCapBHXH: any;
  ngayCapBHXH: any;
  ngayThamGiaBHXH: any;
  ghiChuBHXH: any;
  maSoThue: any;
  ngayCapMaSoThue: any;
  listFileUrl: any;
  chieuCao: any;
  canNang: any;
  nhomMau: any;
  tinhTrangSucKhoe: any;
  laGiangVienCoHuu: any;
  chungChiSuPhamGiangVien: string;
  laChuyenVien: any;
  trinhDoGiaoDucPhoThongId: any;
  trinhDoLyLuanChinhTriId: string;
  trinhDoQuanLyHanhChinhId: any;
  trinhDoTinHocId: string;
  danhHieuPhongTangId: any;
  soTruongCongTac: any;
  ngoaiNguId: string;
  khungNangLucNgoaiNguId: string;
  ngayVaoDangDuBi: Date;
  ngayChinhThuc: Date;
  noiVaoDang: any;
  soTheDang: any;
  chucVuDangId: any;
  ngayNhapNgu: any;
  ngayXuatNgu: any;
  donViQuanDoi: any;
  chucVuQuanDoi: any;
  ngayVaoDoan: any;
  noiVaoDoan: any;
  soTheDoan: any;
  chucVuDoanId: any;
  ngayThamGiaCongDoan: any;
  noiThamGiaCongDoan: any;
  soTheCongDoan: any;
  hinhThucTuyenDungId: any;
  dotTuyenDungId: any;
  ngayTuyenDung: any;
  soBaoDanh: any;
  ngayBatDauLamViec: any;
  ngayVaoNganh: any;
  emailCanBo: string;
  ngachTuyenDungId: any;
  donViViTriTuyenDungId: any;
  donViTuyenDungId: string;
  anhDaiDien: any;
  loaiHinhLamViec: any;
  trinhDoQuanLyNhaNuocId: string;
  urlAnhDaiDien: any;
  donViQuanLyId: any;
  donViChinhId: string;
  loaiHoSo: string;
  loaiHoSoKhac: any;
  laGiangVienNuocNgoai: any;
  coQuanChuQuan: any;
  soGiayPhepLaoDong: any;
  lichSuBanThanKhaiRo: any;
  lichSuBanThanThamGia: any;
  lichSuBanThanCoThanNhan: any;
  loaiCanBoGiangVien: string;
  chucDanhNgheNghiep: any;
  hang: any;
  maDanToc: string;
  namDuocPhong: any;
  ngayHuong: any;
  tenDanToc: string;
  maQuocTich: string;
  tenQuocTich: string;
  chucVuCongTac: any;
  donViDangCongTac: any;
  idDotCapNhat: any;
  maTonGiao: string;
  tenTonGiao: string;
  soHieuVienChuc: any;
  hocHam: any;
  hocVi: any;
  linhVucDaoTaoId: any;
  linhVucDaoTaoMa: any;
  soHochieu: any;
  toChucCuDen: any;
  thoiGianBatDauCuDen: any;
  thoiGianKetThucCuden: any;
  linhVuc: any;
  chuyenNganh: any;
  linhVucDaoTaoTen: any;
  tenNghiaVuDanQuanTuVe: any;
  ngayKetNapDanQuanTuVe: any;
  ngayHoanThanhNghiaVu: any;
  chucDanhDanQuanTuVe: any;
  soQuyetDinhHoanThanh: any;
  nguoiKyQuyetDinh: any;
  maHeThong: number;
  maDonViChinh: string;
  chucVuChinhId: string;
  maChucVuChinh: string;
  chatLuongNhanSu: string;
  namKyHopDong: any;
  nganh?: any;
  maHoSo: any;
  conViTriChucDanhCoHieuLuc: boolean;
  donViViTriId: string;
  maNoiBo: string;
  khac: any;
  tenDonViTuyenDung: any;
  tenDonViViTriTuyenDung: any;
  viTriUngTuyen: any;
  banGoc: boolean;
  chucDanhGiangVienId: any;
  trangThaiChinhSua: string;
  trangThaiHoSoUngTuyen: any;
  ngachLuongId: any;
  thoiGianGuiDuyet: any;
  ngayBatDauLamViecTaiTruong: any;
  yeuCauChinhSua: any;
  urlFileMinhChung: any;
  taiLieuUngTuyen: any;
  sinhMaHeThong: boolean;
  createdAt: Date;
  updatedAt: Date;
  danhSachDonViCanBoViTri: DanhSachDonViCanBoViTri[];
  trinhDoLyLuanChinhTri: TrinhDoLyLuanChinhTri;
  trinhDoQuanLyHanhChinh: any;
  danhSachThongTinTrinhDoDaoTao: DanhSachThongTinTrinhDoDAOTAO[];
  danhSachHocHam: any[];
  danhSachDienBienLuong: any[];
  chucVuDang: any;
  chucVuDoan: any;
  hinhThucTuyenDung: any;
  donViTuyenDung: DonVi;
  danhSachQuaTrinhCuDiCongTac: any[];
  danhSachQuanHeGiaDinhVeBanThan: any[];
  trinhDoQuanLyNhaNuoc: TrinhDoLyLuanChinhTri;
  donViViTriTuyenDung: any;
  donViChinh: DonVi;
  donViQuanLy: any;
  tinhTrangHonNhan: any;
  ngachTuyenDung: any;
  diemTuyenDung: any;
  dotTuyenDung: any;
  chucVuChinh: ChucVuChinh;
  donViViTri: DonViViTri;
  chucDanhGiangVien: any;
  ngachLuong: any;
  danhSachKhenThuong: any[];
  danhSachKyLuat: any[];
  danhSachQuaTrinhDaoTaoBoiDuong: any[];
  danhSachQuaTrinhCongTac: any[];
  danhSachQuanHeGiaDinhVeBenVoChong: any[];
  danhSachThongTinTinHoc: any[];
  danhSachThongTinNgoaiNgu: any[];
  danhSachThongTinTrinhDoLyLuanChinhTri: any[];
  danhSachThongTinTrinhDoQuanLyHanhChinh: any[];
  danhSachThongTinTrinhDoQuanLyNhaNuoc: any[];
  danhSachBoiDuongQuocPhongAnNinh: any[];
}

export interface ChucVuChinh {
  ma: string;
  ten: string;
  _id: string;
}

export interface DanhSachDonViCanBoViTri {
  _id: string;
  thongTinNhanSuId: string;
  donViId: string;
  chucVuId: string;
  donViViTriId: string;
  conHieuLuc: boolean;
  idGoc: any;
  soQuyetDinh: any;
  ngayQuyetDinh: any;
  hieuLucTuNgay: any;
  hieuLucDenNgay: any;
  laDonViChinh: boolean;
  loaiQuyetDinh: any;
  urlFileUpload: any;
  createdAt: Date;
  updatedAt: Date;
  chucVu: TrinhDoLyLuanChinhTri;
  donVi: DonVi;
  donViViTri: DonViViTri;
}

export interface TrinhDoLyLuanChinhTri {
  ma: string;
  ten: string;
}

export interface DonVi {
  maDonVi: string;
  ten: string;
}

export interface DonViViTri {
  tenChucVu: string;
  capChucVu: string;
  _id: string;
}

export interface DanhSachThongTinTrinhDoDAOTAO {
  _id: string;
  thongTinNhanSuId: string;
  idGoc: any;
  trinhDoDaoTaoId: string;
  nganh: string;
  maNganh: string;
  noiDaoTao: any;
  namTotNghiep: any;
  hinhThucDaoTaoId: any;
  vanBangChungChi: any;
  coSoDaoTao: any;
  nuocDaoTao: any;
  fileDinhKem: any;
  thoiGianBatDau: any;
  thoiGianKetThuc: any;
  createdAt: Date;
  updatedAt: Date;
  trinhDoDaoTao: TrinhDoDAOTAO;
}

export interface TrinhDoDAOTAO {
  _id: string;
  ma: string;
  ten: string;
  soThuTu: number;
  moTa: any;
  suDung: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface Data {
  _id: string;
  email: string;
  ssoId: string;
  firstname: string;
  lastname: string;
  fullname: string;
  username: string;
}
