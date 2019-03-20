import * as actionTypes from "./action-types";
import {
  asyncRequest,
  fetchRequest,
  loginRequest,
  postRequest,
  updateRequest,
  deleteRequest
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
    fetchRequest("allocations")
      .then(responseJson => {
        dispatch(setMyData(actionTypes.SET_DATA, responseJson));
      })
      .catch(error => {
        dispatch(fetchFailed());
      });
  };
};
export const fetchProjects = () => {
  return dispatch => {
    fetchRequest("projects")
      .then(responseJson => {
        const data = responseJson.projects;
        dispatch(setMyData(actionTypes.FETCH_PROJECTS, data));
      })
      .catch(e => {
        dispatch(fetchFailed());
      });
  };
};
export const fetchSupervisors = () => {
  return dispatch => {
    // asyncRequest("supervisor.json")
    fetchRequest("lecturers/all")
      .then(responseJson => {
        dispatch(setMyData(actionTypes.SET_SUPERVISOR_TABLE, responseJson));
      })
      .catch(error => {
        dispatch(fetchFailed());
      });
  };
};

export const fetchAllocationCount = () => {
  return dispatch => {
    fetchRequest("END POINT")
      .then(responseJson => {
        dispatch(setMyData(actionTypes.STUDENT_COUNT, responseJson));
      })
      .catch(error => {
        dispatch(fetchFailed());
      });
  };
};

export const fetchSupervisorCount = () => {
  return dispatch => {
    fetchRequest("END POINT")
      .then(responseJson => {
        dispatch(setMyData(actionTypes.SUPERVISOR_COUNT, responseJson));
      })
      .catch(error => {
        dispatch(fetchFailed());
      });
  };
};

export const fetchOneTrimester = () => {
  return dispatch => {
    // asyncRequest("supervisor.json")
    fetchRequest("lecturers/all")
      .then(responseJson => {
        dispatch(setMyData(actionTypes.ONE_TRIMESTER_STUDENTS, responseJson));
      })
      .catch(error => {
        dispatch(fetchFailed());
      });
  };
};

export const fetchTwoTrimester = () => {
  return dispatch => {
    // asyncRequest("supervisor.json")
    fetchRequest("lecturers/all")
      .then(responseJson => {
        dispatch(setMyData(actionTypes.TWO_TRIMESTER_STUDENTS, responseJson));
      })
      .catch(error => {
        dispatch(fetchFailed());
      });
  };
};

export const adminStudents = () => {
  return dispatch => {
    fetchRequest("students/all")
      .then(responseJson => {
        //Students
        dispatch(setMyData(actionTypes.SET_STUDENTS_TABLE, responseJson));
      })
      .catch(error => {
        dispatch(fetchFailed());
      });
  };
};
export const allocationStudents = () => {
  return dispatch => {
    fetchRequest("students/all")
      .then(responseJson => {
        //Students
        dispatch(
          setMyData(actionTypes.FETCH_ALLOCATION_STUDENTS, responseJson)
        );
      })
      .catch(error => {
        dispatch(fetchFailed());
      });
  };
};
export const allocationSupervisors = () => {
  return dispatch => {
    fetchRequest("students/all")
      .then(responseJson => {
        //Students
        dispatch(
          setMyData(actionTypes.FETCH_ALLOCATION_LECTURERS, responseJson)
        );
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

///////------------POST---REQUESTS---------***///
export const uploadFile = data => {
  return dispatch => {
    fetchRequest("UPLOAD-FILE", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(setMyData(actionTypes.UPLOAD_SUCCESS));
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.UPLOAD_FAILURE));
      });
  };
};
export const addProject = data => {
  return dispatch => {
    postRequest("projects", data)
      .then(responseJson => {
        dispatch(setMyData(actionTypes.ADD_PROJECT, data));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.PROJECT_ERROR));
      });
  };
};

export const addAllocation = data => {
  return dispatch => {
    postRequest("allocations", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(setMyData(actionTypes.NEW_ALLOCATION, data));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.NEW_ALLOCATION_ERROR));
      });
  };
};

export const addSupervisor = data => {
  return dispatch => {
    postRequest("auth/register", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(setMyData(actionTypes.ADD_SUPERVISOR, data));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.SUPERVISOR_ERROR));
      });
  };
};

export const addStudents = data => {
  return dispatch => {
    loginRequest("students/register", data)
      .then(
        dispatch(responseJson => {
          const status = responseJson.status;
          dispatch(setMyData(actionTypes.SET_STATUS, status));
          setMyData(actionTypes.ADD_STUDENTS, data);
        })
      )
      .catch(error => {
        dispatch(setMyData(actionTypes.STUDENT_ERROR));
      });
  };
};

////-----**** EDIT DETAILS---****/////

export const editAllocations = data => {
  return dispatch => {
    updateRequest("endPoint", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(setMyData(actionTypes.EDIT_ALLOCATION_TABLE, data));
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.ALLOCATION_ERROR));
      });
  };
};
export const editStudents = data => {
  return dispatch => {
    updateRequest("", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(setMyData(actionTypes.EDIT_STUDENT_TABLE, data));
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.STUDENT_TABLE_ERROR));
      });
  };
};

export const editSupervisors = data => {
  return dispatch => {
    updateRequest("endPoint", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(setMyData(actionTypes.EDIT_SUPERVISOR_TABLE, data));
      })

      .catch(e => {
        dispatch(setMyData(actionTypes.SUPERVISOR_TABLE_ERROR));
      });
  };
};

export const editAdminProfile = data => {
  return dispatch => {
    updateRequest("endPoint", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(setMyData(actionTypes.UPDATE_ADMIN_PROFILE, data));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.ADMIN_PROFILE_ERROR));
      });
  };
};

export const editSupervisorProfile = data => {
  return dispatch => {
    updateRequest("endPoint", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(setMyData(actionTypes.UPDATE_SUPERVISOR_PROFILE, data));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.SUPERVISOR_PROFILE_ERROR, error));
      });
  };
};

export const editProgress = data => {
  return dispatch => {
    updateRequest("myPath", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(setMyData(actionTypes.EDIT_PROGRESS, data));
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.PROGRESS_ERROR));
      });
  };
};
/////////------------DELETE-------------------/////

export const deleteAllocation = data => {
  return dispatch => {
    deleteRequest("END-POINT", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(setMyData(actionTypes.DELETE_ALLOCATION));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.DELETE_ERROR));
      });
  };
};

export const deleteStudents = data => {
  return dispatch => {
    deleteRequest("END-POINT", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(setMyData(actionTypes.DELETE_STUDENT));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.DELETE_ERROR));
      });
  };
};

export const deleteSupervisors = data => {
  return dispatch => {
    deleteRequest("END-POINT", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(setMyData(actionTypes.DELETE_SUPERVISOR));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.DELETE_ERROR));
      });
  };
};
