import { ActionReducerMap } from '@ngrx/store';

import * as fromUser from '../user/store/user.reducer';

export interface AppState {
  auth: fromUser.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromUser.userReducer};