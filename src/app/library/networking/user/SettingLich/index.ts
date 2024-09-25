import { MESSAGE_CODE } from '@networking/handleResponseAPI';
import { NetWorkService } from '@networking/service';

import url from '@networking/url';
import { BodySettingLichProps } from './type';

export const getSettingLich = () =>
  NetWorkService.Get({
    url: `${url.SETTING_LICH}/me?page=1&limit=10&condition=%7B%7D`,
  }).then((res: any) => {
    return res;
  });

export const putSettingLich = (id: string, body: BodySettingLichProps) =>
  NetWorkService.Put(
    {
      url: `${url.SETTING_LICH}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.LUU },
  ).then((res: any) => {
    return res;
  });

export const postSettingLich = (body: BodySettingLichProps) =>
  NetWorkService.Post(
    {
      url: `${url.SETTING_LICH}`,
      body,
    },
    { message: MESSAGE_CODE.LUU },
  ).then((res: any) => {
    return res;
  });
