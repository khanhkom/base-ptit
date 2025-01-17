export interface SinhVienProps {
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
  diemThi1: number;
  diemPhucKhao: null;
  diemThamDinh: null;
  diemKthp: number;
  diemThi2: null;
  diemTongKet: number;
  diemThang4: number;
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
}

export interface LopHocPhan {
  _id: string;
  trangThaiDiemLop: string;
  ten: string;
  maLop: string;
  maLopCha: null;
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
  trangThaiLop: string;
  lmsUrl: null;
  moodleShortname: null;
  cauHinhTkb: null;
  doiTuongLopHanhChinh: null;
  loai: string;
  hinhThucGiangDay: string;
  createdAt: Date;
  updatedAt: Date;
  lopHanhChinhId: null;
  tenCha: null;
  dotHuyId: null;
  hocPhan: HocPhan;
}

export interface KetQuaHocTapProp {
  _id: string;
  sinhVienSsoId: string;
  tenLopHocPhan: string;
  soThuTuLop: number;
  diemHpSvHk: DiemHPSVHKProps;
  lopHpSvId: string;
  maHocPhan: string;
  maHocKy: string;
  dotDangKyQuyDoiDiemId: null;
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
  diemThi1: number;
  diemPhucKhao: null;
  diemThamDinh: null;
  diemThi2: null;
  diemKthp: number;
  diemTongKet: number;
  diemThang4: number;
  trongSo1: number;
  trongSo2: number;
  trongSo3: number;
  trongSo4: number;
  trongSo5: number;
  trongSo6: null;
  trongSo7: null;
  trongSo8: null;
  trongSo9: null;
  trongSo10: null;
  diemChu: string;
  idDiemHpSvHkGoc: null;
  idHocPhanQuyDoi: null;
  trangThaiThi: string;
  trangThaiDuyet: string;
  trangThaiDuyetDiemThanhPhan: string;
  khoa: null;
  khoaDiemThi: null;
  public: boolean;
  isStatic: boolean;
  isCongNhanQuyDoiDiem: boolean;
  createdAt: Date;
  updatedAt: Date;
  maKhoaNganh: string;
  lopHocPhan: LopHocPhan;
  sinhVien: SinhVien;
  hocPhan: HocPhan;
  hocKy: HocKy;
}

export interface ValidateBuocThoiHoc {
  active: boolean;
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
  active: boolean;
  thamSo: ValidateCanhBaoThamSo;
  functionValidate: string;
}

export interface ValidateCanhBaoThamSo {
  maDonVi: string;
  isCoVanHocTap: boolean;
  phanTramTinChiKhongDat?: number;
  soTinChiNo?: number;
  diemTbHocKy1?: number;
  diemTbHocKyKhacKy1?: number;
  diemTrungBinhTichLuyNam1?: number;
  diemTrungBinhTichLuyNam2?: number;
  diemTrungBinhTichLuyNam3?: number;
  diemTrungBinhTichLuyNamTiepTheo?: number;
}

export interface LopHocPhan {
  _id: string;
  trangThaiDiemLop: string;
  ten: string;
  tenCha: null;
  maLop: string;
  maLopCha: null;
  thoiGianNopDiem: null;
  isNopDiemMuon: boolean;
  soTietTrongTuan: null;
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
  trangThaiLop: string;
  lmsUrl: null;
  lopNhuCau: null;
  moodleShortname: null;
  cauHinhTkb: null;
  maCSDT: null;
  loai: string;
  hinhThucGiangDay: string;
  maKhoaNganh: null;
  createdAt: Date;
  updatedAt: Date;
  lopHanhChinhId: null;
  dotHuyId: null;
  dotDangKyNhuCauId: null;
}

export interface SinhVien {
  ten: string;
}
export interface DiemHPSVHKProps {
  _id: string;
  sinhVienSsoId: string;
  tenLopHocPhan: string;
  soThuTuLop: number;
  lopHpSvId: string;
  maHocPhan: string;
  maHocKy: string;
  dotDangKyQuyDoiDiemId: null;
  diemThanhPhan1: number;
  diemThanhPhan2: number;
  diemThanhPhan3: number;
  diemThanhPhan4: number;
  diemThanhPhan5: number;
  diemThanhPhan6: number;
  diemThanhPhan7: number;
  diemThanhPhan8: number;
  diemThanhPhan9: number;
  diemThanhPhan10: number;
  diemKthp: number;
  diemTongKet: number;
  diemThi1: number;
  diemThi2: number;
  diemThang4: number;
  diemChu: string;
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
  idDiemHpSvHkGoc: null;
  idHocPhanQuyDoi: null;
  trangThaiThi: string;
  trangThaiDuyet: string;
  trangThaiDuyetDiemThanhPhan: string;
  khoa: null;
  khoaDiemThi: null;
  public: boolean;
  isStatic: boolean;
  isCongNhanQuyDoiDiem: boolean;
  createdAt: Date;
  updatedAt: Date;
  maKhoaNganh: string;
  hocPhan: HocPhan;
  sinhVien: SinhVien;
  hocKy: HocKy;
}

export interface HocKy {
  daKhoiTaoQuyDoiGioGiangDay: boolean;
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
  soNgayNhapDiem: number;
  sySoDuKienBatBuoc: null;
  tgBdLayYKienKhgd: null;
  tgKtLayYKienKhgd: null;
  tgBdPhanCongGiangDay: null;
  tgKtPhanCongGiangDay: null;
  active: boolean;
  namBatDau: number;
  createdAt: Date;
  updatedAt: Date;
  maNhomTietHoc: string;
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

export interface SinhVien {
  _id: string;
  anhDaiDienUrl: null;
  ma: string;
  ten: string;
  maNganh: string;
  namNhapHoc: null;
  trangThaiHoc: string;
  firstName: string;
  lastName: string;
  quocTich: null;
  danToc: null;
  tonGiao: null;
  cccd: string;
  noiCapCccd: string;
  ngayCapCccd: null;
  loaiNoiSinh: null;
  quocGiaNoiSinh: null;
  tinhTpNoiSinh: null;
  quanHuyenNoiSinh: null;
  xaPhuongNoiSinh: null;
  tinhTpQueQuan: null;
  quanHuyenQueQuan: null;
  xaPhuongQueQuan: null;
  soNhaTenDuongQueQuan: null;
  tinhTpThuongTru: null;
  quanHuyenThuongTru: null;
  xaPhuongThuongTru: null;
  soNhaTenDuongThuongTru: null;
  ngayVaoDoan: null;
  laDoanVien: null;
  laDangVien: null;
  daHocLopCamTinhDang: null;
  ngayVaoDang: null;
  ngayVaoDangChinhThuc: null;
  loaiKhuyetTat: null;
  canNang: null;
  chieuCao: null;
  soTaiKhoanNganHang: null;
  tenNganHang: null;
  chiNhanhNganHang: null;
  soDienThoai2: null;
  email2: null;
  soBaoHiemSinhVien: null;
  maBenhVienKhamChuaBenh: null;
  tenGiamHo: null;
  ngaySinhGiamHo: null;
  ngheNghiepGiamHo: null;
  soDienThoaiGiamHo: null;
  emailGiamHo: null;
  noiCongTacGiamHo: null;
  nguyenQuanGiamHo: null;
  diaChiGiamHo: null;
  tenChuHo: null;
  thanhVienGiaDinh: ThanhVienGiaDinh[];
  ngaySinh: Date;
  soDienThoai: null;
  nguoiLienLac: null;
  soDienThoaiNguoiLienLac: null;
  tenVoChong: null;
  ngheNghiepVoChong: null;
  diaChiVoChong: null;
  soDienThoaiVoChong: null;
  emailVoChong: null;
  thongTinAnhChiEm: null;
  thongTinCacCon: null;
  maChuyenNganh: null;
  email: string;
  namSinhCha: null;
  namSinhMe: null;
  maKhoaNganh: string;
  maKhoaNganh2: null;
  ssoId: string;
  gioiTinh: string;
  dotDkNhuCauAggStr: string;
  doiTuongDauVao: null;
  diemTrungTuyen: null;
  soQuyetDinhTrungTuyen: null;
  ngayKyQuyetDinhTrungTuyen: null;
  ngayNhapHoc: null;
  khuVucUuTienTuyenSinh: null;
  doiTuongUuTienTuyenSinh: null;
  namTotNghiep: null;
  xepLoaiHocTapTHPT: null;
  xepLoaiHanhKiemTHPT: null;
  queQuan: null;
  hoKhauThuongTru: null;
  trangThaiHocNganh2: null;
  trangThaiHocNganh1: string;
  doiTuong: string;
  maCSDT: null;
  createdAt: Date;
  updatedAt: Date;
  maKhoaSinhVien: string;
  maTrinhDo: string;
  maHinhThuc: string;
  dotNhapHocId: null;
  canCuId: null;
  maNganh2: null;
  maKhoaSinhVien2: null;
}

export interface ThanhVienGiaDinh {
  ten: null;
  ngheNghiep: null;
  soDienThoai?: null;
  diaChiHienNay: string;
  loaiThanhVien: string;
}
