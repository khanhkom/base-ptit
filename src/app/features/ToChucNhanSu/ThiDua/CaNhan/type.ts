import { ETrangThaiDanhGia } from '@common';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DotDanhGiaProps {
  _id: string;
  tenDot: string;
  idBieuMau: string;
  thoiGianBatDau: Date;
  thoiGianKetThuc: Date;
  vanBanLienQuan: any;
  loaiDot: string;
  kichHoat: boolean;
  ghiChu: any;
  createdAt: Date;
  updatedAt: Date;
  trangThaiLam: ETrangThaiDanhGia;
}
