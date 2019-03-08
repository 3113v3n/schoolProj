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
  allocation: {},
  student: {}
};

function adminReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_DATA:
      return updateProgress(state, {
        data: action.data,
        isLoading: true,
        error: false
      });
    case actionTypes.FETCHING_FAILED:
      return {
        ...state,
        error: true
      };
    case actionTypes.ADD_PROJECT:
      return {
        projects: [action.data, ...state.projects]
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
      const newData = state.data.filter(allocation => {
        return allocation.data !== action.data;
      });
      return {
        ...state,
        data: newData
      };
    case actionTypes.DELETE_STUDENT:
      const newStudents = state.data.filter(students => {
        return students.data !== action.data;
      });
      return {
        ...state,
        data: newStudents
      };
    case actionTypes.DELETE_SUPERVISOR:
      const newSupervisor = state.supervisors.filter(supervisor => {
        return supervisor.data !== action.data;
      });
      return {
        ...state,
        supervisors: newSupervisor
      };
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
