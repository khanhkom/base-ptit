/* eslint-disable import/no-extraneous-dependencies */

import { SLICE_NAME } from '@config/type';
import { createSlice } from '@reduxjs/toolkit';
import { ImageSource } from 'react-native-image-viewing/dist/@types';

const initialAppState: {
  isVisible?: boolean;
  index?: number;
  image?: { source: ImageSource; title: string }[];
} = {
  index: 0,
  isVisible: false,
  image: [],
};

const viewImageSlice = createSlice({
  name: SLICE_NAME.TEST,
  initialState: initialAppState,
  reducers: {
    setviewImage: (
      state,
      {
        payload,
      }: {
        payload: {
          isVisible: boolean;
          image: { source: ImageSource; title: string }[];
          index?: number;
        };
      },
    ) => {
      state.image = payload.image;

      state.index = payload?.index;

      state.isVisible = payload.isVisible;
    },
  },
});

export const { reducer: viewImageReducer, actions: viewImageActions } =
  viewImageSlice;
