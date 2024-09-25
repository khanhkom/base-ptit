import { MIXPANEL_PROJECT_TOKEN } from '@env';
import { Mixpanel, MixpanelProperties } from 'mixpanel-react-native';

const MixpanelProjectToken = MIXPANEL_PROJECT_TOKEN;

const trackAutomaticEvents = true;

const mixpanel = new Mixpanel(MixpanelProjectToken, trackAutomaticEvents);

export const initMixpanel = async () => {
  mixpanel.init();
};

/**
 * To track an event to sent it to server
 * @param eventTag String: Tag for event. Like "User press Login"
 * @param trackBody Object: Body to tracking
 */
export const trackEvent = (
  eventTag: string,
  trackBody?: MixpanelProperties | undefined,
) => {
  mixpanel?.track(eventTag, trackBody);
};

/**
 * To identify user. Tips: use user id to identify
 * @param USER_ID string
 */
export const identifyUser = (USER_ID: string) => {
  mixpanel?.identify(USER_ID);
};

/**
 * Reset instance. Call when user logout
 */
export const resetMixpanel = () => mixpanel?.reset();

/**
 * Custom constand for filter
 */
export const MixPanelEvent = {
  LOG_IN: 'User đăng nhập',
  LOG_OUT: 'User đăng xuất',
  /**
   * Tính năng chính
   */
  BUTTON_TRANG_CHU: 'Vào trang chủ',
  BUTTON_THONG_BAO: 'Xem thông báo',
  BUTTON_GOC_HOC_TAP: 'Vào góc học tập/công việc',
  BUTTON_CA_NHAN: 'Vào trang cá nhân',
  BUTTON_TIEN_ICH: 'Vào tiện ích',
  /**
   * Thời khoá biểu
   */
  XEM_THOI_KHOA_BIEU: 'Xem thời khóa biểu',
  XEM_LICH_TUAN: 'Xem lịch tuần',
  XEM_LICH_SINH_NHAT: 'Xem lịch sinh nhật',
  /**
   * Lớp học
   */
  XEM_LOP_TIN_CHI: 'Xem lớp tín chỉ',
  XEM_DIEM: 'Xem điểm',
  XEM_LOP_HANH_CHINH: 'Xem lớp hành chính',
  XEM_DANG_KY_HOC_PHAN: 'Xem đăng ký học phần',
  /**
   * Tiện ích khác
   */
  XEM_VAN_BAN_HUONG_DAN: 'Xem văn bản hướng dẫn',
  GUI_PHAN_HOI: 'Gửi phản hồi',
  GUI_KHAO_SAT: 'Gửi khảo sát',
  XEM_TIN_TUC: 'Xem tin tức',
  VAO_HO_SO_NHAN_SU: 'Vào hồ sơ nhân sự',
  QUET_MA_QR: 'Quét mã QR',
  SU_DUNG_DICH_VU_HANH_CHINH: 'Sử dụng dịch vụ hành chính',
  /**
   * Quản lý khoa học
   */
  KHAI_BAO_QLKH: 'Khai báo quản lý khoa học',
  TONG_QUAN_QLKH: 'Xem tổng quan Quản lý khoa học',
  SAN_PHAM_QLKH: 'Xem sản phẩm Quản lý khoa học',
  HOAT_DONG_QLKH: 'Xem hoạt động Quản lý khoa học',
};
