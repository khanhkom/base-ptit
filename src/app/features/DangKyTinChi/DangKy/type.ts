import { ELoaiHocPhanDangKyTinChi, ETrangThaiDangKyTinChi } from '@common';

export interface HocPhanProps {
  _id: string;
  externalId: any;
  ma: string;
  ten: string;
  soTinChi: number;
  maDonVi: string;
  tenVietTatDonVi: any;
  tenTiengAnh: any;
  maLoaiHocPhan: string;
  active: boolean;
  loaiHocPhi: string;
  loaiPhong: string;
  loaiPhongThucHanh: string;
  siSoToiThieu: any;
  siSoToiDa: any;
  soTietTrongTuan: any;
  coXepThoiKhoaBieu: boolean;
  createdAt: Date;
  updatedAt: Date;
  maTrinhDoDaoTao: string;
  deCuongHienTaiId: string;
  trongSoHocPhanList: any[];
  hocLieuList: any[];
  deCuongHienTai: DeCuongHienTaiProps;
  trinhDoDaoTao: TrinhDoDaoTaoHocPhanProps;
  loaiHocPhan: LoaiHocPhanProps;
}

export interface DeCuongHienTaiProps {
  _id: string;
  maHocPhan: string;
  ma: string;
  canCuId: any;
  maCanCu: any;
  isTinhDiem: boolean;
  active: boolean;
  chuanDauRa: any;
  mucTieuHocPhan: any;
  noiDungTomTat: any;
  noiDungChiTiet: any;
  nguoiBienSoan: any;
  ngayApDung: any;
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
  dacDiemDanhGia1: any;
  dacDiemDanhGia2: any;
  dacDiemDanhGia3: any;
  dacDiemDanhGia4: any;
  dacDiemDanhGia5: any;
  dacDiemDanhGia6: any;
  dacDiemDanhGia7: any;
  dacDiemDanhGia8: any;
  dacDiemDanhGia9: any;
  dacDiemDanhGia10: any;
  url: any;
  trangThaiDuyet: any;
  thoiDiemApDung: any;
  thongTinTrongSo: any;
  createdAt: Date;
  updatedAt: Date;
  hinhThucThi1Id: any;
  hinhThucThi2Id: any;
  hinhThucThi3Id: any;
  hinhThucThi4Id: any;
  hinhThucThi5Id: any;
  hinhThucThi6Id: any;
  hinhThucThi7Id: any;
  hinhThucThi8Id: any;
  hinhThucThi9Id: any;
  hinhThucThi10Id: any;
}

export interface LoaiHocPhanProps {
  _id: string;
  ma: string;
  ten: string;
  isTinhDiem: boolean;
  isTinhSoTinChiDangKy: boolean;
  isTinhSoTinChiTichLuy: boolean;
  khoiTuChon: boolean;
  khoiTotNghiep: boolean;
  hocNgoaiGio: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrinhDoDaoTaoHocPhanProps {
  _id: string;
  dmTrinhDoId: any;
  maDmTrinhDo: string;
  ma: string;
  ten: string;
  externalId: any;
  active: boolean;
  canCuId: any;
  createdAt: Date;
  updatedAt: Date;
}

//Lớp học phần Props
export interface LopHocPhanDKTCProps {
  phongHoc: string;
  trangThai: ETrangThaiDangKyTinChi;
  maHoaLichHoc: MaHoaLichHoc[];
  thoiGianNhapDiem: ThoiGianNhapDiem;
  _id: string;
  trangThaiDiemLop: string;
  ten: string;
  tenMonHoc: string;
  tenCha: null;
  maLop: string;
  maLopCha: null;
  thoiGianNopDiem: null;
  isNopDiemMuon: boolean;
  soTietTrongTuan: number;
  nopDiem: boolean;
  khoaDiemTp: boolean;
  khoaDiemThi: boolean;
  maHocKy: string;
  maHocPhan: string;
  soThuTuNhom: null;
  soThuTuLop: number;
  siSo: number;
  siSoToiDa: number;
  trangThaiDuyetGiangDay: string;
  maHocPhanHocKy: string;
  chotKeHoach: boolean;
  chotTkb: boolean;
  trangThaiLop: string;
  lmsUrl: null;
  lopNhuCau: boolean;
  moodleShortname: null;
  cauHinhTkb: CauHinhTkb[];
  doiTuongLopHanhChinh: null;
  maCSDT: string;
  loai: string;
  hinhThucGiangDay: string;
  maHinhThuc: string;
  maTinhChat: null;
  createdAt: Date;
  updatedAt: Date;
  lopHanhChinhId: null;
  dotHuyId: null;
  dotDangKyNhuCauId: null;
  hocPhan: HocPhan;
  parent: null;
  deCuong: null;
  hocKy: HocKy;
  listLopHpKn: ListLopHPKn[];
  nhanSuList: any[];
  children: any[];
  thoiKhoaBieuList: ThoiKhoaBieuListProps[];
  soTinChi: number;
  maKhoaNganh: string;
}

export interface CauHinhTkb {
  tuan: number;
}

export interface HocKy {
  daKhoiTaoQuyDoiGioGiangDay: boolean;
  externalId: null;
  soTinChiDangKyHocTuNguyen: null;
  soHocPhanDangKyHocTuNguyen: null;
  _id: string;
  ma: string;
  ten: string;
  soThuTu: number;
  namHocId: string;
  idDotKhaoSatTietHoc: null;
  thoiGianBatDau: Date;
  soTuan: number;
  isKyChinh: boolean;
  isToChucDangKyNhuCau: null;
  loaiThoiGianNhapDiemHocKy: string;
  thoiGianNhapDiemBatDau: null;
  thoiGianNhapDiemKetThuc: null;
  soNgayNhapDiem: null;
  sySoDuKienBatBuoc: null;
  tgBdLayYKienKhgd: null;
  tgKtLayYKienKhgd: null;
  tgBdPhanCongGiangDay: Date;
  tgKtPhanCongGiangDay: Date;
  active: boolean;
  namBatDau: number;
  daChotLopHocPhan: null;
  createdAt: Date;
  updatedAt: Date;
  maNhomTietHoc: null;
}

export interface HocPhan {
  _id: string;
  externalId: null;
  ma: string;
  ten: string;
  soTinChi: number;
  maDonVi: string;
  tenVietTatDonVi: null;
  tenTiengAnh: null;
  maLoaiHocPhan: string;
  active: boolean;
  maNganh: string;
  loaiHocPhi: string;
  loai: ELoaiHocPhanDangKyTinChi;
  maKhoaNganh: string;
  loaiPhong: Loai;
  loaiPhongThucHanh: string;
  siSoToiThieu: null;
  siSoToiDa: null;
  soTietTrongTuan: null;
  coXepThoiKhoaBieu: boolean;
  createdAt: Date;
  updatedAt: Date;
  maTrinhDoDaoTao: string;
  deCuongHienTaiId: string;
}

export enum Loai {
  LýThuyết = 'Lý thuyết',
}

export interface ListLopHPKn {
  _id: string;
  tenLopHp: string;
  maKn: string;
  createdAt: Date;
  updatedAt: Date;
  khoaNganh: KhoaNganh;
}

export interface KhoaNganh {
  _id: string;
  ten: string;
  active: boolean;
  externalId: null;
  ma: string;
  maKhoaSinhVien: string;
  maNganh: string;
  maChuongTrinhDaoTao: string;
  namBatDau: number;
  namKetThuc: number;
  ghiChu: string;
  maLoaiKhoaNganh: null;
  maCSDT: string;
  maTinhChatCt: null;
  cachTinhTichLuy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MaHoaLichHoc {
  danhSachTuan: DanhSachTuan[];
  loaiHinhHocTap: Loai;
  maNhomTietHoc: MaNhomTietHoc;
  phongHoc: string;
  tietBatDau: number;
  soTiet: number;
  thu: number;
  nhanSu: { hoDem: string; ten: string };
  tenNhanSu: string;
  id: string;
}

export interface DanhSachTuan {
  tuan: number;
  tkbId: string;
}

export enum MaNhomTietHoc {
  G = 'G',
}

export interface ThoiGianNhapDiem {
  start: null;
  end: null;
}

export interface ThoiKhoaBieuListProps {
  nhanSuSsoId: null;
  tietBatDau: number;
  tietKetThuc: number;
  thoiGianBatDau: string;
  thoiGianKetThuc: Date;
  loaiHinhHocTap: Loai;
  maNhomTietHoc: MaNhomTietHoc;
  phongHoc: string;
  ten?: string | undefined;
  tenMonHoc?: string | undefined;
  ngay: string;
  _id: string;
}

// Mức thu me
export interface MucThuMeProps {
  mucThuKhoaNganhChinh: MucThuKhoaNganhProps | null;
  mucThuKhoaNganhPhu: MucThuKhoaNganhProps | null;
}

export interface MucThuKhoaNganhProps {
  _id: string;
  ten: null;
  maKhoaSinhVien: null;
  maNganh: string;
  maMucThuCoBan: string;
  heSoHocCaiThien: number;
  heSoHocLai: number;
  heSoTienTrinh: number;
  mucThuChuaTheoTienTrinh: null;
  mucThuNgoaiChuongTrinh: null;
  unitAmount: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  maNamHoc: string;
  namHoc: NamHocProps;
  nganh: NganhProps;
  khoaSinhVien: null;
}

export interface NamHocProps {
  namBatDau: number;
  namKetThuc: number;
  _id: string;
  externalId: null;
  active: boolean;
  ma: string;
  ten: string;
  thoiGianBatDau: Date;
  soTuan: number;
  soKyChinh: number;
  soKyPhu: number;
  isKhoiTaoKeHoach: boolean;
  thoiGianXinYKien: null;
  url: string;
  ngayBdLayYKien: Date;
  ngayKtLayYKien: Date;
  daChotKeHoachNamHoc: boolean;
  trangThaiDuyetMucHocPhi: string;
  daGuiLayYKienKeHoachNamHoc: boolean;
  maKhoaMoiList: string[];
  createdAt: Date;
  updatedAt: Date;
  hinhThucDaoTaoId: null;
  trinhDoDaoTaoId: null;
  phienBanKhnhId: string;
}

export interface NganhProps {
  tenVietTat: string;
  _id: string;
  externalId: null;
  active: boolean;
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

//Đợt đăng ký
export interface DotDangKyTCProps {
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
  maHinhThucDaoTao: string;
  maTrinhDoDaoTao: string;
  maCoSoDaoTao: string;
  createdAt: Date;
  updatedAt: Date;
  maHocKy: string;
}
//Đăng ký tc me
export interface DotDKTCMeProps {
  _id: string;
  sinhVienSsoId: string;
  maHocKy: string;
  trangThaiSvDangKyTinChi: string;
  ghiChu: string;
  maSinhVien: string;
  hoTen: string;
  soTinChiToiThieu: number;
  soTinChiToiDa: number;
  soTinChiToiDaSongNganh: number;
  createdAt: Date;
  updatedAt: Date;
  dotDangKyTinChiId: string;
}
