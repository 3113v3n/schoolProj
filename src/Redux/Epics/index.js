import * as actionTypes from "../Actions/action-types";
import {
  catchError,
  ignoreElements,
  map,
  switchMap
} from "rxjs/operators/index";
import { ofType } from "redux-observable";
import { refreshFailed, tokenRefreshed } from "../Actions";
import { from } from "rxjs";

const API = "http://localhost:5000/";

const refreshToken = localStorage.getItem("refresh_Token");

export const refreshAttempt = action$ =>
  action$.pipe(
    ofType(actionTypes.REFRESH_ATTEMPT),
    switchMap(() =>
      from(
        fetch(`${API}auth/refresh`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`
          }
        }).then(response => {
          if (response.ok) return response.json();
          return ignoreElements();
        })
      )
    ),
    map(tokenRefreshed),
    catchError(refreshFailed)
  );
