export interface LichProp {
  diaDiem: string;
  info: InfoProps;
  loaiDoiTuong: string[];
  loaiSuKien: string;
  tenSuKien: string;
  thoiGianBatDau: string;
  thoiGianDienRa: string;
  thoiGianKetThuc: string;
  thu: number;
}

export interface InfoProps {
  dien_thoai: boolean | string;
  email: string;
  giang_vien_id: string | number[];
  hoc_phan_id: string | number[];
  id: number;
  id_zoom: boolean | string;
  is_buoi_hoc_lms: boolean;
  lop_tin_chi_id: string | number[];
  mat_khau_1: boolean | string;
  ngay_bd: string;
  ngay_gio_bat_dau_hoc_lms: string;
  ngay_gio_ket_thuc_hoc_lms: string;
  nhom_lop_tin_chi_id: boolean | string;
  so_tiet: number;
  ten_giang_vien: string;
  ten_hoc_phan: string;
  tiet_bd: boolean | string;
  tong_so_sinh_vien: number;
  url_hoc_lieu: boolean | string;
}
