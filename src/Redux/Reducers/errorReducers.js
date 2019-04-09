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
        errorMessage: action.data.message
      };
    case actionTypes.TOKEN_REFRESH_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: action.data.message
      };
    case actionTypes.PROJECT_EDIT_ERROR:
      return{
        ...state,
        error: true,
        errorMessage: action.data.message
      };
    case actionTypes.UPLOAD_FAILURE:
      return{
        ...state,
        error: true,
        errorMessage: action.data.message
      };
    case actionTypes.NEW_ALLOCATION_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.data.message
      };
    case actionTypes.DELETE_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.data.message
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
        errorMessage: action.data.message
      };
    case actionTypes.PROGRESS_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.data.message
      };
    case actionTypes.PROJECT_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.data.message
      };
    case actionTypes.STUDENT_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.data.message
      };
    case actionTypes.SUPERVISOR_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.data.message
      };
    case actionTypes.SUPERVISOR_TABLE_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.data.message
      };
    case actionTypes.STUDENT_TABLE_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.data.message
      };
    case actionTypes.ADMIN_PASS_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.data.message
      };
    case actionTypes.SUPERVISOR_PASS_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.data.message
      };
    default:
      return state;
  }
}
