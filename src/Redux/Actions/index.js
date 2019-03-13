import * as actionTypes from "./action-types";
import { asyncRequest, postRequest } from "../../services/requests";
//import { setAuthorizationToken } from "../../services/requests";
import jwtDecode from "jwt-decode";

//Work for all submission type is a parameter

export const setMyData = (type, data) => {
  return {
    type: type,
    data: data
  };
};
export const logMeout = () => {
  return dispatch => {
    //localStorage.removeItem("access_token");
    //localStorage.removeItem("refresh_token");
    localStorage.clear();
    dispatch(setMyData(actionTypes.NOT_AUTHENTICATED));
  };
};
//FLASH MESSAGE
export const addFlashMessage = message => {
  return {
    type: actionTypes.ADD_FLASH_MESSAGE,
    message
  };
};
export const editTable = (type, data) => {
  return {
    type: type,
    data: data
  };
};
export const storeToken = data => {
  return {
    type: actionTypes.STORE_TOKEN,
    token: data
  };
};
export const fetchFailed = () => {
  return {
    type: actionTypes.FETCHING_FAILED
  };
};
export const userRegistrationFailed = () => {
  return {
    type: actionTypes.NEW_USER_FAILURE
  };
};
export const failure = () => {
  return {
    type: actionTypes.FETCHING_FAILED
  };
};

export const LogMeIn = data => {
  return dispatch => {
    postRequest("auth/login", data)
      .then(responseJson => {
        const token = responseJson.access_token;
        const refreshToken = responseJson.refresh_token;
        const myToken = jwtDecode(token);
        const status = responseJson.status;
        localStorage.setItem("access_Token", token);
        localStorage.setItem("refresh_Token", refreshToken);

        dispatch(setMyData(actionTypes.STATUS, status));
        dispatch(setMyData(actionTypes.SET_CURRENT_USER, myToken));
        dispatch(storeToken(token));
        dispatch(setMyData(actionTypes.AUTHENTICATED));
        dispatch(setMyData(actionTypes.REFRESH_TOKEN, refreshToken));
      })
      .catch(error => {
        dispatch(userRegistrationFailed());
      });
  };
};

export const fetchData = () => {
  return dispatch => {
    asyncRequest("allocations.json")
      .then(responseJson => {
        const myData = responseJson.Allocations;
        dispatch(setMyData(actionTypes.SET_DATA, myData));
      })
      .catch(error => {
        dispatch(fetchFailed());
      });
  };
};
export const fetchUser = () => {
  return dispatch => {
    asyncRequest("allocations.json")
      .then(responseJson => {
        const myData = responseJson.Allocations;
        dispatch(setMyData(actionTypes.GET_USER, myData));
      })
      .catch(error => {
        dispatch(fetchFailed());
      });
  };
};
export const fetchSupervisors = () => {
  return dispatch => {
    asyncRequest("supervisor.json")
      .then(responseJson => {
        const myData = responseJson.supervisors;
        dispatch(setMyData(actionTypes.SET_DATA, myData));
      })
      .catch(error => {
        dispatch(fetchFailed());
      });
  };
};
export const adminStudents = () => {
  return dispatch => {
    asyncRequest("students.json")
      .then(responseJson => {
        const myData = responseJson.Students;
        dispatch(setMyData(actionTypes.SET_DATA, myData));
      })
      .catch(error => {
        dispatch(fetchFailed());
      });
  };
};
export const supervisorStudents = () => {
  return dispatch => {
    asyncRequest("allocations2.json")
      .then(responseJson => {
        const myData = responseJson.Allocations;
        dispatch(setMyData(actionTypes.SET_MY_DATA, myData));
      })
      .catch(error => {
        dispatch(fetchFailed());
      });
  };
};
