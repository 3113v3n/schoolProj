import * as actions from "./action-types";
import { CALL_API } from "../middleware";

export const attemptTokenRefresh = () => ({
  [CALL_API]: {
    endpoint: "auth/refresh",
    method: "POST",
    types: [
      actions.TOKEN_REFRESH_REQUEST,
      actions.TOKEN_REFRESH_SUCCESS,
      actions.TOKEN_REFRESH_FAILURE
    ]
  }
});
//---------------------FETCH REQUESTS----------------///////
export const dashboardCount = () => ({
  [CALL_API]: {
    endpoint: "dashboard/count",
    method: "GET",
    types: [actions.COUNT_REQUEST, actions.COUNT_SUCCESS, actions.COUNT_FAILURE]
  }
});

export const getAllocations = () => ({
  [CALL_API]: {
    endpoint: "allocations",
    method: "GET",
    types: [
      actions.FETCH_ALLOCATION_REQUEST,
      actions.FETCH_ALLOCATION_SUCCESS,
      actions.FETCH_ALLOCATION_FAILURE
    ]
  }
});
export const getStudents = () => ({
  [CALL_API]: {
    endpoint: "students",
    method: "GET",
    types: [actions.USERS_REQUEST, actions.USERS_SUCCESS, actions.USERS_FAILURE]
  }
});
export const getSupervisors = () => ({
  [CALL_API]: {
    endpoint: "supervisor",
    method: "GET",
    types: [
      actions.SUPERVISORS_REQUEST,
      actions.SUPERVISORS_SUCCESS,
      actions.SUPERVISORS_FAILURE
    ]
  }
});
export const getProjects = () => ({
  [CALL_API]: {
    endpoint: "projects",
    method: "GET",
    types: [
      actions.PROJECT_REQUEST,
      actions.PROJECT_SUCCESS,
      actions.PROJECT_FAILURE
    ]
  }
});
export const getArchives = () => ({
  [CALL_API]: {
    endpoint: "archives",
    method: "GET",
    types: [
      actions.ARCHIVES_REQUEST,
      actions.ARCHIVES_SUCCESS,
      actions.ARCHIVES_FAILURE
    ]
  }
});
export const getAllocatedStudents = () => ({
  [CALL_API]: {
    endpoint: "supervisor/dashboard",
    method: "GET",
    types: [
      actions.ALLOCATED_REQUEST,
      actions.ALLOCATED_SUCCESS,
      actions.ALLOCATED_FAILURE
    ]
  }
});

export const getProgress = data => ({
  [CALL_API]: {
    endpoint: `progress/${data}`,
    method: "GET",
    types: [
      actions.PROGRESS_REQUEST,
      actions.PROGRESS_SUCCESS,
      actions.PROGRESS_FAILURE
    ]
  }
});

export const allocationRequirement = () => ({
  [CALL_API]: {
    endpoint: "allocations/new",
    method: "GET",
    types: [
      actions.ALLOCATION_REQUIREMENT_REQUEST,
      actions.ALLOCATION_REQUIREMENT_SUCCESS,
      actions.ALLOCATION_REQUIREMENT_FAILURE
    ]
  }
});
/////-------------POST--REQUESTS--------/////

export const addNewAllocation = (allocationId, adm, supervisorId) => ({
  [CALL_API]: {
    endpoint: "allocations",
    method: "POST",
    body: {
      allocation_id: allocationId,
      student_adm: adm,
      supervisor_id: supervisorId
    },
    types: [actions.ADD_REQUEST, actions.ADD_SUCCESS, actions.ADD_FAILURE]
  }
});

export const addNewStudent = param => ({
  [CALL_API]: {
    endpoint: "students/register",
    method: "POST",
    body: param,
    types: [actions.ADD_REQUEST, actions.ADD_SUCCESS, actions.ADD_FAILURE]
  }
});

export const addNewSupervisor = param => ({
  [CALL_API]: {
    endpoint: "supervisor/register",
    method: "POST",
    body: param,
    types: [actions.ADD_REQUEST, actions.ADD_SUCCESS, actions.ADD_FAILURE]
  }
});

export const addNewProject = param => ({
  [CALL_API]: {
    endpoint: "projects",
    method: "POST",
    body: param,
    types: [actions.ADD_REQUEST, actions.ADD_SUCCESS, actions.ADD_FAILURE]
  }
});

export const addNewProgress = param => ({
  [CALL_API]: {
    endpoint: "progress",
    method: "POST",
    body: param,
    types: [actions.ADD_REQUEST, actions.ADD_SUCCESS, actions.ADD_FAILURE]
  }
});

export const completeProject = param => ({
  [CALL_API]: {
    endpoint: "archives",
    method: "POST",
    body: param,
    types: [
      actions.COMPLETE_REQUEST,
      actions.COMPLETE_SUCCESS,
      actions.COMPLETE_FAILURE
    ]
  }
});

export const uploadStudentsFile = param => ({
  [CALL_API]: {
    endpoint: "students/register/csv",
    method: "POST",
    body: param,
    types: [
      actions.UPLOAD_FILE_REQUEST,
      actions.UPLOAD_FILE_SUCCESS,
      actions.UPLOAD_FILE_FAILURE
    ]
  }
});

////--------------PUT--REQUESTS---------////
export const editAllocationTable = param => ({
  [CALL_API]: {
    endpoint: "allocations",
    method: "PUT",
    body: param,
    types: [actions.EDIT_REQUEST, actions.EDIT_SUCCESS, actions.EDIT_FAILURE]
  }
});
export const editStudentTable = param => ({
  [CALL_API]: {
    endpoint: "students",
    method: "PUT",
    body: param,
    types: [actions.EDIT_REQUEST, actions.EDIT_SUCCESS, actions.EDIT_FAILURE]
  }
});
export const editSupervisorTable = param => ({
  [CALL_API]: {
    endpoint: "supervisor/register",
    method: "PUT",
    body: param,
    types: [actions.EDIT_REQUEST, actions.EDIT_SUCCESS, actions.EDIT_FAILURE]
  }
});
export const editProjectsTable = param => ({
  [CALL_API]: {
    endpoint: "projects",
    method: "PUT",
    body: param,
    types: [actions.EDIT_REQUEST, actions.EDIT_SUCCESS, actions.EDIT_FAILURE]
  }
});
export const editProgressTable = param => ({
  [CALL_API]: {
    endpoint: "progress",
    method: "PUT",
    body: param,
    types: [actions.EDIT_REQUEST, actions.EDIT_SUCCESS, actions.EDIT_FAILURE]
  }
});
export const editAdminPassword = param => ({
  [CALL_API]: {
    endpoint: "supervisor",
    method: "PUT",
    body: param,
    types: [actions.EDIT_REQUEST, actions.EDIT_SUCCESS, actions.EDIT_FAILURE]
  }
});
export const editSupervisorPassword = param => ({
  [CALL_API]: {
    endpoint: "supervisor",
    method: "PUT",
    body: param,
    types: [actions.EDIT_REQUEST, actions.EDIT_SUCCESS, actions.EDIT_FAILURE]
  }
});

////-------------DELETE--REQUESTS ------////
export const deleteStudent = adm => ({
  [CALL_API]: {
    endpoint: `students/${adm}`,
    method: "DELETE",
    types: [
      actions.DELETE_REQUEST,
      actions.DELETE_SUCCESS,
      actions.DELETE_FAILURE
    ]
  }
});
export const deleteSupervisor = id => ({
  [CALL_API]: {
    endpoint: `supervisor/${id}`,
    method: "DELETE",
    types: [
      actions.DELETE_REQUEST,
      actions.DELETE_SUCCESS,
      actions.DELETE_FAILURE
    ]
  }
});

////------------------***********----------////
export const login = (id, password) => ({
  [CALL_API]: {
    endpoint: "auth/login",
    method: "POST",
    body: {
      supervisor_id: id,
      password: password
    },
    types: [actions.LOGIN_REQUEST, actions.LOGIN_SUCCESS, actions.LOGIN_FAILURE]
  }
});

export const logout = () => ({
  [CALL_API]: {
    types: [
      actions.LOGOUT_REQUEST,
      actions.LOGOUT_SUCCESS,
      actions.LOGOUT_FAILURE
    ]
  }
});
