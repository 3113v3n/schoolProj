import * as actionTypes from "../Actions/action-types";

const initialState = {
  error: false,
  errorMessage: "Cant Login Please Try Again"
};

export default function errorReducers(state = initialState, actions) {
  switch (actions.type) {
    case actionTypes.NEW_USER_FAILURE:
      return {
        ...state,
        error: true
      };
    case actionTypes.FETCHING_FAILED:
      return {
        ...state,
        error: true
      };
    case actionTypes.ALLOCATION_ERROR:
      return {
        ...state,
        error: true
      };
    case actionTypes.PROGRESS_ERROR:
      return {
        ...state,
        error: true
      };
    case actionTypes.STUDENT_ERROR:
      return {
        ...state,
        error: true
      };
    case actionTypes.SUPERVISOR_ERROR:
      return {
        ...state,
        error: true
      };
    case actionTypes.SUPERVISOR_TABLE_ERROR:
      return {
        ...state,
        error: true
      };
    case actionTypes.STUDENT_TABLE_ERROR:
      return {
        ...state,
        error: true
      };
    case actionTypes.ADMIN_PROFILE_ERROR:
      return {
        ...state,
        error: true
      };
    case actionTypes.SUPERVISOR_PROFILE_ERROR:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
}
