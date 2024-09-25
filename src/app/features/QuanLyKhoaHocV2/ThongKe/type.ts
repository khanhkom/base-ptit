export interface QuyDoiGioProps {
  nguoiKhaiBao: NguoiKhaiBao;
  thongTinKhaiBao: ThongTinKhaiBao[];
  gioQuyDoi: GioQuyDoi;
  loaiHinhNckhId: string;
  danhSachThanhVien: DanhSachThanhVien[];
  danhSachCotHienThi: string[];
}

export interface DanhSachThanhVien {
  ssoId: string;
  danhSachVaiTro: string[];
  hoVaTen: string;
  maDinhDanh: string;
  hocHam: null;
  hocVi: string;
  donVi: string;
  maDonVi: string;
  email: string;
  soDienThoai: string;
}

export interface GioQuyDoi {
  ssoId: string;
  tongGio: number;
}

export interface NguoiKhaiBao {
  ssoId: string;
  danhSachVaiTro: any[];
  hoVaTen: string;
  maDinhDanh: string;
  donVi: string;
  maDonVi: string;
  email: string;
}

export interface ThongTinKhaiBao {
  ma: string;
  value: Array<ValueClass | string> | number | string;
}

export interface ValueClass {
  tenMinhChung: string;
  fileDinhKem: string[];
  index: number;
}
