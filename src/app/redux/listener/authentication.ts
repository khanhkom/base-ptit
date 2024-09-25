import { validResponse } from '@common';
import { takeLatestListeners } from '@listener';
import { ApiConstants, NetWorkService } from '@networking';

import { authenticationActions } from '../action-slice/authentication';

takeLatestListeners(true)({
  actionCreator: authenticationActions.login,
  effect: async (action, listenerApi) => {
    const { body } = action.payload;

    await listenerApi.delay(1000);

    const response = await NetWorkService.Get({
      url: 'https://gorest.co.in/public/v2/users',
      // body,
    });

    if (!response) {
      return;
    }

    if (validResponse(response)) {
      // TODO: do something when login success
    }
  },
});
