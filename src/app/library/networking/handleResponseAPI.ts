/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */

import { showToast } from '@components/Toast';
import { translate } from '@utils/i18n/translate';
import { AxiosError } from 'axios';

export enum MESSAGE_CODE {
  DIEM_DANH_SINH_VIEN = 'DIEM_DANH_SINH_VIEN',
  DIEM_DANH_QR = 'DIEM_DANH_QR',
  READ_ALL_NOTIFY = 'READ_ALL_NOTIFY',
  KET_THUC_DIEM_DANH = 'KET_THUC_DIEM_DANH',
  CREATE_DON = 'CREATE_DON',
  TEXT_QUERY_TEN_NCKH = 'TEXT_QUERY_TEN_NCKH',
  THEM_MOI = 'THEM_MOI',
  GUI = 'GUI',
  XOA = 'XOA',
  CAP_NHAT = 'CAP_NHAT',
  LUU = 'LUU',
  BO_LUU = 'BO_LUU',
  KHAI_BAO = 'KHAI_BAO',
  THANH_TOAN = 'THANH_TOAN',
  DANG_KY = 'DANG_KY',
  KHOI_TAO = 'KHOI_TAO',
  KICH_HOAT = 'KICH_HOAT',
}

const ERROR_MESSAGE: { [key in MESSAGE_CODE]: string } = {
  [MESSAGE_CODE.DIEM_DANH_SINH_VIEN]: translate('slink:Attendance_failed'),
  [MESSAGE_CODE.DIEM_DANH_QR]: translate('slink:Attendance_failed'),
  [MESSAGE_CODE.READ_ALL_NOTIFY]: translate('slink:Updated_noti_failed'),
  [MESSAGE_CODE.KET_THUC_DIEM_DANH]: translate('slink:Da_co_loi_xay_ra'),
  [MESSAGE_CODE.CREATE_DON]: translate('slink:Da_co_loi_xay_ra'),
  [MESSAGE_CODE.KHAI_BAO]: translate('slink:Declaration_failed'),
  [MESSAGE_CODE.TEXT_QUERY_TEN_NCKH]: 'Tên đề tài đã bị trùng!',
  [MESSAGE_CODE.THEM_MOI]: translate('slink:Add_failed'),
  [MESSAGE_CODE.GUI]: translate('slink:Send_failed'),
  [MESSAGE_CODE.XOA]: translate('slink:Del_failed'),
  [MESSAGE_CODE.CAP_NHAT]: translate('slink:Updated_failed'),
  [MESSAGE_CODE.LUU]: translate('slink:Save_failed'),
  [MESSAGE_CODE.BO_LUU]: translate('slink:Un_save_failed'),
  [MESSAGE_CODE.DANG_KY]: translate('slink:Register_failed'),
  [MESSAGE_CODE.THANH_TOAN]: translate('slink:Da_co_loi_xay_ra'),
  [MESSAGE_CODE.KHOI_TAO]: translate('slink:Khoi_tao_that_bai'),
  [MESSAGE_CODE.KICH_HOAT]: translate('slink:Kich_hoat_that_bai'),
};

export const handleError = (
  message?: MESSAGE_CODE,
  error?: AxiosError<any>,
) => {
  let [msg, messageServer] = [
    '',
    error?.response?.data?.message ??
      error?.response?.data?.errorDescription ??
      '',
  ];
  msg = message ? ERROR_MESSAGE[message] : '';

  msg !== '' &&
    showToast({
      msg: messageServer !== '' && messageServer ? messageServer : msg,
      interval: 4000,
      type: 'error',
    });
};

const SUCCESS_MESSAGE: { [key in MESSAGE_CODE]?: string } = {
  [MESSAGE_CODE.DIEM_DANH_SINH_VIEN]: translate('slink:Attendance_success'),
  [MESSAGE_CODE.DIEM_DANH_QR]: translate('slink:Attendance_success'),
  [MESSAGE_CODE.READ_ALL_NOTIFY]: translate('slink:Updated_noti_success'),
  [MESSAGE_CODE.KET_THUC_DIEM_DANH]: 'Đã kết thúc điểm danh',
  [MESSAGE_CODE.KHAI_BAO]: translate('slink:Declaration_success'),
  [MESSAGE_CODE.THEM_MOI]: translate('slink:Add_success'),
  [MESSAGE_CODE.GUI]: translate('slink:Send_success'),
  [MESSAGE_CODE.XOA]: translate('slink:Del_success'),
  [MESSAGE_CODE.CAP_NHAT]: translate('slink:Updated_success'),
  [MESSAGE_CODE.LUU]: translate('slink:Save_success'),
  [MESSAGE_CODE.BO_LUU]: translate('slink:Un_save_success'),
  [MESSAGE_CODE.DANG_KY]: translate('slink:Register_success'),
  [MESSAGE_CODE.KHOI_TAO]: translate('slink:Khoi_tao_thanh_cong'),
  [MESSAGE_CODE.KICH_HOAT]: translate('slink:Kich_hoat_thanh_cong'),
};

export const showSuccessMessage = (message?: MESSAGE_CODE) => {
  let msg: string | undefined = '';

  msg = message ? SUCCESS_MESSAGE?.[message] ?? '' : '';

  msg !== '' &&
    showToast({
      msg,
      interval: 4000,
      type: 'success',
    });
};
