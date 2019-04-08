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

export const addNewSupervisor = (allocationId, adm, supervisorId) => ({
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

export const addNewProject = (allocationId, adm, supervisorId) => ({
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

export const addNewProgress = (allocationId, adm, supervisorId) => ({
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

////--------------PUT--REQUESTS---------////

////-------------DELETE--REQUESTS ------////
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
