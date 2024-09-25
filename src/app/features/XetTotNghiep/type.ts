import {
  KetQuaXetTotNghiep,
  TrangThaiDuyetXetTotNghiep,
} from './DotXetTotNghiep';

export interface CTDKeHoachProps {
  active: boolean;
  canCuId: null;
  chuanDauRa: null;
  chuanDauVao: null;
  chuongTrinhDaoTaoChuan: ChuongTrinhDaoTaoChuanProps;
  createdAt: string;
  dieuKienTotNghiep: string;
  doiTuongTuyenSinh: string;
  loai: string;
  ma: string;
  maChuongTrinhDaoTaoChuan: string;
  maKhoaNganh: string;
  maKhoaSinhVien: string;
  maNganh: string;
  maTrinhDoDaoTao: string;
  mucTieuDaoTao: string;
  namBanHanh: number;
  ngayBanHanh: null;
  phienBanHienTaiId: null;
  quyTrinhDaoTao: string;
  ten: string;
  tenTiengAnh: null;
  thangDiem: string;
  thoiGianDaoTao: number;
  tongSoTinChi: number;
  updatedAt: string;
  url: null;
  viTriLamViec: null;
  _id: string;
}

export interface ChuongTrinhDaoTaoChuanProps {
  active: boolean;
  canCuId: null;
  chuanDauRa: null;
  chuanDauVao: null;
  createdAt: string;
  dieuKienTotNghiep: string;
  doiTuongTuyenSinh: string;
  loai: string;
  ma: string;
  maChuongTrinhDaoTaoChuan: null;
  maKhoaNganh: null;
  maKhoaSinhVien: null;
  maNganh: string;
  maTrinhDoDaoTao: string;
  mucTieuDaoTao: string;
  namBanHanh: number;
  ngayBanHanh: null;
  phienBanHienTaiId: null;
  quyTrinhDaoTao: string;
  ten: string;
  tenTiengAnh: null;
  thangDiem: string;
  thoiGianDaoTao: number;
  tongSoTinChi: number;
  updatedAt: string;
  url: null;
  viTriLamViec: null;
  _id: string;
}

export interface KQHTHocKyProps {
  createdAt: string;
  hocKy: HocKyProps;
  hocLuc: string;
  maHocKy: string;
  maSvHk: string;
  sinhVien: SinhVienProps;
  sinhVienSsoId: string;
  tongSoTinChiDangKyHocKy: number;
  tongSoTinChiDangKyToanKhoa: number;
  tongSoTinChiHocKy: number;
  tongSoTinChiNoHocKy: number;
  tongSoTinChiNoToanKhoa: number;
  tongSoTinChiTichLuyHocKy: number;
  tongSoTinChiTichLuyToanKhoa: number;
  trinhDo: string;
  trungBinhHocBongHocKy: number;
  trungBinhHocBongHocKyThang4: number;
  trungBinhHocKy: number;
  trungBinhHocKyThang4: number;
  trungBinhTichLuyToanKhoa: number;
  trungBinhTichLuyToanKhoaThang4: number;
  updatedAt: string;
  _id: string;
}

export interface SinhVienProps {
  anhDaiDienUrl: null;
  canCuId: null;
  canNang: null;
  cccd: string;
  chiNhanhNganHang: null;
  chieuCao: null;
  createdAt: string;
  daHocLopCamTinhDang: null;
  danToc: null;
  diaChiGiamHo: null;
  diaChiVoChong: null;
  diemTrungTuyen: null;
  doiTuongDauVao: null;
  doiTuongUuTienTuyenSinh: null;
  dotDkNhuCauAggStr: string;
  dotNhapHocId: null;
  email: string;
  email2: null;
  emailGiamHo: null;
  emailVoChong: null;
  firstName: string;
  gioiTinh: string;
  khuVucUuTienTuyenSinh: null;
  laDangVien: null;
  laDoanVien: null;
  lastName: string;
  loaiKhuyetTat: null;
  loaiNoiSinh: null;
  ma: string;
  maBenhVienKhamChuaBenh: null;
  maChuyenNganh: null;
  maHinhThuc: string;
  maKhoaNganh: string;
  maKhoaSinhVien: string;
  maNganh: string;
  maTrinhDo: string;
  namNhapHoc: null;
  namSinhCha: null;
  namSinhMe: null;
  namTotNghiep: null;
  ngayCapCccd: null;
  ngayKyQuyetDinhTrungTuyen: null;
  ngayNhapHoc: null;
  ngaySinh: string;
  ngaySinhGiamHo: null;
  ngayVaoDang: null;
  ngayVaoDangChinhThuc: null;
  ngayVaoDoan: null;
  ngheNghiepGiamHo: null;
  ngheNghiepVoChong: null;
  nguoiLienLac: null;
  nguyenQuanGiamHo: null;
  noiCapCccd: null;
  noiCongTacGiamHo: null;
  quanHuyenNoiSinh: null;
  quanHuyenQueQuan: null;
  quanHuyenThuongTru: null;
  quocGiaNoiSinh: null;
  quocTich: null;
  soBaoHiemSinhVien: null;
  soDienThoai: null;
  soDienThoai2: null;
  soDienThoaiGiamHo: null;
  soDienThoaiNguoiLienLac: null;
  soDienThoaiVoChong: null;
  soNhaTenDuongQueQuan: null;
  soNhaTenDuongThuongTru: null;
  soQuyetDinhTrungTuyen: null;
  soTaiKhoanNganHang: null;
  ssoId: string;
  ten: string;
  tenChuHo: null;
  tenGiamHo: null;
  tenNganHang: null;
  tenVoChong: null;
  thanhVienGiaDinh: null;
  thongTinAnhChiEm: null;
  thongTinCacCon: null;
  tinhTpNoiSinh: null;
  tinhTpQueQuan: null;
  tinhTpThuongTru: null;
  tonGiao: null;
  trangThaiHoc: string;
  updatedAt: string;
  xaPhuongNoiSinh: null;
  xaPhuongQueQuan: null;
  xaPhuongThuongTru: null;
  xepLoaiHanhKiemTHPT: null;
  xepLoaiHocTapTHPT: null;
  _id: string;
}

export interface HocKyProps {
  active: boolean;
  createdAt: string;
  isKyChinh: boolean;
  isToChucDangKyNhuCau: null;
  loaiThoiGianNhapDiemHocKy: string;
  ma: string;
  maNhomTietHoc: null;
  namBatDau: number;
  namHocId: string;
  soNgayNhapDiem: null;
  soThuTu: number;
  soTuan: number;
  sySoDuKienBatBuoc: null;
  ten: string;
  tgBdLayYKienHvu: null;
  tgBdLayYKienKhgd: null;
  tgBdPhanCongGiangDay: string;
  tgHopHoiDongHvu: null;
  tgKtLayYKienHvu: null;
  tgKtLayYKienKhgd: null;
  tgKtPhanCongGiangDay: string;
  tgTbKqHvu: null;
  tgTbKqXetHvuSb: null;
  tgXetHvuSb: null;
  thoiGianBatDau: string;
  thoiGianNhapDiemBatDau: null;
  thoiGianNhapDiemKetThuc: null;
  updatedAt: string;
  _id: string;
}

export interface ThongTinCDRProps {
  createdAt?: string;
  danhSachChungChiCtdtCdr?: ChungChiCtdtCdrProps[];
  loaiChungChi?: LoaiChungChiProps;
  maChuongTrinhDaoTao?: string;
  maLoaiChungChi?: string;
  updatedAt?: string;
  datChuanDauRa?: boolean;
  _id?: string;
  title: string;
  hoanThanh: boolean;
  value: string;
  chuanDauRa: string;
  chungChiDaDat?: ChungChiMeProps[];
}

export interface ItemProps {
  createdAt: string;
  danhSachChungChiCtdtCdr: ChungChiCtdtCdrProps[];
  loaiChungChi: LoaiChungChiProps;
  maChuongTrinhDaoTao: string;
  maLoaiChungChi: string;
  updatedAt: string;
  datChuanDauRa: boolean;
  _id: string;
}

export interface LoaiChungChiProps {
  createdAt: string;
  isNgoaiNgu: boolean;
  ma: string;
  ten: string;
  updatedAt: string;
  _id: string;
}

export interface ChungChiCtdtCdrProps {
  chuanDauRa: number;
  chungChi: ChungChiProps;
  chungChiCtdtId: string;
  createdAt: string;
  maChungChi: string;
  updatedAt: string;
  _id: string;
}

export interface ChungChiMeProps {
  chungChi: ChungChiProps;
  createdAt: string;
  diem: number;
  donViCap: string;
  duDkDauRa: null;
  loaiThoiHan: null;
  maChungChi: string;
  ngayCap: string;
  ngayHetHan: string;
  sinhVien: SinhVienProps;
  sinhVienSsoId: string;
  ten: null | string;
  updatedAt: string;
  _id: string;
}

export interface ChungChiProps {
  bac: { order: number; ten: string }[];
  chungChiCoThoiHan: null;
  createdAt: string;
  ma: string;
  maLoaiChungChi: string;
  maNgonNgu: null;
  max: null;
  min: null;
  phuongThucTinhDiem: string;
  step: null;
  ten: string;
  thoiHanChungChi: null;
  updatedAt: string;
  _id: string;
  loaiChungChi: {
    createdAt: string;
    isNgoaiNgu: false;
    ma: string;
    ten: string;
    updatedAt: string;
    _id: string;
  };
}

export interface TienTrinhProps {
  ctdtKeHoach: CTDKeHoachProps;
  diemTichLuyToiThieu: number;
  kqhtHocKy: KQHTHocKyProps;
  thongTinCdr: ThongTinCDRProps[];
}

export interface ChiTietProps {
  pttd: string;
  dkToiThieu: string | number | undefined;
  ngoaiNgu?: string | undefined;
  ten: string;
  ngayCap: string;
  ngayHetHan: string;
  chungChiCoThoiHan: boolean;
  donViCap: string;
  trinhDo: string | boolean;
}

export interface DotXetTNProps {
  createdAt: string;
  daChotDanhSach: null;
  daCongBo: null;
  daKetThuc: null;
  daKhoiTao: true;
  ketQuaXetTotNghiep: {
    ketQua: KetQuaXetTotNghiep;
    loaiDoiTuong: string;
    lyDo: string;
    trangThaiDuyet: TrangThaiDuyetXetTotNghiep;
    yKienSinhVien: null;
  };
  ngayChotDanhSach: string;
  ngayHop: string;
  ngayLapHoiDong: string;
  ngayLapKeHoach: string;
  ten: string;
  updatedAt: string;
  _id: string;
}
