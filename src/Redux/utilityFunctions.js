import axios from "axios";
import { setAuthorizationToken } from "../services/requests";
import jwtDecode from "jwt-decode";
import * as actionTypes from "./Actions/action-types";
import { setMyData, userRegistrationFailed } from "./Actions";

export const updateProgress = (oldProgress, updatedProgress) => {
  return {
    ...oldProgress,
    ...updatedProgress
  };
};
export const postRequest = data => {
  return dispatch => {
    return axios
      .post("192.168.0.32:5000/test", data)
      .then(res => {
        const role = res.data.role;
        const token = res.data.token;
        localStorage.setItem("jwtToken", token);
        setAuthorizationToken(token);
        const myToken = jwtDecode(token);
        dispatch(setMyData(actionTypes.SET_ROLE, role)); //set User Role
        dispatch(setMyData(actionTypes.SET_CURRENT_USER, myToken));
      })
      .catch(error => {
        dispatch(userRegistrationFailed());
      });
  };
};