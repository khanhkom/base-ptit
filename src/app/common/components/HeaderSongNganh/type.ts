/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ItemProps {
  hideBack?: boolean;
  title: string;
  childrenRight?: any;
  onButton?: () => void;
  onChangeKhoaNganh: (e: KhoaNganh | undefined) => void;
  containerStyles?: StyleProp<ViewStyle>;
  titleViewStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  isStatusBarAndroidVisible?: boolean;
  innerContainerStyles?: StyleProp<ViewStyle>;
}

export type Props = {
  backgroundColor?: string;
  lightBarStyle?: boolean;
  isStatusBarAndroidVisible?: boolean;
};
export interface DSKhoaNganhProps {
  khoaNganhChinh: KhoaNganh;
  khoaNganhPhu: KhoaNganh;
}

export interface KhoaNganh {
  _id: string;
  ten: string;
  ma: string;
  maKhoaSinhVien: string;
  maNganh: string;
  maChuongTrinhDaoTao: string;
  namBatDau: number;
  namKetThuc: number;
  ghiChu: string;
  createdAt: Date;
  updatedAt: Date;
  khoaSinhVien: KhoaSinhVien;
  nganh: Nganh;
}

export interface KhoaSinhVien {
  _id: string;
  ma: string;
  ten: string;
  namHocBatDau: number;
  createdAt: Date;
  updatedAt: Date;
  namHocId: null;
  maHinhThucDaoTao: string;
  maTrinhDoDaoTao: string;
}

export interface Nganh {
  _id: string;
  dmNganhId: null;
  ma: string;
  ten: string;
  tenTiengAnh: null;
  canCuId: null;
  maDonVi: string;
  createdAt: Date;
  updatedAt: Date;
  maDmNganh: string;
  maTrinhDo: string;
  maNganhGoc: null;
  maCanCuPhapLy: null;
}
