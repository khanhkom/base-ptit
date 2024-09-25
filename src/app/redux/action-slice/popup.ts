import { SLICE_NAME } from '@config/type';
import { createSlice } from '@reduxjs/toolkit';

const initialAppState: {
  isVisible?: boolean;
  title?: string;
  content?: string;
  cancelTitle?: string;
  onCancelPressCallback?: () => void;
  onPress?: () => void;
  onPressCancel?: () => void;
  type?: boolean;
} = {
  isVisible: false,
  title: '',
  content: '',
  onPress: () => null,
  onPressCancel: () => null,
  onCancelPressCallback: () => null,
  cancelTitle: '',
  type: false,
};

const popupSlice = createSlice({
  name: SLICE_NAME.TEST,
  initialState: initialAppState,
  reducers: {
    setPopupOK: (
      state,
      {
        payload,
      }: {
        payload: {
          isVisible: boolean;
          title: string;
          content: string;
          onPress?: () => void;
          type?: boolean;
        };
      },
    ) => {
      state.title = payload.title;

      state.isVisible = payload.isVisible;

      state.content = payload.content;

      state.onPress = payload.onPress;

      state.type = payload.type;
    },
    setPopupCancel: (
      state,
      {
        payload,
      }: {
        payload: {
          isVisible: boolean;
          title: string;
          content: string;
          onPress?: () => void;
          onPressCancel?: () => void;
          onCancelPressCallback?: () => void;
          type?: boolean;
          cancelTitle?: string;
        };
      },
    ) => {
      state.title = payload.title;

      state.isVisible = payload.isVisible;

      state.content = payload.content;

      state.onPress = payload.onPress;

      state.onPressCancel = payload.onPressCancel;

      state.onCancelPressCallback = payload.onCancelPressCallback;

      state.cancelTitle = payload.cancelTitle;

      state.type = payload.type;
    },
  },
});

export const { reducer: popupReducer, actions: popupActions } = popupSlice;
