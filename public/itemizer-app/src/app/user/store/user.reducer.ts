import { User } from '../user.model';
import * as UserActions from './user.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function userReducer(
  state = initialState,
  action: UserActions.UserActions
) {
  switch (action.type) {
    case UserActions.AUTHENTICATE_SUCCESS: {
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token
        // action.payload.expirationDate
      );
      return {
        ...state,
        authError: null,
        user: user,
        loading: false,
      };
    }
    case UserActions.LOGOUT: {
      return {
        ...state,
        user: null,
      };
    }
    case UserActions.LOGIN_START: {
    }
    case UserActions.SIGNUP_START: {
      return {
        ...state,
        authError: null,
        loading: true,
      };
    }
    case UserActions.AUTHENTICATE_FAIL: {
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };
    }
    case UserActions.CLEAR_ERROR: {
      return {
        ...state,
        authError: null,
      };
    }
    default:
      return state;
  }
}
