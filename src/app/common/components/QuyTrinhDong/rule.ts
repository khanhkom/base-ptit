/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-inline-comments */
import { EKieuDuLieu } from '@config/constant';
import { CauHinhLoaiHinhProps } from '@features/KhaiBaoQuyTrinh/type';
import { translate } from '@utils/i18n/translate';

const message = translate('slink:Required');

function isNullOrUndefined(value: string | number | undefined | null) {
  return value === null || value === undefined;
}

function isNaNOrNullOrUndefined(value: string | number | undefined | null) {
  return isNullOrUndefined(value) || Number.isNaN(value);
}

export const ruleQTD = (value: any, item?: CauHinhLoaiHinhProps) => {
  if (item?.readonly) {
    return true;
  }

  if (item?.kieuDuLieu === EKieuDuLieu?.DOAN_VAN_BAN) {
    return true;
  }

  if (isNaNOrNullOrUndefined(value)) {
    return message;
  }

  switch (item?.kieuDuLieu) {
    case EKieuDuLieu?.HOUR:
    case EKieuDuLieu?.DATE:
    case EKieuDuLieu?.MONTH:
      return true;
    case EKieuDuLieu.BOOLEAN:
      if (typeof value !== 'boolean') {
        return message;
      }

      return true;

    default:
      if (
        value === '' ||
        (typeof value === 'object' && Object.keys(value).length === 0) || // Đối tượng rỗng
        (Array.isArray(value) && value?.length === 0) // Mảng rỗng
      ) {
        return message;
      }

      return true;
  }
};
