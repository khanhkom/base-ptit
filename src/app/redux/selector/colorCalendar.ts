import { createDeepEqualSelector } from '@common';
import { RootState } from '@store/all-reducers';

export const infomationUserConfig = createDeepEqualSelector(
  (state: RootState) => state.colorCalendar,
  app => ({
    colorCalendar: app.colorCalendar,
  }),
);
