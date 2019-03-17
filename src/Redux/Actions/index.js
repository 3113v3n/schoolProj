import * as actionTypes from "./action-types";
import {
  asyncRequest,
  loginRequest,
  postRequest
} from "../../services/requests";
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
    localStorage.clear();
    dispatch(setMyData(actionTypes.NOT_AUTHENTICATED));
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
    loginRequest("auth/login", data)
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
//////---------FETCH---------- REQUESTS--***////
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
export const fetchProjects = () => {
  return dispatch => {
    asyncRequest("projects.json")
      .then(responseJson => {
        const projects = responseJson.projects;
        dispatch(setMyData(actionTypes.FETCH_PROJECTS, projects));
      })
      .catch(e => {
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
        const myData = responseJson.Students; //Students
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

export const fetchDetail = () => {
  return dispatch => {
    asyncRequest("newAllocation.json")
      .then(responseJson => {
        const lecturers = responseJson.lecturers;
        const students = responseJson.students;
        dispatch(setMyData(actionTypes.FETCH_ALLOCATION_STUDENTS, students));
        dispatch(setMyData(actionTypes.FETCH_ALLOCATION_LECTURERS, lecturers));
      })
      .catch(error => {
        dispatch(fetchFailed());
      });
  };
};

///////------------POST---REQUESTS---------***///

export const addProject = data => {
  return dispatch => {
    postRequest("", data)
      .then(responseJson => {
        dispatch(setMyData(actionTypes.ADD_PROJECT, responseJson));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.PROJECT_ERROR));
      });
  };
};

export const addAllocation = data => {
  return dispatch => {
    postRequest("", data)
      .then(responseJson => {
        dispatch(setMyData(actionTypes.NEW_ALLOCATION, data));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.NEW_ALLOCATION_ERROR));
      });
  };
};

export const addSupervisor = data => {
  return dispatch => {
    postRequest("", data)
      .then(responseJson => {
        dispatch(setMyData(actionTypes.ADD_SUPERVISOR, responseJson));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.SUPERVISOR_ERROR));
      });
  };
};

export const addStudents = data => {
  return dispatch => {
    loginRequest("students/register", data)
      .then(dispatch(setMyData(actionTypes.ADD_STUDENTS, data)))
      .catch(error => {
        dispatch(setMyData(actionTypes.STUDENT_ERROR));
      });
  };
};

////-----**** EDIT DETAILS---****/////

export const editAllocations = data => {
  return dispatch => {
    postRequest("endPoint", data)
      .then(res => {
        dispatch(setMyData(actionTypes.EDIT_ALLOCATION_TABLE, res));
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.ALLOCATION_ERROR));
      });
  };
};
export const editStudents = data => {
  return dispatch => {
    postRequest("", data)
      .then(res => {
        dispatch(setMyData(actionTypes.EDIT_STUDENT_TABLE, res));
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.STUDENT_TABLE_ERROR));
      });
  };
};

export const editSupervisors = data => {
  return dispatch => {
    postRequest("endPoint", data)
      .then(res => {
        dispatch(setMyData(actionTypes.EDIT_SUPERVISOR_TABLE, res)); //TODO: Change res to responseJson incase of err
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.SUPERVISOR_TABLE_ERROR));
      });
  };
};

export const editAdminProfile = data => {
  return dispatch => {
    postRequest("endPoint", data)
      .then(responseJson => {
        dispatch(setMyData(actionTypes.UPDATE_ADMIN_PROFILE, responseJson));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.ADMIN_PROFILE_ERROR));
      });
  };
};

export const editSupervisorProfile = data => {
  return dispatch => {
    postRequest("endPoint", data)
      .then(responseJson => {
        dispatch(
          setMyData(actionTypes.UPDATE_SUPERVISOR_PROFILE, responseJson)
        );
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.SUPERVISOR_PROFILE_ERROR, error));
      });
  };
};

export const editProgress = data => {
  return dispatch => {
    postRequest("myPath", data)
      .then(responseJson => {
        dispatch(setMyData(actionTypes.EDIT_PROGRESS, responseJson));
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.PROGRESS_ERROR));
      });
  };
};
