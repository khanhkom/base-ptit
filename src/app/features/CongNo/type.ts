/* eslint-disable @typescript-eslint/no-explicit-any */

import { ETrangThaiTT } from '@common';

export interface CongNoProps {
  _id: string;
  identityCode: string;
  ma: null;
  userSsoId: string;
  userFullname: string;
  name: string;
  userCode: string;
  userAddress: string;
  userEmail: null;
  userDOB: Date;
  userPhone: null;
  soTienConLai: number;
  soTienDaThu: number;
  userMetadata: any;
  callbackUrl: string;
  status: ETrangThaiTT;
  soTienThue: null;
  metadata: any;
  moTa: null;
  soTienPhaiThu: number;
  ngayHetHanThanhToan: null;
  urlBienLai: null;
  maBienLai: null;
  createdAt: Date;
  updatedAt: Date;
  idDotThu: string;
  billItems: BillItem[];
  dotThu: DotThu;
}

export interface BillItem {
  _id: string;
  ten: string;
  tenKhoanThu: string;
  heSo: number;
  unitAmount: number;
  unitLabel: string;
  quantity: number;
  amountDiscount: number;
  amountDue: number;
  amountPaid: number;
  amountRemaining: number;
  status: string;
  callbackUrl: null;
  externalId: null;
  createdAt: Date;
  updatedAt: Date;
  billIdentityCode: string;
  maNguonThu: string;
  maKhoanThu: string;
  maMucthu: null;
}

export interface DotThu {
  _id: string;
  tenDot: string;
  thoiGianBatDau: Date;
  thoiGianKetThuc: Date;
  kichHoat: boolean;
  metadata: null;
  createdAt: Date;
  updatedAt: Date;
}
