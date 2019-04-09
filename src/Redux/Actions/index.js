import * as actionTypes from "./action-types";
import {
  login,
  logout,
  dashboardCount,
  getAllocations,
  getArchives,
  getProgress,
  getStudents,
  getAllocatedStudents,
  getProjects,
  getSupervisors,
  allocationRequirement,
  addNewAllocation,
  addNewStudent,
  addNewSupervisor,
  addNewProject,
  addNewProgress,
  completeProject,
  uploadStudentsFile,
  editAllocationTable,
  editProjectsTable,
  editStudentTable,
  editSupervisorTable,
  editAdminPassword,
  editSupervisorPassword,
  editProgressTable,
  deleteStudent,
  deleteSupervisor
} from "./newActions";
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
      .catch(error => dispatch(userRegistrationFailed(error.payload)));
  };
};

//////---------FETCH---------- REQUESTS--***////
export const fetchDashboardCount = () => {
  return dispatch => {
    dispatch(dashboardCount())
      .then(res => {
        dispatch(setMyData(actionTypes.DASHBOARD_COUNT, res.payload));
      })
      .catch(error => dispatch(fetchFailed(error.payload)));
  };
};

export const fetchData = () => {
  return dispatch => {
    dispatch(getAllocations())
      .then(res => {
        dispatch(setMyData(actionTypes.SET_DATA, res.payload));
      })
      .catch(err => dispatch(fetchFailed(err.payload)));
  };
};
export const fetchArchives = () => {
  return dispatch => {
    dispatch(getArchives())
      .then(res => {
        dispatch(setMyData(actionTypes.FETCH_ARCHIVES, res.payload));
      })
      .catch(error => dispatch(fetchFailed(error.payload)));
  };
};
export const fetchProjects = () => {
  return dispatch => {
    dispatch(getProjects())
      .then(res => {
        dispatch(setMyData(actionTypes.FETCH_PROJECTS, res.payload.projects));
      })
      .catch(error => dispatch(fetchFailed(error.payload)));
  };
};
export const fetchSupervisors = () => {
  return dispatch => {
    dispatch(getSupervisors())
      .then(res => {
        dispatch(setMyData(actionTypes.SET_SUPERVISOR_TABLE, res.payload));
      })
      .catch(error => fetchFailed(error.payload));
  };
};

export const adminStudents = () => {
  return dispatch => {
    dispatch(getStudents())
      .then(res => {
        dispatch(setMyData(actionTypes.SET_STUDENTS_TABLE, res.payload));
      })
      .catch(err => dispatch(fetchFailed(err.payload)));
  };
};

export const allocationRequirements = () => {
  return dispatch => {
    dispatch(allocationRequirement())
      .then(res => {
        dispatch(setMyData(actionTypes.ALLOCATIONS, res.payload));
      })
      .catch(error => dispatch(fetchFailed(error.payload)));
  };
};

export const supervisorStudents = () => {
  return dispatch => {
    dispatch(getAllocatedStudents())
      .then(res => {
        if(res.payload.status !== 404){
          dispatch(setMyData(actionTypes.SET_MY_DATA, res.payload));
        }
      })
      .catch(error => dispatch(fetchFailed(error.payload)));
  };
};
export const fetchProgress = data => {
  return dispatch => {
    dispatch(getProgress(data))
      .then(res => {
        dispatch(setMyData(actionTypes.FETCH_PROGRESS, res.payload));
      })
      .catch(error => dispatch(fetchFailed(error.payload)));
  };
};

///////------------POST---REQUESTS---------***///
export const uploadFile = data => {
  return dispatch => {
    dispatch(uploadStudentsFile(data))
      .then(responseJson => {
        dispatch(setMyData(actionTypes.UPLOAD_SUCCESS, responseJson.payload));
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.UPLOAD_FAILURE, e.payload));
      });
  };
};
export const addProject = data => {
  return dispatch => {
    dispatch(addNewProject(data))
      .then(res => {
        dispatch(setMyData(actionTypes.ADD_PROJECT, res.payload));
      })
      .catch(err => {
        dispatch(setMyData(actionTypes.PROJECT_ERROR, err.payload));
      });
  };
};
export const addProgress = data => {
  return dispatch => {
    dispatch(addNewProgress(data))
      .then(response => {
        dispatch(setMyData(actionTypes.ADD_PROGRESS, response.payload));
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.PROGRESS_ERROR, e.payload));
      });
  };
};

export const markComplete = data => {
  return dispatch => {
    dispatch(completeProject(data))
      .then(responseJson => {
        dispatch(
          setMyData(actionTypes.MARK_AS_COMPLETED, responseJson.payload)
        );
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.COMPLETE_ERROR, e.payload));
      });
  };
};

export const addAllocation = (all, adm, id) => {
  return dispatch => {
    dispatch(addNewAllocation(all, adm, id))
      .then(res => {
        dispatch(setMyData(actionTypes.NEW_ALLOCATION, res));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.NEW_ALLOCATION_ERROR, error.payload));
      });
  };
};

export const addSupervisor = data => {
  return dispatch => {
    dispatch(addNewSupervisor(data))
      .then(res => {
        dispatch(setMyData(actionTypes.ADD_SUPERVISOR, res.payload));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.SUPERVISOR_ERROR, error.payload));
      });
  };
};

export const addStudents = data => {
  return dispatch => {
    dispatch(addNewStudent(data))
      .then(res => {
        dispatch(setMyData(actionTypes.ADD_STUDENTS, res.payload));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.STUDENT_ERROR, error.payload));
      });
  };
};

////-----**** EDIT DETAILS---****/////

export const editAllocations = data => {
  return dispatch => {
    dispatch(editAllocationTable(data))
      .then(res => {
        dispatch(editTable(actionTypes.EDIT_ALLOCATION_TABLE, res.payload));
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.ALLOCATION_ERROR, e.payload));
      });
  };
};

export const editProjects = data => {
  return dispatch => {
    dispatch(editProjectsTable(data))
      .then(response => {
        dispatch(editTable(actionTypes.EDIT_PROJECT_TABLE, response.payload));
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.PROJECT_EDIT_ERROR, e.payload));
      });
  };
};
export const editStudents = data => {
  return dispatch => {
    dispatch(editStudentTable(data))
      .then(response => {
        dispatch(editTable(actionTypes.EDIT_STUDENT_TABLE, response.payload));
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.STUDENT_TABLE_ERROR, e.payload));
      });
  };
};

export const editSupervisors = data => {
  return dispatch => {
    dispatch(editSupervisorTable(data))
      .then(res => {
        dispatch(editTable(actionTypes.EDIT_SUPERVISOR_TABLE, res.payload));
      })

      .catch(e => {
        dispatch(setMyData(actionTypes.SUPERVISOR_TABLE_ERROR, e.payload));
      });
  };
};

export const editAdminProfile = data => {
  return dispatch => {
    dispatch(editAdminPassword(data))
      .then(responseJson => {
        dispatch(
          setMyData(actionTypes.CHANGE_ADMIN_PASSWORD, responseJson.payload)
        );
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.ADMIN_PASS_ERROR, error.payload));
      });
  };
};

export const editSupervisorProfile = data => {
  return dispatch => {
    dispatch(editSupervisorPassword(data))
      .then(responseJson => {
        dispatch(
          setMyData(
            actionTypes.CHANGE_SUPERVISOR_PASSWORD,
            responseJson.payload
          )
        );
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.SUPERVISOR_PASS_ERROR, error.payload));
      });
  };
};

export const editProgress = data => {
  return dispatch => {
    dispatch(editProgressTable(data))
      .then(response => {
        dispatch(setMyData(actionTypes.EDIT_PROGRESS, response.payload));
      })
      .catch(e => {
        dispatch(setMyData(actionTypes.PROGRESS_ERROR, e.payload));
      });
  };
};
/////////------------DELETE-------------------/////

export const deleteStudents = data => {
  return dispatch => {
    dispatch(deleteStudent(data))
      .then(responseJson => {
        dispatch(setMyData(actionTypes.DELETE_STUDENT, responseJson.payload));
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.DELETE_ERROR, error.payload));
      });
  };
};

export const deleteSupervisors = data => {
  return dispatch => {
    dispatch(deleteSupervisor(data))
      .then(responseJson => {
        dispatch(
          setMyData(actionTypes.DELETE_SUPERVISOR, responseJson.payload)
        );
      })
      .catch(error => {
        dispatch(setMyData(actionTypes.DELETE_ERROR, error.payload));
      });
  };
};
