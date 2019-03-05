import * as actionTypes from "./action-types";
import { asyncRequest } from "../../services/requests";
import { postRequest } from "../../services/requests";
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
export const AddNewUser = param => {
  return dispatch => {
    postRequest("allocations.json", param)
      .then(responseJson => {
        const data = responseJson;
        dispatch(setMyData(actionTypes.NEW_USER, data));
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
