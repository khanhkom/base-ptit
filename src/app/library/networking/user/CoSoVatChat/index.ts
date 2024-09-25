import { MESSAGE_CODE } from '@networking/handleResponseAPI';
import { NetWorkService } from '@networking/service';

import url from './url';

export const getInfoByQR = (ma: string) =>
  NetWorkService.Get({
    url: `${url.TAI_SAN_QR}/${ma}`,
  }).then(res => {
    return res;
  });
export const getTaiSanKiemKe = (idDot: string, qr: string) =>
  NetWorkService.Get(
    {
      url: `${url.TAI_SAN_KIEM_KE_DOT}/${idDot}/kiem-ke/qr/${qr}`,
    },
    // { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });
export const getTinhTrangSuDung = () =>
  NetWorkService.Get(
    {
      url: `${url.TINH_TRANG_SU_DUNG}`,
    },
    // { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });
export const capNhatKiemKe = (id: string, body: any) =>
  NetWorkService.Put(
    {
      url: `${url.TAI_SAN_KIEM_KE}/${id}/kiem-ke`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });
