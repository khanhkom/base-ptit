export enum ELoaiDoiTuongChuTri {
  CHUNG = 'CHUNG',
  LANH_DAO = 'LANH_DAO',
  DON_VI = 'DON_VI',
  TRUONG_DON_VI = 'TRUONG_DON_VI',
  TAT_CA = 'TAT_CA',
  NGHI = 'Lịch nghỉ',
}

export enum LoaiDoiTuongChuTri {
  TAT_CA = 'Tất cả',
  CHUNG = 'Lịch chung',
  LANH_DAO = 'Lịch Ban Giám đốc',
  TRUONG_DON_VI = 'Lịch trưởng, phó, phụ trách đơn vị',
  DON_VI = 'Lịch đơn vị',
  // NGHI = 'Lịch nghỉ',
}

export const MapKeyTextLoaiDoiTuongChuTri = {
  [ELoaiDoiTuongChuTri.CHUNG]: 'Lịch chung',
  [ELoaiDoiTuongChuTri.LANH_DAO]: 'Lịch Ban Giám đốc',
  [ELoaiDoiTuongChuTri.DON_VI]: 'Lịch đơn vị',
  [ELoaiDoiTuongChuTri.TRUONG_DON_VI]: 'Lịch trưởng, phó, phụ trách đơn vị',
  [ELoaiDoiTuongChuTri.TAT_CA]: 'Tất cả',
  [ELoaiDoiTuongChuTri.NGHI]: 'Lịch nghỉ',
};

export const colorLoaiDoiTuongChuTri = {
  'Lịch chung': 'rgba(8, 140, 206, 0.7)',
  'Lịch Ban Giám đốc': 'rgba(240, 49, 52, 0.7)',
  'Lịch đơn vị': 'rgba(59, 172, 21, 0.7)',
  'Lịch trưởng, phó, phụ trách đơn vị': 'rgba(187, 77, 221, 0.7)',
  'Lịch nghỉ': 'rgba(249, 105, 14,0.7)',
};

export enum TrangThaiLamNgoaiGio {
  THUONG = 'Làm thêm ngày thường',
  CUOI_TUAN = 'Làm thêm ngày T7,CN',
  LE = 'Làm thêm ngày lễ, Tết',
  DEM = 'Làm thêm buổi đêm',
}

export const EMapColorTrangThaiLamNgoaiGio = {
  [TrangThaiLamNgoaiGio.THUONG]: '#27AE60',
  [TrangThaiLamNgoaiGio.CUOI_TUAN]: '#F1C40F',
  [TrangThaiLamNgoaiGio.LE]: 'rgba(240, 49, 52, 0.7)',
  [TrangThaiLamNgoaiGio.DEM]: 'rgba(0,0,0,0.3)',
};

export function chuyenDoiThu(ngay: number) {
  switch (ngay) {
    case 1:
      return 'Thứ 2';
    case 2:
      return 'Thứ 3';
    case 3:
      return 'Thứ 4';
    case 4:
      return 'Thứ 5';
    case 5:
      return 'Thứ 6';
    case 6:
      return 'Thứ 7';
    case 7:
      return 'Chủ Nhật';

    default:
      return 'Ngày không hợp lệ';
  }
}

export enum ETrangThaiDuyetBanGiamDoc {
  CHUA_DUYET = 'Chưa duyệt',
  DA_DUYET = 'Đã duyệt',
  KHONG_DUYET = 'Không duyệt',
  CHUA_GUI_YEU_CAU = 'Chưa gửi yêu cầu',
}

export const ColorTrangThaiDuyetBanGiamDoc: Record<
  ETrangThaiDuyetBanGiamDoc,
  string
> = {
  [ETrangThaiDuyetBanGiamDoc.CHUA_DUYET]: 'blue',
  [ETrangThaiDuyetBanGiamDoc.DA_DUYET]: 'green',
  [ETrangThaiDuyetBanGiamDoc.KHONG_DUYET]: 'red',
  [ETrangThaiDuyetBanGiamDoc.CHUA_GUI_YEU_CAU]: 'orange',
};
