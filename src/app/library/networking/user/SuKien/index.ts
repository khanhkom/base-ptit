import { NetWorkService } from '@networking/service';
import url from '@networking/url';

export const getSuKienMe = () =>
  NetWorkService.Get({
    url: `${url.SU_KIEN_ME}`,
  }).then((res: any) => {
    return res;
  });
