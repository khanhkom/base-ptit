/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-inline-comments */
import { Linking } from 'react-native';

import WebView from 'react-native-webview';

import R from '@assets/R';
import { REDIREC_URL, SSO_URL, SUB_NAME } from '@env';
import iframe, { iframeModel } from '@native-html/iframe-plugin';
import TableRenderer, { tableModel } from '@native-html/table-plugin';
import { translate } from '@utils/i18n/translate';
import { ColorSchemeType } from 'native-base/lib/typescript/components/types';

export const STORAGE_KEY_TOKEN = 'TOKEN';

export const STORAGE_KEY_APP_THEME = 'APP_THEME';

export const TRANG_THAI_HOC = {
  CHUA_HOC: 'CHUA_HOC',
  DANG_HOC: 'DANG_HOC',
  DA_HOC: 'DA_DAT',
  CHUA_DAT: 'CHUA_DAT',
};

export const TAB_MAIN = {
  TRANG_CHU: 0,
  GOC_HOC_TAP: 1,
  WALL: 2,
  TIEN_ICH: 3,
  CA_NHAN: 4,
};

export const TIME_FROM_TO = {
  START: 0,
  END: 1,
};

export const XET_TOT_NGHIEP = {
  CC_ME: 0,
  CC_CHUAN_DAU_RA: 1,
};

export const MAX_AMOUNT_FILE = 5;

export const MAX_SIZE_FILE_UPLOAD = 20000000; // 20MB

export const THOI_KHOA_BIEU = {
  LICH_NGAY: 0,
  LICH_TUAN: 1,
  LICH_THANG: 2,
};

export const ERROR_CODE_CREATE_FORM = {
  FIND_SERVICE_ERROR: 1,
  FORM_EXIST_ERROR: 2,
};

export const ROLE_ACCOUNT_TU_XA = {
  SINH_VIEN: 'sinh_vien',
  GIANG_VIEN: 'giang_vien',
  CAN_BO: 'can_bo',
  NHAN_VIEN: 'nhan_vien',
};

export const TYPE_NOTIFICATION = {
  DICH_VU_MOT_CUA: 'DICH_VU_MOT_CUA',
  LOP_HANH_CHINH: 'LOP_HANH_CHINH',
  LOP_TIN_CHI: 'LOP_TIN_CHI',
  DIEM_DANH: 'DIEM_DANH',
  DAILY_NOTIF_ALL: 'DAILY_NOTIF_ALL',
  LICH_TUAN: 'LICH_TUAN',
};

export enum EQUESTION_TYPE {
  SingleChoice = 'SingleChoice',
  MultipleChoice = 'MultipleChoice',
  DropdownMenu = 'DropdownMenu',
  GridSingleChoice = 'GridSingleChoice',
  GridMultipleChoice = 'GridMultipleChoice',
  NumbericRange = 'NumericRange',
  Text = 'Text',
  UploadFile = 'UploadFile',
}

export enum ECHART_NCKH_TYPE {
  GIO = 'GIO',
  DIEM = 'DIEM',
}

export const LIST_INDEX_TABMAIN = {
  TAB_TRANG_CHU: 0,
  TAB_GOC_HOC_TAP: 1,
  TAB_TIEN_ICH: 2,
  TAB_THONG_BAO: 3,
  TAB_CA_NHAN: 4,
};

export const TIME_FILTER = {
  TAT_CA: -1,
  HOM_NAY: 0,
  TUAN_NAY: 1,
  THANG_NAY: 2,
};

export const ARRAY_FILTER = [
  'Tất cả thông báo',
  'Thông báo hôm nay',
  'Thông báo tuần này',
  'Thông báo tháng này',
];

export const LOAI_QUYET_DINH_TCNS = [
  'Luân chuyển',
  'Điều động',
  'Bổ nhiệm',
  'Kiêm nhiệm',
  'Miễn nhiệm',
  'Biệt phái',
  'Tiếp nhận',
  'Tuyển dụng',
  'Khác',
];

export const LOAI_LUONG_TCNS = [
  'Lương theo ngạch bậc',
  'Lương theo vị trí việc làm',
];

export const ARRAY_TIME_FILTER_VALUE = [0, 1, 2, 3];

export const NotiTab = {
  THONG_BAO_CHUNG: 1,
  LOP_TIN_CHI: 2,
  LOP_HANH_CHINH: 3,
  DON_VI: 4,
};

export const NOTI_TYPE = {
  EVERYONE: {
    $and: [
      {
        loaiDoiTuong: {
          $in: ['Tất cả', 'Người dùng cụ thể', 'Đơn vị', 'Khóa'],
        },
      },
      {
        loaiDoiTuong: {
          $nin: ['Lớp hành chính', 'lớp tín chỉ'],
        },
      },
    ],
  },
  CA_NHAN: { loaiDoiTuong: 'Người dùng cụ thể' },
  LOP_HANH_CHINH: { loaiDoiTuong: 'Lớp hành chính' },
  LOP_TIN_CHI: { loaiDoiTuong: 'lớp tín chỉ' },
  DON_VI: { loaiDoiTuong: 'Đơn vị' },
  KHOA_SINH_VIEN: { loaiDoiTuong: 'Khóa' },
};

export enum ETrangThaiDiemDanh {
  CHUA_DIEM_DANH = 'CHUA_DIEM_DANH',
  DA_DIEM_DANH = 'DA_DIEM_DANH',
  CO_MAT = 'CO_MAT',
  VANG_CO_PHEP = 'VANG_CO_PHEP',
  VANG_KHONG_PHEP = 'VANG_KHONG_PHEP',
  MUON_VE_SOM = 'MUON_VE_SOM',
}

export enum ETrangThaiThi {
  CHUA_DUYET = 'Chưa duyệt',
  DU_DIEU_KIEN = 'Đủ điều kiện',
  KHONG_DU = 'Không đủ điều kiện',
  HOAN_THI = 'Hoãn thi',
  CAM_THI = 'Cấm thi',
}

export const colorTrangThaiThi: Record<ETrangThaiThi, string> = {
  [ETrangThaiThi.CHUA_DUYET]: 'default',
  [ETrangThaiThi.DU_DIEU_KIEN]: 'green',
  [ETrangThaiThi.KHONG_DU]: 'red',
  [ETrangThaiThi.HOAN_THI]: 'orange',
  [ETrangThaiThi.CAM_THI]: 'red',
};

export enum DieuKienCongNo {
  DU = 'Đủ',
  CHUA_DU = 'Chưa đủ',
  MIEN = 'Miễn',
}

export enum DieuKienHocTap {
  CHUA_DUYET = 'Chưa duyệt',
  DAT = 'Đạt',
  KHONG_DAT = 'Không đạt',
}

export const colorDieuKienCongNo: Record<DieuKienCongNo, string> = {
  [DieuKienCongNo.DU]: 'green',
  [DieuKienCongNo.CHUA_DU]: 'red',
  [DieuKienCongNo.MIEN]: 'green',
};

export const colorDieuKienHocTap: Record<DieuKienHocTap, string> = {
  [DieuKienHocTap.CHUA_DUYET]: 'default',
  [DieuKienHocTap.DAT]: 'green',
  [DieuKienHocTap.KHONG_DAT]: 'red',
};

export enum ETrangThaiDoiLichHoc {
  CHUA_DUYET = 'CHUA_DUYET',
  CHAP_NHAN = 'CHAP_NHAN',
  TU_CHOI = 'TU_CHOI',
}

export enum ENhaXuatBan {
  TRONG_NUOC = 'Nhà xuất bản trong nước',
  QUOC_TE = 'Nhà xuất bản quốc tế',
  QUOC_TE_UY_TIN = 'Nhà xuẩt bản quốc tế có uy tín',
}

export enum ETrangThaiNopQLKH {
  DA_NOP = 'Đã nộp',
  CHUA_NOP = 'Chưa nộp',
}

export enum EPhaseDeTai {
  DANG_KY = 'Đăng ký',
  XET_DUYET_DANG_KY = 'Xét duyệt đăng ký',
  NOP_DE_CUONG = 'Nộp đề cương',
  XET_DUYET_DE_CUONG = 'Xét duyệt đề cương',
  THUC_HIEN = 'Thực hiện',
  NGHIEM_THU = 'Nghiệm thu',
  SAU_NGHIEM_THU = 'Sau nghiệm thu',
}

export enum ELoaiPhanHoi {
  KHAC = 'Khác',
  DVMC = 'Dịch vụ hành chính',
}

export enum ETrangThaiThamGia {
  CHO_XAC_NHAN = 'Chờ xác nhận',
  XAC_NHAN = 'Tham gia',
  KHONG_THAM_GIA = 'Không tham gia',
}

export const MUTE_NOTIFICATION_OPTIONS = [
  { title: 'Trong 30 phút', value: 30 },
  { title: 'Trong 1 giờ', value: 60 },
  { title: 'Trong 8 giờ', value: 480 },
  { title: 'Trong 24 giờ', value: 1440 },
  { title: 'Cho đến khi tôi bật lại', value: 360000 },
];

export const UNMUTE_NOTIFICATION_OPTIONS = [
  { title: 'Bật lại thông báo', value: 0 },
];

export const ROLE_ACCOUNT_TS = {
  THI_SINH: 'THI_SINH',
  PHU_HUYNH: 'PHU_HUYNH',
};

export const ECapDonVi = {
  BO_MON: 'Bộ môn',
  PHONG: 'Phòng',
  KHOA: 'Khoa',
  TRUNG_TAM: 'Trung tâm',
  TRUNG_TAM_NHO: 'Trung tâm nhỏ',
  VIEN: 'Viện',
  HOC_VIEN: 'Học viện',
  HOI_DONG_TRUONG: 'Hội đồng trường',
};

export const EChucVu = {
  TRUONG: 'Trưởng',
  PHO: 'Phó',
  CAN_BO: 'Cán bộ',
};

export enum ETrangThaiSinhVienDKTinChi {
  DUOC_DK = 'Được phép đăng ký',
  KHONG_DUOC_DK = 'Không được phép đăng ký',
}

export enum ETrangThaiLopHocPhan {
  MO = 'Mở',
  DONG = 'Đóng',
}

export enum ETrangThaiDangKyTinChi {
  CHUA_DANG_KY = 'Chưa đăng ký',
  DA_DANG_KY = 'Đã đăng ký',
  LOI = 'Lỗi',
}

export const ColorTrangThaiDangKyTinChi = {
  [ETrangThaiDangKyTinChi.CHUA_DANG_KY]: 'blue',
  [ETrangThaiDangKyTinChi.DA_DANG_KY]: 'green',
  [ETrangThaiDangKyTinChi.LOI]: 'red',
};

export enum EColorLopDangKy {
  TRUNG_LICH = 'rgba(255, 223, 140, 0.3)',
  FULL_LOP = 'rgba(255, 122, 0, 0.3)',
  KHONG_DU_DK = 'rgba(255, 104, 104, 0.3)',
}

export const mapChucVuCanBo = {
  [`${ECapDonVi.HOI_DONG_TRUONG}|${EChucVu.TRUONG}`]: 'Chủ tịch',
  [`${ECapDonVi.HOI_DONG_TRUONG}|${EChucVu.PHO}`]: 'Phó chủ tịch',
  [`${ECapDonVi.HOC_VIEN}|${EChucVu.TRUONG}`]: 'Giám đốc',
  [`${ECapDonVi.HOC_VIEN}|${EChucVu.PHO}`]: 'Phó giám đốc',
  [`${ECapDonVi.VIEN}|${EChucVu.TRUONG}`]: 'Viện trưởng',
  [`${ECapDonVi.VIEN}|${EChucVu.PHO}`]: 'Phó viện trưởng',
  [`${ECapDonVi.TRUNG_TAM}|${EChucVu.TRUONG}`]: 'Giám đốc trung tâm',
  [`${ECapDonVi.TRUNG_TAM}|${EChucVu.PHO}`]: 'Phó giám đốc trung tâm',
  [`${ECapDonVi.TRUNG_TAM_NHO}|${EChucVu.TRUONG}`]: 'Trưởng trung tâm',
  [`${ECapDonVi.TRUNG_TAM_NHO}|${EChucVu.PHO}`]: 'Phó trưởng trung tâm',
  [`${ECapDonVi.KHOA}|${EChucVu.TRUONG}`]: 'Trưởng khoa',
  [`${ECapDonVi.KHOA}|${EChucVu.PHO}`]: 'Phó trưởng khoa',
  [`${ECapDonVi.PHONG}|${EChucVu.TRUONG}`]: 'Trưởng phòng',
  [`${ECapDonVi.PHONG}|${EChucVu.PHO}`]: 'Phó trưởng phòng',
  [`${ECapDonVi.BO_MON}|${EChucVu.TRUONG}`]: 'Trưởng bộ môn',
  [`${ECapDonVi.BO_MON}|${EChucVu.PHO}`]: 'Phó trưởng bộ môn',
};

export const ROLE_ACCOUNT_VALUE = {
  SINH_VIEN: 'Sinh viên',
  GIANG_VIEN: 'Giảng viên',
  CAN_BO: 'Cán bộ',
  NHAN_VIEN: 'Nhân viên',
};

export const MAX_GPA = 4;

export const LIST_DEFAULT_FUNCTION = {
  FUNCTION_1: 0,
  FUNCTION_2: 1,
  FUNCTION_3: 2,
  FUNCTION_4: 3,
  FUNCTION_5: 4,
  FUNCTION_6: 5,
  FUNCTION_7: 6,
  FUNCTION_8: 7,
  FUNCTION_9: 8,
  FUNCTION_10: 9,
  FUNCTION_11: 10,
  FUNCTION_12: 11,
};

export const LOAI_SU_KIEN = {
  LICH_GIANG_DAY: 'Lịch giảng dạy',
  LICH_HOC: 'Lịch học',
  LICH_THI: 'Lịch thi',
  LICH_COI_THI: 'Lịch coi thi',
  CA_NHAN: 'Cá nhân',
  CHUNG: 'Chung',
  LICH_LAM_VIEC_TUAN: 'Lịch làm việc tuần',
  LICH_TUAN: 'Lịch tuần',
  LICH_LAM_THEM: 'Lịch làm thêm',
};

export const LIST_LICH_GV = [
  LOAI_SU_KIEN.LICH_GIANG_DAY,
  LOAI_SU_KIEN.LICH_COI_THI,
  LOAI_SU_KIEN.CA_NHAN,
  LOAI_SU_KIEN.CHUNG,
  LOAI_SU_KIEN.LICH_TUAN,
];

export const LIST_LICH_SV = [
  LOAI_SU_KIEN.LICH_HOC,
  LOAI_SU_KIEN.LICH_THI,
  LOAI_SU_KIEN.CA_NHAN,
  LOAI_SU_KIEN.CHUNG,
];

export const MapColorMauLichDefault = {
  [LOAI_SU_KIEN.LICH_GIANG_DAY]: '#1b93cf',
  [LOAI_SU_KIEN.LICH_HOC]: '#1b93cf',
  [LOAI_SU_KIEN.LICH_COI_THI]: '#ff759a',
  [LOAI_SU_KIEN.LICH_THI]: '#ff759a',
  [LOAI_SU_KIEN.CHUNG]: '#11bbff',
  [LOAI_SU_KIEN.CA_NHAN]: '#30ff37',
  [LOAI_SU_KIEN.LICH_TUAN]: '#f5af47',
  [LOAI_SU_KIEN.LICH_LAM_THEM]: '#30ff37',
};

export const MapTenLoaiSuKien = {
  [LOAI_SU_KIEN.LICH_GIANG_DAY]: 'Lịch giảng dạy',
  [LOAI_SU_KIEN.LICH_HOC]: 'Lịch học',
  [LOAI_SU_KIEN.LICH_COI_THI]: 'Lịch coi thi',
  [LOAI_SU_KIEN.LICH_THI]: 'Lịch thi',
  [LOAI_SU_KIEN.CHUNG]: 'Sự kiện chung',
  [LOAI_SU_KIEN.CA_NHAN]: 'Sự kiện cá nhân',
  [LOAI_SU_KIEN.LICH_TUAN]: 'Lịch tuần học viện',
  [LOAI_SU_KIEN.LICH_LAM_THEM]: 'Lịch làm thêm',
};

export const VAI_TRO = {
  SINH_VIEN: 'Sinh viên',
  GIAO_VIEN: 'Giảng viên',
  CAN_BO: 'Cán bộ',
  NHAN_VIEN: 'Nhân viên',
  PHU_HUYNH: 'Phụ huynh',
  ADMIN: 'Admin',
  GUEST: 'Khách',
};

export const DAY_BY_MILLISECONDS = 60 * 60 * 24 * 1000;

export const DAY_IN_WEEK = {
  MON: 1,
  TUE: 2,
  WED: 3,
  THUR: 4,
  FRI: 5,
  SAT: 6,
  SUN: 7,
};

export const ARRAY_EVENTS_GV = [
  'Tất cả',
  'Sự kiện cá nhân',
  'Lịch dạy',
  'Lịch coi thi',
  'Sự kiện chung',
];

export const ARRAY_EVENTS_SV = [
  'Tất cả',
  'Sự kiện cá nhân',
  'Lịch học',
  'Lịch thi',
  'Sự kiện chung',
];

export const TAB_GOC_HOC_TAP = {
  DIEM_TICH_LUY: 0,
  THAC_MAC_DIEM: 1,
  GIA_LAP_DIEM: 2,
};

export const MAX_NEWS_SWIPEHOME = 10;

export const COMON_TOPIC = {
  NEWS: 'Tin tức',
  CAU_HOI_THUONG_GAP: 'Câu hỏi thường gặp',
};

export const gioHocBatDau = {
  THU_HAI: {
    0: '07:15',
    1: '07:45',
    2: '08:35',
    3: '09:25',
    4: '10:15',
    5: '11:05',
    6: '12:30',
    7: '13:00',
    8: '13:50',
    9: '14:40',
    10: '15:30',
    11: '16:20',
  },
  CON_LAI: {
    0: '',
    1: '07:30',
    2: '08:20',
    3: '09:10',
    4: '10:15',
    5: '11:05',
    6: '',
    7: '12:45',
    8: '13:35',
    9: '14:25',
    10: '15:30',
    11: '16:20',
  },
};

export const gioHocKetThuc = {
  THU_HAI: {
    0: '07:45',
    1: '08:30',
    2: '09:20',
    3: '10:10',
    4: '11:00',
    5: '11:50',
    6: '13:00',
    7: '13:45',
    8: '14:35',
    9: '15:25',
    10: '16:15',
    11: '17:05',
  },
  CON_LAI: {
    0: '',
    1: '08:15',
    2: '09:05',
    3: '09:55',
    4: '11:00',
    5: '11:50',
    6: '',
    7: '13:30',
    8: '14:20',
    9: '15:10',
    10: '16:15',
    11: '17:05',
  },
};

export const TCNS_TYPE = {
  MOI_QUAN_HE_BAN_THAN: 'MOI_QUAN_HE_BAN_THAN',
  MOI_QUAN_HE_BEN_VO_CHONG: 'MOI_QUAN_HE_BEN_VO_CHONG',
  VI_TRI_CHUC_DANH: 'VI_TRI_CHUC_DANH',
  HOC_HAM: 'HOC_HAM',
  TRINH_DO_DAO_TAO: 'TRINH_DO_DAO_TAO',
  THONG_TIN_HOP_DONG: 'THONG_TIN_HOP_DONG',
  DIEN_BIEN_LUONG: 'DIEN_BIEN_LUONG',
  QUA_TRINH_CONG_TAC: 'QUA_TRINH_CONG_TAC',
  QUA_TRINH_CU_DI_CONG_TAC: 'QUA_TRINH_CU_DI_CONG_TAC',
  DIEN_BIEN_PHU_CAP: 'DIEN_BIEN_PHU_CAP',
  CU_DI_DAO_TAO_BOI_DUONG: 'CU_DI_DAO_TAO_BOI_DUONG',
  KHEN_THUONG: 'KHEN_THUONG',
  SANG_KIEN: 'SANG_KIEN',
  KY_LUAT: 'KY_LUAT',
  DOI_TUONG_CHINH_SACH: 'DOI_TUONG_CHINH_SACH',
  LY_LUAN_CHINH_TRI: 'LY_LUAN_CHINH_TRI',
  QUAN_LY_HANH_CHINH: 'QUAN_LY_HANH_CHINH',
  QUAN_LY_NHA_NUOC: 'QUAN_LY_NHA_NUOC',
  NGOAI_NGU: 'NGOAI_NGU',
  TIN_HOC: 'TIN_HOC',
  BOI_DUONG_QUOC_PHONG: 'BOI_DUONG_QUOC_PHONG',
};

export const LIST_TCNS_TYPE = [
  'MOI_QUAN_HE_BAN_THAN',
  'MOI_QUAN_HE_BEN_VO_CHONG',
];

export const DVMC_TYPE = {
  TEST: 'TEST',
  HTML: 'HTML',
  TEXT_BLOCK: 'TEXT_BLOCK',
  TEXT_INPUT: 'TEXT_INPUT',
  TEXT_AREA: 'TEXT_AREA',
  INPUT_NUMBER: 'INPUT_NUMBER',
  UPLOAD_SINGLE: 'UPLOAD_SINGLE',
  UPLOAD_MULTI: 'UPLOAD_MULTI',
  NHAN_SU: 'NHAN_SU',
  DROP_LIST_SINGLE: 'DROP_LIST_SINGLE',
  DROP_LIST_MULTI: 'DROP_LIST_MULTI',
  RADIO_BUTTON: 'RADIO_BUTTON',
  CHECKLIST: 'CHECKLIST',
  CHECK_BOX: 'CHECK_BOX',
  DATE_TIME_PICKER: 'DATE_TIME_PICKER',
  DATE_PICKER: 'DATE_PICKER',
  DON_VI_HANH_CHINH: 'DON_VI_HANH_CHINH',
  TABLE: 'TABLE',
  MY_SEMESTER: 'MY_SEMESTER',
  MY_YEAR: 'MY_YEAR',
  QUOC_GIA: 'QUOC_GIA',
  MY_CREDIT: 'MY_CREDIT',
  MY_COURSE: 'MY_COURSE',
  DAN_TOC: 'DAN_TOC',
  TABLE_CHUONG_SACH: 'TABLE_CHUONG_SACH',
  TON_GIAO: 'TON_GIAO',
  HOC_PHAN_CO_DIEM: 'HOC_PHAN_CO_DIEM',
  DOT_KHAI_BAO: 'DOT_KHAI_BAO',
  TABLE_NHAN_SU: 'TABLE_NHAN_SU',
  TABLE_MINH_CHUNG: 'TABLE_MINH_CHUNG',
  MONTH_YEAR: 'MONTH_YEAR',
  YEAR_PICKER: 'YEAR_PICKER',
  TABLE_LY_LICH: 'TABLE_LY_LICH',
  DOT_TUYEN_DUNG: 'DOT_TUYEN_DUNG',
  NGACH_LUONG: 'NGACH_LUONG',
  DON_VI_NHAN_SU: 'DON_VI_NHAN_SU',
  DON_VI_VI_TRI: 'DON_VI_VI_TRI',
  HINH_THUC_TUYEN_DUNG: 'HINH_THUC_TUYEN_DUNG',
  TRINH_DO_QUAN_LY_HANH_CHINH: 'TRINH_DO_QUAN_LY_HANH_CHINH',
  TRINH_DO_LY_LUAN_CHINH_TRI: 'TRINH_DO_LY_LUAN_CHINH_TRI',
  TRINH_DO_QUAN_LY_NHA_NUOC: 'TRINH_DO_QUAN_LY_NHA_NUOC',
  CHUC_DANH: 'CHUC_DANH',
  LOAI_HOP_DONG: 'LOAI_HOP_DONG',
  TRINH_DO_DAO_TAO: 'TRINH_DO_DAO_TAO',
  TIN_HOC: 'TIN_HOC',
  TINH_TRANG_HON_NHAN: 'TINH_TRANG_HON_NHAN',
  HINH_THUC_DAO_TAO: 'HINH_THUC_DAO_TAO',
  NGANH: 'NGANH',
  BAC_LUONG: 'BAC_LUONG',
  LOAI_PHU_CAP: 'LOAI_PHU_CAP',
  LOAI_BOI_DUONG: 'LOAI_BOI_DUONG',
  CAP_KHEN_THUONG: 'CAP_KHEN_THUONG',
  LOAI_KHEN_THUONG: 'LOAI_KHEN_THUONG',
  PHUONG_THUC_KHEN_THUONG: 'PHUONG_THUC_KHEN_THUONG',
  HINH_THUC_KHEN_THUONG: 'HINH_THUC_KHEN_THUONG',
  CAP_KY_LUAT: 'CAP_KY_LUAT',
  HINH_THUC_KY_LUAT: 'HINH_THUC_KY_LUAT',
  LOAI_SANG_KIEN: 'LOAI_SANG_KIEN',
  CAP_SANG_KIEN: 'CAP_SANG_KIEN',
};

export const UPLOAD_FILE = {
  HOC_BA: 'HOC_BA',
  CHUNG_CHI_QUOC_TE: 'CHUNG_CHI_QUOC_TE',
  CHUNG_CHI_NGOAI_NGU: 'CHUNG_CHI_NGOAI_NGU',
  GIAI_HSG: 'GIAI_HSG',
  DOI_TUONG_UT: 'DOI_TUONG_UT',
};

// gioi han diem cac loai chung chi SAT, ACT, IELTS, TOEFL iBT, TOEFL ITP
export const MIN_SAT = 1130;

export const MAX_SAT = 1600;

export const MIN_ACT = 25;

export const MAX_ACT = 36;

export const MIN_TOEFL_iBT = 65;

export const MAX_TOEFL_iBT = 120;

export const MIN_TOEFL_ITP = 513;

export const MAX_TOEFL_ITP = 677;

export const MIN_IELTS = 5.5;

export const MIN_IELTS_MOT_CUA = 4.5;

export const MAX_IELTS = 9;

export const MAX_TOEIC = 990;

export const MIN_TOEIC = 450;

export const MIN_TOEFL_PBT = 450;

export const MAX_TOEFL_PBT = 677;

export const MIN_TOEFL_CBT = 133;

export const MAX_TOEFL_CBT = 300;

// lay ten file upload tu url
export const REGEX_FILE_NAME_URL = /^.*[\\\\/-]/;

// lay duoi file tu url
export const REGEX_FILE_TYPE_URL = /^.*[\\\\/.-]/;

export const FILE_TYPE = {
  PDF: 'pdf',
  APPLICATION_PDF: 'application/pdf',
  PNG: 'png',
  PNGX: 'PNG',
  JPG: 'jpg',
  JPEG: 'jpeg',
  HEIC: 'heic',
  IMG_PNG: 'image/png',
  DOCX: 'document',
  DOC: 'msword',
  EXCEL: 'sheet',
  POWERPOINT: 'presentation',
};

export const IS_IMAGE = [
  'png',
  'PNG',
  'JPG',
  'jpg',
  'jpeg',
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/PNG',
  'image/heic',
];

export const IS_PDF = ['pdf', 'application/pdf'];

export const FORM_FILE_TYPE = {
  IMAGE: 'image',
  pdf: 'pdf',
  doc: 'doc',
  docx: 'docx',
};

export const FILE_TYPE_ALLOW = {
  IMAGE: '.jpg, .png, .jpeg',
  DOCUMENT: '.pdf',
  ALL: '.pdf, .docx, .xlsx, .pptx, .jpg, .png, .jpeg',
};

export const CAP_DON_VI_HANH_CHINH = {
  TINH: 1,
  HUYEN: 2,
  XA: 3,
  SO_NHA: 4,
};

export const DV_MOT_CUA = {
  DICH_VU: 0,
  LICH_SU: 1,
  LICH_SU_CU: 2,
};

export const MIME_TYPE = {
  image: {
    webp: { ext: 'webp', type: 'image/webp' },
    bmp: { ext: 'bmp', type: 'image/bmp' },
    jpg: { ext: 'jpg', type: 'image/jpg' },
    jpeg: { ext: 'jpeg', type: 'image/jpeg' },
    png: { ext: 'png', type: 'image/png' },
    gif: { ext: 'gif', type: 'image/gif' },
  },
  media: {
    mp4: { ext: 'mp4', type: 'video/mp4' },
    m4v: { ext: 'm4v', type: 'video/x-m4v' },
    mpeg: { ext: 'mpeg', type: 'video/mpeg' },
    mov: { ext: 'mov', type: 'video/quicktime' },
    mp3: { ext: 'mp3', type: 'audio/mpeg' },
  },
};

export const LOAI_DICH_VU = {
  DVMC: 'DVMC',
  VAN_PHONG_SO: 'VAN_PHONG_SO',
};

export const TRANG_THAI_XE_VPS = {
  DA_DUYET: 'Đã duyệt',
  DA_HUY: 'Đã hủy',
  DA_TRA_XE: 'Đã trả xe',
};

export const FORM_STATUS = {
  OK: 'OK',
  PROCESSING: 'PROCESSING',
  PENDING: 'PENDING',
  NOT_OK: 'NOT_OK',
};

export const DEFAULT_QR_VALUE =
  'https://www.npmjs.com/package/react-native-qrcode-svg';

export const STATUS_COLOR = {
  OK: '#399500',
  PROCESSING: '#0158FF',
  PENDING: '#FFAF0B',
  NOT_OK: '#9B0000',
  DEFAULT: '#0158FF',
};

export const STATUS_NAME = {
  OK: 'Đã xử lý',
  PROCESSING: 'Đang xử lý',
  PENDING: 'Chờ xử lý',
  NOT_OK: 'Không duyệt',
  DEFAULT: 'Chưa thực hiện',
};

export const TT_THANH_TOAN_TS = {
  DA_THANH_TOAN_DU: 'Đã thanh toán đủ',
  CHUA_THANH_TOAN: 'Chưa thanh toán',
  THANH_TOAN_THUA: 'Thanh toán thừa',
  CHUA_THANH_TOAN_DU: 'Chưa thanh toán đủ',
  THANH_TOAN_THIEU: 'Thanh toán thiếu',
  DONG_THANH_TOAN: 'Đóng thanh toán',
};

export const STATUS_FORM_ICON = {
  DONE: {
    content: 'check',
    style: {
      backgroundColor: STATUS_COLOR.OK,
      color: R.colors.white,
      borderColor: R.colors.white,
      fontSize: 16,
      borderRadius: 15,
    },
  },
  PENDDING: {
    content: 'clock-o',
    style: {
      backgroundColor: STATUS_COLOR.PENDING,
      color: R.colors.white,
      borderColor: R.colors.white,
      fontSize: 16,
      borderRadius: 15,
    },
  },
  NOT_OK: {
    content: 'trash',
    style: {
      backgroundColor: STATUS_COLOR.NOT_OK,
      color: R.colors.white,
      borderColor: R.colors.white,
      fontSize: 16,
      borderRadius: 15,
    },
  },
  DEFAULT: null,
};

export const ARRAY_DAY = [
  'Chủ Nhật',
  'Thứ 2',
  'Thứ 3',
  'Thứ 4',
  'Thứ 5',
  'Thứ 6',
  'Thứ 7',
];

export const ARRAY_SHORT_DAY = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

export const ARRAY_MONTH = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
];

export const LIST_VALUE_MONTH = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

export const LIST_VALUE_MONTH_NS = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
];

export const MONTH_OPTIONS = ARRAY_MONTH.map((label, index) => ({
  label,
  value: LIST_VALUE_MONTH[index],
}));

export const MONTH_OPTIONS_NS = ARRAY_MONTH.map((label, index) => ({
  label,
  value: LIST_VALUE_MONTH_NS[index],
}));

export const LOAI_LOP = {
  LOP_TC: 'LOP_TIN_CHI',
  LOP_HC: 'LOP_HANH_CHINH',
};

export const GIOI_TINH = ['Nam', 'Nữ'];

export const EnumTrangThaiThanhToan = {
  DA_THANH_TOAN_DU: 'paid',
  CHUA_THANH_TOAN: 'open',
  THANH_TOAN_THUA: 'overpaid',
  CHUA_THANH_TOAN_DU: 'underpaid',
  DONG_THANH_TOAN: 'closed',
};

export const EnumCongTrinhKhoaHoc = {
  HUONG_DAN_NCS: 'Hướng dẫn NCS/HVCH',
  DE_TAI_NHIEM_VU: 'Đề tài/ nhiệm vụ KHCN',
  GIAO_TRINH_SACH_CHUONG_SACH: 'Giáo trình/ sách/ chương sách',
  BAI_BAO_KHOA_HOC: 'Bài báo khoa học',
  HOI_THAO_KHOA_HOC: 'Hội thảo khoa học',
  BANG_SANG_CHE: 'Bằng sáng chế',
  TAC_PHAM: 'Tác phẩm, thành tích',
  THUC_HIEN_DE_TAI: 'Thực hiện đề tài',
};

export const CONG_VWA = {
  CONG_HOC_VIEN: 'cong-hoc-vien',
  CONG_CAN_BO: 'cong-can-bo',
  QLDT: 'quan-ly-dao-tao',
  CORE: 'danh-muc-chung',
  TCNS: 'to-chuc-nhan-su',
  CTSV: 'cong-tac-sinh-vien',
  VPS: 'van-phong-so',
  TC: 'tai-chinh',
  QLKH: 'quan-ly-khoa-hoc',
};

export const CODE_SUCCESS = 200;

export const ERROR_NETWORK_CODE = -100;

export const RESULT_CODE_PUSH_OUT = 401;

export const TIME_OUT = 10000;

export const STATUS_TIME_OUT = 'ECONNABORTED';

export const CODE_TIME_OUT = 408;

export enum EQuetQR {
  TKB = 'TKB',
  KIEM_KE = 'KIEM_KE',
  SLINK_THU_VIEN = 'SLINK_THU_VIEN',
}

export const EKhaiBaoQuyTrinh = {
  DON_DICH_VU: translate('slink:Register'),
  LICH_SU_GUI_DON: translate('slink:History'),
};

export enum EDaLuu {
  TIN_TUC = 'Tin tức',
  SU_KIEN = 'Sự kiện',
  VBHD = 'Văn bản hướng dẫn',
}

export const MapKeyDaLuu = {
  [EDaLuu.TIN_TUC]: 'TIN_TUC',
  [EDaLuu.SU_KIEN]: 'SU_KIEN',
  [EDaLuu.VBHD]: 'VBHD',
};

export const ECongViec = {
  PHU_TRACH: 'Phụ trách',
  DAU_MOI: 'Đầu mối',
  PHOI_HOP: 'Phối hợp',
};

export const EQuaTrinhDaoTaoBoiDuong = {
  TRUONG: 'Trường cử đi',
  CA_NHAN: 'Cá nhân tự đi',
};

export const htmlProps = {
  WebView,
  renderers: {
    // table,
    table: TableRenderer,
    iframe,
  },
  // ignoredTags: IGNORED_TAGS,
  renderersProps: {
    table: {
      // Put the table config here (previously,
      // the first argument of makeTableRenderer)
    },
    a: {
      onPress: (evt: any, href: string) => {
        Linking.openURL(href);
      },
    },
    iframe: {
      // scalesPageToFit: true,
      webViewProps: {
        /* Any prop you want to pass to iframe WebViews */
        allowsFullscreenVideo: true,
      },
    },
  },
  customHTMLElementModels: {
    iframe: iframeModel,
    table: tableModel,
  },
};

//Quy trình biểu mẫu
export enum EKieuDuLieu {
  NUMBER = 'Số nguyên',
  DECIMAL = 'Số thập phân',
  TEXT = 'Chữ',
  BOOLEAN = 'Boolean',
  HOUR = 'Ngày/tháng/năm + giờ',
  DATE = 'Ngày/tháng/năm',
  MONTH = 'Tháng/năm',
  TABLE = 'Bảng',
  FILE = 'File',
  CAN_BO = 'TCNS - Cán bộ',
  SINH_VIEN = 'QLĐT - Sinh viên',
  MULTI_CHOICES = 'Multi choices',
  DANHMUC = 'Danh mục',
  DANHSACH = 'Danh sách sản phẩm NCKH',
  DOAN_VAN_BAN = 'Đoạn văn bản',
}

export enum TrangThaiTiepNhanDon {
  DUYET = 'Duyệt',
  KHONG_DUYET = 'Không duyệt',
  CHINH_SUA_LAI = 'Chỉnh sửa lại',
  DA_CHINH_SUA_LAI = 'Đã chỉnh sửa lại',
  CHUA_CO = 'Chưa có kết quả tiếp nhận',
  CHUA_CAP_NHAT = 'Chưa cập nhật',
}

export const MapColorTrangThaiTiepNhanDon = {
  [TrangThaiTiepNhanDon.CHINH_SUA_LAI]: 'warning',
  [TrangThaiTiepNhanDon.CHUA_CO]: 'info',
  [TrangThaiTiepNhanDon.DUYET]: 'success',
  [TrangThaiTiepNhanDon.DA_CHINH_SUA_LAI]: 'info',
  [TrangThaiTiepNhanDon.KHONG_DUYET]: 'error',
  [TrangThaiTiepNhanDon.CHUA_CAP_NHAT]: 'warning',
};

export const MapIconTrangThaiTiepNhanDon = {
  [TrangThaiTiepNhanDon.CHINH_SUA_LAI]: {
    content: 'update',
    backgroundColor: STATUS_COLOR.NOT_OK,
  },
  [TrangThaiTiepNhanDon.CHUA_CO]: {
    content: 'query-builder',
    backgroundColor: STATUS_COLOR.PENDING,
  },
  [TrangThaiTiepNhanDon.DUYET]: {
    content: 'check',
    backgroundColor: STATUS_COLOR.OK,
  },
  [TrangThaiTiepNhanDon.DA_CHINH_SUA_LAI]: {
    content: 'check',
    backgroundColor: STATUS_COLOR.OK,
  },

  [TrangThaiTiepNhanDon.KHONG_DUYET]: {
    content: 'close',
    backgroundColor: STATUS_COLOR.NOT_OK,
  },
  [TrangThaiTiepNhanDon.CHUA_CAP_NHAT]: {
    content: 'timelapse',
    backgroundColor: STATUS_COLOR.PENDING,
  },
};

export const MapModeTime = (kieuDuLieu: EKieuDuLieu) => {
  switch (kieuDuLieu) {
    case EKieuDuLieu.HOUR:
      return 'HH:mm DD/MM/YYYY';
    case EKieuDuLieu.DATE:
      return 'DD/MM/YYYY';
    case EKieuDuLieu.MONTH:
      return 'MM/YYYY';

    default:
      return 'DD/MM/YYYY';
  }
};

export enum ELoaiTruongThongTinTinh {
  VAI_TRO = 'Vai trò',
  THOI_GIAN_BAT_DAU = 'Thời gian bắt đầu',
  THOI_GIAN_KET_THUC = 'Thời gian kết thúc',
  MOC_THOI_GIAN = 'Mốc thời gian',
  DANH_SACH_THANH_VIEN = 'Danh sách thành viên',
  SAN_PHAM_NCKH_LIEN_QUAN = 'Sản phẩm NCKH liên quan',
  MINH_CHUNG_CHIA_GIO = 'Minh chứng yêu cầu giờ/điểm',
}

export const MapIdLoaiTruongThongTinTinh = {
  [ELoaiTruongThongTinTinh.VAI_TRO]: 'vaiTroTinh',
  [ELoaiTruongThongTinTinh.THOI_GIAN_BAT_DAU]: 'thoiGianBatDauTinh',
  [ELoaiTruongThongTinTinh.THOI_GIAN_KET_THUC]: 'thoiGianKetThucTinh',
  [ELoaiTruongThongTinTinh.MOC_THOI_GIAN]: 'mocThoiGianTinh',
  [ELoaiTruongThongTinTinh.DANH_SACH_THANH_VIEN]: 'danhSachThanhVien',
  [ELoaiTruongThongTinTinh.SAN_PHAM_NCKH_LIEN_QUAN]: 'sanPhamNCKHLienQuan',
};

export enum ELoaiThoiGianThucHien {
  NGAYTHANGNAM = 'Mốc thời gian bắt đầu - kết thúc (ngày/tháng/năm)',
  THANGNAM = 'Mốc thời gian bắt đầu - kết thúc (tháng/năm)',
  NAM = 'Mốc thời gian bắt đầu - kết thúc (năm)',
  THOIGIANCUTHE_DDMMYYYY = 'Thời gian cụ thể (ngày/tháng/năm)',
  THOIGIANCUTHE_MMYYYY = 'Thời gian cụ thể (tháng/năm)',
  THOIGIANCUTHE_YYYY = 'Thời gian cụ thể (năm)',
}

export const MapKeyLoaiThoiGianThucHien = {
  [ELoaiThoiGianThucHien.NGAYTHANGNAM]: 'DD/MM/YYYY',
  [ELoaiThoiGianThucHien.THANGNAM]: 'MM/YYYY',
  [ELoaiThoiGianThucHien.NAM]: 'YYYY',
  [ELoaiThoiGianThucHien.THOIGIANCUTHE_DDMMYYYY]: 'DD/MM/YYYY',
  [ELoaiThoiGianThucHien.THOIGIANCUTHE_MMYYYY]: 'MM/YYYY',
  [ELoaiThoiGianThucHien.THOIGIANCUTHE_YYYY]: 'YYYY',
};

export enum EHocHam {
  GS = 'Giáo sư',
  PGS = 'Phó Giáo sư',
}

export enum EHocVi {
  CN = 'Cử nhân',
  KS = 'Kỹ sư',
  THS = 'Thạc sĩ',
  TS = 'Tiến sĩ',
  GVC = 'Giảng viên chính',
}

export const SHORT_DELAY = 1000;

export const LONG_DELAY = 4500;

export enum ELoaiThanhVien {
  TRONG_HE_THONG = 'Cán bộ / Giảng viên trong Học viện',
  NGOAI_HE_THONG = 'Người ngoài Học viện',
}

export enum ETrangThaiSanPham {
  CHUA_TIEP_NHAN = 'Chưa có kết quả tiếp nhận',
  DUYET = 'Duyệt',
  KHONG_DUYET = 'Không duyệt',
  CHINH_SUA_LAI = 'Chỉnh sửa lại',
  DA_CHINH_SUA_LAI = 'Đã chỉnh sửa lại',
}

export const MapKeyColorTrangThaiSanPham = {
  [ETrangThaiSanPham.CHINH_SUA_LAI]: '#ffca2c',
  [ETrangThaiSanPham.CHUA_TIEP_NHAN]: '#0d6efd',
  [ETrangThaiSanPham.DUYET]: '#1fba36',
  [ETrangThaiSanPham.DA_CHINH_SUA_LAI]: '#0dcaf0',
  [ETrangThaiSanPham.KHONG_DUYET]: '#dc3545',
};

export const MapKeyTextTrangThaiSanPham = {
  [ETrangThaiSanPham.CHUA_TIEP_NHAN]: 'Chờ xử lý',
  [ETrangThaiSanPham.DUYET]: 'Duyệt',
  [ETrangThaiSanPham.KHONG_DUYET]: 'Không duyệt',
  [ETrangThaiSanPham.CHINH_SUA_LAI]: 'Chỉnh sửa lại',
  [ETrangThaiSanPham.DA_CHINH_SUA_LAI]: 'Đã chỉnh sửa lại',
};

export enum ETrangThaiYeuCauQuyDoiGio {
  CHUA_TIEP_NHAN = 'Chưa có kết quả tiếp nhận',
  DUYET = 'Duyệt',
  KHONG_DUYET = 'Không duyệt',
  CHINH_SUA_LAI = 'Chỉnh sửa lại',
  DA_CHINH_SUA_LAI = 'Đã chỉnh sửa lại',
}

export const MapKeyColorTrangThaiYeuCauQuyDoiGio = {
  [ETrangThaiYeuCauQuyDoiGio.CHINH_SUA_LAI]: '#ffca2c',
  [ETrangThaiYeuCauQuyDoiGio.CHUA_TIEP_NHAN]: '#0d6efd',
  [ETrangThaiYeuCauQuyDoiGio.DUYET]: '#1fba36',
  [ETrangThaiYeuCauQuyDoiGio.DA_CHINH_SUA_LAI]: '#0dcaf0',
  [ETrangThaiYeuCauQuyDoiGio.KHONG_DUYET]: '#dc3545',
};

export const MapKeyTextTrangThaiYeuCauQuyDoiGio = {
  [ETrangThaiYeuCauQuyDoiGio.CHUA_TIEP_NHAN]: 'Chờ xử lý',
  [ETrangThaiYeuCauQuyDoiGio.DUYET]: 'Duyệt',
  [ETrangThaiYeuCauQuyDoiGio.KHONG_DUYET]: 'Không duyệt',
  [ETrangThaiYeuCauQuyDoiGio.CHINH_SUA_LAI]: 'Chỉnh sửa lại',
  [ETrangThaiYeuCauQuyDoiGio.DA_CHINH_SUA_LAI]: 'Đã chỉnh sửa lại',
};

export enum ELoaiKhaiBao {
  TU_KHAI_BAO = 'Tự khai báo',
  DUOC_KHAI_BAO = 'Được khai báo',
}

export enum ELoaiDuLieuQuyDoiGio {
  CAN_BO_DE_XUAT = 'Cán bộ/giảng viên khai báo giờ chuẩn NCKH',
  HE_THONG_DE_XUAT = 'Dữ liệu do Hệ thống đề xuất',
  // PHONG_QLKH_DA_DUYET = 'Dữ liệu do Phòng QLKH đã duyệt lần gần nhất',
}

export enum ELoaiCanBo {
  TRONG_HOC_VIEN = 'Cán bộ / Giảng viên trong học viện',
  NGOAI_HOC_VIEN = 'Người ngoài Học viện',
}

export enum EDoiTuongDieuPhoi {
  NGUOI_CU_THE = 'Người dùng',
  TO_CHUC = 'Bộ phận xử lý',
}

export enum LoaiDefaultValue {
  QLDT_SV_HO_TEN = 'QLDT - Họ tên sinh viên',
  QLDT_SV_HO_DEM = 'QLDT - Họ đệm sinh viên',
  QLDT_SV_TEN = 'QLDT - Tên sinh viên',
  QLDT_SV_MA_SINH_VIEN = 'QLDT - Mã sinh viên',
  QLDT_SV_NGAY_SINH = 'QLDT - Ngày sinh sinh viên',
  QLDT_SV_LOP_HC = 'QLDT - Lớp hành chính sinh viên',
  QLDT_SV_KHOA = 'QLDT - Khóa sinh viên',
  QLDT_SV_NGANH = 'QLDT - Ngành sinh viên',
  QLDT_SV_CHUYEN_NGANH = 'QLDT - Chuyên ngành sinh viên',
  QLDT_SV_DON_VI = 'QLDT - Đơn vị sinh viên',
  QLDT_SV_TRINH_DO = 'QLDT - Trình độ đào tạo sinh viên',
  QLDT_SV_HINH_THUC = 'QLDT - Hình thức đào tạo sinh viên',
  QLDT_SV_SO_DT = 'QLDT - Số điện thoại sinh viên',
  CUSTOM = 'Tùy biến',
}

export const MOI_QUAN_HE_BAN_THAN = [
  'Bố đẻ',
  'Mẹ đẻ',
  'Anh ruột',
  'Chị ruột',
  'Em ruột',
  'Chồng',
  'Vợ',
  'Con đẻ',
  'Con nuôi',
];

export const MOI_QUAN_HE_VO = [
  'Bố vợ (chồng)',
  'Mẹ vợ (chồng)',
  'Anh vợ (chồng)',
  'Chị vợ (chồng)',
  'Em vợ (chồng)',
];

export enum ELoaiHocPhanDangKyTinChi {
  NHU_CAU = 'NhuCau',
  TIEN_TRINH = 'TienTrinh',
  HOC_LAI = 'HocLai',
  HOC_VUOT = 'HocVuot',
  CAI_THIEN = 'HocCaiThien',
  // NGANH_2 = 'kyTruoc',
  CHUA_THEO_TIEN_TRINH = 'ChuaTheoTienTrinh',
  HOC_NGOAI = 'NgoaiChuongTrinh',
  // TAT_CA = 'TatCa',
}

export const LoaiHocPhanDangKyTinChi = {
  [ELoaiHocPhanDangKyTinChi.NHU_CAU]: 'Theo nhu cầu',
  [ELoaiHocPhanDangKyTinChi.TIEN_TRINH]: 'Theo đúng tiến trình',
  [ELoaiHocPhanDangKyTinChi.HOC_LAI]: 'Học lại',
  [ELoaiHocPhanDangKyTinChi.HOC_VUOT]: 'Học vượt',
  [ELoaiHocPhanDangKyTinChi.CAI_THIEN]: 'Học cải thiện',
  // [ELoaiHocPhanDangKyTinChi.NGANH_2]: 'Học ngành 2',
  [ELoaiHocPhanDangKyTinChi.CHUA_THEO_TIEN_TRINH]: 'Chưa theo tiến trình',
  [ELoaiHocPhanDangKyTinChi.HOC_NGOAI]: 'Học ngoài CTĐT',
  // [ELoaiHocPhanDangKyTinChi.TAT_CA]: 'Tất cả học phần',
};

export enum ETrangThaiDuyetKeKhaiTaiSan {
  CHUA_KE_KHAI = 'Chưa kê khai',
  CHUA_GUI = 'Chưa gửi',
  CHUA_DUYET = 'Chưa duyệt',
  KHONG_DUYET = 'Không duyệt',
  DUYET = 'Duyệt',
  YEU_CAU_CHINH_SUA_LAI = 'Yêu cầu chỉnh sửa lại',
}

export const MapKeyColorTrangThaiDuyetKeKhaiTaiSan = {
  [ETrangThaiDuyetKeKhaiTaiSan.CHUA_KE_KHAI]: 'default',
  [ETrangThaiDuyetKeKhaiTaiSan.CHUA_GUI]: 'orange',
  [ETrangThaiDuyetKeKhaiTaiSan.CHUA_DUYET]: 'blue',
  [ETrangThaiDuyetKeKhaiTaiSan.KHONG_DUYET]: 'red',
  [ETrangThaiDuyetKeKhaiTaiSan.DUYET]: 'green',
  [ETrangThaiDuyetKeKhaiTaiSan.YEU_CAU_CHINH_SUA_LAI]: 'red',
};

export enum EnumLoaiKeKhai {
  KE_KHAI_LAN_DAU = 'Kê khai lần đầu',
  KE_KHAI_HANG_NAM = 'Kê khai hàng năm',
  KE_KHAI_PHU_CUNG = 'Kê khai phục vụ công tác cán bộ',
  KE_KHAI_BO_SUNG = 'Kê khai bổ sung',
}

export enum ETrangThaiDanhGia {
  CHUA_DANH_GIA = 'Chưa đánh giá',
  DA_DANH_GIA_CHUA_GUI = 'Đã đánh giá - Chưa gửi',
  CHO_DANH_GIA = 'Chờ đánh giá',
  DON_VI_DANH_GIA_CHUA_GUI = 'Đơn vị đánh giá - Chưa gửi',
  DON_VI_DANH_GIA_DA_GUI = 'Đơn vị đánh giá - Đã gửi',
  HOI_DONG_DA_DUYET = 'Hội đồng đã duyệt',
  DA_GUI = 'Đã gửi',
  CHUA_GUI = 'Chưa gửi',
  CHUA_DK_DG = 'Chưa đủ điều kiện đánh giá',
}

export const MapKeyTextTrangThaiDanhGia = {
  [ETrangThaiDanhGia.CHO_DANH_GIA]: 'Chờ đánh giá của đơn vị',
  [ETrangThaiDanhGia.CHUA_DANH_GIA]: 'CB chưa gửi',
  [ETrangThaiDanhGia.DA_DANH_GIA_CHUA_GUI]: 'CB đã đánh giá - chưa gửi',
  [ETrangThaiDanhGia.DON_VI_DANH_GIA_CHUA_GUI]: 'Đơn vị đã đánh giá - chưa gửi',
  [ETrangThaiDanhGia.DON_VI_DANH_GIA_DA_GUI]: 'Đơn vị đã đánh giá',
  [ETrangThaiDanhGia.HOI_DONG_DA_DUYET]: 'Hội đồng đã duyệt',
  [ETrangThaiDanhGia.DA_GUI]: 'Đã gửi',
  [ETrangThaiDanhGia.CHUA_GUI]: 'Chưa gửi',
  [ETrangThaiDanhGia.CHUA_DK_DG]: 'Chưa đủ điều kiện đánh giá',
};

export const MapKeyColorTrangThaiDanhGia = {
  [ETrangThaiDanhGia.CHO_DANH_GIA]: 'blue',
  [ETrangThaiDanhGia.CHUA_DANH_GIA]: 'orange',
  [ETrangThaiDanhGia.DA_DANH_GIA_CHUA_GUI]: 'orange',
  [ETrangThaiDanhGia.DON_VI_DANH_GIA_CHUA_GUI]: 'blue',
  [ETrangThaiDanhGia.DON_VI_DANH_GIA_DA_GUI]: 'green',
  [ETrangThaiDanhGia.HOI_DONG_DA_DUYET]: 'green',
  [ETrangThaiDanhGia.DA_GUI]: 'green',
  [ETrangThaiDanhGia.CHUA_GUI]: 'orange',
  [ETrangThaiDanhGia.CHUA_DK_DG]: 'red',
};

export const MapKeyColorTrangThaiDanhGiaDonVi = {
  [ETrangThaiDanhGia.CHO_DANH_GIA]: 'orange',
  [ETrangThaiDanhGia.CHUA_DANH_GIA]: 'red',
  [ETrangThaiDanhGia.DA_DANH_GIA_CHUA_GUI]: 'red',
  [ETrangThaiDanhGia.DON_VI_DANH_GIA_CHUA_GUI]: 'orange',
  [ETrangThaiDanhGia.DON_VI_DANH_GIA_DA_GUI]: 'green',
  [ETrangThaiDanhGia.HOI_DONG_DA_DUYET]: 'green',
  [ETrangThaiDanhGia.DA_GUI]: 'green',
  [ETrangThaiDanhGia.CHUA_GUI]: 'orange',
  [ETrangThaiDanhGia.CHUA_DK_DG]: 'red',
};

export enum ETransactionPaymentType {
  BANK = 'bank',
  MANUAL = 'manual',
  MOMO_WALLET = 'momo-wallet',
  INTERNAL = 'internal',
}

export const transactionPaymentLabel: Record<ETransactionPaymentType, string> =
  {
    [ETransactionPaymentType.BANK]: 'Chuyển khoản ngân hàng',
    [ETransactionPaymentType.MANUAL]: 'Thủ công',
    [ETransactionPaymentType.MOMO_WALLET]: 'Ví Momo',
    [ETransactionPaymentType.INTERNAL]: 'Hệ thống',
  };

export enum ETransactionSourceType {
  EXTERNAL = 'external',
  WALLET = 'wallet',
  SYSTEM = 'system',
}

export enum ETransactionStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAIL = 'fail',
  CANCEL = 'cancel',
}

export const transactionStatus: Record<ETransactionStatus, string> = {
  [ETransactionStatus.PENDING]: 'Đang xử lý',
  [ETransactionStatus.SUCCESS]: 'Thành công',
  [ETransactionStatus.FAIL]: 'Không thành công',
  [ETransactionStatus.CANCEL]: 'Đã hủy',
};

export const colorTransactionStatus: Record<ETransactionStatus, string> = {
  [ETransactionStatus.PENDING]: 'blue',
  [ETransactionStatus.SUCCESS]: 'green',
  [ETransactionStatus.FAIL]: 'red',
  [ETransactionStatus.CANCEL]: 'default',
};

export const TrangThaiTT = {
  open: 'Chưa thanh toán',
  underpaid: 'Chưa thanh toán đủ',
  paid: 'Đã thanh toán đủ',
  overpaid: 'Thanh toán thừa',
  closed: 'Đóng thanh toán',
};

export enum ETrangThaiTT {
  OPEN = 'open',
  UNDERPAID = 'underpaid',
  PAID = 'paid',
  OVERPAID = 'overpaid',
  CLOSED = 'closed',
}

export enum EDoiTuongLopHanhChinh {
  TC = 'TC',
  LK = 'LK',
  CLC = 'CLC',
  PH = 'PH',
}

export const doiTuongLopHanhChinh: Record<EDoiTuongLopHanhChinh, string> = {
  [EDoiTuongLopHanhChinh.TC]: 'Tiêu chuẩn',
  [EDoiTuongLopHanhChinh.LK]: 'Liên kết',
  [EDoiTuongLopHanhChinh.CLC]: 'Chất lượng cao',
  [EDoiTuongLopHanhChinh.PH]: 'Phân hiệu',
};

//Lịch thi
export enum EdieuKienKQHTEnum {
  DAT = 'Đạt',
  KHONG_DAT = 'Không đạt',
  CHUA_DUYET = 'Chưa duyệt',
}

export const colorSchemeKQHTKey: Record<EdieuKienKQHTEnum, ColorSchemeType> = {
  [EdieuKienKQHTEnum.DAT]: 'green',
  [EdieuKienKQHTEnum.KHONG_DAT]: 'red',
  [EdieuKienKQHTEnum.CHUA_DUYET]: 'yellow',
};

export enum EdieuKienCongNoEnum {
  DU = 'Đủ',
  CHUA_DU = 'Chưa đủ',
  MIEN = 'Miễn',
}

export const colorSchemeCongNoKey: Record<
  EdieuKienCongNoEnum,
  ColorSchemeType
> = {
  [EdieuKienCongNoEnum.DU]: 'green',
  [EdieuKienCongNoEnum.CHUA_DU]: 'red',
  [EdieuKienCongNoEnum.MIEN]: 'yellow',
};

//Lịch thi
//Điểm rèn luyện
export enum ETrangThaiChamDiem {
  DANG_CHAM = 'DANG_CHAM',
  DA_CHAM_XONG = 'DA_CHAM_XONG',
  DANG_NIEM_YET = 'DANG_NIEM_YET',
  DA_NIEM_YET = 'DA_NIEM_YET',
  DANG_XU_LY_KHIEU_NAI = 'DANG_XU_LY_KHIEU_NAI',
  DA_CONG_BO = 'DA_CONG_BO',
}

export const MapKeyNameTrangThaiChamDiem = {
  [ETrangThaiChamDiem.DANG_CHAM]: 'Đang chấm',
  [ETrangThaiChamDiem.DANG_XU_LY_KHIEU_NAI]: 'Đang xử lý khiếu nại',
  [ETrangThaiChamDiem.DA_CHAM_XONG]: 'Đã chấm xong',
  [ETrangThaiChamDiem.DA_CONG_BO]: 'Đã công bố',
  [ETrangThaiChamDiem.DANG_NIEM_YET]: 'Đang niêm yết',
  [ETrangThaiChamDiem.DA_NIEM_YET]: 'Đã niêm yết',
};

export const MapKeyColorTrangThaiChamDiem = {
  [ETrangThaiChamDiem.DANG_CHAM]: 'yellow',
  [ETrangThaiChamDiem.DANG_XU_LY_KHIEU_NAI]: 'blue',
  [ETrangThaiChamDiem.DA_CHAM_XONG]: 'green',
  [ETrangThaiChamDiem.DA_CONG_BO]: 'green',
  [ETrangThaiChamDiem.DANG_NIEM_YET]: 'yellow',
  [ETrangThaiChamDiem.DA_NIEM_YET]: 'blue',
};

//Điểm rèn luyện
export const CONFIG_SSO = {
  issuer: `${SSO_URL}`,
  clientId: `${SUB_NAME}-connect`,
  redirectUrl: `${REDIREC_URL}`,
  serviceConfiguration: {
    authorizationEndpoint: `${SSO_URL}/protocol/openid-connect/auth`,
    tokenEndpoint: `${SSO_URL}/protocol/openid-connect/token`,
    revocationEndpoint: `${SSO_URL}/protocol/openid-connect/revoke`,
    endSessionEndpoint: `${SSO_URL}/protocol/openid-connect/logout`,
  },
  scopes: ['openid', 'profile'],
};

export const LIST_LANGUAGE = [
  {
    name: translate('slink:Vietnamese'),
    key: 'vi',
    image: R.images.languageVi,
  },
  { name: translate('slink:English'), key: 'en', image: R.images.languageEn },
];

export enum LoaiKhaoSat {
  KHAO_SAT = 'Khảo sát',
  DANH_GIA_GIANG_VIEN = 'Đánh giá giảng viên',
}

export enum ETrangThaiGiangDay {
  CHUA_BAT_DAU = 'chua_bat_dau',
  DA_BAT_DAU = 'da_bat_dau',
}

export enum TrangThaiChamCong {
  LUONG_THEO_THOI_GIAN = 'Lương theo thời gian',
  OM_DIEU_DUONG = 'Ốm, điều dưỡng',
  CON_OM = 'Con ốm',
  THAI_SAN = 'Thai sản',
  TAI_NAN = 'Tai nạn',
  NGHI_PHEP = 'Nghỉ phép',
  NGHI_VIEC_RIENG = 'Nghỉ việc riêng',
  NGHI_LE = 'Nghỉ lễ',
  HOI_NGHI_HOC_TAP = 'Hội nghị, học tập',
  NGHI_BU = 'Nghỉ bù',
  NGHI_KHONG_LUONG = 'Nghỉ không lương',
  LAO_DONG_NGHIA_VU = 'Lao động nghĩa vụ',
  NGUNG_VIEC = 'Ngưng việc',
}

export const EMapColorTrangThaiChamCong = {
  [TrangThaiChamCong.LUONG_THEO_THOI_GIAN]: '#27AE60',
  [TrangThaiChamCong.OM_DIEU_DUONG]: 'gray',
  [TrangThaiChamCong.CON_OM]: 'gray',
  [TrangThaiChamCong.THAI_SAN]: 'gray',
  [TrangThaiChamCong.TAI_NAN]: 'gray',
  [TrangThaiChamCong.NGHI_PHEP]: '#F1C40F',
  [TrangThaiChamCong.NGHI_VIEC_RIENG]: '#3498DB',
  [TrangThaiChamCong.NGHI_LE]: 'blue',
  [TrangThaiChamCong.HOI_NGHI_HOC_TAP]: '#E67E22',
  [TrangThaiChamCong.NGHI_BU]: '#F1C40F',
  [TrangThaiChamCong.NGHI_KHONG_LUONG]: '#F1C40F',
  [TrangThaiChamCong.LAO_DONG_NGHIA_VU]: '#F1C40F',
  [TrangThaiChamCong.NGUNG_VIEC]: 'red',
};

export const ENguoiTraLoiDrl = {
  SINH_VIEN: 'Sinh viên',
  CO_VAN_HOC_TAP: 'Cố vấn học tập',
  CTSV: 'Phòng công tác sinh viên',
};

export enum ETrangThaiPhieuDiemRL {
  CHUA_GUI = 'Chưa gửi',
  LUU = 'Đã lưu và chưa gửi',
  DA_GUI = 'Đã gửi',
}

export const LIMIT_OF_PAGE = 5;

export enum ESuKienType {
  CA_NHAN = 'Cá nhân',
  TAT_CA = 'Chung',
  TUAN_LE_CONG_DAN = 'Tuần lễ công dân',
  CAC_HOAT_DONG = 'Các hoạt động cho sinh viên',
  DAO_TAO_BOI_DUONG = 'Đào tạo bồi dưỡng',
  HOP_TAC_NGUYEN_CUU_CHUYEN_GAO = 'Hợp tác - Nghiên cứu - chuyển giao',
  THUC_THI_CHINH_SACH = 'Thực thi, phát triển chính sách',
  HOAT_DONG_XA_HOI = 'Hoạt động xã hội',
  VAN_HOA_VAN_NGHE_THE_THAO = 'Sự kiện',
  HOAT_DONG_CAU_LAC_BO = 'Hoạt động câu lạc bộ',
  KHAC = 'Khác',
}
