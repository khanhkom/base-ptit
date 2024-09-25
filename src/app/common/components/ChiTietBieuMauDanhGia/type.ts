/* eslint-disable @typescript-eslint/no-explicit-any */
import { EQUESTION_TYPE } from '@config/constant';

export interface CauHoiProps {
  batBuoc: boolean;
  cauTraLoiKhac: boolean;
  loai: EQUESTION_TYPE;
  luaChon: any[];
  luaChonCot: HangCotProps[];
  luaChonHang: HangCotProps[];
  noiDungCauHoi: string;
  _id: string;
  gioiHanDuoiTuyenTinh: number;
  gioiHanTrenTuyenTinh: number;
}

export interface ItemCauHoiProps {
  defaultValue?: any;
  data: CauHoiProps;
  indexs: number;
  traLoiKhac?: string;
  disabled?: boolean;
  previousValue?: any;
}

export interface defaultValueGrid {
  idCot: string;
  idHang: string;
  textCot: string;
  textHang: string;
  _id: string;
}

export interface HangCotProps {
  noiDung: string;
  _id: string;
  cauTraLoiKhac?: boolean;
}

export interface KhoiProps {
  tieuDe: string;
  moTa: string;
  _id: string;
  danhSachCauHoi: CauHoiProps[];
}

export interface ValueProps {
  data: CauHoiProps;
  indexs: number;
  transFormFile?: boolean;
  cauTraLoi?: any;
  loai: EQUESTION_TYPE;
  hoanThanh: boolean;
  _id: string;
  listUrlFile?: any[];
  ghiChu?: string;
}
