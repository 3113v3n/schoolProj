import * as actionTypes from "../Actions/action-types"; ///import all actions
import { updateProgress } from "../utilityFunctions";

const initialState = {
  redirect: false,
  data: null,
  isLoading: false,
  error: false,
  projects: [],
  students: [],
  supervisors: [],
  profile: {},
  supervisor: {},
  allocation: {}
};

function adminReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_DATA:
      return updateProgress(state, {
        data: action.data,
        isLoading: true,
        error: false
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
        projects: action.data
      });
    case actionTypes.FETCH_ALLOCATION_STUDENTS:
      return {
        ...state,
        students: action.data
      };
    case actionTypes.FETCH_ALLOCATION_LECTURERS:
      return {
        ...state,
        supervisors: action.data
      };
    case actionTypes.ADD_PROJECT:
      return {
        projects: [action.data, ...state.projects],
        error: state.error
      };
    case actionTypes.NEW_ALLOCATION:
      return {
        ...state,
        allocation: action.data
      };

    case actionTypes.ADD_STUDENTS:
      return updateProgress(state, {
        students: [action.data, ...state.students]
      });
    case actionTypes.UPDATE_ADMIN_PROFILE:
      return updateProgress(state, {
        ...state,
        profile: action.data
      });
    case actionTypes.ADD_SUPERVISOR:
      return {
        supervisors: [action.data, ...state.supervisors]
      };
    case actionTypes.DELETE_ALLOCATION:
      return [
        ...state.data.slice(0, action.data),
        ...state.data.slice(action.data + 1)
      ];
    case actionTypes.DELETE_STUDENT:
      return [
        ...state.students.slice(0, action.data),
        ...state.students.slice(action.data + 1)
      ];
    case actionTypes.DELETE_SUPERVISOR:
      return [
        ...state.supervisors.slice(0, action.data),
        ...state.supervisors.slice(action.data + 1)
      ];
    default:
      return state;
  }
}

export default adminReducer;
/*
* {
   ...state,
  student: state.students.filter(student => student.data !== action.data)
  };
  */
