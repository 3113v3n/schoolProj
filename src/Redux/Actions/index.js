import * as actionTypes from "./action-types";
import { asyncRequest } from "../../services/requests";

export function addStudents(payload) {
  return { type: actionTypes.ADD_STUDENTS, payload };
}

export function addSupervisor(payload) {
  return { type: actionTypes.ADD_SUPERVISOR, payload };
}

export function addProject(payload) {
  return { type: actionTypes.ADD_PROJECT, payload };
}
export const newUserSuccess = (id, userDetails) => {
  return {
    type: actionTypes.NEW_USER_SUCCESS,
    UserId: id,
    userDetails: userDetails
  };
};

export const newUserFailuer = error => {
  return {
    type: actionTypes.NEW_USER_FAILURE,
    error: error
  };
};
export const newUser = userDetails => {
  return {
    type: actionTypes.NEW_USER,
    userDetails: userDetails
  };
};

export const deleteUser = userId => {
  return {
    type: actionTypes.DELETE_USER,
    userId: userId
  };
};
export const setData = data => {
  return {
    type: actionTypes.SET_DATA,
    data: data
  };
};
export const fetchFailed = () => {
  return {
    type: actionTypes.FETCHING_FAILED
  };
};
export const fetchData = () => {
  return dispatch => {
    asyncRequest("allocations.json")
      .then(responseJson => {
        const myData = responseJson.Allocations;
        dispatch(setData(myData));
      })
      .catch(error => {
        dispatch(fetchFailed());
      });
  };
};
