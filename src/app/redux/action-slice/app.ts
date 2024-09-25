/* eslint-disable @typescript-eslint/no-explicit-any */
import { SLICE_NAME } from '@config/type';
import { DanhMucNCKHProps } from '@features/QuanLyKhoaHocV2/type';
import { AccountProps, AppState } from '@model/app';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeType } from '@theme';

const initialAppState: AppState = {
  internetState: true,
  profile: {},
  account: null,
  token: undefined,
  /**
   * default true to load app
   */
  loadingApp: false,
  showDialog: false,
  theme: 'default',
  loaiTinTuc: [],
  danhMucNCKH: [],
  codePhanQuyen: [],
  colorCalendar: [],
};

const appSlice = createSlice({
  name: SLICE_NAME.APP,
  initialState: initialAppState,
  reducers: {
    setInternetState: (state, { payload }: PayloadAction<boolean>) => {
      state.internetState = payload;
    },
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    setAppProfile: (state, { payload }: PayloadAction<unknown>) => {
      state.profile = payload;
    },
    setColorCalendar: (state, { payload }: PayloadAction<any>) => {
      state.colorCalendar = payload;
    },
    setAppAccount: (state, { payload }: PayloadAction<AccountProps | null>) => {
      state.account = payload;
    },
    setAppTheme: (state, { payload }: PayloadAction<ThemeType>) => {
      state.theme = payload;
    },
    startLoadApp: state => {
      state.loadingApp = true;
    },
    endLoadApp: state => {
      state.loadingApp = false;
    },
    startProcess: state => {
      state.showDialog = true;
    },
    endProcess: state => {
      state.showDialog = false;
    },
    logout: state => {
      state.token = undefined;

      state.account = null;
    },
    setLoaiTinTuc: (state, { payload }: PayloadAction<Array<any>>) => {
      state.loaiTinTuc = payload;
    },
    setdanhMucNCKH: (
      state,
      { payload }: PayloadAction<Array<DanhMucNCKHProps>>,
    ) => {
      state.danhMucNCKH = payload;
    },
    saveCodePhanQuyen: (state, { payload }: PayloadAction<string[]>) => {
      state.codePhanQuyen = payload;
    },
  },
});

export const { reducer: appReducer, actions: appActions } = appSlice;
