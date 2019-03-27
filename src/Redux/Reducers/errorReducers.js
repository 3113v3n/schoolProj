import * as actionTypes from "../Actions/action-types";

const initialState = {
  error: false,
  errorMessage: null
};

export default function errorReducers(state = initialState, action) {
  switch (action.type) {
    case actionTypes.NEW_USER_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: "INVALID LOGIN CREDENTIALS PROVIDED"
      };
    case actionTypes.PROJECT_EDIT_ERROR:
      return{
        ...state,
        error: true,
        errorMessage: action.data
      };
    case actionTypes.UPLOAD_FAILURE:
      return{
        ...state,
        error: true,
        errorMessage: action.data
      };
    case actionTypes.NEW_ALLOCATION_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.data
      };
    case actionTypes.DELETE_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.data
      };
    case actionTypes.FETCHING_FAILED:
      return {
        ...state,
        error: true,
        errorMessage: action.data
      };
    case actionTypes.ALLOCATION_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.data
      };
    case actionTypes.PROGRESS_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.data
      };
    case actionTypes.PROJECT_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: "Cant add project"
      };
    case actionTypes.STUDENT_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.data
      };
    case actionTypes.SUPERVISOR_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.data
      };
    case actionTypes.SUPERVISOR_TABLE_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.data
      };
    case actionTypes.STUDENT_TABLE_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.data
      };
    case actionTypes.ADMIN_PASS_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.data
      };
    case actionTypes.SUPERVISOR_PASS_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.data
      };
    default:
      return state;
  }
}
