import * as actionTypes from "./action-types";
import { asyncRequest } from "../../services/requests";
import axios from "axios";
import { setAuthorizationToken } from "../../services/requests";
import jwt from "jsonwebtoken";
//Work for all submission type is a parameter
export const setMyData = (type, data) => {
  return {
    type: type,
    data: data
  };
};
export const fetchFailed = () => {
  return {
    type: actionTypes.FETCHING_FAILED
  };
};
export const AddNewUser = data => {
  return dispatch => {
    return axios
      .post("/192.168.0.162:5000/test", data)
      .then(res => {
        const token = res.data.token;
        localStorage.setItem("jwtToken", token);
        setAuthorizationToken(token);
        const myToken = jwt.decode(token);
        dispatch(setMyData(actionTypes.SET_CURRENT_USER, myToken));
      })
      .catch(error => {
        dispatch(fetchFailed());
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
