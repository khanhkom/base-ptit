import { SLICE_NAME } from '@config/type';
import { InfoUserTCNSProps } from '@model/infoUserTCNS';
import { createSlice } from '@reduxjs/toolkit';

const initialAppState: {
  infoUserTCNS: InfoUserTCNSProps | null;
} = {
  infoUserTCNS: null,
};

const infoUserTCNSlice = createSlice({
  name: SLICE_NAME.TEST,
  initialState: initialAppState,
  reducers: {
    setInfoUserTCNS: (
      state,
      {
        payload,
      }: {
        payload: {
          infoUserTCNS: InfoUserTCNSProps;
        };
      },
    ) => {
      state.infoUserTCNS = payload.infoUserTCNS;
    },
  },
});

export const { reducer: infoUserTCNSReducer, actions: infoUserTCNSActions } =
  infoUserTCNSlice;
