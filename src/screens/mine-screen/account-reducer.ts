/* tslint:disable */
import { Dispatch } from "redux";
import fetch from "isomorphic-unfetch";
import { analytics } from "@/common/analytics";
import { Action } from "@/common/root-reducer";
import { AppState } from "@/common/store";
import { getEndpoint, headers } from "@/common/request";

const LOGOUT = "LOGOUT";

export function actionLogout(authToken: string): any {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: LOGOUT,
      payload: authToken,
    });
    try {
      await fetch(getEndpoint("logout"), {
        method: "GET",
        headers: {
          ...headers,
          authorization: `Bearer ${authToken}`,
        },
      });
      await analytics.track("logged_out", {});
      analytics.peopleDeleteUser();
    } catch (err) {
      // it is fine not to handle the server-side token invalidation
      console.log(`failed to request logout: ${err}`);
    }
  };
}

export function accountReducer(state: AppState, action: Action): AppState {
  let nextState = state;
  if (action.type === LOGOUT) {
    nextState = {
      ...state,
      base: {
        ...state.base,
        userId: undefined,
        authToken: undefined,
      },
    };
  }
  return nextState;
}
