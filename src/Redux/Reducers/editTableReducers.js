import * as actionTypes from "../Actions/action-types";

function editTableReducer(state = [], action = {}) {
  switch (action.type) {
    case actionTypes.EDIT_ALLOCATION_TABLE:
      return [
        ...state,
        {
          data: action.data
        }
      ];
    case actionTypes.EDIT_SUPERVISOR_TABLE:
      return [
        ...state,
        {
          data: action.data
        }
      ];
    case actionTypes.EDIT_STUDENT_TABLE:
      return [
        ...state,
        {
          data: action.data
        }
      ];
    default:
      return state;
  }
}

export default editTableReducer;
