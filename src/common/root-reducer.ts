import deepExtend from "deep-extend";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { accountReducer } from "@/screens/mine-screen/account-reducer";
import { AppState } from "@/common/store";

const UPDATE_REDUX_STATE = "UPDATE_REDUX_STATE";

const INITIAL_STATE: AppState = {
  base: {},
};

export interface Action {
  type: string;
  payload?: any;
}

export const reducer = (state = INITIAL_STATE, action: Action) => {
  if (action.type === UPDATE_REDUX_STATE) {
    return deepExtend({}, state, action.payload);
  }
  return accountReducer(state, action);
};

export const actionUpdateReduxState = (payload: any) => ({
  type: UPDATE_REDUX_STATE,
  payload,
});

const persistConfig = {
  key: "root",
  storage,
};

export const persistedReducer = persistReducer(persistConfig, reducer);
