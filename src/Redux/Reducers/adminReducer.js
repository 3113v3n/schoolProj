import * as actionTypes from "../Actions/action-types"; ///import all actions
import { updateProgress } from "../utilityFunctions";

const initialState = {
  redirect: false,
  data: null,
  isLoading: false,
  error: false,
  project: [],
  student: [],
  supervisor: [],
  profile: []
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
        project: [action.data, ...state.project]
      };
    case actionTypes.ADD_STUDENTS:
      return updateProgress(state, {
        student: [action.data, ...state.student]
      });
    case actionTypes.UPDATE_ADMIN_PROFILE:
      return updateProgress(state, {
        profile: [action.data, ...state.profile]
      });
    case actionTypes.ADD_SUPERVISOR:
      return{
        supervisor: [action.data, ...state.supervisor]
      };
    default:
      return state;
  }
}

export default adminReducer;
