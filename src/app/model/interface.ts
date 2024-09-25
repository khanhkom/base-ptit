export interface Account {
  [key: string]: any;
  HoVaTen?: string;
  hoTen?: string;
  token?: string;
  vai_tro?: string;
  ChucVu?: string;
  vaiTro?: string;
  role?: string;
  isCanBo?: boolean;
  isGiaoVien?: boolean;
  language?: string;
  username?: string;
  accessToken?: string;
  success?: boolean;
  data?: Data;
  _id?: string;
  email?: string;
  ssoId?: string;
  fullname?: string;
  anhDaiDienUrl?: null;
  ma?: string;
  ten?: string;
  maNganh?: string;
  namNhapHoc?: null;
  trangThaiHoc?: string;
  firstName?: null;
  lastName?: null;
  quocTich?: null;
  danToc?: null;
  tonGiao?: null;
  cccd?: null;
  noiCapCccd?: null;
  ngayCapCccd?: null;
  loaiNoiSinh?: null;
  quocGiaNoiSinh?: null;
  tinhTpNoiSinh?: null;
  quanHuyenNoiSinh?: null;
  xaPhuongNoiSinh?: null;
  tinhTpQueQuan?: null;
  quanHuyenQueQuan?: null;
  xaPhuongQueQuan?: null;
  soNhaTenDuongQueQuan?: null;
  tinhTpThuongTru?: null;
  quanHuyenThuongTru?: null;
  xaPhuongThuongTru?: null;
  soNhaTenDuongThuongTru?: null;
  ngayVaoDoan?: null;
  laDoanVien?: null;
  laDangVien?: null;
  daHocLopCamTinhDang?: null;
  ngayVaoDang?: null;
  ngayVaoDangChinhThuc?: null;
  loaiKhuyetTat?: null;
  canNang?: null;
  chieuCao?: null;
  soTaiKhoanNganHang?: null;
  tenNganHang?: null;
  chiNhanhNganHang?: null;
  soDienThoai2?: null;
  email2?: null;
  soBaoHiemSinhVien?: null;
  maBenhVienKhamChuaBenh?: null;
  tenGiamHo?: null;
  ngaySinhGiamHo?: null;
  ngheNghiepGiamHo?: null;
  soDienThoaiGiamHo?: null;
  emailGiamHo?: null;
  noiCongTacGiamHo?: null;
  nguyenQuanGiamHo?: null;
  diaChiGiamHo?: null;
  tenChuHo?: null;
  thanhVienGiaDinh?: null;
  ngaySinh?: Date;
  soDienThoai?: null;
  nguoiLienLac?: null;
  soDienThoaiNguoiLienLac?: null;
  tenVoChong?: null;
  ngheNghiepVoChong?: null;
  diaChiVoChong?: null;
  soDienThoaiVoChong?: null;
  emailVoChong?: null;
  thongTinAnhChiEm?: null;
  thongTinCacCon?: null;
  maChuyenNganh?: null;
  namSinhCha?: null;
  namSinhMe?: null;
  maKhoaNganh?: string;
  gioiTinh?: string;
  dotDkNhuCauAggStr?: string;
  doiTuongDauVao?: null;
  diemTrungTuyen?: null;
  soQuyetDinhTrungTuyen?: null;
  ngayKyQuyetDinhTrungTuyen?: null;
  ngayNhapHoc?: null;
  khuVucUuTienTuyenSinh?: null;
  doiTuongUuTienTuyenSinh?: null;
  namTotNghiep?: null;
  xepLoaiHocTapTHPT?: null;
  xepLoaiHanhKiemTHPT?: null;
  createdAt?: Date;
  updatedAt?: Date;
  maKhoaSinhVien?: string;
  maTrinhDo?: string;
  maHinhThuc?: string;
  dotNhapHocId?: null;
  canCuId?: null;
  lopHanhChinhList?: LopHanhChinhList[];
  nganh?: Nganh;
  hinhThucDaoTao?: DAOTAO;
  trinhDoDaoTao?: DAOTAO;
  khoaSinhVien?: KhoaSinhVien;
  chuyenNganh?: null;
  khoaNganh?: KhoaNganh;
}

export interface Data {
  _id?: string;
  email?: string;
  ssoId?: string;
  fullname?: string;
  username?: string;
}

export interface DAOTAO {
  _id?: string;
  danhMucHTDTId?: null;
  maDmHinhThuc?: string;
  ma?: string;
  ten?: string;
  createdAt?: Date;
  updatedAt?: Date;
  canCuId?: null;
  dmTrinhDoId?: null;
  maDmTrinhDo?: string;
}

export interface KhoaNganh {
  _id?: string;
  ten?: string;
  ma?: string;
  maKhoaSinhVien?: string;
  maNganh?: string;
  maChuongTrinhDaoTao?: string;
  namBatDau?: number;
  namKetThuc?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface KhoaSinhVien {
  _id?: string;
  ma?: string;
  ten?: string;
  namHocBatDau?: number;
  createdAt?: Date;
  updatedAt?: Date;
  namHocId?: null;
  maHinhThucDaoTao?: string;
  maTrinhDoDaoTao?: string;
}

export interface LopHanhChinhList {
  _id?: string;
  ma?: null;
  ten?: string;
  maNganh?: string;
  nhanSuSsoId?: string;
  siSo?: number;
  createdAt?: Date;
  updatedAt?: Date;
  maKhoaSinhVien?: string;
  LopHcSvModel?: LopHcSvModel;
}

export interface LopHcSvModel {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  lopHanhChinhId?: string;
  sinhVienSsoId?: string;
}

export interface Nganh {
  _id?: string;
  dmNganhId?: null;
  ma?: string;
  ten?: string;
  tenTiengAnh?: null;
  canCuId?: null;
  maDonVi?: string;
  createdAt?: Date;
  updatedAt?: Date;
  maDmNganh?: string;
  maTrinhDo?: string;
  maNganhGoc?: null;
  maCanCuPhapLy?: null;
}
