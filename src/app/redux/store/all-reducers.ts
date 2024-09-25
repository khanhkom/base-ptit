import { appReducer, authenticationReducer, popupReducer } from '@redux-slice';
import { combineReducers } from '@reduxjs/toolkit';
import { colorCalendarReducer } from '../action-slice/colorCalendar';

import { infoUserTCNSReducer } from '../action-slice/infoUserTCNS';
import { viewImageReducer } from '../action-slice/viewImage';

export const allReducer = combineReducers({
  app: appReducer,
  authentication: authenticationReducer,
  popup: popupReducer,
  viewImage: viewImageReducer,
  infoUserTCNS: infoUserTCNSReducer,
  colorCalendar: colorCalendarReducer,
});

export type RootState = ReturnType<typeof allReducer>;
