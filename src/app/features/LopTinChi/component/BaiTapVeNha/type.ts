/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BaiTapVeNhaProps {
  daThucHien: number;
  chuaThucHien: number;
  active: boolean;
  hoTenNguoiGiao: string;
  ssoIdNguoiGiao: string;
  maCanBoNguoiGiao: string;
  urlTepDinhKem: string[];
  huongDanNop: string;
  _id: string;
  urlVideos: any;
  urlImages: any;
  noiDung: string;
  tenLopHocPhan: string;
  lopHocPhanId: string;
  thoiGianGiao: any;
  thoiGianBatDau: any;
  thoiGianKetThuc: Date;
  choPhepCapNhatSauNop: boolean;
  isQuiz: boolean;
  congBoDiemSauNop: any;
  congBoDapAnDungSauNop: any;
  khaoSatId: any;
  thoiGianLamBaiQuiz: any;
  createdAt: Date;
  updatedAt: Date;
  danhSachSinhVien: DanhSachSinhVienProps[];
}

export interface DanhSachSinhVienProps {
  cauTraLoiId: any;
  tongDiem: any;
  _id: string;
  assignmentId: string;
  maSinhVien: string;
  hoTen: string;
  sinhVienSsoId: string;
  urlVideos: any;
  urlImages: any;
  noiDungTraLoi: any;
  thoiGianTraLoi: any;
  trangThai: string;
  createdAt: Date;
  updatedAt: Date;
}
