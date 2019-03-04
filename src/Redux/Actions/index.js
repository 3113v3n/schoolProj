import * as actionTypes from "./action-types";
import { asyncRequest } from "../../services/requests";

export function addStudents(studentDetails) {
  return { type: actionTypes.ADD_STUDENTS, studentDetails: studentDetails };
}

export function addSupervisor(supervisorDetails) {
  return {
    type: actionTypes.ADD_SUPERVISOR,
    supervisorDetails: supervisorDetails
  };
}

export function addProject(projectDetails) {
  return { type: actionTypes.ADD_PROJECT, projectDetails: projectDetails };
}
export const newUserSuccess = (id, userDetails) => {
  return {
    type: actionTypes.NEW_USER_SUCCESS,
    UserId: id,
    userDetails: userDetails
  };
};

export const updateAdminProfile = adminDetails => {
  return {
    type: actionTypes.UPDATE_ADMIN_PROFILE,
    adminDetails: adminDetails
  };
};

export const supervisorProfile = supervisorDetails => {
  return {
    type: actionTypes.UPDATE_ADMIN_PROFILE,
    supervisorDetails: supervisorDetails
  };
};

export const progressReport = progressDetails => {
  return {
    type: actionTypes.EDIT_PROGRESS,
    progressDetails: progressDetails
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
export const setMyData = data => {
  return {
    type: actionTypes.SET_MY_DATA,
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
export const fetchSupervisors = () => {
  return dispatch => {
    asyncRequest("supervisor.json")
      .then(responseJson => {
        const myData = responseJson.supervisors;
        dispatch(setData(myData));
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
        dispatch(setData(myData));
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
        dispatch(setMyData(myData));
      })
      .catch(error => {
        dispatch(fetchFailed());
      });
  };
};
