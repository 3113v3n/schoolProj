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
export const fetchFailed = data => {
  return {
    type: actionTypes.FETCHING_FAILED,
    data: data
  };
};
export const userRegistrationFailed = data => {
  return {
    type: actionTypes.NEW_USER_FAILURE,
    data: data
  };
};

export const LogMeIn = data => {
  return dispatch => {
    loginRequest("auth/login", data)
      .then(responseJson => {
        localStorage.setItem("access_Token", responseJson.access_token);
        localStorage.setItem("refresh_Token", responseJson.refresh_token);
        localStorage.setItem("role", responseJson.role);
        dispatch(setMyData(actionTypes.SET_ROLE, responseJson.role));
        dispatch(setMyData(actionTypes.STATUS, responseJson.status));

        dispatch(
          setMyData(
            actionTypes.SET_CURRENT_USER,
            jwtDecode(responseJson.access_token)
          )
        );
        dispatch(storeToken(responseJson.access_token));
        dispatch(
          setMyData(actionTypes.REFRESH_TOKEN, responseJson.refresh_token)
        );
      })
      .catch(error => {
        dispatch(userRegistrationFailed(error.message));
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
        dispatch(fetchFailed(error.message));
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
        dispatch(fetchFailed(e.message));
      });
  };
};
export const fetchSupervisors = () => {
  return dispatch => {
    fetchRequest("lecturers")
      .then(responseJson => {
        dispatch(setMyData(actionTypes.SET_SUPERVISOR_TABLE, responseJson));
      })
      .catch(error => {
        dispatch(fetchFailed(error.message));
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
        dispatch(fetchFailed(error.message));
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
        dispatch(fetchFailed(error.message));
      });
  };
};

export const fetchDegreeStudents = () => {
  return dispatch => {
    // asyncRequest("supervisor.json")
    fetchRequest("lecturers")
      .then(responseJson => {
        dispatch(setMyData(actionTypes.DEGREE_STUDENTS, responseJson));
      })
      .catch(error => {
        dispatch(fetchFailed(error.message));
      });
  };
};

export const fetchDiplomaStudents = () => {
  return dispatch => {
    // asyncRequest("supervisor.json")
    fetchRequest("lecturers")
      .then(responseJson => {
        dispatch(setMyData(actionTypes.DIPLOMA_STUDENTS, responseJson));
      })
      .catch(error => {
        dispatch(fetchFailed(error.message));
      });
  };
};

export const adminStudents = () => {
  return dispatch => {
    fetchRequest("students")
      .then(responseJson => {
        //Students
        dispatch(setMyData(actionTypes.SET_STUDENTS_TABLE, responseJson));
      })
      .catch(error => {
        dispatch(fetchFailed(error.message));
      });
  };
};
export const allocationStudents = () => {
  return dispatch => {
    fetchRequest("students")
      .then(responseJson => {
        //Students
        dispatch(
          setMyData(actionTypes.FETCH_ALLOCATION_STUDENTS, responseJson)
        );
      })
      .catch(error => {
        dispatch(fetchFailed(error.message));
      });
  };
};
export const allocationSupervisors = () => {
  return dispatch => {
    fetchRequest("lecturers")
      .then(responseJson => {
        //Students
        dispatch(
          setMyData(actionTypes.FETCH_ALLOCATION_LECTURERS, responseJson)
        );
      })
      .catch(error => {
        dispatch(fetchFailed(error.message));
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
        dispatch(fetchFailed(error.message));
      });
  };
};

///////------------POST---REQUESTS---------***///
export const uploadFile = data => {
  //TODO: issue
  return dispatch => {
    fetchRequest("students/register", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(setMyData(actionTypes.UPLOAD_SUCCESS));
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.UPLOAD_FAILURE, e.message));
      });
  };
};
export const addProject = data => {
  return dispatch => {
    postRequest("projects", data)
      .then(responseJson => {
        dispatch(setMyData(actionTypes.ADD_PROJECT, data));
        dispatch(setMyData(actionTypes.SUCCESS_MESSAGE, responseJson.message));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.PROJECT_ERROR, error.message));
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
        dispatch(setMyData(actionTypes.SUCCESS_MESSAGE, responseJson.message));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.NEW_ALLOCATION_ERROR, error.message));
      });
  };
};

export const addSupervisor = data => {
  return dispatch => {
    postRequest("auth/register", data)
      .then(responseJson => {
        dispatch(setMyData(actionTypes.ADD_SUPERVISOR, data));
        dispatch(setMyData(actionTypes.SUCCESS_MESSAGE, responseJson.message));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.SUPERVISOR_ERROR, error.error));
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
          dispatch(
            setMyData(actionTypes.SUCCESS_MESSAGE, responseJson.message)
          );
          setMyData(actionTypes.ADD_STUDENTS, data);
        })
      )
      .catch(error => {
        dispatch(setMyData(actionTypes.STUDENT_ERROR, error.message));
      });
  };
};

////-----**** EDIT DETAILS---****/////

export const editAllocations = data => {
  return dispatch => {
    updateRequest("allocations", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SUCCESS_MESSAGE, responseJson.message));
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(setMyData(actionTypes.EDIT_ALLOCATION_TABLE, data));
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.ALLOCATION_ERROR, e.message));
      });
  };
};
export const editStudents = data => {
  return dispatch => {
    updateRequest("students", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(setMyData(actionTypes.EDIT_STUDENT_TABLE, data));
        dispatch(setMyData(actionTypes.SUCCESS_MESSAGE, responseJson.message));
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.STUDENT_TABLE_ERROR, e.message));
      });
  };
};

export const editSupervisors = data => {
  return dispatch => {
    updateRequest("lecturers", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(setMyData(actionTypes.EDIT_SUPERVISOR_TABLE, data));
        dispatch(setMyData(actionTypes.SUCCESS_MESSAGE, responseJson.message));
      })

      .catch(e => {
        dispatch(setMyData(actionTypes.SUPERVISOR_TABLE_ERROR, e.message));
      });
  };
};

export const editAdminProfile = data => {
  return dispatch => {
    updateRequest("endPoint", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(setMyData(actionTypes.CHANGE_ADMIN_PASSWORD, data));
        dispatch(setMyData(actionTypes.SUCCESS_MESSAGE, responseJson.message));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.ADMIN_PASS_ERROR, error.message));
      });
  };
};

export const editSupervisorProfile = data => {
  return dispatch => {
    updateRequest("endPoint", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(setMyData(actionTypes.CHANGE_SUPERVISOR_PASSWORD, data));
        dispatch(setMyData(actionTypes.SUCCESS_MESSAGE, responseJson.message));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.SUPERVISOR_PASS_ERROR, error.message));
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
        dispatch(setMyData(actionTypes.SUCCESS_MESSAGE, responseJson.message));
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.PROGRESS_ERROR, e.message));
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
        dispatch(setMyData(actionTypes.SUCCESS_MESSAGE, responseJson.message));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.DELETE_ERROR, error.message));
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
        dispatch(setMyData(actionTypes.SUCCESS_MESSAGE, responseJson.message));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.DELETE_ERROR, error.message));
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
        dispatch(setMyData(actionTypes.SUCCESS_MESSAGE, responseJson.message));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.DELETE_ERROR, error.message));
      });
  };
};
