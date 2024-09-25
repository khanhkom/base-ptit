/* eslint-disable @typescript-eslint/no-explicit-any */
import { MESSAGE_CODE } from '@networking/handleResponseAPI';
import { NetWorkService } from '@networking/service';

import url from './url';

export const fetchDiemLHP = (idLopHP: string, params: any) =>
  NetWorkService.Get({
    url: `${url.DIEM_CONG_LOP_HP}/${idLopHP}`,
    params,
  }).then((res: any) => {
    return res;
  });

export const addBonusPoint = (
  idLopHP: string,
  body: {
    sinhVienSsoId: string;
    diemCong: number;
    chuThich: string;
  },
) =>
  NetWorkService.Post(
    {
      url: `${url.DIEM_LOP_HOC_PHAN}/${idLopHP}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const editBonusPoint = (
  id: string,
  idLopHP: string,
  body: {
    sinhVienSsoId: string;
    diemCong: number;
    chuThich: string;
  },
) =>
  NetWorkService.Put(
    {
      url: `/qldt/diem-cong-lhp/${id}/lop-hoc-phan/${idLopHP}`,
      body,
    },
    { message: MESSAGE_CODE.LUU },
  ).then((res: any) => {
    return res;
  });

export const delBonusPoint = (id: string, idLopHP: string) =>
  NetWorkService.Delete(
    {
      url: `/qldt/diem-cong-lhp/${id}/lop-hoc-phan/${idLopHP}`,
    },
    { message: MESSAGE_CODE.XOA },
  ).then((res: any) => {
    return res;
  });
