import { createDeepEqualSelector } from '@common';
import { RootState } from '@store/all-reducers';

export const selectAppConfig = createDeepEqualSelector(
  (state: RootState) => state.app,
  app => ({
    loadingApp: app.loadingApp,
    showDialog: app.showDialog,
    theme: app.theme,
    profile: app.profile,
    account: app.account,
    loaiTinTuc: app.loaiTinTuc,
    codePhanQuyen: app.codePhanQuyen,
    danhMucNCKH: app.danhMucNCKH,
    colorCalendar: app.colorCalendar,
  }),
);

export const selectAppToken = createDeepEqualSelector(
  (state: RootState) => state.app,
  app => app.token,
);
