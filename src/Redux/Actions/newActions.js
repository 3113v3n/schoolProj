import * as actions from "./action-types";
import { CALL_API } from "../middleware";

export const attemptTokenRefresh = () => ({
  [CALL_API]: {
    endpoint: "auth/refresh",
    method: "POST",
    types: [
      actions.TOKEN_REFRESH_REQUEST,
      actions.TOKEN_REFRESH_SUCCESS,
      actions.TOKEN_REFRESH_FAILURE
    ]
  }
});

export const dashboardCount = () => ({
  [CALL_API]: {
    endpoint: "dashboard/count",
    method: "GET",
    types: [actions.COUNT_REQUEST, actions.COUNT_SUCCESS, actions.COUNT_FAILURE]
  }
});

export const getAllocations = () => ({
  [CALL_API]: {
    endpoint: "allocations",
    method: "GET",
    type: [actions.USERS_REQUEST, actions.USERS_SUCCESS, actions.USERS_FAILURE]
  }
});

export const login = (id, password) => ({
  [CALL_API]: {
    endpoint: "auth/login",
    method: "POST",
    body: {
      supervisor_id: id,
      password: password
    },
    types: [actions.LOGIN_REQUEST, actions.LOGIN_SUCCESS, actions.LOGIN_FAILURE]
  }
});

export const logout = () => ({
  [CALL_API]: {
    types: [
      actions.LOGOUT_REQUEST,
      actions.LOGOUT_SUCCESS,
      actions.LOGOUT_FAILURE
    ]
  }
});
