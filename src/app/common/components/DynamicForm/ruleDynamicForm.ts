/* eslint-disable no-nested-ternary */
import { checkDVHC, DVMC_TYPE } from '@common';
import { translate } from '@utils/i18n/translate';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const validate = (value: any, itemInfo: any) => {
  const checkDC = itemInfo?.type === DVMC_TYPE.DON_VI_HANH_CHINH;

  const donViViTriChucDanh = itemInfo?.type === DVMC_TYPE.TEST;

  const table = itemInfo?.type === DVMC_TYPE.TABLE;

  const file =
    itemInfo?.type === DVMC_TYPE.UPLOAD_MULTI ||
    itemInfo?.type === DVMC_TYPE.UPLOAD_SINGLE;

  if (
    donViViTriChucDanh &&
    (value?.donViId === '' || value?.donViViTriId === '')
  ) {
    return translate('slink:Required');
  }

  if (
    itemInfo?.isRequired &&
    (checkDC
      ? !checkDVHC(value, itemInfo?.level)
      : table || file
      ? value?.length === 0 || value?.length === undefined
      : value === '' || value === undefined)
  ) {
    return translate('slink:Required');
  }
};
