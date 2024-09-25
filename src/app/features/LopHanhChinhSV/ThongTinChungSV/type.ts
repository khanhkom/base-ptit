export interface SinhVienLHCProps {
  _id: string;
  anhDaiDienUrl: string;
  ma: string;
  ten: string;
  maNganh: string;
  namNhapHoc: any;
  trangThaiHoc: string;
  choPhepSua: boolean;
  firstName: string;
  lastName: string;
  quocTich: string;
  danToc: string;
  tonGiao: string;
  cccd: string;
  noiCapCccd: string;
  ngayCapCccd: Date;
  loaiNoiSinh: string;
  quocGiaNoiSinh: any;
  tinhTpNoiSinh: string;
  quanHuyenNoiSinh: any;
  xaPhuongNoiSinh: any;
  tinhTpQueQuan: string;
  quanHuyenQueQuan: string;
  xaPhuongQueQuan: string;
  soNhaTenDuongQueQuan: any;
  tinhTpThuongTru: string;
  quanHuyenThuongTru: string;
  xaPhuongThuongTru: string;
  soNhaTenDuongThuongTru: string;
  ngayVaoDoan: any;
  laDoanVien: any;
  laDangVien: any;
  daHocLopCamTinhDang: any;
  ngayVaoDang: any;
  ngayVaoDangChinhThuc: any;
  loaiKhuyetTat: any;
  canNang: number;
  chieuCao: number;
  soTaiKhoanNganHang: string;
  tenNganHang: string;
  chiNhanhNganHang: any;
  soDienThoai2: any;
  email2: string;
  soBaoHiemSinhVien: any;
  maBenhVienKhamChuaBenh: any;
  tenGiamHo: any;
  ngaySinhGiamHo: any;
  ngheNghiepGiamHo: any;
  soDienThoaiGiamHo: any;
  emailGiamHo: any;
  noiCongTacGiamHo: any;
  nguyenQuanGiamHo: any;
  diaChiGiamHo: any;
  tenChuHo: any;
  thanhVienGiaDinh: ThanhVienGiaDinh[];
  ngaySinh: Date;
  soDienThoai: string;
  nguoiLienLac: any;
  soDienThoaiNguoiLienLac: any;
  tenVoChong: any;
  ngheNghiepVoChong: any;
  diaChiVoChong: any;
  soDienThoaiVoChong: any;
  emailVoChong: any;
  thongTinAnhChiEm: any;
  thongTinCacCon: any;
  maChuyenNganh: any;
  email: string;
  namSinhCha: any;
  namSinhMe: any;
  maKhoaNganh: string;
  maKhoaNganh2: any;
  ssoId: string;
  gioiTinh: string;
  dotDkNhuCauAggStr: string;
  doiTuongDauVao: any;
  diemTrungTuyen: any;
  soQuyetDinhTrungTuyen: any;
  ngayKyQuyetDinhTrungTuyen: any;
  ngayNhapHoc: any;
  khuVucUuTienTuyenSinh: any;
  doiTuongUuTienTuyenSinh: any;
  namTotNghiep: any;
  xepLoaiHocTapTHPT: any;
  xepLoaiHanhKiemTHPT: any;
  queQuan: any;
  hoKhauThuongTru: any;
  trangThaiHocNganh2: any;
  trangThaiHocNganh1: string;
  doiTuong: string;
  maCSDT: any;
  createdAt: Date;
  updatedAt: Date;
  maKhoaSinhVien: string;
  maTrinhDo: string;
  maHinhThuc: string;
  dotNhapHocId: any;
  canCuId: any;
  maNganh2: any;
  maKhoaSinhVien2: any;
  LopHcSvModel: LopHcSvModel;
}

export interface LopHcSvModel {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  lopHanhChinhId: string;
  sinhVienSsoId: string;
}

export interface ThanhVienGiaDinh {
  ten: string;
  hoDem: string;
  danToc: string;
  ngaySinh: Date;
  quocTich?: string;
  ngheNghiep: string;
  soDienThoai: string;
  diaChiHienNay: string;
  loaiThanhVien: string;
  hoKhauThuongTru: HoKhauThuongTru;
}

export interface HoKhauThuongTru {
  maQH: string;
  maTP: string;
  tenQH: string;
  tenTP: string;
  maXaPhuong: string;
  tenXaPhuong: string;
}
