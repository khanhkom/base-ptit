import {
  BieuMauKhaoSatProps,
  DotDGGVProps,
} from '@features/LopTinChi/ChiTietLopTinChi/type';

export interface ValuesProps {
  idCauHoi?: string;
  idHang?: string;
  idCot?: string;
  listCot?: string[];
  listUrlFile?: any[];
}
export interface CauTraLoi {
  idCauHoi: string;
  listLuaChonBang: { idHang: string; idCot: string }[];
  listUrlFile: string[];
  luaChonTuyenTinh: number;
}
export interface ChiTietBieuMauProps {
  route: {
    params: {
      data: BieuMauKhaoSatProps;
      giangVien?: {
        maLop: string;
        lopHocPhanId: string;
        giangVienSsoId: string;
        maGiangVien: string;
        hoTenGiangVien: string;
        vaiTroNguoiKhaoSat: string;
      };
      idKhaoSat: string;
      initKetQua?: any;
      disabled?: boolean;
      refreshData?: () => void;
      idDot: string;
      dot?: DotDGGVProps;
      isTietHoc?: boolean;
      hasEnd?: boolean;
    };
  };
}
