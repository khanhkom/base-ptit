import { SLICE_NAME } from '@config/type';
import { colorCalendarProps } from '@model/colorCalendar';
import { createSlice } from '@reduxjs/toolkit';

const initialAppState: {
  colorCalendar: colorCalendarProps | null;
} = {
  colorCalendar: null,
};

const colorCalenderSlice = createSlice({
  name: SLICE_NAME.TEST,
  initialState: initialAppState,
  reducers: {
    setcolorCalendar: (
      state,
      {
        payload,
      }: {
        payload: {
          colorCalendar: colorCalendarProps;
        };
      },
    ) => {
      state.colorCalendar = payload.colorCalendar;
    },
  },
});

export const { reducer: colorCalendarReducer, actions: colorCalendarActions } =
  colorCalenderSlice;
