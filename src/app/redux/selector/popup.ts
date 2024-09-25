import { createDeepEqualSelector } from '@common';
import { RootState } from '@store/all-reducers';

export const popupConfig = createDeepEqualSelector(
  (state: RootState) => state.popup,
  app => ({
    isVisible: app.isVisible,
    title: app.title,
    content: app.content,
    onPress: app.onPress,
    onPressCancel: app.onPressCancel,
    onCancelPressCallback: app.onCancelPressCallback,
    cancelTitle: app.cancelTitle,
    type: app.type,
  }),
);
