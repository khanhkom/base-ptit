import { createDeepEqualSelector } from '@common';
import { RootState } from '@store/all-reducers';

export const infomationUserConfig = createDeepEqualSelector(
  (state: RootState) => state.infoUserTCNS,
  app => ({
    infoUserTCNS: app.infoUserTCNS,
  }),
);
