import * as actionTypes from "./action-types";
import {
  fetchRequest,
  loginRequest,
  postRequest,
  updateRequest,
  deleteRequest,
  uploadFiles
} from "../../services/requests";
import { login, logout, dashboardCount, getAllocations } from "./newActions";
import { setAccessToken } from "redux-refresh-token";
//import jwtDecode from "jwt-decode";

//Work for all submission type is a parameter

export const setMyData = (type, data) => {
  return {
    type: type,
    data: data
  };
};

export const logMeout = () => {
  return dispatch => {
    dispatch(logout());
    localStorage.clear();
    dispatch(setMyData(actionTypes.LOGOUT));
    dispatch(setMyData(actionTypes.NOT_AUTHENTICATED));
  };
};
export const editTable = (type, data) => {
  return {
    type: type,
    data: data
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
export const LoggedIn = (id, pass) => {
  return dispatch => {
    dispatch(login(id, pass))
      .then(res => {
        if (res.payload.status === "success") {
          dispatch(setAccessToken(res.payload));
          localStorage.setItem("role", res.payload.role);
          localStorage.setItem("isAuthenticated", JSON.stringify(true));
          dispatch(setMyData(actionTypes.SET_CURRENT_USER, res.payload));
        } else {
          dispatch(userRegistrationFailed(res.payload));
        }
      })
      .catch(error => dispatch(userRegistrationFailed(error.message)));
  };
};

//////---------FETCH---------- REQUESTS--***////
export const fetchData = () => {
  return dispatch => {
    dispatch(getAllocations())
      .then(res => {
        console.log("allocations ==>", res.payload);
        dispatch(setMyData(actionTypes.SET_DATA, res.payload));
      })
      .catch(err => {
        dispatch(fetchFailed(err.message));
      });
    // fetchRequest("allocations")
    //   .then(responseJson => {
    //     dispatch(setMyData(actionTypes.SET_DATA, responseJson));
    //   })
    //   .catch(error => {
    //     dispatch(fetchFailed(error.message));
    //   });
  };
};
export const fetchArchives = () => {
  return dispatch => {
    fetchRequest("archives")
      .then(responseJson => {
        dispatch(setMyData(actionTypes.STATUS, responseJson.status));
        dispatch(setMyData(actionTypes.SUCCESS_MESSAGE, responseJson.message));
        dispatch(setMyData(actionTypes.FETCH_ARCHIVES, responseJson));
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
    fetchRequest("supervisor")
      .then(responseJson => {
        dispatch(setMyData(actionTypes.STATUS, responseJson.status));
        dispatch(setMyData(actionTypes.SUCCESS_MESSAGE, responseJson.message));
        dispatch(setMyData(actionTypes.SET_SUPERVISOR_TABLE, responseJson));
      })
      .catch(error => {
        dispatch(fetchFailed(error.message));
      });
  };
};

export const fetchDashboardCount = () => {
  return dispatch => {
    dispatch(dashboardCount())
      .then(res => {
        dispatch(setMyData(actionTypes.DASHBOARD_COUNT, res.payload));
      })
      .catch(error => dispatch(fetchFailed(error.payload)));
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

export const allocationRequirements = () => {
  return dispatch => {
    fetchRequest("allocations/new")
      .then(responseJson => {
        //Students
        dispatch(
          setMyData(
            actionTypes.FETCH_ALLOCATION_STUDENTS,
            responseJson.students
          )
        );
        dispatch(
          setMyData(
            actionTypes.FETCH_ALLOCATION_LECTURERS,
            responseJson.supervisors
          )
        );
      })
      .catch(error => {
        dispatch(fetchFailed(error.message));
      });
  };
};

export const supervisorStudents = () => {
  return dispatch => {
    fetchRequest("supervisor/dashboard")
      .then(responseJson => {
        dispatch(setMyData(actionTypes.SUPERVISOR_STATUS, responseJson.status));
        dispatch(setMyData(actionTypes.SUCCESS_MESSAGE, responseJson.message));
        dispatch(setMyData(actionTypes.SET_MY_DATA, responseJson));
      })
      .catch(() => {
        dispatch(fetchFailed());
      });
  };
};
export const fetchProgress = data => {
  return dispatch => {
    fetchRequest(`progress/${data}`)
      .then(responseJson => {
        dispatch(setMyData(actionTypes.SUPERVISOR_STATUS, responseJson.status));
        dispatch(setMyData(actionTypes.SUCCESS_MESSAGE, responseJson.message));
        dispatch(setMyData(actionTypes.FETCH_PROGRESS, responseJson));
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
    uploadFiles("students/register/csv", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(setMyData(actionTypes.UPLOAD_SUCCESS, responseJson.message));
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
      .catch(() => {
        dispatch(setMyData(actionTypes.PROJECT_ERROR));
      });
  };
};
export const addProgress = data => {
  return dispatch => {
    postRequest("progress", data)
      .then(responseJson => {
        dispatch(setMyData(actionTypes.ADD_PROGRESS, responseJson.status));
        dispatch(setMyData(actionTypes.SUCCESS_MESSAGE, responseJson.message));
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.PROJECT_ERROR, e.message));
      });
  };
};

export const markComplete = data => {
  return dispatch => {
    postRequest("archives", data)
      .then(responseJson => {
        dispatch(setMyData(actionTypes.MARK_AS_COMPLETED));
        dispatch(setMyData(actionTypes.SUPERVISOR_STATUS, responseJson.status));
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.COMPLETE_ERROR, e.message));
      });
  };
};

export const addAllocation = data => {
  return dispatch => {
    postRequest("allocations", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(setMyData(actionTypes.SUCCESS_MESSAGE, responseJson.message));
        dispatch(setMyData(actionTypes.NEW_ALLOCATION, data));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.NEW_ALLOCATION_ERROR, error.message));
      });
  };
};

export const addSupervisor = data => {
  return dispatch => {
    postRequest("supervisor/register", data)
      .then(responseJson => {
        dispatch(setMyData(actionTypes.ADD_SUPERVISOR, responseJson));
        dispatch(setMyData(actionTypes.SET_STATUS, responseJson.status));
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
        dispatch(editTable(actionTypes.EDIT_ALLOCATION_TABLE, data));
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.ALLOCATION_ERROR, e.message));
      });
  };
};

export const editProjects = data => {
  return dispatch => {
    updateRequest("projects", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.PROJECT_MESSAGE, responseJson.message));
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(editTable(actionTypes.EDIT_PROJECT_TABLE, data));
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.PROJECT_EDIT_ERROR, e.message));
      });
  };
};
export const editStudents = data => {
  return dispatch => {
    updateRequest("students", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(editTable(actionTypes.EDIT_STUDENT_TABLE, data));
        dispatch(setMyData(actionTypes.SUCCESS_MESSAGE, responseJson.message));
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.STUDENT_TABLE_ERROR, e.message));
      });
  };
};

export const editSupervisors = data => {
  return dispatch => {
    updateRequest("supervisor/register", data)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(editTable(actionTypes.EDIT_SUPERVISOR_TABLE, data));
        dispatch(setMyData(actionTypes.SUCCESS_MESSAGE, responseJson.message));
      })

      .catch(e => {
        dispatch(setMyData(actionTypes.SUPERVISOR_TABLE_ERROR, e.message));
      });
  };
};

export const editAdminProfile = data => {
  return dispatch => {
    updateRequest("supervisor", data)
      .then(responseJson => {
        dispatch(setMyData(actionTypes.SET_STATUS, responseJson.status));
        dispatch(
          setMyData(actionTypes.CHANGE_ADMIN_PASSWORD, responseJson.message)
        );
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.ADMIN_PASS_ERROR, error.message));
        dispatch(setMyData(actionTypes.PROFILE_STATUS, error.status));
      });
  };
};

export const editSupervisorProfile = data => {
  return dispatch => {
    updateRequest("supervisor", data)
      .then(responseJson => {
        dispatch(setMyData(actionTypes.SUPERVISOR_STATUS, responseJson.status));
        dispatch(
          setMyData(
            actionTypes.CHANGE_SUPERVISOR_PASSWORD,
            responseJson.message
          )
        );
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.SUPERVISOR_PASS_ERROR, error.message));
      });
  };
};

export const editProgress = data => {
  return dispatch => {
    updateRequest("progress", data)
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

export const deleteStudents = data => {
  return dispatch => {
    deleteRequest(`students/${data}`)
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
    deleteRequest(`supervisor/${data}`)
      .then(responseJson => {
        const status = responseJson.status;
        dispatch(setMyData(actionTypes.SET_STATUS, status));
        dispatch(setMyData(actionTypes.SUCCESS_MESSAGE, responseJson.message));
        dispatch(setMyData(actionTypes.DELETE_SUPERVISOR));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.DELETE_ERROR, error.message));
      });
  };
};
