import * as actionTypes from "../Actions/action-types"; ///import all actions
import { updateProgress } from "../utilityFunctions";

const initialState = {
  redirect: false,
  data: null,
  isLoading: false,
  error: false,
  projects: [],
  students: [],
  archives: [],
  supervisors: [],
  supervisor: {},
  allocation: {},
  status: "",
  message: ""
};

function adminReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_DATA:
      return updateProgress(state, {
        data: action.data,
        isLoading: true,
        error: false,
        status: action.data.status,
        message: action.data.message
      });
    case actionTypes.FETCH_ARCHIVES:
      return {
        ...state,
        archives: action.data,
        isLoading: true
      };
    case actionTypes.UPLOAD_SUCCESS:
      return updateProgress(state, {
        message: action.data.message
      });
    case actionTypes.SET_STUDENTS_TABLE:
      return updateProgress(state, {
        students: action.data,
        isLoading: true,
        error: false
      });
    case actionTypes.SET_SUPERVISOR_TABLE:
      return updateProgress(state, {
        supervisors: action.data,
        isLoading: true,
        error: false
      });
    case actionTypes.FETCH_PROJECTS:
      return updateProgress(state, {
        projects: action.data,
        isLoading: true
      });
    case actionTypes.ALLOCATIONS:
      return {
        ...state,
        students: action.data.students,
        supervisors: action.data.supervisors
      };
    case actionTypes.ADD_PROJECT:
      return {
        projects: [action.data, ...state.projects],
        error: state.error,
        status: action.data.status,
        message: action.data.message
      };
    case actionTypes.NEW_ALLOCATION:
      return {
        ...state,
        allocation: action.data,
        status: action.data.status,
        message: action.data.message
      };

    case actionTypes.ADD_STUDENTS:
      return updateProgress(state, {
        students: [action.data, ...state.students],
        status: action.data.status,
        message: action.data.message
      });
    case actionTypes.CHANGE_ADMIN_PASSWORD:
      return {
        ...state,
        status: action.data.status,
        message: action.data.message
      };
    case actionTypes.ADD_SUPERVISOR:
      return {
        supervisors: [action.data, ...state.supervisors],
        status: action.data.status,
        message: action.data.message
      };
    case actionTypes.DELETE_STUDENT:
      return {
        ...state,
        status: action.data.status,
        message: action.data.message
      };
    case actionTypes.DELETE_SUPERVISOR:
      return {
        ...state,
        status: action.data.status,
        message: action.data.message
      };
    default:
      return state;
  }
}

export default adminReducer;
