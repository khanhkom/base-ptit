import { createDeepEqualSelector } from '@common';
import { RootState } from '@store/all-reducers';

export const showImageConfig = createDeepEqualSelector(
  (state: RootState) => state.viewImage,
  app => ({
    isVisible: app.isVisible,
    image: app.image,
    index: app.index,
  }),
);
