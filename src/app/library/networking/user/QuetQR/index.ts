import { MESSAGE_CODE } from '@networking/handleResponseAPI';
import { NetWorkService } from '@networking/service';
import url from '@networking/url';

export const diemDanhTKB = (body: { otp: string; maNhomQr: string }) =>
  NetWorkService.Post(
    {
      url: `${url.DIEM_DANH_TKB}`,
      body: body,
    },
    { message: MESSAGE_CODE.DIEM_DANH_QR },
  ).then(res => {
    return res;
  });

export const diemDanhSuKien = (body: any) =>
  NetWorkService.Post({
    url: `${url.DIEM_DANH_SU_KIEN}`,
    body: body,
  }).then(res => {
    return res;
  });
