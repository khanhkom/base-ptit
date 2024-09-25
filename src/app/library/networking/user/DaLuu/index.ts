/* eslint-disable @typescript-eslint/no-explicit-any */
import { MESSAGE_CODE } from '@networking/handleResponseAPI';
import { NetWorkService } from '@networking/service';
import url from '@networking/url';

export const getDSXemSau = (params: any) =>
  NetWorkService.Get({
    url: `${url.XEM_SAU_ME}`,
    params,
  }).then((res: any) => {
    return res;
  });
export const getDSXemSauMany = (loaiThongTin: string) =>
  NetWorkService.Get({
    url: `${url.XEM_SAU_ME}/many`,
    params: { condition: { loaiThongTin } },
  }).then((res: any) => {
    return res;
  });

export const saveItem = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.XEM_SAU}`,
      body,
    },
    { message: MESSAGE_CODE.LUU },
  ).then((res: any) => {
    return res;
  });

export const deleteItemSaved = (id: string) =>
  NetWorkService.Delete(
    {
      url: `${url.XEM_SAU}/${id}`,
    },
    { message: MESSAGE_CODE.BO_LUU },
  ).then((res: any) => {
    return res;
  });
