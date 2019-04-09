import * as actionTypes from "../Actions/action-types";
const initialState = { status: "", message: "" };
function editTableReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.EDIT_ALLOCATION_TABLE:
      return {
        ...state,
        status: action.data.status,
        message: action.data.message
      };

    case actionTypes.EDIT_SUPERVISOR_TABLE:
      return {
        ...state,
        status: action.data.status,
        message: action.data.message
      };

    case actionTypes.EDIT_STUDENT_TABLE:
      return {
        ...state,
        status: action.data.status,
        message: action.data.message
      };
    case actionTypes.EDIT_PROJECT_TABLE:
      return {
        ...state,
        status: action.data.status,
        message: action.data.message
      };
    default:
      return state;
  }
}

export default editTableReducer;
