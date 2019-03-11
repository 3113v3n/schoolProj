import * as actionTypes from "./action-types";
import { asyncRequest } from "../../services/requests";
import axios from "axios";
import { setAuthorizationToken } from "../../services/requests";
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
    localStorage.removeItem("jwtToken");
    setAuthorizationToken(false);
    dispatch(setMyData(actionTypes.SET_CURRENT_USER, {}));
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
export const AddNewUser = data => {
  return dispatch => {
    return axios
      .post("192.168.0.32:5000/test", data)
      .then(res => {
        const role = res.data.role;
        const token = res.data.token;
        localStorage.setItem("jwtToken", token);
        setAuthorizationToken(token);
        const myToken = jwtDecode(token);
        dispatch(storeToken(token)); //store token
        dispatch(setMyData(actionTypes.SET_ROLE, role)); //set User Role
        dispatch(setMyData(actionTypes.SET_CURRENT_USER, myToken)); //user details
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
