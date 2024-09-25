import { EdieuKienCongNoEnum, EdieuKienKQHTEnum, ETrangThaiThi } from '@common';

export interface LichThiProps {
  kyThi: string;
  tenHocPhan: string;
  maHocPhan: string;
  soLuong: number;
  ngayThi: string;
  thu: string;
  gioThi: string;
  phong: string;
  dieuKienKetQuaHocTap: EdieuKienKQHTEnum;
  dieuKienCongNo: EdieuKienCongNoEnum;
  trangThai: ETrangThaiThi;
}
